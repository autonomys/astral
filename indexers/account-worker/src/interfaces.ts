export interface AccountProcessingTask {
  address: string;
  blockHeight: number;
  blockHash: string;
  timestamp: number;
}

export interface ConsensusAccountData {
  nonce: any;
  data: {
    free: any;
    reserved: any;
  };
} 

export interface AppConfig {
  autonomysNodeUrl: string;
  dbHost: string;
  dbPort: number;
  dbUser: string;
  dbPassword: string;
  dbName: string;
  redisUrl: string;
  accountProcessingQueueName: string;
  processingDepth: number;
  chainHeadPollIntervalMs: number;
  queueProcessingIntervalMs: number;
  batchSize: number;
}

export interface AccountHistoryUpdateData {
  id: string; // Account address
  nonce: bigint;
  free: bigint;
  reserved: bigint;
  total: bigint;
  blockHeight: number;
}
