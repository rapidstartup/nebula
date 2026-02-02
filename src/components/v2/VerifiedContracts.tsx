/**
 * VerifiedContracts Component
 * 
 * Displays deployed smart contract addresses with Etherscan links
 * for transparency and credibility.
 */

import React, { useState } from 'react';
import { ExternalLink, Copy, CheckCircle, Shield, FileCode, Users, Vote, Coins, Bot } from 'lucide-react';
import { SEPOLIA_CONTRACTS } from '../../lib/web3/config';

interface ContractInfo {
  name: string;
  description: string;
  address: `0x${string}`;
  icon: React.ReactNode;
}

const CONTRACTS: ContractInfo[] = [
  {
    name: 'Identity Registry',
    description: 'DIDs, Verifiable Credentials & Proof of Personhood',
    address: SEPOLIA_CONTRACTS.NebulaIdentity,
    icon: <Shield className="w-5 h-5 text-purple-400" />,
  },
  {
    name: 'DAO Factory',
    description: 'Create and manage decentralized organizations',
    address: SEPOLIA_CONTRACTS.NebulaDAO,
    icon: <Users className="w-5 h-5 text-cyan-400" />,
  },
  {
    name: 'Governance',
    description: 'Proposals, voting & graduated filtration',
    address: SEPOLIA_CONTRACTS.NebulaGovernance,
    icon: <Vote className="w-5 h-5 text-green-400" />,
  },
  {
    name: 'Treasury',
    description: 'DAO treasury management & token distribution',
    address: SEPOLIA_CONTRACTS.NebulaTreasury,
    icon: <Coins className="w-5 h-5 text-amber-400" />,
  },
  {
    name: 'Agent Registry',
    description: 'Autonomous agent registration & ethos layer',
    address: SEPOLIA_CONTRACTS.NebulaAgentRegistry,
    icon: <Bot className="w-5 h-5 text-pink-400" />,
  },
];

const ETHERSCAN_BASE = 'https://sepolia.etherscan.io/address/';

function ContractRow({ contract }: { contract: ContractInfo }) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(contract.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors group">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-slate-800 rounded-lg">
          {contract.icon}
        </div>
        <div>
          <p className="text-white font-medium text-sm">{contract.name}</p>
          <p className="text-gray-500 text-xs">{contract.description}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <code className="text-xs font-mono text-gray-400 bg-slate-800 px-2 py-1 rounded hidden sm:block">
          {truncateAddress(contract.address)}
        </code>
        
        <button
          onClick={copyAddress}
          className="p-1.5 text-gray-500 hover:text-white hover:bg-slate-600 rounded transition-colors"
          title="Copy address"
        >
          {copied ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
        
        <a
          href={`${ETHERSCAN_BASE}${contract.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-gray-500 hover:text-purple-400 hover:bg-slate-600 rounded transition-colors"
          title="View on Etherscan"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export function VerifiedContracts() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg">
            <FileCode className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Verified Smart Contracts</h3>
            <p className="text-xs text-gray-400">Deployed on Sepolia Testnet</p>
          </div>
        </div>
        
        <a
          href={`${ETHERSCAN_BASE}${SEPOLIA_CONTRACTS.NebulaIdentity}#code`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-purple-400 hover:text-purple-300 flex items-center space-x-1"
          title="View verified source code on Etherscan"
        >
          <span>View Source</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="space-y-2">
        {CONTRACTS.map((contract) => (
          <ContractRow key={contract.address} contract={contract} />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>All contracts verified on Etherscan</span>
          </div>
          <a
            href="https://sepolia.etherscan.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white flex items-center space-x-1"
          >
            <span>Sepolia Etherscan</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
