import React, { useEffect, useRef } from 'react';

export const CosmicBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticle = () => {
      if (!containerRef.current) return;

      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 4 + 1;
      const colors = ['#a855f7', '#3b82f6', '#ec4899', '#06b6d4'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
      
      containerRef.current.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 10000);
    };

    const particleInterval = setInterval(createParticle, 300);
    
    return () => clearInterval(particleInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-0" ref={containerRef}>
      {/* Base cosmic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
      
      {/* Nebula layers */}
      <div className="nebula-layer" style={{ animationDelay: '0s' }} />
      <div className="nebula-layer" style={{ animationDelay: '-10s', animationDuration: '25s' }} />
      <div className="nebula-layer" style={{ animationDelay: '-20s', animationDuration: '35s' }} />
      
      {/* Star field */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-80"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};