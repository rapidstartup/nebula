import React from 'react';
import { Shield, Users, Vote, BookOpen, Coins, ArrowRight } from 'lucide-react';

export const FunctionalRequirements: React.FC = () => {
  const epics = [
    {
      icon: Shield,
      title: "Identity & Onboarding",
      color: "blue",
      description: "Secure, Sybil-resistant identity system with user-controlled data",
      features: [
        "Simple step-by-step onboarding process",
        "Self-sovereign digital identity creation", 
        "Privacy-preserving geographic verification",
        "Info Wallet for complete data control"
      ]
    },
    {
      icon: Users,
      title: "DAO Formation & Management", 
      color: "green",
      description: "Intuitive tools for creating and managing geographic communities",
      features: [
        "Create DAOs for neighborhoods in under 10 minutes",
        "Set governance rules and voting thresholds",
        "Browse and join local DAOs easily",
        "Community-driven membership management"
      ]
    },
    {
      icon: Vote,
      title: "Governance & Voting",
      color: "purple", 
      description: "Transparent, secure voting on community proposals and decisions",
      features: [
        "Create proposals with clear descriptions",
        "Secure, transparent voting mechanisms",
        "Real-time results and community consensus",
        "Alternative choice suggestions and approval"
      ]
    },
    {
      icon: BookOpen,
      title: "Transparency & Information",
      color: "orange",
      description: "Public ledgers and collaborative knowledge management",
      features: [
        "Public treasury ledgers showing all transactions",
        "Wiki-style community knowledge base",
        "Collaborative editing with community voting",
        "Historical record of all decisions and rationale"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "from-blue-500 to-cyan-500",
        border: "border-blue-500/20",
        text: "text-blue-400",
        dot: "bg-blue-400"
      },
      green: {
        bg: "from-green-500 to-emerald-500", 
        border: "border-green-500/20",
        text: "text-green-400",
        dot: "bg-green-400"
      },
      purple: {
        bg: "from-purple-500 to-pink-500",
        border: "border-purple-500/20", 
        text: "text-purple-400",
        dot: "bg-purple-400"
      },
      orange: {
        bg: "from-orange-500 to-red-500",
        border: "border-orange-500/20",
        text: "text-orange-400", 
        dot: "bg-orange-400"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Platform Architecture</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Four core pillars that make democratic participation simple, secure, and accessible 
            to every citizen in your community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {epics.map((epic, index) => {
            const Icon = epic.icon;
            const colors = getColorClasses(epic.color);
            
            return (
              <div
                key={epic.title}
                className={`glass-effect border ${colors.border} p-8 rounded-2xl hover-lift`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${colors.bg} p-4 mb-6`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                
                <h3 className={`text-2xl font-bold ${colors.text} mb-4`}>
                  {epic.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {epic.description}
                </p>
                
                <div className="space-y-3">
                  {epic.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className={`w-2 h-2 rounded-full ${colors.dot} mt-2 mr-3 flex-shrink-0`}></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Tokens Integration */}
        <div className="glass-effect p-8 rounded-2xl mb-16">
          <div className="flex items-center mb-6">
            <Coins className="w-8 h-8 text-yellow-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Economic Model Integration</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-4">Action Tokens Ensure Fairness</h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our economic model seamlessly integrates with all platform functions. Action Tokens prevent spam 
                and abuse while ensuring that economic status never determines your ability to participate in democracy.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-3"></div>
                  Core governance functions cost zero money
                </li>
                <li className="flex items-center text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-3"></div>
                  Action Tokens replenish automatically
                </li>
                <li className="flex items-center text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-3"></div>
                  Prevents market volatility from affecting democracy
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-4">Free Democratic Actions</h4>
              <div className="space-y-3">
                {[
                  "Join local DAO",
                  "Vote on proposals", 
                  "Create community proposals",
                  "Participate in discussions",
                  "Access public treasury info"
                ].map((action, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-yellow-900/10 border border-yellow-500/20 rounded-lg">
                    <span className="text-gray-300 text-sm">{action}</span>
                    <span className="text-yellow-400 text-xs font-medium">FREE</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Development Flow */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Development Approach</h3>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
            <div className="glass-effect px-6 py-4 rounded-xl border border-blue-500/30">
              <div className="text-blue-400 font-semibold">Epic 1: Identity</div>
              <div className="text-gray-300 text-sm">Foundation & Security</div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 lg:rotate-0" />
            <div className="glass-effect px-6 py-4 rounded-xl border border-green-500/30">
              <div className="text-green-400 font-semibold">Epic 2: DAOs</div>
              <div className="text-gray-300 text-sm">Community Formation</div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 lg:rotate-0" />
            <div className="glass-effect px-6 py-4 rounded-xl border border-purple-500/30">
              <div className="text-purple-400 font-semibold">Epic 3: Voting</div>
              <div className="text-gray-300 text-sm">Democratic Process</div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 lg:rotate-0" />
            <div className="glass-effect px-6 py-4 rounded-xl border border-orange-500/30">
              <div className="text-orange-400 font-semibold">Epic 4: Transparency</div>
              <div className="text-gray-300 text-sm">Knowledge & Trust</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};