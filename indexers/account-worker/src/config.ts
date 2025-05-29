import dotenv from 'dotenv';
import { AppConfig } from './interfaces';

dotenv.config();

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not set and no default value was provided.`);
  }
  return value;
}

const parseIntEnvVar = (key: string, defaultValue?: number): number => {
  const valueStr = getEnvVar(key, defaultValue?.toString());
  const valueInt = parseInt(valueStr, 10);
  if (isNaN(valueInt)) {
    throw new Error(`Environment variable ${key} with value "${valueStr}" is not a valid integer.`);
  }
  return valueInt;
}

const config: AppConfig = {
  autonomysNodeUrl: getEnvVar('AUTONOMYS_NODE_URL', 'ws://127.0.0.1:9944'),
  dbHost: getEnvVar('DB_HOST', 'localhost'),
  dbPort: parseIntEnvVar('DB_PORT', 5432),
  dbUser: getEnvVar('DB_USER'),
  dbPassword: getEnvVar('DB_PASSWORD'),
  dbName: getEnvVar('DB_NAME'),
  redisUrl: getEnvVar('REDIS_URL', 'redis://127.0.0.1:6379'),
  accountProcessingQueueName: getEnvVar('ACCOUNT_PROCESSING_QUEUE_NAME', 'account_updates_queue'),
  processingDepth: parseIntEnvVar('PROCESSING_DEPTH', 10),
  chainHeadPollIntervalMs: parseIntEnvVar('CHAIN_HEAD_POLL_INTERVAL_MS', 5000),
  queueProcessingIntervalMs: parseIntEnvVar('QUEUE_PROCESSING_INTERVAL_MS', 1000),
  batchSize: parseIntEnvVar('BATCH_SIZE', 100),
};

// Basic validation
if (config.processingDepth < 0) {
  throw new Error('PROCESSING_DEPTH must be a non-negative integer.');
}
if (config.chainHeadPollIntervalMs <= 0) {
  throw new Error('CHAIN_HEAD_POLL_INTERVAL_MS must be positive.');
}
if (config.queueProcessingIntervalMs <= 0) {
  throw new Error('QUEUE_PROCESSING_INTERVAL_MS must be positive.');
}

console.log('Configuration loaded:');
console.log(`- Autonomys Node URL: ${config.autonomysNodeUrl}`);
console.log(`- DB Host: ${config.dbHost}:${config.dbPort}`);
console.log(`- DB Name: ${config.dbName}`);
console.log(`- Redis URL: ${config.redisUrl}`);
console.log(`- Queue Name: ${config.accountProcessingQueueName}`);
console.log(`- Processing Depth: ${config.processingDepth}`); 

export { config };
