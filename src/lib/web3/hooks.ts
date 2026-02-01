/**
 * Nebula V2 Web3 React Hooks
 * 
 * Custom hooks for interacting with Nebula smart contracts using wagmi.
 */

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState, useCallback } from 'react';
import { getContractAddresses } from './config';
import { 
  NebulaIdentityABI, 
  NebulaDAOABI, 
  NebulaGovernanceABI,
  NebulaTreasuryABI,
  NebulaAgentRegistryABI 
} from './contracts';

// ============ IDENTITY HOOKS ============

/**
 * Hook for checking if user has an active DID
 */
export function useHasActiveDID() {
  const { address, chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;

  return useReadContract({
    address: contracts?.NebulaIdentity,
    abi: NebulaIdentityABI,
    functionName: 'isDIDActive',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!contracts,
    },
  });
}

/**
 * Hook for checking Proof of Personhood status
 */
export function useHasProofOfPersonhood() {
  const { address, chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;

  return useReadContract({
    address: contracts?.NebulaIdentity,
    abi: NebulaIdentityABI,
    functionName: 'hasProofOfPersonhood',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!contracts,
    },
  });
}

/**
 * Hook for creating a DID
 */
export function useCreateDID() {
  const { chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const createDID = useCallback(async (publicKeyHash: `0x${string}`) => {
    if (!contracts) throw new Error('Contracts not configured');
    
    writeContract({
      address: contracts.NebulaIdentity,
      abi: NebulaIdentityABI,
      functionName: 'createDID',
      args: [publicKeyHash],
    });
  }, [contracts, writeContract]);

  return {
    createDID,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

// ============ DAO HOOKS ============

/**
 * Hook for getting all DAOs
 */
export function useAllDAOs() {
  const { chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;

  return useReadContract({
    address: contracts?.NebulaDAO,
    abi: NebulaDAOABI,
    functionName: 'getAllDAOs',
    query: {
      enabled: !!contracts,
    },
  });
}

/**
 * Hook for getting DAO details
 */
export function useDAO(daoId: `0x${string}` | undefined) {
  const { chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;

  return useReadContract({
    address: contracts?.NebulaDAO,
    abi: NebulaDAOABI,
    functionName: 'getDAO',
    args: daoId ? [daoId] : undefined,
    query: {
      enabled: !!contracts && !!daoId,
    },
  });
}

/**
 * Hook for checking DAO membership
 */
export function useIsMember(daoId: `0x${string}` | undefined) {
  const { address, chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;

  return useReadContract({
    address: contracts?.NebulaDAO,
    abi: NebulaDAOABI,
    functionName: 'isMember',
    args: daoId && address ? [daoId, address] : undefined,
    query: {
      enabled: !!contracts && !!daoId && !!address,
    },
  });
}

/**
 * Hook for getting member details
 */
export function useMember(daoId: `0x${string}` | undefined) {
  const { address, chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;

  return useReadContract({
    address: contracts?.NebulaDAO,
    abi: NebulaDAOABI,
    functionName: 'getMember',
    args: daoId && address ? [daoId, address] : undefined,
    query: {
      enabled: !!contracts && !!daoId && !!address,
    },
  });
}

/**
 * Hook for creating a DAO
 */
export function useCreateDAO() {
  const { chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  interface DAOConfig {
    name: string;
    description: string;
    geographicRegion: string;
    quorumPercent: bigint;
    votingPeriod: bigint;
    proposalThreshold: bigint;
    requiresPoP: boolean;
    requiresResidency: boolean;
  }

  const createDAO = useCallback(async (config: DAOConfig) => {
    if (!contracts) throw new Error('Contracts not configured');
    
    writeContract({
      address: contracts.NebulaDAO,
      abi: NebulaDAOABI,
      functionName: 'createDAO',
      args: [config],
    });
  }, [contracts, writeContract]);

  return {
    createDAO,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

/**
 * Hook for joining a DAO
 */
export function useJoinDAO() {
  const { chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const joinDAO = useCallback(async (daoId: `0x${string}`) => {
    if (!contracts) throw new Error('Contracts not configured');
    
    writeContract({
      address: contracts.NebulaDAO,
      abi: NebulaDAOABI,
      functionName: 'joinDAO',
      args: [daoId],
    });
  }, [contracts, writeContract]);

  return {
    joinDAO,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

// ============ GOVERNANCE HOOKS ============

/**
 * Hook for getting DAO proposals
 */
export function useDAOProposals(daoId: `0x${string}` | undefined) {
  const { chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;

  return useReadContract({
    address: contracts?.NebulaGovernance,
    abi: NebulaGovernanceABI,
    functionName: 'getDAOProposals',
    args: daoId ? [daoId] : undefined,
    query: {
      enabled: !!contracts && !!daoId,
    },
  });
}

/**
 * Hook for getting proposal details
 */
export function useProposal(proposalId: `0x${string}` | undefined) {
  const { chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;

  return useReadContract({
    address: contracts?.NebulaGovernance,
    abi: NebulaGovernanceABI,
    functionName: 'getProposal',
    args: proposalId ? [proposalId] : undefined,
    query: {
      enabled: !!contracts && !!proposalId,
    },
  });
}

/**
 * Hook for checking if user has voted
 */
export function useHasVoted(proposalId: `0x${string}` | undefined) {
  const { address, chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;

  return useReadContract({
    address: contracts?.NebulaGovernance,
    abi: NebulaGovernanceABI,
    functionName: 'hasVoted',
    args: proposalId && address ? [proposalId, address] : undefined,
    query: {
      enabled: !!contracts && !!proposalId && !!address,
    },
  });
}

/**
 * Hook for creating a proposal
 */
export function useCreateProposal() {
  const { chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const createProposal = useCallback(async (
    daoId: `0x${string}`,
    title: string,
    descriptionHash: string,
    proposalType: number,
    executionHash: string
  ) => {
    if (!contracts) throw new Error('Contracts not configured');
    
    writeContract({
      address: contracts.NebulaGovernance,
      abi: NebulaGovernanceABI,
      functionName: 'createProposal',
      args: [daoId, title, descriptionHash, proposalType, executionHash],
    });
  }, [contracts, writeContract]);

  return {
    createProposal,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

/**
 * Hook for casting a vote
 */
export function useCastVote() {
  const { chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const castVote = useCallback(async (
    proposalId: `0x${string}`,
    voteOption: number, // 0 = Against, 1 = For, 2 = Abstain
    reasonHash: string = ''
  ) => {
    if (!contracts) throw new Error('Contracts not configured');
    
    writeContract({
      address: contracts.NebulaGovernance,
      abi: NebulaGovernanceABI,
      functionName: 'castVote',
      args: [proposalId, voteOption, reasonHash],
    });
  }, [contracts, writeContract]);

  return {
    castVote,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

// ============ TREASURY HOOKS ============

/**
 * Hook for getting treasury details
 */
export function useTreasury(daoId: `0x${string}` | undefined) {
  const { chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;

  return useReadContract({
    address: contracts?.NebulaTreasury,
    abi: NebulaTreasuryABI,
    functionName: 'getTreasury',
    args: daoId ? [daoId] : undefined,
    query: {
      enabled: !!contracts && !!daoId,
    },
  });
}

/**
 * Hook for getting ETH balance
 */
export function useTreasuryETHBalance(daoId: `0x${string}` | undefined) {
  const { chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;

  return useReadContract({
    address: contracts?.NebulaTreasury,
    abi: NebulaTreasuryABI,
    functionName: 'getETHBalance',
    args: daoId ? [daoId] : undefined,
    query: {
      enabled: !!contracts && !!daoId,
    },
  });
}

/**
 * Hook for depositing ETH
 */
export function useDepositETH() {
  const { chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const depositETH = useCallback(async (daoId: `0x${string}`, amount: bigint) => {
    if (!contracts) throw new Error('Contracts not configured');
    
    writeContract({
      address: contracts.NebulaTreasury,
      abi: NebulaTreasuryABI,
      functionName: 'depositETH',
      args: [daoId],
      value: amount,
    });
  }, [contracts, writeContract]);

  return {
    depositETH,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

// ============ AGENT HOOKS ============

/**
 * Hook for getting all agents
 */
export function useAllAgents() {
  const { chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;

  return useReadContract({
    address: contracts?.NebulaAgentRegistry,
    abi: NebulaAgentRegistryABI,
    functionName: 'getAllAgents',
    query: {
      enabled: !!contracts,
    },
  });
}

/**
 * Hook for getting user's agents
 */
export function useMyAgents() {
  const { address, chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;

  return useReadContract({
    address: contracts?.NebulaAgentRegistry,
    abi: NebulaAgentRegistryABI,
    functionName: 'getControllerAgents',
    args: address ? [address] : undefined,
    query: {
      enabled: !!contracts && !!address,
    },
  });
}

/**
 * Hook for registering an agent
 */
export function useRegisterAgent() {
  const { chainId } = useAccount();
  const contracts = chainId ? getContractAddresses(chainId) : null;
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const registerAgent = useCallback(async (
    name: string,
    descriptionHash: string,
    modelIdentifier: string,
    capabilities: number[]
  ) => {
    if (!contracts) throw new Error('Contracts not configured');
    
    writeContract({
      address: contracts.NebulaAgentRegistry,
      abi: NebulaAgentRegistryABI,
      functionName: 'registerAgent',
      args: [name, descriptionHash, modelIdentifier, capabilities],
    });
  }, [contracts, writeContract]);

  return {
    registerAgent,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}
