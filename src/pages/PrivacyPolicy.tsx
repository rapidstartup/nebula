import React from 'react';
import { ArrowLeft, Lock, Eye, Database, Shield } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
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
                Privacy Policy
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              How we protect your data and respect your privacy
            </p>
            <div className="text-sm text-gray-400 mt-4">
              Version 1.5 | Effective Date: June 2025 | Last Updated: June 2025
            </div>
          </div>

          {/* Privacy Philosophy */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Lock className="w-8 h-8 text-purple-400 mr-3" />
                <h2 className="text-3xl font-bold">Our Privacy Philosophy</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Privacy is not just a feature at Nebula—it's the foundation of everything we build. We believe that democratic participation requires the highest levels of privacy protection, enabling citizens to engage freely without fear of surveillance, coercion, or discrimination.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                This policy explains exactly what data we collect (spoiler: very little), how we protect it (spoiler: extensively), and how you maintain complete control over your personal information.
              </p>
            </div>
          </section>

          {/* Data We Collect */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Database className="w-8 h-8 text-blue-400 mr-3" />
                <h2 className="text-3xl font-bold">Data We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-400 pl-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-2">What We DON'T Collect</h3>
                  <p className="text-gray-300 mb-3">
                    Unlike traditional platforms, Nebula is designed to minimize data collection:
                  </p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• No browsing history or behavior tracking</li>
                    <li>• No device fingerprinting</li>
                    <li>• No location tracking beyond voluntary geographic verification</li>
                    <li>• No advertising profiles or commercial data collection</li>
                    <li>• No sale or sharing of personal data with third parties</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-yellow-400 pl-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Identity Verification Data</h3>
                  <p className="text-gray-300 mb-3">
                    For Sybil resistance and democratic legitimacy, we process:
                  </p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Cryptographic hashes of biometric data (not the biometrics themselves)</li>
                    <li>• Geographic attestations for DAO eligibility</li>
                    <li>• Verification status from trusted identity providers</li>
                    <li>• Proof-of-personhood credentials</li>
                  </ul>
                  <p className="text-sm text-gray-400 mt-3">
                    <strong>Important:</strong> We use zero-knowledge proofs to verify identity without storing sensitive personal information.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Platform Interaction Data</h3>
                  <p className="text-gray-300 mb-3">
                    To provide core functionality, we process:
                  </p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Voting records (anonymized and encrypted)</li>
                    <li>• Proposal submissions and comments</li>
                    <li>• DAO membership and participation</li>
                    <li>• Wiki contributions and edits</li>
                  </ul>
                  <p className="text-sm text-gray-400 mt-3">
                    <strong>Note:</strong> All governance data is public by design for transparency, but personally identifiable information is protected through cryptographic techniques.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Your Info Wallet */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-green-400 mr-3" />
                <h2 className="text-3xl font-bold">Your Info Wallet</h2>
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                The Info Wallet is your personal data sovereignty tool, giving you complete control over what information you share and with whom.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-400 mb-4">What You Control</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• What data is shared with which DAOs</li>
                    <li>• How long permissions remain active</li>
                    <li>• Which verification credentials to use</li>
                    <li>• Whether to participate anonymously</li>
                    <li>• When to revoke access completely</li>
                  </ul>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-4">Technical Protection</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• End-to-end encryption of all personal data</li>
                    <li>• Client-side key management</li>
                    <li>• Zero-knowledge proof generation</li>
                    <li>• Automatic key rotation</li>
                    <li>• Secure multi-party computation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How We Protect Your Data */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">How We Protect Your Data</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-400 mb-4">Encryption</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• AES-256 encryption at rest</li>
                    <li>• TLS 1.3 for data in transit</li>
                    <li>• Client-side encryption</li>
                    <li>• Hardware security modules</li>
                  </ul>
                </div>
                
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-400 mb-4">Architecture</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Decentralized data storage</li>
                    <li>• No single points of failure</li>
                    <li>• Peer-to-peer networks</li>
                    <li>• Blockchain immutability</li>
                  </ul>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-4">Access Control</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Multi-factor authentication</li>
                    <li>• Role-based permissions</li>
                    <li>• Regular access reviews</li>
                    <li>• Automated threat detection</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Third-Party Services</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Identity Verification Partners</h3>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    We work with trusted identity verification services to enable Proof of Personhood:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Swiss eID integration (Switzerland)</li>
                    <li>• Biometric verification services (privacy-preserving)</li>
                    <li>• Geographic verification providers</li>
                  </ul>
                  <p className="text-sm text-gray-400 mt-3">
                    These partners process verification data according to strict privacy agreements and cannot access your platform activity or governance participation.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Infrastructure Providers</h3>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    Core infrastructure services that may process encrypted data:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Decentralized storage networks (IPFS, Arweave)</li>
                    <li>• Blockchain networks (Ethereum, Polygon)</li>
                    <li>• Content delivery networks (edge caching)</li>
                  </ul>
                  <p className="text-sm text-gray-400 mt-3">
                    These services only handle encrypted or public governance data and cannot decrypt personal information.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 text-indigo-400 mr-3" />
                <h2 className="text-3xl font-bold">Your Privacy Rights</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-400 mb-4">Access & Control</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• View all data associated with your account</li>
                    <li>• Export your data in standard formats</li>
                    <li>• Modify permissions and sharing settings</li>
                    <li>• Revoke access to specific services</li>
                    <li>• Request data correction or updates</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-indigo-400 mb-4">Deletion & Portability</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Delete your account and personal data</li>
                    <li>• Port your identity to other platforms</li>
                    <li>• Remove specific data points</li>
                    <li>• Request verification of deletion</li>
                    <li>• Maintain governance record integrity</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
                <p className="text-sm text-gray-300">
                  <strong>Note on Governance Records:</strong> While you can delete personal data, public governance records (votes, proposals) may be preserved for democratic transparency. These records are anonymized and cannot be traced back to you after account deletion.
                </p>
              </div>
            </div>
          </section>

          {/* Geographic Considerations */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Geographic Considerations</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-pink-400 mb-4">Data Processing Locations</h3>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    Nebula operates as a decentralized network with no single data processing location. Data may be processed in:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Switzerland (primary jurisdiction and legal base)</li>
                    <li>• European Union (GDPR compliance)</li>
                    <li>• Decentralized networks globally (encrypted data only)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-pink-400 mb-4">Regional Privacy Laws</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We comply with major privacy regulations including GDPR, Swiss Federal Data Protection Act, and other applicable regional laws. Users in jurisdictions with specific privacy rights can exercise those rights through our platform tools or by contacting our privacy team.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Updates and Contact */}
          <section>
            <div className="bg-black/30 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Updates and Contact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-4">Policy Updates</h3>
                  <p className="text-gray-300 mb-4">
                    We may update this privacy policy to reflect:
                  </p>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• New platform features</li>
                    <li>• Legal requirement changes</li>
                    <li>• Community governance decisions</li>
                    <li>• Enhanced privacy protections</li>
                  </ul>
                  <p className="text-sm text-gray-400 mt-3">
                    Major changes will be subject to community governance processes.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-4">Contact Our Privacy Team</h3>
                  <p className="text-gray-300 mb-4">
                    For privacy questions or concerns:
                  </p>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Email: privacy@nebula.gov</li>
                    <li>• Platform privacy settings</li>
                    <li>• Community privacy discussions</li>
                    <li>• Swiss postal address available on request</li>
                  </ul>
                  <p className="text-sm text-gray-400 mt-3">
                    We respond to all privacy inquiries within 30 days.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};