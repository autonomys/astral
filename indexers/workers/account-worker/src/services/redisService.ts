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
};

const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit();
    // redisClient = null; // Dereference, but ioredis might handle this internally upon quit
    console.log('Disconnected from Redis.');
  }
};

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
};

/**
 * Pushes tasks back to the queue for later processing.
 * Uses RPUSH to add tasks to the end of the queue.
 */
const pushTasksToQueue = async (tasks: AccountProcessingTask[]): Promise<number> => {
  if (!redisClient) {
    throw new Error('Redis client not initialized. Call connectRedis() first.');
  }

  if (tasks.length === 0) {
    return 0;
  }

  try {
    // Serialize tasks
    const serializedTasks = tasks.map((task) => JSON.stringify(task));

    // Use pipeline for better performance with batches
    const pipeline = redisClient.pipeline();

    const BATCH_SIZE = 50;
    for (let i = 0; i < serializedTasks.length; i += BATCH_SIZE) {
      const batch = serializedTasks.slice(i, i + BATCH_SIZE);
      pipeline.rpush(config.accountProcessingQueueName, ...batch);
    }

    const results = await pipeline.exec();

    let pushedCount = 0;
    if (results) {
      for (const [error] of results) {
        if (!error) {
          pushedCount += BATCH_SIZE;
        }
      }
    }

    const actualPushed = Math.min(pushedCount, tasks.length);
    console.log(`Worker: Re-queued ${actualPushed} tasks to Redis for later processing`);
    return actualPushed;
  } catch (error) {
    console.error('Error pushing tasks back to Redis queue:', error);
    return 0;
  }
};

export { connectRedis, disconnectRedis, fetchTasksFromQueue, pushTasksToQueue };
