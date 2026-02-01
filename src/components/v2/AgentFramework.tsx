/**
 * Agent Framework Component - V2
 * 
 * Implements Epic 6: Autonomous Agent Framework & Alignment
 * Including R 6.1: Model Arbiter Layer and R 6.3: Agent Registration
 */

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { 
  Bot, 
  Plus, 
  Shield, 
  Zap, 
  Brain, 
  Settings, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Eye,
  MessageSquare,
  Code,
  Clock,
  Users,
  Target,
  Cpu
} from 'lucide-react';
import { useMyAgents, useAllAgents, useRegisterAgent } from '../../lib/web3/hooks';

interface Agent {
  id: string;
  name: string;
  description: string;
  controller: string;
  controllerName: string;
  modelIdentifier: string;
  capabilities: AgentCapability[];
  ethosStatus: 'compliant' | 'warning' | 'violation' | 'pending';
  trustLevel: number;
  isActive: boolean;
  registeredAt: string;
  lastActivity: string;
  totalActions: number;
  ethosScore: number;
  
  // Model Arbiter Data
  modelProvider: 'openai' | 'anthropic' | 'google' | 'meta' | 'local';
  modelVersion: string;
  costPerAction: number;
  averageResponseTime: number;
  reliability: number;
}

interface AgentCapability {
  id: string;
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  requiresApproval: boolean;
}

