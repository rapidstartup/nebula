import React from 'react';
import { Rocket, Github, Twitter, MessageCircle, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-6 border-t border-purple-900/30 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full nebula-gradient p-2">
                <Rocket className="w-full h-full text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">Nebula</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Pioneering the future of digital innovation through cosmic-inspired technology. 
              Join us on this interstellar journey of discovery and creation.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover-lift">
                <Github className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover-lift">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover-lift">
                <MessageCircle className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover-lift">
                <Mail className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Examples</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="pt-8 border-t border-purple-900/30 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2025 Nebula. Shaping the cosmic future of technology.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};