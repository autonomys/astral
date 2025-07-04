import { PoolClient } from 'pg';
import { config } from './config';
import {
  BundleSubmissionTask,
  ConversionResult,
  DepositTask,
  NominatorsUnlockedTask,
  OperatorDeregistrationTask,
  OperatorRegistrationTask,
  OperatorRewardTask,
  OperatorTaxCollectionTask,
  OperatorUpdates,
  StakingProcessingTask,
  UnlockTask,
  WithdrawalTask
} from './interfaces';
import { getBlockHash, getChainHead, queryOperatorById } from './services/autonomysService';
import {
  fetchNominatorForUnlock,
  getEpochSharePrice,
  getOperatorDeregistrationInfo,
  markDepositAsProcessed,
  markNominatorsUnlockedEventAsProcessed,
  markOperatorEventsAsProcessed,
  markUnlockAsProcessed,
  markWithdrawalAsProcessed,
  updateNominatorAfterUnlock,
  updateNominatorForOperatorDeregistration,
  upsertNominatorAfterDeposit,
  upsertNominatorAfterWithdrawal,
  upsertOperator,
  withTransaction
} from './services/database/dbService';
import { storeChainTip } from './services/redisService';
import { monitor } from './utils/monitoring';
import { processGroupedInParallel, processInParallel, retryWithBackoff } from './utils/parallel';

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
  
  const batchId = `batch-${Date.now()}`;
  monitor.startBatch(batchId, 'all-tasks', tasks.length, config.dbPoolSize);
  
  let successCount = 0;
  
  // Group tasks by type for batch processing
  const depositTasks = tasks.filter(t => t.type === 'deposit') as DepositTask[];
  const withdrawalTasks = tasks.filter(t => t.type === 'withdrawal') as WithdrawalTask[];
  const unlockTasks = tasks.filter(t => t.type === 'unlock') as UnlockTask[];
  const nominatorsUnlockedTasks = tasks.filter(t => t.type === 'nominators-unlocked') as NominatorsUnlockedTask[];
  
  // Group operator tasks by operatorId for consolidated processing
  const operatorTasks = tasks.filter(t => 
    t.type === 'operator-registration' || 
    t.type === 'operator-reward' || 
    t.type === 'operator-tax' || 
    t.type === 'bundle-submission' || 
    t.type === 'operator-deregistration'
  );
  
  // Process different task types in parallel
  const results = await Promise.all([
    depositTasks.length > 0 ? processDepositBatch(depositTasks) : Promise.resolve(0),
    withdrawalTasks.length > 0 ? processWithdrawalBatch(withdrawalTasks) : Promise.resolve(0),
    unlockTasks.length > 0 ? processUnlockBatch(unlockTasks) : Promise.resolve(0),
    operatorTasks.length > 0 ? processOperatorTasksBatch(operatorTasks) : Promise.resolve(0),
    nominatorsUnlockedTasks.length > 0 ? processNominatorsUnlockedBatch(nominatorsUnlockedTasks) : Promise.resolve(0)
  ]);
  
  successCount = results.reduce((sum: number, count: number) => sum + count, 0);
  
  monitor.endBatch(batchId, successCount);
  
  // Log current statistics periodically
  if (Math.random() < 0.1) { // 10% chance to log stats
    console.log('Current processing statistics:', monitor.getStats());
  }
  
  return successCount;
};

/**
 * Process a batch of deposit tasks in parallel
 */
const processDepositBatch = async (tasks: DepositTask[]): Promise<number> => {
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
          return await withTransaction(async (client: PoolClient) => {
            return await processDepositConversion(task, client);
          });
        });
      } catch (error) {
        console.error(`Failed to process deposit ${task.id}:`, error);
        if (error instanceof Error && 'code' in error) {
          console.error(`Database error code: ${(error as any).code}, detail: ${(error as any).detail}`);
        }
        return { hasConverted: false };
      }
    },
    parallelism
  );
  
  const successCount = results.filter(r => r.hasConverted).length;
  monitor.endBatch(batchId, successCount);
  
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
 * Process a batch of withdrawal tasks in parallel
 */
const processWithdrawalBatch = async (tasks: WithdrawalTask[]): Promise<number> => {
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
          return await withTransaction(async (client: PoolClient) => {
            return await processWithdrawalConversion(task, client);
          });
        });
      } catch (error) {
        console.error(`Failed to process withdrawal ${task.id}:`, error);
        if (error instanceof Error && 'code' in error) {
          console.error(`Database error code: ${(error as any).code}, detail: ${(error as any).detail}`);
        }
        return { hasConverted: false };
      }
    },
    parallelism
  );
  
  const successCount = results.filter(r => r.hasConverted).length;
  monitor.endBatch(batchId, successCount);
  
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
 * Process a batch of unlock tasks in parallel
 */
