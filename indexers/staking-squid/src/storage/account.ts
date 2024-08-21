import { Account } from "../model";
import type { CtxBlock } from "../processor";
import { getBlockNumber } from "../utils";
import { Cache } from "../utils/cache";

export const createAccount = (
  block: CtxBlock,
  address: string,
  props: Partial<Account> = {}
): Account => {
  const blockNumber = getBlockNumber(block);
  return new Account({
    id: address,
    totalDeposits: props.totalDeposits ?? BigInt(0),
    totalEstimatedWithdrawals: props.totalEstimatedWithdrawals ?? BigInt(0),
    totalWithdrawals: props.totalWithdrawals ?? BigInt(0),
    totalTaxCollected: props.totalTaxCollected ?? BigInt(0),
    currentTotalStake: props.currentTotalStake ?? BigInt(0),
    currentStorageFeeDeposit: props.currentStorageFeeDeposit ?? BigInt(0),
    currentTotalShares: props.currentTotalShares ?? BigInt(0),
    currentSharePrice: props.currentSharePrice ?? BigInt(0),
    accumulatedEpochStake: props.accumulatedEpochStake ?? BigInt(0),
    accumulatedEpochStorageFeeDeposit:
      props.accumulatedEpochStorageFeeDeposit ?? BigInt(0),
    accumulatedEpochShares: props.accumulatedEpochShares ?? BigInt(0),
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
};

export const getOrCreateAccount = (
  cache: Cache,
  block: CtxBlock,
  address: string,
  props: Partial<Account> = {}
): Account => {
  const account = cache.accounts.get(address);

  if (!account) return createAccount(block, address, props);

  return account;
};
