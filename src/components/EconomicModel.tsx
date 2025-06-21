import React from 'react';
import { Coins, Shield, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react';

export const EconomicModel: React.FC = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Economic Model</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Democracy should be free. Our innovative Action Token system ensures that core governance 
            functions never cost money, while maintaining platform sustainability.
          </p>
        </div>

        {/* Core Principle */}
        <div className="glass-effect p-8 rounded-2xl mb-16 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-6 flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Core Democratic Functions Are Always Free</h3>
          <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Voting, creating proposals, and joining local DAOs will never cost money. 
            We use a self-replenishing Action Token system to prevent financial barriers to democratic participation.
          </p>
        </div>

        {/* Action Tokens Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="glass-effect p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <Coins className="w-8 h-8 text-yellow-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">Action Tokens</h3>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-yellow-400 pl-6">
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">What They Are</h4>
                <p className="text-gray-300">
                  Non-transferable credits that automatically replenish over time. Think of them as 
                  "democratic energy" that powers your participation without any financial cost.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-400 pl-6">
                <h4 className="text-lg font-semibold text-blue-400 mb-2">How They Work</h4>
                <p className="text-gray-300">
                  Each verified citizen receives a daily allocation of Action Tokens. Use them for voting, 
                  proposals, and community activities. They replenish automatically each day.
                </p>
              </div>
              
              <div className="border-l-4 border-green-400 pl-6">
                <h4 className="text-lg font-semibold text-green-400 mb-2">Why This Matters</h4>
                <p className="text-gray-300">
                  Prevents spam and abuse while ensuring that economic status never determines 
                  your ability to participate in democracy.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-effect p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <Zap className="w-8 h-8 text-purple-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">What's Always Free</h3>
            </div>
            
            <div className="space-y-4">
              {[
                "Joining your local DAO",
                "Voting on proposals", 
                "Creating community proposals",
                "Participating in discussions",
                "Accessing public information",
                "Basic identity verification"
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-xl">
              <p className="text-green-400 text-sm font-medium">
                💡 These core democratic functions will always remain free, regardless of market conditions or platform growth.
              </p>
            </div>
          </div>
        </div>

        {/* Paid Services */}
        <div className="glass-effect p-8 rounded-2xl mb-16">
          <div className="flex items-center mb-8">
            <Users className="w-8 h-8 text-orange-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Optional Paid Services</h3>
          </div>
          
          <p className="text-gray-300 mb-8">
            While core governance is free, we offer premium services that help sustain the platform 
            and provide enhanced functionality for power users and organizations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-orange-500/20 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-orange-400 mb-3">Advanced Analytics</h4>
              <p className="text-gray-300 text-sm mb-4">
                Detailed insights into voting patterns, proposal success rates, and community engagement metrics.
              </p>
              <div className="text-orange-400 font-medium">For DAO administrators</div>
            </div>
            
            <div className="border border-blue-500/20 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-blue-400 mb-3">Custom Integrations</h4>
              <p className="text-gray-300 text-sm mb-4">
                API access and custom integrations with existing government or organizational systems.
              </p>
              <div className="text-blue-400 font-medium">For institutions</div>
            </div>
            
            <div className="border border-purple-500/20 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-purple-400 mb-3">Premium Support</h4>
              <p className="text-gray-300 text-sm mb-4">
                Priority support, training sessions, and dedicated account management for large DAOs.
              </p>
              <div className="text-purple-400 font-medium">For large communities</div>
            </div>
          </div>
        </div>

        {/* Sustainability */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Sustainable & Democratic</h3>
          <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
            Our economic model ensures long-term sustainability while keeping democracy accessible to everyone. 
            Revenue from optional services funds free access for all citizens.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="glass-effect px-6 py-3 rounded-full border border-green-500/30">
              <span className="text-green-400 font-medium">✓ Always Free Core Functions</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 sm:rotate-0" />
            <div className="glass-effect px-6 py-3 rounded-full border border-blue-500/30">
              <span className="text-blue-400 font-medium">✓ Sustainable Through Optional Services</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};