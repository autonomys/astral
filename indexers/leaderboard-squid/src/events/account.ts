import type { CtxBlock, CtxEvent } from "../processor";
import {
  getOrCreateAccountRemarkCount,
  getOrCreateAccountTransferReceiverTotalCount,
  getOrCreateAccountTransferReceiverTotalValue,
  getOrCreateAccountTransferSenderTotalCount,
  getOrCreateAccountTransferSenderTotalValue,
} from "../storage/account";
import { getBlockNumber, getTimestamp } from "../utils";
import { Cache } from "../utils/cache";

export function processTransferEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const accountId = String(event.args.from);
  const amount = BigInt(event.args.amount);

  const accountTransferSenderTotalCount =
    getOrCreateAccountTransferSenderTotalCount(cache, block, accountId);

  accountTransferSenderTotalCount.value++;
  accountTransferSenderTotalCount.lastContributionAt = getTimestamp(block);
  accountTransferSenderTotalCount.updatedAt = getBlockNumber(block);

  cache.accountTransferSenderTotalCount.set(
    accountTransferSenderTotalCount.id,
    accountTransferSenderTotalCount
  );

  const accountTransferSenderTotalValue =
    getOrCreateAccountTransferSenderTotalValue(cache, block, accountId);

  accountTransferSenderTotalValue.value += amount;
  accountTransferSenderTotalValue.lastContributionAt = getTimestamp(block);
  accountTransferSenderTotalValue.updatedAt = getBlockNumber(block);

  cache.accountTransferSenderTotalValue.set(
    accountTransferSenderTotalValue.id,
    accountTransferSenderTotalValue
  );

  const accountTransferReceiverTotalCount =
    getOrCreateAccountTransferReceiverTotalCount(cache, block, accountId);

  accountTransferReceiverTotalCount.value++;
  accountTransferReceiverTotalCount.lastContributionAt = getTimestamp(block);
  accountTransferReceiverTotalCount.updatedAt = getBlockNumber(block);

  cache.accountTransferReceiverTotalCount.set(
    accountTransferReceiverTotalCount.id,
    accountTransferReceiverTotalCount
  );

  const accountTransferReceiverTotalValue =
    getOrCreateAccountTransferReceiverTotalValue(cache, block, accountId);

  accountTransferReceiverTotalValue.value += amount;
  accountTransferReceiverTotalValue.lastContributionAt = getTimestamp(block);
  accountTransferReceiverTotalValue.updatedAt = getBlockNumber(block);

  cache.accountTransferReceiverTotalValue.set(
    accountTransferReceiverTotalValue.id,
    accountTransferReceiverTotalValue
  );

  cache.isModified = true;

  return cache;
}

export function processRemarkEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const accountId = String(event.args.blockAuthor);

  const accountRemarkCount = getOrCreateAccountRemarkCount(
    cache,
    block,
    accountId
  );

  accountRemarkCount.value++;
  accountRemarkCount.lastContributionAt = getTimestamp(block);
  accountRemarkCount.updatedAt = getBlockNumber(block);

  cache.accountRemarkCount.set(accountRemarkCount.id, accountRemarkCount);

  cache.isModified = true;

  return cache;
}
