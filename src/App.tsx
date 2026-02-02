import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { Navigation } from './components/Navigation';
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
import { Tutorials } from './pages/Tutorials';
import { Support } from './pages/Support';
import { Community } from './pages/Community';
import { Contributing } from './pages/Contributing';
import { IssueTemplates } from './pages/IssueTemplates';
import { V2Dashboard } from './components/v2/V2Dashboard';
import { wagmiConfig } from './lib/web3/config';
import './App.css';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <CosmicBackground />
      <div className="relative z-10">
        <Navigation />
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

// Create a query client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project-charter" element={<ProjectCharter />} />
            <Route path="/proof-of-personhood" element={<ProofOfPersonhood />} />
            <Route path="/philosophy" element={<Philosophy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/code-of-conduct" element={<CodeOfConduct />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/support" element={<Support />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contributing" element={<Contributing />} />
            <Route path="/issue-templates" element={<IssueTemplates />} />
            <Route path="/v2" element={<V2Dashboard />} />
            
            {/* Redirect routes */}
            <Route path="/login" element={<Navigate to="/v2" replace />} />
            <Route path="/signup" element={<Navigate to="/v2" replace />} />
            <Route path="/connect" element={<Navigate to="/v2" replace />} />
            <Route path="/dashboard" element={<Navigate to="/v2" replace />} />
            
            {/* Catch-all route - redirect unknown paths to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;