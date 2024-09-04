import { Account, AccountPerCampaign } from "../model";
import { Cache } from "./cache";

export const sort = (cache: Cache): Cache => {
  // Account
  const sortedAccountRank: Account[] = Array.from(cache.accounts.values()).sort(
    (a, b) =>
      a.totalEarningsAmountTestnetToken > b.totalEarningsAmountTestnetToken
        ? -1
        : a.totalEarningsAmountTestnetToken < b.totalEarningsAmountTestnetToken
        ? 1
        : 0
  );

  sortedAccountRank.map((n, key) => {
    n.rank = BigInt(key + 1);
    cache.accounts.set(n.id, n);
  });

  // AccountPerCampaign
  const sortedAccountPerCampaignRank: AccountPerCampaign[] = Array.from(
    cache.accountPerCampaigns.values()
  ).sort((a, b) =>
    a.totalEarningsAmountTestnetToken > b.totalEarningsAmountTestnetToken
      ? -1
      : a.totalEarningsAmountTestnetToken < b.totalEarningsAmountTestnetToken
      ? 1
      : 0
  );

  sortedAccountPerCampaignRank.map((n, key) => {
    n.rank = BigInt(key + 1);
    cache.accountPerCampaigns.set(n.id, n);
  });

  return cache;
};
