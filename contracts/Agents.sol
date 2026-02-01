pragma solidity ^0.8.19;

// SPDX-License-Identifier: MIT

/**
 * @title Agents
 * @dev Agent registration and management system
 * Handles autonomous agent creation, verification, and communication
 */
contract Agents {
    struct Agent {
        string did;
        string modelType;
        string apiEndpoint;
        address wallet;
        uint256 reputationScore;
        bool isActive;
        uint256 createdAt;
        string[] capabilities;
    }
    
    struct Registration {
        string agentDID;
        address wallet;
        string modelHash; // Reference to model settings
        string ethosHash; // Agent behavior guidelines
        uint256 registrationFee;
        bool verified;
    }
    
    mapping(address => Agent) public agents;
    mapping(string => Registration) public registrations;
    address[] public registeredAgents;
    
    address public owner;
    uint256 public constant REGISTRATION_FEE = 0.01 ether;
    
    event AgentRegistered(address indexed agent, string did, string modelType);
    event AgentVerified(address indexed agent, bool verified);
    event AgentCommunication(address indexed from, address indexed to, string message);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function registerAgent(
        string memory did,
        string memory modelType,
        string memory apiEndpoint,
        string memory modelHash,
        string memory ethosHash,
        string[] memory capabilities
    ) external payable returns (uint256) {
        require(msg.value >= REGISTRATION_FEE, "Insufficient fee");
        require(!agents[msg.sender].isActive, "Already registered");
        
        agents[msg.sender] = Agent({
            did: did,
            modelType: modelType,
            apiEndpoint: apiEndpoint,
            wallet: msg.sender,
            reputationScore: 100,
            isActive: true,
            createdAt: block.timestamp,
            capabilities: capabilities
        });
        
        registrations[did] = Registration({
            agentDID: did,
            wallet: msg.sender,
            modelHash: modelHash,
            ethosHash: ethosHash,
            registrationFee: msg.value,
            verified: false
        });
        
        registeredAgents.push(msg.sender);
        
        emit AgentRegistered(msg.sender, did, modelType);
        return registeredAgents.length - 1;
    }
    
    function verifyAgent(address agentAddress, bool verified) external onlyOwner {
        require(agents[agentAddress].isActive, "Not registered");
        
        Agent storage agent = agents[agentAddress];
        Registration storage reg = registrations[agent.did];
        reg.verified = verified;
        
        if (verified) {
            agent.reputationScore += 50;
        } else {
            agent.reputationScore = 0;
            agent.isActive = false;
        }
        
        emit AgentVerified(agentAddress, verified);
    }
    
    function sendMessage(address toAgent, string memory message) external {
        require(agents[msg.sender].isActive, "Not registered");
        require(agents[toAgent].isActive, "Recipient not active");
        
        emit AgentCommunication(msg.sender, toAgent, message);
    }
    
    function getAgent(address agentAddress) external view returns (Agent memory) {
        return agents[agentAddress];
    }
    
    function getRegisteredAgents() external view returns (address[] memory) {
        return registeredAgents;
    }
    
    function updateReputation(address agent, int256 change) external onlyOwner {
        require(agents[agent].isActive, "Not active");
        
        if (change > 0) {
            agents[agent].reputationScore += uint256(change);
        } else {
            uint256 decrease = uint256(-change);
            agents[agent].reputationScore = agents[agent].reputationScore > decrease ? 
                                            agents[agent].reputationScore - decrease : 0;
        }
    }
    
    function isAgentActive(address agentAddress) external view returns (bool) {
        return agents[agentAddress].isActive;
    }
    
    function getAgentCapabilities(address agentAddress) external view returns (string[] memory) {
        return agents[agentAddress].capabilities;
    }
    
    function getAgentCount() external view returns (uint256) {
        return registeredAgents.length;
    }
    
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds");
        payable(owner).transfer(balance);
    }
}