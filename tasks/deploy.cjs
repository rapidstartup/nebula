const { task } = require("hardhat/config");

task("deploy-nebula", "Deploy all Nebula V2 contracts")
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre;
    
    console.log("🚀 Deploying Nebula V2 Smart Contracts...\n");

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);
    console.log("Account balance:", ethers.utils.formatEther(await deployer.getBalance()), "ETH");
    console.log("");

    const deployedContracts = {};

    try {
      // ============ 1. Deploy NebulaIdentity ============
      console.log("📝 Deploying NebulaIdentity...");
      const NebulaIdentity = await ethers.getContractFactory("NebulaIdentity");
      const identity = await NebulaIdentity.deploy();
      await identity.deployed();
      deployedContracts.NebulaIdentity = identity.address;
      console.log("✅ NebulaIdentity deployed to:", identity.address);

      // ============ 2. Deploy NebulaDAO ============
      console.log("\n📝 Deploying NebulaDAO...");
      const NebulaDAO = await ethers.getContractFactory("NebulaDAO");
      const dao = await NebulaDAO.deploy(identity.address);
      await dao.deployed();
      deployedContracts.NebulaDAO = dao.address;
      console.log("✅ NebulaDAO deployed to:", dao.address);

      // ============ 3. Deploy NebulaGovernance ============
      console.log("\n📝 Deploying NebulaGovernance...");
      const NebulaGovernance = await ethers.getContractFactory("NebulaGovernance");
      const governance = await NebulaGovernance.deploy(dao.address);
      await governance.deployed();
      deployedContracts.NebulaGovernance = governance.address;
      console.log("✅ NebulaGovernance deployed to:", governance.address);

      // ============ 4. Deploy NebulaTreasury ============
      console.log("\n📝 Deploying NebulaTreasury...");
      const NebulaTreasury = await ethers.getContractFactory("NebulaTreasury");
      const treasury = await NebulaTreasury.deploy(dao.address, governance.address);
      await treasury.deployed();
      deployedContracts.NebulaTreasury = treasury.address;
      console.log("✅ NebulaTreasury deployed to:", treasury.address);

      // ============ 5. Deploy NebulaAgentRegistry ============
      console.log("\n📝 Deploying NebulaAgentRegistry...");
      const NebulaAgentRegistry = await ethers.getContractFactory("NebulaAgentRegistry");
      const agentRegistry = await NebulaAgentRegistry.deploy(identity.address);
      await agentRegistry.deployed();
      deployedContracts.NebulaAgentRegistry = agentRegistry.address;
      console.log("✅ NebulaAgentRegistry deployed to:", agentRegistry.address);

      // ============ Summary ============
      console.log("\n" + "=".repeat(60));
      console.log("🎉 DEPLOYMENT COMPLETE!");
      console.log("=".repeat(60));
      console.log("\nContract Addresses:");
      console.log("─".repeat(60));
      Object.entries(deployedContracts).forEach(([name, address]) => {
        console.log(`${name.padEnd(20)}: ${address}`);
      });
      console.log("─".repeat(60));

      const network = await ethers.provider.getNetwork();
      console.log(`\nDeployed on ${network.name} (chain ID: ${network.chainId})`);
      
      return deployedContracts;
    } catch (error) {
      console.error("❌ Deployment failed:", error);
      throw error;
    }
  });

module.exports = {};