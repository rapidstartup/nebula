// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../governance/NebulaDAO.sol";
import "../governance/NebulaGovernance.sol";

/**
 * @title NebulaTreasury
 * @notice Manages DAO treasuries with transparent, governance-controlled fund management.
 *         Implements Epic 4 (Transparency & Information) treasury requirements.
 * @dev All withdrawals require passed governance proposals
 */
contract NebulaTreasury is AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ============ REFERENCES ============

    NebulaDAO public daoContract;
    NebulaGovernance public governanceContract;

    // ============ STRUCTS ============

    /// @notice Treasury configuration for a DAO
    struct DAOTreasury {
        bytes32 daoId;
        uint256 ethBalance;
        uint256 totalDeposits;
        uint256 totalWithdrawals;
        bool isActive;
    }

    /// @notice Record of a treasury transaction
    struct TreasuryTransaction {
        bytes32 transactionId;
        bytes32 daoId;
        TransactionType txType;
        address token;              // address(0) for ETH
        uint256 amount;
        address from;
        address to;
        bytes32 proposalId;         // Governance proposal (for withdrawals)
        string descriptionHash;     // IPFS hash of transaction description
        uint256 timestamp;
    }

    /// @notice Transaction types
    enum TransactionType {
        Deposit,
        Withdrawal,
        InternalTransfer,
        ProposalExecution
    }

    // ============ STATE ============

    /// @notice Mapping from DAO ID to treasury
    mapping(bytes32 => DAOTreasury) public treasuries;

    /// @notice Mapping from DAO ID to ERC20 token to balance
    mapping(bytes32 => mapping(address => uint256)) public tokenBalances;

    /// @notice Mapping from transaction ID to transaction
    mapping(bytes32 => TreasuryTransaction) public transactions;

    /// @notice Mapping from DAO ID to transaction IDs
    mapping(bytes32 => bytes32[]) public daoTransactions;

    /// @notice Supported ERC20 tokens
    mapping(address => bool) public supportedTokens;

    // ============ EVENTS ============

    event TreasuryCreated(bytes32 indexed daoId);
    
    event Deposited(
        bytes32 indexed daoId,
        address indexed depositor,
        address indexed token,
        uint256 amount
    );

    event Withdrawn(
        bytes32 indexed daoId,
        address indexed recipient,
        address indexed token,
        uint256 amount,
        bytes32 proposalId
    );

    event TokenAdded(address indexed token);
    event TokenRemoved(address indexed token);

    // ============ ERRORS ============

    error TreasuryNotFound();
    error TreasuryNotActive();
    error InsufficientBalance();
    error ProposalNotPassed();
    error ProposalNotExecutable();
    error InvalidAmount();
    error TokenNotSupported();
    error TransferFailed();

    // ============ MODIFIERS ============

    modifier treasuryExists(bytes32 _daoId) {
        if (!treasuries[_daoId].isActive) revert TreasuryNotFound();
        _;
    }

    // ============ CONSTRUCTOR ============

    constructor(address _daoContract, address _governanceContract) {
        daoContract = NebulaDAO(_daoContract);
        governanceContract = NebulaGovernance(_governanceContract);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // ============ TREASURY INITIALIZATION ============

    /**
     * @notice Initialize treasury for a DAO
     * @param _daoId DAO identifier
     */
    function initializeTreasury(bytes32 _daoId) external {
        NebulaDAO.DAO memory dao = daoContract.getDAO(_daoId);
        if (dao.createdAt == 0) revert TreasuryNotFound();
        if (treasuries[_daoId].isActive) return; // Already initialized

        treasuries[_daoId] = DAOTreasury({
            daoId: _daoId,
            ethBalance: 0,
            totalDeposits: 0,
            totalWithdrawals: 0,
            isActive: true
        });

        emit TreasuryCreated(_daoId);
    }

    // ============ DEPOSITS ============

    /**
     * @notice Deposit ETH to a DAO treasury
     * @param _daoId DAO identifier
     */
    function depositETH(bytes32 _daoId) external payable nonReentrant treasuryExists(_daoId) {
        if (msg.value == 0) revert InvalidAmount();

        DAOTreasury storage treasury = treasuries[_daoId];
        treasury.ethBalance += msg.value;
        treasury.totalDeposits += msg.value;

        _recordTransaction(
            _daoId,
            TransactionType.Deposit,
            address(0),
            msg.value,
            msg.sender,
            address(this),
            bytes32(0),
            ""
        );

        emit Deposited(_daoId, msg.sender, address(0), msg.value);
    }

    /**
     * @notice Deposit ERC20 tokens to a DAO treasury
     * @param _daoId DAO identifier
     * @param _token Token address
     * @param _amount Amount to deposit
     */
    function depositToken(
        bytes32 _daoId,
        address _token,
        uint256 _amount
    ) external nonReentrant treasuryExists(_daoId) {
        if (_amount == 0) revert InvalidAmount();
        if (!supportedTokens[_token]) revert TokenNotSupported();

        IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);
        
        tokenBalances[_daoId][_token] += _amount;
        treasuries[_daoId].totalDeposits += _amount;

        _recordTransaction(
            _daoId,
            TransactionType.Deposit,
            _token,
            _amount,
            msg.sender,
            address(this),
            bytes32(0),
            ""
        );

        emit Deposited(_daoId, msg.sender, _token, _amount);
    }

    // ============ WITHDRAWALS (Governance-controlled) ============

    /**
     * @notice Execute a withdrawal based on a passed proposal
     * @param _proposalId Proposal identifier
     * @param _recipient Recipient address
     * @param _token Token address (address(0) for ETH)
     * @param _amount Amount to withdraw
     * @param _descriptionHash IPFS hash of withdrawal description
     */
    function executeWithdrawal(
        bytes32 _proposalId,
        address _recipient,
        address _token,
        uint256 _amount,
        string calldata _descriptionHash
    ) external nonReentrant {
        // Verify proposal is passed and executable
        NebulaGovernance.Proposal memory proposal = governanceContract.getProposal(_proposalId);
        
        if (proposal.state != NebulaGovernance.ProposalState.Passed &&
            proposal.state != NebulaGovernance.ProposalState.Executed) {
            revert ProposalNotPassed();
        }
        
        if (proposal.proposalType != NebulaGovernance.ProposalType.Treasury) {
            revert ProposalNotExecutable();
        }

        bytes32 daoId = proposal.daoId;
        if (!treasuries[daoId].isActive) revert TreasuryNotActive();

        if (_token == address(0)) {
            // ETH withdrawal
            DAOTreasury storage treasury = treasuries[daoId];
            if (treasury.ethBalance < _amount) revert InsufficientBalance();
            
            treasury.ethBalance -= _amount;
            treasury.totalWithdrawals += _amount;

            (bool success, ) = _recipient.call{value: _amount}("");
            if (!success) revert TransferFailed();
        } else {
            // Token withdrawal
            if (tokenBalances[daoId][_token] < _amount) revert InsufficientBalance();
            
            tokenBalances[daoId][_token] -= _amount;
            treasuries[daoId].totalWithdrawals += _amount;

            IERC20(_token).safeTransfer(_recipient, _amount);
        }

        _recordTransaction(
            daoId,
            TransactionType.Withdrawal,
            _token,
            _amount,
            address(this),
            _recipient,
            _proposalId,
            _descriptionHash
        );

        emit Withdrawn(daoId, _recipient, _token, _amount, _proposalId);
    }

    // ============ TOKEN MANAGEMENT ============

    /**
     * @notice Add a supported ERC20 token
     * @param _token Token address
     */
    function addSupportedToken(address _token) external onlyRole(DEFAULT_ADMIN_ROLE) {
        supportedTokens[_token] = true;
        emit TokenAdded(_token);
    }

    /**
     * @notice Remove a supported ERC20 token
     * @param _token Token address
     */
    function removeSupportedToken(address _token) external onlyRole(DEFAULT_ADMIN_ROLE) {
        supportedTokens[_token] = false;
        emit TokenRemoved(_token);
    }

    // ============ INTERNAL FUNCTIONS ============

    function _recordTransaction(
        bytes32 _daoId,
        TransactionType _txType,
        address _token,
        uint256 _amount,
        address _from,
        address _to,
        bytes32 _proposalId,
        string memory _descriptionHash
    ) internal returns (bytes32 transactionId) {
        transactionId = keccak256(abi.encodePacked(
            _daoId,
            _txType,
            _token,
            _amount,
            block.timestamp
        ));

        transactions[transactionId] = TreasuryTransaction({
            transactionId: transactionId,
            daoId: _daoId,
            txType: _txType,
            token: _token,
            amount: _amount,
            from: _from,
            to: _to,
            proposalId: _proposalId,
            descriptionHash: _descriptionHash,
            timestamp: block.timestamp
        });

        daoTransactions[_daoId].push(transactionId);
    }

    // ============ VIEW FUNCTIONS ============

    /**
     * @notice Get treasury details for a DAO
     * @param _daoId DAO identifier
     * @return treasury The DAOTreasury struct
     */
    function getTreasury(bytes32 _daoId) external view returns (DAOTreasury memory treasury) {
        return treasuries[_daoId];
    }

    /**
     * @notice Get ETH balance for a DAO
     * @param _daoId DAO identifier
     * @return balance ETH balance
     */
    function getETHBalance(bytes32 _daoId) external view returns (uint256 balance) {
        return treasuries[_daoId].ethBalance;
    }

    /**
     * @notice Get token balance for a DAO
     * @param _daoId DAO identifier
     * @param _token Token address
     * @return balance Token balance
     */
    function getTokenBalance(bytes32 _daoId, address _token) external view returns (uint256 balance) {
        return tokenBalances[_daoId][_token];
    }

    /**
     * @notice Get all transactions for a DAO
     * @param _daoId DAO identifier
     * @return transactionIds Array of transaction IDs
     */
    function getDAOTransactions(bytes32 _daoId) external view returns (bytes32[] memory transactionIds) {
        return daoTransactions[_daoId];
    }

    /**
     * @notice Get transaction details
     * @param _transactionId Transaction identifier
     * @return transaction The TreasuryTransaction struct
     */
    function getTransaction(bytes32 _transactionId) external view returns (TreasuryTransaction memory transaction) {
        return transactions[_transactionId];
    }

    // ============ RECEIVE ============

    receive() external payable {
        // Reject direct ETH transfers without DAO specification
        revert InvalidAmount();
    }
}
