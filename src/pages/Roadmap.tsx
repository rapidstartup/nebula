import React, { useEffect } from 'react';

const VIBEDASH_PROJECT_ID = '20a02ecf-cb3c-4a3a-b646-caddbb885078';

declare global {
  interface Window {
    VibeDashRoadmap?: { init: (config: Record<string, unknown>) => void };
  }
}

export const Roadmap: React.FC = () => {
  useEffect(() => {
    const init = () =>
      window.VibeDashRoadmap?.init({
        projectId: VIBEDASH_PROJECT_ID,
        displayMode: 'inline',
        containerId: 'vibedash-roadmap',
        theme: 'auto',
      });
    if (window.VibeDashRoadmap) {
      init();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://vibedash.app/embed-roadmap.js"]'
    );
    if (existing) {
      existing.addEventListener('load', init, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://vibedash.app/embed-roadmap.js';
    script.async = true;
    script.onload = init;
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="mx-auto w-full max-w-5xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold">Roadmap</h1>
        <div id="vibedash-roadmap" style={{ width: '100%', minHeight: 700 }} />
      </main>
    </div>
  );
};
