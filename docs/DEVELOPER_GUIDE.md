# Nebula Developer Guide

Integrate with Nebula's smart contracts and build decentralized governance applications.

## Smart Contract Addresses (Sepolia Testnet)

| Contract | Address | Etherscan |
|----------|---------|-----------|
| **IdentityRegistry** | `0xa6A4680b23A04Feb830733c734b64478075eDCaF` | [View](https://sepolia.etherscan.io/address/0xa6A4680b23A04Feb830733c734b64478075eDCaF) |
| **DAO** | `0xb9a1aa37838f08b6C6960516A29aBbF72B5aa79F` | [View](https://sepolia.etherscan.io/address/0xb9a1aa37838f08b6C6960516A29aBbF72B5aa79F) |
| **Voting** | `0x9fBC0D018b6dc06268a7B97a4FFd535b35cfcA71` | [View](https://sepolia.etherscan.io/address/0x9fBC0D018b6dc06268a7B97a4FFd535b35cfcA71) |
| **ActionToken** | `0xd30f9Bd8CE0797Ed03e8b0D25e3B8e1bda31434e` | [View](https://sepolia.etherscan.io/address/0xd30f9Bd8CE0797Ed03e8b0D25e3B8e1bda31434e) |
| **Agents** | `0xbc7Eb686720a7E6a4A524165b7a0495072c2FDc0` | [View](https://sepolia.etherscan.io/address/0xbc7Eb686720a7E6a4A524165b7a0495072c2FDc0) |

**Network Details:**
- Chain ID: 11155111
- RPC: https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
- Block Explorer: https://sepolia.etherscan.io

## ABI Locations

All contract ABIs are located in:
- `src/lib/abi/` - React/frontend ABIs
- `artifacts/contracts/` - Hardhat compilation output

## Quick Integration

### 1. Install Dependencies

```bash
npm install ethers @wagmi/core viem
```

### 2. Configure Connection

```typescript
import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY')
  }
})
```

### 3. Contract Interaction Examples

#### Read Identity
```typescript
import { readContract } from '@wagmi/core'

const identity = await readContract(config, {
  address: '0xa6A4680b23A04Feb830733c734b64478075eDCaF',
  abi: IDENTITY_REGISTRY_ABI,
  functionName: 'getIdentity',
  args: ['0xUserAddress']
})
```

#### Create DAO
```typescript
import { writeContract } from '@wagmi/core'

const hash = await writeContract(config, {
  address: '0xb9a1aa37838f08b6C6960516A29aBbF72B5aa79F',
  abi: DAO_ABI,
  functionName: 'createDAO',
  args: ['My DAO', 'Description', 'Geneva']
})
```

## Contract Interfaces

### IdentityRegistry

```solidity
function createIdentity(string memory did, bytes32 commitment) external
function getIdentity(address user) external view returns (Identity memory)
function updateIdentity(string memory newDid) external
function deactivateIdentity() external
```

### DAO

```solidity
function createDAO(string memory name, string memory description, string memory location) external returns (address)
function getDAO(address dao) external view returns (DAOInfo memory)
function joinDAO(address dao) external
function leaveDAO(address dao) external
```

### Voting

```solidity
function createProposal(string memory title, string memory description, string memory governanceCodeHash) external returns (uint256)
function vote(uint256 proposalId, uint8 voteType) external
function getProposal(uint256 proposalId) external view returns (Proposal memory)
function getResults(uint256 proposalId) external view returns (uint256 forVotes, uint256 againstVotes, uint256 abstainVotes)
```

## React Hook Examples

### Connect Wallet
```typescript
import { useAccount, useConnect, useDisconnect } from 'wagmi'

function WalletButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return <button onClick={() => disconnect()}>{address.slice(0,6)}...{address.slice(-4)}</button>
  }

  return connectors.map((connector) => (
    <button key={connector.id} onClick={() => connect({ connector })}>
      Connect {connector.name}
    </button>
  ))
}
```

### Create Identity Hook
```typescript
import { useWriteContract } from 'wagmi'

function useCreateIdentity() {
  const { writeContract, isPending } = useWriteContract()

  const createIdentity = (did: string) => {
    writeContract({
      address: '0xa6A4680b23A04Feb830733c734b64478075eDCaF',
      abi: IDENTITY_REGISTRY_ABI,
      functionName: 'createIdentity',
      args: [did, ethers.ZeroHash]
    })
  }

  return { createIdentity, isPending }
}
```

### Vote on Proposal Hook
```typescript
function useVote() {
  const { writeContract } = useWriteContract()

  const vote = (proposalId: number, voteType: number) => {
    writeContract({
      address: '0x9fBC0D018b6dc06268a7B97a4FFd535b35cfcA71',
      abi: VOTING_ABI,
      functionName: 'vote',
      args: [BigInt(proposalId), voteType]
    })
  }

  return { vote }
}
```

## Testing

### Local Development
```bash
# Start local Hardhat node
npx hardhat node

# Deploy contracts locally
npx hardhat run scripts/deploy.cjs --network localhost
```

### Testnet Testing
```bash
# Deploy to Sepolia
npx hardhat run scripts/deploy.cjs --network sepolia
```

## Resources

- **Frontend Repo**: https://github.com/rapidstartup/nebula
- **Live Demo**: https://nebula.rapidstartup.io
- **API Docs**: https://rapidstartup.gitbook.io/nebula/
- **Sepolia Explorer**: https://sepolia.etherscan.io

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT - See LICENSE file for details