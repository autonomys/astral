import { PoolClient } from 'pg';
import {
  ConversionResult,
  DepositTask,
  StakingProcessingTask,
  UnlockTask,
  WithdrawalTask
} from './interfaces';
import { getChainHead } from './services/autonomysService';
import {
  getEpochSharePrice,
  getNominatorUnlockBlocks,
  markDepositAsProcessed,
  markUnlockAsProcessed,
  markWithdrawalAsProcessed,
  updateNominatorAfterUnlock,
  upsertNominatorAfterDeposit,
  upsertNominatorAfterWithdrawal,
  withTransaction
} from './services/database/dbService';
import { storeChainTip } from './services/redisService';


// Constants for share price calculations
const SHARES_CALCULATION_MULTIPLIER = BigInt('1000000000000000000'); // 10^18

// Current chain height for finality checking
let currentChainHeight = 0;

/**
 * Refresh the current chain head height for finality checking
 */
export const refreshChainHeadHeight = async (): Promise<void> => {
  try {
    currentChainHeight = Number(await getChainHead());
    
    // Store in Redis for distributed access
    await storeChainTip(currentChainHeight);
    
    console.log(`Worker: Updated chain head height to ${currentChainHeight}`);
  } catch (error) {
    console.error('Worker: Failed to refresh chain head height:', error);
  }
};

/**
 * Process a batch of staking tasks
 */
export const processBatchTasks = async (tasks: StakingProcessingTask[]): Promise<number> => {
  console.log(`Processing ${tasks.length} staking tasks...`);
  
  let successCount = 0;
  
  // Group tasks by type for batch processing
  const depositTasks = tasks.filter(t => t.type === 'deposit') as DepositTask[];
  const withdrawalTasks = tasks.filter(t => t.type === 'withdrawal') as WithdrawalTask[];
  const unlockTasks = tasks.filter(t => t.type === 'unlock') as UnlockTask[];
  
  // Process deposits
  if (depositTasks.length > 0) {
    const depositResults = await processDepositBatch(depositTasks);
    successCount += depositResults;
  }
  
  // Process withdrawals
  if (withdrawalTasks.length > 0) {
    const withdrawalResults = await processWithdrawalBatch(withdrawalTasks);
    successCount += withdrawalResults;
  }
  
  // Process unlock events
  if (unlockTasks.length > 0) {
    const unlockResults = await processUnlockBatch(unlockTasks);
    successCount += unlockResults;
  }
  
  return successCount;
};

/**
 * Process a batch of deposit tasks
 */
const processDepositBatch = async (tasks: DepositTask[]): Promise<number> => {
  let successCount = 0;
  
  // Process each deposit in its own transaction for better error isolation
  for (const task of tasks) {
    try {
      await withTransaction(async (client: PoolClient) => {
        const result = await processDepositConversion(task, client);
        if (result.hasConverted) {
          successCount++;
        }
      });
    } catch (error) {
      console.error(`Failed to process deposit ${task.id}:`, error);
      // Log the actual error details for debugging
      if (error instanceof Error && 'code' in error) {
        console.error(`Database error code: ${(error as any).code}, detail: ${(error as any).detail}`);
      }
      // Continue processing other deposits
    }
  }
  
  return successCount;
};

/**
 * Process deposit conversion from pending to known
 */
