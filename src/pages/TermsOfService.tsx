import React from 'react';
import { ArrowLeft, FileText, Shield, AlertCircle, Users } from 'lucide-react';

export const TermsOfService: React.FC = () => {
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
                Terms of Service
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              User rights, responsibilities, and platform governance
            </p>
            <div className="text-sm text-gray-400 mt-4">
              Version 1.5 | Effective Date: June 2025 | Last Updated: June 2025
            </div>
          </div>

          {/* Important Notice */}
          <section className="mb-12">
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-8 h-8 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-bold text-yellow-400">Important Notice</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                These Terms of Service are written in plain language to ensure accessibility and understanding. Nebula is committed to transparency in all aspects of platform governance, including legal agreements. By using the Nebula platform, you agree to these terms and our commitment to user sovereignty and democratic empowerment.
              </p>
            </div>
          </section>

          {/* Platform Overview */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <FileText className="w-8 h-8 text-purple-400 mr-3" />
                <h2 className="text-3xl font-bold">Platform Overview</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Nebula is a decentralized platform for democratic governance that enables communities to organize, vote, and manage resources transparently. The platform consists of:
              </p>
              <ul className="space-y-2 text-gray-300 ml-6">
                <li>• Self-sovereign identity systems</li>
                <li>• Geographic-based Decentralized Autonomous Organizations (DAOs)</li>
                <li>• Voting and proposal management tools</li>
                <li>• Treasury transparency features</li>
                <li>• Community knowledge bases</li>
              </ul>
            </div>
          </section>

          {/* User Rights */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-green-400 mr-3" />
                <h2 className="text-3xl font-bold">Your Rights as a User</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Data & Identity Rights</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Complete control over your digital identity</li>
                    <li>• Right to revoke data access permissions</li>
                    <li>• Right to data portability and export</li>
                    <li>• Right to anonymous participation</li>
                    <li>• Right to delete your account and data</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Participation Rights</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Equal voting power in eligible DAOs</li>
                    <li>• Right to create proposals</li>
                    <li>• Right to form new DAOs</li>
                    <li>• Right to transparent governance processes</li>
                    <li>• Right to appeal moderation decisions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-blue-400 mr-3" />
                <h2 className="text-3xl font-bold">Your Responsibilities</h2>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-400 pl-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Identity Verification</h3>
                  <p className="text-gray-300">
                    You must provide accurate information during identity verification and maintain only one verified account. Creating multiple accounts to gain additional voting power (Sybil attacks) is prohibited and may result in account suspension.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-6">
                  <h3 className="text-xl font-semibold text-purple-400 mb-2">Respectful Participation</h3>
                  <p className="text-gray-300">
                    You agree to participate in governance discussions and voting in good faith, treating other community members with respect and dignity. Harassment, hate speech, and attempts to manipulate governance processes are prohibited.
                  </p>
                </div>
                
                <div className="border-l-4 border-pink-400 pl-6">
                  <h3 className="text-xl font-semibold text-pink-400 mb-2">Security Best Practices</h3>
                  <p className="text-gray-300">
                    You are responsible for securing your account credentials, private keys, and personal devices. Report security vulnerabilities responsibly and do not attempt to exploit platform weaknesses.
                  </p>
                </div>
                
                <div className="border-l-4 border-cyan-400 pl-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">Legal Compliance</h3>
                  <p className="text-gray-300">
                    You must comply with applicable laws in your jurisdiction when using the platform. Do not use Nebula to organize illegal activities or circumvent legal requirements in your region.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Platform Governance */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Platform Governance</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-400 mb-4">Decentralized Nature</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Nebula operates as a decentralized platform. While the Nebula Foundation may provide initial development and support, individual DAOs are autonomous entities responsible for their own governance, decisions, and actions. The Foundation does not control or direct DAO activities.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-indigo-400 mb-4">DAO Autonomy</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Each DAO operates independently and may establish its own rules, procedures, and governance mechanisms within the bounds of the platform's technical capabilities and these Terms of Service. DAO decisions are binding only within that specific community.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-indigo-400 mb-4">Community Moderation</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Platform-wide moderation is handled through community governance mechanisms. Serious violations may be addressed by the broader Nebula community through transparent voting processes. Local DAO moderation is handled by each community independently.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Intellectual Property</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Open Source Commitment</h3>
                  <p className="text-gray-300 mb-4">
                    Nebula's core platform is open source and released under permissive licenses. You have the right to:
                  </p>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Use, modify, and distribute the software</li>
                    <li>• Create derivative works</li>
                    <li>• Fork the project if needed</li>
                    <li>• Audit the codebase</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">User-Generated Content</h3>
                  <p className="text-gray-300 mb-4">
                    You retain ownership of content you create on the platform, including:
                  </p>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Proposals and discussion posts</li>
                    <li>• Wiki contributions</li>
                    <li>• Comments and interactions</li>
                    <li>• DAO documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Limitation of Liability</h2>
              
              <div className="space-y-4">
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-400 mb-3">Platform Limitations</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Nebula is provided "as is" without warranties. The platform facilitates governance but cannot guarantee outcomes, prevent all malicious behavior, or ensure perfect security. Users participate at their own risk and discretion.
                  </p>
                </div>
                
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">Financial Disclaimer</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    DAO treasuries and token transactions are managed by smart contracts and community governance. The Nebula Foundation is not responsible for financial losses, treasury mismanagement, or transaction failures within individual DAOs.
                  </p>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Technical Risks</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    As with all software, Nebula may contain bugs, experience downtime, or face security vulnerabilities. Users should maintain appropriate backups and security practices for their accounts and data.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Updates and Changes */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Updates and Changes</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                These Terms of Service may be updated to reflect platform evolution, legal requirements, or community feedback. Major changes will be subject to community governance processes, ensuring user participation in decisions that affect their rights and responsibilities.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Users will be notified of changes through the platform and given reasonable time to review and respond before changes take effect. Continued use of the platform after changes become effective constitutes acceptance of the updated terms.
              </p>
            </div>
          </section>

          {/* Contact and Disputes */}
          <section>
            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Contact and Dispute Resolution</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Getting Help</h3>
                  <p className="text-gray-300 mb-4">
                    For questions about these terms or platform issues:
                  </p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Check the community knowledge base</li>
                    <li>• Contact support through the platform</li>
                    <li>• Participate in community governance discussions</li>
                    <li>• Email: legal@nebula.gov</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Dispute Resolution</h3>
                  <p className="text-gray-300 mb-4">
                    Platform disputes will be resolved through:
                  </p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Community mediation processes</li>
                    <li>• Transparent governance voting</li>
                    <li>• Independent arbitration when needed</li>
                    <li>• Swiss jurisdiction for legal matters</li>
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