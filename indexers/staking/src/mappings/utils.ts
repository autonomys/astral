import { Operator, Withdrawal, parseDeposit } from "@autonomys/auto-consensus";
import { EventRecord, stringify } from "@autonomys/auto-utils";
import { createHash } from "crypto";
import { OperatorStakingHistory } from "../types";
import {
  SHARES_CALCULATION_MULTIPLIER,
  ZERO_BIGINT,
} from "./constants";
import { Cache } from "./db";
import { EpochTransition, Transfer } from "./types";

export const getNominationId = (
  accountId: string,
  domainId: string,
  operatorId: string
): string => accountId + "-" + domainId + "-" + operatorId;

export const createHashId = (data: any): string =>
  createHash("sha256").update(stringify(data)).digest("hex");

export const calculateTransfer = (transfers: Transfer) => {
  if (!transfers) return [ZERO_BIGINT, ZERO_BIGINT];
  let total = ZERO_BIGINT;
  const length = Object.keys(transfers).length;
  for (const key in transfers) {
    total += BigInt(transfers[key]);
  }
  return [total, BigInt(length)];
};

export const findOneExtrinsicEvent = (
  events: EventRecord[],
  section: string,
  method: string
) => {
  return events.find(
    (e) =>
      e.phase.isApplyExtrinsic &&
      e.event.section === section &&
      e.event.method === method
  );
};

export const findOperatorFromOperatorsCache = (
  cache: Cache,
  operatorId: string
): OperatorStakingHistory => {
  const opFromCache = cache.operatorStakingHistory.find(
    (o) => o.operatorId === operatorId
  );
  if (!opFromCache) throw new Error("Operator from cache not found");
  return opFromCache;
};

export const findDomainIdFromOperatorsCache = (
  cache: Cache,
  operatorId: string
): string => {
  const opFromCache = cache.operatorStakingHistory.find(
    (o) => o.operatorId === operatorId
  );
  if (!opFromCache) {
    const parentOpFromCache = cache.parentBlockOperators.find(
      (o) => o.operatorId.toString() === operatorId
    );
    if (!parentOpFromCache) throw new Error("Operator from cache not found");
    return parentOpFromCache.operatorDetails.currentDomainId.toString();
  }
  return opFromCache.currentDomainId;
};

export const findEpochFromDomainStakingHistoryCache = (
  cache: Cache,
  domainId: string
): number => {
  const domainFromCache = cache.domainStakingHistory.find(
    (o) => o.domainId === domainId
  );
  if (!domainFromCache) throw new Error("Domain from cache not found");
  return domainFromCache.currentEpochIndex;
};

export const findWithdrawalFromWithdrawalCache = (
  cache: Cache,
  operatorId: string,
  accountId: string
): Withdrawal["withdrawalInShares"] => {
  const withdrawal = cache.currentWithdrawal.find(
    (w) => w.operatorId.toString() === operatorId && w.account === accountId
  );
  if (!withdrawal) throw new Error("Withdrawal not found");
  return withdrawal.withdrawalInShares;
};

export const aggregateByDomainId = (
  operators: Operator[],
  targetDomainId: bigint
) => {
  const filteredOperators = operators.filter(
    (operator) => operator.operatorDetails.currentDomainId === targetDomainId
  );

  let totalStakeSum = BigInt(0);
  let totalSharesSum = BigInt(0);

  for (const operator of filteredOperators) {
    totalStakeSum += operator.operatorDetails.currentTotalStake;
    totalSharesSum += operator.operatorDetails.currentTotalShares;
  }

  return {
    domainId: targetDomainId,
    totalStake: totalStakeSum,
    totalShares: totalSharesSum,
  };
};

export const groupEventsFromBatchAll = (
  events: EventRecord[]
): EventRecord[][] => {
  const result: EventRecord[][] = [];
  let currentGroup: EventRecord[] = [];

  for (const event of events) {
    if (
      event.event.section === "utility" &&
      event.event.method === "ItemCompleted"
    ) {
      if (currentGroup.length > 0) {
        result.push(currentGroup);
        currentGroup = [];
      }
    } else currentGroup.push(event);
  }

  if (currentGroup.length > 0) result.push(currentGroup);

  return result;
};

