/**
 * Nebula V2 Web3 Module
 * 
 * Central export for all Web3 functionality.
 */

// Configuration
export {
  wagmiConfig,
  getContractAddresses,
  isChainSupported,
  ipfsUrl,
  IPFS_CONFIG,
  SUPPORTED_CHAINS,
  DEFAULT_CHAIN,
  type ContractAddresses,
} from './config';

// Contract ABIs
export {
  NebulaIdentityABI,
  NebulaDAOABI,
  NebulaGovernanceABI,
  NebulaTreasuryABI,
  NebulaAgentRegistryABI,
} from './contracts';

// React Hooks
export {
  // Identity
  useHasActiveDID,
  useHasProofOfPersonhood,
  useCreateDID,
  
  // DAO
  useAllDAOs,
  useDAO,
  useIsMember,
  useMember,
  useCreateDAO,
  useJoinDAO,
  
  // Governance
  useDAOProposals,
  useProposal,
  useHasVoted,
  useCreateProposal,
  useCastVote,
  
  // Treasury
  useTreasury,
  useTreasuryETHBalance,
  useDepositETH,
  
  // Agents
  useAllAgents,
  useMyAgents,
  useRegisterAgent,
} from './hooks';
