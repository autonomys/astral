import { PoolClient } from "pg";
import { config } from "../config";
import { NominatorsUnlockedTask } from "../interfaces";
import * as dbService from "../services/database";
import { SHARES_CALCULATION_MULTIPLIER } from "../utils/constant";
import { monitor } from "../utils/monitoring";
import { processInParallel, retryWithBackoff } from "../utils/parallel";

/**
 * Process a batch of nominators unlocked tasks
 */
export const processNominatorsUnlockedBatch = async (tasks: NominatorsUnlockedTask[]): Promise<number> => {
  const batchId = `nominators-unlocked-${Date.now()}`;
  const parallelism = Math.floor(config.dbPoolSize * 0.6);
  
  monitor.startBatch(batchId, 'nominators-unlocked', tasks.length, parallelism);
  
  // Process nominators unlocked events in parallel
  const results = await processInParallel(
    tasks,
    async (task) => {
      try {
        await retryWithBackoff(async () => {
          await dbService.withTransaction(async (client: PoolClient) => {
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
  const operatorInfo = await dbService.getOperatorDeregistrationInfo(operatorId, client);
  
  if (!operatorInfo || !operatorInfo.unlockBlock || !operatorInfo.deregistrationEpoch) {
    console.error(`Operator ${operatorId} deregistration info not found or incomplete`);
    // Mark as processed anyway to avoid stuck events
    await dbService.markNominatorsUnlockedEventAsProcessed(eventId, client);
    return;
  }
  
  // Fetch the nominator's current state
  const nominator = await dbService.fetchNominatorForUnlock(address, operatorId, domainId, client);
  
  if (!nominator) {
    console.warn(`Nominator ${address} not found for operator ${operatorId}`);
    // It's possible the nominator doesn't exist in our table yet if they never had deposits converted
    // Mark as processed to avoid stuck events
    await dbService.markNominatorsUnlockedEventAsProcessed(eventId, client);
    return;
  }
  
  // Get the share price at the deregistration epoch
  const sharePrice = await dbService.getEpochSharePrice(operatorId, domainId, operatorInfo.deregistrationEpoch, client);
  
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
  await dbService.updateNominatorForOperatorDeregistration(
    nominator.id,
    operatorInfo.unlockBlock,
    amount.toString(),
    knownStorageFee.toString(),
    client
  );
  
  // Mark the event as processed
  await dbService.markNominatorsUnlockedEventAsProcessed(eventId, client);
  
  console.log(`Successfully processed nominator unlocked for ${address} on operator ${operatorId}`);
};