/**
 * Detects epoch transitions by comparing current epoch indices with parent block epoch indices
 * @param currentDomainStakingSummary - Current domain staking summary entries
 * @param parentBlockApi - API instance for querying parent block data
 * @param height - Current block height for logging
 * @returns Array of epoch transitions with domain ID and epoch numbers
 */
export const detectEpochTransitions = async (
  currentDomainStakingSummary: any[],
  parentBlockApi: any,
  height: bigint
): Promise<EpochTransition[]> => {
  // Extract domain IDs and current epochs from the current block
  const domainIds = currentDomainStakingSummary.map(
    (data) => (data[0].toPrimitive() as any)[0]
  );
  const currentEpochs = currentDomainStakingSummary.map(
    (data) => (data[1].toPrimitive() as any).currentEpochIndex
  );

  // Query parent block for epoch indices of each domain
  const parentEpochPromises = domainIds.map(async (domainId) => {
    return parentBlockApi.query.domains.domainStakingSummary(domainId);
  });

  const parentEpochs = await Promise.all(parentEpochPromises);
  const parentSummaries = parentEpochs.map((result) => {
    const primitive = result.toPrimitive() as any;
    return primitive ?? null;
  });
  const parentEpochValues = parentSummaries.map((summary) => {
    return summary ? summary.currentEpochIndex : null;
  });

  // Check for epoch transitions
  const epochTransitions: EpochTransition[] = [];

  domainIds.forEach((domainId, index) => {
    const currentEpoch = currentEpochs[index];
    const parentEpoch = parentEpochValues[index];
    const parentSummary = parentSummaries[index];

    if (parentEpoch !== null && parentEpoch < currentEpoch) {
      logger.info(
        `BLOCK ${height} Epoch transition detected for domain ${domainId}: ${parentEpoch} -> ${currentEpoch}`
      );
      epochTransitions.push({
        domainId,
        parentEpoch,
        currentEpoch,
        parentSummary,
      });
    }
  });

  return epochTransitions;
};

/**
 * Derives operator epoch share prices for each epoch transition
 * @param epochTransitions - Array of detected epoch transitions
 * @param operators - Array of current operators
 * @param blockTimestamp - Current block timestamp
 * @param height - Current block height
 * @returns Array of OperatorEpochSharePrice entities to be cached and stored in the database
 */

export const deriveOperatorEpochSharePrices = (
  epochTransitions: EpochTransition[],
  operators: any[],
  blockTimestamp: Date,
  height: bigint
) => {
  /*
    let operator = Operators::get(operator_id);

    // The operator's current epoch reward after tax
    let taxed_reward = match DomainStakingSummary::get(domain_id).current_epoch_rewards.get(operator_id) {
        Some(reward) = reward - operator.nomination_tax * reward,
        None = 0,
    };

    let instant_share_price = (operator.current_total_stake + taxed_reward) / operator.current_total_shares;
  */

  // Future improvement is to make this parallel
  const operatorEpochSharePrices: any[] = [];

  for (const { domainId, parentEpoch, parentSummary } of epochTransitions) {
    // Map of operatorId => reward for the epoch that just ended
    const rewardsMap: Record<string, string> =
      (parentSummary?.currentEpochRewards as any) ?? {};

    // Filter operators that currently belong to this domain
    const operatorsInDomain = operators.filter(
      (op) => op.operatorDetails.currentDomainId.toString() === domainId
    );

    for (const operator of operatorsInDomain) {
      const operatorId = operator.operatorId.toString();

      const reward = BigInt(rewardsMap[operatorId] ?? 0);
      const nominationTax = BigInt(operator.operatorDetails.nominationTax ?? 0);

      // taxedReward = reward - nominationTax * reward / 100
      const taxedReward = reward - (reward * nominationTax) / BigInt(100);
      const totalShares = operator.operatorDetails.currentTotalShares;
      
      if (totalShares === ZERO_BIGINT) continue; // skip operators with no shares

      const totalStake = operator.operatorDetails.currentTotalStake;

      const sharePrice =
        ((totalStake + taxedReward) * SHARES_CALCULATION_MULTIPLIER) /
        totalShares;

      operatorEpochSharePrices.push({
        operatorId,
        domainId,
        parentEpoch,
        sharePrice,
        totalStake,
        totalShares,
        blockTimestamp,
        height,
      });
    }
  }

  return operatorEpochSharePrices;
};

