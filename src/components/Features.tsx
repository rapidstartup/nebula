import React from 'react';
import { Zap, Infinity, Layers, Shield, Globe, Cpu } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Stellar Performance',
    description: 'Experience lightning-fast performance that reaches across the cosmos.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Infinity,
    title: 'Infinite Scalability',
    description: 'Scale your applications to the far reaches of the digital universe.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Layers,
    title: 'Cosmic Integration',
    description: 'Seamlessly integrate with any system across the technological galaxy.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Quantum Security',
    description: 'Advanced security protocols that protect your data across dimensions.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Globe,
    title: 'Universal Access',
    description: 'Access your cosmic workspace from anywhere in the universe.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Cpu,
    title: 'AI-Powered',
    description: 'Harness the power of artificial intelligence for cosmic insights.',
    color: 'from-pink-500 to-red-500',
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Cosmic Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the powerful features that make Nebula the ultimate platform 
            for cosmic innovation and digital transformation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass-effect p-8 rounded-2xl hover-lift group text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${feature.color} p-5 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <button className="nebula-gradient px-10 py-4 rounded-full font-semibold text-white hover-lift text-lg">
            Experience All Features
          </button>
        </div>
      </div>
    </section>
  );
};