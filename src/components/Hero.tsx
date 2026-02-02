import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ArrowRight, Smartphone } from 'lucide-react';
import { QRCodeModal } from './QRCodeModal';

export const Hero: React.FC = () => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleMobileAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsQRModalOpen(true);
  };

  return (
    <>
      <section 
        id="home" 
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative pt-16 sm:pt-20"
        style={{
          backgroundImage: `url('/background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Cosmic orb decoration */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
            <div className="w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl animate-pulse-slow" />
          </div>
          
          {/* Hero content */}
          <div className="mb-6 sm:mb-8 inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 rounded-full glass-effect">
            <Rocket className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400 animate-float" />
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-gradient">Nebula</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-3 sm:mb-4 max-w-2xl mx-auto px-4">
            Where Innovation Meets the Cosmos
          </p>
          
          <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Experience the future of digital democracy through our revolutionary cosmic platform. 
            Explore unlimited possibilities and connect with a universe of governance tools designed to empower communities.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
            {/* Primary CTA - Web App Dashboard */}
            <Link 
              to="/v2"
              className="w-full sm:w-auto group nebula-gradient px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-white hover-lift flex items-center justify-center gap-3 text-base sm:text-lg transition-all duration-300 hover:scale-105 min-w-[200px]"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {/* Secondary CTA - Mobile App Download */}
            <button 
              onClick={handleMobileAppClick}
              className="w-full sm:w-auto glass-effect px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-white hover-lift border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 min-w-[200px] flex items-center justify-center gap-2"
            >
              <Smartphone className="w-5 h-5" />
              Mobile App
            </button>
          </div>
        </div>
      </section>

      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)} 
      />
    </>
  );
};