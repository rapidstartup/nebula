pragma solidity ^0.8.19;

// SPDX-License-Identifier: MIT

/**
 * @title ActionToken
 * @dev ERC20 token for governance actions and voting power
 */
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ActionToken is ERC20, Ownable {
    mapping(address => bool) public minters;
    mapping(address => uint256) public reputationScores;
    
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);
    event ReputationUpdated(address indexed user, uint256 score);
    
    constructor() ERC20("ActionToken", "ACT") Ownable(msg.sender) {
        minters[msg.sender] = true;
    }
    
    modifier onlyMinter() {
        require(minters[msg.sender], "Not minter");
        _;
    }
    
    function mint(address to, uint256 amount) external onlyMinter {
        _mint(to, amount);
    }
    
    function updateReputation(address user, uint256 score) external onlyOwner {
        reputationScores[user] = score;
        emit ReputationUpdated(user, score);
    }
    
    function addMinter(address minter) external onlyOwner {
        minters[minter] = true;
        emit MinterAdded(minter);
    }
    
    function removeMinter(address minter) external onlyOwner {
        minters[minter] = false;
        emit MinterRemoved(minter);
    }
}

/**
 * @title Voting
 * @dev On-chain voting mechanism for proposals and governance decisions
 */
contract Voting {
    struct Proposal {
        string title;
        string description;
        address proposer;
        address dao;
        uint256 startTime;
        uint256 endTime;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 abstainVotes;
        bool executed;
        string governanceCodeHash;
    }
    
    struct VoteRecord {
        uint256 proposalId;
        address voter;
        uint8 voteType;
        uint256 votingPower;
        uint256 timestamp;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => VoteRecord[]) public votesByProposal;
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    
    uint256 public proposalCount;
    address public immutable DAO_CONTRACT;
    ActionToken public actionToken;
    
    uint256 public constant VOTING_PERIOD = 3 days;
    uint256 public constant MIN_QUORUM = 10; // 10%
    uint256 public constant THRESHOLD = 51; // 51%
    
    event ProposalCreated(
        uint256 indexed proposalId,
        string title,
        address indexed proposer,
        uint256 startTime,
        uint256 endTime,
        string governanceCodeHash
    );
    
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        uint8 voteType,
        uint256 votingPower
    );
    
    event ProposalExecuted(uint256 indexed proposalId, bool passed);
    
    constructor(address daoContract, address actionTokenAddress) {
        DAO_CONTRACT = daoContract;
        actionToken = ActionToken(actionTokenAddress);
    }
    
    function createProposal(
        string memory title,
        string memory description,
        string memory governanceCodeHash
    ) external returns (uint256) {
        proposalCount++;
        uint256 proposalId = proposalCount;
        
        proposals[proposalId] = Proposal({
            title: title,
            description: description,
            proposer: msg.sender,
            dao: DAO_CONTRACT,
            startTime: block.timestamp,
            endTime: block.timestamp + VOTING_PERIOD,
            forVotes: 0,
            againstVotes: 0,
            abstainVotes: 0,
            executed: false,
            governanceCodeHash: governanceCodeHash
        });
        
        emit ProposalCreated(proposalId, title, msg.sender, block.timestamp, block.timestamp + VOTING_PERIOD, governanceCodeHash);
        return proposalId;
    }
    
    function vote(uint256 proposalId, uint8 voteType) external {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        require(!hasVoted[msg.sender][proposalId], "Already voted");
        require(block.timestamp <= proposals[proposalId].endTime, "Voting ended");
        
        uint256 votingPower = actionToken.balanceOf(msg.sender);
        require(votingPower > 0, "No voting power");
        
        hasVoted[msg.sender][proposalId] = true;
        
        Proposal storage proposal = proposals[proposalId];
        if (voteType == 0) {
            proposal.againstVotes += votingPower;
        } else if (voteType == 1) {
            proposal.forVotes += votingPower;
        } else if (voteType == 2) {
            proposal.abstainVotes += votingPower;
        }
        
        votesByProposal[proposalId].push(VoteRecord({
            proposalId: proposalId,
            voter: msg.sender,
            voteType: voteType,
            votingPower: votingPower,
            timestamp: block.timestamp
        }));
        
        emit VoteCast(proposalId, msg.sender, voteType, votingPower);
    }
    
    function executeProposal(uint256 proposalId) external {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Already executed");
        require(block.timestamp > proposal.endTime, "Voting not ended");
        
        uint256 totalVotes = proposal.forVotes + proposal.againstVotes + proposal.abstainVotes;
        uint256 totalSupply = actionToken.totalSupply();
        
        bool passed = false;
        if ((totalVotes * 100) / totalSupply >= MIN_QUORUM) {
            passed = (proposal.forVotes * 100) / (proposal.forVotes + proposal.againstVotes) >= THRESHOLD;
        }
        
        proposal.executed = true;
        emit ProposalExecuted(proposalId, passed);
    }
    
    function getProposal(uint256 proposalId) external view returns (Proposal memory) {
        return proposals[proposalId];
    }
    
    function getProposalResults(uint256 proposalId) external view returns (
        uint256 forVotes,
        uint256 againstVotes,
        uint256 abstainVotes,
        bool passed,
        bool executed,
        string memory codeHash
    ) {
        Proposal memory proposal = proposals[proposalId];
        bool isPassed = (proposal.forVotes * 100) / (proposal.forVotes + proposal.againstVotes) >= THRESHOLD;
        return (proposal.forVotes, proposal.againstVotes, proposal.abstainVotes, isPassed, proposal.executed, proposal.governanceCodeHash);
    }
}