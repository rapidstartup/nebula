// File: src/lib/web3/wagmi.ts
import { createConfig, http } from 'wagmi';
import { sepolia, localhost } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [localhost, sepolia],
  transports: {
    [localhost.id]: http('http://localhost:8545'),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
    }),
  ],
});