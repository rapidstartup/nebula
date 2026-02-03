import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Base URL for deployment
  base: '/',
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    // Ensure proper chunking
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          web3: ['wagmi', 'viem'],
        },
      },
    },
  },
  
  // Resolve aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  
  // Optimize dependencies
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'wagmi', 'viem'],
  },
  
  // Server configuration (for dev)
  server: {
    port: 5173,
    host: true,
  },
  
  // Preview configuration (for testing build)
  preview: {
    port: 4173,
    host: true,
  },
});
