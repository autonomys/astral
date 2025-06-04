import { config } from './config';
import { AccountProcessingTask } from './interfaces';
import { connectAutonomysApi, disconnectAutonomysApi } from './services/autonomysService';
import { connectDb, disconnectDb, ensureDbConnection } from './services/dbService';
import { connectRedis, disconnectRedis, fetchTasksFromQueue } from './services/redisService';
import { processBatchTasks, refreshChainHeadHeight } from './worker';

let isShuttingDown = false;
let mainLoopInterval: NodeJS.Timeout | null = null;
let chainHeadPollInterval: NodeJS.Timeout | null = null;
let dbHealthCheckInterval: NodeJS.Timeout | null = null;

const main = async () => {
  console.log('Starting Account Worker with Batch Processing...');

  try {
    const _connectRedis = await connectRedis();
    const _connectDb = await connectDb();
    const _connectAutonomysApi = await connectAutonomysApi();

    const _refreshChainHeadHeight = await refreshChainHeadHeight();

    // Start periodic polling for chain head height
    if (config.chainHeadPollIntervalMs > 0) {
        chainHeadPollInterval = setInterval(async () => {
            if (isShuttingDown) return;
            const _refreshChainHeadHeight = await refreshChainHeadHeight();
        }, config.chainHeadPollIntervalMs);
    }

    // Start periodic database health checks (every 30 seconds)
    dbHealthCheckInterval = setInterval(async () => {
      if (isShuttingDown) return;
      try {
        await ensureDbConnection();
      } catch (error) {
        console.error('Worker: Database health check failed:', error);
      }
    }, config.dbHealthCheckIntervalMs); // Use config value

    // Start main processing loop with batch processing
    console.log(`Worker: Starting batch queue processing. Batch size: ${config.batchSize}, Interval: ${config.queueProcessingIntervalMs}ms`);
    
    mainLoopInterval = setInterval(async () => {
      if (isShuttingDown) return;
      try {
        // Ensure database connection is healthy before processing
        await ensureDbConnection();
        
        // Fetch batch of tasks
        const tasks: AccountProcessingTask[] = await fetchTasksFromQueue(config.batchSize);
        
        if (tasks.length > 0) {
          const successCount = await processBatchTasks(tasks);
          console.log(`Worker: Processed batch of ${tasks.length} tasks, ${successCount} successful updates`);
        } else {
          console.log('Worker: No tasks in queue.');
        }
      } catch (loopError) {
        console.error('Worker: Error in main processing loop:', loopError);
      }
    }, config.queueProcessingIntervalMs);

  } catch (error) {
    console.error('Worker: Failed to initialize or critical error during startup:', error);
    await shutdown(1);
  }
}

const shutdown = async (exitCode = 0) => {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log('Worker: Shutting down...');

  if (mainLoopInterval) {
    clearInterval(mainLoopInterval);
  }
  if (chainHeadPollInterval) {
    clearInterval(chainHeadPollInterval);
  }
  if (dbHealthCheckInterval) {
    clearInterval(dbHealthCheckInterval);
  }

  // Gracefully disconnect services
  const _disconnectAutonomysApi = await disconnectAutonomysApi();
  const _disconnectRedis = await disconnectRedis();
  const _disconnectDb = await disconnectDb();

  console.log('Worker: Shutdown complete.');
  process.exit(exitCode);
}

// Handle graceful shutdown signals
process.on('SIGTERM', () => shutdown(0));
process.on('SIGINT', () => shutdown(0));

main().catch(async (err) => {
    console.error("Worker: Unhandled error in main execution:", err);
    await shutdown(1);
});
