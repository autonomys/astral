import { Nominator, NominatorStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { getBlockNumber, getCallSigner, nominatorUID } from "../utils";
import { Cache } from "../utils/cache";

export const createNominator = (
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  operatorId: number,
  props: Partial<Nominator>
): Nominator => {
  const address = getCallSigner(extrinsic.call);

  return new Nominator({
    id: nominatorUID(operatorId, address),
    shares: BigInt(0),
    totalDeposits: BigInt(0),
    status: NominatorStatus.PENDING,
    ...props,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });
};

export const getOrCreateNominator = (
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  operatorId: number | string,
  props: Partial<Nominator> = {}
): Nominator => {
  const address = getCallSigner(extrinsic.call);
  const nominator = cache.nominators.get(
    typeof operatorId === "string"
      ? operatorId
      : nominatorUID(operatorId, address)
  );

  if (!nominator)
    return createNominator(
      block,
      extrinsic,
      typeof operatorId === "string" ? parseInt(operatorId) : operatorId,
      {
        ...props,
      }
    );

  return nominator;
};
