import { config, validateConfig } from './config';
import { StakingProcessingTask } from './interfaces';
import { connectAutonomysApi, disconnectAutonomysApi } from './services/autonomysService';
import { connectDb, disconnectDb, ensureDbConnection } from './services/dbService';
import { connectRedis, disconnectRedis, fetchTasksFromQueue } from './services/redisService';
import { checkEpochTransitions, processBatchTasks } from './worker';

let isShuttingDown = false;
let mainLoopInterval: NodeJS.Timeout | null = null;
let chainHeadPollInterval: NodeJS.Timeout | null = null;
let dbHealthCheckInterval: NodeJS.Timeout | null = null;
let epochCheckInterval: NodeJS.Timeout | null = null;

const main = async () => {
  console.log('Starting Staking Worker with Batch Processing...');

  try {
    // Validate configuration
    validateConfig();

    // Initialize connections
    await connectRedis();
    await connectDb();
    await connectAutonomysApi();

    // Start periodic polling for chain head height
    if (config.chainHeadPollIntervalMs > 0) {
      chainHeadPollInterval = setInterval(async () => {
        if (isShuttingDown) return;
      }, config.chainHeadPollIntervalMs);
    }

    // Start periodic database health checks
    dbHealthCheckInterval = setInterval(async () => {
      if (isShuttingDown) return;
      try {
        await ensureDbConnection();
      } catch (error) {
        console.error('Worker: Database health check failed:', error);
      }
    }, config.dbHealthCheckIntervalMs);

    // Start periodic epoch transition checks for staking
    if (config.epochTransitionCheckIntervalMs > 0) {
      epochCheckInterval = setInterval(async () => {
        if (isShuttingDown) return;
        try {
          await checkEpochTransitions();
        } catch (error) {
          console.error('Worker: Epoch transition check failed:', error);
        }
      }, config.epochTransitionCheckIntervalMs);
    }

    // Start main processing loop with batch processing
    console.log(`Worker: Starting staking batch queue processing. Batch size: ${config.batchSize}, Interval: ${config.queueProcessingIntervalMs}ms`);
    
    mainLoopInterval = setInterval(async () => {
      if (isShuttingDown) return;
      try {
        // Ensure database connection is healthy before processing
        await ensureDbConnection();
        
        // Fetch batch of tasks from different queues
        const tasks: StakingProcessingTask[] = await fetchTasksFromQueue(config.batchSize);
        
        if (tasks.length > 0) {
          const successCount = await processBatchTasks(tasks);
          console.log(`Worker: Processed batch of ${tasks.length} staking tasks, ${successCount} successful updates`);
        } else {
          if (config.enableDebugLogs) {
            console.log('Worker: No staking tasks in queue.');
          }
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
  console.log('Worker: Shutting down staking worker...');

  // Clear all intervals
  if (mainLoopInterval) {
    clearInterval(mainLoopInterval);
  }
  if (chainHeadPollInterval) {
    clearInterval(chainHeadPollInterval);
  }
  if (dbHealthCheckInterval) {
    clearInterval(dbHealthCheckInterval);
  }
  if (epochCheckInterval) {
    clearInterval(epochCheckInterval);
  }

  // Gracefully disconnect services
  await disconnectAutonomysApi();
  await disconnectRedis();
  await disconnectDb();

  console.log('Worker: Staking worker shutdown complete.');
  process.exit(exitCode);
}

// Handle graceful shutdown signals
process.on('SIGTERM', () => shutdown(0));
process.on('SIGINT', () => shutdown(0));

// Handle uncaught errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('Worker: Unhandled Rejection at:', promise, 'reason:', reason);
  shutdown(1);
});

main().catch(async (err) => {
  console.error("Worker: Unhandled error in main execution:", err);
  await shutdown(1);
}); 