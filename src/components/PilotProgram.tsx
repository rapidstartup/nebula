import React from 'react';
import { MapPin, Target, Calendar } from 'lucide-react';

export const PilotProgram: React.FC = () => {
  return (
    <section id="pilot-program" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">The Swiss Pilot Program</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Launching democracy's digital future in the heart of Europe. Switzerland's rich democratic tradition 
            meets cutting-edge technology to create the blueprint for global democratic innovation.
          </p>
        </div>

        {/* Why Switzerland */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="glass-effect p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">Why Switzerland?</h3>
            </div>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3 flex-shrink-0"></div>
                <span><strong className="text-white">Direct Democracy Heritage:</strong> 150+ years of referendum experience</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3 flex-shrink-0"></div>
                <span><strong className="text-white">Digital Infrastructure:</strong> Swiss eID integration and advanced connectivity</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3 flex-shrink-0"></div>
                <span><strong className="text-white">Legal Framework:</strong> Progressive approach to digital innovation</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3 flex-shrink-0"></div>
                <span><strong className="text-white">Subsidiarity Principle:</strong> Decisions at the most local level</span>
              </li>
            </ul>
          </div>

          <div className="glass-effect p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-green-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">Success Targets</h3>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-green-400 pl-6">
                <div className="text-2xl font-bold text-green-400">10,000+</div>
                <div className="text-gray-300">Monthly active users within 12 months</div>
              </div>
              <div className="border-l-4 border-purple-400 pl-6">
                <div className="text-2xl font-bold text-purple-400">50%+</div>
                <div className="text-gray-300">Participation rate in community voting</div>
              </div>
              <div className="border-l-4 border-blue-400 pl-6">
                <div className="text-2xl font-bold text-blue-400">99.95%</div>
                <div className="text-gray-300">Platform uptime and reliability</div>
              </div>
              <div className="border-l-4 border-pink-400 pl-6">
                <div className="text-2xl font-bold text-pink-400">{'<10 min'}</div>
                <div className="text-gray-300">Time to create a new DAO</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-effect p-8 rounded-2xl mb-16">
          <div className="flex items-center mb-8">
            <Calendar className="w-8 h-8 text-yellow-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Pilot Timeline</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">Q2</span>
              </div>
              <h4 className="text-lg font-semibold text-green-400 mb-2">Foundation</h4>
              <p className="text-gray-300 text-sm">Platform launch, identity system, initial user onboarding</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">Q3</span>
              </div>
              <h4 className="text-lg font-semibold text-blue-400 mb-2">Core Features</h4>
              <p className="text-gray-300 text-sm">DAO creation, voting systems, treasury management</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">Q4</span>
              </div>
              <h4 className="text-lg font-semibold text-purple-400 mb-2">Scale & Refine</h4>
              <p className="text-gray-300 text-sm">User growth, feature optimization, legal integration</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">2026</span>
              </div>
              <h4 className="text-lg font-semibold text-orange-400 mb-2">Expansion</h4>
              <p className="text-gray-300 text-sm">International rollout, advanced governance features</p>
            </div>
          </div>
        </div>

        {/* Pilot Locations */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Initial Pilot Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-effect p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-red-500 mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">🇨🇭</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Zurich, Switzerland</h4>
              <p className="text-gray-300">Primary pilot location leveraging Swiss eID and direct democracy experience</p>
            </div>
            
            <div className="glass-effect p-6 rounded-2xl opacity-60">
              <div className="w-12 h-12 rounded-full bg-blue-500 mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">🇺🇸</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Austin, Texas</h4>
              <p className="text-gray-300">Future expansion location for North American market testing</p>
              <div className="mt-2">
                <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-yellow-400 text-sm">
                  Phase 2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};