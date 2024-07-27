import { Account } from "../model";
import type { CtxBlock } from "../processor";
import { getBlockNumber } from "../utils";
import { Cache } from "../utils/cache";

export const createAccount = (
  block: CtxBlock,
  address: string,
  props: Partial<Account>
): Account => {
  const account = new Account({
    id: address,
    totalDeposits: BigInt(0),
    totalTaxCollected: BigInt(0),
    operators: [],
    nominators: [],
    deposits: [],
    withdrawals: [],
    operatorsCount: 0,
    nominatorsCount: 0,
    depositsCount: 0,
    withdrawalsCount: 0,
    ...props,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

  return account;
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
