import React from 'react';
import { Rocket, Download, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="max-w-6xl mx-auto text-center">
        {/* Cosmic orb decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
          <div className="w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl animate-pulse-slow" />
        </div>
        
        {/* Hero content */}
        <div className="relative z-10">
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full glass-effect">
            <Rocket className="w-12 h-12 text-purple-400 animate-float" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="text-gradient">Nebula</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Where Innovation Meets the Cosmos
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of digital innovation through our revolutionary cosmic app. 
            Explore unlimited possibilities and connect with a universe of features designed to transform your workflow.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group nebula-gradient px-8 py-4 rounded-full font-semibold text-white hover-lift flex items-center gap-3 text-lg">
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Launch App
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="glass-effect px-8 py-4 rounded-full font-semibold text-white hover-lift border border-purple-500/30 hover:border-purple-400/50 transition-all">
              Explore Resources
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};