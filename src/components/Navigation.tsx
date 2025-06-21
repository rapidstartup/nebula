import React, { useState, useEffect } from 'react';
import { Rocket, Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navigateToPage = (path: string) => {
    window.location.href = path;
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', action: () => scrollToSection('home') },
    { label: 'Pilot Program', action: () => scrollToSection('pilot-program') },
    { label: 'User Personas', action: () => scrollToSection('user-personas') },
    { label: 'Resources', action: () => scrollToSection('resources') },
    { label: 'Features', action: () => scrollToSection('features') }
  ];

  const documentationItems = [
    { label: 'Project Charter', path: '/project-charter' },
    { label: 'Proof of Personhood', path: '/proof-of-personhood' },
    { label: 'Philosophy', path: '/philosophy' },
    { label: 'Terms of Service', path: '/terms-of-service' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Code of Conduct', path: '/code-of-conduct' }
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-lg border-b border-purple-500/20' 
          : 'bg-black/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 sm:gap-3 group z-50"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1.5 sm:p-2 group-hover:scale-110 transition-transform">
                <Rocket className="w-full h-full text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Nebula
              </span>
            </button>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden xl:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-gray-300 hover:text-white transition-colors relative group text-sm font-medium"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all group-hover:w-full"></span>
                </button>
              ))}
              
              {/* Documentation Dropdown */}
              <div className="relative group">
                <button className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                  Documentation
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all group-hover:w-full"></span>
                </button>
                
                <div className="absolute top-full right-0 mt-2 w-48 bg-black/95 backdrop-blur-lg border border-purple-500/20 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl">
                  <div className="p-2">
                    {documentationItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => navigateToPage(item.path)}
                        className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors text-sm"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button - Show on tablet and mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-50"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
            onClick={() => setIsMenuOpen(false)}
          />
          
          <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-black/95 backdrop-blur-lg border-l border-purple-500/20 transform transition-transform duration-300">
            <div className="pt-20 p-6">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-xl transition-colors font-medium"
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="border-t border-purple-500/20 pt-4 mt-4">
                  <div className="text-gray-400 text-sm font-semibold px-4 py-2 mb-2">Documentation</div>
                  {documentationItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => navigateToPage(item.path)}
                      className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-xl transition-colors text-sm"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};