# Nebula Developer Integration Guide

## Build Your Own Frontend with Nebula Smart Contracts

---

## Quick Start (5 Minutes)

### 1. Install Dependencies

```bash
npm install wagmi viem @tanstack/react-query
```

### 2. Configure Nebula Contracts

```typescript
// lib/nebula.ts
import { createPublicClient, http, createWalletClient, custom } from 'viem'
import { sepolia } from 'viem/chains'

// Sepolia contract addresses
export const SEPOLIA_CONTRACTS = {
  IdentityRegistry: '0xa6A4680b23A04Feb830733c734b64478075eDCaF',
  DAO: '0xb9a1aa37838f08b6C6960516A29aBbF72B5aa79F',
  Voting: '0x9fBC0D018b6dc06268a7B97a4FFd535b35cfcA71',
  ActionToken: '0xd30f9Bd8CE0797Ed03e8b0D25e3B8e1bda31434e',
  Agents: '0xbc7Eb686720a7E6a4A524165b7a0495072c2FDc0',
} as const

// Minimal ABI for IdentityRegistry
export const IdentityRegistryABI = [
  {
    inputs: [
      { name: 'did', type: 'string' },
      { name: 'commitment', type: 'bytes32' }
    ],
    name: 'createIdentity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getIdentity',
    outputs: [{
      components: [
        { name: 'wallet', type: 'address' },
        { name: 'did', type: 'string' },
        { name: 'commitment', type: 'bytes32' },
        { name: 'createdAt', type: 'uint256' },
        { name: 'lastVerified', type: 'uint256' },
        { name: 'isActive', type: 'bool' }
      ],
      name: '',
      type: 'tuple'
    }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

// Create public client
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http('https://rpc.sepolia.org'),
})
```

### 3. Connect Wallet & Create Identity

```typescript
// app/page.tsx
'use client'

import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { SEPOLIA_CONTRACTS, IdentityRegistryABI } from '@/lib/nebula'

export default function Home() {
  const { address, isConnected } = useAccount()
  
  // Read identity
  const { data: identity } = useReadContract({
    address: SEPOLIA_CONTRACTS.IdentityRegistry,
    abi: IdentityRegistryABI,
    functionName: 'getIdentity',
    args: [address!],
    query: {
      enabled: !!address,
    },
  })
  
  // Create identity
  const { writeContract, isPending } = useWriteContract()
  
  const handleCreateIdentity = () => {
    writeContract({
      address: SEPOLIA_CONTRACTS.IdentityRegistry,
      abi: IdentityRegistryABI,
      functionName: 'createIdentity',
      args: [
        `did:nebula:${address}`, // DID
        '0x1234567890abcdef...',  // Commitment (your PoP hash)
      ],
    })
  }
  
  if (!isConnected) {
    return <ConnectWalletButton />
  }
  
  return (
    <div>
      <h1>Nebula Integration</h1>
      
      {identity?.isActive ? (
        <div>
          <p>Welcome back!</p>
          <p>DID: {identity.did}</p>
        </div>
      ) : (
        <button 
          onClick={handleCreateIdentity}
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create Identity'}
        </button>
      )}
    </div>
  )
}
```

---

## Common Operations

### Create a DAO

```typescript
const DAO_ABI = [
  {
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'location', type: 'string' },
    ],
    name: 'createDAO',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

const { writeContract } = useWriteContract()

const createDAO = () => {
  writeContract({
    address: SEPOLIA_CONTRACTS.DAO,
    abi: DAO_ABI,
    functionName: 'createDAO',
    args: [
      'Geneva Climate Council',
      'Local environmental initiatives',
      'Geneva, Switzerland',
    ],
  })
}
```

### Create a Proposal

```typescript
const Voting_ABI = [
  {
    inputs: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'governanceCodeHash', type: 'string' },
    ],
    name: 'createProposal',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

const createProposal = () => {
  writeContract({
    address: SEPOLIA_CONTRACTS.Voting,
    abi: Voting_ABI,
    functionName: 'createProposal',
    args: [
      'Park Renovation Project',
      'Allocate 50,000 CHF to renovate City Park with sustainable features',
      'ipfs://QmHash...', // Link to detailed proposal
    ],
  })
}
```

### Vote on a Proposal

```typescript
const VOTE_ABI = [
  {
    inputs: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'voteType', type: 'uint8' }, // 0=Against, 1=For, 2=Abstain
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

const castVote = (proposalId: bigint, support: boolean) => {
  writeContract({
    address: SEPOLIA_CONTRACTS.Voting,
    abi: VOTE_ABI,
    functionName: 'vote',
    args: [proposalId, support ? 1 : 0],
  })
}
```

---

## Advanced Patterns

### Listen for Events