const processDepositConversion = async (task: DepositTask, client: PoolClient): Promise<ConversionResult> => {  
  
  const nominatorId = `${task.address}-${task.domainId}-${task.operatorId}`;

  const pendingAmount = BigInt(task.pendingAmount);
  
  // Check if share price is available for the pending epoch
  const sharePrice = await getEpochSharePrice(
    task.operatorId,
    task.domainId,
    task.pendingEffectiveDomainEpoch,
    client
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
  await upsertNominatorAfterDeposit(
    nominatorId,
    task.address,
    task.domainId,
    task.operatorId,
    totalKnownShares.toString(),
    totalKnownStorageFeeDeposit.toString(),
    depositAmount.toString(),
    client
  );

  await markDepositAsProcessed(task.id, client);

  return { 
    hasConverted: true
  };
};

/**
 * Process a batch of withdrawal tasks
 */
const processWithdrawalBatch = async (tasks: WithdrawalTask[]): Promise<number> => {
  let successCount = 0;
  
  // Process each withdrawal in its own transaction for better error isolation
  for (const task of tasks) {
    try {
      await withTransaction(async (client: PoolClient) => {
        const result = await processWithdrawalConversion(task, client);
        if (result.hasConverted) {
          successCount++;
        }
      });
    } catch (error) {
      console.error(`Failed to process withdrawal ${task.id}:`, error);
      // Log the actual error details for debugging
      if (error instanceof Error && 'code' in error) {
        console.error(`Database error code: ${(error as any).code}, detail: ${(error as any).detail}`);
      }
      // Continue processing other withdrawals
    }
  }
  
  return successCount;
};

/**
 * Process withdrawal conversion from shares to amount
 */
const processWithdrawalConversion = async (task: WithdrawalTask, client: PoolClient): Promise<ConversionResult> => {

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
      storageFeeRefund: BigInt(task.withdrawalInSharesStorageFeeRefund || '0')
    }
  };

  // Check if there are shares to convert
  const newSharesAmount = withdrawalData.withdrawalInShares.shares;

  if (newSharesAmount === BigInt(0)) {
      // Update nominator with all withdrawals
    await upsertNominatorAfterWithdrawal(
      nominatorId,
      task.address,
      task.domainId,
      task.operatorId,
      withdrawalData.totalWithdrawalAmount.toString(),
      withdrawalData.totalStorageFeeWithdrawal.toString(),
      withdrawalData.withdrawals.map((w: any) => ({
        block: w.unlockAtConfirmedDomainBlockNumber.toString(),
        amount: w.amountToUnlock.toString(),
        storageFeeRefund: w.storageFeeRefund.toString()
      })),
      client
    );

    // Mark withdrawal as processed
    await markWithdrawalAsProcessed(task.id, client);

    return { 
      hasConverted: true
    };
  }
  // Step 1: Convert the amount of shares with the epoch number
  const sharePrice = await getEpochSharePrice(
    task.operatorId,
    task.domainId,
    withdrawalData.withdrawalInShares.domainEpoch,
    client
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
    unlockAtConfirmedDomainBlockNumber: withdrawalData.withdrawalInShares.unlockAtConfirmedDomainBlockNumber,
    amountToUnlock: amountToUnlock.toString(),
    storageFeeRefund: withdrawalData.withdrawalInShares.storageFeeRefund.toString()
  };

  // Add to withdrawals array
  const updatedWithdrawals = [...withdrawalData.withdrawals, newWithdrawalEntry];

  // Step 3: Update totalWithdrawalAmount
  const updatedTotalWithdrawalAmount = withdrawalData.totalWithdrawalAmount + amountToUnlock;
  

  
  // Convert the updated withdrawals to unlock blocks format for nominator
  const unlockBlocks = updatedWithdrawals.map((w: any) => ({
    block: w.unlockAtConfirmedDomainBlockNumber.toString(),
    amount: w.amountToUnlock.toString(),
    storageFeeRefund: w.storageFeeRefund.toString()
  }));

  // Update nominator with all withdrawals
  await upsertNominatorAfterWithdrawal(
    nominatorId,
    task.address,
    task.domainId,
    task.operatorId,
    updatedTotalWithdrawalAmount.toString(),
    withdrawalData.totalStorageFeeWithdrawal.toString(),
    unlockBlocks,
    client
  );

  // Mark withdrawal as processed
  await markWithdrawalAsProcessed(task.id, client);

  return { 
    hasConverted: true
  };
};

/**
 * Process a batch of unlock tasks
 */
const processUnlockBatch = async (tasks: UnlockTask[]): Promise<number> => {
  let successCount = 0;
  
  // Process each unlock in its own transaction for better error isolation
  for (const task of tasks) {
    try {
      await withTransaction(async (client: PoolClient) => {
        await processUnlockClaim(task, client);
        successCount++;
      });
    } catch (error) {
      console.error(`Failed to process unlock ${task.eventId}:`, error);
      // Log the actual error details for debugging
      if (error instanceof Error && 'code' in error) {
        console.error(`Database error code: ${(error as any).code}, detail: ${(error as any).detail}`);
      }
      // Continue processing other unlocks
    }
  }
  
  return successCount;
};

/**
 * Process individual unlock claim
 */
const processUnlockClaim = async (task: UnlockTask, client: PoolClient): Promise<void> => {
  const nominatorId = `${task.address}-${task.domainId}-${task.operatorId}`;
  
  console.log(`Processing unlock claim for nominator ${nominatorId}: amount=${task.amount}, storageFee=${task.storageFee}`);
  
  // Update nominator with claimed amounts
  await updateNominatorAfterUnlock(
    nominatorId,
    task.amount,
    task.storageFee,
    client
  );
  
  // Mark the unlock event as processed
  await markUnlockAsProcessed(task.eventId, client);
  
  console.log(`Successfully processed unlock for nominator ${nominatorId}`);
};



