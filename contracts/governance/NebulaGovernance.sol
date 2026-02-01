// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./NebulaDAO.sol";

/**
 * @title NebulaGovernance
 * @notice Implements the proposal and voting system for Nebula DAOs.
 *         Includes graduated proposal filtration (R 7.2) and voting mechanisms.
 * @dev Implements Epic 3 (Governance & Voting) and R 7.2 (Graduated Filtration)
 */
contract NebulaGovernance is AccessControl, ReentrancyGuard {

    // ============ REFERENCES ============

    NebulaDAO public daoContract;

    // ============ ENUMS ============

    /// @notice States of a proposal (R 7.2: Graduated Filtration)
    enum ProposalState {
        Draft,              // Initial creation
        MicroPoll,          // Small random group evaluation
        ConsensusBuilding,  // Broader community discussion
        ActiveVoting,       // Full DAO vote
        Passed,             // Vote passed
        Failed,             // Vote failed
        Executed,           // Action executed
        Cancelled           // Cancelled by creator or admin
    }

    /// @notice Types of proposals
    enum ProposalType {
        General,            // General discussion/decision
        Treasury,           // Treasury withdrawal/allocation
        Constitutional,     // Changes to DAO rules
        Membership,         // Membership decisions
        External            // External actions (e.g., GitHub PR merge)
    }

    // ============ STRUCTS ============

    /// @notice Represents a governance proposal
    struct Proposal {
        bytes32 proposalId;         // Unique identifier
        bytes32 daoId;              // Parent DAO
        address proposer;           // Creator of proposal
        string title;               // Proposal title
        string descriptionHash;     // IPFS hash of full description
        ProposalType proposalType;
        ProposalState state;
        uint256 createdAt;
        uint256 votingStartsAt;     // When active voting begins
        uint256 votingEndsAt;       // When voting ends
        uint256 forVotes;           // Votes in favor
        uint256 againstVotes;       // Votes against
        uint256 abstainVotes;       // Abstention votes
        string executionHash;       // IPFS hash of execution payload (for GaC)
        bool executed;
    }

    /// @notice Vote record
    struct Vote {
        address voter;
        VoteOption option;
        uint256 weight;
        uint256 timestamp;
        string reasonHash;          // Optional IPFS hash of reasoning
    }

    /// @notice Vote options
    enum VoteOption {
        Against,
        For,
        Abstain
    }

    /// @notice Micro-poll jury selection
    struct MicroPollJury {
        address[] members;
        uint256 approvals;
        uint256 rejections;
        uint256 deadline;
    }

    // ============ STATE ============

    /// @notice Mapping from proposal ID to Proposal
    mapping(bytes32 => Proposal) public proposals;

    /// @notice Mapping from proposal ID to voter address to Vote
    mapping(bytes32 => mapping(address => Vote)) public proposalVotes;

    /// @notice Mapping from proposal ID to MicroPollJury
    mapping(bytes32 => MicroPollJury) public microPollJuries;

    /// @notice Mapping from DAO ID to proposal IDs
    mapping(bytes32 => bytes32[]) public daoProposals;

    /// @notice Action token cost for creating a proposal
    uint256 public constant PROPOSAL_COST = 10;

    /// @notice Action token cost for voting
    uint256 public constant VOTE_COST = 1;

    /// @notice Micro-poll jury size
    uint256 public constant MICRO_POLL_JURY_SIZE = 5;

    /// @notice Micro-poll approval threshold (3 out of 5)
    uint256 public constant MICRO_POLL_THRESHOLD = 3;

    /// @notice Micro-poll duration
    uint256 public constant MICRO_POLL_DURATION = 24 hours;

    /// @notice Consensus building duration
    uint256 public constant CONSENSUS_DURATION = 48 hours;

    // ============ EVENTS ============

    event ProposalCreated(
        bytes32 indexed proposalId,
        bytes32 indexed daoId,
        address indexed proposer,
        string title,
        ProposalType proposalType
    );

    event ProposalStateChanged(
        bytes32 indexed proposalId,
        ProposalState oldState,
        ProposalState newState
    );

    event VoteCast(
        bytes32 indexed proposalId,
        address indexed voter,
        VoteOption option,
        uint256 weight
    );

    event ProposalExecuted(bytes32 indexed proposalId, string executionHash);

    event MicroPollJurySelected(bytes32 indexed proposalId, address[] jury);
    event MicroPollVote(bytes32 indexed proposalId, address indexed juror, bool approved);

    // ============ ERRORS ============

    error ProposalNotFound();
    error InvalidProposalState();
    error VotingNotActive();
    error VotingEnded();
    error AlreadyVoted();
    error NotJuryMember();
    error InsufficientTokens();
    error NotProposer();
    error ExecutionFailed();
    error QuorumNotReached();

    // ============ CONSTRUCTOR ============

    constructor(address _daoContract) {
        daoContract = NebulaDAO(_daoContract);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // ============ PROPOSAL CREATION ============

    /**
     * @notice Create a new proposal
     * @param _daoId DAO identifier
     * @param _title Proposal title
     * @param _descriptionHash IPFS hash of full description
     * @param _proposalType Type of proposal
     * @param _executionHash IPFS hash of execution payload (optional)
     * @return proposalId The unique identifier of the created proposal
     */
    function createProposal(
        bytes32 _daoId,
        string calldata _title,
        string calldata _descriptionHash,
        ProposalType _proposalType,
        string calldata _executionHash
    ) external nonReentrant returns (bytes32 proposalId) {
        // Verify membership and spend tokens
        NebulaDAO.Member memory member = daoContract.getMember(_daoId, msg.sender);
        if (!member.isActive) revert InsufficientTokens();
        
        // Spend action tokens
        daoContract.spendActionTokens(_daoId, PROPOSAL_COST);

        proposalId = keccak256(abi.encodePacked(
            _daoId,
            msg.sender,
            _title,
            block.timestamp
        ));

        NebulaDAO.DAO memory dao = daoContract.getDAO(_daoId);

        proposals[proposalId] = Proposal({
            proposalId: proposalId,
            daoId: _daoId,
            proposer: msg.sender,
            title: _title,
            descriptionHash: _descriptionHash,
            proposalType: _proposalType,
            state: ProposalState.Draft,
            createdAt: block.timestamp,
            votingStartsAt: 0,
            votingEndsAt: 0,
            forVotes: 0,
            againstVotes: 0,
            abstainVotes: 0,
            executionHash: _executionHash,
            executed: false
        });

        daoProposals[_daoId].push(proposalId);

        emit ProposalCreated(proposalId, _daoId, msg.sender, _title, _proposalType);

        // Automatically start micro-poll for graduated filtration
        _startMicroPoll(proposalId, _daoId);
    }

    // ============ GRADUATED PROPOSAL FILTRATION (R 7.2) ============

    /**
     * @notice Start the micro-poll phase with random jury selection
     * @param _proposalId Proposal identifier
     * @param _daoId DAO identifier
     */
    function _startMicroPoll(bytes32 _proposalId, bytes32 _daoId) internal {
        Proposal storage proposal = proposals[_proposalId];
        
        // Select random jury (simplified - in production use VRF)
        address[] memory jury = _selectRandomJury(_daoId, MICRO_POLL_JURY_SIZE);
        
        microPollJuries[_proposalId] = MicroPollJury({
            members: jury,
            approvals: 0,
            rejections: 0,
            deadline: block.timestamp + MICRO_POLL_DURATION
        });

        proposal.state = ProposalState.MicroPoll;
        
        emit MicroPollJurySelected(_proposalId, jury);
        emit ProposalStateChanged(_proposalId, ProposalState.Draft, ProposalState.MicroPoll);
    }

    /**
     * @notice Cast a vote in the micro-poll phase
     * @param _proposalId Proposal identifier
     * @param _approve Whether to approve moving forward
     */
    function voteInMicroPoll(bytes32 _proposalId, bool _approve) external {
        Proposal storage proposal = proposals[_proposalId];
        if (proposal.state != ProposalState.MicroPoll) revert InvalidProposalState();
        
        MicroPollJury storage jury = microPollJuries[_proposalId];
        if (block.timestamp > jury.deadline) revert VotingEnded();
        
        // Check if caller is jury member
        bool isJuror = false;
        for (uint i = 0; i < jury.members.length; i++) {
            if (jury.members[i] == msg.sender) {
                isJuror = true;
                break;
            }
        }
        if (!isJuror) revert NotJuryMember();

        // Record vote
        if (_approve) {
            jury.approvals++;
        } else {
            jury.rejections++;
        }

        emit MicroPollVote(_proposalId, msg.sender, _approve);

        // Check if threshold reached
        if (jury.approvals >= MICRO_POLL_THRESHOLD) {
            _advanceToConsensusBuilding(_proposalId);
        } else if (jury.rejections > MICRO_POLL_JURY_SIZE - MICRO_POLL_THRESHOLD) {
            // Cannot pass, fail early
            proposal.state = ProposalState.Failed;
            emit ProposalStateChanged(_proposalId, ProposalState.MicroPoll, ProposalState.Failed);
        }
    }

    /**
     * @notice Advance proposal to consensus building phase
     * @param _proposalId Proposal identifier
     */
    function _advanceToConsensusBuilding(bytes32 _proposalId) internal {
        Proposal storage proposal = proposals[_proposalId];
        proposal.state = ProposalState.ConsensusBuilding;
        emit ProposalStateChanged(_proposalId, ProposalState.MicroPoll, ProposalState.ConsensusBuilding);
    }

    /**
     * @notice Advance from consensus building to active voting
     * @param _proposalId Proposal identifier
     */
    function advanceToActiveVoting(bytes32 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        if (proposal.state != ProposalState.ConsensusBuilding) revert InvalidProposalState();
        
        // Only proposer or admin can advance
        if (msg.sender != proposal.proposer && !hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            revert NotProposer();
        }

        NebulaDAO.DAO memory dao = daoContract.getDAO(proposal.daoId);

        proposal.state = ProposalState.ActiveVoting;
        proposal.votingStartsAt = block.timestamp;
        proposal.votingEndsAt = block.timestamp + dao.config.votingPeriod;

        emit ProposalStateChanged(_proposalId, ProposalState.ConsensusBuilding, ProposalState.ActiveVoting);
    }

    // ============ VOTING ============

    /**
     * @notice Cast a vote on an active proposal
     * @param _proposalId Proposal identifier
     * @param _option Vote option (For, Against, Abstain)
     * @param _reasonHash Optional IPFS hash of voting reason
     */
    function castVote(
        bytes32 _proposalId,
        VoteOption _option,
        string calldata _reasonHash
    ) external nonReentrant {
        Proposal storage proposal = proposals[_proposalId];
        
        if (proposal.state != ProposalState.ActiveVoting) revert VotingNotActive();
        if (block.timestamp > proposal.votingEndsAt) revert VotingEnded();
        if (proposalVotes[_proposalId][msg.sender].timestamp != 0) revert AlreadyVoted();

        // Verify membership and spend tokens
        NebulaDAO.Member memory member = daoContract.getMember(proposal.daoId, msg.sender);
        if (!member.isActive) revert InsufficientTokens();
        
        daoContract.spendActionTokens(proposal.daoId, VOTE_COST);

        // Calculate vote weight (1 person = 1 vote for now)
        uint256 weight = 1;

        // Record vote
        proposalVotes[_proposalId][msg.sender] = Vote({
            voter: msg.sender,
            option: _option,
            weight: weight,
            timestamp: block.timestamp,
            reasonHash: _reasonHash
        });

        // Tally vote
        if (_option == VoteOption.For) {
            proposal.forVotes += weight;
        } else if (_option == VoteOption.Against) {
            proposal.againstVotes += weight;
        } else {
            proposal.abstainVotes += weight;
        }

        emit VoteCast(_proposalId, msg.sender, _option, weight);
    }

    // ============ PROPOSAL FINALIZATION ============

    /**
     * @notice Finalize a proposal after voting ends
     * @param _proposalId Proposal identifier
     */
    function finalizeProposal(bytes32 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        
        if (proposal.state != ProposalState.ActiveVoting) revert InvalidProposalState();
        if (block.timestamp <= proposal.votingEndsAt) revert VotingNotActive();

        NebulaDAO.DAO memory dao = daoContract.getDAO(proposal.daoId);
        uint256 totalVotes = proposal.forVotes + proposal.againstVotes + proposal.abstainVotes;
        uint256 memberCount = daoContract.getMemberCount(proposal.daoId);

        // Check quorum
        uint256 quorumRequired = (memberCount * dao.config.quorumPercent) / 100;
        
        if (totalVotes < quorumRequired) {
            proposal.state = ProposalState.Failed;
            emit ProposalStateChanged(_proposalId, ProposalState.ActiveVoting, ProposalState.Failed);
            return;
        }

        // Check if passed (simple majority)
        if (proposal.forVotes > proposal.againstVotes) {
            proposal.state = ProposalState.Passed;
            emit ProposalStateChanged(_proposalId, ProposalState.ActiveVoting, ProposalState.Passed);
        } else {
            proposal.state = ProposalState.Failed;
            emit ProposalStateChanged(_proposalId, ProposalState.ActiveVoting, ProposalState.Failed);
        }
    }

    /**
     * @notice Execute a passed proposal (for Governance-as-Code)
     * @param _proposalId Proposal identifier
     */
    function executeProposal(bytes32 _proposalId) external nonReentrant {
        Proposal storage proposal = proposals[_proposalId];
        
        if (proposal.state != ProposalState.Passed) revert InvalidProposalState();
        if (proposal.executed) revert ExecutionFailed();

        proposal.executed = true;
        proposal.state = ProposalState.Executed;

        // The actual execution is triggered off-chain via the executionHash
        // This could be a GitHub webhook, treasury action, etc.
        
        emit ProposalExecuted(_proposalId, proposal.executionHash);
        emit ProposalStateChanged(_proposalId, ProposalState.Passed, ProposalState.Executed);
    }

    /**
     * @notice Cancel a proposal (only proposer or admin)
     * @param _proposalId Proposal identifier
     */
    function cancelProposal(bytes32 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        
        if (msg.sender != proposal.proposer && !hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            revert NotProposer();
        }
        
        if (proposal.state == ProposalState.Executed || proposal.state == ProposalState.Cancelled) {
            revert InvalidProposalState();
        }

        ProposalState oldState = proposal.state;
        proposal.state = ProposalState.Cancelled;
        
        emit ProposalStateChanged(_proposalId, oldState, ProposalState.Cancelled);
    }

    // ============ INTERNAL FUNCTIONS ============

    /**
     * @notice Select random jury members (simplified - use VRF in production)
     * @param _daoId DAO identifier
     * @param _count Number of jurors to select
     * @return jury Array of selected jury addresses
     */
    function _selectRandomJury(bytes32 _daoId, uint256 _count) internal view returns (address[] memory jury) {
        // This is a simplified random selection
        // In production, use Chainlink VRF or similar
        uint256 memberCount = daoContract.getMemberCount(_daoId);
        
        if (memberCount <= _count) {
            // Return all members if not enough
            jury = new address[](_count);
            // Would need to implement member enumeration
            return jury;
        }

        jury = new address[](_count);
        // Simplified: would need proper random selection with VRF
        return jury;
    }

    // ============ VIEW FUNCTIONS ============

    /**
     * @notice Get proposal details
     * @param _proposalId Proposal identifier
     * @return proposal The Proposal struct
     */
    function getProposal(bytes32 _proposalId) external view returns (Proposal memory proposal) {
        return proposals[_proposalId];
    }

    /**
     * @notice Get all proposals for a DAO
     * @param _daoId DAO identifier
     * @return proposalIds Array of proposal identifiers
     */
    function getDAOProposals(bytes32 _daoId) external view returns (bytes32[] memory proposalIds) {
        return daoProposals[_daoId];
    }

    /**
     * @notice Get vote details
     * @param _proposalId Proposal identifier
     * @param _voter Voter address
     * @return vote The Vote struct
     */
    function getVote(bytes32 _proposalId, address _voter) external view returns (Vote memory vote) {
        return proposalVotes[_proposalId][_voter];
    }

    /**
     * @notice Check if an address has voted
     * @param _proposalId Proposal identifier
     * @param _voter Voter address
     * @return hasVoted Whether the address has voted
     */
    function hasVoted(bytes32 _proposalId, address _voter) external view returns (bool) {
        return proposalVotes[_proposalId][_voter].timestamp != 0;
    }
}
