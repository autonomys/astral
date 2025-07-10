import { PoolClient } from 'pg';
import { config } from '../config';
import { ConversionResult, WithdrawalTask } from '../interfaces';
import * as dbService from '../services/database';
import { SHARES_CALCULATION_MULTIPLIER } from '../utils/constant';
import { monitor } from '../utils/monitoring';
import { processInParallel, retryWithBackoff } from '../utils/parallel';

/**
 * Process a batch of withdrawal tasks in parallel
 */
export const processWithdrawalBatch = async (tasks: WithdrawalTask[]): Promise<number> => {
  const batchId = `withdrawals-${Date.now()}`;
  const parallelism = Math.floor(config.dbPoolSize * 0.6);

  monitor.startBatch(batchId, 'withdrawals', tasks.length, parallelism);

  // Sort withdrawals with same strategy as deposits for consistency
  const sortedTasks = [...tasks].sort((a, b) => {
    const operatorCompare = a.operatorId.localeCompare(b.operatorId);
    if (operatorCompare !== 0) return operatorCompare;
    const domainCompare = a.domainId.localeCompare(b.domainId);
    if (domainCompare !== 0) return domainCompare;
    return a.address.localeCompare(b.address);
  });

  // Process withdrawals in parallel with concurrency limit
  const results = await processInParallel(
    sortedTasks,
    async (task) => {
      try {
        return await retryWithBackoff(async () => {
          return await dbService.withTransaction(async (client: PoolClient) => {
            return await processWithdrawalConversion(task, client);
          });
        });
      } catch (error) {
        console.error(`Failed to process withdrawal ${task.id}:`, error);
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
 * Process withdrawal conversion from shares to amount
 */
const processWithdrawalConversion = async (
  task: WithdrawalTask,
  client: PoolClient,
): Promise<ConversionResult> => {
  /*
      each withdrawal entry in the database will be in the following format:
      {
        totalWithdrawalAmount: 1,600,022,075,474,813,470
        totalStorageFeeWithdrawal: 698,484,970,837,929,109
        withdrawals: [
          {
            unlockAtConfirmedDomainBlockNumber: 1,383,476
            amountToUnlock: 1,600,022,075,474,813,470
            storageFeeRefund: 399,122,776,157,064,938
          }
        ]
        withdrawalInShares: {
          domainEpoch: [
            0
            14,198
          ]
          unlockAtConfirmedDomainBlockNumber: 1,434,070
          shares: 728,815,124,400,000,000
          storageFeeRefund: 299,362,194,680,864,171
        }
      }
    
      This means the new withdrawal is in the withdrawalInShares.shares field.
      The previous withdrawals are in the withdrawals field.
      HOWEVER, the totalStorageFeeWithdrawal is the sum of the storageFeeRefunds in the withdrawals field and the withdrawalInShares.storageFeeRefund field.

      We should perform following steps:
      1. Convert the amount of shares in withdrawalInShares with the epoch number
      2. Add the new entry in the same format of withdrawals field
      3. Update totalWithdrawalAmount

      
    */
  // For now, let's use the existing nominator update approach
  const nominatorId = `${task.address}-${task.domainId}-${task.operatorId}`;
  // Parse the withdrawal data
  const withdrawalData = {
    totalWithdrawalAmount: BigInt(task.totalWithdrawalAmount || '0'),
    totalStorageFeeWithdrawal: BigInt(task.totalStorageFeeWithdrawal || '0'),
    withdrawals: JSON.parse(task.withdrawalsJson || '[]'),
    withdrawalInShares: {
      domainEpoch: task.withdrawalInSharesDomainEpoch,
      unlockAtConfirmedDomainBlockNumber: task.withdrawalInSharesUnlockBlock,
      shares: BigInt(task.withdrawalInSharesAmount || '0'),
      storageFeeRefund: BigInt(task.withdrawalInSharesStorageFeeRefund || '0'),
    },
  };

  // Check if there are shares to convert
  const newSharesAmount = withdrawalData.withdrawalInShares.shares;

  if (newSharesAmount === BigInt(0)) {
    // Update nominator with all withdrawals
    await dbService.upsertNominatorAfterWithdrawal(
      nominatorId,
      task.address,
      task.domainId,
      task.operatorId,
      withdrawalData.totalWithdrawalAmount.toString(),
      withdrawalData.totalStorageFeeWithdrawal.toString(),
      withdrawalData.withdrawals.map((w: any) => ({
        block: w.unlockAtConfirmedDomainBlockNumber.toString(),
        amount: w.amountToUnlock.toString(),
        storageFeeRefund: w.storageFeeRefund.toString(),
      })),
      '0', // No new shares withdrawn in this case
      client,
    );

    // Mark withdrawal as processed
    await dbService.markWithdrawalAsProcessed(task.id, client);

    return {
      hasConverted: true,
    };
  }
  // Step 1: Convert the amount of shares with the epoch number
  const sharePrice = await dbService.getEpochSharePrice(
    task.operatorId,
    task.domainId,
    withdrawalData.withdrawalInShares.domainEpoch,
    client,
  );

  if (!sharePrice) {
    console.log(`Share price not available yet for withdrawal ${task.id},
      epoch ${withdrawalData.withdrawalInShares.domainEpoch},
      operator ${task.operatorId},
      domain ${task.domainId}`);
    return { hasConverted: false };
  }

  // Convert shares to amount
  const amountToUnlock = (newSharesAmount * BigInt(sharePrice)) / SHARES_CALCULATION_MULTIPLIER;

  // Step 2: Add the new entry in the same format as withdrawals field
  const newWithdrawalEntry = {
    unlockAtConfirmedDomainBlockNumber:
      withdrawalData.withdrawalInShares.unlockAtConfirmedDomainBlockNumber,
    amountToUnlock: amountToUnlock.toString(),
    storageFeeRefund: withdrawalData.withdrawalInShares.storageFeeRefund.toString(),
  };

  // Add to withdrawals array
  const updatedWithdrawals = [...withdrawalData.withdrawals, newWithdrawalEntry];

  // Step 3: Update totalWithdrawalAmount
  const updatedTotalWithdrawalAmount = withdrawalData.totalWithdrawalAmount + amountToUnlock;

  // Convert the updated withdrawals to unlock blocks format for nominator
  const unlockBlocks = updatedWithdrawals.map((w: any) => ({
    block: w.unlockAtConfirmedDomainBlockNumber.toString(),
    amount: w.amountToUnlock.toString(),
    storageFeeRefund: w.storageFeeRefund.toString(),
  }));

  // Update nominator with all withdrawals
  await dbService.upsertNominatorAfterWithdrawal(
    nominatorId,
    task.address,
    task.domainId,
    task.operatorId,
    updatedTotalWithdrawalAmount.toString(),
    withdrawalData.totalStorageFeeWithdrawal.toString(),
    unlockBlocks,
    newSharesAmount.toString(), // Track the shares being withdrawn
    client,
  );

  // Mark withdrawal as processed
  await dbService.markWithdrawalAsProcessed(task.id, client);

  return {
    hasConverted: true,
  };
};
