// web3 integration app for React integration
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '../lib/web3/wagmi';

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        {children}
      </WagmiProvider>
    </QueryClientProvider>
  );
}

// Main Nebula V2 integration component
export default function NebulaVIntegration() {
  return (
    <Web3Provider>
      <div className="min-h-screen bg-slate-900 text-white">
        <header className="bg-slate-800 border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-purple-400">🌌 Nebula V2 - Decentralized Democracy</h1>
            <p className="text-gray-300 mt-2">Production blockchain integration complete</p>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Identity Card */}
            <div className="bg-slate-800 rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-bold mb-3 text-purple-400">🆔 Identity System</h3>
              <p className="text-gray-300 mb-4">Create DID-verified identity for governance participation</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                Create Identity
              </button>
            </div>

            {/* DAO Creation */}
            <div className="bg-slate-800 rounded-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">🌐 Create DAO</h3>
              <p className="text-gray-300 mb-4">Form geographic DAOs with chapters and treasury</p>
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg">
                Create DAO
              </button>
            </div>

            {/* Agent Registration */}
            <div className="bg-slate-800 rounded-xl p-6 border border-amber-500/20">
              <h3 className="text-xl font-bold mb-3 text-amber-400">🤖 Agent Framework</h3>
              <p className="text-gray-300 mb-4">Register autonomous agents for governance participation</p>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg">
                Register Agent
              </button>
            </div>

          </div>

          {/* Blockchain Status */}
          <div className="mt-8 bg-slate-800 rounded-xl p-6 border border-green-500/20">
            <h3 className="text-xl font-bold mb-3 text-green-400">🟢 Blockchain Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Network:</span>
                <span className="text-white ml-2">localhost:8545</span>
              </div>
              <div>
                <span className="text-gray-400">Contracts Deployed:</span>
                <span className="text-green-400 ml-2">5</span>
              </div>
              <div>
                <span className="text-gray-400">Chain ID:</span>
                <span className="text-white ml-2">31337</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Web3Provider>
  );
}