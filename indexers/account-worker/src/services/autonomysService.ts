import { ApiPromise, WsProvider } from '@polkadot/api';
import { config } from '../config';
import { ConsensusAccountData } from '../interfaces';

let workerApiPromise: ApiPromise;

const connectAutonomysApi = async (): Promise<ApiPromise> => {
  if (workerApiPromise && workerApiPromise.isConnected) {
    return workerApiPromise;
  }
  try {
    const provider = new WsProvider(config.autonomysNodeUrl);
    provider.on('error', (err) => console.error(`WsProvider error for worker: ${err.message}`));
    provider.on('disconnected', () => console.warn('WsProvider for worker disconnected. Attempting to reconnect implicitly if ApiPromise is used.'));

    console.log(`Worker connecting to Autonomys node: ${config.autonomysNodeUrl}...`);
    workerApiPromise = await ApiPromise.create({ provider });
    const _isReady = await workerApiPromise.isReady;
    console.log('Worker connected to Autonomys node successfully.');
    console.log(`Worker API - Chain: ${workerApiPromise.runtimeChain}, Version: ${workerApiPromise.runtimeVersion}`);
    return workerApiPromise;
  } catch (error) {
    console.error('Worker failed to connect to Autonomys node:', error);
    throw error;
  }
}

const disconnectAutonomysApi = async (): Promise<void> => {
  if (workerApiPromise && workerApiPromise.isConnected) {
    const _disconnect = await workerApiPromise.disconnect();
    console.log('Worker disconnected from Autonomys node.');
  }
}

const getConnectedWorkerApi = async (): Promise<ApiPromise> => {
  if (!workerApiPromise || !workerApiPromise.isConnected) {
    console.log('Autonomys API not connected or connection lost, attempting to reconnect...');
    return connectAutonomysApi();
  }
  return workerApiPromise;
}

/**
 * Gets the current chain head height from the connected node.
 */
const getCurrentChainHeight = async (): Promise<number> => {
  try {
    const api = await getConnectedWorkerApi();
    const header = await api.rpc.chain.getHeader();
    return header.number.toNumber();
  } catch (error) {
    console.error('Worker: Error fetching current chain height:', error);
    return 0;
  }
}

/**
 * Fetches multiple account data at the same block hash in parallel.
 * Much more efficient than individual calls.
 */
const getMultipleAccountsDataAtBlock = async (
  addresses: string[],
  blockHash: string
): Promise<Map<string, ConsensusAccountData | null>> => {
  const results = new Map<string, ConsensusAccountData | null>();
  
  if (addresses.length === 0) return results;
  
  try {
    const api = await getConnectedWorkerApi();
    const historicalApi = await api.at(blockHash);
    console.log(`Worker fetching ${addresses.length} accounts at block ${blockHash}`);

    // Batch fetch all accounts in parallel
    const accountPromises = addresses.map(async (address) => {
      try {
        const accountInfo = await historicalApi.query.system.account(address);
        
        if (!accountInfo || accountInfo.isEmpty) {
          return { address, data: null };
        }

        const account = accountInfo.toJSON() as any;
        return {
          address,
          data: {
            nonce: account.nonce || 0,
            data: {
              free: account.data?.free || 0,
              reserved: account.data?.reserved || 0
            }
          } as ConsensusAccountData
        };
      } catch (error) {
        console.error(`Error fetching account ${address}:`, error);
        return { address, data: null };
      }
    });

    const accountResults = await Promise.all(accountPromises);
    
    // Build results map
    for (const { address, data } of accountResults) {
      results.set(address, data);
    }

    console.log(`Worker: Successfully fetched ${accountResults.filter(r => r.data).length}/${addresses.length} accounts`);
    return results;
  } catch (error) {
    console.error(`Worker: Error in batch account fetch at block ${blockHash}:`, error);
    if (error instanceof Error && error.message && error.message.includes('State already discarded')) {
      console.warn(`Worker: State for block ${blockHash} likely pruned or block orphaned.`);
    }
    // Return null for all addresses on error
    for (const address of addresses) {
      results.set(address, null);
    }
    return results;
  }
}

export {
  connectAutonomysApi,
  disconnectAutonomysApi,
  getConnectedWorkerApi,
  getCurrentChainHeight,
  getMultipleAccountsDataAtBlock
};
