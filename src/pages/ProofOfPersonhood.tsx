import React from 'react';
import { ArrowLeft, Shield, Key, AlertTriangle, CheckCircle } from 'lucide-react';

export const ProofOfPersonhood: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="p-6">
          <a 
            href="/" 
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </a>
        </nav>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 pb-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Proof of Personhood
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Technical whitepaper on Sybil resistance and identity verification
            </p>
            <div className="text-sm text-gray-400 mt-4">
              Version 1.5 | Last Updated: June 2025
            </div>
          </div>

          {/* Abstract */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Abstract</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                This whitepaper presents Nebula's comprehensive approach to Proof of Personhood (PoP), a critical component for ensuring democratic legitimacy in decentralized governance systems. Our solution combines biocryptic verification, state-verified digital identity integration, and advanced cryptographic techniques to create a Sybil-resistant platform while preserving user privacy and autonomy.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                The system implements a novel "Info Wallet" architecture that gives users complete control over their personally identifiable information (PII) while enabling verifiable, unique human participation in governance processes.
              </p>
            </div>
          </section>

          {/* The Sybil Problem */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400 mr-3" />
                <h2 className="text-3xl font-bold">The Sybil Problem</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                In decentralized governance, the Sybil attack represents one of the most fundamental threats to democratic legitimacy. Bad actors can create multiple false identities to gain disproportionate voting power, undermining the "one person, one vote" principle essential to fair governance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Attack Vectors</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Multiple account creation</li>
                    <li>• Automated bot networks</li>
                    <li>• Identity farming operations</li>
                    <li>• Social engineering attacks</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Consequences</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Governance manipulation</li>
                    <li>• Unfair resource allocation</li>
                    <li>• Loss of community trust</li>
                    <li>• Platform abandonment</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Our Solution */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
                <h2 className="text-3xl font-bold">Nebula's Multi-Layer Solution</h2>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-400 pl-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Layer 1: Biocryptic Verification</h3>
                  <p className="text-gray-300">
                    Using advanced biometric cryptography, we create unique, non-reversible identifiers from user biometrics without storing the raw biometric data. This ensures each human can only create one verified identity.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-6">
                  <h3 className="text-xl font-semibold text-purple-400 mb-2">Layer 2: State-ID Integration</h3>
                  <p className="text-gray-300">
                    Integration with state-verified digital identity systems (like Swiss eID) provides an additional layer of verification while maintaining privacy through zero-knowledge proofs.
                  </p>
                </div>
                
                <div className="border-l-4 border-pink-400 pl-6">
                  <h3 className="text-xl font-semibold text-pink-400 mb-2">Layer 3: Social Vouching</h3>
                  <p className="text-gray-300">
                    Community-based verification where existing verified users can vouch for new members, creating a web of trust while preventing coordinated attacks.
                  </p>
                </div>
                
                <div className="border-l-4 border-cyan-400 pl-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">Layer 4: Behavioral Analysis</h3>
                  <p className="text-gray-300">
                    ML-powered detection of bot-like behavior patterns and coordinated activities, with transparent algorithmic governance and user appeals processes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Info Wallet Architecture */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Key className="w-8 h-8 text-blue-400 mr-3" />
                <h2 className="text-3xl font-bold">Info Wallet Architecture</h2>
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                The Info Wallet gives users complete sovereignty over their personal data while enabling selective disclosure for verification purposes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-4">User Control</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Self-sovereign key management</li>
                    <li>• Granular permission controls</li>
                    <li>• Revocable access grants</li>
                    <li>• Zero-knowledge disclosures</li>
                  </ul>
                </div>
                
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-400 mb-4">Data Types</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Biometric hashes</li>
                    <li>• Geographic attestations</li>
                    <li>• State ID confirmations</li>
                    <li>• Social vouching records</li>
                  </ul>
                </div>
                
                <div className="bg-pink-900/20 border border-pink-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-pink-400 mb-4">Privacy Features</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• End-to-end encryption</li>
                    <li>• Minimal data collection</li>
                    <li>• Regular key rotation</li>
                    <li>• Audit trails</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cryptographic Foundation */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-indigo-400 mr-3" />
                <h2 className="text-3xl font-bold">Cryptographic Foundation</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-400 mb-4">Core Technologies</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>
                      <strong className="text-white">Zero-Knowledge Proofs:</strong>
                      <span className="block text-sm text-gray-400">Prove identity without revealing sensitive data</span>
                    </li>
                    <li>
                      <strong className="text-white">Homomorphic Encryption:</strong>
                      <span className="block text-sm text-gray-400">Compute on encrypted biometric data</span>
                    </li>
                    <li>
                      <strong className="text-white">Merkle Trees:</strong>
                      <span className="block text-sm text-gray-400">Efficient verification of large identity sets</span>
                    </li>
                    <li>
                      <strong className="text-white">Ring Signatures:</strong>
                      <span className="block text-sm text-gray-400">Anonymous yet verifiable participation</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-indigo-400 mb-4">Security Properties</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>
                      <strong className="text-white">Unlinkability:</strong>
                      <span className="block text-sm text-gray-400">Actions cannot be traced to individuals</span>
                    </li>
                    <li>
                      <strong className="text-white">Non-repudiation:</strong>
                      <span className="block text-sm text-gray-400">Votes are verifiably authentic</span>
                    </li>
                    <li>
                      <strong className="text-white">Forward Secrecy:</strong>
                      <span className="block text-sm text-gray-400">Past data remains secure if keys are compromised</span>
                    </li>
                    <li>
                      <strong className="text-white">Quantum Resistance:</strong>
                      <span className="block text-sm text-gray-400">Protection against future quantum attacks</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Implementation Phases */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Implementation Phases</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">1</div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Phase 1: Swiss eID Integration</h3>
                    <p className="text-gray-300">
                      Begin with state-verified digital identity integration in Switzerland, leveraging existing legal frameworks and user familiarity.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">2</div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">Phase 2: Biocryptic Layer</h3>
                    <p className="text-gray-300">
                      Implement biometric verification system with advanced privacy-preserving techniques for enhanced security.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">3</div>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">Phase 3: Social Vouching</h3>
                    <p className="text-gray-300">
                      Add community-based verification layer to enable organic growth while maintaining security.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-pink-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">4</div>
                  <div>
                    <h3 className="text-xl font-semibold text-pink-400 mb-2">Phase 4: Global Expansion</h3>
                    <p className="text-gray-300">
                      Adapt system for international deployment with region-specific identity verification methods.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security Considerations */}
          <section>
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400 mr-3" />
                <h2 className="text-3xl font-bold">Security Considerations & Mitigations</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Potential Threats</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Coercion attacks on biometric data</li>
                    <li>• Hardware compromise</li>
                    <li>• State-level identity database breaches</li>
                    <li>• Social engineering of vouching system</li>
                    <li>• Quantum computing threats</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Mitigation Strategies</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Duress detection protocols</li>
                    <li>• Hardware security modules (HSM)</li>
                    <li>• Zero-knowledge proof architectures</li>
                    <li>• Multi-factor vouching requirements</li>
                    <li>• Post-quantum cryptography</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};