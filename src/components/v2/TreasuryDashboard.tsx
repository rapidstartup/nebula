/**
 * Treasury Dashboard Component - V2
 * 
 * Implements Treasury Management for DAO financial operations
 * Including deposits, withdrawals, and financial governance
 */

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { 
  Vault, 
  TrendingUp, 
  TrendingDown, 
  Send, 
  Download, 
  DollarSign,
  PieChart,
  Calendar,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink,
  Filter
} from 'lucide-react';
import { useTreasury, useTreasuryETHBalance, useDepositETH } from '../../lib/web3/hooks';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: string;
  token: 'ETH' | 'USDC' | 'DAI';
  from: string;
  to: string;
  description: string;
  proposalId?: string;
  proposalTitle?: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  txHash: string;
}

interface TreasuryStats {
  totalValue: number;
  monthlyInflow: number;
  monthlyOutflow: number;
  memberContributions: number;
  activeProposals: number;
  pendingWithdrawals: number;
}

export function TreasuryDashboard() {
  const { isConnected, address } = useAccount();
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'proposals' | 'deposit'>('overview');
  const [selectedDAO, setSelectedDAO] = useState('zurich-dao');
  const [timeFilter, setTimeFilter] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock treasury data for demo
  const [treasuryStats] = useState<TreasuryStats>({
    totalValue: 12.847,
    monthlyInflow: 2.3,
    monthlyOutflow: 1.8,
    memberContributions: 156,
    activeProposals: 3,
    pendingWithdrawals: 0.5,
  });

  const [transactions] = useState<Transaction[]>([
    {
      id: 'tx-001',
      type: 'deposit',
      amount: '0.5',
      token: 'ETH',
      from: '0x1234...5678',
      to: 'Treasury',
      description: 'Monthly membership contribution',
      timestamp: '2026-02-02T10:00:00Z',
      status: 'completed',
      txHash: '0xabc123...',
    },
    {
      id: 'tx-002',
      type: 'withdrawal',
      amount: '1.2',
      token: 'ETH',
      from: 'Treasury',
      to: '0x8765...4321',
      description: 'Community center WiFi upgrade funding',
      proposalId: 'prop-001',
      proposalTitle: 'Fund Community Center WiFi Upgrade',
      timestamp: '2026-02-01T15:30:00Z',
      status: 'completed',
      txHash: '0xdef456...',
    },
    {
      id: 'tx-003',
      type: 'deposit',
      amount: '0.8',
      token: 'ETH',
      from: '0x2468...1357',
      to: 'Treasury',
      description: 'Annual membership dues',
      timestamp: '2026-01-30T09:15:00Z',
      status: 'completed',
      txHash: '0x789ghi...',
    },
  ]);

  const [tokenBalances] = useState([
    { token: 'ETH', balance: 12.847, value: 12.847, percentage: 85.2 },
    { token: 'USDC', balance: 1200, value: 1.2, percentage: 8.0 },
    { token: 'DAI', balance: 1000, value: 1.0, percentage: 6.8 },
  ]);

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit': return TrendingUp;
      case 'withdrawal': return TrendingDown;
      case 'transfer': return Send;
      default: return DollarSign;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit': return 'text-green-400';
      case 'withdrawal': return 'text-red-400';
      case 'transfer': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-gray-600 opacity-60">
        <div className="text-center">
          <Vault className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-gray-400">Treasury Dashboard</h3>
          <p className="text-sm text-gray-500">Connect wallet to view treasury information</p>
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
              <Vault className="w-6 h-6 text-purple-400" />
              <span>Treasury Dashboard</span>
            </h2>
            <p className="text-gray-400 mt-1">
              Community-controlled financial management and transparency
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedDAO}
              onChange={(e) => setSelectedDAO(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white"
            >
              <option value="zurich-dao">Zurich Digital Democracy</option>
              <option value="bern-dao">Bern Community DAO</option>
              <option value="geneva-dao">Geneva Innovation DAO</option>
            </select>
            
            <button
              onClick={() => setActiveTab('deposit')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Make Deposit
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-white">{treasuryStats.totalValue} ETH</div>
            <div className="text-xs text-gray-400">Total Value</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-400">+{treasuryStats.monthlyInflow} ETH</div>
            <div className="text-xs text-gray-400">Monthly Inflow</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-red-400">-{treasuryStats.monthlyOutflow} ETH</div>
            <div className="text-xs text-gray-400">Monthly Outflow</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-blue-400">{treasuryStats.memberContributions}</div>
            <div className="text-xs text-gray-400">Contributors</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-purple-400">{treasuryStats.activeProposals}</div>
            <div className="text-xs text-gray-400">Active Proposals</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-yellow-400">{treasuryStats.pendingWithdrawals} ETH</div>
            <div className="text-xs text-gray-400">Pending</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'overview'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'transactions'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab('proposals')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'proposals'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Funding Proposals
        </button>
        <button
          onClick={() => setActiveTab('deposit')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'deposit'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Make Deposit
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Token Balances */}
            <div className="bg-slate-700/50 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <PieChart className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Token Holdings</h3>
              </div>
              
              <div className="space-y-4">
                {tokenBalances.map((token) => (
                  <div key={token.token} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-400">{token.token}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{token.balance.toLocaleString()} {token.token}</div>
                        <div className="text-xs text-gray-400">{token.percentage}% of portfolio</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{token.value} ETH</div>
                      <div className="text-xs text-gray-400">${(token.value * 3200).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-700/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                </div>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {transactions.slice(0, 5).map((tx) => {
                  const Icon = getTransactionIcon(tx.type);
                  const color = getTransactionColor(tx.type);
                  
                  return (
                    <div key={tx.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-4 h-4 ${color}`} />
                        <div>
                          <div className="text-sm text-white">{tx.description}</div>
                          <div className="text-xs text-gray-400">
                            {new Date(tx.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${color}`}>
                          {tx.type === 'withdrawal' ? '-' : '+'}{tx.amount} {tx.token}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Time period:</span>
                </div>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value as any)}
                  className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm text-white"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </div>

              <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm">
                Export CSV
              </button>
            </div>

            <div className="space-y-4">
              {transactions.map((tx) => {
                const Icon = getTransactionIcon(tx.type);
                const color = getTransactionColor(tx.type);
                
                return (
                  <div key={tx.id} className="bg-slate-700 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="bg-slate-600 p-2 rounded">
                          <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-white font-medium">{tx.description}</h4>
                            <div className={`px-2 py-1 rounded text-xs ${getStatusColor(tx.status)}`}>
                              {tx.status}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div>
                              <span className="text-gray-400">From: </span>
                              <span className="text-white">{tx.from}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">To: </span>
                              <span className="text-white">{tx.to}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Date: </span>
                              <span className="text-white">{new Date(tx.timestamp).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {tx.proposalId && (
                            <div className="mt-2">
                              <span className="text-gray-400 text-xs">Related proposal: </span>
                              <button className="text-purple-400 hover:text-purple-300 text-xs">
                                {tx.proposalTitle}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-lg font-bold ${color}`}>
                          {tx.type === 'withdrawal' ? '-' : '+'}{tx.amount} {tx.token}
                        </div>
                        <button className="text-gray-400 hover:text-white text-sm mt-1">
                          <ExternalLink className="w-3 h-3 inline mr-1" />
                          View on Explorer
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'proposals' && (
          <div className="text-center py-12">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Treasury Proposals</h3>
            <p className="text-gray-400 mb-4">
              View and manage funding proposals that affect the treasury
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
              View Active Proposals
            </button>
          </div>
        )}

        {activeTab === 'deposit' && (
          <DepositForm />
        )}
      </div>
    </div>
  );
}

function DepositForm() {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    setIsDepositing(true);
    try {
      // Simulate deposit process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setAmount('');
      setMessage('');
      alert('Deposit successful!');
    } catch (error) {
      alert('Deposit failed');
    } finally {
      setIsDepositing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="bg-green-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Download className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Make a Deposit</h3>
        <p className="text-gray-400">
          Contribute to your DAO's treasury to fund community initiatives
        </p>
      </div>

      <form onSubmit={handleDeposit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount (ETH)
          </label>
          <input
            type="number"
            step="0.001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 text-center text-xl"
            placeholder="0.000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Message (Optional)
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400"
            placeholder="e.g., Monthly contribution"
          />
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 text-sm">
          <h4 className="text-white font-medium mb-2">Transaction Details</h4>
          <div className="space-y-1 text-gray-400">
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="text-white">{amount || '0'} ETH</span>
            </div>
            <div className="flex justify-between">
              <span>Gas Fee:</span>
              <span className="text-white">~$2.50</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total Cost:</span>
              <span className="text-white">{amount ? parseFloat(amount) + 0.0008 : '0'} ETH</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!amount || isDepositing}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          {isDepositing ? 'Processing...' : 'Confirm Deposit'}
        </button>
      </form>
    </div>
  );
}