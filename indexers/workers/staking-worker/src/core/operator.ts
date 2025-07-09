import { PoolClient } from 'pg';
import { config } from '../config';
import {
  BundleSubmissionTask,
  OperatorDeregistrationTask,
  OperatorRegistrationTask,
  OperatorRewardTask,
  OperatorTaxCollectionTask,
  OperatorUpdates,
  StakingProcessingTask,
} from '../interfaces';
import { getBlockHash, queryOperatorById } from '../services/autonomysService';
import * as dbService from '../services/database';
import { processGroupedInParallel, retryWithBackoff } from '../utils/parallel';

/**
 * Process a batch of operator tasks using grouped parallel processing
 */
export const processOperatorTasksBatch = async (
  tasks: StakingProcessingTask[],
): Promise<number> => {
  // Group tasks by operatorId to avoid conflicts
  const results = await processGroupedInParallel(
    tasks,
    (task) => task.operatorId, // Group by operatorId
    async (operatorTasks) => {
      // Process all tasks for this operator in a single transaction
      try {
        await retryWithBackoff(async () => {
          await dbService.withTransaction(async (client: PoolClient) => {
            await processOperatorTasksInTransaction(
              operatorTasks[0].operatorId,
              operatorTasks,
              client,
            );
          });
        });
        return operatorTasks.length;
      } catch (error) {
        console.error(
          `Failed to process tasks for operator ${operatorTasks[0].operatorId}:`,
          error,
        );
        if (error instanceof Error && 'code' in error) {
          console.error(
            `Database error code: ${(error as any).code}, detail: ${(error as any).detail}`,
          );
        }
        return 0;
      }
    },
    Math.floor(config.dbPoolSize * 0.7), // Use 70% of pool for operator tasks
  );

  return results.reduce((sum, count) => sum + count, 0);
};

/**
 * Process all tasks for a single operator in one transaction
 */
const processOperatorTasksInTransaction = async (
  operatorId: string,
  tasks: StakingProcessingTask[],
  client: PoolClient,
): Promise<void> => {
  console.log(`Processing ${tasks.length} tasks for operator ${operatorId}`);

  // Build consolidated update object
  const updates: OperatorUpdates = {
    operatorId,
  };

  // Track event IDs by type for marking as processed
  const eventIdsByType = {
    registrationIds: [] as string[],
    rewardIds: [] as string[],
    taxCollectionIds: [] as string[],
    bundleSubmissionIds: [] as string[],
    deregistrationIds: [] as string[],
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
          nominationTax: regTask.nominationTax,
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
        console.log(
          `Including tax collection for operator ${operatorId}: amount=${taxTask.amount}`,
        );
        break;
      }

      case 'bundle-submission': {
        const bundleTask = task as BundleSubmissionTask;
        bundleCount++;
        eventIdsByType.bundleSubmissionIds.push(bundleTask.id);
        console.log(
          `Including bundle submission for operator ${operatorId}: bundle=${bundleTask.bundleId}`,
        );
        break;
      }

      case 'operator-deregistration': {
        const deregTask = task as OperatorDeregistrationTask;
        updates.deregistered = true;

        // Fetch operator data at the block where deregistration happened
        try {
          const blockHash = await getBlockHash(BigInt(deregTask.blockHeight));
          const operatorData = await queryOperatorById(operatorId, blockHash);

          if (
            operatorData &&
            operatorData.partialStatus &&
            operatorData.partialStatus.deregistered
          ) {
            const deregistered = operatorData.partialStatus.deregistered;

            // Extract unlock block number
            if (deregistered.unlockAtConfirmedDomainBlockNumber) {
              updates.unlockAtConfirmedDomainBlockNumber =
                deregistered.unlockAtConfirmedDomainBlockNumber.toString();
              console.log(
                `Operator ${operatorId} will unlock at domain block ${deregistered.unlockAtConfirmedDomainBlockNumber}`,
              );
            }

            // Extract domain epoch (second element of the array)
            if (
              deregistered.domainEpoch &&
              Array.isArray(deregistered.domainEpoch) &&
              deregistered.domainEpoch.length >= 2
            ) {
              updates.deregistrationDomainEpoch = deregistered.domainEpoch[1].toString();
              console.log(
                `Operator ${operatorId} deregistered at domain epoch ${deregistered.domainEpoch[1]}`,
              );
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
  await dbService.upsertOperator(updates, client);

  // Mark all events as processed
  await dbService.markOperatorEventsAsProcessed(eventIdsByType, client);

  console.log(`Successfully processed ${tasks.length} tasks for operator ${operatorId}`);
};
