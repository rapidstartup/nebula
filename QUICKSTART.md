# Nebula Developer Quick Start Guide

*Get up and running with Nebula in 10 minutes*

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** or **yarn**
- **Git**
- **MetaMask** or Web3 wallet (for testing)
- **Sepolia ETH** (for testnet deployment)

Get Sepolia ETH from: https://sepoliafaucet.com/

---

## 1. Clone & Install (2 minutes)

```bash
# Clone repository
git clone https://github.com/rapidstartup/nebula.git
cd nebula

# Install dependencies
npm install

# Verify installation
npm run dev
```

The dev server should start at http://localhost:5173

---

## 2. Environment Setup (3 minutes)

Create `.env.local` in project root:

```env
# Required: WalletConnect Project ID
# Get one free at: https://cloud.walletconnect.com/
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Optional: Environment
VITE_ENV=development

# Optional: API Keys (for production)
# VITE_ALCHEMY_API_KEY=your_alchemy_key
# VITE_INFURA_API_KEY=your_infura_key
```

**Get WalletConnect Project ID:**
1. Go to https://cloud.walletconnect.com/
2. Sign up / Log in
3. Create new project
4. Copy Project ID
5. Paste in .env.local

---

## 3. Start Development Server (1 minute)

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.4.8  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Open http://localhost:5173 in browser with MetaMask installed.

---

## 4. Build for Production (2 minutes)

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

Preview server starts at http://localhost:4173

**Verify build:**
- Check `dist/` folder created
- Contains `index.html` and `assets/` folder
- No build errors in console

---

## 5. Connect Wallet & Test (2 minutes)

1. Open http://localhost:5173
2. Click "Connect Wallet" button
3. Select MetaMask
4. Switch to Sepolia testnet in MetaMask
5. Approve connection

**You should see:**
- Wallet address displayed
- Sepolia network indicator
- DAO creation interface

---

## Common Issues & Fixes

### Issue: "Cannot find module"
```bash
# Fix: Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue: Wallet won't connect
- Ensure MetaMask is unlocked
- Check you're on Sepolia testnet
- Refresh page and try again
- Check browser console for errors

### Issue: Build fails
```bash
# Clear cache and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Issue: Environment variables not loading
- Ensure `.env.local` is in project root (not src/)
- Restart dev server after creating file
- Check variable names start with `VITE_`

---

## Project Structure

```
nebula/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route pages (Home, DAO, Voting)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities, Web3 config
│   ├── types/          # TypeScript definitions
│   └── App.tsx         # Main app component
├── contracts/          # Solidity smart contracts
├── api-docs/           # API documentation
├── docs/               # Project documentation
├── dist/               # Production build (generated)
├── index.html          # Entry HTML
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

---

## Key Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI framework | 18.x |
| TypeScript | Type safety | 5.x |
| Vite | Build tool | 5.x |
| Tailwind CSS | Styling | 3.x |
| Wagmi | Web3/React integration | 2.x |
| Viem | Ethereum interactions | 2.x |
| WalletConnect | Wallet connections | Latest |

---

## Development Workflow

### Daily Development
```bash
# Start dev server
npm run dev

# In another terminal: run linting
npm run lint

# Make changes, see hot reload
```

### Before Committing
```bash
# Build to catch errors
npm run build

# Run linter
npm run lint

# Test production build
npm run preview
```

### Git Workflow
```bash
# Stage changes
git add .

# Commit with clear message
git commit -m "feat(component): add wallet connection"

# Push to main
git push
```

---

## Smart Contracts (Optional)

Contracts are in `contracts/` folder.

**To compile:**
```bash
npx hardhat compile
```

**To deploy to Sepolia:**
```bash
npx hardhat run scripts/deploy.cjs --network sepolia
```

**Required:** 
- Sepolia ETH in deployer wallet
- `PRIVATE_KEY` in `.env` file
- Alchemy/Infura RPC endpoint

---

## Testing Checklist

Before submitting PR or deploying:

- [ ] Dev server starts without errors
- [ ] Wallet connects successfully
- [ ] Can create test DAO
- [ ] Can submit proposal
- [ ] Can vote on proposal
- [ ] Build completes without errors
- [ ] Production preview works
- [ ] No console errors
- [ ] Responsive on mobile viewport

---

## Next Steps

Now that you're set up:

1. **Explore the codebase** - Start with `src/App.tsx`
2. **Read the docs** - Check `docs/` folder for guides
3. **Join the community** - Discord, Twitter @NebulaDAO
4. **Contribute** - Pick an issue from GitHub
5. **Build something** - Create your first DAO!

---

## Resources

- **Full Documentation:** https://rapidstartup.gitbook.io/nebula/
- **API Reference:** `/api-docs/` folder
- **GitHub Issues:** https://github.com/rapidstartup/nebula/issues
- **Discord:** [Invite link]
- **Twitter:** @NebulaDAO

---

## Troubleshooting

**Still stuck?**

1. Check GitHub Issues: https://github.com/rapidstartup/nebula/issues
2. Join Discord and ask in #dev-support
3. Tag @LifeOnAutoSite on Twitter
4. Email: nathan@nebula.io

---

*Happy building! 🚀*

*Last updated: February 3, 2026*
