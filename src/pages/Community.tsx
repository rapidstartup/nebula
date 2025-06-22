import React from 'react';
import { ArrowLeft, Users, MessageCircle, Calendar, Globe, Zap } from 'lucide-react';

export const Community: React.FC = () => {
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
                Community Hub
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Join the cosmic democracy movement and connect with fellow citizens
            </p>
            <div className="text-sm text-gray-400 mt-4">
              Coming Soon | Launching Q3 2025
            </div>
          </div>

          {/* Coming Soon Notice */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-4 mx-auto mb-6">
                <Users className="w-full h-full text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Building Our Cosmic Community</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We're creating dedicated spaces for community discussions, collaboration, and collective growth. 
                Soon you'll be able to connect with fellow citizens, share ideas, and shape the future of democratic governance together.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-400">
                <Zap className="w-5 h-5" />
                <span className="font-medium">Platform Launching Soon</span>
              </div>
            </div>
          </section>

          {/* Planned Community Features */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">What's Coming</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-3 mb-4">
                  <MessageCircle className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Discord Community</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Real-time chat with fellow community members, organized channels for different topics, and direct access to the development team.
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• General discussion channels</li>
                  <li>• Technical development updates</li>
                  <li>• Regional community groups</li>
                  <li>• Governance discussions</li>
                </ul>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3 mb-4">
                  <Calendar className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Community Events</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Regular virtual meetups, AMAs with the team, demo sessions, and educational workshops about decentralized governance.
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• Monthly community calls</li>
                  <li>• Developer workshops</li>
                  <li>• Governance training sessions</li>
                  <li>• Regional meetups</li>
                </ul>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-3 mb-4">
                  <Globe className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-green-400 mb-3">Regional Networks</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Connect with community members in your geographic region, participate in local pilot programs, and organize real-world meetups.
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• Swiss pilot community</li>
                  <li>• North American groups</li>
                  <li>• European networks</li>
                  <li>• Global expansion regions</li>
                </ul>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-3 mb-4">
                  <Users className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-orange-400 mb-3">Contributor Network</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Join a network of contributors including developers, designers, researchers, and community organizers helping build Nebula.
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• Open source contributors</li>
                  <li>• Community moderators</li>
                  <li>• Research collaborators</li>
                  <li>• Content creators</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Early Access */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Join the Movement Early</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Want to be among the first to join our community platform? Follow our social media for announcements 
                and early access opportunities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://x.com/DaveShapi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition-colors text-center font-medium"
                >
                  Follow for Community Updates
                </a>
                <a 
                  href="https://x.com/LifeOnAutoSite" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl transition-colors text-center font-medium"
                >
                  Follow for Technical Updates
                </a>
              </div>
            </div>
          </section>

          {/* Current Connections */}
          <section>
            <div className="bg-black/30 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Connect With Us Now</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                While our dedicated community platform is under development, you can connect with us through:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href="https://x.com/DaveShapi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-pink-500/30 rounded-xl hover:border-pink-400/50 transition-colors"
                >
                  <MessageCircle className="w-6 h-6 text-pink-400" />
                  <div>
                    <h3 className="font-semibold text-pink-400">David Shapiro on X</h3>
                    <p className="text-gray-300 text-sm">Project vision and community insights</p>
                  </div>
                </a>
                
                <a 
                  href="https://x.com/LifeOnAutoSite" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-pink-500/30 rounded-xl hover:border-pink-400/50 transition-colors"
                >
                  <MessageCircle className="w-6 h-6 text-pink-400" />
                  <div>
                    <h3 className="font-semibold text-pink-400">Nathan Shearer on X</h3>
                    <p className="text-gray-300 text-sm">Technical development and progress</p>
                  </div>
                </a>
                
                <a 
                  href="mailto:contact@nebula.foundation"
                  className="flex items-center gap-3 p-4 border border-pink-500/30 rounded-xl hover:border-pink-400/50 transition-colors"
                >
                  <MessageCircle className="w-6 h-6 text-pink-400" />
                  <div>
                    <h3 className="font-semibold text-pink-400">Email Contact</h3>
                    <p className="text-gray-300 text-sm">Direct communication with the team</p>
                  </div>
                </a>
                
                <a 
                  href="/contributing" 
                  className="flex items-center gap-3 p-4 border border-pink-500/30 rounded-xl hover:border-pink-400/50 transition-colors"
                >
                  <Users className="w-6 h-6 text-pink-400" />
                  <div>
                    <h3 className="font-semibold text-pink-400">Contribute to Nebula</h3>
                    <p className="text-gray-300 text-sm">Join the development community</p>
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