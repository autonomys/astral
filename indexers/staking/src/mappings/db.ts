import {
  BundleSubmission,
  DepositEvent,
  DepositHistory,
  DomainBlockHistory,
  DomainInstantiation,
  DomainStakingHistory,
  OperatorRegistration,
  OperatorReward,
  OperatorStakingHistory,
  RuntimeCreation,
} from "../types";
import { getSortId } from "./utils";

type Cache = {
  bundleSubmission: BundleSubmission[];
  depositEvent: DepositEvent[];
  depositHistory: DepositHistory[];
  domainBlockHistory: DomainBlockHistory[];
  domainInstantiation: DomainInstantiation[];
  domainStakingHistory: DomainStakingHistory[];
  operatorRegistration: OperatorRegistration[];
  operatorStakingHistory: OperatorStakingHistory[];
  operatorReward: OperatorReward[];
  runtimeCreation: RuntimeCreation[];
};

export const initializeCache = (): Cache => ({
  bundleSubmission: [],
  depositEvent: [],
  depositHistory: [],
  domainBlockHistory: [],
  domainInstantiation: [],
  domainStakingHistory: [],
  operatorRegistration: [],
  operatorReward: [],
  operatorStakingHistory: [],
  runtimeCreation: [],
});

export const saveCache = async (cache: Cache) => {
  await Promise.all([
    store.bulkCreate(`BundleSubmission`, cache.bundleSubmission),
    store.bulkCreate(`DepositEvent`, cache.depositEvent),
    store.bulkCreate(`DepositHistory`, cache.depositHistory),
    store.bulkCreate(`DomainBlockHistory`, cache.domainBlockHistory),
    store.bulkCreate(`DomainInstantiation`, cache.domainInstantiation),
    store.bulkCreate(`DomainStakingHistory`, cache.domainStakingHistory),
    store.bulkCreate(`OperatorRegistration`, cache.operatorRegistration),
    store.bulkCreate(`OperatorReward`, cache.operatorReward),
    store.bulkCreate(`OperatorStakingHistory`, cache.operatorStakingHistory),
    store.bulkCreate(`RuntimeCreation`, cache.runtimeCreation),
  ]);
};

export function createRuntimeCreation(
  runtimeId: string,
  name: string,
  type: string,
  createdBy: string,
  blockHeight: bigint,
  extrinsicId: string
): RuntimeCreation {
  return RuntimeCreation.create({
    id: runtimeId,
    sortId: getSortId(runtimeId),
    name,
    type,
    createdBy,
    blockHeight,
    extrinsicId,
  });
}

export function createDomainInstantiation(
  domainId: string,
  name: string,
  runtimeId: number,
  runtime: string,
  runtimeInfo: string,
  createdBy: string,
  blockHeight: bigint,
  extrinsicId: string
): DomainInstantiation {
  const id = domainId.toLowerCase();
  return DomainInstantiation.create({
    id,
    sortId: getSortId(id),
    name,
    runtimeId,
    runtime,
    runtimeInfo,
    createdBy,
    blockHeight,
    extrinsicId,
  });
}

export function createOperatorRegistration(
  operatorId: string,
  owner: string,
  domainId: string,
  signingKey: string,
  minimumNominatorStake: bigint,
  nominationTax: number,
  blockHeight: bigint,
  extrinsicId: string
): OperatorRegistration {
  const id = operatorId.toLowerCase();
  return OperatorRegistration.create({
    id,
    sortId: getSortId(domainId, id),
    owner,
    domainId,
    signingKey,
    minimumNominatorStake,
    nominationTax,
    blockHeight,
    extrinsicId,
  });
}

export function createDepositEvent(
  accountId: string,
  domainId: string,
  operatorId: string,
  amount: bigint,
  storageFeeDeposit: bigint,
  timestamp: Date,
  blockHeight: bigint,
  extrinsicId: string
): DepositEvent {
  const nominatorId = `${accountId}-${domainId}-${operatorId}`;
  const id = `${blockHeight}-${extrinsicId}-${nominatorId}`;
  return DepositEvent.create({
    id,
    sortId: `${getSortId(blockHeight, extrinsicId)}`,
    accountId,
    domainId,
    operatorId,
    nominatorId,
    amount,
    storageFeeDeposit,
    totalAmount: amount + storageFeeDeposit,
    timestamp,
    blockHeight,
    extrinsicId,
  });
}

