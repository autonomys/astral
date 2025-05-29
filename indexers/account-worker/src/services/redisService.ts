import Redis from 'ioredis';
import { config } from '../config';
import { AccountProcessingTask } from '../interfaces';

let redisClient: Redis;

const connectRedis = async (): Promise<void> => {
  if (redisClient) {
    console.log('Redis already connected.');
    return;
  }
  try {
    redisClient = new Redis(config.redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      // TODO: Add other options as needed, e.g., for TLS, password, etc.
    });

    const _connect = await redisClient.connect();
    console.log('Connected to Redis successfully.');

    redisClient.on('error', (err) => {
      console.error('Redis connection error:', err);
      // TODO: Implement more robust error handling/reconnection logic if needed
    });

    redisClient.on('close', () => {
      console.log('Redis connection closed.');
    });

    redisClient.on('reconnecting', () => {
      console.log('Redis reconnecting...');
    });

  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    throw error;
  }
}

const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit();
    // redisClient = null; // Dereference, but ioredis might handle this internally upon quit
    console.log('Disconnected from Redis.');
  }
}

/**
 * Fetches a task from the account processing queue.
 * Uses RPOPLPUSH to move the task to a temporary processing list for reliability.
 * If processing fails, the task can be moved back to the main queue from the processing list.
 * For simplicity here, I just use LPOP for now (less reliable if worker crashes).
 */
const fetchTaskFromQueue = async (): Promise<AccountProcessingTask | null> => {
  if (!redisClient) {
    throw new Error('Redis client not initialized. Call connectRedis() first.');
  }
  try {
    const taskString = await redisClient.lpop(config.accountProcessingQueueName);
    if (taskString) {
      return JSON.parse(taskString) as AccountProcessingTask;
    }
    return null;
  } catch (error) {
    console.error('Error fetching task from Redis queue:', error);
    return null;
  }
}

/**
 * Fetches multiple tasks from the account processing queue for batch processing.
 * Uses LPOP to get up to batchSize tasks at once.
 */
const fetchTasksFromQueue = async (batchSize: number = 10): Promise<AccountProcessingTask[]> => {
  if (!redisClient) {
    throw new Error('Redis client not initialized. Call connectRedis() first.');
  }
  try {
    const tasks: AccountProcessingTask[] = [];
    
    // Use pipeline for better performance
    const pipeline = redisClient.pipeline();
    for (let i = 0; i < batchSize; i++) {
      pipeline.lpop(config.accountProcessingQueueName);
    }
    
    const results = await pipeline.exec();
    if (results) {
      for (const [error, taskString] of results) {
        if (!error && taskString) {
          try {
            tasks.push(JSON.parse(taskString as string) as AccountProcessingTask);
          } catch (parseError) {
            console.error('Error parsing task from Redis:', parseError);
          }
        }
      }
    }
    
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks from Redis queue:', error);
    return [];
  }
}

export {
  connectRedis,
  disconnectRedis,
  fetchTaskFromQueue,
  fetchTasksFromQueue
};
