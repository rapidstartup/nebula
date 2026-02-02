/**
 * V2Dashboard Component
 * 
 * Main dashboard for Nebula V2 - integrates all Web3 components
 * and provides a complete decentralized governance interface.
 */

import React from 'react';
import { useAccount, useChainId } from 'wagmi';
import { ConnectWallet } from './ConnectWallet';
import { Identity } from './Identity';
import { ProofOfPersonhood } from './ProofOfPersonhood';
import { SecureInfoWallet } from './SecureInfoWallet';
import { AccessControl } from './AccessControl';
import { DAODashboard } from './DAODashboard';
import { GovernanceDashboard } from './GovernanceDashboard';
import { AgentFramework } from './AgentFramework';
import { TreasuryDashboard } from './TreasuryDashboard';
import { CosmicBackground } from '../CosmicBackground';
import { Navigation } from '../Navigation';
import { Footer } from '../Footer';
import { 
  Zap, 
  Shield, 
  Building, 
  Users, 
  Vote,
  Coins,
  Network,
  AlertTriangle
} from 'lucide-react';

export function V2Dashboard() {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();

  const isLocalNetwork = chainId === 31337;
  const isSepolia = chainId === 11155111;
  const isSupported = isLocalNetwork || isSepolia;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <CosmicBackground />
      
      <div className="relative z-10">
        <Navigation />
        
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
                  <Zap className="w-8 h-8 text-purple-400" />
                  <span>Nebula V2</span>
                  <span className="bg-purple-500/20 text-purple-400 text-sm px-3 py-1 rounded-full font-normal">
                    Decentralized Democracy
                  </span>
                </h1>
                <p className="text-gray-300 mt-2">
                  Self-sovereign identity, autonomous governance, and transparent democracy
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Network Status */}
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
                  isSupported ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  <Network className="w-4 h-4" />
                  <span className="text-sm">
                    {isLocalNetwork ? 'Local' : isSepolia ? 'Sepolia' : 'Unsupported Network'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Network Warning */}
        {!isSupported && isConnected && (
          <div className="bg-red-500/10 border-b border-red-500/20">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-400">
                  Unsupported network. Please switch to Sepolia testnet or local Hardhat network.
                </span>
              </div>
            </div>
          </div>
        )}

        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Connect Wallet Section */}
          {!isConnected && (
            <div className="mb-8">
              {/* Onboarding Steps Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-4 md:space-x-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <span className="text-white font-medium hidden sm:inline">Connect Wallet</span>
                  </div>
                  <div className="w-8 md:w-16 h-0.5 bg-gray-600"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-400 font-bold text-sm">
                      2
                    </div>
                    <span className="text-gray-400 font-medium hidden sm:inline">Create Identity</span>
                  </div>
                  <div className="w-8 md:w-16 h-0.5 bg-gray-600"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-400 font-bold text-sm">
                      3
                    </div>
                    <span className="text-gray-400 font-medium hidden sm:inline">Start Exploring</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    The Future of Democracy is Here
                  </h2>
                  <p className="text-xl text-gray-300 mb-6">
                    Join the decentralized governance revolution. Create your identity, 
                    form DAOs, and participate in transparent democratic processes.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-purple-400" />
                      <span>Self-Sovereign Identity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="w-5 h-5 text-cyan-400" />
                      <span>Geographic DAOs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Vote className="w-5 h-5 text-green-400" />
                      <span>Transparent Voting</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-amber-400" />
                      <span>Community Treasury</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Connect your wallet to get started. We support MetaMask, WalletConnect, and other popular wallets.
                  </p>
                </div>
                <ConnectWallet />
              </div>
            </div>
          )}

          {/* Main Dashboard Grid */}
          {isConnected && isSupported && (
            <div className="space-y-8">
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8 text-purple-400" />
                    <div>
                      <p className="text-sm text-gray-400">Identity Status</p>
                      <p className="text-lg font-bold text-white">Active</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20">
                  <div className="flex items-center space-x-3">
                    <Building className="w-8 h-8 text-cyan-400" />
                    <div>
                      <p className="text-sm text-gray-400">My DAOs</p>
                      <p className="text-lg font-bold text-white">0</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-green-500/20">
                  <div className="flex items-center space-x-3">
                    <Vote className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="text-sm text-gray-400">Active Proposals</p>
                      <p className="text-lg font-bold text-white">0</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-amber-500/20">
                  <div className="flex items-center space-x-3">
                    <Coins className="w-8 h-8 text-amber-400" />
                    <div>
                      <p className="text-sm text-gray-400">Treasury Balance</p>
                      <p className="text-lg font-bold text-white">0 ETH</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Identity Section */}
                <div className="xl:col-span-1 space-y-6">
                  <Identity />
                  <ProofOfPersonhood />
                </div>

                {/* DAO Dashboard */}
                <div className="xl:col-span-2">
                  <DAODashboard />
                </div>
              </div>

              {/* Additional V2 Components */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <SecureInfoWallet />
                <AccessControl />
              </div>

              {/* Governance Dashboard */}
              <div className="grid grid-cols-1 gap-8">
                <GovernanceDashboard />
              </div>

              {/* Agent Framework */}
              <div className="grid grid-cols-1 gap-8">
                <AgentFramework />
              </div>

              {/* Treasury Dashboard */}
              <div className="grid grid-cols-1 gap-8">
                <TreasuryDashboard />
              </div>

              {/* Additional Features Coming Soon */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-500/20">
                <h3 className="text-lg font-bold text-white mb-4">🚀 Coming Soon</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Agent Framework & Registration</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Advanced Governance Mechanisms</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Treasury Management Tools</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Development Info */}
          {isConnected && isLocalNetwork && (
            <div className="mt-8 bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
              <h3 className="text-lg font-bold text-blue-400 mb-4">🛠️ Development Environment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Network:</span>
                  <span className="text-white ml-2">Hardhat Local (Chain ID: 31337)</span>
                </div>
                <div>
                  <span className="text-gray-400">Wallet:</span>
                  <span className="text-white ml-2">{address?.slice(0, 10)}...</span>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400 ml-2">Connected</span>
                </div>
              </div>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}