export function createOperatorReward(
  operatorId: string,
  amount: bigint,
  atBlockNumber: bigint,
  blockHeight: bigint,
  extrinsicId: string
): OperatorReward {
  return OperatorReward.create({
    id: extrinsicId,
    operatorId,
    amount,
    atBlockNumber,
    blockHeight,
    extrinsicId,
  });
}

export function createBundleSubmission(
  id: string,
  accountId: string,
  domainId: string,
  domainBlockId: string,
  operatorId: string,
  domainBlockNumber: bigint,
  domainBlockHash: string,
  domainBlockExtrinsicRoot: string,
  consensusBlockNumber: bigint,
  consensusBlockHash: string,
  totalTransfersIn: bigint,
  transfersInCount: bigint,
  totalTransfersOut: bigint,
  transfersOutCount: bigint,
  totalRejectedTransfersClaimed: bigint,
  rejectedTransfersClaimedCount: bigint,
  totalTransfersRejected: bigint,
  transfersRejectedCount: bigint,
  totalVolume: bigint,
  consensusStorageFee: bigint,
  domainExecutionFee: bigint,
  burnedBalance: bigint
): BundleSubmission {
  const bundleId = `${domainId}-${id.toLowerCase()}`;
  return BundleSubmission.create({
    id: bundleId,
    accountId,
    bundleId,
    domainId,
    domainBlockId,
    operatorId,
    domainBlockNumber,
    domainBlockHash,
    domainBlockExtrinsicRoot,
    epoch: BigInt(0),
    consensusBlockNumber,
    consensusBlockHash,
    totalTransfersIn,
    transfersInCount,
    totalTransfersOut,
    transfersOutCount,
    totalRejectedTransfersClaimed,
    rejectedTransfersClaimedCount,
    totalTransfersRejected,
    transfersRejectedCount,
    totalVolume,
    consensusStorageFee,
    domainExecutionFee,
    burnedBalance,
  });
}

export function createDomainBlockHistory(
  hash: string,
  domainId: string,
  domainBlockNumber: bigint,
  blockHeight: bigint
): DomainBlockHistory {
  return DomainBlockHistory.create({
    id: hash,
    domainId,
    domainBlockNumber,
    blockHeight,
  });
}

export function createDomainStakingHistory(
  hash: string,
  domainId: string,
  currentEpochIndex: number,
  currentTotalStake: bigint,
  blockHeight: bigint
): DomainStakingHistory {
  return DomainStakingHistory.create({
    id: hash,
    domainId,
    currentEpochIndex,
    currentTotalStake,
    blockHeight,
  });
}

export function createOperatorStakingHistory(
  hash: string,
  operatorId: string,
  operatorOwner: string,
  signingKey: string,
  currentDomainId: string,
  currentTotalStake: bigint,
  currentTotalShares: bigint,
  currentEpochRewards: bigint,
  depositsInEpoch: bigint,
  withdrawalsInEpoch: bigint,
  totalStorageFeeDeposit: bigint,
  sharePrice: bigint,
  blockHeight: bigint
): OperatorStakingHistory {
  return OperatorStakingHistory.create({
    id: hash,
    operatorId,
    operatorOwner,
    signingKey,
    currentDomainId,
    currentTotalStake,
    currentTotalShares,
    currentEpochRewards,
    depositsInEpoch,
    withdrawalsInEpoch,
    totalStorageFeeDeposit,
    sharePrice,
    blockHeight,
  });
}

export function createDepositHistory(
  hash: string,
  accountId: string,
  operatorId: string,
  shares: bigint,
  storageFeeDeposit: bigint,
  sharesKnown: bigint,
  storageFeeDepositKnown: bigint,
  effectiveDomainIdPending: number,
  effectiveDomainEpochPending: number,
  amountPending: bigint,
  storageFeeDepositPending: bigint,
  blockHeight: bigint
): DepositHistory {
  return DepositHistory.create({
    id: hash,
    accountId,
    operatorId,
    nominatorId: `${accountId}-${operatorId}`,
    shares,
    storageFeeDeposit,
    sharesKnown,
    storageFeeDepositKnown,
    effectiveDomainIdPending,
    effectiveDomainEpochPending,
    amountPending,
    storageFeeDepositPending,
    blockHeight,
  });
}
