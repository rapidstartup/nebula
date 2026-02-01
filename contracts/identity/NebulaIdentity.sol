// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

/**
 * @title NebulaIdentity
 * @notice Implements Decentralized Identifiers (DIDs), Verifiable Credentials (VCs),
 *         and Proof of Personhood (PoP) for the Nebula governance platform.
 * @dev Addresses R 5.1 (Proof of Personhood), R 5.2 (Info Wallet), R 5.3 (Grant/Revoke Access)
 */
contract NebulaIdentity is AccessControl {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    // ============ ROLES ============
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant AGENT_ROLE = keccak256("AGENT_ROLE");

    // ============ STRUCTS ============
    
    /// @notice Represents a Decentralized Identifier (DID) document
    struct DIDDocument {
        address controller;           // Primary controller of the DID
        uint256 createdAt;           // Timestamp of creation
        uint256 updatedAt;           // Last update timestamp
        bool isActive;               // Active status
        string didMethod;            // DID method (e.g., "did:nebula")
        bytes32 publicKeyHash;       // Hash of the public key
    }

    /// @notice Represents a Verifiable Credential (VC)
    struct VerifiableCredential {
        bytes32 credentialHash;      // Hash of the credential data
        address issuer;              // Issuer of the credential
        address subject;             // Subject (holder) of the credential
        uint256 issuedAt;           // Issuance timestamp
        uint256 expiresAt;          // Expiration timestamp (0 = never)
        CredentialType credentialType;
        bool isRevoked;
    }

    /// @notice Types of verifiable credentials
    enum CredentialType {
        ProofOfPersonhood,          // Sybil-resistant identity proof
        ProofOfResidency,           // Geographic verification
        DAOMembership,              // Membership in a specific DAO
        AgentCapability,            // Agent capability credentials
        VotingRight                 // Right to vote in specific context
    }

    // ============ STATE ============
    
    /// @notice Mapping from address to DID document
    mapping(address => DIDDocument) public didDocuments;
    
    /// @notice Mapping from credential ID to credential
    mapping(bytes32 => VerifiableCredential) public credentials;
    
    /// @notice Mapping from subject to their credential IDs
    mapping(address => bytes32[]) public subjectCredentials;
    
    /// @notice Mapping from subject to issuer to access grants
    mapping(address => mapping(address => bool)) public accessGrants;
    
    /// @notice Mapping for Proof of Personhood uniqueness (one per real person)
    mapping(bytes32 => bool) public usedBiometricHashes;

    /// @notice Total number of registered DIDs
    uint256 public totalDIDs;

    // ============ EVENTS ============
    
    event DIDCreated(address indexed controller, string didMethod, bytes32 publicKeyHash);
    event DIDUpdated(address indexed controller, bytes32 newPublicKeyHash);
    event DIDDeactivated(address indexed controller);
    
    event CredentialIssued(
        bytes32 indexed credentialId,
        address indexed issuer,
        address indexed subject,
        CredentialType credentialType
    );
    event CredentialRevoked(bytes32 indexed credentialId, address indexed revoker);
    
    event AccessGranted(address indexed subject, address indexed grantee);
    event AccessRevoked(address indexed subject, address indexed revokee);
    
    event ProofOfPersonhoodVerified(address indexed subject, bytes32 indexed credentialId);

    // ============ ERRORS ============
    
    error DIDAlreadyExists();
    error DIDNotFound();
    error DIDNotActive();
    error CredentialNotFound();
    error CredentialExpired();
    error CredentialIsRevoked();
    error NotCredentialSubject();
    error NotCredentialIssuer();
    error BiometricAlreadyUsed();
    error InvalidSignature();
    error AccessNotGranted();

    // ============ CONSTRUCTOR ============
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
    }

    // ============ DID MANAGEMENT ============

    /**
     * @notice Create a new DID document for the caller
     * @param _publicKeyHash Hash of the user's public key
     */
    function createDID(bytes32 _publicKeyHash) external {
        if (didDocuments[msg.sender].isActive) revert DIDAlreadyExists();
        
        didDocuments[msg.sender] = DIDDocument({
            controller: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            isActive: true,
            didMethod: "did:nebula",
            publicKeyHash: _publicKeyHash
        });
        
        totalDIDs++;
        emit DIDCreated(msg.sender, "did:nebula", _publicKeyHash);
    }

    /**
     * @notice Update the public key associated with a DID
     * @param _newPublicKeyHash New public key hash
     */
    function updateDID(bytes32 _newPublicKeyHash) external {
        DIDDocument storage doc = didDocuments[msg.sender];
        if (!doc.isActive) revert DIDNotActive();
        
        doc.publicKeyHash = _newPublicKeyHash;
        doc.updatedAt = block.timestamp;
        
        emit DIDUpdated(msg.sender, _newPublicKeyHash);
    }

    /**
     * @notice Deactivate a DID (cannot be reactivated)
     */
    function deactivateDID() external {
        DIDDocument storage doc = didDocuments[msg.sender];
        if (!doc.isActive) revert DIDNotActive();
        
        doc.isActive = false;
        doc.updatedAt = block.timestamp;
        
        emit DIDDeactivated(msg.sender);
    }

    // ============ CREDENTIAL MANAGEMENT ============

    /**
     * @notice Issue a Verifiable Credential to a subject
     * @param _subject Address of the credential subject
     * @param _credentialType Type of credential
     * @param _credentialDataHash Hash of the credential data (stored off-chain)
     * @param _expiresAt Expiration timestamp (0 for no expiration)
     * @return credentialId The unique identifier of the issued credential
     */
    function issueCredential(
        address _subject,
        CredentialType _credentialType,
        bytes32 _credentialDataHash,
        uint256 _expiresAt
    ) external onlyRole(VERIFIER_ROLE) returns (bytes32 credentialId) {
        return _issueCredentialInternal(_subject, _credentialType, _credentialDataHash, _expiresAt);
    }

    /**
     * @notice Internal function to issue credentials
     */
    function _issueCredentialInternal(
        address _subject,
        CredentialType _credentialType,
        bytes32 _credentialDataHash,
        uint256 _expiresAt
    ) internal returns (bytes32 credentialId) {
        if (!didDocuments[_subject].isActive) revert DIDNotActive();
        
        credentialId = keccak256(abi.encodePacked(
            msg.sender,
            _subject,
            _credentialType,
            _credentialDataHash,
            block.timestamp
        ));
        
        credentials[credentialId] = VerifiableCredential({
            credentialHash: _credentialDataHash,
            issuer: msg.sender,
            subject: _subject,
            issuedAt: block.timestamp,
            expiresAt: _expiresAt,
            credentialType: _credentialType,
            isRevoked: false
        });
        
        subjectCredentials[_subject].push(credentialId);
        
        emit CredentialIssued(credentialId, msg.sender, _subject, _credentialType);
    }

    /**
     * @notice Issue Proof of Personhood credential with Sybil resistance
     * @param _subject Address of the credential subject
     * @param _biometricHash Hash of biometric data (ensures one credential per person)
     * @param _signature Signature proving control of the subject address
     * @return credentialId The unique identifier of the PoP credential
     */
    function issueProofOfPersonhood(
        address _subject,
        bytes32 _biometricHash,
        bytes memory _signature
    ) external onlyRole(VERIFIER_ROLE) returns (bytes32 credentialId) {
        // Ensure Sybil resistance - one PoP per real person
        if (usedBiometricHashes[_biometricHash]) revert BiometricAlreadyUsed();
        
        // Verify the subject signed the biometric hash
        bytes32 messageHash = keccak256(abi.encodePacked(_biometricHash, _subject));
        bytes32 ethSignedHash = messageHash.toEthSignedMessageHash();
        address signer = ethSignedHash.recover(_signature);
        if (signer != _subject) revert InvalidSignature();
        
        // Mark biometric hash as used
        usedBiometricHashes[_biometricHash] = true;
        
        // Issue the credential
        credentialId = _issueCredentialInternal(
            _subject,
            CredentialType.ProofOfPersonhood,
            _biometricHash,
            0 // No expiration for PoP
        );
        
        emit ProofOfPersonhoodVerified(_subject, credentialId);
    }

    /**
     * @notice Revoke a credential
     * @param _credentialId ID of the credential to revoke
     */
    function revokeCredential(bytes32 _credentialId) external {
        VerifiableCredential storage cred = credentials[_credentialId];
        if (cred.issuer == address(0)) revert CredentialNotFound();
        if (msg.sender != cred.issuer && !hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            revert NotCredentialIssuer();
        }
        
        cred.isRevoked = true;
        emit CredentialRevoked(_credentialId, msg.sender);
    }

    // ============ ACCESS CONTROL (R 5.3) ============

    /**
     * @notice Grant access to credentials to another address
     * @param _grantee Address to grant access to
     */
    function grantAccess(address _grantee) external {
        if (!didDocuments[msg.sender].isActive) revert DIDNotActive();
        accessGrants[msg.sender][_grantee] = true;
        emit AccessGranted(msg.sender, _grantee);
    }

    /**
     * @notice Revoke access from an address
     * @param _revokee Address to revoke access from
     */
    function revokeAccess(address _revokee) external {
        accessGrants[msg.sender][_revokee] = false;
        emit AccessRevoked(msg.sender, _revokee);
    }

    // ============ VIEW FUNCTIONS ============

    /**
     * @notice Check if a DID is active
     * @param _controller Controller address to check
     * @return isActive Whether the DID is active
     */
    function isDIDActive(address _controller) external view returns (bool isActive) {
        return didDocuments[_controller].isActive;
    }

    /**
     * @notice Verify a credential is valid
     * @param _credentialId ID of the credential to verify
     * @return isValid Whether the credential is valid
     */
    function verifyCredential(bytes32 _credentialId) external view returns (bool isValid) {
        VerifiableCredential storage cred = credentials[_credentialId];
        
        if (cred.issuer == address(0)) return false;
        if (cred.isRevoked) return false;
        if (cred.expiresAt != 0 && block.timestamp > cred.expiresAt) return false;
        if (!didDocuments[cred.subject].isActive) return false;
        
        return true;
    }

    /**
     * @notice Check if an address has Proof of Personhood
     * @param _subject Address to check
     * @return hasPoP Whether the address has valid PoP
     */
    function hasProofOfPersonhood(address _subject) external view returns (bool hasPoP) {
        bytes32[] storage creds = subjectCredentials[_subject];
        for (uint256 i = 0; i < creds.length; i++) {
            VerifiableCredential storage cred = credentials[creds[i]];
            if (cred.credentialType == CredentialType.ProofOfPersonhood &&
                !cred.isRevoked &&
                (cred.expiresAt == 0 || block.timestamp <= cred.expiresAt)) {
                return true;
            }
        }
        return false;
    }

    /**
     * @notice Get all credentials for a subject
     * @param _subject Address of the subject
     * @return credentialIds Array of credential IDs
     */
    function getSubjectCredentials(address _subject) external view returns (bytes32[] memory credentialIds) {
        return subjectCredentials[_subject];
    }

    /**
     * @notice Check if access is granted
     * @param _subject Credential owner
     * @param _accessor Address checking access
     * @return hasAccess Whether access is granted
     */
    function checkAccess(address _subject, address _accessor) external view returns (bool hasAccess) {
        return accessGrants[_subject][_accessor];
    }
}
