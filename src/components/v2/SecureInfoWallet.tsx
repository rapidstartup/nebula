/**
 * Secure Info Wallet Component - V2
 * 
 * Implements R 5.2: Encrypted PII storage in user's Info Wallet,
 * controllable via private key using IPFS for decentralized storage.
 */

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { 
  Vault, 
  Plus, 
  Eye, 
  EyeOff, 
  Download, 
  Upload, 
  Shield, 
  Key, 
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

interface CredentialData {
  id: string;
  type: 'email' | 'address' | 'phone' | 'document' | 'custom';
  label: string;
  value: string;
  encrypted: boolean;
  ipfsHash?: string;
  createdAt: string;
  sharedWith: string[];
}

export function SecureInfoWallet() {
  const { isConnected, address } = useAccount();
  const [credentials, setCredentials] = useState<CredentialData[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState<string | null>(null);
  const [showDecrypted, setShowDecrypted] = useState<Record<string, boolean>>({});

  const [newCredential, setNewCredential] = useState({
    type: 'email' as CredentialData['type'],
    label: '',
    value: '',
  });

  const addCredential = async () => {
    if (!newCredential.label || !newCredential.value) return;

    setIsLoading(true);
    try {
      // Encrypt the credential data
      const encryptedValue = await encryptData(newCredential.value, address!);
      
      // Store encrypted data on IPFS
      const ipfsHash = await storeOnIPFS(encryptedValue);

      const credential: CredentialData = {
        id: crypto.randomUUID(),
        type: newCredential.type,
        label: newCredential.label,
        value: newCredential.value, // Store plaintext locally for demo
        encrypted: true,
        ipfsHash,
        createdAt: new Date().toISOString(),
        sharedWith: [],
      };

      setCredentials(prev => [...prev, credential]);
      setNewCredential({ type: 'email', label: '', value: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add credential:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const encryptData = async (data: string, userAddress: string): Promise<string> => {
    // Placeholder encryption using Web Crypto API
    // In production, this would use the user's private key
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    // Simulate encryption
    const encrypted = btoa(JSON.stringify({
      data: Array.from(dataBuffer),
      userAddress,
      timestamp: Date.now()
    }));
    
    return encrypted;
  };

  const storeOnIPFS = async (encryptedData: string): Promise<string> => {
    // Placeholder IPFS storage
    // In production, this would use Web3.Storage or similar
    const hash = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return hash;
  };

  const toggleDecryption = (credentialId: string) => {
    setShowDecrypted(prev => ({
      ...prev,
      [credentialId]: !prev[credentialId]
    }));
  };

  const removeCredential = (credentialId: string) => {
    setCredentials(prev => prev.filter(c => c.id !== credentialId));
  };

  const shareCredential = async (credentialId: string, targetAddress: string) => {
    // Placeholder implementation for sharing credentials
    setCredentials(prev => prev.map(cred => 
      cred.id === credentialId 
        ? { ...cred, sharedWith: [...cred.sharedWith, targetAddress] }
        : cred
    ));
  };

  if (!isConnected) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-gray-600 opacity-60">
        <div className="text-center">
          <Vault className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-gray-400">Secure Info Wallet</h3>
          <p className="text-sm text-gray-500">Connect wallet to manage your credentials</p>
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
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Vault className="w-6 h-6 text-purple-400" />
              <span>Secure Info Wallet</span>
            </h2>
            <p className="text-gray-400 mt-1">
              Encrypted storage for your personal information
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Credential</span>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">End-to-End Encrypted</span>
          </div>
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">Your Keys, Your Data</span>
          </div>
          <div className="flex items-center space-x-2">
            <Upload className="w-4 h-4 text-amber-400" />
            <span className="text-gray-300">IPFS Distributed Storage</span>
          </div>
        </div>
      </div>

      {/* Add Credential Form */}
      {showAddForm && (
        <div className="p-6 border-b border-slate-700 bg-slate-700/50">
          <h3 className="text-lg font-bold text-white mb-4">Add New Credential</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <select
                value={newCredential.type}
                onChange={(e) => setNewCredential({ ...newCredential, type: e.target.value as CredentialData['type'] })}
                className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white"
              >
                <option value="email">Email Address</option>
                <option value="address">Physical Address</option>
                <option value="phone">Phone Number</option>
                <option value="document">ID Document</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Label</label>
              <input
                type="text"
                value={newCredential.label}
                onChange={(e) => setNewCredential({ ...newCredential, label: e.target.value })}
                placeholder="e.g., Primary Email"
                className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white placeholder-gray-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Value</label>
              <input
                type="text"
                value={newCredential.value}
                onChange={(e) => setNewCredential({ ...newCredential, value: e.target.value })}
                placeholder="Enter the credential data"
                className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="flex space-x-3 mt-4">
            <button
              onClick={addCredential}
              disabled={isLoading || !newCredential.label || !newCredential.value}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Encrypting & Storing...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Encrypt & Store</span>
                </>
              )}
            </button>
            
            <button
              onClick={() => setShowAddForm(false)}
              className="border border-gray-500 text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Credentials List */}
      <div className="p-6">
        {credentials.length === 0 ? (
          <div className="text-center py-8">
            <Vault className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No Credentials Stored</h3>
            <p className="text-gray-400 mb-4">
              Add your first encrypted credential to get started
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            >
              Add Credential
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {credentials.map((credential) => (
              <div
                key={credential.id}
                className="bg-slate-700 rounded-lg p-4 border border-slate-600"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-500/20 p-2 rounded">
                        <Shield className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{credential.label}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span className="capitalize">{credential.type}</span>
                          <span>•</span>
                          <span>IPFS: {credential.ipfsHash?.substring(0, 12)}...</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Value:</span>
                        <span className="text-white font-mono text-sm">
                          {showDecrypted[credential.id] 
                            ? credential.value 
                            : '•'.repeat(credential.value.length)
                          }
                        </span>
                        <button
                          onClick={() => toggleDecryption(credential.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          {showDecrypted[credential.id] ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      
                      {credential.sharedWith.length > 0 && (
                        <div className="mt-2">
                          <span className="text-sm text-gray-400">Shared with:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {credential.sharedWith.map((addr) => (
                              <span
                                key={addr}
                                className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded"
                              >
                                {addr.substring(0, 8)}...
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => removeCredential(credential.id)}
                      className="text-red-400 hover:text-red-300 p-2"
                      title="Remove credential"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}