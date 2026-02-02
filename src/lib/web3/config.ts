/**
 * Nebula V2 Web3 Configuration
 * 
 * This file contains the configuration for connecting to the Nebula smart contracts
 * and Web3 providers.
 */

import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, polygon, polygonAmoy } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// ============ CONTRACT ADDRESSES ============
// These will be updated after deployment

export interface ContractAddresses {
  NebulaIdentity: `0x${string}`;
  NebulaDAO: `0x${string}`;
  NebulaGovernance: `0x${string}`;
  NebulaTreasury: `0x${string}`;
  NebulaAgentRegistry: `0x${string}`;
}

// Local development (Hardhat) - Standard Hardhat deployment addresses
export const LOCAL_CONTRACTS: ContractAddresses = {
  NebulaIdentity: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  NebulaDAO: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  NebulaGovernance: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  NebulaTreasury: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  NebulaAgentRegistry: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
};

// Sepolia Testnet - Deployed 2026-02-02
export const SEPOLIA_CONTRACTS: ContractAddresses = {
  NebulaIdentity: '0xa6A4680b23A04Feb830733c734b64478075eDCaF',      // IdentityRegistry
  NebulaDAO: '0xb9a1aa37838f08b6C6960516A29aBbF72B5aa79F',           // DAO
  NebulaGovernance: '0x9fBC0D018b6dc06268a7B97a4FFd535b35cfcA71',    // Voting
  NebulaTreasury: '0xd30f9Bd8CE0797Ed03e8b0D25e3B8e1bda31434e',      // ActionToken
  NebulaAgentRegistry: '0xbc7Eb686720a7E6a4A524165b7a0495072c2FDc0', // Agents
};

// Polygon Amoy Testnet (to be filled after deployment)
export const POLYGON_AMOY_CONTRACTS: ContractAddresses = {
  NebulaIdentity: '0x0000000000000000000000000000000000000000',
  NebulaDAO: '0x0000000000000000000000000000000000000000',
  NebulaGovernance: '0x0000000000000000000000000000000000000000',
  NebulaTreasury: '0x0000000000000000000000000000000000000000',
  NebulaAgentRegistry: '0x0000000000000000000000000000000000000000',
};

// ============ CHAIN CONFIGURATION ============

export const SUPPORTED_CHAINS = [mainnet, sepolia, polygon, polygonAmoy] as const;

export const DEFAULT_CHAIN = sepolia; // Use testnet by default for development

// ============ WAGMI CONFIG ============

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id';

export const wagmiConfig = createConfig({
  chains: SUPPORTED_CHAINS,
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
  },
});

// ============ HELPER FUNCTIONS ============

/**
 * Get contract addresses for a specific chain
 */
export function getContractAddresses(chainId: number): ContractAddresses {
  switch (chainId) {
    case 31337: // Local Hardhat
      return LOCAL_CONTRACTS;
    case 11155111: // Sepolia
      return SEPOLIA_CONTRACTS;
    case 80002: // Polygon Amoy
      return POLYGON_AMOY_CONTRACTS;
    default:
      console.warn(`No contracts configured for chain ${chainId}, using local`);
      return LOCAL_CONTRACTS;
  }
}

/**
 * Check if a chain is supported
 */
export function isChainSupported(chainId: number): boolean {
  return SUPPORTED_CHAINS.some(chain => chain.id === chainId);
}

// ============ IPFS CONFIGURATION ============

export const IPFS_CONFIG = {
  // Web3.Storage for decentralized storage
  gateway: 'https://w3s.link/ipfs/',
  // Alternative gateways for redundancy
  alternativeGateways: [
    'https://ipfs.io/ipfs/',
    'https://cloudflare-ipfs.com/ipfs/',
    'https://gateway.pinata.cloud/ipfs/',
  ],
};

/**
 * Build IPFS URL from hash
 */
export function ipfsUrl(hash: string): string {
  if (hash.startsWith('ipfs://')) {
    hash = hash.replace('ipfs://', '');
  }
  return `${IPFS_CONFIG.gateway}${hash}`;
}
