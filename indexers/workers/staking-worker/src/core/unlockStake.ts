import { PoolClient } from 'pg';
import { config } from '../config';
import { UnlockTask } from '../interfaces';
import * as dbService from '../services/database';
import { monitor } from '../utils/monitoring';
import { processInParallel, retryWithBackoff } from '../utils/parallel';

/**
 * Process a batch of unlock tasks in parallel
 */
export const processUnlockBatch = async (tasks: UnlockTask[]): Promise<number> => {
  const batchId = `unlocks-${Date.now()}`;
  const parallelism = Math.floor(config.dbPoolSize * 0.6);

  monitor.startBatch(batchId, 'unlocks', tasks.length, parallelism);

  // Sort unlocks with same strategy for consistency
  const sortedTasks = [...tasks].sort((a, b) => {
    const operatorCompare = a.operatorId.localeCompare(b.operatorId);
    if (operatorCompare !== 0) return operatorCompare;
    const domainCompare = a.domainId.localeCompare(b.domainId);
    if (domainCompare !== 0) return domainCompare;
    return a.address.localeCompare(b.address);
  });

  // Process unlocks in parallel with concurrency limit
  const results = await processInParallel(
    sortedTasks,
    async (task) => {
      try {
        await retryWithBackoff(async () => {
          await dbService.withTransaction(async (client: PoolClient) => {
            await processUnlockClaim(task, client);
          });
        });
        return true;
      } catch (error) {
        console.error(`Failed to process unlock ${task.eventId}:`, error);
        if (error instanceof Error && 'code' in error) {
          console.error(
            `Database error code: ${(error as any).code}, detail: ${(error as any).detail}`,
          );
        }
        return false;
      }
    },
    parallelism,
  );

  const successCount = results.filter((success) => success).length;
  monitor.endBatch(batchId, successCount);

  return successCount;
};

/**
 * Process individual unlock claim
 */
const processUnlockClaim = async (task: UnlockTask, client: PoolClient): Promise<void> => {
  const nominatorId = `${task.address}-${task.domainId}-${task.operatorId}`;

  console.log(
    `Processing unlock claim for nominator ${nominatorId}: amount=${task.amount}, storageFee=${task.storageFee}`,
  );

  // Update nominator with claimed amounts
  await dbService.updateNominatorAfterUnlock(nominatorId, task.amount, task.storageFee, client);

  // Mark the unlock event as processed
  await dbService.markUnlockAsProcessed(task.eventId, client);

  console.log(`Successfully processed unlock for nominator ${nominatorId}`);
};
