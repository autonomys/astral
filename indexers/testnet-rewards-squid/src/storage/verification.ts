import { Verification } from "../model";
import type { CtxBlock } from "../processor";
import { getBlockNumber } from "../utils";
import { Cache } from "../utils/cache";

export const createVerification = (
  block: CtxBlock,
  id: string,
  props: Partial<Verification> = {}
): Verification => {
  const blockNumber = getBlockNumber(block);
  return new Verification({
    id: id,
    accountIds: props.accountIds ?? [],
    totalAmount: props.totalAmount ?? BigInt(0),
    totalPercentage: props.totalPercentage ?? "",
    totalCampaignsParticipated: props.totalCampaignsParticipated ?? BigInt(0),
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
};

export const getOrCreateVerification = (
  cache: Cache,
  block: CtxBlock,
  id: string,
  props: Partial<Verification> = {}
): Verification => {
  const verification = cache.verifications.get(id);

  if (!verification) return createVerification(block, id, props);

  return verification;
};
