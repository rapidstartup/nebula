// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../identity/NebulaIdentity.sol";

/**
 * @title NebulaDAO
 * @notice Factory and registry for creating and managing DAOs on the Nebula platform.
 *         Supports geographic chapters, membership management, and governance configuration.
 * @dev Implements Epic 2 (DAO Formation & Management) from the PRD
 */
contract NebulaDAO is AccessControl, ReentrancyGuard {
    
    // ============ REFERENCES ============
    
    NebulaIdentity public identityContract;

    // ============ STRUCTS ============

    /// @notice Configuration for a DAO
    struct DAOConfig {
        string name;                    // DAO name
        string description;             // DAO description
        string geographicRegion;        // Geographic boundary (GeoJSON hash on IPFS)
        uint256 quorumPercent;          // Required quorum (0-100)
        uint256 votingPeriod;           // Voting duration in seconds
        uint256 proposalThreshold;      // Min tokens to create proposal
        bool requiresPoP;               // Requires Proof of Personhood
        bool requiresResidency;         // Requires Proof of Residency
    }

    /// @notice Represents a DAO instance
    struct DAO {
        bytes32 daoId;                  // Unique identifier
        address founder;                // Creator of the DAO
        uint256 createdAt;              // Creation timestamp
        bool isActive;                  // Active status
        DAOConfig config;               // DAO configuration
        string constitutionHash;        // IPFS hash of constitution/charter
    }

    /// @notice Represents a chapter within a DAO
    struct Chapter {
        bytes32 chapterId;              // Unique identifier
        bytes32 parentDaoId;            // Parent DAO
        string name;                    // Chapter name
        string geographicRegion;        // Sub-region (more specific than parent)
        address coordinator;            // Chapter coordinator
        uint256 memberCount;            // Number of members
        bool isActive;                  // Active status
    }

    /// @notice Member information
    struct Member {
        address memberAddress;          // Member's address
        uint256 joinedAt;              // When they joined
        MemberRole role;               // Their role
        uint256 actionTokens;          // R 7.1: Action tokens for governance
        uint256 lastTokenRefill;       // Last refill timestamp
        bool isActive;                 // Active status
    }

    /// @notice Member roles within a DAO
    enum MemberRole {
        Member,                         // Basic member
        Delegate,                       // Can receive delegated votes
        Coordinator,                    // Chapter coordinator
        Steward,                        // DAO-level steward
        Admin                           // Full administrative access
    }

    // ============ STATE ============

    /// @notice Mapping from DAO ID to DAO
    mapping(bytes32 => DAO) public daos;
    
    /// @notice Mapping from chapter ID to Chapter
    mapping(bytes32 => Chapter) public chapters;
    
    /// @notice Mapping from DAO ID to chapter IDs
    mapping(bytes32 => bytes32[]) public daoChapters;
    
    /// @notice Mapping from DAO ID to member address to Member
    mapping(bytes32 => mapping(address => Member)) public daoMembers;
    
    /// @notice Mapping from DAO ID to member addresses (for enumeration)
    mapping(bytes32 => address[]) public daoMemberList;
    
    /// @notice Mapping from chapter ID to member addresses
    mapping(bytes32 => address[]) public chapterMemberList;

    /// @notice List of all DAO IDs
    bytes32[] public allDAOs;

    /// @notice Action tokens refill amount per week
    uint256 public constant ACTION_TOKENS_PER_WEEK = 100;
    
    /// @notice Refill period (1 week)
    uint256 public constant TOKEN_REFILL_PERIOD = 7 days;

    // ============ EVENTS ============

    event DAOCreated(
        bytes32 indexed daoId,
        address indexed founder,
        string name,
        string geographicRegion
    );
    
    event DAOUpdated(bytes32 indexed daoId, string field);
    event DAODeactivated(bytes32 indexed daoId);
    
    event ChapterCreated(
        bytes32 indexed chapterId,
        bytes32 indexed parentDaoId,
        string name,
        address coordinator
    );
    
    event MemberJoined(
        bytes32 indexed daoId,
        address indexed member,
        MemberRole role
    );
    
    event MemberLeft(bytes32 indexed daoId, address indexed member);
    event MemberRoleChanged(bytes32 indexed daoId, address indexed member, MemberRole newRole);
    
    event ActionTokensSpent(bytes32 indexed daoId, address indexed member, uint256 amount);
    event ActionTokensRefilled(bytes32 indexed daoId, address indexed member, uint256 amount);

    // ============ ERRORS ============

    error DAONotFound();
    error DAONotActive();
    error DAOAlreadyExists();
    error ChapterNotFound();
    error ChapterNotActive();
    error NotDAOMember();
    error AlreadyMember();
    error InsufficientActionTokens();
    error IdentityRequirementNotMet();
    error NotAuthorized();
    error InvalidQuorum();
    error InvalidVotingPeriod();

    // ============ MODIFIERS ============

    modifier onlyActiveMember(bytes32 _daoId) {
        Member storage member = daoMembers[_daoId][msg.sender];
        if (!member.isActive) revert NotDAOMember();
        _;
    }

    modifier onlyDAOAdmin(bytes32 _daoId) {
        Member storage member = daoMembers[_daoId][msg.sender];
        if (!member.isActive || (member.role != MemberRole.Admin && member.role != MemberRole.Steward)) {
            revert NotAuthorized();
        }
        _;
    }

    // ============ CONSTRUCTOR ============

    constructor(address _identityContract) {
        identityContract = NebulaIdentity(_identityContract);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // ============ DAO CREATION ============

    /**
     * @notice Create a new DAO
     * @param _config DAO configuration
     * @return daoId The unique identifier of the created DAO
     */
    function createDAO(DAOConfig calldata _config) external nonReentrant returns (bytes32 daoId) {
        // Validate config
        if (_config.quorumPercent > 100) revert InvalidQuorum();
        if (_config.votingPeriod < 1 hours) revert InvalidVotingPeriod();
        
        // Check identity requirements for founder
        if (!identityContract.isDIDActive(msg.sender)) revert IdentityRequirementNotMet();
        if (_config.requiresPoP && !identityContract.hasProofOfPersonhood(msg.sender)) {
            revert IdentityRequirementNotMet();
        }
        
        // Generate DAO ID
        daoId = keccak256(abi.encodePacked(
            msg.sender,
            _config.name,
            _config.geographicRegion,
            block.timestamp
        ));
        
        if (daos[daoId].createdAt != 0) revert DAOAlreadyExists();
        
        // Create DAO
        daos[daoId] = DAO({
            daoId: daoId,
            founder: msg.sender,
            createdAt: block.timestamp,
            isActive: true,
            config: _config,
            constitutionHash: ""
        });
        
        allDAOs.push(daoId);
        
        // Add founder as admin member
        _addMember(daoId, msg.sender, MemberRole.Admin);
        
        emit DAOCreated(daoId, msg.sender, _config.name, _config.geographicRegion);
    }

    /**
     * @notice Update DAO constitution (requires admin)
     * @param _daoId DAO identifier
     * @param _constitutionHash IPFS hash of the new constitution
     */
    function updateConstitution(bytes32 _daoId, string calldata _constitutionHash) 
        external 
        onlyDAOAdmin(_daoId) 
    {
        daos[_daoId].constitutionHash = _constitutionHash;
        emit DAOUpdated(_daoId, "constitution");
    }

    /**
     * @notice Deactivate a DAO (requires admin)
     * @param _daoId DAO identifier
     */
    function deactivateDAO(bytes32 _daoId) external onlyDAOAdmin(_daoId) {
        daos[_daoId].isActive = false;
        emit DAODeactivated(_daoId);
    }

    // ============ CHAPTER MANAGEMENT ============

    /**
     * @notice Create a new chapter within a DAO
     * @param _daoId Parent DAO identifier
     * @param _name Chapter name
     * @param _geographicRegion Geographic sub-region
     * @return chapterId The unique identifier of the created chapter
     */
    function createChapter(
        bytes32 _daoId,
        string calldata _name,
        string calldata _geographicRegion
    ) external onlyDAOAdmin(_daoId) returns (bytes32 chapterId) {
        DAO storage dao = daos[_daoId];
        if (!dao.isActive) revert DAONotActive();
        
        chapterId = keccak256(abi.encodePacked(
            _daoId,
            _name,
            _geographicRegion,
            block.timestamp
        ));
        
        chapters[chapterId] = Chapter({
            chapterId: chapterId,
            parentDaoId: _daoId,
            name: _name,
            geographicRegion: _geographicRegion,
            coordinator: msg.sender,
            memberCount: 0,
            isActive: true
        });
        
        daoChapters[_daoId].push(chapterId);
        
        emit ChapterCreated(chapterId, _daoId, _name, msg.sender);
    }

    // ============ MEMBERSHIP ============

    /**
     * @notice Request to join a DAO
     * @param _daoId DAO identifier
     */
    function joinDAO(bytes32 _daoId) external nonReentrant {
        DAO storage dao = daos[_daoId];
        if (!dao.isActive) revert DAONotActive();
        
        Member storage existingMember = daoMembers[_daoId][msg.sender];
        if (existingMember.isActive) revert AlreadyMember();
        
        // Check identity requirements
        if (!identityContract.isDIDActive(msg.sender)) revert IdentityRequirementNotMet();
        if (dao.config.requiresPoP && !identityContract.hasProofOfPersonhood(msg.sender)) {
            revert IdentityRequirementNotMet();
        }
        
        _addMember(_daoId, msg.sender, MemberRole.Member);
    }

    /**
     * @notice Leave a DAO
     * @param _daoId DAO identifier
     */
    function leaveDAO(bytes32 _daoId) external onlyActiveMember(_daoId) {
        daoMembers[_daoId][msg.sender].isActive = false;
        emit MemberLeft(_daoId, msg.sender);
    }

    /**
     * @notice Change a member's role (admin only)
     * @param _daoId DAO identifier
     * @param _member Member address
     * @param _newRole New role
     */
    function changeMemberRole(bytes32 _daoId, address _member, MemberRole _newRole) 
        external 
        onlyDAOAdmin(_daoId) 
    {
        Member storage member = daoMembers[_daoId][_member];
        if (!member.isActive) revert NotDAOMember();
        
        member.role = _newRole;
        emit MemberRoleChanged(_daoId, _member, _newRole);
    }

    // ============ ACTION TOKENS (R 7.1) ============

    /**
     * @notice Spend action tokens for governance activities
     * @param _daoId DAO identifier
     * @param _amount Amount to spend
     */
    function spendActionTokens(bytes32 _daoId, uint256 _amount) external onlyActiveMember(_daoId) {
        Member storage member = daoMembers[_daoId][msg.sender];
        
        // Auto-refill if period has passed
        _refillTokensIfNeeded(_daoId, msg.sender);
        
        if (member.actionTokens < _amount) revert InsufficientActionTokens();
        
        member.actionTokens -= _amount;
        emit ActionTokensSpent(_daoId, msg.sender, _amount);
    }

    /**
     * @notice Refill action tokens (can be called by anyone for any member)
     * @param _daoId DAO identifier
     * @param _member Member address
     */
    function refillActionTokens(bytes32 _daoId, address _member) external {
        _refillTokensIfNeeded(_daoId, _member);
    }

    // ============ INTERNAL FUNCTIONS ============

    function _addMember(bytes32 _daoId, address _memberAddress, MemberRole _role) internal {
        daoMembers[_daoId][_memberAddress] = Member({
            memberAddress: _memberAddress,
            joinedAt: block.timestamp,
            role: _role,
            actionTokens: ACTION_TOKENS_PER_WEEK,
            lastTokenRefill: block.timestamp,
            isActive: true
        });
        
        daoMemberList[_daoId].push(_memberAddress);
        emit MemberJoined(_daoId, _memberAddress, _role);
    }

    function _refillTokensIfNeeded(bytes32 _daoId, address _member) internal {
        Member storage member = daoMembers[_daoId][_member];
        if (!member.isActive) return;
        
        uint256 timeSinceRefill = block.timestamp - member.lastTokenRefill;
        if (timeSinceRefill >= TOKEN_REFILL_PERIOD) {
            uint256 periods = timeSinceRefill / TOKEN_REFILL_PERIOD;
            uint256 newTokens = periods * ACTION_TOKENS_PER_WEEK;
            
            // Cap at max tokens (2 weeks worth)
            uint256 maxTokens = ACTION_TOKENS_PER_WEEK * 2;
            member.actionTokens = member.actionTokens + newTokens > maxTokens 
                ? maxTokens 
                : member.actionTokens + newTokens;
            member.lastTokenRefill = block.timestamp;
            
            emit ActionTokensRefilled(_daoId, _member, newTokens);
        }
    }

    // ============ VIEW FUNCTIONS ============

    /**
     * @notice Get DAO details
     * @param _daoId DAO identifier
     * @return dao The DAO struct
     */
    function getDAO(bytes32 _daoId) external view returns (DAO memory dao) {
        return daos[_daoId];
    }

    /**
     * @notice Get all DAOs
     * @return daoIds Array of all DAO identifiers
     */
    function getAllDAOs() external view returns (bytes32[] memory daoIds) {
        return allDAOs;
    }

    /**
     * @notice Get chapters for a DAO
     * @param _daoId DAO identifier
     * @return chapterIds Array of chapter identifiers
     */
    function getDAOChapters(bytes32 _daoId) external view returns (bytes32[] memory chapterIds) {
        return daoChapters[_daoId];
    }

    /**
     * @notice Get member details
     * @param _daoId DAO identifier
     * @param _member Member address
     * @return member The Member struct
     */
    function getMember(bytes32 _daoId, address _member) external view returns (Member memory member) {
        return daoMembers[_daoId][_member];
    }

    /**
     * @notice Get member count for a DAO
     * @param _daoId DAO identifier
     * @return count Number of members
     */
    function getMemberCount(bytes32 _daoId) external view returns (uint256 count) {
        return daoMemberList[_daoId].length;
    }

    /**
     * @notice Check if address is a member
     * @param _daoId DAO identifier
     * @param _member Address to check
     * @return isMember Whether the address is an active member
     */
    function isMember(bytes32 _daoId, address _member) external view returns (bool) {
        return daoMembers[_daoId][_member].isActive;
    }
}
