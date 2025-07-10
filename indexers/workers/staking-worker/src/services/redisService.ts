import Redis from 'ioredis';
import { config } from '../config';

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
export const cacheDomainEpoch = async (
  domainId: string,
  epoch: number,
  data: any,
): Promise<void> => {
  const key = `staking:domain:${domainId}:epoch:${epoch}`;
  await cacheData(key, data, 3600); // Cache for 1 hour
};

/**
 * Get cached domain epoch data
 */
export const getCachedDomainEpoch = async (
  domainId: string,
  epoch: number,
): Promise<any | null> => {
  const key = `staking:domain:${domainId}:epoch:${epoch}`;
  return getCachedData(key);
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
