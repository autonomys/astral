import { operator } from '@autonomys/auto-consensus';
import { ApiPromise, createConnection, disconnect } from '@autonomys/auto-utils';
import { config } from '../config';

let api: ApiPromise | null = null;

/**
 * Connect to Autonomys API using the Autonomys SDK
 */
export const connectAutonomysApi = async (): Promise<void> => {
  if (api) {
    console.log('Autonomys API already connected');
    return;
  }

  try {
    // Use createConnection for custom endpoints
    api = await createConnection(config.autonomysApiEndpoint);

    console.log('Autonomys API connected successfully');
    console.log(`Connected to chain: ${api.runtimeChain}`);
    console.log(
      `Runtime version: ${api.runtimeVersion.specName} v${api.runtimeVersion.specVersion}`,
    );
  } catch (error) {
    console.error('Failed to connect to Autonomys API:', error);
    throw error;
  }
};

/**
 * Disconnect from Autonomys API
 */
export const disconnectAutonomysApi = async (): Promise<void> => {
  if (!api) {
    console.log('No Autonomys API connection to disconnect');
    return;
  }

  try {
    await disconnect(api);
    api = null;
    console.log('Autonomys API disconnected successfully');
  } catch (error) {
    console.error('Error disconnecting from Autonomys API:', error);
    throw error;
  }
};

/**
 * Get Autonomys API instance
 */
export const getAutonomysApi = (): ApiPromise => {
  if (!api) {
    throw new Error('Autonomys API not connected');
  }
  return api;
};

/**
 * Get current chain head
 */
export const getChainHead = async (): Promise<bigint> => {
  const api = getAutonomysApi();
  const header = await api.rpc.chain.getHeader();
  return BigInt(header.number.toString());
};

/**
 * Get block hash by number
 */
export const getBlockHash = async (blockNumber: bigint): Promise<string> => {
  const api = getAutonomysApi();
  const hash = await api.rpc.chain.getBlockHash(blockNumber.toString());
  return hash.toString();
};

/**
 * Query operator by ID at a specific block
 * @param operatorId The operator ID to query
 * @param blockHash The block hash to query at (optional, uses latest if not provided)
 */
export const queryOperatorById = async (
  operatorId: string,
  blockHash?: string,
): Promise<any | null> => {
  const api = getAutonomysApi();

  try {
    if (blockHash) {
      // For querying at a specific block, we need to use the raw API
      const apiAt = await api.at(blockHash);
      const operatorData = await apiAt.query.domains.operators(operatorId);

      if (operatorData.isEmpty) {
        console.log(`Operator ${operatorId} not found`);
        return null;
      }

      return operatorData.toJSON();
    } else {
      // Use the SDK's operator function for latest block queries
      try {
        const operatorData = await operator(api, operatorId);
        return operatorData;
      } catch (error) {
        // If the operator doesn't exist, the SDK will throw an error
        console.log(`Operator ${operatorId} not found, ${error}`);
        return null;
      }
    }
  } catch (error) {
    console.error(`Failed to query operator ${operatorId}:`, error);
    throw error;
  }
};
