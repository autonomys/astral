import { accountsToProcess } from "./mappingHandlers";

// TEMPORARY IMPLEMENTATION OF REDIS HERE
// Had some problem with using redis pkg in worker thread - using child process to avoid worker thread fd issues
// Separate Redis publishing function that runs outside worker context


const publishAccountsToRedis = async () => {
  if (accountsToProcess.size === 0) return;
  
  // Use child process to avoid worker thread issues with Redis fd
  try {
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);
    
    const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
    const queueName = process.env.ACCOUNT_PROCESSING_QUEUE_NAME || 'account_updates_queue';
    
    // Create tasks data from all blocks
    const tasks: string[] = [];
    for (const [blockNumber, blockData] of accountsToProcess.entries()) {
      for (const address of blockData.addresses) {
        tasks.push(JSON.stringify({
          address,
          blockHeight: blockNumber,
          blockHash: blockData.blockHash,
          timestamp: Date.now()
        }));
      }
    }

    if (tasks.length > 0) {
      const taskData = tasks.map(task => `"${task.replace(/"/g, '\\"')}"`).join(' ');
      const command = `redis-cli -u "${redisUrl}" LPUSH ${queueName} ${taskData}`;
      
      const { stderr } = await execAsync(command);
      if (stderr) {
        throw new Error(stderr);
      }
      
      logger.info(`Published ${tasks.length} account tasks to Redis across ${accountsToProcess.size} blocks`);
      accountsToProcess.clear();
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.warn(`Redis publishing failed (non-critical): ${errorMessage}`);
  }
}

export {
  publishAccountsToRedis
};
