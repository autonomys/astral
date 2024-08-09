import {
  NominatorDepositsTotalCount,
  NominatorDepositsTotalValue,
  NominatorWithdrawalsTotalCount,
} from "../model";
import type { CtxBlock } from "../processor";
import { getBlockNumber, getTimestamp } from "../utils";
import { Cache } from "../utils/cache";

export const createNominatorDepositsTotalCount = (
  block: CtxBlock,
  accountId: string,
  props: Partial<NominatorDepositsTotalCount>
): NominatorDepositsTotalCount =>
  new NominatorDepositsTotalCount({
    id: accountId,
    rank: 0,
    value: 0,
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateNominatorDepositsTotalCount = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<NominatorDepositsTotalCount> = {}
): NominatorDepositsTotalCount => {
  const nominatorDepositsTotalCount =
    cache.nominatorDepositsTotalCount.get(accountId);

  if (!nominatorDepositsTotalCount)
    return createNominatorDepositsTotalCount(block, accountId, props);

  return nominatorDepositsTotalCount;
};

export const createNominatorDepositsTotalValue = (
  block: CtxBlock,
  accountId: string,
  props: Partial<NominatorDepositsTotalValue>
): NominatorDepositsTotalValue =>
  new NominatorDepositsTotalValue({
    id: accountId,
    rank: 0,
    value: BigInt(0),
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateNominatorDepositsTotalValue = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<NominatorDepositsTotalValue> = {}
): NominatorDepositsTotalValue => {
  const nominatorDepositsTotalValue =
    cache.nominatorDepositsTotalValue.get(accountId);

  if (!nominatorDepositsTotalValue)
    return createNominatorDepositsTotalValue(block, accountId, props);

  return nominatorDepositsTotalValue;
};

export const createNominatorWithdrawalsTotalCount = (
  block: CtxBlock,
  accountId: string,
  props: Partial<NominatorWithdrawalsTotalCount>
): NominatorWithdrawalsTotalCount =>
  new NominatorWithdrawalsTotalCount({
    id: accountId,
    rank: 0,
    value: 0,
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateNominatorWithdrawalsTotalCount = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<NominatorWithdrawalsTotalCount> = {}
): NominatorWithdrawalsTotalCount => {
  const nominatorWithdrawalsTotalCount =
    cache.nominatorWithdrawalsTotalCount.get(accountId);

  if (!nominatorWithdrawalsTotalCount)
    return createNominatorWithdrawalsTotalCount(block, accountId, props);

  return nominatorWithdrawalsTotalCount;
};
