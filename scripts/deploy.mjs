// Minimal deployment file for quick testing
const require = (await import('node:module')).createRequire(import.meta.url);
import hre from 'hardhat';
import fs from 'fs';

export async function deployLocally() {
  console.log('🚀 Starting Nebula V2 Deployment...');
  
  const accounts = await hre.ethers.getSigners();
  const deployer = accounts[0];
  console.log('👤 Deployer:', deployer.address);

  // Deploy IdentityRegistry
  const IdentityRegistry = await hre.ethers.getContractFactory('IdentityRegistry');
  const identityRegistry = await IdentityRegistry.deploy();
  await identityRegistry.deployed();
  console.log('✅ IdentityRegistry:', identityRegistry.address);

  // Deploy ActionToken
  const ActionToken = await hre.ethers.getContractFactory('ActionToken');
  const actionToken = await ActionToken.deploy();
  await actionToken.deployed();
  console.log('✅ ActionToken:', actionToken.address);

  // Deploy DAO
  const DAO = await hre.ethers.getContractFactory('DAO');
  const dao = await DAO.deploy();
  await dao.deployed();
  console.log('✅ DAO:', dao.address);

  // Deploy Voting
  const Voting = await hre.ethers.getContractFactory('Voting');
  const voting = await Voting.deploy(dao.address, actionToken.address);
  await voting.deployed();
  console.log('✅ Voting:', voting.address);

  // Deploy Agents
  const Agents = await hre.ethers.getContractFactory('Agents');
  const agents = await Agents.deploy();
  await agents.deployed();
  console.log('✅ Agents:', agents.address);

  // Write deployment addresses
  const deployment = {
    network: 'localhost',
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      IdentityRegistry: identityRegistry.address,
      DAO: dao.address,
      Voting: voting.address,
      ActionToken: actionToken.address,
      Agents: agents.address
    }
  };

  fs.writeFileSync('./deployment-addresses.json', JSON.stringify(deployment, null, 2));
  console.log('📋 Deployment saved to deployment-addresses.json');
  
  return deployment;
}