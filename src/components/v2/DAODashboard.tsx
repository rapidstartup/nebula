/**
 * DAO Dashboard Component - V2
 * 
 * Main dashboard for DAO management, membership, and governance.
 * Displays user's DAOs and provides creation/joining functionality.
 */

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { 
  Building, 
  Users, 
  Plus, 
  MapPin, 
  Vote, 
  Coins, 
  Calendar,
  ExternalLink 
} from 'lucide-react';
import { useAllDAOs, useIsMember, useMember } from '../../lib/web3/hooks';

export function DAODashboard() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'my-daos' | 'all-daos' | 'create'>('my-daos');

  // Get all DAOs from blockchain
  const { data: allDAOs, isLoading: loadingDAOs } = useAllDAOs();

  if (!isConnected) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-gray-600 opacity-60">
        <div className="text-center">
          <Building className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-gray-400">DAO Dashboard</h3>
          <p className="text-sm text-gray-500">Connect wallet to view DAOs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-purple-500/20 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Building className="w-6 h-6 text-purple-400" />
              <span>DAO Dashboard</span>
            </h2>
            <p className="text-gray-400 mt-1">
              Manage your participatory democracy communities
            </p>
          </div>
          <button
            onClick={() => setActiveTab('create')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create DAO</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('my-daos')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'my-daos'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          My DAOs
        </button>
        <button
          onClick={() => setActiveTab('all-daos')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'all-daos'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Explore DAOs
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'create'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Create DAO
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'my-daos' && <MyDAOs />}
        {activeTab === 'all-daos' && <AllDAOs daos={allDAOs} loading={loadingDAOs} />}
        {activeTab === 'create' && <CreateDAO />}
      </div>
    </div>
  );
}

// My DAOs tab component
function MyDAOs() {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">No DAOs Yet</h3>
        <p className="text-gray-400 mb-4">
          You haven't joined any DAOs yet. Create one or explore existing communities.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
          Explore DAOs
        </button>
      </div>
    </div>
  );
}

// All DAOs tab component
function AllDAOs({ daos, loading }: { daos?: any[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-700 rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-slate-600 rounded mb-4"></div>
            <div className="h-3 bg-slate-600 rounded mb-2"></div>
            <div className="h-3 bg-slate-600 rounded mb-4"></div>
            <div className="h-8 bg-slate-600 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!daos || daos.length === 0) {
    return (
      <div className="text-center py-8">
        <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">No DAOs Found</h3>
        <p className="text-gray-400 mb-4">
          Be the first to create a DAO in your community!
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
          Create First DAO
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {daos.map((dao) => (
        <DAOCard key={dao.id} dao={dao} />
      ))}
    </div>
  );
}

// DAO Card component
function DAOCard({ dao }: { dao: any }) {
  return (
    <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-purple-500/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-white">{dao.name || 'Unnamed DAO'}</h3>
        <ExternalLink className="w-4 h-4 text-gray-400" />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300">{dao.region || 'Global'}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300">{dao.memberCount || 0} members</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Vote className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300">{dao.activeProposals || 0} active proposals</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Coins className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300">{dao.treasuryValue || '0'} ETH</span>
        </div>
      </div>
      
      <button className="w-full mt-4 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/50 px-4 py-2 rounded-lg transition-colors">
        Join DAO
      </button>
    </div>
  );
}

// Create DAO tab component
function CreateDAO() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    region: '',
    quorum: 50,
    votingPeriod: 7,
    proposalThreshold: 1,
    requiresPoP: true,
    requiresResidency: false
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Create New DAO</h3>
        <p className="text-gray-400">
          Establish a decentralized autonomous organization for your community
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            DAO Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="e.g., Zurich Digital Democracy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            rows={4}
            placeholder="Describe the purpose and goals of your DAO..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Geographic Region
          </label>
          <input
            type="text"
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="e.g., Zurich, Switzerland"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quorum (%)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.quorum}
              onChange={(e) => setFormData({ ...formData, quorum: parseInt(e.target.value) })}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Voting Period (days)
            </label>
            <input
              type="number"
              min="1"
              value={formData.votingPeriod}
              onChange={(e) => setFormData({ ...formData, votingPeriod: parseInt(e.target.value) })}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Proposal Threshold
            </label>
            <input
              type="number"
              min="1"
              value={formData.proposalThreshold}
              onChange={(e) => setFormData({ ...formData, proposalThreshold: parseInt(e.target.value) })}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="requiresPoP"
              checked={formData.requiresPoP}
              onChange={(e) => setFormData({ ...formData, requiresPoP: e.target.checked })}
              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="requiresPoP" className="ml-2 text-sm text-gray-300">
              Require Proof of Personhood for membership
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="requiresResidency"
              checked={formData.requiresResidency}
              onChange={(e) => setFormData({ ...formData, requiresResidency: e.target.checked })}
              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="requiresResidency" className="ml-2 text-sm text-gray-300">
              Require geographic residency verification
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Create DAO
        </button>
      </form>
    </div>
  );
}