import React from 'react';
import { ArrowLeft, Target, Users, Globe, Shield } from 'lucide-react';

export const ProjectCharter: React.FC = () => {
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
                Project Charter
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              The North Star document for the Nebula project
            </p>
            <div className="text-sm text-gray-400 mt-4">
              Version 1.5 | Last Updated: June 2025
            </div>
          </div>

          {/* Mission Statement */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-purple-400 mr-3" />
                <h2 className="text-3xl font-bold">Mission Statement</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                To create an unstoppable, decentralized platform that empowers citizens to exercise direct democratic power within their communities through secure, transparent, and inclusive governance tools. Nebula exists to bridge the gap between individual agency and collective action, enabling spontaneous community organization and decision-making that is resistant to censorship and centralized control.
              </p>
            </div>
          </section>

          {/* Vision */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Globe className="w-8 h-8 text-blue-400 mr-3" />
                <h2 className="text-3xl font-bold">Vision</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                A world where democracy is truly participatory, where every citizen has the tools to directly shape their community's future, and where the power to govern flows from the people up, not from institutions down.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We envision communities that can spontaneously organize, allocate resources transparently, and make binding decisions collectively - all while maintaining the highest standards of security, privacy, and resistance to corruption.
              </p>
            </div>
          </section>

          {/* Core Objectives */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Core Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-purple-400 mb-4">Empower Direct Governance</h3>
                <p className="text-gray-300">
                  Enable 10,000+ monthly active users in pilot regions to participate in direct democratic processes within 12 months of launch.
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Facilitate Spontaneous Organization</h3>
                <p className="text-gray-300">
                  Allow any citizen to create a geo-fenced DAO and initiate governance processes in under 10 minutes.
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-pink-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-pink-400 mb-4">Ensure Platform Resilience</h3>
                <p className="text-gray-300">
                  Achieve 99.95% uptime and demonstrate architectural resistance to censorship or takedown attempts.
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Foster Transparent Consensus</h3>
                <p className="text-gray-300">
                  Achieve 50%+ monthly participation rate in polling and proposal voting among active community members.
                </p>
              </div>
            </div>
          </section>

          {/* Key Stakeholders */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-green-400 mr-3" />
                <h2 className="text-3xl font-bold">Key Stakeholders</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-3">Primary Stakeholders</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Citizens in pilot regions (Switzerland, Austin)</li>
                    <li>• Community organizers and civic leaders</li>
                    <li>• Local government partners</li>
                    <li>• Core development team</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-3">Supporting Stakeholders</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Open-source developer community</li>
                    <li>• Academic researchers</li>
                    <li>• Blockchain infrastructure providers</li>
                    <li>• Legal and compliance advisors</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Success Criteria */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Success Criteria</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-400 pl-6">
                  <h3 className="text-lg font-semibold text-yellow-400">Technical Success</h3>
                  <p className="text-gray-300">Platform achieves target performance, security, and resilience metrics</p>
                </div>
                <div className="border-l-4 border-purple-400 pl-6">
                  <h3 className="text-lg font-semibold text-purple-400">Adoption Success</h3>
                  <p className="text-gray-300">Sustained user growth and engagement in pilot communities</p>
                </div>
                <div className="border-l-4 border-blue-400 pl-6">
                  <h3 className="text-lg font-semibold text-blue-400">Impact Success</h3>
                  <p className="text-gray-300">Measurable improvement in civic participation and community decision-making</p>
                </div>
                <div className="border-l-4 border-green-400 pl-6">
                  <h3 className="text-lg font-semibold text-green-400">Sustainability Success</h3>
                  <p className="text-gray-300">Self-sustaining economic model and expansion readiness</p>
                </div>
              </div>
            </div>
          </section>

          {/* Project Scope */}
          <section>
            <div className="bg-black/30 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-indigo-400 mr-3" />
                <h2 className="text-3xl font-bold">Project Scope & Boundaries</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-4">In Scope</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Self-sovereign identity system</li>
                    <li>• Geographic DAO creation and management</li>
                    <li>• Secure voting and proposal systems</li>
                    <li>• Treasury transparency tools</li>
                    <li>• Wiki-style knowledge base</li>
                    <li>• Swiss pilot program implementation</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Out of Scope</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Full cryptocurrency exchange functionality</li>
                    <li>• Non-geographic DAOs (V1.0)</li>
                    <li>• Custom smart contract creation tools</li>
                    <li>• Social media platform features</li>
                    <li>• Traditional banking services</li>
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