/**
 * ConnectWallet Component - V2
 * 
 * Handles wallet connection with support for multiple wallet types.
 * Displays connection status and user address when connected.
 */

import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, LogOut, Copy, CheckCircle } from 'lucide-react';

export function ConnectWallet() {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = React.useState(false);

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
      <div className="bg-slate-800 rounded-xl p-4 border border-purple-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <div>
              <p className="text-sm text-gray-400">Connected to {chain?.name}</p>
              <div className="flex items-center space-x-2">
                <span className="text-white font-mono text-sm">
                  {formatAddress(address)}
                </span>
                <button
                  onClick={copyAddress}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Copy address"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => disconnect()}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            title="Disconnect"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Disconnect</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-purple-500/20">
      <div className="text-center mb-4">
        <Wallet className="w-8 h-8 text-purple-400 mx-auto mb-2" />
        <h3 className="text-lg font-bold text-white">Connect Wallet</h3>
        <p className="text-sm text-gray-400">
          Connect your wallet to interact with Nebula DAOs
        </p>
      </div>

      <div className="space-y-3">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            disabled={isPending}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors disabled:opacity-50"
          >
            <span className="text-white">{connector.name}</span>
            {isPending && (
              <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
            )}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        By connecting, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}