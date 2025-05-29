import { accountsToProcess } from "./mappingHandlers";

// TEMPORARY IMPLEMENTATION OF REDIS HERE
// Subquery is using Sandbox/VM to run the worker, so we can't use the worker thread to run Redis - Further modification needed to use ioredis lib in worker thread
// Separate Redis publishing function that runs outside worker context

const publishAccountsToRedis = async (blockNumbersToPublish?: number[]) => {
  if (accountsToProcess.size === 0) return;
  
  // Use child process to avoid worker thread issues with Redis fd
  try {
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);
    
    const redisUrl = 'redis://redis:6379';
    const queueName = 'account_updates_queue';
    
    // Create tasks data from specified blocks or all blocks if none specified
    const tasks: string[] = [];
    const blocksToRemove: number[] = [];
    
    for (const [blockNumber, blockData] of accountsToProcess.entries()) {
      // If specific blocks are specified, only process those - It is related to depth number in mappingHandlers.ts
      if (blockNumbersToPublish && !blockNumbersToPublish.includes(blockNumber)) {
        continue;
      }
      
      for (const address of blockData.addresses) {
        tasks.push(JSON.stringify({
          address,
          blockHeight: blockNumber,
          blockHash: blockData.blockHash,
          timestamp: Date.now()
        }));
      }
      
      // Mark this block for removal after successful publishing
      blocksToRemove.push(blockNumber);
    }

    if (tasks.length > 0) {
      // Process tasks in batches to avoid E2BIG error
      // This error happens because Redis has a limit on the number of arguments in a command
      // Once we move to using ioredis lib in worker thread, we can remove this limitation
      const BATCH_SIZE = 50;
      let successCount = 0;
      let errorCount = 0;
      
      for (let i = 0; i < tasks.length; i += BATCH_SIZE) {
        const batch = tasks.slice(i, i + BATCH_SIZE);
        
        try {
          // Create a single LPUSH command for this batch
          const escapedTasks = batch.map(task => `"${task.replace(/"/g, '\\"')}"`).join(' ');
          const command = `redis-cli -u "${redisUrl}" LPUSH ${queueName} ${escapedTasks}`;
          
          const { stderr } = await execAsync(command);
          if (stderr) {
            throw new Error(stderr);
          }
          
          successCount += batch.length;
        } catch (error) {
          errorCount += batch.length;
          logger.warn(`Failed to push batch of ${batch.length} tasks: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
      
      if (successCount > 0) {
        logger.info(`Published ${successCount} account tasks to Redis from ${blocksToRemove.length} blocks`);
        
        // Remove successfully published blocks from the map
        for (const blockNumber of blocksToRemove) {
          accountsToProcess.delete(blockNumber);
        }
      }
      
      if (errorCount > 0) {
        logger.warn(`Failed to publish ${errorCount} tasks to Redis`);
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.warn(`Redis publishing failed (non-critical): ${errorMessage}`);
  }
}

export {
  publishAccountsToRedis
};
