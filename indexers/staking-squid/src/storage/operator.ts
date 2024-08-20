import { randomUUID } from "crypto";
import {
  Operator,
  OperatorPendingAction,
  OperatorStatus,
  RewardEvent,
} from "../model";
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
    accountId: "",
    domainId: "",
    signingKey: "0x",
    minimumNominatorStake: BigInt(0),
    nominationTax: 0,
    name: "",
    description: "",
    icon: "",
    banner: "",
    website: "",
    websiteVerified: false,
    email: "",
    emailVerified: false,
    discord: "",
    github: "",
    twitter: "",
    currentTotalStake: BigInt(0),
    currentStorageFeeDeposit: BigInt(0),
    currentEpochRewards: BigInt(0),
    currentTotalShares: BigInt(0),
    currentSharePrice: BigInt(0),
    rawStatus: JSON.stringify({}),
    totalDeposits: BigInt(0),
    totalEstimatedWithdrawals: BigInt(0),
    totalWithdrawals: BigInt(0),
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
    accumulatedEpochShares: BigInt(0),
    accumulatedEpochStorageFeeDeposit: BigInt(0),
    activeEpochCount: 0,
    bundleCount: 0,
    status: OperatorStatus.PENDING,
    pendingAction: OperatorPendingAction.NO_ACTION_REQUIRED,
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

export const createRewardEvent = (
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  props: Partial<RewardEvent>
): RewardEvent =>
  new RewardEvent({
    id: randomUUID(),
    ...props,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
    extrinsicHash: extrinsic.hash.toString(),
  });
