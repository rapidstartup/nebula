const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying Agents contract to", hre.network.name, "...");
  
  const Agents = await hre.ethers.getContractFactory("Agents");
  const agents = await Agents.deploy();
  await agents.deployed();
  
  console.log("✅ Agents deployed to:", agents.address);
  console.log("\nUpdate this address in:");
  console.log("  - src/lib/web3/config.ts (SEPOLIA_CONTRACTS.NebulaAgentRegistry)");
  console.log("  - src/lib/web3/contract-config.ts (CONTRACT_ADDRESSES.Agents)");
  console.log("  - src/lib/abi/addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
