import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Parse Redis URL if provided
const parseRedisConfig = () => {
  const redisUrl = process.env.REDIS_URL;
  if (redisUrl) {
    try {
      const url = new URL(redisUrl);
      return {
        host: url.hostname,
        port: parseInt(url.port || '6379', 10),
        password: url.password || undefined,
      };
    } catch (error) {
      console.error('Failed to parse REDIS_URL:', error);
    }
  }

  // Fallback to individual env vars
  return {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
  };
};

const redisConfig = parseRedisConfig();

export const config = {
  // Redis configuration
  redisHost: redisConfig.host,
  redisPort: redisConfig.port,
  redisPassword: redisConfig.password,

  // Queue configuration
  stakingQueueName: process.env.STAKING_QUEUE_NAME || 'staking:updates:queue',
  operatorQueueName: process.env.OPERATOR_QUEUE_NAME || 'staking:operators:queue',
  withdrawalQueueName: process.env.WITHDRAWAL_QUEUE_NAME || 'staking:withdrawals:queue',

  // Database configuration
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: parseInt(process.env.DB_PORT || '5432', 10),
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || 'postgres',
  dbName: process.env.DB_NAME || 'indexer',

  // Autonomys API configuration (using same var name as account worker)
  autonomysApiEndpoint: process.env.AUTONOMYS_NODE_URL || 'wss://rpc.taurus.autonomys.xyz/ws',

  // Worker configuration
  batchSize: parseInt(process.env.BATCH_SIZE || '100', 10),
  queueProcessingIntervalMs: parseInt(process.env.QUEUE_PROCESSING_INTERVAL_MS || '1000', 10),
  maxRetries: parseInt(process.env.MAX_RETRIES || '3', 10),
  retryDelayMs: parseInt(process.env.RETRY_DELAY_MS || '5000', 10),

  // Performance configuration
  maxConcurrentBatches: parseInt(process.env.MAX_CONCURRENT_BATCHES || '2', 10),
  dbPoolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
  dbConnectionTimeoutMs: parseInt(process.env.DB_CONNECTION_TIMEOUT_MS || '5000', 10),

  // Health check configuration
  dbHealthCheckIntervalMs: parseInt(process.env.DB_HEALTH_CHECK_INTERVAL_MS || '30000', 10),
  chainHeadPollIntervalMs: parseInt(process.env.CHAIN_HEAD_POLL_INTERVAL_MS || '6000', 10),

  // Staking specific configuration
  epochTransitionCheckIntervalMs: parseInt(
    process.env.EPOCH_TRANSITION_CHECK_INTERVAL_MS || '12000',
    10,
  ),
  sharePriceCalculationEnabled: process.env.SHARE_PRICE_CALCULATION_ENABLED === 'true',

  // Finality configuration
  finalityThreshold: parseInt(process.env.FINALITY_THRESHOLD || '100', 10), // Only process events 100 blocks behind tip
  chainTipUpdateIntervalMs: parseInt(process.env.CHAIN_TIP_UPDATE_INTERVAL_MS || '10000', 10), // Update chain tip every 10s

  // Logging configuration
  logLevel: process.env.LOG_LEVEL || 'info',
  enableDebugLogs: process.env.ENABLE_DEBUG_LOGS === 'true',

  // Environment
  nodeEnv: process.env.NODE_ENV || 'development',
};

// Validate configuration
export const validateConfig = (): void => {
  // TODO: Add configuration validation logic
  console.log('Configuration loaded:', {
    redisHost: config.redisHost,
    dbHost: config.dbHost,
    autonomysApiEndpoint: config.autonomysApiEndpoint,
    batchSize: config.batchSize,
    nodeEnv: config.nodeEnv,
  });
};
