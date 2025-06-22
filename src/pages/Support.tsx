import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, MessageCircle, Mail, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';

export const Support: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Nebula and how does it work?",
      answer: "Nebula is a decentralized platform for democratic governance that enables communities to organize through geographic DAOs, vote on proposals, and manage resources transparently. It combines self-sovereign identity with blockchain technology to create unstoppable democratic tools."
    },
    {
      question: "How do I get started with Nebula?",
      answer: "You can start by visiting our demo mobile app or following our social media for updates on the pilot program launch. Full onboarding will include identity verification and joining your local geographic DAO."
    },
    {
      question: "Is Nebula free to use?",
      answer: "Core democratic functions like voting, creating proposals, and joining local DAOs are always free through our Action Token system. Some premium features for organizations may have costs, but individual civic participation never will."
    },
    {
      question: "How does Nebula ensure security and privacy?",
      answer: "Nebula uses advanced cryptographic techniques including zero-knowledge proofs, end-to-end encryption, and self-sovereign identity systems. You control your data through the Info Wallet, and all governance processes are transparent yet privacy-preserving."
    },
    {
      question: "When will the full platform be available?",
      answer: "We're currently developing the Swiss pilot program for Q2-Q3 2025. The mobile demo is available now, and we're building toward a full platform launch in pilot regions first, then expanding globally."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
                Support & Help Center
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Get help, find answers, and connect with the Nebula community
            </p>
          </div>

          {/* Contact Options */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <MessageCircle className="w-8 h-8 text-blue-400 mr-3" />
                <h2 className="text-3xl font-bold">Get In Touch</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Connect on Social Media</h3>
                  <p className="text-gray-300 mb-4">
                    For quick questions, updates, and community discussions, follow our team:
                  </p>
                  <div className="space-y-3">
                    <a 
                      href="https://x.com/DaveShapi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="font-medium">David Shapiro</div>
                        <div className="text-sm text-gray-400">Project Vision & Strategy</div>
                      </div>
                    </a>
                    <a 
                      href="https://x.com/LifeOnAutoSite" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="font-medium">Nathan Shearer</div>
                        <div className="text-sm text-gray-400">Technical Development</div>
                      </div>
                    </a>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">Email Support</h3>
                  <p className="text-gray-300 mb-4">
                    For detailed inquiries, technical issues, or business matters:
                  </p>
                  <a 
                    href="mailto:contact@nebula.foundation"
                    className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="font-medium">contact@nebula.foundation</div>
                      <div className="text-sm text-gray-400">General inquiries & support</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <HelpCircle className="w-8 h-8 text-green-400 mr-3" />
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-green-500/20 rounded-xl">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-green-900/10 transition-colors"
                    >
                      <span className="font-medium text-green-400">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronDown className="w-5 h-5 text-green-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-green-400" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Help Articles Coming Soon */}
          <section>
            <div className="bg-black/30 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Help Articles Coming Soon</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We're preparing comprehensive help articles, troubleshooting guides, and detailed documentation 
                to support your journey with Nebula.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-yellow-400">
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium">In Development</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};