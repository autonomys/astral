import { Operator, Withdrawal, parseDeposit } from "@autonomys/auto-consensus";
import { EventRecord, stringify } from "@autonomys/auto-utils";
import { createHash } from "crypto";
import { OperatorStakingHistory } from "../types";
import {
  SHARES_CALCULATION_MULTIPLIER,
  ZERO_BIGINT,
} from "./constants";
import * as db from "./db";
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



export const groupNominatorEvents = (nominatorEvents: any[]) => {
  const nominatorEventsMap = new Map<string, {
    operatorId: string,
    accountId: string,
    eventIds: string[],
    extrinsicIds: string[],
    blockHeights: string[]
  }>();
  
  nominatorEvents.forEach(eventStr => {
    const event = JSON.parse(eventStr);
    
    if (!nominatorEventsMap.has(event.operatorId)) {
      nominatorEventsMap.set(event.operatorId, {
        operatorId: event.operatorId,
        accountId: event.accountId,
        eventIds: [],
        extrinsicIds: [],
        blockHeights: []
      });
    }
    
    const entry = nominatorEventsMap.get(event.operatorId)!;
    entry.eventIds.push(event.eventId);
    entry.extrinsicIds.push(event.extrinsicId);
    entry.blockHeights.push(event.blockHeight);
  });

  return nominatorEventsMap;
};


export const processNominatorDepositEvents = async (
  nominatorEventsMap: Map<string, any>, 
  api: any, 
  blockTimestamp: Date, 
  cache: Cache, 
  height: bigint
): Promise<any[]> => {
  const depositsEntries = await Promise.all(
    [...nominatorEventsMap.values()].map(async (d: any) => {
      const res = await api.query.domains.deposits(
        Number(d.operatorId),
        d.accountId.toString()
      );
      const result = res.toHuman() as any;
      return {
        id: createHashId(result),
        accountId: d.accountId,
        operatorId: d.operatorId,
        domainId: result.pending.effectiveDomainEpoch[0].toString(),
        knownShares: BigInt(result.known.shares.toString().replace(/,/g, "")),
        knownStorageFeeDeposit: BigInt(result.known.storageFeeDeposit.toString().replace(/,/g, "")),
        pendingAmount: BigInt(result.pending.amount.toString().replace(/,/g, "")),
        pendingStorageFeeDeposit: BigInt(result.pending.storageFeeDeposit.toString().replace(/,/g, "")),
        pendingEffectiveDomainEpoch: BigInt(result.pending.effectiveDomainEpoch[1].toString().replace(/,/g, "")),
        eventIds: JSON.stringify(d.eventIds),
        extrinsicIds: JSON.stringify(d.extrinsicIds),
        timestamp: blockTimestamp,
        blockHeights: JSON.stringify(d.blockHeights),
      }
    })
  );

  depositsEntries.forEach((d) => {
    cache.nominatorDeposit.push(
      db.createNominatorDeposit(
        d.id,
        d.accountId,
        d.operatorId,
        d.domainId,
        d.knownShares,
        d.knownStorageFeeDeposit,
        d.pendingAmount,
        d.pendingStorageFeeDeposit,
        d.pendingEffectiveDomainEpoch,
        d.extrinsicIds,
        d.eventIds,
        d.timestamp,
        d.blockHeights,
        height,
        false
      )
    );
  });
  return depositsEntries;
}


export const processWithdrawalEvents = async (
  nominatorEventsMap: Map<string, any>, 
  api: any, 
  blockTimestamp: Date, 
  cache: Cache, 
  height: bigint
): Promise<any[]> => {
  /*
    Sample result of the query:
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

      totalWithdrawalAmount = sum(item_of(withdrawals).amountToUnlock) , not include the value of withdrawalInShares.shares 
      totalStorageFeeWithdrawal = sum(item_of(withdrawals).storageFeeRefund) + withdrawalInShares.storageFeeRefund

      Note: it means on staking worker after epoch transitions we have to compute shares*sharePrice of withdrawalsInShares and add a new entry for withdrawals.

      Transition from withdrawalsInShares to withdrawals happens lazily.
  */
  const withdrawalsEntries = await Promise.all(
    [...nominatorEventsMap.values()].map(async (d) => {
      const res = await api.query.domains.withdrawals(
        Number(d.operatorId),
        d.accountId.toString()
      );
      const result = res.toHuman() as any;
      return {
        id: createHashId(result),
        accountId: d.accountId,
        operatorId: d.operatorId,
        domainId: d.accountId.toString(),
        totalWithdrawalAmount: BigInt(result.totalWithdrawalAmount.toString().replace(/,/g, "")),
        totalStorageFeeWithdrawal: BigInt(result.totalStorageFeeWithdrawal.toString().replace(/,/g, "")),
        // Detailed withdrawals information
        withdrawalsJson: stringify(result.withdrawals ?? []),
        totalPendingWithdrawals: BigInt((result.withdrawals ?? []).length),

        // In-shares (pending) withdrawal details
        domainEpoch: BigInt(result.withdrawalInShares.domainEpoch[1].toString().replace(/,/g, "")),
        unlockAtConfirmedDomainBlockNumber: BigInt(result.withdrawalInShares.unlockAtConfirmedDomainBlockNumber.toString().replace(/,/g, "")),
        shares: BigInt(result.withdrawalInShares.shares.toString().replace(/,/g, "")),
        storageFeeRefund: BigInt(result.withdrawalInShares.storageFeeRefund.toString().replace(/,/g, "")),

        eventIds: JSON.stringify(d.eventIds),
        extrinsicIds: JSON.stringify(d.extrinsicIds),
        blockHeights: JSON.stringify(d.blockHeights),
        timestamp: blockTimestamp,
        blockHeight: height
      }
    })
  );

  // Store each withdrawal entry as a NominatorWithdrawal entity
  withdrawalsEntries.forEach((w) => {
    cache.nominatorWithdrawal.push(
      db.createNominatorWithdrawal(
        w.id,
        w.accountId,
        w.operatorId,
        w.domainId,
        w.shares, // withdrawalInSharesAmount (shares)
        w.storageFeeRefund, // withdrawalInSharesStorageFeeRefund
        w.domainEpoch.toString(),
        w.unlockAtConfirmedDomainBlockNumber,
        w.totalWithdrawalAmount,
        w.totalStorageFeeWithdrawal,
        w.withdrawalsJson,
        w.totalPendingWithdrawals,
        w.timestamp,
        w.blockHeight,
        w.eventIds,
        w.extrinsicIds,
        w.blockHeights,
        false
      )
    );
  });
  return withdrawalsEntries;
}




