import Redis from 'ioredis';
import { config } from '../config';
import { StakingProcessingTask } from '../interfaces';

let redis: Redis | null = null;

/**
 * Connect to Redis
 */
export const connectRedis = async (): Promise<void> => {
  if (redis) {
    console.log('Redis already connected');
    return;
  }

  redis = new Redis({
    host: config.redisHost,
    port: config.redisPort,
    password: config.redisPassword,
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  });

  redis.on('connect', () => {
    console.log('Redis connected successfully');
  });

  redis.on('error', (error) => {
    console.error('Redis error:', error);
  });

  // Test connection
  try {
    await redis.ping();
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    throw error;
  }
};

/**
 * Disconnect from Redis
 */
export const disconnectRedis = async (): Promise<void> => {
  if (!redis) {
    console.log('No Redis connection to disconnect');
    return;
  }

  try {
    await redis.quit();
    redis = null;
    console.log('Redis disconnected successfully');
  } catch (error) {
    console.error('Error disconnecting from Redis:', error);
    throw error;
  }
};

/**
 * Get Redis client
 */
export const getRedis = (): Redis => {
  if (!redis) {
    throw new Error('Redis not connected');
  }
  return redis;
};

/**
 * Fetch tasks from the staking queue
 */
export const fetchTasksFromQueue = async (batchSize: number): Promise<StakingProcessingTask[]> => {
  if (!redis) {
    throw new Error('Redis not connected');
  }

  const tasks: StakingProcessingTask[] = [];
  
  // TODO: Implement fetching from multiple queues (staking, operator, withdrawal)
  
  console.log(`Fetching up to ${batchSize} tasks from staking queues`);
  
  return tasks;
};

/**
 * Add task to queue
 */
export const addTaskToQueue = async (queueName: string, task: any): Promise<void> => {
  if (!redis) {
    throw new Error('Redis not connected');
  }

  // TODO: Implement adding task to queue
  await redis.rpush(queueName, JSON.stringify(task));
  console.log(`Added task to ${queueName}`);
};

/**
 * Add multiple tasks to queue
 */
export const addTasksToQueue = async (queueName: string, tasks: any[]): Promise<void> => {
  if (!redis) {
    throw new Error('Redis not connected');
  }

  if (tasks.length === 0) return;

  // TODO: Implement batch adding of tasks
  const serializedTasks = tasks.map(task => JSON.stringify(task));
  await redis.rpush(queueName, ...serializedTasks);
  console.log(`Added ${tasks.length} tasks to ${queueName}`);
};

/**
 * Get queue length
 */
export const getQueueLength = async (queueName: string): Promise<number> => {
  if (!redis) {
    throw new Error('Redis not connected');
  }

  return redis.llen(queueName);
};

/**
 * Cache data with expiration
 */
export const cacheData = async (key: string, data: any, ttlSeconds?: number): Promise<void> => {
  if (!redis) {
    throw new Error('Redis not connected');
  }

  const serialized = JSON.stringify(data);
  if (ttlSeconds) {
    await redis.set(key, serialized, 'EX', ttlSeconds);
  } else {
    await redis.set(key, serialized);
  }
};

/**
 * Get cached data
 */
export const getCachedData = async <T>(key: string): Promise<T | null> => {
  if (!redis) {
    throw new Error('Redis not connected');
  }

  const data = await redis.get(key);
  if (!data) return null;

  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error('Failed to parse cached data:', error);
    return null;
  }
};

/**
 * Delete cached data
 */
export const deleteCachedData = async (key: string): Promise<void> => {
  if (!redis) {
    throw new Error('Redis not connected');
  }

  await redis.del(key);
};

/**
 * Cache domain epoch data
 */
export const cacheDomainEpoch = async (domainId: string, epoch: number, data: any): Promise<void> => {
  const key = `staking:domain:${domainId}:epoch:${epoch}`;
  await cacheData(key, data, 3600); // Cache for 1 hour
};

/**
 * Get cached domain epoch data
 */
export const getCachedDomainEpoch = async (domainId: string, epoch: number): Promise<any | null> => {
  const key = `staking:domain:${domainId}:epoch:${epoch}`;
  return getCachedData(key);
};

/**
 * Lock resource for processing
 */
export const acquireLock = async (resource: string, ttlMs: number = 30000): Promise<boolean> => {
  if (!redis) {
    throw new Error('Redis not connected');
  }

  const lockKey = `lock:${resource}`;
  const lockValue = Date.now().toString();
  
  const result = await redis.set(lockKey, lockValue, 'PX', ttlMs, 'NX');
  return result === 'OK';
};

/**
 * Release lock
 */
export const releaseLock = async (resource: string): Promise<void> => {
  if (!redis) {
    throw new Error('Redis not connected');
  }

  const lockKey = `lock:${resource}`;
  await redis.del(lockKey);
};

/**
 * Publish event
 */
export const publishEvent = async (channel: string, event: any): Promise<void> => {
  if (!redis) {
    throw new Error('Redis not connected');
  }

  await redis.publish(channel, JSON.stringify(event));
};

/**
 * Get all keys matching pattern
 */
export const getKeysMatching = async (pattern: string): Promise<string[]> => {
  if (!redis) {
    throw new Error('Redis not connected');
  }

  return redis.keys(pattern);
};

/**
 * Store the current chain tip (latest block height)
 */
export const storeChainTip = async (blockHeight: number): Promise<void> => {
  const key = 'staking:chain:tip';
  await cacheData(key, { blockHeight, timestamp: Date.now() }, 300); // Cache for 5 minutes
};

/**
 * Get the current chain tip
 */
export const getChainTip = async (): Promise<number | null> => {
  const key = 'staking:chain:tip';
  const data = await getCachedData<{ blockHeight: number; timestamp: number }>(key);
  return data ? data.blockHeight : null;
};