const processUnlockBatch = async (tasks: UnlockTask[]): Promise<number> => {
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
          await withTransaction(async (client: PoolClient) => {
            await processUnlockClaim(task, client);
          });
        });
        return true;
      } catch (error) {
        console.error(`Failed to process unlock ${task.eventId}:`, error);
        if (error instanceof Error && 'code' in error) {
          console.error(`Database error code: ${(error as any).code}, detail: ${(error as any).detail}`);
        }
        return false;
      }
    },
    parallelism
  );
  
  const successCount = results.filter(success => success).length;
  monitor.endBatch(batchId, successCount);
  
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

/**
 * Process a batch of nominators unlocked tasks
 */
const processNominatorsUnlockedBatch = async (tasks: NominatorsUnlockedTask[]): Promise<number> => {
  const batchId = `nominators-unlocked-${Date.now()}`;
  const parallelism = Math.floor(config.dbPoolSize * 0.6);
  
  monitor.startBatch(batchId, 'nominators-unlocked', tasks.length, parallelism);
  
  // Process nominators unlocked events in parallel
  const results = await processInParallel(
    tasks,
    async (task) => {
      try {
        await retryWithBackoff(async () => {
          await withTransaction(async (client: PoolClient) => {
            await processNominatorUnlocked(task, client);
          });
        });
        return true;
      } catch (error) {
        console.error(`Failed to process nominators unlocked ${task.eventId}:`, error);
        if (error instanceof Error && 'code' in error) {
          console.error(`Database error code: ${(error as any).code}, detail: ${(error as any).detail}`);
        }
        return false;
      }
    },
    parallelism
  );
  
  const successCount = results.filter(success => success).length;
  monitor.endBatch(batchId, successCount);
  
  return successCount;
};

/**
 * Process individual nominator unlocked event (after operator deregistration)
 */
const processNominatorUnlocked = async (task: NominatorsUnlockedTask, client: PoolClient): Promise<void> => {
  const { operatorId, domainId, address, eventId } = task;
  
  console.log(`Processing nominator unlocked for address ${address} on operator ${operatorId} in domain ${domainId}`);
  
  // Get operator deregistration info
  const operatorInfo = await getOperatorDeregistrationInfo(operatorId, client);
  
  if (!operatorInfo || !operatorInfo.unlockBlock || !operatorInfo.deregistrationEpoch) {
    console.error(`Operator ${operatorId} deregistration info not found or incomplete`);
    // Mark as processed anyway to avoid stuck events
    await markNominatorsUnlockedEventAsProcessed(eventId, client);
    return;
  }
  
  // Fetch the nominator's current state
  const nominator = await fetchNominatorForUnlock(address, operatorId, domainId, client);
  
  if (!nominator) {
    console.warn(`Nominator ${address} not found for operator ${operatorId}`);
    // It's possible the nominator doesn't exist in our table yet if they never had deposits converted
    // Mark as processed to avoid stuck events
    await markNominatorsUnlockedEventAsProcessed(eventId, client);
    return;
  }
  
  // Get the share price at the deregistration epoch
  const sharePrice = await getEpochSharePrice(operatorId, domainId, operatorInfo.deregistrationEpoch, client);
  
  if (!sharePrice) {
    console.error(`Share price not available for epoch ${operatorInfo.deregistrationEpoch}, operator ${operatorId}, domain ${domainId}`);
    // Don't mark as processed - we'll retry later when share price is available
    return;
  }
  
  const sharePriceBigInt = BigInt(sharePrice);
  const knownShares = BigInt(nominator.known_shares);
  const knownStorageFee = BigInt(nominator.known_storage_fee_deposit);
  
  // Calculate the amount based on shares and share price
  const amount = (knownShares * sharePriceBigInt) / SHARES_CALCULATION_MULTIPLIER;
  
  console.log(`Updating nominator ${nominator.id} for operator deregistration: shares=${knownShares.toString()}, amount=${amount.toString()}, storageFee=${knownStorageFee.toString()}`);
  
  // Update the nominator with the calculated amount
  await updateNominatorForOperatorDeregistration(
    nominator.id,
    operatorInfo.unlockBlock,
    amount.toString(),
    knownStorageFee.toString(),
    client
  );
  
  // Mark the event as processed
  await markNominatorsUnlockedEventAsProcessed(eventId, client);
  
  console.log(`Successfully processed nominator unlocked for ${address} on operator ${operatorId}`);
};

/**
 * Process a batch of operator tasks using grouped parallel processing
 */
const processOperatorTasksBatch = async (tasks: StakingProcessingTask[]): Promise<number> => {
  // Group tasks by operatorId to avoid conflicts
  const results = await processGroupedInParallel(
    tasks,
    task => task.operatorId, // Group by operatorId
    async (operatorTasks) => {
      // Process all tasks for this operator in a single transaction
      try {
        await retryWithBackoff(async () => {
          await withTransaction(async (client: PoolClient) => {
            await processOperatorTasksInTransaction(
              operatorTasks[0].operatorId,
              operatorTasks,
              client
            );
          });
        });
        return operatorTasks.length;
      } catch (error) {
        console.error(`Failed to process tasks for operator ${operatorTasks[0].operatorId}:`, error);
        if (error instanceof Error && 'code' in error) {
          console.error(`Database error code: ${(error as any).code}, detail: ${(error as any).detail}`);
        }
        return 0;
      }
    },
    Math.floor(config.dbPoolSize * 0.7) // Use 70% of pool for operator tasks
  );
  
  return results.reduce((sum, count) => sum + count, 0);
};

