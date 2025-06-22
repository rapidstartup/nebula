import React, { useState } from 'react';
import { ArrowLeft, Code, Users, Lightbulb, FileText, Send, Github, ExternalLink } from 'lucide-react';

export const Contributing: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contributionType: '',
    skills: '',
    description: '',
    availability: '',
    github: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll create a mailto link with the form data
    const subject = encodeURIComponent(`Nebula Contribution Request - ${formData.contributionType}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Contribution Type: ${formData.contributionType}
Skills: ${formData.skills}
GitHub: ${formData.github}
Availability: ${formData.availability}

Description:
${formData.description}
    `);
    
    window.location.href = `mailto:contribute@nebula.foundation?subject=${subject}&body=${body}`;
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
                Contributing Guidelines
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Join the movement to build the future of democratic governance
            </p>
          </div>

          {/* Overview */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Welcome, Future Contributor!</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Nebula is an open-source project built by and for the global community. We believe that the tools 
                of democracy should be created democratically, with transparency, collaboration, and shared ownership 
                at the core.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Whether you're a developer, designer, researcher, community organizer, or simply someone passionate 
                about democratic innovation, there's a place for you in the Nebula ecosystem.
              </p>
            </div>
          </section>

          {/* Contribution Areas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Ways to Contribute</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3 mb-4">
                  <Code className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Development</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Help build the platform's core features, smart contracts, and infrastructure.
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• Frontend development (React, TypeScript)</li>
                  <li>• Backend services and APIs</li>
                  <li>• Smart contract development</li>
                  <li>• Mobile app development</li>
                  <li>• DevOps and infrastructure</li>
                </ul>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-3 mb-4">
                  <Lightbulb className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Design & UX</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Shape the user experience and visual design of democratic tools.
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• UI/UX design and research</li>
                  <li>• Visual branding and graphics</li>
                  <li>• User experience optimization</li>
                  <li>• Accessibility improvements</li>
                  <li>• Design system development</li>
                </ul>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-3 mb-4">
                  <FileText className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-green-400 mb-3">Documentation & Research</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Create educational content and research democratic governance models.
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• Technical documentation</li>
                  <li>• User guides and tutorials</li>
                  <li>• Democratic governance research</li>
                  <li>• Legal and compliance analysis</li>
                  <li>• Translation and localization</li>
                </ul>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-3 mb-4">
                  <Users className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-orange-400 mb-3">Community & Outreach</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Help grow and nurture the Nebula community worldwide.
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• Community management</li>
                  <li>• Event organization</li>
                  <li>• Content creation</li>
                  <li>• Partnership development</li>
                  <li>• Regional community building</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Getting Started */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-400 mb-2">Explore the Codebase</h3>
                    <p className="text-gray-300">
                      Start by exploring our GitHub repository to understand the project structure and current development status.
                    </p>
                    <a 
                      href="https://github.com/nebula-gov" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Visit GitHub Repository
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-400 mb-2">Read Our Documentation</h3>
                    <p className="text-gray-300">
                      Familiarize yourself with our project charter, technical architecture, and governance principles.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <a href="/project-charter" className="text-indigo-400 hover:text-indigo-300 text-sm">Project Charter</a>
                      <span className="text-gray-500">•</span>
                      <a href="/philosophy" className="text-indigo-400 hover:text-indigo-300 text-sm">Philosophy</a>
                      <span className="text-gray-500">•</span>
                      <a href="https://rapidstartup.gitbook.io/nebula/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm">API Docs</a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-400 mb-2">Submit Your Interest</h3>
                    <p className="text-gray-300">
                      Fill out the contribution form below to let us know how you'd like to help. We'll get back to you with next steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contribution Form */}
          <section className="mb-12">
            <div className="bg-black/30 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Send className="w-8 h-8 text-pink-400 mr-3" />
                <h2 className="text-3xl font-bold">Contribution Interest Form</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:border-pink-400 focus:outline-none text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:border-pink-400 focus:outline-none text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="contributionType" className="block text-sm font-medium text-gray-300 mb-2">
                    How would you like to contribute? *
                  </label>
                  <select
                    id="contributionType"
                    name="contributionType"
                    required
                    value={formData.contributionType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:border-pink-400 focus:outline-none text-white"
                  >
                    <option value="">Select contribution type</option>
                    <option value="Development">Development</option>
                    <option value="Design & UX">Design & UX</option>
                    <option value="Documentation & Research">Documentation & Research</option>
                    <option value="Community & Outreach">Community & Outreach</option>
                    <option value="Testing & QA">Testing & Quality Assurance</option>
                    <option value="Translation">Translation & Localization</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-2">
                      Relevant Skills/Experience
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="e.g., React, Solidity, UX Design, Community Management"
                      className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:border-pink-400 focus:outline-none text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-300 mb-2">
                      GitHub Profile (optional)
                    </label>
                    <input
                      type="url"
                      id="github"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="https://github.com/yourusername"
                      className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:border-pink-400 focus:outline-none text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-300 mb-2">
                    Time Availability
                  </label>
                  <input
                    type="text"
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    placeholder="e.g., 5-10 hours per week, weekends only, flexible"
                    className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:border-pink-400 focus:outline-none text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Tell us more about your interest in Nebula *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="What motivates you to contribute? What specific areas interest you most? Any ideas or suggestions?"
                    className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:border-pink-400 focus:outline-none text-white resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Submit Contribution Interest
                </button>
              </form>
              
              <p className="text-sm text-gray-400 mt-4 text-center">
                This form will open your email client with a pre-filled message. We'll respond within 48 hours.
              </p>
            </div>
          </section>

          {/* Code of Conduct */}
          <section>
            <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Code of Conduct</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                All contributors must adhere to our Code of Conduct, which ensures a welcoming, inclusive, 
                and productive environment for everyone in the Nebula community.
              </p>
              <a 
                href="/code-of-conduct" 
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-medium"
              >
                <FileText className="w-5 h-5" />
                Read the Full Code of Conduct
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};