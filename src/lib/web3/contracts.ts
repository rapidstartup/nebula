/**
 * Nebula V2 Contract ABIs and Hooks
 * 
 * This file exports contract ABIs and React hooks for interacting
 * with the Nebula smart contracts.
 */

// ============ CONTRACT ABIs (Minimal for now, will be auto-generated) ============

export const NebulaIdentityABI = [
  // DID Management
  "function createDID(bytes32 publicKeyHash) external",
  "function updateDID(bytes32 newPublicKeyHash) external",
  "function deactivateDID() external",
  "function isDIDActive(address controller) external view returns (bool)",
  
  // Credentials
  "function issueCredential(address subject, uint8 credentialType, bytes32 credentialDataHash, uint256 expiresAt) external returns (bytes32)",
  "function issueProofOfPersonhood(address subject, bytes32 biometricHash, bytes signature) external returns (bytes32)",
  "function revokeCredential(bytes32 credentialId) external",
  "function verifyCredential(bytes32 credentialId) external view returns (bool)",
  "function hasProofOfPersonhood(address subject) external view returns (bool)",
  
  // Access Control
  "function grantAccess(address grantee) external",
  "function revokeAccess(address revokee) external",
  "function checkAccess(address subject, address accessor) external view returns (bool)",
  
  // View Functions
  "function getSubjectCredentials(address subject) external view returns (bytes32[])",
  "function totalDIDs() external view returns (uint256)",
  
  // Events
  "event DIDCreated(address indexed controller, string didMethod, bytes32 publicKeyHash)",
  "event DIDUpdated(address indexed controller, bytes32 newPublicKeyHash)",
  "event DIDDeactivated(address indexed controller)",
  "event CredentialIssued(bytes32 indexed credentialId, address indexed issuer, address indexed subject, uint8 credentialType)",
  "event CredentialRevoked(bytes32 indexed credentialId, address indexed revoker)",
  "event ProofOfPersonhoodVerified(address indexed subject, bytes32 indexed credentialId)",
] as const;

export const NebulaDAOABI = [
  // DAO Creation
  "function createDAO((string name, string description, string geographicRegion, uint256 quorumPercent, uint256 votingPeriod, uint256 proposalThreshold, bool requiresPoP, bool requiresResidency) config) external returns (bytes32)",
  "function updateConstitution(bytes32 daoId, string constitutionHash) external",
  "function deactivateDAO(bytes32 daoId) external",
  
  // Chapters
  "function createChapter(bytes32 daoId, string name, string geographicRegion) external returns (bytes32)",
  
  // Membership
  "function joinDAO(bytes32 daoId) external",
  "function leaveDAO(bytes32 daoId) external",
  "function changeMemberRole(bytes32 daoId, address member, uint8 newRole) external",
  
  // Action Tokens
  "function spendActionTokens(bytes32 daoId, uint256 amount) external",
  "function refillActionTokens(bytes32 daoId, address member) external",
  
  // View Functions
  "function getDAO(bytes32 daoId) external view returns (tuple(bytes32 daoId, address founder, uint256 createdAt, bool isActive, tuple(string name, string description, string geographicRegion, uint256 quorumPercent, uint256 votingPeriod, uint256 proposalThreshold, bool requiresPoP, bool requiresResidency) config, string constitutionHash))",
  "function getAllDAOs() external view returns (bytes32[])",
  "function getDAOChapters(bytes32 daoId) external view returns (bytes32[])",
  "function getMember(bytes32 daoId, address member) external view returns (tuple(address memberAddress, uint256 joinedAt, uint8 role, uint256 actionTokens, uint256 lastTokenRefill, bool isActive))",
  "function getMemberCount(bytes32 daoId) external view returns (uint256)",
  "function isMember(bytes32 daoId, address member) external view returns (bool)",
  
  // Events
  "event DAOCreated(bytes32 indexed daoId, address indexed founder, string name, string geographicRegion)",
  "event ChapterCreated(bytes32 indexed chapterId, bytes32 indexed parentDaoId, string name, address coordinator)",
  "event MemberJoined(bytes32 indexed daoId, address indexed member, uint8 role)",
  "event MemberLeft(bytes32 indexed daoId, address indexed member)",
] as const;

