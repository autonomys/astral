import { getBlockNumber } from ".";
import { TotalEarnings } from "../model";
import { CtxBlock } from "../processor";
import { Cache } from "./cache";

export const calculateTotalEarnings = async (
  cache: Cache,
  lastBlock: CtxBlock
) => {
  const blockNumber = getBlockNumber(lastBlock);

  let totalEarnings = cache.totalEarnings.get("0");
  if (!totalEarnings) {
    totalEarnings = new TotalEarnings({
      id: "0",
      totalEarningsAmountTestnetToken: BigInt(0),
      totalEarningsPercentageTestnetToken: "0",
      totalEarningsAmountATCToken: BigInt(0),
      totalEarningsPercentageATCToken: "0",
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    totalEarnings.totalEarningsAmountTestnetToken = BigInt(0);
    totalEarnings.totalEarningsAmountATCToken = BigInt(0);
    totalEarnings.updatedAt = blockNumber;
  }
  cache.totalEarnings.set(totalEarnings.id, totalEarnings);

  const campaigns = cache.campaigns.values();

  for (const campaign of campaigns) {
    totalEarnings.totalEarningsAmountTestnetToken +=
      campaign.totalEarningsAmountTestnetToken;
    totalEarnings.totalEarningsAmountATCToken +=
      campaign.totalEarningsAmountATCToken;
  }

  cache.isModified = true;

  return cache;
};
