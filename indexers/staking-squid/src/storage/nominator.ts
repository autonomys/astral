import { Nominator, NominatorPendingAction, NominatorStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { getBlockNumber, getCallSigner, nominatorUID } from "../utils";
import { Cache } from "../utils/cache";

export const createNominator = (
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  operatorId: number,
  props: Partial<Nominator>,
  address?: string
): Nominator => {
  if (!address) {
    address = getCallSigner(extrinsic.call);
  }

  return new Nominator({
    id: nominatorUID(operatorId, address),
    accountId: address,
    domainId: "",
    operatorId: operatorId.toString(),
    knownShares: BigInt(0),
    knownStorageFeeDeposit: BigInt(0),
    pendingAmount: BigInt(0),
    pendingStorageFeeDeposit: BigInt(0),
    pendingEffectiveDomainEpoch: 0,
    totalWithdrawalAmounts: BigInt(0),
    totalStorageFeeRefund: BigInt(0),
    unlockAtConfirmedDomainBlockNumber: [],
    pendingShares: BigInt(0),
    pendingStorageFeeRefund: BigInt(0),
    totalDeposits: BigInt(0),
    totalEstimatedWithdrawals: BigInt(0),
    totalWithdrawals: BigInt(0),
    totalDepositsCount: 0,
    totalWithdrawalsCount: 0,
    accumulatedEpochShares: BigInt(0),
    accumulatedEpochStorageFeeDeposit: BigInt(0),
    activeEpochCount: 0,
    status: NominatorStatus.PENDING,
    pendingAction: NominatorPendingAction.NO_ACTION_REQUIRED,
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
  props: Partial<Nominator> = {},
  address?: string
): Nominator => {
  if (!address) {
    address = getCallSigner(extrinsic.call);
  }
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
      },
      address
    );

  return nominator;
};
