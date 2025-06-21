import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { PilotProgram } from './components/PilotProgram';
import { UserPersonas } from './components/UserPersonas';
import { EconomicModel } from './components/EconomicModel';
import { FunctionalRequirements } from './components/FunctionalRequirements';
import { ResourceCenter } from './components/ResourceCenter';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { CosmicBackground } from './components/CosmicBackground';
import { ProjectCharter } from './pages/ProjectCharter';
import { ProofOfPersonhood } from './pages/ProofOfPersonhood';
import { Philosophy } from './pages/Philosophy';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { CodeOfConduct } from './pages/CodeOfConduct';
import './App.css';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <CosmicBackground />
      <div className="relative z-10">
        <Hero />
        <PilotProgram />
        <UserPersonas />
        <EconomicModel />
        <FunctionalRequirements />
        <ResourceCenter />
        <Features />
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project-charter" element={<ProjectCharter />} />
        <Route path="/proof-of-personhood" element={<ProofOfPersonhood />} />
        <Route path="/philosophy" element={<Philosophy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/code-of-conduct" element={<CodeOfConduct />} />
      </Routes>
    </Router>
  );
}

export default App;