/**
 * Derive nominator deposit entities from on-chain deposits state
 * TO BE MOVED TO STAKING WORKER
 */
export const deriveNominatorDeposits = (
  depositsEntries: any[],
  operators: any[],
  domainSummaryMap: Map<string, any>,
  operatorEpochSharePriceMap: Map<string, bigint>,
  changedNominationKeys: Set<string>,
  blockTimestamp: Date,
  height: bigint
) => {
  // Filter and process only nominations that changed or belong to operators whose
  // share-price changed due to an epoch transition.
  const results: any[] = [];

  const operatorMap = new Map<string, any>();
  operators.forEach((op) => operatorMap.set(op.operatorId.toString(), op));

  for (const [key, value] of depositsEntries) {
    // Use parseDeposit to properly extract operatorId and accountId
    const deposit = parseDeposit([key, value]);
    const operatorId = deposit.operatorId.toString();
    const accountId = deposit.account;

    const nominationKey = `${operatorId}-${accountId}`;

    // We'll decide later whether to include this nomination based on either
    // explicit extrinsic-impact (changedNominationKeys) or matured pending.

    const domainId =
      operatorMap.get(operatorId)?.operatorDetails.currentDomainId.toString() ?? "";
    if (!domainId) continue;

    const known = deposit.known;
    const pending = deposit.pending;

    const knownShares: bigint = BigInt(known.shares.toString());
    const knownStorageFD: bigint = BigInt(known.storageFeeDeposit.toString());

    let pendingAmount: bigint = ZERO_BIGINT;
    let pendingStorageFD: bigint = ZERO_BIGINT;
    let pendingEpochStr = "";

    let postPendingShares: bigint = ZERO_BIGINT;
    let postPendingStorageFD: bigint = ZERO_BIGINT;
    let pendingMatured = false;

    if (pending) {
      pendingAmount = BigInt(pending.amount.toString());
      pendingStorageFD = BigInt(pending.storageFeeDeposit.toString());
      pendingEpochStr = JSON.stringify(pending.effectiveDomainEpoch);

      // Handle effectiveDomainEpoch - it might be [domainId, epochIdx] or just epochIdx
      let dId: number;
      let epochIdx: number;

      epochIdx = pending.effectiveDomainEpoch as number;
      dId = parseInt(domainId);

      const sharePriceKey = `${operatorId}-${dId}-${epochIdx}`;
      const sharePrice = operatorEpochSharePriceMap.get(sharePriceKey);
      if (sharePrice && sharePrice > ZERO_BIGINT) {
        postPendingShares =
          (pendingAmount * SHARES_CALCULATION_MULTIPLIER) / sharePrice;
        postPendingStorageFD = pendingStorageFD;
        pendingMatured = true;
      }
    }

    // Skip if this nomination neither changed via extrinsic nor had its pending matured
    if (!changedNominationKeys.has(nominationKey) && !pendingMatured) {
      continue;
    }

    // instant share price
    const operator = operatorMap.get(operatorId);
    if (!operator) continue;
    const domainSummary = domainSummaryMap.get(domainId);
    const rewardMap = (domainSummary?.currentEpochRewards as any) ?? {};
    const reward = BigInt(rewardMap[operatorId] ?? 0);
    const nominationTax = BigInt(operator.operatorDetails.nominationTax ?? 0);
    const taxedReward = reward - (reward * nominationTax) / BigInt(100);

    const instantSharePrice =
      operator.operatorDetails.currentTotalShares === ZERO_BIGINT
        ? ZERO_BIGINT
        : ((operator.operatorDetails.currentTotalStake + taxedReward) *
            SHARES_CALCULATION_MULTIPLIER) /
          operator.operatorDetails.currentTotalShares;

    const stakedAmount =
      ((knownShares + postPendingShares) * instantSharePrice) /
      SHARES_CALCULATION_MULTIPLIER;

    // storageFund placeholder
    const storageFund = ZERO_BIGINT;
    const totalReward =
      pendingAmount + pendingStorageFD + knownStorageFD - stakedAmount - storageFund;

    results.push({
      id: `${accountId}-${domainId}-${operatorId}`,
      accountId,
      operatorId,
      domainId,
      knownShares,
      knownStorageFeeDeposit: knownStorageFD,
      pendingAmount,
      pendingStorageFeeDeposit: pendingStorageFD,
      pendingEffectiveDomainEpoch: pendingEpochStr,
      postPendingShares,
      postPendingStorageFeeDeposit: postPendingStorageFD,
      stakedAmount,
      storageFund,
      totalReward,
      timestamp: blockTimestamp,
      blockHeight: height,
    });
  }

  return results;
};
