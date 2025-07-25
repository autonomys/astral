import { config } from '../config';
import * as core from '../core';
import {
  DepositTask,
  NominatorsUnlockedTask,
  StakingProcessingTask,
  UnlockTask,
  WithdrawalTask,
} from '../interfaces';
import { monitor } from '../utils/monitoring';

/**
 * Process a batch of staking tasks
 */
export const processBatchTasks = async (tasks: StakingProcessingTask[]): Promise<number> => {
  console.log(`Processing ${tasks.length} staking tasks...`);

  const batchId = `batch-${Date.now()}`;
  monitor.startBatch(batchId, 'all-tasks', tasks.length, config.dbPoolSize);

  let successCount = 0;

  // Group tasks by type for batch processing
  const depositTasks = tasks.filter((t) => t.type === 'deposit') as DepositTask[];
  const withdrawalTasks = tasks.filter((t) => t.type === 'withdrawal') as WithdrawalTask[];
  const unlockTasks = tasks.filter((t) => t.type === 'unlock') as UnlockTask[];
  const nominatorsUnlockedTasks = tasks.filter(
    (t) => t.type === 'nominators-unlocked',
  ) as NominatorsUnlockedTask[];

  // Group operator tasks by operatorId for consolidated processing
  const operatorTasks = tasks.filter(
    (t) =>
      t.type === 'operator-registration' ||
      t.type === 'operator-reward' ||
      t.type === 'operator-tax' ||
      t.type === 'bundle-submission' ||
      t.type === 'operator-deregistration',
  );

  // Process different task types in parallel
  const results = await Promise.all([
    depositTasks.length > 0 ? core.processDepositBatch(depositTasks) : Promise.resolve(0),
    withdrawalTasks.length > 0 ? core.processWithdrawalBatch(withdrawalTasks) : Promise.resolve(0),
    unlockTasks.length > 0 ? core.processUnlockBatch(unlockTasks) : Promise.resolve(0),
    operatorTasks.length > 0 ? core.processOperatorTasksBatch(operatorTasks) : Promise.resolve(0),
    nominatorsUnlockedTasks.length > 0
      ? core.processNominatorsUnlockedBatch(nominatorsUnlockedTasks)
      : Promise.resolve(0),
  ]);

  successCount = results.reduce((sum: number, count: number) => sum + count, 0);

  monitor.endBatch(batchId, successCount);

  // Log current statistics periodically
  if (Math.random() < 0.1) {
    // 10% chance to log stats
    console.log('Current processing statistics:', monitor.getStats());
  }

  return successCount;
};
