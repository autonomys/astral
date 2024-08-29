import { Reward } from "../model";
import type { CtxBlock } from "../processor";
import { getBlockNumber } from "../utils";
import { Cache } from "../utils/cache";

export const createReward = (
  block: CtxBlock,
  id: string,
  props: Partial<Reward> = {}
): Reward => {
  const blockNumber = getBlockNumber(block);
  return new Reward({
    id: id,
    campaignId: props.campaignId ?? "",
    accountId: props.accountId ?? "",
    amount: props.amount ?? BigInt(0),
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
};

export const getOrCreateReward = (
  cache: Cache,
  block: CtxBlock,
  id: string,
  props: Partial<Reward> = {}
): Reward => {
  const reward = cache.rewards.get(id);

  if (!reward) return createReward(block, id, props);

  return reward;
};
