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
    totalCampaignsParticipated: props.totalCampaignsParticipated ?? BigInt(0),
    totalEarningsAmountTestnetToken:
      props.totalEarningsAmountTestnetToken ?? BigInt(0),
    totalEarningsPercentageTestnetToken:
      props.totalEarningsPercentageTestnetToken ?? "",
    totalEarningsAmountATCToken: props.totalEarningsAmountATCToken ?? BigInt(0),
    totalEarningsPercentageATCToken:
      props.totalEarningsPercentageATCToken ?? "",
    rank: props.rank ?? BigInt(0),
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
