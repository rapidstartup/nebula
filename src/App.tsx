import React from 'react';
import { Hero } from './components/Hero';
import { ResourceCenter } from './components/ResourceCenter';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { CosmicBackground } from './components/CosmicBackground';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <CosmicBackground />
      <div className="relative z-10">
        <Hero />
        <ResourceCenter />
        <Features />
        <Footer />
      </div>
    </div>
  );
}

export default App;