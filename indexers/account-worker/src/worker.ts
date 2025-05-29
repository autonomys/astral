import { config } from './config';
import { AccountHistoryUpdateData, AccountProcessingTask } from './interfaces';
import { getCurrentChainHeight, getMultipleAccountsDataAtBlock } from './services/autonomysService';
import { batchUpdateAccountHistories } from './services/dbService';

let currentChainHeight: number = 0;

/**
 * Refreshes the current chain head height for depth checking.
 */
const refreshChainHeadHeight = async (): Promise<void> => {
  try {
    currentChainHeight = await getCurrentChainHeight();
    console.log(`Worker: Updated chain head height to ${currentChainHeight}`);
  } catch (error) {
    console.error('Worker: Failed to refresh chain head height:', error);
  }
}

/**
 * Processes multiple tasks in batches for better performance.
 * Groups tasks by blockHash to optimize API calls.
 */
const processBatchTasks = async (tasks: AccountProcessingTask[]): Promise<number> => {
  if (tasks.length === 0) return 0;

  const startTime = Date.now();
  console.log(`Worker: Processing batch of ${tasks.length} tasks`);

  // Filter tasks by processing depth
  const validTasks = tasks.filter(task => {
    const blockDepth = currentChainHeight - task.blockHeight;
    if (blockDepth < config.processingDepth) {
      console.log(`Worker: Skipping task for block ${task.blockHeight} (depth: ${blockDepth}, required: ${config.processingDepth})`);
      return false;
    }
    return true;
  });

  if (validTasks.length === 0) {
    console.log('Worker: No valid tasks to process (all too recent)');
    return 0;
  }

  // Group tasks by blockHash for efficient API usage
  const tasksByBlock = new Map<string, AccountProcessingTask[]>();
  for (const task of validTasks) {
    if (!tasksByBlock.has(task.blockHash)) {
      tasksByBlock.set(task.blockHash, []);
    }
    tasksByBlock.get(task.blockHash)!.push(task);
  }

  console.log(`Worker: Processing ${validTasks.length} tasks across ${tasksByBlock.size} blocks`);

  const allUpdates: AccountHistoryUpdateData[] = [];

  // Process each block's tasks
  for (const [blockHash, blockTasks] of tasksByBlock.entries()) {
    try {
      const addresses = blockTasks.map(task => task.address);
      console.log(`Worker: Fetching ${addresses.length} accounts at block ${blockHash}`);

      // Batch fetch account data for this block
      const accountsData = await getMultipleAccountsDataAtBlock(addresses, blockHash);

      // Prepare database updates
      for (const task of blockTasks) {
        const accountData = accountsData.get(task.address);
        
        if (accountData) {
          const free = BigInt(accountData.data.free.toString());
          const reserved = BigInt(accountData.data.reserved.toString());
          const total = free + reserved;

          allUpdates.push({
            id: task.address,
            nonce: BigInt(accountData.nonce.toString()),
            free,
            reserved,
            total,
            eventBlockNumber: task.blockHeight
          });
        } else {
          console.warn(`Worker: No account data found for ${task.address} at block ${blockHash}`);
        }
      }
    } catch (error) {
      console.error(`Worker: Error processing block ${blockHash}:`, error);
      // Continue with other blocks even if one fails
    }
  }

  // Batch update database
  let successCount = 0;
  if (allUpdates.length > 0) {
    try {
      successCount = await batchUpdateAccountHistories(allUpdates);
    } catch (error) {
      console.error('Worker: Batch database update failed:', error);
    }
  }

  const duration = Date.now() - startTime;
  console.log(`Worker: Batch processing completed in ${duration}ms. Updated ${successCount}/${validTasks.length} accounts`);
  
  return successCount;
}

export {
  processBatchTasks,
  refreshChainHeadHeight
};
