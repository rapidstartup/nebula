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
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                <Rocket className="w-full h-full text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Nebula</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Pioneering the future of digital democracy through cosmic-inspired technology. 
              Join us on this interstellar journey of discovery and empowerment.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-purple-500/20 flex items-center justify-center hover:border-purple-400/50 transition-all">
                <Github className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-purple-500/20 flex items-center justify-center hover:border-purple-400/50 transition-all">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-purple-500/20 flex items-center justify-center hover:border-purple-400/50 transition-all">
                <MessageCircle className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-purple-500/20 flex items-center justify-center hover:border-purple-400/50 transition-all">
                <Mail className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Examples</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">API Reference</a></li>
            </ul>
          </div>
          
          {/* Legal & Governance */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal & Governance</h3>
            <ul className="space-y-2">
              <li><a href="/project-charter" className="text-gray-400 hover:text-purple-400 transition-colors">Project Charter</a></li>
              <li><a href="/proof-of-personhood" className="text-gray-400 hover:text-purple-400 transition-colors">Proof of Personhood</a></li>
              <li><a href="/philosophy" className="text-gray-400 hover:text-purple-400 transition-colors">Philosophy & Principles</a></li>
              <li><a href="/terms-of-service" className="text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li><a href="/privacy-policy" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/code-of-conduct" className="text-gray-400 hover:text-purple-400 transition-colors">Code of Conduct</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="pt-8 border-t border-purple-900/30 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2025 Nebula. Shaping the cosmic future of democracy.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="/terms-of-service" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Terms
            </a>
            <a href="/privacy-policy" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Privacy
            </a>
            <a href="/code-of-conduct" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Conduct
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