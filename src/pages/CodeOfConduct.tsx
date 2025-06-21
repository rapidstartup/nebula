import React from 'react';
import { ArrowLeft, Heart, Users, MessageCircle, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export const CodeOfConduct: React.FC = () => {
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
                Ethics & Code of Conduct
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Creating a safe and productive space for democratic participation
            </p>
            <div className="text-sm text-gray-400 mt-4">
              Version 1.5 | Effective Date: June 2025 | Last Updated: June 2025
            </div>
          </div>

          {/* Our Commitment */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Heart className="w-8 h-8 text-purple-400 mr-3" />
                <h2 className="text-3xl font-bold">Our Commitment</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Nebula is built on the belief that healthy democracy requires respectful dialogue, good-faith participation, and inclusive communities. This Code of Conduct establishes the social contract for our ecosystem, ensuring that all participants can engage safely and productively in democratic processes.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We are committed to creating an environment where diverse perspectives are welcomed, constructive disagreement is encouraged, and everyone can participate without fear of harassment, discrimination, or abuse.
              </p>
            </div>
          </section>

          {/* Core Values */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-400 mr-3" />
                  <h3 className="text-xl font-semibold text-blue-400">Respectful Dialogue</h3>
                </div>
                <p className="text-gray-300">
                  We engage with others respectfully, even when we disagree. Personal attacks, insults, and inflammatory language have no place in democratic discourse.
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-green-400 mr-3" />
                  <h3 className="text-xl font-semibold text-green-400">Inclusive Participation</h3>
                </div>
                <p className="text-gray-300">
                  We welcome diverse perspectives and experiences. Everyone deserves equal opportunity to participate regardless of background, identity, or experience level.
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-3" />
                  <h3 className="text-xl font-semibold text-yellow-400">Good Faith Participation</h3>
                </div>
                <p className="text-gray-300">
                  We participate honestly and constructively, seeking genuine solutions and compromise rather than obstruction or manipulation.
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-pink-400 mr-3" />
                  <h3 className="text-xl font-semibold text-pink-400">Community Safety</h3>
                </div>
                <p className="text-gray-300">
                  We protect our community from harm, abuse, and exploitation. Safety and security are prerequisites for meaningful democratic participation.
                </p>
              </div>
            </div>
          </section>

          {/* Expected Behavior */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Expected Behavior</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-4">In Governance Discussions</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong>Listen actively:</strong> Consider others' viewpoints before responding</li>
                    <li>• <strong>Argue ideas, not people:</strong> Focus on proposals and policies, not personal characteristics</li>
                    <li>• <strong>Provide evidence:</strong> Support claims with facts, data, or credible sources</li>
                    <li>• <strong>Acknowledge uncertainty:</strong> It's okay to say "I don't know" or change your mind</li>
                    <li>• <strong>Seek compromise:</strong> Look for win-win solutions that address multiple concerns</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-4">In Community Interactions</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong>Welcome newcomers:</strong> Help new members understand processes and norms</li>
                    <li>• <strong>Share knowledge:</strong> Contribute to the community knowledge base</li>
                    <li>• <strong>Report problems:</strong> Help maintain community standards by reporting violations</li>
                    <li>• <strong>Practice empathy:</strong> Remember there are real people behind every account</li>
                    <li>• <strong>Assume good intentions:</strong> Give others the benefit of the doubt</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-4">In Platform Use</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong>Use real identity:</strong> Maintain only one verified account</li>
                    <li>• <strong>Respect privacy:</strong> Don't share others' personal information without consent</li>
                    <li>• <strong>Follow the law:</strong> Comply with applicable laws in your jurisdiction</li>
                    <li>• <strong>Report security issues:</strong> Responsibly disclose vulnerabilities</li>
                    <li>• <strong>Respect resources:</strong> Don't spam or abuse platform features</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Prohibited Behavior */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400 mr-3" />
                <h2 className="text-3xl font-bold">Prohibited Behavior</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Harassment & Discrimination</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Personal attacks or insults</li>
                    <li>• Discriminatory language or behavior</li>
                    <li>• Stalking or unwanted contact</li>
                    <li>• Doxxing or sharing private information</li>
                    <li>• Threats or intimidation</li>
                    <li>• Sexual harassment or unwanted advances</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Platform Abuse</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Creating multiple accounts (Sybil attacks)</li>
                    <li>• Coordinated manipulation campaigns</li>
                    <li>• Spam or automated posting</li>
                    <li>• Fraudulent proposals or voting</li>
                    <li>• Exploiting technical vulnerabilities</li>
                    <li>• Vote buying or selling</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Harmful Content</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Incitement to violence or illegal activity</li>
                    <li>• Hate speech targeting groups</li>
                    <li>• Misinformation designed to manipulate</li>
                    <li>• Content promoting self-harm</li>
                    <li>• Extremist recruitment or organizing</li>
                    <li>• Scams or financial fraud</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Bad Faith Participation</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Trolling or deliberately inflammatory posts</li>
                    <li>• Obstruction without constructive alternatives</li>
                    <li>• Impersonating others or organizations</li>
                    <li>• Misrepresenting proposals or outcomes</li>
                    <li>• Coordinated brigading or vote manipulation</li>
                    <li>• Spreading conspiracy theories as fact</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Enforcement & Moderation */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Enforcement & Moderation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-400 mb-4">Community-Led Moderation</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Moderation on Nebula is primarily community-driven, reflecting our commitment to decentralized governance. Each DAO can establish its own additional community standards and moderation processes.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Community members can report violations</li>
                    <li>• Trusted community moderators review reports</li>
                    <li>• Moderation decisions are transparent and appealable</li>
                    <li>• Serious violations may trigger platform-wide review</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-indigo-400 mb-4">Graduated Responses</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We believe in proportional responses that prioritize education and rehabilitation over punishment:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-yellow-400 mb-2">Minor Violations</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Warning and education</li>
                        <li>• Comment removal</li>
                        <li>• Temporary restrictions</li>
                      </ul>
                    </div>
                    
                    <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-orange-400 mb-2">Moderate Violations</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Temporary suspension</li>
                        <li>• Required re-training</li>
                        <li>• Participation restrictions</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-red-400 mb-2">Severe Violations</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Account suspension</li>
                        <li>• Community vote on removal</li>
                        <li>• Law enforcement referral</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-indigo-400 mb-4">Appeals Process</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    All moderation decisions can be appealed through a transparent, community-governed process:
                  </p>
                  <ol className="space-y-2 text-gray-300">
                    <li>1. <strong>Initial Appeal:</strong> Appeal to the moderation team with additional context</li>
                    <li>2. <strong>Community Review:</strong> Request review by neutral community members</li>
                    <li>3. <strong>DAO Governance:</strong> Escalate to broader community vote if needed</li>
                    <li>4. <strong>Platform Governance:</strong> Final appeal to platform-wide governance body</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Reporting Violations */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Reporting Violations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">How to Report</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Use the "Report" button on any content</li>
                    <li>• Contact DAO moderators directly</li>
                    <li>• Email: conduct@nebula.gov</li>
                    <li>• Anonymous reporting through platform tools</li>
                    <li>• Emergency: Contact local authorities for immediate threats</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">What to Include</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Specific examples of the violation</li>
                    <li>• Links to relevant content or interactions</li>
                    <li>• How it affected you or the community</li>
                    <li>• Any relevant context or history</li>
                    <li>• Preferred resolution if appropriate</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-xl">
                <p className="text-sm text-gray-300">
                  <strong>Protection for Reporters:</strong> We take retaliation against those who report violations seriously. Retaliatory behavior is itself a violation of this Code of Conduct and will be addressed accordingly.
                </p>
              </div>
            </div>
          </section>

          {/* Continuous Improvement */}
          <section>
            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Continuous Improvement</h2>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                This Code of Conduct is a living document that will evolve with our community. We regularly review and update these standards based on:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Community feedback and suggestions</li>
                    <li>• Analysis of reported incidents</li>
                    <li>• Changes in technology and platform features</li>
                    <li>• Best practices from other democratic communities</li>
                  </ul>
                </div>
                
                <div>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Academic research on online governance</li>
                    <li>• Legal developments in digital rights</li>
                    <li>• Emerging forms of online harm or abuse</li>
                    <li>• Success stories from community moderation</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed mt-6">
                Major changes to this Code of Conduct will be subject to community governance processes, ensuring that the standards we hold ourselves to reflect the values and needs of our democratic community.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};