export function AgentFramework() {
  const { isConnected, address } = useAccount();
  const [activeTab, setActiveTab] = useState<'my-agents' | 'discover' | 'register' | 'arbiter'>('my-agents');
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Mock data for agent framework demo
  const [agents] = useState<Agent[]>([
    {
      id: 'agent-001',
      name: 'Democracy Assistant',
      description: 'Helps citizens understand proposals and voting processes',
      controller: '0x1234...5678',
      controllerName: 'Alice Chen',
      modelIdentifier: 'claude-3-sonnet',
      capabilities: [
        { id: 'read-proposals', name: 'Read Proposals', description: 'Access proposal data', riskLevel: 'low', requiresApproval: false },
        { id: 'answer-questions', name: 'Answer Questions', description: 'Provide information to users', riskLevel: 'low', requiresApproval: false },
      ],
      ethosStatus: 'compliant',
      trustLevel: 92,
      isActive: true,
      registeredAt: '2026-01-15T10:00:00Z',
      lastActivity: '2026-02-02T14:30:00Z',
      totalActions: 1247,
      ethosScore: 94,
      modelProvider: 'anthropic',
      modelVersion: 'claude-3-sonnet-20240307',
      costPerAction: 0.0003,
      averageResponseTime: 1200,
      reliability: 99.2,
    },
    {
      id: 'agent-002',
      name: 'Proposal Analyzer',
      description: 'Analyzes proposal impact and provides recommendations',
      controller: '0x8765...4321',
      controllerName: 'Bob Martinez',
      modelIdentifier: 'gpt-4-turbo',
      capabilities: [
        { id: 'analyze-proposals', name: 'Analyze Proposals', description: 'Perform impact analysis', riskLevel: 'medium', requiresApproval: true },
        { id: 'generate-reports', name: 'Generate Reports', description: 'Create analysis reports', riskLevel: 'low', requiresApproval: false },
      ],
      ethosStatus: 'warning',
      trustLevel: 78,
      isActive: true,
      registeredAt: '2026-01-20T15:00:00Z',
      lastActivity: '2026-02-02T12:00:00Z',
      totalActions: 523,
      ethosScore: 81,
      modelProvider: 'openai',
      modelVersion: 'gpt-4-turbo-preview',
      costPerAction: 0.0012,
      averageResponseTime: 1800,
      reliability: 97.8,
    },
  ]);

  const [modelProviders] = useState([
    {
      provider: 'anthropic',
      models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
      avgCost: 0.0008,
      reliability: 99.1,
      speed: 'Fast',
      ethosCompliance: 'High',
    },
    {
      provider: 'openai',
      models: ['gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
      avgCost: 0.0015,
      reliability: 98.5,
      speed: 'Medium',
      ethosCompliance: 'High',
    },
    {
      provider: 'google',
      models: ['gemini-pro', 'gemini-pro-vision'],
      avgCost: 0.0006,
      reliability: 97.2,
      speed: 'Fast',
      ethosCompliance: 'Medium',
    },
  ]);

  const availableCapabilities: AgentCapability[] = [
    { id: 'read-proposals', name: 'Read Proposals', description: 'Access proposal data', riskLevel: 'low', requiresApproval: false },
    { id: 'answer-questions', name: 'Answer Questions', description: 'Provide information to users', riskLevel: 'low', requiresApproval: false },
    { id: 'analyze-proposals', name: 'Analyze Proposals', description: 'Perform impact analysis', riskLevel: 'medium', requiresApproval: true },
    { id: 'vote-recommendations', name: 'Vote Recommendations', description: 'Suggest voting positions', riskLevel: 'high', requiresApproval: true },
    { id: 'execute-transactions', name: 'Execute Transactions', description: 'Submit blockchain transactions', riskLevel: 'high', requiresApproval: true },
    { id: 'moderate-discussions', name: 'Moderate Discussions', description: 'Manage community discussions', riskLevel: 'medium', requiresApproval: true },
  ];

  const getEthosStatusColor = (status: Agent['ethosStatus']) => {
    switch (status) {
      case 'compliant': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'violation': return 'text-red-400 bg-red-500/20';
      case 'pending': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getCapabilityRiskColor = (riskLevel: AgentCapability['riskLevel']) => {
    switch (riskLevel) {
      case 'low': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-gray-600 opacity-60">
        <div className="text-center">
          <Bot className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-gray-400">Agent Framework</h3>
          <p className="text-sm text-gray-500">Connect wallet to manage autonomous agents</p>
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
              <Bot className="w-6 h-6 text-purple-400" />
              <span>Agent Framework</span>
            </h2>
            <p className="text-gray-400 mt-1">
              Autonomous AI agents with ethical alignment and model arbitration
            </p>
          </div>
          <button
            onClick={() => setActiveTab('register')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Register Agent</span>
          </button>
        </div>

        {/* Ethos Layer Information */}
        <div className="mt-4 bg-slate-700/50 rounded-lg p-4">
          <h3 className="text-sm font-bold text-white mb-2">🧠 Ethos Layer (L2 Alignment)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Reduce Suffering</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300">Increase Prosperity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="text-gray-300">Increase Understanding</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('my-agents')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'my-agents'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          My Agents
        </button>
        <button
          onClick={() => setActiveTab('discover')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'discover'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Discover
        </button>
        <button
          onClick={() => setActiveTab('arbiter')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'arbiter'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Model Arbiter
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'register'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Register Agent
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'my-agents' && (
          <div className="space-y-6">
            {agents.filter(a => a.controller === address).length === 0 ? (
              <div className="text-center py-12">
                <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No Agents Registered</h3>
                <p className="text-gray-400 mb-4">
                  Register your first autonomous agent to participate in governance
                </p>
                <button
                  onClick={() => setActiveTab('register')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
                >
                  Register Agent
                </button>
              </div>
            ) : (
              agents.filter(a => a.controller === address).map((agent) => (
                <AgentCard key={agent.id} agent={agent} isOwned={true} />
              ))
            )}
          </div>
        )}

        {activeTab === 'discover' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
              <div className="bg-slate-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{agents.length}</div>
                <div className="text-gray-400">Active Agents</div>
              </div>
              <div className="bg-slate-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {agents.filter(a => a.ethosStatus === 'compliant').length}
                </div>
                <div className="text-gray-400">Ethos Compliant</div>
              </div>
              <div className="bg-slate-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {agents.reduce((sum, a) => sum + a.totalActions, 0)}
                </div>
                <div className="text-gray-400">Total Actions</div>
              </div>
            </div>

            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} isOwned={false} />
            ))}
          </div>
        )}

        {activeTab === 'arbiter' && (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Model Arbiter Layer</h3>
              <p className="text-gray-400">
                Universal interface for agent model selection based on cost, speed, and reliability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {modelProviders.map((provider) => (
                <div key={provider.provider} className="bg-slate-700 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-purple-500/20 p-2 rounded">
                      <Cpu className="w-5 h-5 text-purple-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white capitalize">{provider.provider}</h4>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-400">Models: </span>
                      <span className="text-white">{provider.models.length} available</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Avg Cost: </span>
                      <span className="text-white">${provider.avgCost}/action</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Reliability: </span>
                      <span className="text-white">{provider.reliability}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Speed: </span>
                      <span className="text-white">{provider.speed}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Ethos Compliance: </span>
                      <span className={`${provider.ethosCompliance === 'High' ? 'text-green-400' : 'text-yellow-400'}`}>
                        {provider.ethosCompliance}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/50 px-4 py-2 rounded-lg transition-colors">
                    Configure
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'register' && (
          <RegisterAgentForm capabilities={availableCapabilities} />
        )}
      </div>
    </div>
  );
}

function AgentCard({ agent, isOwned }: { agent: Agent; isOwned: boolean }) {
  const ethosColor = agent.ethosStatus === 'compliant' ? 'text-green-400' : 
                     agent.ethosStatus === 'warning' ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className="bg-purple-500/20 p-3 rounded-full">
            <Bot className="w-6 h-6 text-purple-400" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-bold text-white">{agent.name}</h3>
              <div className={`px-2 py-1 rounded text-xs ${getEthosStatusColor(agent.ethosStatus)}`}>
                {agent.ethosStatus}
              </div>
            </div>
            
            <p className="text-gray-400 mb-3">{agent.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <span className="text-gray-400">Trust Level: </span>
                <span className={ethosColor}>{agent.trustLevel}%</span>
              </div>
              <div>
                <span className="text-gray-400">Actions: </span>
                <span className="text-white">{agent.totalActions}</span>
              </div>
              <div>
                <span className="text-gray-400">Model: </span>
                <span className="text-white">{agent.modelVersion}</span>
              </div>
              <div>
                <span className="text-gray-400">Cost: </span>
                <span className="text-white">${agent.costPerAction}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isOwned && (
            <button className="text-gray-400 hover:text-white p-2">
              <Settings className="w-4 h-4" />
            </button>
          )}
          <button className="text-gray-400 hover:text-white p-2">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-bold text-white mb-2">Capabilities</h4>
          <div className="flex flex-wrap gap-1">
            {agent.capabilities.map((capability) => (
              <span
                key={capability.id}
                className={`px-2 py-1 text-xs rounded ${getCapabilityRiskColor(capability.riskLevel)}`}
              >
                {capability.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-2">Performance</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Ethos Score:</span>
              <span className="text-white">{agent.ethosScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Reliability:</span>
              <span className="text-white">{agent.reliability}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Avg Response:</span>
              <span className="text-white">{agent.averageResponseTime}ms</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Last active: {new Date(agent.lastActivity).toLocaleDateString()}
        </div>
        
        {!isOwned && (
          <button className="text-blue-400 hover:text-blue-300 text-sm">
            Request Interaction
          </button>
        )}
      </div>
    </div>
  );
}

function RegisterAgentForm({ capabilities }: { capabilities: AgentCapability[] }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    modelProvider: 'anthropic',
    modelVersion: '',
    selectedCapabilities: [] as string[],
  });

  const toggleCapability = (capabilityId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCapabilities: prev.selectedCapabilities.includes(capabilityId)
        ? prev.selectedCapabilities.filter(id => id !== capabilityId)
        : [...prev.selectedCapabilities, capabilityId]
    }));
  };

  return (
    <div className="max-w-3xl">
      <h3 className="text-xl font-bold text-white mb-6">Register New Agent</h3>
      
      <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-bold text-white mb-2">⚡ Ethos Validation</h4>
        <p className="text-sm text-gray-400">
          All agent actions will be validated against the Ethos layer before execution:
        </p>
        <ul className="text-xs text-gray-500 mt-2 space-y-1">
          <li>• <strong>Reduce Suffering:</strong> Actions must not cause harm to individuals or communities</li>
          <li>• <strong>Increase Prosperity:</strong> Actions should contribute to community well-being</li>
          <li>• <strong>Increase Understanding:</strong> Actions should promote transparency and education</li>
        </ul>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Agent Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400"
            placeholder="e.g., Democracy Assistant"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400"
            rows={3}
            placeholder="Describe what your agent does and how it helps the community..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Model Provider</label>
            <select
              value={formData.modelProvider}
              onChange={(e) => setFormData({ ...formData, modelProvider: e.target.value })}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
            >
              <option value="anthropic">Anthropic (Claude)</option>
              <option value="openai">OpenAI (GPT)</option>
              <option value="google">Google (Gemini)</option>
              <option value="meta">Meta (Llama)</option>
              <option value="local">Local Model</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Model Version</label>
            <input
              type="text"
              value={formData.modelVersion}
              onChange={(e) => setFormData({ ...formData, modelVersion: e.target.value })}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400"
              placeholder="e.g., claude-3-sonnet-20240307"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Requested Capabilities</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {capabilities.map((capability) => (
              <button
                key={capability.id}
                type="button"
                onClick={() => toggleCapability(capability.id)}
                className={`p-3 text-left rounded-lg border transition-colors ${
                  formData.selectedCapabilities.includes(capability.id)
                    ? 'bg-purple-600/20 border-purple-500'
                    : 'bg-slate-700 border-slate-600 hover:border-purple-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">{capability.name}</span>
                  <div className={`px-2 py-1 text-xs rounded ${getCapabilityRiskColor(capability.riskLevel)}`}>
                    {capability.riskLevel}
                  </div>
                </div>
                <div className="text-sm text-gray-400">{capability.description}</div>
                {capability.requiresApproval && (
                  <div className="text-xs text-yellow-400 mt-1">Requires community approval</div>
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!formData.name || !formData.description || formData.selectedCapabilities.length === 0}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Register Agent
        </button>
      </form>
    </div>
  );
}

function getCapabilityRiskColor(riskLevel: AgentCapability['riskLevel']) {
  switch (riskLevel) {
    case 'low': return 'text-green-400 bg-green-500/20';
    case 'medium': return 'text-yellow-400 bg-yellow-500/20';
    case 'high': return 'text-red-400 bg-red-500/20';
    default: return 'text-gray-400 bg-gray-500/20';
  }
}