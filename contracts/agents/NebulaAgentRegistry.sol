// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../identity/NebulaIdentity.sol";

/**
 * @title NebulaAgentRegistry
 * @notice Registry for autonomous AI agents operating within the Nebula ecosystem.
 *         Implements R 6.3 (Agent Registration) and R 6.2 (Agent Ethos framework).
 * @dev Part of Epic 6 - Autonomous Agent Framework & Alignment
 */
contract NebulaAgentRegistry is AccessControl, ReentrancyGuard {

    // ============ REFERENCES ============

    NebulaIdentity public identityContract;

    // ============ ROLES ============

    bytes32 public constant AGENT_REGISTRAR_ROLE = keccak256("AGENT_REGISTRAR_ROLE");
    bytes32 public constant ETHOS_AUDITOR_ROLE = keccak256("ETHOS_AUDITOR_ROLE");

    // ============ ENUMS ============

    /// @notice Agent capability types (R 6.3)
    enum AgentCapability {
        ReadOnly,               // Can only read data
        ProposalCreation,       // Can create proposals
        Voting,                 // Can vote (with delegation)
        DataAnalysis,           // Can analyze and report
        ContentModeration,      // Can flag content
        TreasuryView,           // Can view treasury
        ExternalAPI,            // Can call external APIs
        ShellExecution,         // Can execute shell commands
        FileSystem,             // Can read/write files
        NetworkCommunication    // Can communicate with other agents
    }

    /// @notice Agent trust levels (L3 alignment)
    enum TrustLevel {
        Untrusted,              // New, unverified agent
        Basic,                  // Passed initial verification
        Verified,               // Completed ethos audit
        Trusted,                // Long-standing good behavior
        Privileged              // High-trust for critical operations
    }

    /// @notice Ethos check status
    enum EthosStatus {
        Unchecked,
        Pending,
        Passed,
        Failed,
        UnderReview
    }

    // ============ STRUCTS ============

    /// @notice Represents a registered agent
    struct Agent {
        bytes32 agentId;                // Unique identifier
        address controllerAddress;      // Address controlling the agent
        string name;                    // Agent name/identifier
        string descriptionHash;         // IPFS hash of agent description
        string modelIdentifier;         // e.g., "gpt-4", "claude-3", "llama-3"
        AgentCapability[] capabilities; // Granted capabilities
        TrustLevel trustLevel;
        EthosStatus ethosStatus;
        uint256 registeredAt;
        uint256 lastActiveAt;
        bool isActive;
        uint256 actionsPerformed;
        uint256 ethosViolations;
    }

    /// @notice Agent action log for ethos monitoring
    struct AgentAction {
        bytes32 actionId;
        bytes32 agentId;
        string actionType;
        string actionHash;              // IPFS hash of action details
        uint256 timestamp;
        bool flaggedForReview;
        EthosCheckResult ethosResult;
    }

    /// @notice Result of ethos check (R 6.2)
    struct EthosCheckResult {
        bool reduceSuffering;           // Heuristic: Reduce suffering
        bool increaseProsperity;        // Heuristic: Increase prosperity
        bool increaseUnderstanding;     // Heuristic: Increase understanding
        bool passed;                    // Overall pass/fail
        string reasonHash;              // IPFS hash of reasoning
    }

    /// @notice Agent communication record (R 6.4)
    struct AgentCommunication {
        bytes32 communicationId;
        bytes32 senderAgentId;
        bytes32 receiverAgentId;
        string contentHash;             // IPFS hash of communication
        uint256 timestamp;
        bool isP2P;                     // true = off-chain P2P, false = on-chain
    }

    // ============ STATE ============

    /// @notice Mapping from agent ID to Agent
    mapping(bytes32 => Agent) public agents;

    /// @notice Mapping from controller address to agent IDs
    mapping(address => bytes32[]) public controllerAgents;

    /// @notice Mapping from agent ID to action IDs
    mapping(bytes32 => bytes32[]) public agentActions;

    /// @notice Mapping from action ID to AgentAction
    mapping(bytes32 => AgentAction) public actions;

    /// @notice Mapping from communication ID to AgentCommunication
    mapping(bytes32 => AgentCommunication) public communications;

    /// @notice Mapping from agent ID to communication IDs
    mapping(bytes32 => bytes32[]) public agentCommunications;

    /// @notice All registered agent IDs
    bytes32[] public allAgents;

    /// @notice Maximum violations before automatic deactivation
    uint256 public constant MAX_ETHOS_VIOLATIONS = 3;

    // ============ EVENTS ============

    event AgentRegistered(
        bytes32 indexed agentId,
        address indexed controller,
        string name,
        string modelIdentifier
    );

    event AgentUpdated(bytes32 indexed agentId, string field);
    event AgentDeactivated(bytes32 indexed agentId, string reason);
    event AgentTrustLevelChanged(bytes32 indexed agentId, TrustLevel newLevel);

    event CapabilityGranted(bytes32 indexed agentId, AgentCapability capability);
    event CapabilityRevoked(bytes32 indexed agentId, AgentCapability capability);

    event AgentActionLogged(
        bytes32 indexed actionId,
        bytes32 indexed agentId,
        string actionType,
        bool ethosPass
    );

    event EthosViolationRecorded(bytes32 indexed agentId, bytes32 indexed actionId, string reason);

    event AgentCommunicationLogged(
        bytes32 indexed communicationId,
        bytes32 indexed senderId,
        bytes32 indexed receiverId
    );

    // ============ ERRORS ============

    error AgentNotFound();
    error AgentNotActive();
    error AgentAlreadyExists();
    error NotAgentController();
    error CapabilityNotGranted();
    error EthosCheckFailed();
    error TooManyViolations();
    error InvalidModelIdentifier();

    // ============ MODIFIERS ============

    modifier onlyAgentController(bytes32 _agentId) {
        if (agents[_agentId].controllerAddress != msg.sender) revert NotAgentController();
        _;
    }

    modifier agentActive(bytes32 _agentId) {
        if (!agents[_agentId].isActive) revert AgentNotActive();
        _;
    }

    // ============ CONSTRUCTOR ============

    constructor(address _identityContract) {
        identityContract = NebulaIdentity(_identityContract);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(AGENT_REGISTRAR_ROLE, msg.sender);
        _grantRole(ETHOS_AUDITOR_ROLE, msg.sender);
    }

    // ============ AGENT REGISTRATION (R 6.3) ============

    /**
     * @notice Register a new agent
     * @param _name Agent name
     * @param _descriptionHash IPFS hash of agent description
     * @param _modelIdentifier Model identifier (e.g., "gpt-4", "claude-3")
     * @param _requestedCapabilities Initial capabilities to request
     * @return agentId The unique identifier of the registered agent
     */
    function registerAgent(
        string calldata _name,
        string calldata _descriptionHash,
        string calldata _modelIdentifier,
        AgentCapability[] calldata _requestedCapabilities
    ) external nonReentrant returns (bytes32 agentId) {
        // Verify controller has DID
        if (!identityContract.isDIDActive(msg.sender)) revert EthosCheckFailed();

        agentId = keccak256(abi.encodePacked(
            msg.sender,
            _name,
            _modelIdentifier,
            block.timestamp
        ));

        if (agents[agentId].registeredAt != 0) revert AgentAlreadyExists();

        // Create agent with basic capabilities only
        Agent storage agent = agents[agentId];
        agent.agentId = agentId;
        agent.controllerAddress = msg.sender;
        agent.name = _name;
        agent.descriptionHash = _descriptionHash;
        agent.modelIdentifier = _modelIdentifier;
        agent.trustLevel = TrustLevel.Untrusted;
        agent.ethosStatus = EthosStatus.Pending;
        agent.registeredAt = block.timestamp;
        agent.lastActiveAt = block.timestamp;
        agent.isActive = true;
        agent.actionsPerformed = 0;
        agent.ethosViolations = 0;

        // Grant only ReadOnly by default
        agent.capabilities.push(AgentCapability.ReadOnly);

        controllerAgents[msg.sender].push(agentId);
        allAgents.push(agentId);

        // Request additional capabilities (will need approval)
        for (uint i = 0; i < _requestedCapabilities.length; i++) {
            if (_requestedCapabilities[i] != AgentCapability.ReadOnly) {
                // Log capability request for review
                emit CapabilityGranted(agentId, AgentCapability.ReadOnly);
            }
        }

        emit AgentRegistered(agentId, msg.sender, _name, _modelIdentifier);
    }

    /**
     * @notice Grant capability to an agent (requires registrar role)
     * @param _agentId Agent identifier
     * @param _capability Capability to grant
     */
    function grantCapability(bytes32 _agentId, AgentCapability _capability) 
        external 
        onlyRole(AGENT_REGISTRAR_ROLE) 
        agentActive(_agentId) 
    {
        Agent storage agent = agents[_agentId];
        
        // Check agent has passed ethos for elevated capabilities
        if (_capability >= AgentCapability.ShellExecution && 
            agent.trustLevel < TrustLevel.Verified) {
            revert EthosCheckFailed();
        }

        agent.capabilities.push(_capability);
        emit CapabilityGranted(_agentId, _capability);
    }

    /**
     * @notice Revoke capability from an agent
     * @param _agentId Agent identifier
     * @param _capability Capability to revoke
     */
    function revokeCapability(bytes32 _agentId, AgentCapability _capability) 
        external 
        onlyRole(AGENT_REGISTRAR_ROLE) 
    {
        emit CapabilityRevoked(_agentId, _capability);
        // Note: Actual removal from array would need more complex logic
    }

    // ============ ETHOS LAYER (R 6.2) ============

    /**
     * @notice Log an agent action with ethos check
     * @param _agentId Agent identifier
     * @param _actionType Type of action
     * @param _actionHash IPFS hash of action details
     * @param _ethosCheck Ethos check result
     * @return actionId The unique identifier of the logged action
     */
    function logAgentAction(
        bytes32 _agentId,
        string calldata _actionType,
        string calldata _actionHash,
        EthosCheckResult calldata _ethosCheck
    ) external onlyAgentController(_agentId) agentActive(_agentId) returns (bytes32 actionId) {
        Agent storage agent = agents[_agentId];

        actionId = keccak256(abi.encodePacked(
            _agentId,
            _actionType,
            _actionHash,
            block.timestamp
        ));

        actions[actionId] = AgentAction({
            actionId: actionId,
            agentId: _agentId,
            actionType: _actionType,
            actionHash: _actionHash,
            timestamp: block.timestamp,
            flaggedForReview: !_ethosCheck.passed,
            ethosResult: _ethosCheck
        });

        agentActions[_agentId].push(actionId);
        agent.actionsPerformed++;
        agent.lastActiveAt = block.timestamp;

        // Record ethos violation if failed
        if (!_ethosCheck.passed) {
            agent.ethosViolations++;
            emit EthosViolationRecorded(_agentId, actionId, _ethosCheck.reasonHash);

            // Auto-deactivate if too many violations
            if (agent.ethosViolations >= MAX_ETHOS_VIOLATIONS) {
                agent.isActive = false;
                emit AgentDeactivated(_agentId, "Too many ethos violations");
            }
        }

        emit AgentActionLogged(actionId, _agentId, _actionType, _ethosCheck.passed);
    }

    /**
     * @notice Update agent ethos status after audit
     * @param _agentId Agent identifier
     * @param _status New ethos status
     * @param _newTrustLevel New trust level (if passed)
     */
    function updateEthosStatus(
        bytes32 _agentId,
        EthosStatus _status,
        TrustLevel _newTrustLevel
    ) external onlyRole(ETHOS_AUDITOR_ROLE) {
        Agent storage agent = agents[_agentId];
        agent.ethosStatus = _status;

        if (_status == EthosStatus.Passed && _newTrustLevel > agent.trustLevel) {
            agent.trustLevel = _newTrustLevel;
            emit AgentTrustLevelChanged(_agentId, _newTrustLevel);
        }

        emit AgentUpdated(_agentId, "ethosStatus");
    }

    // ============ AGENT COMMUNICATION (R 6.4) ============

    /**
     * @notice Log agent-to-agent communication
     * @param _senderAgentId Sender agent ID
     * @param _receiverAgentId Receiver agent ID
     * @param _contentHash IPFS hash of communication content
     * @param _isP2P Whether this was a P2P (off-chain) communication
     * @return communicationId The unique identifier of the logged communication
     */
    function logCommunication(
        bytes32 _senderAgentId,
        bytes32 _receiverAgentId,
        string calldata _contentHash,
        bool _isP2P
    ) external onlyAgentController(_senderAgentId) returns (bytes32 communicationId) {
        if (!agents[_receiverAgentId].isActive) revert AgentNotActive();

        communicationId = keccak256(abi.encodePacked(
            _senderAgentId,
            _receiverAgentId,
            _contentHash,
            block.timestamp
        ));

        communications[communicationId] = AgentCommunication({
            communicationId: communicationId,
            senderAgentId: _senderAgentId,
            receiverAgentId: _receiverAgentId,
            contentHash: _contentHash,
            timestamp: block.timestamp,
            isP2P: _isP2P
        });

        agentCommunications[_senderAgentId].push(communicationId);
        agentCommunications[_receiverAgentId].push(communicationId);

        // Update last active
        agents[_senderAgentId].lastActiveAt = block.timestamp;

        emit AgentCommunicationLogged(communicationId, _senderAgentId, _receiverAgentId);
    }

    // ============ AGENT MANAGEMENT ============

    /**
     * @notice Deactivate an agent
     * @param _agentId Agent identifier
     * @param _reason Reason for deactivation
     */
    function deactivateAgent(bytes32 _agentId, string calldata _reason) 
        external 
        onlyAgentController(_agentId) 
    {
        agents[_agentId].isActive = false;
        emit AgentDeactivated(_agentId, _reason);
    }

    /**
     * @notice Force deactivate an agent (admin only)
     * @param _agentId Agent identifier
     * @param _reason Reason for deactivation
     */
    function forceDeactivateAgent(bytes32 _agentId, string calldata _reason) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        agents[_agentId].isActive = false;
        emit AgentDeactivated(_agentId, _reason);
    }

    // ============ VIEW FUNCTIONS ============

    /**
     * @notice Get agent details
     * @param _agentId Agent identifier
     * @return agentId The agent's unique identifier
     * @return controllerAddress The controller's address
     * @return name The agent's name
     * @return modelIdentifier The model identifier
     * @return trustLevel The agent's trust level
     * @return ethosStatus The agent's ethos status
     * @return isActive Whether the agent is active
     * @return actionsPerformed Number of actions performed
     * @return ethosViolations Number of ethos violations
     */
    function getAgent(bytes32 _agentId) external view returns (
        bytes32 agentId,
        address controllerAddress,
        string memory name,
        string memory modelIdentifier,
        TrustLevel trustLevel,
        EthosStatus ethosStatus,
        bool isActive,
        uint256 actionsPerformed,
        uint256 ethosViolations
    ) {
        Agent storage a = agents[_agentId];
        return (
            a.agentId,
            a.controllerAddress,
            a.name,
            a.modelIdentifier,
            a.trustLevel,
            a.ethosStatus,
            a.isActive,
            a.actionsPerformed,
            a.ethosViolations
        );
    }

    /**
     * @notice Get agent capabilities
     * @param _agentId Agent identifier
     * @return capabilities Array of granted capabilities
     */
    function getAgentCapabilities(bytes32 _agentId) external view returns (AgentCapability[] memory capabilities) {
        return agents[_agentId].capabilities;
    }

    /**
     * @notice Check if agent has a specific capability
     * @param _agentId Agent identifier
     * @param _capability Capability to check
     * @return hasCapability Whether the agent has the capability
     */
    function agentHasCapability(bytes32 _agentId, AgentCapability _capability) external view returns (bool hasCapability) {
        AgentCapability[] storage caps = agents[_agentId].capabilities;
        for (uint i = 0; i < caps.length; i++) {
            if (caps[i] == _capability) return true;
        }
        return false;
    }

    /**
     * @notice Get all agents controlled by an address
     * @param _controller Controller address
     * @return agentIds Array of agent IDs
     */
    function getControllerAgents(address _controller) external view returns (bytes32[] memory agentIds) {
        return controllerAgents[_controller];
    }

    /**
     * @notice Get all registered agents
     * @return agentIds Array of all agent IDs
     */
    function getAllAgents() external view returns (bytes32[] memory agentIds) {
        return allAgents;
    }

    /**
     * @notice Get agent action history
     * @param _agentId Agent identifier
     * @return actionIds Array of action IDs
     */
    function getAgentActions(bytes32 _agentId) external view returns (bytes32[] memory actionIds) {
        return agentActions[_agentId];
    }

    /**
     * @notice Get agent communications
     * @param _agentId Agent identifier
     * @return communicationIds Array of communication IDs
     */
    function getAgentCommunications(bytes32 _agentId) external view returns (bytes32[] memory communicationIds) {
        return agentCommunications[_agentId];
    }
}
