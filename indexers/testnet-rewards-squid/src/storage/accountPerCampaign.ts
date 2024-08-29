import { AccountPerCampaign } from "../model";
import type { CtxBlock } from "../processor";
import { getBlockNumber } from "../utils";
import { Cache } from "../utils/cache";

export const createAccountPerCampaign = (
  block: CtxBlock,
  id: string,
  props: Partial<AccountPerCampaign> = {}
): AccountPerCampaign => {
  const blockNumber = getBlockNumber(block);
  return new AccountPerCampaign({
    id: id,
    accountId: props.accountId ?? "",
    campaignId: props.campaignId ?? "",
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

export const getOrCreateAccountPerCampaign = (
  cache: Cache,
  block: CtxBlock,
  id: string,
  props: Partial<AccountPerCampaign> = {}
): AccountPerCampaign => {
  const accountPerCampaign = cache.accountPerCampaigns.get(id);

  if (!accountPerCampaign) return createAccountPerCampaign(block, id, props);

  return accountPerCampaign;
};
