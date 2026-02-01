pragma solidity ^0.8.19;

// SPDX-License-Identifier: MIT

/**
 * @title Treasury
 * @dev On-chain treasury management for DAOs and chapters
 */
contract Treasury {
    address public owner;
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowances;
    
    event Deposit(address indexed from, uint256 amount);
    event Withdrawal(address indexed to, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    receive() external payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }
    
    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }
}

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
    
    mapping(address => DAOInfo) public daos;
    mapping(address => mapping(address => bool)) public members;
    mapping(address => Chapter[]) public chapters;
    mapping(address => address[]) public userDaos;
    
    event DAOCreated(address indexed daoAddress, string name, string location);
    event ChapterCreated(address indexed dao, uint256 chapterId, string name, string location);
    event MemberAdded(address indexed dao, address indexed member);
    
    modifier onlyDAOMember(address dao) {
        require(members[dao][msg.sender], "Not a member");
        _;
    }
    
    modifier onlyDAO(address dao) {
        require(daos[dao].isActive, "DAO not active");
        _;
    }
    
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
        
        members[msg.sender][msg.sender] = true;
        daos[msg.sender].members.push(msg.sender);
        userDaos[msg.sender].push(msg.sender);
        
        emit DAOCreated(msg.sender, name, location);
        return msg.sender;
    }
    
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
    
    function addMember(address dao, address member) external onlyDAOMember(dao) {
        require(!members[dao][member], "Already a member");
        
        members[dao][member] = true;
        daos[dao].members.push(member);
        userDaos[member].push(dao);
        
        emit MemberAdded(dao, member);
    }
    
    function getDAO(address dao) external view returns (DAOInfo memory) {
        return daos[dao];
    }
    
    function getChapters(address dao) external view returns (Chapter[] memory) {
        return chapters[dao];
    }
    
    function getUserDAOs(address user) external view returns (address[] memory) {
        return userDaos[user];
    }
    
    function isMember(address dao, address member) external view returns (bool) {
        return members[dao][member];
    }
}