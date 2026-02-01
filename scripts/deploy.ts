import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying Nebula V2 Smart Contracts...\n");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());
  console.log("");

  // ============ 1. Deploy NebulaIdentity ============
  console.log("📝 Deploying NebulaIdentity...");
  const NebulaIdentity = await ethers.getContractFactory("NebulaIdentity");
  const identity = await NebulaIdentity.deploy();
  await identity.waitForDeployment();
  const identityAddress = await identity.getAddress();
  console.log("✅ NebulaIdentity deployed to:", identityAddress);

  // ============ 2. Deploy NebulaDAO ============
  console.log("\n📝 Deploying NebulaDAO...");
  const NebulaDAO = await ethers.getContractFactory("NebulaDAO");
  const dao = await NebulaDAO.deploy(identityAddress);
  await dao.waitForDeployment();
  const daoAddress = await dao.getAddress();
  console.log("✅ NebulaDAO deployed to:", daoAddress);

  // ============ 3. Deploy NebulaGovernance ============
  console.log("\n📝 Deploying NebulaGovernance...");
  const NebulaGovernance = await ethers.getContractFactory("NebulaGovernance");
  const governance = await NebulaGovernance.deploy(daoAddress);
  await governance.waitForDeployment();
  const governanceAddress = await governance.getAddress();
  console.log("✅ NebulaGovernance deployed to:", governanceAddress);

  // ============ 4. Deploy NebulaTreasury ============
  console.log("\n📝 Deploying NebulaTreasury...");
  const NebulaTreasury = await ethers.getContractFactory("NebulaTreasury");
  const treasury = await NebulaTreasury.deploy(daoAddress, governanceAddress);
  await treasury.waitForDeployment();
  const treasuryAddress = await treasury.getAddress();
  console.log("✅ NebulaTreasury deployed to:", treasuryAddress);

  // ============ 5. Deploy NebulaAgentRegistry ============
  console.log("\n📝 Deploying NebulaAgentRegistry...");
  const NebulaAgentRegistry = await ethers.getContractFactory("NebulaAgentRegistry");
  const agentRegistry = await NebulaAgentRegistry.deploy(identityAddress);
  await agentRegistry.waitForDeployment();
  const agentRegistryAddress = await agentRegistry.getAddress();
  console.log("✅ NebulaAgentRegistry deployed to:", agentRegistryAddress);

  // ============ Summary ============
  console.log("\n" + "=".repeat(60));
  console.log("🎉 DEPLOYMENT COMPLETE!");
  console.log("=".repeat(60));
  console.log("\nContract Addresses:");
  console.log("─".repeat(60));
  console.log(`NebulaIdentity:      ${identityAddress}`);
  console.log(`NebulaDAO:           ${daoAddress}`);
  console.log(`NebulaGovernance:    ${governanceAddress}`);
  console.log(`NebulaTreasury:      ${treasuryAddress}`);
  console.log(`NebulaAgentRegistry: ${agentRegistryAddress}`);
  console.log("─".repeat(60));

  // ============ Save deployment info ============
  const deploymentInfo = {
    network: (await ethers.provider.getNetwork()).name,
    chainId: (await ethers.provider.getNetwork()).chainId.toString(),
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      NebulaIdentity: identityAddress,
      NebulaDAO: daoAddress,
      NebulaGovernance: governanceAddress,
      NebulaTreasury: treasuryAddress,
      NebulaAgentRegistry: agentRegistryAddress,
    }
  };

  console.log("\n📋 Deployment Info (for frontend config):");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  return deploymentInfo;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
