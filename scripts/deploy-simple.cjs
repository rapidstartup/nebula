const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  console.log("🚀 Deploying Nebula V2 Smart Contracts...\n");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", ethers.utils.formatEther(await deployer.getBalance()), "ETH");
  console.log("");

  try {
    // ============ 1. Deploy NebulaIdentity ============
    console.log("📝 Deploying NebulaIdentity...");
    const NebulaIdentity = await ethers.getContractFactory("NebulaIdentity");
    const identity = await NebulaIdentity.deploy();
    await identity.deployed();
    console.log("✅ NebulaIdentity deployed to:", identity.address);

    // ============ 2. Deploy NebulaDAO ============
    console.log("\n📝 Deploying NebulaDAO...");
    const NebulaDAO = await ethers.getContractFactory("NebulaDAO");
    const dao = await NebulaDAO.deploy(identity.address);
    await dao.deployed();
    console.log("✅ NebulaDAO deployed to:", dao.address);

    // ============ 3. Deploy NebulaGovernance ============
    console.log("\n📝 Deploying NebulaGovernance...");
    const NebulaGovernance = await ethers.getContractFactory("NebulaGovernance");
    const governance = await NebulaGovernance.deploy(dao.address);
    await governance.deployed();
    console.log("✅ NebulaGovernance deployed to:", governance.address);

    // ============ 4. Deploy NebulaTreasury ============
    console.log("\n📝 Deploying NebulaTreasury...");
    const NebulaTreasury = await ethers.getContractFactory("NebulaTreasury");
    const treasury = await NebulaTreasury.deploy(dao.address, governance.address);
    await treasury.deployed();
    console.log("✅ NebulaTreasury deployed to:", treasury.address);

    // ============ 5. Deploy NebulaAgentRegistry ============
    console.log("\n📝 Deploying NebulaAgentRegistry...");
    const NebulaAgentRegistry = await ethers.getContractFactory("NebulaAgentRegistry");
    const agentRegistry = await NebulaAgentRegistry.deploy(identity.address);
    await agentRegistry.deployed();
    console.log("✅ NebulaAgentRegistry deployed to:", agentRegistry.address);

    // ============ Summary ============
    console.log("\n" + "=".repeat(60));
    console.log("🎉 DEPLOYMENT COMPLETE!");
    console.log("=".repeat(60));
    console.log("\nContract Addresses:");
    console.log("─".repeat(60));
    console.log(`NebulaIdentity:      ${identity.address}`);
    console.log(`NebulaDAO:           ${dao.address}`);
    console.log(`NebulaGovernance:    ${governance.address}`);
    console.log(`NebulaTreasury:      ${treasury.address}`);
    console.log(`NebulaAgentRegistry: ${agentRegistry.address}`);
    console.log("─".repeat(60));

    // ============ Update frontend config ============
    const deploymentInfo = {
      network: await ethers.provider.getNetwork(),
      deployer: deployer.address,
      timestamp: new Date().toISOString(),
      contracts: {
        NebulaIdentity: identity.address,
        NebulaDAO: dao.address,
        NebulaGovernance: governance.address,
        NebulaTreasury: treasury.address,
        NebulaAgentRegistry: agentRegistry.address,
      }
    };

    console.log("\n📋 Deployment Info:");
    console.log(JSON.stringify(deploymentInfo, null, 2));

    return deploymentInfo;
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    throw error;
  }
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = main;