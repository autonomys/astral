import { ApiPromise, WsProvider } from '@polkadot/api';
import { config } from '../config';

let api: ApiPromise | null = null;
let provider: WsProvider | null = null;

/**
 * Connect to Autonomys API
 */
export const connectAutonomysApi = async (): Promise<void> => {
  if (api) {
    console.log('Autonomys API already connected');
    return;
  }

  try {
    provider = new WsProvider(config.autonomysApiEndpoint);
    api = await ApiPromise.create({ provider });
    
    await api.isReady;
    
    console.log('Autonomys API connected successfully');
    console.log(`Connected to chain: ${api.runtimeChain}`);
    console.log(`Runtime version: ${api.runtimeVersion.specName} v${api.runtimeVersion.specVersion}`);
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
    await api.disconnect();
    api = null;
    provider = null;
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
 * Query operators
 */
export const queryOperators = async (): Promise<any[]> => {
  const api = getAutonomysApi();
  // TODO: Implement operator query
  console.log('Querying operators from chain...');
  return [];
};

/**
 * Query operator by ID
 */
export const queryOperatorById = async (operatorId: string): Promise<any | null> => {
  const api = getAutonomysApi();
  // TODO: Implement single operator query
  console.log(`Querying operator ${operatorId} from chain...`);
  return null;
};

/**
 * Query domain staking summary
 */
export const queryDomainStakingSummary = async (domainId: string): Promise<any | null> => {
  const api = getAutonomysApi();
  // TODO: Implement domain staking summary query
  console.log(`Querying domain staking summary for ${domainId}...`);
  return null;
};

/**
 * Query all domain staking summaries
 */
export const queryAllDomainStakingSummaries = async (): Promise<Map<string, any>> => {
  const api = getAutonomysApi();
  // TODO: Implement all domain staking summaries query
  console.log('Querying all domain staking summaries...');
  return new Map();
};

/**
 * Query deposits for operator and nominator
 */
export const queryDeposits = async (operatorId: string, nominatorId: string): Promise<any | null> => {
  const api = getAutonomysApi();
  // TODO: Implement deposits query
  console.log(`Querying deposits for nominator ${nominatorId} on operator ${operatorId}...`);
  return null;
};

/**
 * Query withdrawals for operator and nominator
 */
export const queryWithdrawals = async (operatorId: string, nominatorId: string): Promise<any | null> => {
  const api = getAutonomysApi();
  // TODO: Implement withdrawals query
  console.log(`Querying withdrawals for nominator ${nominatorId} on operator ${operatorId}...`);
  return null;
};

/**
 * Query domain head block number
 */
export const queryDomainHeadNumber = async (domainId: string): Promise<bigint | null> => {
  const api = getAutonomysApi();
  // TODO: Implement domain head number query
  console.log(`Querying head block number for domain ${domainId}...`);
  return null;
};

/**
 * Query operator owner
 */
export const queryOperatorOwner = async (operatorId: string): Promise<string | null> => {
  const api = getAutonomysApi();
  // TODO: Implement operator owner query
  console.log(`Querying owner for operator ${operatorId}...`);
  return null;
};

/**
 * Subscribe to new blocks
 */
export const subscribeToNewBlocks = async (callback: (blockNumber: bigint) => void): Promise<() => void> => {
  const api = getAutonomysApi();
  
  const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
    callback(BigInt(header.number.toString()));
  });
  
  return unsubscribe;
};

/**
 * Query at specific block
 */
export const queryAtBlock = async <T>(
  blockHash: string,
  queryFn: (api: ApiPromise) => Promise<T>
): Promise<T> => {
  const api = getAutonomysApi();
  const apiAt = await api.at(blockHash);
  return queryFn(apiAt as any);
};

/**
 * Batch query multiple items
 */
export const batchQuery = async <T>(queries: (() => Promise<T>)[]): Promise<T[]> => {
  // Execute queries in parallel for better performance
  return Promise.all(queries.map(q => q()));
};