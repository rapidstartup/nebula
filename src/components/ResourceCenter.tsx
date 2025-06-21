import React from 'react';
import { Book, Video, Users, Code, Newspaper, HelpCircle, Github, MessageCircle } from 'lucide-react';

const resources = [
  {
    icon: Book,
    title: 'Documentation',
    description: 'Comprehensive guides and API references to get you started with Nebula.',
    color: 'from-purple-500 to-blue-500',
  },
  {
    icon: Video,
    title: 'Tutorials',
    description: 'Step-by-step video tutorials to master the cosmic powers of our platform.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Join our vibrant community of developers and cosmic explorers.',
    color: 'from-cyan-500 to-pink-500',
  },
  {
    icon: Code,
    title: 'Examples',
    description: 'Real-world code examples and use cases to inspire your journey.',
    color: 'from-pink-500 to-purple-500',
  },
  {
    icon: Github,
    title: 'Open Source',
    description: 'Contribute to our open-source ecosystem and shape the future.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: MessageCircle,
    title: 'Support',
    description: 'Get help from our stellar support team whenever you need it.',
    color: 'from-indigo-500 to-blue-500',
  },
];

export const ResourceCenter: React.FC = () => {
  return (
    <section id="resources" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Resource Center</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to explore, learn, and build with Nebula. 
            From documentation to community support, we've got you covered.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={resource.title}
                className="glass-effect p-8 rounded-2xl hover-lift group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${resource.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {resource.description}
                  </p>
                </div>
                
                <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                  <span className="font-medium">Explore</span>
                  <svg 
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};