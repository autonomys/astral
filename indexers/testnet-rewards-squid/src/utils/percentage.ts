import { Cache } from "./cache";

export const calculatePercentage = (cache: Cache): Cache => {
  const campaigns = cache.campaigns.values();

  for (const campaign of campaigns) {
    const totalEarningsAmountTestnetToken =
      campaign.totalEarningsAmountTestnetToken;

    const accountsForThisCampaign = Array.from(
      cache.accountPerCampaigns.values()
    ).filter((account) => account.campaignId === campaign.id);

    for (const accountPerCampaign of accountsForThisCampaign) {
      const percentage =
        (accountPerCampaign.totalEarningsAmountTestnetToken * BigInt(100)) /
        totalEarningsAmountTestnetToken;

      accountPerCampaign.totalEarningsPercentageTestnetToken =
        percentage.toString();

      cache.accountPerCampaigns.set(accountPerCampaign.id, accountPerCampaign);
    }
  }

  return cache;
};
