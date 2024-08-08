import {
  AccountExtrinsicFailedTotalCount,
  AccountExtrinsicSuccessTotalCount,
  AccountExtrinsicTotalCount,
  AccountRemarkCount,
  AccountTransactionFeePaidTotalValue,
  AccountTransferReceiverTotalCount,
  AccountTransferReceiverTotalValue,
  AccountTransferSenderTotalCount,
  AccountTransferSenderTotalValue,
} from "../model";
import type { CtxBlock } from "../processor";
import { getBlockNumber, getTimestamp } from "../utils";
import { Cache } from "../utils/cache";

export const createAccountTransferSenderTotalCount = (
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountTransferSenderTotalCount>
): AccountTransferSenderTotalCount =>
  new AccountTransferSenderTotalCount({
    id: accountId,
    sortId: 0,
    accountId,
    value: 0,
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateAccountTransferSenderTotalCount = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountTransferSenderTotalCount> = {}
): AccountTransferSenderTotalCount => {
  const accountTransferSenderTotalCount =
    cache.accountTransferSenderTotalCount.get(accountId);

  if (!accountTransferSenderTotalCount)
    return createAccountTransferSenderTotalCount(block, accountId, props);

  return accountTransferSenderTotalCount;
};

export const createAccountTransferSenderTotalValue = (
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountTransferSenderTotalValue>
): AccountTransferSenderTotalValue =>
  new AccountTransferSenderTotalValue({
    id: accountId,
    sortId: 0,
    accountId,
    value: BigInt(0),
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateAccountTransferSenderTotalValue = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountTransferSenderTotalValue> = {}
): AccountTransferSenderTotalValue => {
  const accountTransferSenderTotalValue =
    cache.accountTransferSenderTotalValue.get(accountId);

  if (!accountTransferSenderTotalValue)
    return createAccountTransferSenderTotalValue(block, accountId, props);

  return accountTransferSenderTotalValue;
};

export const createAccountTransferReceiverTotalCount = (
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountTransferReceiverTotalCount>
): AccountTransferReceiverTotalCount =>
  new AccountTransferReceiverTotalCount({
    id: accountId,
    sortId: 0,
    accountId,
    value: 0,
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateAccountTransferReceiverTotalCount = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountTransferReceiverTotalCount> = {}
): AccountTransferReceiverTotalCount => {
  const accountTransferReceiverTotalCount =
    cache.accountTransferReceiverTotalCount.get(accountId);

  if (!accountTransferReceiverTotalCount)
    return createAccountTransferReceiverTotalCount(block, accountId, props);

  return accountTransferReceiverTotalCount;
};

export const createAccountTransferReceiverTotalValue = (
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountTransferReceiverTotalValue>
): AccountTransferReceiverTotalValue =>
  new AccountTransferReceiverTotalValue({
    id: accountId,
    sortId: 0,
    accountId,
    value: BigInt(0),
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateAccountTransferReceiverTotalValue = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountTransferReceiverTotalValue> = {}
): AccountTransferReceiverTotalValue => {
  const accountTransferReceiverTotalValue =
    cache.accountTransferReceiverTotalValue.get(accountId);

  if (!accountTransferReceiverTotalValue)
    return createAccountTransferReceiverTotalValue(block, accountId, props);

  return accountTransferReceiverTotalValue;
};

export const createAccountRemarkCount = (
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountRemarkCount>
): AccountRemarkCount =>
  new AccountRemarkCount({
    id: accountId,
    sortId: 0,
    accountId,
    value: 0,
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateAccountRemarkCount = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountRemarkCount> = {}
): AccountRemarkCount => {
  const accountRemarkCount = cache.accountRemarkCount.get(accountId);

  if (!accountRemarkCount)
    return createAccountRemarkCount(block, accountId, props);

  return accountRemarkCount;
};

export const createAccountExtrinsicTotalCount = (
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountExtrinsicTotalCount>
): AccountExtrinsicTotalCount =>
  new AccountExtrinsicTotalCount({
    id: accountId,
    sortId: 0,
    accountId,
    value: 0,
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateAccountExtrinsicTotalCount = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountExtrinsicTotalCount> = {}
): AccountExtrinsicTotalCount => {
  const accountExtrinsicTotalCount =
    cache.accountExtrinsicTotalCount.get(accountId);

  if (!accountExtrinsicTotalCount)
    return createAccountExtrinsicTotalCount(block, accountId, props);

  return accountExtrinsicTotalCount;
};

export const createAccountExtrinsicSuccessTotalCount = (
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountExtrinsicSuccessTotalCount>
): AccountExtrinsicSuccessTotalCount =>
  new AccountExtrinsicSuccessTotalCount({
    id: accountId,
    sortId: 0,
    accountId,
    value: 0,
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateAccountExtrinsicSuccessTotalCount = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountExtrinsicSuccessTotalCount> = {}
): AccountExtrinsicSuccessTotalCount => {
  const accountExtrinsicSuccessTotalCount =
    cache.accountExtrinsicSuccessTotalCount.get(accountId);

  if (!accountExtrinsicSuccessTotalCount)
    return createAccountExtrinsicSuccessTotalCount(block, accountId, props);

  return accountExtrinsicSuccessTotalCount;
};

export const createAccountExtrinsicFailedTotalCount = (
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountExtrinsicFailedTotalCount>
): AccountExtrinsicFailedTotalCount =>
  new AccountExtrinsicFailedTotalCount({
    id: accountId,
    sortId: 0,
    accountId,
    value: 0,
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateAccountExtrinsicFailedTotalCount = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountExtrinsicFailedTotalCount> = {}
): AccountExtrinsicFailedTotalCount => {
  const accountExtrinsicFailedTotalCount =
    cache.accountExtrinsicFailedTotalCount.get(accountId);

  if (!accountExtrinsicFailedTotalCount)
    return createAccountExtrinsicFailedTotalCount(block, accountId, props);

  return accountExtrinsicFailedTotalCount;
};

export const createAccountTransactionFeePaidTotalValue = (
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountTransactionFeePaidTotalValue>
): AccountTransactionFeePaidTotalValue =>
  new AccountTransactionFeePaidTotalValue({
    id: accountId,
    sortId: 0,
    accountId,
    value: BigInt(0),
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateAccountTransactionFeePaidTotalValue = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<AccountTransactionFeePaidTotalValue> = {}
): AccountTransactionFeePaidTotalValue => {
  const accountTransactionFeePaidTotalValue =
    cache.accountTransactionFeePaidTotalValue.get(accountId);

  if (!accountTransactionFeePaidTotalValue)
    return createAccountTransactionFeePaidTotalValue(block, accountId, props);

  return accountTransactionFeePaidTotalValue;
};
