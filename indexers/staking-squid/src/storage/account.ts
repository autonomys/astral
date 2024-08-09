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
    totalTaxCollected: props.totalTaxCollected ?? BigInt(0),
    ...props,
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
