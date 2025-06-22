import React from 'react';
import { ArrowLeft, Bug, Lightbulb, AlertTriangle, Github, Zap } from 'lucide-react';

export const IssueTemplates: React.FC = () => {
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
                Issue Templates & Bug Reports
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Help us improve Nebula by reporting bugs and suggesting enhancements
            </p>
            <div className="text-sm text-gray-400 mt-4">
              Coming Soon | Launching Q3 2025
            </div>
          </div>

          {/* Coming Soon Notice */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-pink-500 p-4 mx-auto mb-6">
                <Bug className="w-full h-full text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Issue Tracking System in Development</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We're building a comprehensive issue tracking system with structured templates for bug reports, 
                feature requests, and security vulnerabilities. This will help us prioritize development and 
                ensure nothing falls through the cracks.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-400/30 rounded-full text-red-400">
                <Zap className="w-5 h-5" />
                <span className="font-medium">Templates Under Construction</span>
              </div>
            </div>
          </section>

          {/* Planned Templates */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Issue Templates Coming Soon</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 p-3 mb-4">
                  <Bug className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-red-400 mb-3">Bug Report Template</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Structured template for reporting software bugs, UI issues, and unexpected behavior.
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• Steps to reproduce</li>
                  <li>• Expected vs actual behavior</li>
                  <li>• Environment details</li>
                  <li>• Screenshots/videos</li>
                  <li>• Severity assessment</li>
                </ul>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3 mb-4">
                  <Lightbulb className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Feature Request Template</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Template for suggesting new features, enhancements, and improvements.
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• Problem description</li>
                  <li>• Proposed solution</li>
                  <li>• Use cases and benefits</li>
                  <li>• Implementation ideas</li>
                  <li>• Priority assessment</li>
                </ul>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 p-3 mb-4">
                  <AlertTriangle className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Security Issue Template</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Confidential template for reporting security vulnerabilities and privacy concerns.
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• Vulnerability description</li>
                  <li>• Affected components</li>
                  <li>• Potential impact</li>
                  <li>• Suggested mitigation</li>
                  <li>• Responsible disclosure</li>
                </ul>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-3 mb-4">
                  <Github className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-green-400 mb-3">Documentation Issue</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Template for reporting missing, unclear, or incorrect documentation.
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• Documentation location</li>
                  <li>• Issue description</li>
                  <li>• Suggested improvements</li>
                  <li>• User impact</li>
                  <li>• Priority level</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Current Reporting */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Report Issues Now</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                While our structured issue templates are in development, you can still report bugs, 
                suggest features, or raise concerns through these channels:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href="https://github.com/nebula-gov" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-purple-500/30 rounded-xl hover:border-purple-400/50 transition-colors"
                >
                  <Github className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-purple-400">GitHub Issues</h3>
                    <p className="text-gray-300 text-sm">Create issues directly in our repository</p>
                  </div>
                </a>
                
                <a 
                  href="mailto:bugs@nebula.foundation?subject=Bug%20Report"
                  className="flex items-center gap-3 p-4 border border-purple-500/30 rounded-xl hover:border-purple-400/50 transition-colors"
                >
                  <Bug className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-purple-400">Email Bug Reports</h3>
                    <p className="text-gray-300 text-sm">Send detailed bug reports directly</p>
                  </div>
                </a>
                
                <a 
                  href="mailto:security@nebula.foundation?subject=Security%20Issue"
                  className="flex items-center gap-3 p-4 border border-purple-500/30 rounded-xl hover:border-purple-400/50 transition-colors"
                >
                  <AlertTriangle className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-purple-400">Security Issues</h3>
                    <p className="text-gray-300 text-sm">Confidential security vulnerability reports</p>
                  </div>
                </a>
                
                <a 
                  href="https://x.com/DaveShapi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-purple-500/30 rounded-xl hover:border-purple-400/50 transition-colors"
                >
                  <Lightbulb className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-purple-400">Feature Suggestions</h3>
                    <p className="text-gray-300 text-sm">Share ideas on social media</p>
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Reporting Best Practices</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                When reporting issues, please follow these guidelines to help us address them effectively:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-cyan-400 pl-6">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Be Specific</h3>
                  <p className="text-gray-300">
                    Provide detailed information about the issue, including steps to reproduce, 
                    expected behavior, and actual results.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Include Context</h3>
                  <p className="text-gray-300">
                    Share your browser, device, operating system, and any relevant environment details 
                    that might help us understand the issue.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-6">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Search First</h3>
                  <p className="text-gray-300">
                    Check if the issue has already been reported before creating a new report. 
                    This helps us avoid duplicates and focus on fixes.
                  </p>
                </div>
                
                <div className="border-l-4 border-pink-400 pl-6">
                  <h3 className="text-lg font-semibold text-pink-400 mb-2">Be Respectful</h3>
                  <p className="text-gray-300">
                    Remember that Nebula is built by volunteers and contributors. Be constructive 
                    and respectful in your communications.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Security Note */}
          <section>
            <div className="bg-black/30 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-8 h-8 text-orange-400 mr-3" />
                <h2 className="text-3xl font-bold">Security Vulnerabilities</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                If you discover a security vulnerability, please do not create a public issue. 
                Instead, report it confidentially to our security team.
              </p>
              <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-4">
                <p className="text-orange-300 font-medium mb-2">Responsible Disclosure</p>
                <p className="text-gray-300 text-sm">
                  We follow responsible disclosure practices. Security researchers who report vulnerabilities 
                  responsibly will be credited (if desired) and may be eligible for recognition in our 
                  security acknowledgments.
                </p>
                <a 
                  href="mailto:security@nebula.foundation" 
                  className="inline-block mt-3 text-orange-400 hover:text-orange-300 font-medium"
                >
                  Report Security Issue →
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};