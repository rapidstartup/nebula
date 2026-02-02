pragma solidity ^0.8.19;

// SPDX-License-Identifier: MIT

/**
 * @title Voting
 * @dev On-chain voting mechanism for proposals and governance decisions
 * Implements token-locked voting with time-bound proposals
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
        string governanceCodeHash; // IPFS hash for Governance-as-Code
    }
    
    struct VoteRecord {
        uint256 proposalId;
        address voter;
        uint8 voteType; // 0: against, 1: for, 2: abstain
        uint256 votingPower;
        uint256 timestamp;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => VoteRecord[]) public votesByProposal;
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    
    uint256 public proposalCount;
    address public immutable DAO_CONTRACT;
    
    // Constants
    uint256 public constant VOTING_PERIOD = 3 days;
    uint256 public constant MIN_QUORUM = 10; // Minimum 10% of voting power
    uint256 public constant THRESHOLD = 51; // 51% for standard proposals
    
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
    
    modifier onlyDAO() {
        require(msg.sender == DAO_CONTRACT, "Only DAO");
        _;
    }
    
    constructor(address daoContract) {
        DAO_CONTRACT = daoContract;
    }
    
    /**
     * @dev Create a new governance proposal
     * @param title Proposal title
     * @param description Detailed description
     * @param governanceCodeHash IPFS hash containing governance code changes
     */
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
        
        emit ProposalCreated(
            proposalId,
            title,
            msg.sender,
            block.timestamp,
            block.timestamp + VOTING_PERIOD,
            governanceCodeHash
        );
        
        return proposalId;
    }
    
    /**
     * @dev Cast a vote on a proposal
     * @param proposalId ID of the proposal
     * @param voteType 0: against, 1: for, 2: abstain
     */
    function vote(
        uint256 proposalId,
        uint8 voteType
    ) external {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        require(!hasVoted[msg.sender][proposalId], "Already voted");
        require(block.timestamp <= proposals[proposalId].endTime, "Voting ended");
        
        Proposal storage proposal = proposals[proposalId];
        uint256 votingPower = getVotingPower(msg.sender, proposalId);
        require(votingPower > 0, "No voting power");
        
        // Record vote
        hasVoted[msg.sender][proposalId] = true;
        
        // Update proposal counts
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
    
    /**
     * @dev Execute a proposal after voting ends
     * @param proposalId ID of the proposal to execute
     */
    function executeProposal(uint256 proposalId) external {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Already executed");
        require(block.timestamp > proposal.endTime, "Voting not ended");
        
        uint256 totalVotes = proposal.forVotes + proposal.againstVotes + proposal.abstainVotes;
        
        bool passed = false;
        if (totalVotes >= MIN_QUORUM) {
            uint256 totalPossible = getTotalVotingPower(); // Would implement this
            uint256 participation = (totalVotes * 100) / totalPossible;
            
            if (participation >= MIN_QUORUM && 
                (proposal.forVotes * 100) / (proposal.forVotes + proposal.againstVotes) >= THRESHOLD) {
                passed = true;
            }
        }
        
        proposal.executed = true;
        emit ProposalExecuted(proposalId, passed);
        
        // Governance-as-Code execution would happen here
        // Typically triggers IPFS-based code deployment
    }
    
    /**
     * @dev Get voting results for a proposal
     */
    function getProposalResults(uint256 proposalId) external view returns (
        uint256 forVotes,
        uint256 againstVotes,
        uint256 abstainVotes,
        bool passed,
        bool executed,
        string memory codeHash
    ) {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        
        Proposal memory proposal = proposals[proposalId];
        
        // Simplified passing logic
        bool isPassed = false;
        if (!proposal.executed) {
            uint256 totalVotes = proposal.forVotes + proposal.againstVotes;
            if (totalVotes > 0) {
                isPassed = (proposal.forVotes * 100) / totalVotes >= THRESHOLD;
            }
        }
        
        return (
            proposal.forVotes,
            proposal.againstVotes,
            proposal.abstainVotes,
            isPassed,
            proposal.executed,
            proposal.governanceCodeHash
        );
    }
    
    /**
     * @dev Simplified voting power calculation
     * Production would use token balances or reputation scores
     */
    function getVotingPower(address voter, uint256 proposalId) public view returns (uint256) {
        // Simplified: 1 ETH = 1 vote
        return voter.balance / 1 ether;
    }
    
    function getTotalVotingPower() public view returns (uint256) {
        // Simplified for testing
        return 1000;
    }
    
    /**
     * @dev Get proposal details
     */
    function getProposal(uint256 proposalId) external view returns (Proposal memory) {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        return proposals[proposalId];
    }
    
    /**
     * @dev Get votes for a proposal
     */
    function getVotesForProposal(uint256 proposalId) external view returns (VoteRecord[] memory) {
        return votesByProposal[proposalId];
    }
}