export const NebulaGovernanceABI = [
  // Proposal Creation
  "function createProposal(bytes32 daoId, string title, string descriptionHash, uint8 proposalType, string executionHash) external returns (bytes32)",
  "function cancelProposal(bytes32 proposalId) external",
  
  // Graduated Filtration
  "function voteInMicroPoll(bytes32 proposalId, bool approve) external",
  "function advanceToActiveVoting(bytes32 proposalId) external",
  
  // Voting
  "function castVote(bytes32 proposalId, uint8 option, string reasonHash) external",
  
  // Finalization
  "function finalizeProposal(bytes32 proposalId) external",
  "function executeProposal(bytes32 proposalId) external",
  
  // View Functions
  "function getProposal(bytes32 proposalId) external view returns (tuple(bytes32 proposalId, bytes32 daoId, address proposer, string title, string descriptionHash, uint8 proposalType, uint8 state, uint256 createdAt, uint256 votingStartsAt, uint256 votingEndsAt, uint256 forVotes, uint256 againstVotes, uint256 abstainVotes, string executionHash, bool executed))",
  "function getDAOProposals(bytes32 daoId) external view returns (bytes32[])",
  "function getVote(bytes32 proposalId, address voter) external view returns (tuple(address voter, uint8 option, uint256 weight, uint256 timestamp, string reasonHash))",
  "function hasVoted(bytes32 proposalId, address voter) external view returns (bool)",
  
  // Events
  "event ProposalCreated(bytes32 indexed proposalId, bytes32 indexed daoId, address indexed proposer, string title, uint8 proposalType)",
  "event ProposalStateChanged(bytes32 indexed proposalId, uint8 oldState, uint8 newState)",
  "event VoteCast(bytes32 indexed proposalId, address indexed voter, uint8 option, uint256 weight)",
  "event ProposalExecuted(bytes32 indexed proposalId, string executionHash)",
] as const;

export const NebulaTreasuryABI = [
  // Initialization
  "function initializeTreasury(bytes32 daoId) external",
  
  // Deposits
  "function depositETH(bytes32 daoId) external payable",
  "function depositToken(bytes32 daoId, address token, uint256 amount) external",
  
  // Withdrawals
  "function executeWithdrawal(bytes32 proposalId, address recipient, address token, uint256 amount, string descriptionHash) external",
  
  // View Functions
  "function getTreasury(bytes32 daoId) external view returns (tuple(bytes32 daoId, uint256 ethBalance, uint256 totalDeposits, uint256 totalWithdrawals, bool isActive))",
  "function getETHBalance(bytes32 daoId) external view returns (uint256)",
  "function getTokenBalance(bytes32 daoId, address token) external view returns (uint256)",
  "function getDAOTransactions(bytes32 daoId) external view returns (bytes32[])",
  "function getTransaction(bytes32 transactionId) external view returns (tuple(bytes32 transactionId, bytes32 daoId, uint8 txType, address token, uint256 amount, address from, address to, bytes32 proposalId, string descriptionHash, uint256 timestamp))",
  
  // Events
  "event TreasuryCreated(bytes32 indexed daoId)",
  "event Deposited(bytes32 indexed daoId, address indexed depositor, address indexed token, uint256 amount)",
  "event Withdrawn(bytes32 indexed daoId, address indexed recipient, address indexed token, uint256 amount, bytes32 proposalId)",
] as const;

export const NebulaAgentRegistryABI = [
  // Registration
  "function registerAgent(string name, string descriptionHash, string modelIdentifier, uint8[] requestedCapabilities) external returns (bytes32)",
  "function grantCapability(bytes32 agentId, uint8 capability) external",
  "function revokeCapability(bytes32 agentId, uint8 capability) external",
  
  // Ethos Layer
  "function logAgentAction(bytes32 agentId, string actionType, string actionHash, tuple(bool reduceSuffering, bool increaseProsperity, bool increaseUnderstanding, bool passed, string reasonHash) ethosCheck) external returns (bytes32)",
  "function updateEthosStatus(bytes32 agentId, uint8 status, uint8 newTrustLevel) external",
  
  // Communication
  "function logCommunication(bytes32 senderAgentId, bytes32 receiverAgentId, string contentHash, bool isP2P) external returns (bytes32)",
  
  // Management
  "function deactivateAgent(bytes32 agentId, string reason) external",
  "function forceDeactivateAgent(bytes32 agentId, string reason) external",
  
  // View Functions
  "function getAgent(bytes32 agentId) external view returns (bytes32, address, string, string, uint8, uint8, bool, uint256, uint256)",
  "function getAgentCapabilities(bytes32 agentId) external view returns (uint8[])",
  "function agentHasCapability(bytes32 agentId, uint8 capability) external view returns (bool)",
  "function getControllerAgents(address controller) external view returns (bytes32[])",
  "function getAllAgents() external view returns (bytes32[])",
  "function getAgentActions(bytes32 agentId) external view returns (bytes32[])",
  "function getAgentCommunications(bytes32 agentId) external view returns (bytes32[])",
  
  // Events
  "event AgentRegistered(bytes32 indexed agentId, address indexed controller, string name, string modelIdentifier)",
  "event AgentDeactivated(bytes32 indexed agentId, string reason)",
  "event AgentTrustLevelChanged(bytes32 indexed agentId, uint8 newLevel)",
  "event AgentActionLogged(bytes32 indexed actionId, bytes32 indexed agentId, string actionType, bool ethosPass)",
  "event EthosViolationRecorded(bytes32 indexed agentId, bytes32 indexed actionId, string reason)",
  "event AgentCommunicationLogged(bytes32 indexed communicationId, bytes32 indexed senderId, bytes32 indexed receiverId)",
] as const;
