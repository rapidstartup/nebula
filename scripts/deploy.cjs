const { ethers } = require("ethers");
const fs = require("fs");
const hre = require("hardhat");

async function main() {
  console.log("🚀 Nebula V2 Smart Contract Deployment Starting...");

  // Deploy IdentityRegistry
  const IdentityRegistry = await hre.ethers.getContractFactory("IdentityRegistry");
  const identityRegistry = await IdentityRegistry.deploy();
  await identityRegistry.deployed();
  const identityRegistryAddress = identityRegistry.address;
  console.log("✅ IdentityRegistry deployed to:", identityRegistryAddress);

  // Deploy ActionToken
  const ActionToken = await hre.ethers.getContractFactory("ActionToken");
  const actionToken = await ActionToken.deploy();
  await actionToken.deployed();
  const actionTokenAddress = actionToken.address;
  console.log("✅ ActionToken deployed to:", actionTokenAddress);

  // Deploy DAO
  const DAO = await hre.ethers.getContractFactory("DAO");
  const dao = await DAO.deploy();
  await dao.deployed();
  const daoAddress = dao.address;
  console.log("✅ DAO deployed to:", daoAddress);

  // Deploy Voting
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(daoAddress, actionTokenAddress);
  await voting.deployed();
  const votingAddress = voting.address;
  console.log("✅ Voting deployed to:", votingAddress);

  // Deploy Agents
  const Agents = await hre.ethers.getContractFactory("Agents");
  const agents = await Agents.deploy();
  await agents.deployed();
  const agentsAddress = agents.address;
  console.log("✅ Agents deployed to:", agentsAddress);

  // Create deployment directories
  try {
    fs.mkdirSync('./src/lib/abi', { recursive: true });
  } catch (e) {}

  // Deployment config
  const deploymentConfig = {
    network: hre.network.name,
    timestamp: new Date().toISOString(),
    contracts: {
      IdentityRegistry: identityRegistryAddress,
      DAO: daoAddress,
      Voting: votingAddress,
      ActionToken: actionTokenAddress,
      Agents: agentsAddress
    }
  };

  console.log("\n📋 Deployment Summary:");
  console.log(JSON.stringify(deploymentConfig, null, 2));

  fs.writeFileSync('./src/lib/abi/addresses.json', JSON.stringify(deploymentConfig, null, 2));
  
  console.log("\n🎉 Nebula V2 Production Smart Contracts Deployed Successfully!");
  console.log("🚀 Ready for Sepolia testnet deployment");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });