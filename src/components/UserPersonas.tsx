import React from 'react';
import { User, Briefcase, GraduationCap } from 'lucide-react';

export const UserPersonas: React.FC = () => {
  const personas = [
    {
      icon: User,
      name: "Anna, The Engaged Citizen",
      location: "Zurich, Switzerland",
      age: "35-year-old urban planner",
      description: "Already votes in federal referendums but feels local issues are managed opaquely. Tech-savvy and familiar with digital banking.",
      needs: [
        "Transparent view of local fund allocation",
        "Direct proposal and voting on neighborhood initiatives", 
        "Security and data privacy above all"
      ],
      frustrations: "Slow pace of municipal government and lack of direct feedback loop",
      color: "blue"
    },
    {
      icon: Briefcase,
      name: "Ben, The Community Organizer", 
      location: "Austin, USA",
      age: "45-year-old small business owner",
      description: "Frustrated with city council bureaucracy when trying to get permits for community projects like gardens.",
      needs: [
        "Tool to quickly rally neighbors",
        "Secure fund pooling capabilities",
        "Formal proposals with verifiable community consensus"
      ],
      frustrations: "Red tape and difficulty proving broad community support",
      color: "green"
    },
    {
      icon: GraduationCap,
      name: "Maria, The Curious Student",
      location: "University Setting",
      age: "22-year-old university student", 
      description: "Hears about crypto and DAOs but finds the space intimidating and complex. Needs guidance and simple explanations.",
      needs: [
        "Extremely simple, guided onboarding",
        "Clear explanations of concepts",
        "Trustworthy platform that doesn't require deep technical knowledge"
      ],
      frustrations: "Jargon-filled Web3 world and fear of making costly mistakes",
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "from-blue-500 to-cyan-500",
        border: "border-blue-500/20",
        text: "text-blue-400"
      },
      green: {
        bg: "from-green-500 to-emerald-500", 
        border: "border-green-500/20",
        text: "text-green-400"
      },
      purple: {
        bg: "from-purple-500 to-pink-500",
        border: "border-purple-500/20", 
        text: "text-purple-400"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="user-personas" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Who We Serve</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nebula is designed for citizens who want more direct influence over their communities. 
            Meet the people who will shape the future of democratic participation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {personas.map((persona, index) => {
            const Icon = persona.icon;
            const colors = getColorClasses(persona.color);
            
            return (
              <div
                key={persona.name}
                className={`glass-effect border ${colors.border} p-8 rounded-2xl hover-lift`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${colors.bg} p-4 mb-6`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                
                <h3 className={`text-xl font-semibold ${colors.text} mb-2`}>
                  {persona.name}
                </h3>
                
                <div className="text-gray-400 text-sm mb-4">
                  {persona.location} • {persona.age}
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {persona.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">Key Needs:</h4>
                  <ul className="space-y-2">
                    {persona.needs.map((need, i) => (
                      <li key={i} className="flex items-start text-gray-300 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.bg} mt-2 mr-3 flex-shrink-0`}></div>
                        {need}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`border-l-4 border-gradient-to-b ${colors.bg} pl-4`}>
                  <h4 className="text-white font-medium mb-2">Main Frustration:</h4>
                  <p className="text-gray-400 text-sm italic">
                    "{persona.frustrations}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting Stats */}
        <div className="glass-effect p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Designing for Real People</h3>
            <p className="text-gray-300">
              Our user research shows that 78% of citizens want more direct input in local governance, 
              but 65% find current civic engagement tools too complex or ineffective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">78%</div>
              <div className="text-gray-300 text-sm">Want more direct local input</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">65%</div>
              <div className="text-gray-300 text-sm">Find current tools too complex</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">89%</div>
              <div className="text-gray-300 text-sm">Prioritize privacy and security</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};