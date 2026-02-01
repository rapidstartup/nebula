/**
 * Access Control Component - V2
 * 
 * Implements R 5.3: Grant/Revoke Access - Users can grant specific DAOs 
 * or services access to defined VCs from their Info Wallet and revoke 
 * that access at any time.
 */

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { 
  Key, 
  Users, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Search,
  Clock,
  AlertTriangle,
  Eye,
  Trash2
} from 'lucide-react';

interface AccessGrant {
  id: string;
  grantedTo: string;
  grantedToName: string;
  grantedToType: 'dao' | 'service' | 'agent';
  credentialTypes: string[];
  permissions: ('read' | 'verify' | 'share')[];
  grantedAt: string;
  expiresAt?: string;
  lastAccessed?: string;
  accessCount: number;
  isActive: boolean;
}

export function AccessControl() {
  const { isConnected, address } = useAccount();
  const [accessGrants, setAccessGrants] = useState<AccessGrant[]>([
    {
      id: '1',
      grantedTo: '0x1234...5678',
      grantedToName: 'Zurich Digital Democracy DAO',
      grantedToType: 'dao',
      credentialTypes: ['Proof of Personhood', 'Residency Verification'],
      permissions: ['read', 'verify'],
      grantedAt: '2026-01-15T10:00:00Z',
      expiresAt: '2026-07-15T10:00:00Z',
      lastAccessed: '2026-02-01T14:30:00Z',
      accessCount: 12,
      isActive: true,
    },
    {
      id: '2',
      grantedTo: '0x8765...4321',
      grantedToName: 'Identity Verification Service',
      grantedToType: 'service',
      credentialTypes: ['Email Address', 'Phone Number'],
      permissions: ['verify'],
      grantedAt: '2026-02-01T09:00:00Z',
      lastAccessed: '2026-02-02T08:15:00Z',
      accessCount: 3,
      isActive: true,
    }
  ]);

  const [showGrantForm, setShowGrantForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [newGrant, setNewGrant] = useState({
    grantedTo: '',
    grantedToName: '',
    grantedToType: 'dao' as AccessGrant['grantedToType'],
    credentialTypes: [] as string[],
    permissions: [] as AccessGrant['permissions'],
    expiresAt: '',
  });

  const availableCredentials = [
    'Proof of Personhood',
    'Email Address', 
    'Physical Address',
    'Phone Number',
    'Residency Verification',
    'Government ID',
    'Educational Credentials'
  ];

  const availablePermissions: { id: AccessGrant['permissions'][0]; label: string; description: string }[] = [
    { id: 'read', label: 'Read', description: 'View credential data' },
    { id: 'verify', label: 'Verify', description: 'Confirm credential validity' },
    { id: 'share', label: 'Share', description: 'Share with other authorized parties' },
  ];

  const revokeAccess = (grantId: string) => {
    setAccessGrants(prev => prev.map(grant => 
      grant.id === grantId ? { ...grant, isActive: false } : grant
    ));
  };

  const deleteGrant = (grantId: string) => {
    setAccessGrants(prev => prev.filter(grant => grant.id !== grantId));
  };

  const addGrant = () => {
    if (!newGrant.grantedTo || !newGrant.grantedToName || newGrant.credentialTypes.length === 0) {
      return;
    }

    const grant: AccessGrant = {
      id: crypto.randomUUID(),
      grantedTo: newGrant.grantedTo,
      grantedToName: newGrant.grantedToName,
      grantedToType: newGrant.grantedToType,
      credentialTypes: newGrant.credentialTypes,
      permissions: newGrant.permissions,
      grantedAt: new Date().toISOString(),
      expiresAt: newGrant.expiresAt || undefined,
      accessCount: 0,
      isActive: true,
    };

    setAccessGrants(prev => [...prev, grant]);
    setNewGrant({
      grantedTo: '',
      grantedToName: '',
      grantedToType: 'dao',
      credentialTypes: [],
      permissions: [],
      expiresAt: '',
    });
    setShowGrantForm(false);
  };

  const toggleCredentialType = (credentialType: string) => {
    setNewGrant(prev => ({
      ...prev,
      credentialTypes: prev.credentialTypes.includes(credentialType)
        ? prev.credentialTypes.filter(t => t !== credentialType)
        : [...prev.credentialTypes, credentialType]
    }));
  };

  const togglePermission = (permission: AccessGrant['permissions'][0]) => {
    setNewGrant(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const getTypeIcon = (type: AccessGrant['grantedToType']) => {
    switch (type) {
      case 'dao': return Users;
      case 'service': return Shield;
      case 'agent': return Key;
      default: return Shield;
    }
  };

  const getTypeColor = (type: AccessGrant['grantedToType']) => {
    switch (type) {
      case 'dao': return 'text-purple-400 bg-purple-500/20';
      case 'service': return 'text-cyan-400 bg-cyan-500/20';
      case 'agent': return 'text-amber-400 bg-amber-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const filteredGrants = accessGrants.filter(grant =>
    grant.grantedToName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grant.grantedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isConnected) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-gray-600 opacity-60">
        <div className="text-center">
          <Key className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-gray-400">Access Control</h3>
          <p className="text-sm text-gray-500">Connect wallet to manage access permissions</p>
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
              <Key className="w-6 h-6 text-purple-400" />
              <span>Access Control</span>
            </h2>
            <p className="text-gray-400 mt-1">
              Manage who can access your credentials and how
            </p>
          </div>
          <button
            onClick={() => setShowGrantForm(!showGrantForm)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Grant Access</span>
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Grant Access Form */}
      {showGrantForm && (
        <div className="p-6 border-b border-slate-700 bg-slate-700/50">
          <h3 className="text-lg font-bold text-white mb-4">Grant New Access</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                <select
                  value={newGrant.grantedToType}
                  onChange={(e) => setNewGrant({ ...newGrant, grantedToType: e.target.value as AccessGrant['grantedToType'] })}
                  className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white"
                >
                  <option value="dao">DAO</option>
                  <option value="service">Service</option>
                  <option value="agent">Agent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={newGrant.grantedToName}
                  onChange={(e) => setNewGrant({ ...newGrant, grantedToName: e.target.value })}
                  placeholder="e.g., Zurich Democracy DAO"
                  className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white placeholder-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  value={newGrant.grantedTo}
                  onChange={(e) => setNewGrant({ ...newGrant, grantedTo: e.target.value })}
                  placeholder="0x..."
                  className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Credential Types</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {availableCredentials.map((credential) => (
                  <button
                    key={credential}
                    onClick={() => toggleCredentialType(credential)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      newGrant.credentialTypes.includes(credential)
                        ? 'bg-purple-600/20 border-purple-500 text-purple-400'
                        : 'bg-slate-600 border-slate-500 text-gray-300 hover:border-purple-500'
                    }`}
                  >
                    {credential}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Permissions</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {availablePermissions.map((permission) => (
                  <button
                    key={permission.id}
                    onClick={() => togglePermission(permission.id)}
                    className={`p-3 text-left rounded-lg border transition-colors ${
                      newGrant.permissions.includes(permission.id)
                        ? 'bg-purple-600/20 border-purple-500'
                        : 'bg-slate-600 border-slate-500 hover:border-purple-500'
                    }`}
                  >
                    <div className="font-medium text-white">{permission.label}</div>
                    <div className="text-sm text-gray-400">{permission.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Expiration Date (Optional)
              </label>
              <input
                type="datetime-local"
                value={newGrant.expiresAt}
                onChange={(e) => setNewGrant({ ...newGrant, expiresAt: e.target.value })}
                className="bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={addGrant}
              disabled={!newGrant.grantedTo || !newGrant.grantedToName || newGrant.credentialTypes.length === 0}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Key className="w-4 h-4" />
              <span>Grant Access</span>
            </button>
            
            <button
              onClick={() => setShowGrantForm(false)}
              className="border border-gray-500 text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Access Grants List */}
      <div className="p-6">
        {filteredGrants.length === 0 ? (
          <div className="text-center py-8">
            <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No Access Grants</h3>
            <p className="text-gray-400 mb-4">
              You haven't granted access to any DAOs or services yet
            </p>
            <button
              onClick={() => setShowGrantForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            >
              Grant First Access
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGrants.map((grant) => {
              const TypeIcon = getTypeIcon(grant.grantedToType);
              const typeColor = getTypeColor(grant.grantedToType);
              
              return (
                <div
                  key={grant.id}
                  className={`bg-slate-700 rounded-lg p-4 border ${
                    grant.isActive ? 'border-slate-600' : 'border-red-500/30 bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded ${typeColor}`}>
                        <TypeIcon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-white font-medium">{grant.grantedToName}</h4>
                          {!grant.isActive && (
                            <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded">
                              Revoked
                            </span>
                          )}
                        </div>
                        
                        <div className="text-sm text-gray-400 mb-2">
                          {grant.grantedTo} • {grant.grantedToType.toUpperCase()}
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm text-gray-400">Credentials: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {grant.credentialTypes.map((type) => (
                                <span
                                  key={type}
                                  className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded"
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-sm text-gray-400">Permissions: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {grant.permissions.map((permission) => (
                                <span
                                  key={permission}
                                  className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded capitalize"
                                >
                                  {permission}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>Granted: {new Date(grant.grantedAt).toLocaleDateString()}</span>
                            </div>
                            
                            {grant.lastAccessed && (
                              <div className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>Last used: {new Date(grant.lastAccessed).toLocaleDateString()}</span>
                              </div>
                            )}
                            
                            <span>Used {grant.accessCount} times</span>
                            
                            {grant.expiresAt && (
                              <div className="flex items-center space-x-1">
                                <AlertTriangle className="w-3 h-3" />
                                <span>Expires: {new Date(grant.expiresAt).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {grant.isActive ? (
                        <button
                          onClick={() => revokeAccess(grant.id)}
                          className="text-orange-400 hover:text-orange-300 p-2"
                          title="Revoke access"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => deleteGrant(grant.id)}
                          className="text-red-400 hover:text-red-300 p-2"
                          title="Delete grant"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}