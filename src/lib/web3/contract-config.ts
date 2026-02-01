import { wagmiConfig } from './wagmi';
import { Address } from 'viem';

// Core ABI definitions for React integration
export const CONTRACT_ADDRESSES = {
  IdentityRegistry: '0x0000000000000000000000000000000000000000', // Will update with live addresses
  DAO: '0x0000000000000000000000000000000000000000',
  Voting: '0x0000000000000000000000000000000000000000',
  ActionToken: '0x0000000000000000000000000000000000000000',
  Agents: '0x0000000000000000000000000000000000000000'
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