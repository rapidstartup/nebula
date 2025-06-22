import React from 'react';
import { ArrowLeft, PlayCircle, BookOpen, Video, Code2, Zap } from 'lucide-react';

export const Tutorials: React.FC = () => {
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
                Tutorials & Learning Resources
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Master the art of cosmic democracy through comprehensive tutorials
            </p>
            <div className="text-sm text-gray-400 mt-4">
              Coming Soon | Launching Q3 2025
            </div>
          </div>

          {/* Coming Soon Notice */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 p-4 mx-auto mb-6">
                <PlayCircle className="w-full h-full text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Learning Universe Under Construction</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We're crafting an extraordinary collection of tutorials, guides, and interactive learning experiences 
                to help you navigate the cosmos of decentralized governance.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-yellow-400">
                <Zap className="w-5 h-5" />
                <span className="font-medium">Launching Soon</span>
              </div>
            </div>
          </section>

          {/* Planned Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">What's Coming</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3 mb-4">
                  <BookOpen className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Getting Started Guides</h3>
                <p className="text-gray-300 text-sm">
                  Step-by-step tutorials for creating your identity, joining DAOs, and casting your first vote.
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-3 mb-4">
                  <Video className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Video Walkthroughs</h3>
                <p className="text-gray-300 text-sm">
                  Visual guides showing real governance processes, proposal creation, and community management.
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-3 mb-4">
                  <Code2 className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-green-400 mb-3">Developer Resources</h3>
                <p className="text-gray-300 text-sm">
                  Technical tutorials for integrating with Nebula's APIs and building on the platform.
                </p>
              </div>
            </div>
          </section>

          {/* Early Access */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Get Early Access</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Want to be among the first to access our comprehensive learning materials? 
                Join our community to get notified when tutorials launch.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://x.com/DaveShapi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition-colors text-center font-medium"
                >
                  Follow David Shapiro for Updates
                </a>
                <a 
                  href="https://x.com/LifeOnAutoSite" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl transition-colors text-center font-medium"
                >
                  Follow Nathan for Tech Insights
                </a>
              </div>
            </div>
          </section>

          {/* Current Resources */}
          <section>
            <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Available Now</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                While our comprehensive tutorials are in development, explore these resources:
              </p>
              
              <div className="space-y-4">
                <a 
                  href="https://rapidstartup.gitbook.io/nebula/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 border border-cyan-500/30 rounded-xl hover:border-cyan-400/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-cyan-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-400">API Documentation</h3>
                      <p className="text-gray-300 text-sm">Complete technical reference for developers</p>
                    </div>
                  </div>
                </a>
                
                <a 
                  href="/project-charter" 
                  className="block p-4 border border-cyan-500/30 rounded-xl hover:border-cyan-400/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-cyan-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-400">Project Documentation</h3>
                      <p className="text-gray-300 text-sm">Learn about Nebula's vision, principles, and governance</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};