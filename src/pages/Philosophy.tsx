import React from 'react';
import { ArrowLeft, Compass, Heart, Shield, Globe2, Users2, Zap } from 'lucide-react';

export const Philosophy: React.FC = () => {
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
                Philosophy & Guiding Principles
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              The ethical compass and foundational beliefs of the Nebula project
            </p>
            <div className="text-sm text-gray-400 mt-4">
              Version 1.5 | Last Updated: June 2025
            </div>
          </div>

          {/* Core Philosophy */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Compass className="w-8 h-8 text-purple-400 mr-3" />
                <h2 className="text-3xl font-bold">Core Philosophy</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Nebula exists to return democratic power to its rightful place: in the hands of the people. We believe that technology should serve humanity, not control it, and that true democracy requires tools that are transparent, inclusive, and impossible to corrupt or silence.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Every design decision, every line of code, and every partnership must pass through the lens of one fundamental question: <em className="text-purple-400">"Does this increase human agency and collective empowerment, or does it create new forms of control and dependency?"</em>
              </p>
            </div>
          </section>

          {/* Fundamental Principles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Fundamental Principles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* User Sovereignty */}
              <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <Shield className="w-8 h-8 text-blue-400 mr-3" />
                  <h3 className="text-2xl font-bold text-blue-400">User Sovereignty</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Every individual must have complete control over their digital identity, personal data, and participation in governance. No external entity—whether corporate, governmental, or otherwise—should be able to restrict, monitor, or manipulate a user's democratic agency.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>• Self-sovereign identity systems</div>
                  <div>• User-controlled data storage</div>
                  <div>• Revocable permissions</div>
                  <div>• Anonymous participation options</div>
                </div>
              </div>

              {/* Radical Decentralization */}
              <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <Globe2 className="w-8 h-8 text-purple-400 mr-3" />
                  <h3 className="text-2xl font-bold text-purple-400">Radical Decentralization</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Power must be distributed, not concentrated. Every architectural decision should push control away from central authorities and toward the edges—the communities and individuals who are directly affected by governance decisions.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>• No single points of failure</div>
                  <div>• Peer-to-peer architecture</div>
                  <div>• Community-governed protocols</div>
                  <div>• Mesh network capabilities</div>
                </div>
              </div>

              {/* Transparency & Auditability */}
              <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <Zap className="w-8 h-8 text-cyan-400 mr-3" />
                  <h3 className="text-2xl font-bold text-cyan-400">Transparency & Auditability</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Democracy requires trust, and trust requires transparency. All governance processes, fund movements, and algorithmic decisions must be publicly auditable while preserving individual privacy through cryptographic techniques.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>• Open-source codebase</div>
                  <div>• Public governance ledgers</div>
                  <div>• Algorithmic transparency</div>
                  <div>• Community auditing tools</div>
                </div>
              </div>

              {/* Inclusive Participation */}
              <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <Users2 className="w-8 h-8 text-green-400 mr-3" />
                  <h3 className="text-2xl font-bold text-green-400">Inclusive Participation</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Democracy is only legitimate when everyone has equal opportunity to participate. The platform must be accessible regardless of technical expertise, economic status, or geographic location, while maintaining security and preventing abuse.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>• Multi-language support</div>
                  <div>• Low-bandwidth operation</div>
                  <div>• Intuitive user interfaces</div>
                  <div>• Economic accessibility</div>
                </div>
              </div>
            </div>
          </section>

          {/* Ethical Framework */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Heart className="w-8 h-8 text-pink-400 mr-3" />
                <h2 className="text-3xl font-bold">Ethical Framework</h2>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-pink-400 pl-6">
                  <h3 className="text-xl font-semibold text-pink-400 mb-2">Political Neutrality</h3>
                  <p className="text-gray-300">
                    Nebula is a tool for democracy, not for any particular political agenda. The platform must remain neutral and serve all legitimate democratic perspectives equally, without bias or favoritism.
                  </p>
                </div>
                
                <div className="border-l-4 border-yellow-400 pl-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Harm Prevention</h3>
                  <p className="text-gray-300">
                    While maximizing freedom, we must also prevent the platform from being used to organize violence, harassment, or other forms of harm. This balance requires careful community governance and transparent moderation processes.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Privacy by Design</h3>
                  <p className="text-gray-300">
                    Privacy is not an afterthought but a fundamental architectural principle. Every feature must be designed to minimize data collection and maximize user control over personal information.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-400 pl-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-2">Long-term Thinking</h3>
                  <p className="text-gray-300">
                    All decisions must consider their impact not just on current users, but on future generations. We are building infrastructure for democracy that must remain resilient and beneficial for decades to come.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Decision Framework */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Decision Framework</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                When facing complex design decisions, the Nebula team will evaluate options through this hierarchical framework:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-2">Does it increase user sovereignty?</h3>
                    <p className="text-gray-300 text-sm">
                      The option that gives users more control over their data, identity, and participation is preferred.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Does it increase decentralization?</h3>
                    <p className="text-gray-300 text-sm">
                      The option that reduces dependencies on central authorities is preferred.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-400 mb-2">Does it increase accessibility?</h3>
                    <p className="text-gray-300 text-sm">
                      The option that makes democratic participation easier for more people is preferred.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">Does it increase transparency?</h3>
                    <p className="text-gray-300 text-sm">
                      The option that makes governance processes more auditable and understandable is preferred.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-pink-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">5</div>
                  <div>
                    <h3 className="text-lg font-semibold text-pink-400 mb-2">Does it minimize harm?</h3>
                    <p className="text-gray-300 text-sm">
                      The option that reduces potential for abuse or negative consequences is preferred.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Living Document */}
          <section>
            <div className="bg-black/30 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">A Living Document</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                These principles are not carved in stone. As we learn from real-world deployment and community feedback, this philosophy may evolve. However, any changes must themselves be subject to community governance and must strengthen, not weaken, the core commitment to user sovereignty and democratic empowerment.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                The Nebula community reserves the right to fork the project if these principles are ever compromised by the core development team or any other entity.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};