import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Address } from 'viem';

export const CONTRACT_ADDRESSES = {
  IdentityRegistry: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Placeholder
  DAO: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  Voting: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  ActionToken: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  Agents: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
};

export function useCreateDAO() {
  const { writeContract, data: hash, isPending } = useWriteContract();

  const createDAO = async (name: string, description: string, location: string) => {
    return writeContract({
      address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' as Address,
      abi: [
        {
          inputs: [{"internalType": "string", "name": "name", "type": "string"}, {"internalType": "string", "name": "description", "type": "string"}, {"internalType": "string", "name": "location", "type": "string"}],
          name: 'createDAO',
          outputs: [{"internalType": "address", "name": "", "type": "address"}],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createDAO',
      args: [name, description, location],
    });
  };

  return { createDAO, hash, isPending };
}