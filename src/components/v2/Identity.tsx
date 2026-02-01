/**
 * Identity Component - V2
 * 
 * Handles Decentralized Identity (DID) creation and management.
 * Integrates with NebulaIdentity smart contract for Proof of Personhood.
 */

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Shield, User, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useHasActiveDID, useHasProofOfPersonhood, useCreateDID } from '../../lib/web3/hooks';

export function Identity() {
  const { isConnected } = useAccount();
  const [isCreating, setIsCreating] = useState(false);

  // Check current identity status
  const { data: hasActiveDID, isLoading: loadingDID } = useHasActiveDID();
  const { data: hasProofOfPersonhood, isLoading: loadingPoP } = useHasProofOfPersonhood();
  
  // DID creation hook
  const { createDID, isPending, isConfirming, isSuccess, error } = useCreateDID();

  const handleCreateDID = async () => {
    if (!isConnected) return;
    
    setIsCreating(true);
    try {
      // Generate a placeholder public key hash for now
      // In production, this would be derived from user's actual key pair
      const publicKeyHash = `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}` as `0x${string}`;
      
      await createDID(publicKeyHash);
    } catch (err) {
      console.error('Failed to create DID:', err);
    } finally {
      setIsCreating(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-gray-600 opacity-60">
        <div className="text-center">
          <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-gray-400">Identity System</h3>
          <p className="text-sm text-gray-500">Connect wallet to create identity</p>
        </div>
      </div>
    );
  }

  if (loadingDID || loadingPoP) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-purple-500/20">
        <div className="text-center">
          <Loader className="w-8 h-8 text-purple-400 mx-auto mb-2 animate-spin" />
          <h3 className="text-lg font-bold text-white">Loading Identity</h3>
          <p className="text-sm text-gray-400">Checking blockchain status...</p>
        </div>
      </div>
    );
  }

  if (hasActiveDID) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-green-500/20">
        <div className="flex items-start space-x-4">
          <div className="bg-green-500/20 p-3 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">Identity Active</h3>
            <p className="text-sm text-gray-400 mb-3">
              Your Decentralized Identity (DID) is verified and active
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${hasProofOfPersonhood ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                <span className={`text-sm ${hasProofOfPersonhood ? 'text-green-400' : 'text-yellow-400'}`}>
                  {hasProofOfPersonhood ? 'Proof of Personhood Verified' : 'Proof of Personhood Pending'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">
                  DID Certificate Active
                </span>
              </div>
            </div>

            {!hasProofOfPersonhood && (
              <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400">
                    Complete biometric verification to participate in governance
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-purple-500/20">
      <div className="text-center">
        <div className="bg-purple-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Shield className="w-8 h-8 text-purple-400" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">Create Your Identity</h3>
        <p className="text-gray-400 mb-6">
          Create a Decentralized Identity (DID) to participate in Nebula governance.
          Your identity is cryptographically secured and self-sovereign.
        </p>

        <div className="bg-slate-700 rounded-lg p-4 mb-6 text-left">
          <h4 className="text-sm font-bold text-white mb-2">What you get:</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>✓ Sybil-resistant identity verification</li>
            <li>✓ Self-sovereign credential management</li>
            <li>✓ Privacy-preserving governance participation</li>
            <li>✓ Access to DAO creation and voting</li>
          </ul>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">
                {error.message || 'Failed to create identity'}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleCreateDID}
          disabled={isPending || isConfirming || isCreating}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          {(isPending || isConfirming || isCreating) ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span>
                {isPending || isCreating ? 'Creating Identity...' : 'Confirming Transaction...'}
              </span>
            </>
          ) : (
            <>
              <Shield className="w-4 h-4" />
              <span>Create Identity</span>
            </>
          )}
        </button>

        {isSuccess && (
          <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">
                Identity created successfully! Page will refresh shortly.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}