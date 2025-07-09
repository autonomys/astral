import { PoolClient } from 'pg';
import { config } from '../config';
import { ConversionResult, DepositTask } from '../interfaces';
import * as dbService from '../services/database';
import { SHARES_CALCULATION_MULTIPLIER } from '../utils/constant';
import { monitor } from '../utils/monitoring';
import { processInParallel, retryWithBackoff } from '../utils/parallel';

/**
 * Process a batch of deposit tasks in parallel
 */
export const processDepositBatch = async (tasks: DepositTask[]): Promise<number> => {
  const batchId = `deposits-${Date.now()}`;
  const parallelism = Math.floor(config.dbPoolSize * 0.6);

  monitor.startBatch(batchId, 'deposits', tasks.length, parallelism);

  // Sort deposits by operator ID and address to minimize deadlocks
  // IMPORTANT: Consistent ordering prevents deadlocks when multiple transactions
  // try to lock the same rows in different orders
  const sortedTasks = [...tasks].sort((a, b) => {
    // First sort by operatorId
    const operatorCompare = a.operatorId.localeCompare(b.operatorId);
    if (operatorCompare !== 0) return operatorCompare;
    // Then by domainId to ensure consistent ordering across domains
    const domainCompare = a.domainId.localeCompare(b.domainId);
    if (domainCompare !== 0) return domainCompare;
    // Finally by address
    return a.address.localeCompare(b.address);
  });

  // Process deposits in parallel with concurrency limit
  const results = await processInParallel(
    sortedTasks,
    async (task) => {
      try {
        return await retryWithBackoff(async () => {
          return await dbService.withTransaction(async (client: PoolClient) => {
            return await processDepositConversion(task, client);
          });
        });
      } catch (error) {
        console.error(`Failed to process deposit ${task.id}:`, error);
        if (error instanceof Error && 'code' in error) {
          console.error(
            `Database error code: ${(error as any).code}, detail: ${(error as any).detail}`,
          );
        }
        return { hasConverted: false };
      }
    },
    parallelism,
  );

  const successCount = results.filter((r) => r.hasConverted).length;
  monitor.endBatch(batchId, successCount);

  return successCount;
};

/**
 * Process deposit conversion from pending to known
 */
const processDepositConversion = async (
  task: DepositTask,
  client: PoolClient,
): Promise<ConversionResult> => {
  const nominatorId = `${task.address}-${task.domainId}-${task.operatorId}`;

  const pendingAmount = BigInt(task.pendingAmount);

  // Check if share price is available for the pending epoch
  const sharePrice = await dbService.getEpochSharePrice(
    task.operatorId,
    task.domainId,
    task.pendingEffectiveDomainEpoch,
    client,
  );

  if (!sharePrice) {
    console.log(`Share price not available yet for deposit ${task.id},
      epoch ${task.pendingEffectiveDomainEpoch},
      operator ${task.operatorId},
      domain ${task.domainId}`);
    return { hasConverted: false };
  }

  // Convert pending amount to shares
  const newShares = (pendingAmount * SHARES_CALCULATION_MULTIPLIER) / BigInt(sharePrice);
  const newStorageFeeDeposit = BigInt(task.pendingStorageFeeDeposit);

  // Update or create nominator record with the converted values
  const totalKnownShares = BigInt(task.knownShares) + newShares;
  const totalKnownStorageFeeDeposit = BigInt(task.knownStorageFeeDeposit) + newStorageFeeDeposit;

  // Calculate the deposit amount to add (pending_amount + pending_storage_fee_deposit)
  const depositAmount = pendingAmount + newStorageFeeDeposit;

  // Use the dbService function to upsert nominator with incremental deposit amount
  await dbService.upsertNominatorAfterDeposit(
    nominatorId,
    task.address,
    task.domainId,
    task.operatorId,
    totalKnownShares.toString(),
    totalKnownStorageFeeDeposit.toString(),
    depositAmount.toString(),
    client,
  );

  await dbService.markDepositAsProcessed(task.id, client);

  return {
    hasConverted: true,
  };
};
