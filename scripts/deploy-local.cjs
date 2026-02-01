const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("🚀 Nebula V2 Smart Contract Deployment Starting...");

  const [deployer] = await ethers.getSigners();
  console.log("👤 Deploying contracts with account:", deployer.address);

  // Deploy IdentityRegistry
  console.log("📡 Deploying IdentityRegistry...");
  const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
  const identityRegistry = await IdentityRegistry.deploy();
  await identityRegistry.deployed();
  console.log("✅ IdentityRegistry deployed to:", identityRegistry.address);

  // Deploy ActionToken
  console.log("📡 Deploying ActionToken...");
  const ActionToken = await ethers.getContractFactory("ActionToken");
  const actionToken = await ActionToken.deploy();
  await actionToken.deployed();
  console.log("✅ ActionToken deployed to:", actionToken.address);

  // Deploy DAO
  console.log("📡 Deploying DAO...");
  const DAO = await ethers.getContractFactory("DAO");
  const dao = await DAO.deploy();
  await dao.deployed();
  console.log("✅ DAO deployed to:", dao.address);

  // Deploy Voting
  console.log("📡 Deploying Voting...");
  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(dao.address, actionToken.address);
  await voting.deployed();
  console.log("✅ Voting deployed to:", voting.address);

  // Deploy Agents
  console.log("📡 Deploying Agents...");
  const Agents = await ethers.getContractFactory("Agents");
  const agents = await Agents.deploy();
  await agents.deployed();
  console.log("✅ Agents deployed to:", agents.address);

  // Create directories
  try {
    fs.mkdirSync('./src/lib/abi', { recursive: true });
  } catch (e) {
    console.log("Directory already exists");
  }

  // Deployment config
  const deploymentConfig = {
    network: "localhost",
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      IdentityRegistry: identityRegistry.address,
      ActionToken: actionToken.address,
      DAO: dao.address,
      Voting: voting.address,
      Agents: agents.address
    }
  };

  console.log("\n📋 Deployment Summary:");
  console.table(deploymentConfig.contracts);

  fs.writeFileSync('./deployment-addresses.json', JSON.stringify(deploymentConfig, null, 2));
  
  console.log("\n🎉 Nebula V2 Production Smart Contracts Deployed Successfully!");
  console.log("📝 Deployment saved to deployment-addresses.json");
  console.log("🚀 Ready for React frontend integration");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });