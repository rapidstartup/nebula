/**
 * ConnectWallet Component - V2
 * 
 * Handles wallet connection with support for multiple wallet types.
 * Displays connection status and user address when connected.
 */

import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, LogOut, Copy, CheckCircle, ExternalLink } from 'lucide-react';

// Wallet configuration with friendly names and icons
const WALLET_CONFIG: Record<string, { name: string; icon: string; color: string }> = {
  'injected': {
    name: 'MetaMask',
    icon: '🦊',
    color: 'from-orange-500 to-amber-500'
  },
  'metaMask': {
    name: 'MetaMask',
    icon: '🦊',
    color: 'from-orange-500 to-amber-500'
  },
  'walletConnect': {
    name: 'WalletConnect',
    icon: '🔗',
    color: 'from-blue-500 to-cyan-500'
  },
  'coinbaseWallet': {
    name: 'Coinbase Wallet',
    icon: '💰',
    color: 'from-blue-600 to-blue-400'
  },
  'safe': {
    name: 'Safe (Gnosis)',
    icon: '🔒',
    color: 'from-green-500 to-emerald-500'
  }
};

const getWalletConfig = (connectorId: string, connectorName: string) => {
  // Check for exact match first
  if (WALLET_CONFIG[connectorId]) {
    return WALLET_CONFIG[connectorId];
  }
  // Check if connector name contains known wallet names
  const lowerName = connectorName.toLowerCase();
  if (lowerName.includes('metamask')) {
    return WALLET_CONFIG['metaMask'];
  }
  if (lowerName.includes('walletconnect')) {
    return WALLET_CONFIG['walletConnect'];
  }
  if (lowerName.includes('coinbase')) {
    return WALLET_CONFIG['coinbaseWallet'];
  }
  // Default fallback
  return {
    name: connectorName === 'Injected' ? 'Browser Wallet' : connectorName,
    icon: '👛',
    color: 'from-purple-500 to-pink-500'
  };
};

export function ConnectWallet() {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect, isPending, pendingConnector, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = React.useState(false);
  const [connectionError, setConnectionError] = React.useState<string | null>(null);

  // Handle connection with error catching
  const handleConnect = async (connector: typeof connectors[0]) => {
    setConnectionError(null);
    try {
      // Check if MetaMask/injected wallet is available
      if ((connector.id === 'injected' || connector.id === 'metaMask') && 
          typeof window !== 'undefined' && 
          !(window as any).ethereum) {
        setConnectionError('MetaMask not detected. Please install the MetaMask browser extension.');
        window.open('https://metamask.io/download/', '_blank');
        return;
      }
      connect({ connector });
    } catch (err: any) {
      setConnectionError(err.message || 'Failed to connect wallet');
    }
  };

  // Clear error when connection succeeds
  React.useEffect(() => {
    if (isConnected) {
      setConnectionError(null);
    }
  }, [isConnected]);

  // Show wagmi errors
  React.useEffect(() => {
    if (error) {
      setConnectionError(error.message);
    }
  }, [error]);

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 shadow-lg shadow-green-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800 animate-pulse"></div>
            </div>
            <div>
              <p className="text-sm text-green-400 font-medium">Connected to {chain?.name || 'Network'}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-white font-mono text-lg">
                  {formatAddress(address)}
                </span>
                <button
                  onClick={copyAddress}
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                  title="Copy address"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={`https://etherscan.io/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                  title="View on Etherscan"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <button
            onClick={() => disconnect()}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors border border-red-500/20"
            title="Disconnect"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Disconnect</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Connect Wallet</h3>
        <p className="text-sm text-gray-400 mt-1">
          Choose your preferred wallet to get started
        </p>
      </div>

      {/* Error message */}
      {connectionError && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">{connectionError}</p>
        </div>
      )}

      <div className="space-y-3">
        {/* Deduplicate connectors - keep only unique wallet types */}
        {(() => {
          // Get unique connectors - prioritize 'injected' over 'metaMask', keep one of each type
          const seen = new Set<string>();
          const uniqueConnectors = connectors.filter((connector) => {
            // Normalize the key - treat injected/metaMask as same type
            const isInjectedType = connector.id === 'injected' || 
                                   connector.id === 'metaMask' || 
                                   connector.name.toLowerCase().includes('metamask');
            const key = isInjectedType ? 'browser-wallet' : connector.id;
            
            if (seen.has(key)) {
              return false;
            }
            seen.add(key);
            return true;
          });
          
          console.log('[Nebula] Available connectors:', uniqueConnectors.map(c => ({ id: c.id, name: c.name })));
          
          return uniqueConnectors.map((connector) => {
            const isInjectedType = connector.id === 'injected' || 
                                   connector.id === 'metaMask' || 
                                   connector.name.toLowerCase().includes('metamask');
            const config = getWalletConfig(connector.id, connector.name);
            const isLoading = isPending && pendingConnector?.id === connector.id;
            
            return (
              <button
                key={connector.uid}
                onClick={() => handleConnect(connector)}
                disabled={isPending}
                className="w-full flex items-center p-4 rounded-xl border border-gray-600/50 hover:border-purple-500/50 bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-xl">{config.icon}</span>
                </div>
                <div className="flex-1 text-left">
                  <span className="text-white font-medium block">{config.name}</span>
                  <span className="text-xs text-gray-500">
                    {isInjectedType 
                      ? 'Browser extension' 
                      : connector.id === 'walletConnect' 
                        ? 'Scan with mobile wallet'
                        : 'Connect securely'}
                  </span>
                </div>
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            );
          });
        })()}
      </div>

      {/* Warning if no WalletConnect */}
      {!connectors.some(c => c.id === 'walletConnect') && (
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <p className="text-amber-400 text-xs text-center">
            Mobile wallet connection unavailable. Install MetaMask browser extension to connect.
          </p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-700/50">
        <p className="text-xs text-gray-500 text-center">
          New to Web3?{' '}
          <a 
            href="https://ethereum.org/en/wallets/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            Learn about wallets
          </a>
        </p>
        <p className="text-xs text-gray-600 mt-2 text-center">
          By connecting, you agree to our{' '}
          <a href="/terms-of-service" className="text-gray-400 hover:text-white">Terms</a>
          {' '}and{' '}
          <a href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}