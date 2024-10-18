import type { CtxBlock, CtxEvent } from "../processor";
import { getOrCreateAccountTransactionFeePaidTotalValue } from "../storage/account";
import { getBlockNumber, getTimestamp, hexToAccount } from "../utils";
import { Cache } from "../utils/cache";

export function processTransactionFeePaidEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const accountId = hexToAccount(event.args.who);
  const actualFee = BigInt(event.args.actualFee);
  const tip = BigInt(event.args.tip);
  const totalFeePaid = actualFee + tip;

  const accountTransactionFeePaidTotalValue =
    getOrCreateAccountTransactionFeePaidTotalValue(cache, block, accountId);

  accountTransactionFeePaidTotalValue.value += totalFeePaid;
  accountTransactionFeePaidTotalValue.lastContributionAt = getTimestamp(block);
  accountTransactionFeePaidTotalValue.updatedAt = getBlockNumber(block);

  cache.accountTransactionFeePaidTotalValue.set(
    accountTransactionFeePaidTotalValue.id,
    accountTransactionFeePaidTotalValue
  );

  cache.isModified = true;

  return cache;
}
