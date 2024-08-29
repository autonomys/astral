import { Campaign } from "../model";
import type { CtxBlock } from "../processor";
import { getBlockNumber } from "../utils";
import { Cache } from "../utils/cache";

export const createCampaign = (
  block: CtxBlock,
  id: string,
  props: Partial<Campaign> = {}
): Campaign => {
  const blockNumber = getBlockNumber(block);
  return new Campaign({
    id: id,
    name: props.name ?? "",
    totalEarningsAmountTestnetToken:
      props.totalEarningsAmountTestnetToken ?? BigInt(0),
    totalEarningsPercentageTestnetToken:
      props.totalEarningsPercentageTestnetToken ?? "",
    totalEarningsAmountATCToken: props.totalEarningsAmountATCToken ?? BigInt(0),
    totalEarningsPercentageATCToken:
      props.totalEarningsPercentageATCToken ?? "",
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
};

export const getOrCreateCampaign = (
  cache: Cache,
  block: CtxBlock,
  id: string,
  props: Partial<Campaign> = {}
): Campaign => {
  const campaign = cache.campaigns.get(id);

  if (!campaign) return createCampaign(block, id, props);

  return campaign;
};
