pragma solidity ^0.8.19;

// SPDX-License-Identifier: MIT

/**
 * @title DAO
 * @dev Decentralized Autonomous Organization for geographic chapters
 * Enables DAO formation, member management, and chapter creation
 */
contract DAO {
    struct DAOInfo {
        string name;
        string description;
        string location;
        address treasury;
        address[] members;
        address[] chapters;
        uint256 createdAt;
        bool isActive;
    }
    
    struct Chapter {
        string name;
        string location;
        address treasury;
        address[] members;
        uint256 memberCount;
        uint256 reputationPool;
    }
    
    // Core mappings
    mapping(address => DAOInfo) public daos;
    mapping(address => mapping(address => bool)) public members;
    mapping(address => Chapter[]) public chapters;
    mapping(address => address[]) public userDaos;
    
    // Events
    event DAOCreated(address indexed daoAddress, string name, string location);
    event ChapterCreated(address indexed dao, uint256 chapterId, string name, string location);
    event MemberAdded(address indexed dao, address indexed member);
    event MemberRemoved(address indexed dao, address indexed member);
    
    modifier onlyDAOMember(address dao) {
        require(members[dao][msg.sender], "Not a member");
        _;
    }
    
    modifier onlyDAO(address dao) {
        require(daos[dao].isActive, "DAO not active");
        _;
    }
    
    /**
     * @dev Create a new DAO with treasury
     * @param name Name of the DAO
     * @param description Description of the DAO's purpose
     * @param location Geographic location identifier
     */
    function createDAO(
        string memory name,
        string memory description,
        string memory location
    ) external returns (address) {
        require(bytes(name).length > 0, "Name required");
        require(bytes(location).length > 0, "Location required");
        
        address treasury = address(new Treasury());
        
        DAOInfo memory newDAO = DAOInfo({
            name: name,
            description: description,
            location: location,
            treasury: treasury,
            members: new address[](0),
            chapters: new address[](0),
            createdAt: block.timestamp,
            isActive: true
        });
        
        daos[msg.sender] = newDAO;
        
        // Add creator as first member
        members[msg.sender][msg.sender] = true;
        daos[msg.sender].members.push(msg.sender);
        userDaos[msg.sender].push(msg.sender);
        
        emit DAOCreated(msg.sender, name, location);
        return msg.sender;
    }
    
    /**
     * @dev Create a geographic chapter under a DAO
     * @param dao Address of the parent DAO
     * @param name Name of the chapter
     * @param location Geographic location of the chapter
     */
    function createChapter(
        address dao,
        string memory name,
        string memory location
    ) external onlyDAOMember(dao) {
        require(bytes(name).length > 0, "Name required");
        require(bytes(location).length > 0, "Location required");
        
        Chapter memory newChapter = Chapter({
            name: name,
            location: location,
            treasury: address(new Treasury()),
            members: new address[](0),
            memberCount: 0,
            reputationPool: 0
        });
        
        chapters[dao].push(newChapter);
        
        emit ChapterCreated(dao, chapters[dao].length - 1, name, location);
    }
    
    /**
     * @dev Add a member to a DAO
     * @param dao Address of the DAO
     * @param member Address of member to add
     */
    function addMember(address dao, address member) external onlyDAOMember(dao) {
        require(!members[dao][member], "Already a member");
        
        members[dao][member] = true;
        daos[dao].members.push(member);
        userDaos[member].push(dao);
        
        emit MemberAdded(dao, member);
    }
    
    /**
     * @dev Get basic DAO information
     */
    function getDAO(address dao) external view returns (DAOInfo memory) {
        return daos[dao];
    }
    
    /**
     * @dev Get all chapters for a DAO
     */
    function getChapters(address dao) external view returns (Chapter[] memory) {
        return chapters[dao];
    }
    
    /**
     * @dev Get all DAOs a user is member of
     */
    function getUserDAOs(address user) external view returns (address[] memory) {
        return userDaos[user];
    }
    
    /**
     * @dev Check if user is member of DAO
     */
    function isMember(address dao, address member) external view returns (bool) {
        return members[dao][member];
    }
}

/**
 * @title Treasury
 * @dev Simple treasury contract for DAOs and chapters
 */
contract Treasury {
    address public owner;
    uint256 public balance;
    
    constructor() {
        owner = tx.origin;
    }
    
    receive() external payable {}
    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}