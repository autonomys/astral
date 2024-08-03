import { randomUUID } from "crypto";
import { Operator, OperatorRewardEvent, OperatorStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { getBlockNumber, getTimestamp, operatorUID } from "../utils";
import { Cache } from "../utils/cache";

export const createOperator = (
  block: CtxBlock,
  operatorId: number | string,
  props: Partial<Operator>
): Operator =>
  new Operator({
    id: typeof operatorId === "string" ? operatorId : operatorUID(operatorId),
    sortId: typeof operatorId === "string" ? parseInt(operatorId) : operatorId,
    signingKey: "0x",
    minimumNominatorStake: BigInt(0),
    nominationTax: 0,
    currentTotalStake: BigInt(0),
    currentStorageFeeDeposit: BigInt(0),
    currentEpochRewards: BigInt(0),
    currentTotalShares: BigInt(0),
    totalDeposits: BigInt(0),
    totalTaxCollected: BigInt(0),
    totalRewardsCollected: BigInt(0),
    totalTransfersIn: BigInt(0),
    transfersInCount: 0,
    totalTransfersOut: BigInt(0),
    transfersOutCount: 0,
    totalRejectedTransfersClaimed: BigInt(0),
    rejectedTransfersClaimedCount: 0,
    totalTransfersRejected: BigInt(0),
    transfersRejectedCount: 0,
    totalVolume: BigInt(0),
    totalConsensusStorageFee: BigInt(0),
    totalDomainExecutionFee: BigInt(0),
    totalBurnedBalance: BigInt(0),
    rawStatus: JSON.stringify({}),
    status: OperatorStatus.PENDING,
    activeEpochCount: 0,
    bundleCount: 0,
    lastBundleAt: 0,
    ...props,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateOperator = (
  cache: Cache,
  block: CtxBlock,
  operatorId: number | string,
  props: Partial<Operator> = {}
): Operator => {
  const operator = cache.operators.get(
    typeof operatorId === "string" ? operatorId : operatorUID(operatorId)
  );

  if (!operator) return createOperator(block, operatorId, props);

  return operator;
};

export const createOperatorRewardEvent = (
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  props: Partial<OperatorRewardEvent>
): OperatorRewardEvent =>
  new OperatorRewardEvent({
    id: randomUUID(),
    ...props,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
    extrinsicHash: extrinsic.hash.toString(),
  });
