/**
 * Governance Dashboard Component - V2
 * 
 * Implements Epic 7: Advanced Governance & Incentives
 * Including R 7.2: Graduated Proposal Filtration
 */

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { 
  Vote, 
  Plus, 
  Filter, 
  Clock, 
  Users, 
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MessageSquare,
  GitBranch,
  Code,
  Calendar
} from 'lucide-react';
import { useDAOProposals, useCreateProposal, useCastVote } from '../../lib/web3/hooks';

type ProposalState = 'draft' | 'micro-poll' | 'consensus-building' | 'active-voting' | 'passed' | 'rejected' | 'executed';

interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  proposerName: string;
  daoId: string;
  daoName: string;
  state: ProposalState;
  proposalType: 'funding' | 'governance' | 'constitutional' | 'operational';
  createdAt: string;
  currentDeadline: string;
  
  // Graduated Filtration Data
  microPollResults?: {
    participants: number;
    approvalRate: number;
    threshold: number;
  };
  consensusResults?: {
    participants: number;
    consensusScore: number;
    threshold: number;
  };
  
  // Active Voting Data
  votingResults?: {
    forVotes: number;
    againstVotes: number;
    abstainVotes: number;
    totalVotes: number;
    quorumThreshold: number;
    participationRate: number;
  };
  
  // Governance-as-Code Integration
  executionData?: {
    repositoryUrl: string;
    pullRequestId: string;
    codeHash: string;
    deploymentReady: boolean;
  };
}