/**
 * Process all tasks for a single operator in one transaction
 */
const processOperatorTasksInTransaction = async (
  operatorId: string,
  tasks: StakingProcessingTask[],
  client: PoolClient
): Promise<void> => {
  console.log(`Processing ${tasks.length} tasks for operator ${operatorId}`);
  
  // Build consolidated update object
  const updates: OperatorUpdates = {
    operatorId
  };
  
  // Track event IDs by type for marking as processed
  const eventIdsByType = {
    registrationIds: [] as string[],
    rewardIds: [] as string[],
    taxCollectionIds: [] as string[],
    bundleSubmissionIds: [] as string[],
    deregistrationIds: [] as string[]
  };
  
  // Aggregate all updates for this operator
  let totalRewards = BigInt(0);
  let totalTax = BigInt(0);
  let bundleCount = 0;
  
  for (const task of tasks) {
    switch (task.type) {
      case 'operator-registration': {
        const regTask = task as OperatorRegistrationTask;
        updates.registration = {
          owner: regTask.owner,
          domainId: regTask.domainId,
          signingKey: regTask.signingKey,
          minimumNominatorStake: regTask.minimumNominatorStake,
          nominationTax: regTask.nominationTax
        };
        eventIdsByType.registrationIds.push(regTask.id);
        console.log(`Including operator registration for operator ${operatorId}`);
        break;
      }
      
      case 'operator-reward': {
        const rewardTask = task as OperatorRewardTask;
        totalRewards += BigInt(rewardTask.amount);
        eventIdsByType.rewardIds.push(rewardTask.id);
        console.log(`Including reward for operator ${operatorId}: amount=${rewardTask.amount}`);
        break;
      }
      
      case 'operator-tax': {
        const taxTask = task as OperatorTaxCollectionTask;
        totalTax += BigInt(taxTask.amount);
        eventIdsByType.taxCollectionIds.push(taxTask.id);
        console.log(`Including tax collection for operator ${operatorId}: amount=${taxTask.amount}`);
        break;
      }
      
      case 'bundle-submission': {
        const bundleTask = task as BundleSubmissionTask;
        bundleCount++;
        eventIdsByType.bundleSubmissionIds.push(bundleTask.id);
        console.log(`Including bundle submission for operator ${operatorId}: bundle=${bundleTask.bundleId}`);
        break;
      }
      
      case 'operator-deregistration': {
        const deregTask = task as OperatorDeregistrationTask;
        updates.deregistered = true;
        
        // Fetch operator data at the block where deregistration happened
        try {
          const blockHash = await getBlockHash(BigInt(deregTask.blockHeight));
          const operatorData = await queryOperatorById(operatorId, blockHash);
          
          if (operatorData && operatorData.partialStatus && operatorData.partialStatus.deregistered) {
            const deregistered = operatorData.partialStatus.deregistered;
            
            // Extract unlock block number
            if (deregistered.unlockAtConfirmedDomainBlockNumber) {
              updates.unlockAtConfirmedDomainBlockNumber = deregistered.unlockAtConfirmedDomainBlockNumber.toString();
              console.log(`Operator ${operatorId} will unlock at domain block ${deregistered.unlockAtConfirmedDomainBlockNumber}`);
            }
            
            // Extract domain epoch (second element of the array)
            if (deregistered.domainEpoch && Array.isArray(deregistered.domainEpoch) && deregistered.domainEpoch.length >= 2) {
              updates.deregistrationDomainEpoch = deregistered.domainEpoch[1].toString();
              console.log(`Operator ${operatorId} deregistered at domain epoch ${deregistered.domainEpoch[1]}`);
            }
          }
        } catch (error) {
          console.error(`Failed to fetch operator data for deregistration ${operatorId}:`, error);
          // Continue processing even if we can't get the unlock block
        }
        
        eventIdsByType.deregistrationIds.push(deregTask.id);
        console.log(`Including deregistration for operator ${operatorId}`);
        break;
      }
    }
  }
  
  // Add aggregated values to updates
  if (totalRewards > 0) {
    updates.totalRewardsToAdd = totalRewards.toString();
  }
  if (totalTax > 0) {
    updates.totalTaxToAdd = totalTax.toString();
  }
  if (bundleCount > 0) {
    updates.bundleCountToAdd = bundleCount;
  }
  
  // Perform the consolidated update
  await upsertOperator(updates, client);
  
  // Mark all events as processed
  await markOperatorEventsAsProcessed(eventIdsByType, client);
  
  console.log(`Successfully processed ${tasks.length} tasks for operator ${operatorId}`);
};