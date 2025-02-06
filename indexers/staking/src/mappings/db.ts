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
  OperatorTaxCollection,
  RuntimeCreation,
  WithdrawEvent,
  WithdrawalHistory,
} from "../types";
import { getSortId } from "./utils";

export type Cache = {
  bundleSubmission: BundleSubmission[];
  depositEvent: DepositEvent[];
  depositHistory: DepositHistory[];
  domainBlockHistory: DomainBlockHistory[];
  domainInstantiation: DomainInstantiation[];
  domainStakingHistory: DomainStakingHistory[];
  operatorRegistration: OperatorRegistration[];
  operatorStakingHistory: OperatorStakingHistory[];
  operatorReward: OperatorReward[];
  operatorTaxCollection: OperatorTaxCollection[];
  runtimeCreation: RuntimeCreation[];
  withdrawEvent: WithdrawEvent[];
  withdrawalHistory: WithdrawalHistory[];
};

export const initializeCache = (): Cache => ({
  bundleSubmission: [],
  depositEvent: [],
  depositHistory: [],
  domainBlockHistory: [],
  domainInstantiation: [],
  domainStakingHistory: [],
  operatorRegistration: [],
  operatorStakingHistory: [],
  operatorReward: [],
  operatorTaxCollection: [],
  runtimeCreation: [],
  withdrawEvent: [],
  withdrawalHistory: [],
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
    store.bulkCreate(`OperatorStakingHistory`, cache.operatorStakingHistory),
    store.bulkCreate(`OperatorReward`, cache.operatorReward),
    store.bulkCreate(`OperatorTaxCollection`, cache.operatorTaxCollection),
    store.bulkCreate(`RuntimeCreation`, cache.runtimeCreation),
    store.bulkCreate(`WithdrawEvent`, cache.withdrawEvent),
    store.bulkCreate(`WithdrawalHistory`, cache.withdrawalHistory),
  ]);
};

export function createRuntimeCreation(
  runtimeId: string,
  name: string,
  type: string,
  createdBy: string,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): RuntimeCreation {
  return RuntimeCreation.create({
    id: runtimeId,
    sortId: getSortId(runtimeId),
    name,
    type,
    createdBy,
    blockHeight,
    extrinsicId,
    eventId,
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
  extrinsicId: string,
  eventId: string
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
    eventId,
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
  extrinsicId: string,
  eventId: string
): OperatorRegistration {
  return OperatorRegistration.create({
    id: operatorId,
    sortId: getSortId(domainId, operatorId),
    owner,
    domainId,
    signingKey,
    minimumNominatorStake,
    nominationTax,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createDepositEvent(
  accountId: string,
  domainId: string,
  operatorId: string,
  amount: bigint,
  storageFeeDeposit: bigint,
  totalAmount: bigint,
  timestamp: Date,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): DepositEvent {
  return DepositEvent.create({
    id: extrinsicId + "-" + accountId + "-" + domainId + "-" + operatorId,
    sortId: getSortId(blockHeight, extrinsicId),
    accountId,
    domainId,
    operatorId,
    nominatorId: accountId + "-" + domainId + "-" + operatorId,
    amount,
    storageFeeDeposit,
    totalAmount,
    timestamp,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createWithdrawEvent(
  accountId: string,
  domainId: string,
  operatorId: string,
  toWithdraw: string,
  amount1: bigint,
  amount2: bigint,
  totalAmount: bigint,
  timestamp: Date,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): WithdrawEvent {
  return WithdrawEvent.create({
    id: extrinsicId + "-" + accountId + "-" + domainId + "-" + operatorId,
    sortId: getSortId(blockHeight, extrinsicId),
    accountId,
    domainId,
    operatorId,
    nominatorId: accountId + "-" + domainId + "-" + operatorId,
    toWithdraw,
    amount1,
    amount2,
    totalAmount,
    timestamp,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createOperatorReward(
  domainId: string,
  operatorId: string,
  amount: bigint,
  atBlockNumber: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): OperatorReward {
  return OperatorReward.create({
    id: extrinsicId,
    domainId,
    operatorId,
    amount,
    atBlockNumber,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createOperatorTaxCollection(
  domainId: string,
  operatorId: string,
  amount: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): OperatorTaxCollection {
  return OperatorTaxCollection.create({
    id: extrinsicId,
    domainId,
    operatorId,
    amount,
    blockHeight,
    extrinsicId,
    eventId,
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
  burnedBalance: bigint,
  eventId: string
): BundleSubmission {
  return BundleSubmission.create({
    id: domainId + "-" + id,
    accountId,
    bundleId: id,
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
    eventId,
  });
}

export function createDomainBlockHistory(
  hash: string,
  domainId: string,
  domainBlockNumber: bigint,
  timestamp: Date,
  blockHeight: bigint
): DomainBlockHistory {
  return DomainBlockHistory.create({
    id: hash,
    domainId,
    domainBlockNumber,
    timestamp,
    blockHeight,
  });
}

export function createDomainStakingHistory(
  hash: string,
  domainId: string,
  currentEpochIndex: number,
  currentTotalStake: bigint,
  timestamp: Date,
  blockHeight: bigint
): DomainStakingHistory {
  return DomainStakingHistory.create({
    id: hash,
    domainId,
    currentEpochIndex,
    currentTotalStake,
    timestamp,
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
  depositsInEpoch: bigint,
  withdrawalsInEpoch: bigint,
  totalStorageFeeDeposit: bigint,
  sharePrice: bigint,
  partialStatus: string,
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
    depositsInEpoch,
    withdrawalsInEpoch,
    totalStorageFeeDeposit,
    sharePrice,
    partialStatus,
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
    nominatorId: accountId + "-" + operatorId,
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

export function createWithdrawalHistoryHistory(
  hash: string,
  domainId: string,
  accountId: string,
  operatorId: string,
  totalWithdrawalAmount: bigint,
  domainEpoch: number,
  unlockAtConfirmedDomainBlockNumber: bigint,
  shares: bigint,
  storageFeeRefund: bigint,
  blockHeight: bigint
): WithdrawalHistory {
  return WithdrawalHistory.create({
    id: hash,
    domainId,
    accountId,
    operatorId,
    nominatorId: accountId + "-" + operatorId,
    totalWithdrawalAmount,
    domainEpoch,
    unlockAtConfirmedDomainBlockNumber,
    shares,
    storageFeeRefund,
    blockHeight,
  });
}