export function GovernanceDashboard() {
  const { isConnected, address } = useAccount();
  const [activeTab, setActiveTab] = useState<'active' | 'my-proposals' | 'create' | 'history'>('active');
  const [filterState, setFilterState] = useState<ProposalState | 'all'>('all');
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);

  // Mock data for graduated filtration demo
  const [proposals] = useState<Proposal[]>([
    {
      id: 'prop-001',
      title: 'Fund Community Center WiFi Upgrade',
      description: 'Proposal to allocate 5 ETH for upgrading the community center\'s internet infrastructure to support digital governance activities.',
      proposer: '0x1234...5678',
      proposerName: 'Alice Chen',
      daoId: 'zurich-dao',
      daoName: 'Zurich Digital Democracy',
      state: 'active-voting',
      proposalType: 'funding',
      createdAt: '2026-01-28T10:00:00Z',
      currentDeadline: '2026-02-05T18:00:00Z',
      microPollResults: {
        participants: 15,
        approvalRate: 87,
        threshold: 70,
      },
      consensusResults: {
        participants: 45,
        consensusScore: 82,
        threshold: 75,
      },
      votingResults: {
        forVotes: 142,
        againstVotes: 23,
        abstainVotes: 8,
        totalVotes: 173,
        quorumThreshold: 150,
        participationRate: 78,
      },
    },
    {
      id: 'prop-002',
      title: 'Constitutional Amendment: Voting Period Extension',
      description: 'Proposal to extend the minimum voting period from 7 days to 10 days for constitutional amendments.',
      proposer: '0x8765...4321',
      proposerName: 'Bob Martinez',
      daoId: 'zurich-dao',
      daoName: 'Zurich Digital Democracy',
      state: 'consensus-building',
      proposalType: 'constitutional',
      createdAt: '2026-02-01T14:00:00Z',
      currentDeadline: '2026-02-03T14:00:00Z',
      microPollResults: {
        participants: 12,
        approvalRate: 92,
        threshold: 70,
      },
      consensusResults: {
        participants: 38,
        consensusScore: 73,
        threshold: 75,
      },
      executionData: {
        repositoryUrl: 'https://github.com/nebula/zurich-dao',
        pullRequestId: 'PR-123',
        codeHash: '0xabc123...',
        deploymentReady: true,
      },
    },
    {
      id: 'prop-003',
      title: 'Weekly Community Newsletter Initiative',
      description: 'Establish a weekly newsletter to keep community members informed about DAO activities and decisions.',
      proposer: '0x2468...1357',
      proposerName: 'Carol Johnson',
      daoId: 'zurich-dao',
      daoName: 'Zurich Digital Democracy',
      state: 'micro-poll',
      proposalType: 'operational',
      createdAt: '2026-02-02T09:00:00Z',
      currentDeadline: '2026-02-03T09:00:00Z',
    },
  ]);

  const getStateColor = (state: ProposalState) => {
    switch (state) {
      case 'draft': return 'text-gray-400 bg-gray-500/20';
      case 'micro-poll': return 'text-blue-400 bg-blue-500/20';
      case 'consensus-building': return 'text-yellow-400 bg-yellow-500/20';
      case 'active-voting': return 'text-purple-400 bg-purple-500/20';
      case 'passed': return 'text-green-400 bg-green-500/20';
      case 'rejected': return 'text-red-400 bg-red-500/20';
      case 'executed': return 'text-cyan-400 bg-cyan-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStateIcon = (state: ProposalState) => {
    switch (state) {
      case 'draft': return Clock;
      case 'micro-poll': return Users;
      case 'consensus-building': return TrendingUp;
      case 'active-voting': return Vote;
      case 'passed': return CheckCircle;
      case 'rejected': return XCircle;
      case 'executed': return Code;
      default: return AlertCircle;
    }
  };

  const getProposalTypeIcon = (type: Proposal['proposalType']) => {
    switch (type) {
      case 'funding': return '💰';
      case 'governance': return '⚖️';
      case 'constitutional': return '📜';
      case 'operational': return '⚙️';
      default: return '📋';
    }
  };

  const filteredProposals = proposals.filter(p => 
    filterState === 'all' || p.state === filterState
  );

  if (!isConnected) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-gray-600 opacity-60">
        <div className="text-center">
          <Vote className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-gray-400">Governance Dashboard</h3>
          <p className="text-sm text-gray-500">Connect wallet to participate in governance</p>
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
              <Vote className="w-6 h-6 text-purple-400" />
              <span>Governance Dashboard</span>
            </h2>
            <p className="text-gray-400 mt-1">
              Advanced governance with graduated filtration and code integration
            </p>
          </div>
          <button
            onClick={() => setActiveTab('create')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Proposal</span>
          </button>
        </div>

        {/* Graduated Filtration Explanation */}
        <div className="mt-4 bg-slate-700/50 rounded-lg p-4">
          <h3 className="text-sm font-bold text-white mb-2">🔄 Graduated Proposal Filtration</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300">Micro-Poll (Random 15 members)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-gray-300">Consensus Building (Random 50 members)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-gray-300">Active Voting (All members)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Execution & Code Deployment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'active'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Active Proposals
        </button>
        <button
          onClick={() => setActiveTab('my-proposals')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'my-proposals'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          My Proposals
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'create'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Create Proposal
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'history'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          History
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'active' && (
          <div>
            {/* Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Filter by state:</span>
              </div>
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value as ProposalState | 'all')}
                className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm text-white"
              >
                <option value="all">All States</option>
                <option value="draft">Draft</option>
                <option value="micro-poll">Micro Poll</option>
                <option value="consensus-building">Consensus Building</option>
                <option value="active-voting">Active Voting</option>
                <option value="passed">Passed</option>
                <option value="rejected">Rejected</option>
                <option value="executed">Executed</option>
              </select>
            </div>

            {/* Proposals List */}
            <div className="space-y-4">
              {filteredProposals.map((proposal) => {
                const StateIcon = getStateIcon(proposal.state);
                const stateColor = getStateColor(proposal.state);
                
                return (
                  <div
                    key={proposal.id}
                    className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-purple-500/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-lg">{getProposalTypeIcon(proposal.proposalType)}</span>
                          <h3 className="text-lg font-bold text-white">{proposal.title}</h3>
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${stateColor}`}>
                            <StateIcon className="w-3 h-3" />
                            <span className="capitalize">{proposal.state.replace('-', ' ')}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-400 mb-3">{proposal.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>By {proposal.proposerName}</span>
                          <span>•</span>
                          <span>{proposal.daoName}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Deadline: {new Date(proposal.currentDeadline).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Graduated Filtration Progress */}
                    {(proposal.microPollResults || proposal.consensusResults || proposal.votingResults) && (
                      <div className="bg-slate-600/50 rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-bold text-white mb-3">Filtration Progress</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Micro Poll */}
                          <div className={`p-3 rounded border ${proposal.microPollResults ? 'border-blue-500/50 bg-blue-500/10' : 'border-gray-600'}`}>
                            <div className="flex items-center space-x-2 mb-2">
                              <Users className="w-4 h-4 text-blue-400" />
                              <span className="text-sm font-medium text-white">Micro Poll</span>
                            </div>
                            {proposal.microPollResults ? (
                              <div className="text-xs text-gray-400">
                                <div>{proposal.microPollResults.participants} participants</div>
                                <div className="flex items-center space-x-1">
                                  <span>{proposal.microPollResults.approvalRate}% approval</span>
                                  {proposal.microPollResults.approvalRate >= proposal.microPollResults.threshold && (
                                    <CheckCircle className="w-3 h-3 text-green-400" />
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500">Pending</div>
                            )}
                          </div>

                          {/* Consensus Building */}
                          <div className={`p-3 rounded border ${proposal.consensusResults ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-gray-600'}`}>
                            <div className="flex items-center space-x-2 mb-2">
                              <TrendingUp className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm font-medium text-white">Consensus</span>
                            </div>
                            {proposal.consensusResults ? (
                              <div className="text-xs text-gray-400">
                                <div>{proposal.consensusResults.participants} participants</div>
                                <div className="flex items-center space-x-1">
                                  <span>{proposal.consensusResults.consensusScore}% consensus</span>
                                  {proposal.consensusResults.consensusScore >= proposal.consensusResults.threshold && (
                                    <CheckCircle className="w-3 h-3 text-green-400" />
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500">Pending</div>
                            )}
                          </div>

                          {/* Active Voting */}
                          <div className={`p-3 rounded border ${proposal.votingResults ? 'border-purple-500/50 bg-purple-500/10' : 'border-gray-600'}`}>
                            <div className="flex items-center space-x-2 mb-2">
                              <Vote className="w-4 h-4 text-purple-400" />
                              <span className="text-sm font-medium text-white">Active Vote</span>
                            </div>
                            {proposal.votingResults ? (
                              <div className="text-xs text-gray-400">
                                <div>{proposal.votingResults.totalVotes} votes cast</div>
                                <div>{proposal.votingResults.participationRate}% participation</div>
                                <div className="flex space-x-2 mt-1">
                                  <span className="text-green-400">For: {proposal.votingResults.forVotes}</span>
                                  <span className="text-red-400">Against: {proposal.votingResults.againstVotes}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500">Pending</div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Governance-as-Code Integration */}
                    {proposal.executionData && (
                      <div className="bg-slate-600/50 rounded-lg p-4 mb-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <GitBranch className="w-4 h-4 text-cyan-400" />
                          <h4 className="text-sm font-bold text-white">Governance-as-Code</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-gray-400">Repository: </span>
                            <a href={proposal.executionData.repositoryUrl} className="text-cyan-400 hover:text-cyan-300">
                              View Code
                            </a>
                          </div>
                          <div>
                            <span className="text-gray-400">Pull Request: </span>
                            <span className="text-white">{proposal.executionData.pullRequestId}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Code Hash: </span>
                            <span className="text-white font-mono">{proposal.executionData.codeHash.substring(0, 12)}...</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Deployment: </span>
                            <span className={proposal.executionData.deploymentReady ? 'text-green-400' : 'text-yellow-400'}>
                              {proposal.executionData.deploymentReady ? 'Ready' : 'Preparing'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-white text-sm">
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-white text-sm">
                          <MessageSquare className="w-4 h-4" />
                          <span>Discuss (12)</span>
                        </button>
                      </div>
                      
                      {proposal.state === 'active-voting' && (
                        <div className="flex items-center space-x-2">
                          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                            Vote For
                          </button>
                          <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                            Vote Against
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm">
                            Abstain
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <CreateProposalForm />
        )}
        
        {(activeTab === 'my-proposals' || activeTab === 'history') && (
          <div className="text-center py-12">
            <Vote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Coming Soon</h3>
            <p className="text-gray-400">
              {activeTab === 'my-proposals' ? 'Your proposal history' : 'Governance history'} will be available in the next update
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CreateProposalForm() {
  return (
    <div className="max-w-3xl">
      <h3 className="text-xl font-bold text-white mb-6">Create New Proposal</h3>
      <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-bold text-white mb-2">📋 Before You Start</h4>
        <p className="text-sm text-gray-400 mb-2">
          Your proposal will go through graduated filtration to ensure quality and prevent spam:
        </p>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>• <strong>Micro Poll:</strong> 15 random members review (70% approval needed)</li>
          <li>• <strong>Consensus Building:</strong> 50 random members discuss (75% consensus needed)</li>
          <li>• <strong>Active Voting:</strong> All members vote (quorum + majority required)</li>
          <li>• <strong>Execution:</strong> Automatic code deployment if passed</li>
        </ul>
      </div>
      
      <div className="text-center py-12">
        <Code className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">Proposal Creation Form</h3>
        <p className="text-gray-400">
          Coming in next update - will integrate with GitHub for Governance-as-Code
        </p>
      </div>
    </div>
  );
}