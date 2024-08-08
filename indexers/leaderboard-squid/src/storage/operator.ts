import {
  OperatorBundleTotalCount,
  OperatorDepositsTotalCount,
  OperatorDepositsTotalValue,
  OperatorTotalRewardsCollected,
  OperatorTotalTaxCollected,
  OperatorWithdrawalsTotalCount,
} from "../model";
import type { CtxBlock } from "../processor";
import { getBlockNumber, getTimestamp } from "../utils";
import { Cache } from "../utils/cache";

export const createOperatorTotalRewardsCollected = (
  block: CtxBlock,
  operatorId: string,
  props: Partial<OperatorTotalRewardsCollected>
): OperatorTotalRewardsCollected =>
  new OperatorTotalRewardsCollected({
    id: operatorId,
    sortId: 0,
    operatorId,
    value: BigInt(0),
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateOperatorTotalRewardsCollected = (
  cache: Cache,
  block: CtxBlock,
  operatorId: string,
  props: Partial<OperatorTotalRewardsCollected> = {}
): OperatorTotalRewardsCollected => {
  const operatorTotalRewardsCollected =
    cache.operatorTotalRewardsCollected.get(operatorId);

  if (!operatorTotalRewardsCollected)
    return createOperatorTotalRewardsCollected(block, operatorId, props);

  return operatorTotalRewardsCollected;
};

export const createOperatorTotalTaxCollected = (
  block: CtxBlock,
  operatorId: string,
  props: Partial<OperatorTotalTaxCollected>
): OperatorTotalTaxCollected =>
  new OperatorTotalTaxCollected({
    id: operatorId,
    sortId: 0,
    operatorId,
    value: BigInt(0),
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateOperatorTotalTaxCollected = (
  cache: Cache,
  block: CtxBlock,
  operatorId: string,
  props: Partial<OperatorTotalTaxCollected> = {}
): OperatorTotalTaxCollected => {
  const operatorTotalTaxCollected =
    cache.operatorTotalTaxCollected.get(operatorId);

  if (!operatorTotalTaxCollected)
    return createOperatorTotalTaxCollected(block, operatorId, props);

  return operatorTotalTaxCollected;
};

export const createOperatorBundleTotalCount = (
  block: CtxBlock,
  domainId: string,
  operatorId: string,
  props: Partial<OperatorBundleTotalCount>
): OperatorBundleTotalCount =>
  new OperatorBundleTotalCount({
    id: operatorId,
    sortId: 0,
    domainId,
    operatorId,
    value: 0,
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateOperatorBundleTotalCount = (
  cache: Cache,
  block: CtxBlock,
  domainId: string,
  operatorId: string,
  props: Partial<OperatorBundleTotalCount> = {}
): OperatorBundleTotalCount => {
  const operatorBundleTotalCount =
    cache.operatorBundleTotalCount.get(operatorId);

  if (!operatorBundleTotalCount)
    return createOperatorBundleTotalCount(block, domainId, operatorId, props);

  return operatorBundleTotalCount;
};

export const createOperatorDepositsTotalCount = (
  block: CtxBlock,
  operatorId: string,
  props: Partial<OperatorDepositsTotalCount>
): OperatorDepositsTotalCount =>
  new OperatorDepositsTotalCount({
    id: operatorId,
    sortId: 0,
    operatorId,
    value: 0,
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateOperatorDepositsTotalCount = (
  cache: Cache,
  block: CtxBlock,
  operatorId: string,
  props: Partial<OperatorDepositsTotalCount> = {}
): OperatorDepositsTotalCount => {
  const operatorDepositsTotalCount =
    cache.operatorDepositsTotalCount.get(operatorId);

  if (!operatorDepositsTotalCount)
    return createOperatorDepositsTotalCount(block, operatorId, props);

  return operatorDepositsTotalCount;
};

export const createOperatorDepositsTotalValue = (
  block: CtxBlock,
  operatorId: string,
  props: Partial<OperatorDepositsTotalValue>
): OperatorDepositsTotalValue =>
  new OperatorDepositsTotalValue({
    id: operatorId,
    sortId: 0,
    operatorId,
    value: BigInt(0),
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateOperatorDepositsTotalValue = (
  cache: Cache,
  block: CtxBlock,
  operatorId: string,
  props: Partial<OperatorDepositsTotalValue> = {}
): OperatorDepositsTotalValue => {
  const operatorDepositsTotalValue =
    cache.operatorDepositsTotalValue.get(operatorId);

  if (!operatorDepositsTotalValue)
    return createOperatorDepositsTotalValue(block, operatorId, props);

  return operatorDepositsTotalValue;
};

export const createOperatorWithdrawalsTotalCount = (
  block: CtxBlock,
  operatorId: string,
  props: Partial<OperatorWithdrawalsTotalCount>
): OperatorWithdrawalsTotalCount =>
  new OperatorWithdrawalsTotalCount({
    id: operatorId,
    sortId: 0,
    operatorId,
    value: 0,
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateOperatorWithdrawalsTotalCount = (
  cache: Cache,
  block: CtxBlock,
  operatorId: string,
  props: Partial<OperatorWithdrawalsTotalCount> = {}
): OperatorWithdrawalsTotalCount => {
  const operatorWithdrawalsTotalCount =
    cache.operatorWithdrawalsTotalCount.get(operatorId);

  if (!operatorWithdrawalsTotalCount)
    return createOperatorWithdrawalsTotalCount(block, operatorId, props);

  return operatorWithdrawalsTotalCount;
};
