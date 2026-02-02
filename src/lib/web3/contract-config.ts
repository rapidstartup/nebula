import { wagmiConfig } from './wagmi';
import { Address } from 'viem';

// Core ABI definitions for React integration
// Sepolia Testnet - Deployed 2026-02-02
export const CONTRACT_ADDRESSES = {
  IdentityRegistry: '0xa6A4680b23A04Feb830733c734b64478075eDCaF',
  DAO: '0xb9a1aa37838f08b6C6960516A29aBbF72B5aa79F',
  Voting: '0x9fBC0D018b6dc06268a7B97a4FFd535b35cfcA71',
  ActionToken: '0xd30f9Bd8CE0797Ed03e8b0D25e3B8e1bda31434e',
  Agents: '0xbc7Eb686720a7E6a4A524165b7a0495072c2FDc0'
};

// Contract ABIs for React hooks
export const IDENTITY_REGISTRY_ABI = [
  {
    "inputs": [{"internalType": "string", "name": "did", "type": "string"}, {"internalType": "bytes32", "name": "commitment", "type": "bytes32"}],
    "name": "createIdentity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getIdentity",
    "outputs": [
      {
        "components": [
          {"internalType": "address", "name": "wallet", "type": "address"},
          {"internalType": "string", "name": "did", "type": "string"},
          {"internalType": "bytes32", "name": "commitment", "type": "bytes32"},
          {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
          {"internalType": "uint256", "name": "lastVerified", "type": "uint256"},
          {"internalType": "bool", "name": "isActive", "type": "bool"}
        ],
        "internalType": "struct IdentityRegistry.Identity",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const DAO_ABI = [
  {
    "inputs": [{"internalType": "string", "name": "name", "type": "string"}, {"internalType": "string", "name": "description", "type": "string"}, {"internalType": "string", "name": "location", "type": "string"}],
    "name": "createDAO",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "dao", "type": "address"}],
    "name": "getDAO",
    "outputs": [
      {
        "components": [
          {"internalType": "string", "name": "name", "type": "string"},
          {"internalType": "string", "name": "description", "type": "string"},
          {"internalType": "string", "name": "location", "type": "string"},
          {"internalType": "address", "name": "treasury", "type": "address"},
          {"internalType": "address[]", "name": "members", "type": "address[]"},
          {"internalType": "address[]", "name": "chapters", "type": "address[]"},
          {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
          {"internalType": "bool", "name": "isActive", "type": "bool"}
        ],
        "internalType": "struct DAO.DAOInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const VOTING_ABI = [
  {
    "inputs": [{"internalType": "string", "name": "title", "type": "string"}, {"internalType": "string", "name": "description", "type": "string"}, {"internalType": "string", "name": "governanceCodeHash", "type": "string"}],
    "name": "createProposal",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "proposalId", "type": "uint256"}, {"internalType": "uint8", "name": "voteType", "type": "uint8"}],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;