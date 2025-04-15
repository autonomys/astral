import { Operator, Withdrawal } from "@autonomys/auto-consensus";
import { EventRecord, stringify } from "@autonomys/auto-utils";
import { createHash } from "crypto";
import { OperatorStakingHistory } from "../types";
import {
  PAD_ZEROS,
  SHARES_CALCULATION_MULTIPLIER,
  ZERO_BIGINT,
} from "./constants";
import { Cache } from "./db";
import { Transfer } from "./types";

export const getSortId = (
  blockHeight: bigint | string,
  indexInBlock?: bigint | string
): string => {
  const str1 = blockHeight.toString().padStart(32, PAD_ZEROS);
  if (indexInBlock === undefined) return str1;
  const str2 = indexInBlock.toString().padStart(32, PAD_ZEROS);
  return str1 + "-" + str2;
};

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

export const calculateShares = (stakeAmount: bigint, sharePrice: bigint) => {
  return (
    (stakeAmount * SHARES_CALCULATION_MULTIPLIER) /
    (sharePrice > ZERO_BIGINT ? sharePrice : SHARES_CALCULATION_MULTIPLIER)
  );
};
