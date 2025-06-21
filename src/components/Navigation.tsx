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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-lg border-b border-purple-500/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-2 group-hover:scale-110 transition-transform">
              <Rocket className="w-full h-full text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Nebula
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all group-hover:w-full"></span>
              </button>
            ))}
            
            {/* Documentation Dropdown */}
            <div className="relative group">
              <button className="text-gray-300 hover:text-white transition-colors">
                Documentation
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all group-hover:w-full"></span>
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-lg border border-purple-500/20 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-black/90 backdrop-blur-lg border border-purple-500/20 rounded-xl p-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="border-t border-purple-500/20 pt-2 mt-2">
                <div className="text-gray-400 text-sm font-medium px-3 py-1 mb-1">Documentation</div>
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
      </div>
    </nav>
  );
};