```typescript
import { useEffect } from 'react'
import { publicClient } from '@/lib/nebula'

useEffect(() => {
  const unwatch = publicClient.watchContractEvent({
    address: SEPOLIA_CONTRACTS.DAO,
    abi: DAO_ABI,
    eventName: 'DAOCreated',
    onLogs: (logs) => {
      console.log('New DAO created:', logs)
      // Update UI, show notification, etc.
    },
  })
  
  return () => unwatch()
}, [])
```

### Gasless Transactions (Meta-Transactions)

```typescript
// Using OpenZeppelin Defender or similar
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers'

const credentials = {
  apiKey: process.env.DEFENDER_API_KEY,
  apiSecret: process.env.DEFENDER_API_SECRET,
}

const provider = new DefenderRelayProvider(credentials)
const signer = new DefenderRelaySigner(credentials, provider)

// User signs message (no gas)
const signature = await userSignMessage(voteData)

// Relayer submits transaction (pays gas)
await contract.connect(signer).executeMetaTransaction(userAddress, voteData, signature)
```

### Batch Operations

```typescript
// Vote on multiple proposals in one transaction
import { multicall } from '@wagmi/core'

const votes = [
  { proposalId: 1n, support: true },
  { proposalId: 2n, support: false },
  { proposalId: 3n, support: true },
]

const calls = votes.map(vote => ({
  address: SEPOLIA_CONTRACTS.Voting,
  abi: VOTE_ABI,
  functionName: 'vote',
  args: [vote.proposalId, vote.support ? 1 : 0],
}))

await multicall({ contracts: calls })
```

---

## Testing

### Local Testing with Anvil

```bash
# Start local fork of Sepolia
anvil --fork-url https://rpc.sepolia.org

# Deploy contracts locally (if needed)
npx hardhat run scripts/deploy.cjs --network localhost
```

```typescript
// Test configuration
const localClient = createPublicClient({
  chain: {
    ...sepolia,
    id: 31337, // Anvil chain ID
    rpcUrls: {
      default: { http: ['http://localhost:8545'] },
    },
  },
  transport: http('http://localhost:8545'),
})
```

### Integration Tests with Vitest

```typescript
// test/nebula.test.ts
import { describe, it, expect } from 'vitest'
import { publicClient, SEPOLIA_CONTRACTS, IdentityRegistryABI } from '@/lib/nebula'

describe('Nebula Integration', () => {
  it('should read identity for test address', async () => {
    const identity = await publicClient.readContract({
      address: SEPOLIA_CONTRACTS.IdentityRegistry,
      abi: IdentityRegistryABI,
      functionName: 'getIdentity',
      args: ['0x...'], // Test address
    })
    
    expect(identity.wallet).toBeDefined()
  })
})
```

---

## Best Practices

### 1. Always Check Network

```typescript
const { chainId } = useAccount()

if (chainId !== 11155111) { // Sepolia
  return <SwitchNetworkButton />
}
```

### 2. Handle Loading States

```typescript
const { isLoading, isSuccess, isError, error } = useWriteContract()

return (
  <div>
    {isLoading && <Spinner />}
    {isSuccess && <SuccessMessage />}
    {isError && <ErrorMessage message={error?.message} />}
  </div>
)
```

### 3. Cache Read Calls

```typescript
const { data } = useReadContract({
  ...contractConfig,
  query: {
    staleTime: 60_000, // 1 minute
    cacheTime: 300_000, // 5 minutes
  },
})
```

### 4. Type Safety

```typescript
// Generate types from ABI
import { GetContractReturnType } from 'viem'

export type IdentityRegistryContract = GetContractReturnType<
  typeof IdentityRegistryABI,
  typeof publicClient
>
```

---

## Resources

- **Live Frontend:** https://nebula.rapidstartup.io
- **Contract Addresses:** See `src/lib/web3/config.ts`
- **Full ABIs:** Available in `src/lib/abi/`
- **GitHub:** https://github.com/rapidstartup/nebula
- **Support:** Open an issue on GitHub

---

## Example Projects

### 1. CLI Tool
```bash
npm install @nebula/cli
nebula vote --proposal 123 --support --private-key $KEY
```

### 2. Discord Bot
```typescript
// Vote via Discord command
client.on('interactionCreate', async (interaction) => {
  if (interaction.commandName === 'vote') {
    const proposalId = interaction.options.getString('proposal')
    // Connect wallet via DM, submit vote
  }
})
```

### 3. Mobile App
```typescript
// React Native with wagmi
import { WagmiConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

export default function App() {
  return (
    <WagmiConfig config={config}>
      <NebulaScreens />
    </WagmiConfig>
  )
}
```

---

*Happy building!* 🚀
*Questions? Open an issue at https://github.com/rapidstartup/nebula*