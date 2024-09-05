import { Cache } from "./cache";

export const calculatePercentage = (cache: Cache): Cache => {
  const precision = BigInt(10) ** BigInt(16);
  const campaigns = cache.campaigns.values();
  const accounts = cache.accounts.values();

  const totalEarnings = cache.totalEarnings.get("0");
  const totalEarningsAmountTestnetToken = totalEarnings
    ? totalEarnings.totalEarningsAmountTestnetToken
    : BigInt(0);

  for (const campaign of campaigns) {
    const totalEarningsAmountTestnetToken =
      campaign.totalEarningsAmountTestnetToken;

    const accountsForThisCampaign = Array.from(
      cache.accountPerCampaigns.values()
    ).filter((account) => account.campaignId === campaign.id);

    for (const accountPerCampaign of accountsForThisCampaign) {
      const percentage =
        (accountPerCampaign.totalEarningsAmountTestnetToken *
          precision *
          BigInt(100)) /
        totalEarningsAmountTestnetToken;

      accountPerCampaign.totalEarningsPercentageTestnetToken = percentage;

      cache.accountPerCampaigns.set(accountPerCampaign.id, accountPerCampaign);
    }
  }

  for (const account of accounts) {
    const percentage =
      (account.totalEarningsAmountTestnetToken * precision * BigInt(100)) /
      totalEarningsAmountTestnetToken;

    account.totalEarningsPercentageTestnetToken = percentage;

    cache.accounts.set(account.id, account);
  }

  return cache;
};
