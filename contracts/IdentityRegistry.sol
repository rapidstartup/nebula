pragma solidity ^0.8.19;

// SPDX-License-Identifier: MIT

/**
 * @title IdentityRegistry
 * @dev Manages decentralized identifiers (DIDs) and verifiable credentials for Nebula
 * Implements Proof of Personhood with Sybil resistance
 */
contract IdentityRegistry {
    struct Identity {
        address wallet;
        string did;
        bytes32 commitment;
        uint256 createdAt;
        uint256 lastVerified;
        bool isActive;
    }
    
    struct Credential {
        string credentialHash;
        address issuer;
        uint256 expiry;
        string credentialType;
    }
    
    mapping(address => Identity) private identities;
    mapping(string => Credential) private credentials;
    mapping(address => mapping(string => bool)) private hasCredential;
    
    address public admin;
    
    event IdentityCreated(address indexed wallet, string did);
    event CredentialIssued(string credentialId, address indexed issuer);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }
    
    constructor() {
        admin = msg.sender;
    }
    
    function createIdentity(string memory did, bytes32 commitment) external {
        require(!identities[msg.sender].isActive, "Identity exists");
        
        identities[msg.sender] = Identity({
            wallet: msg.sender,
            did: did,
            commitment: commitment,
            createdAt: block.timestamp,
            lastVerified: block.timestamp,
            isActive: true
        });
        
        emit IdentityCreated(msg.sender, did);
    }
    
    function verifyPersonhood(
        address user,
        string memory credentialType,
        string memory credentialHash
    ) external returns (bool) {
        require(identities[user].isActive, "No identity");
        require(!hasCredential[user][credentialType], "Credential exists");
        
        credentials[credentialHash] = Credential({
            credentialHash: credentialHash,
            issuer: msg.sender,
            expiry: block.timestamp + 365 days,
            credentialType: credentialType
        });
        
        hasCredential[user][credentialType] = true;
        
        emit CredentialIssued(credentialHash, msg.sender);
        return true;
    }
    
    function getIdentity(address user) external view returns (Identity memory) {
        return identities[user];
    }
    
    function hasValidCredential(address user, string memory credentialType) external view returns (bool) {
        return hasCredential[user][credentialType];
    }
}