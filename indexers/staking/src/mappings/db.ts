import { Operator } from "@autonomys/auto-consensus";
import {
  BundleSubmission,
  DepositEvent,
  DepositHistory,
  DomainBlockHistory,
  DomainInstantiation,
  DomainStakingHistory,
  NominatorsUnlockedEvent,
  OperatorDeregistration,
  OperatorRegistration,
  OperatorReward,
  OperatorStakingHistory,
  OperatorTaxCollection,
  RuntimeCreation,
  UnlockedEvent,
  WithdrawEvent,
  WithdrawalHistory,
} from "../types";
import { getNominationId, getSortId } from "./utils";

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
  operatorDeregistration: OperatorDeregistration[];
  runtimeCreation: RuntimeCreation[];
  withdrawEvent: WithdrawEvent[];
  withdrawalHistory: WithdrawalHistory[];
  unlockedEvent: UnlockedEvent[];
  nominatorsUnlockedEvent: NominatorsUnlockedEvent[];
  // only for caching purposes
  parentBlockOperators: Operator[];
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
  operatorDeregistration: [],
  runtimeCreation: [],
  withdrawEvent: [],
  withdrawalHistory: [],
  unlockedEvent: [],
  nominatorsUnlockedEvent: [],
  // only for caching purposes
  parentBlockOperators: [],
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
    store.bulkCreate(`OperatorDeregistration`, cache.operatorDeregistration),
    store.bulkCreate(`RuntimeCreation`, cache.runtimeCreation),
    store.bulkCreate(`WithdrawEvent`, cache.withdrawEvent),
    store.bulkCreate(`WithdrawalHistory`, cache.withdrawalHistory),
    store.bulkCreate(`UnlockedEvent`, cache.unlockedEvent),
    store.bulkCreate(`NominatorsUnlockedEvent`, cache.nominatorsUnlockedEvent),
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
    id: extrinsicId + "-" + getNominationId(accountId, domainId, operatorId),
    sortId: getSortId(blockHeight, extrinsicId),
    accountId,
    domainId,
    operatorId,
    nominatorId: getNominationId(accountId, domainId, operatorId),
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
  shares: bigint,
  storageFeeRefund: bigint,
  timestamp: Date,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): WithdrawEvent {
  return WithdrawEvent.create({
    id: extrinsicId + "-" + getNominationId(accountId, domainId, operatorId),
    sortId: getSortId(blockHeight, extrinsicId),
    accountId,
    domainId,
    operatorId,
    nominatorId: getNominationId(accountId, domainId, operatorId),
    toWithdraw,
    shares,
    storageFeeRefund,
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

export function createUnlockedEvent(
  domainId: string,
  operatorId: string,
  accountId: string,
  amount: bigint,
  storageFee: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): UnlockedEvent {
  return UnlockedEvent.create({
    id: extrinsicId,
    domainId,
    operatorId,
    accountId,
    nominatorId: getNominationId(accountId, domainId, operatorId),
    amount,
    storageFee,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createNominatorsUnlockedEvent(
  domainId: string,
  operatorId: string,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): NominatorsUnlockedEvent {
  return NominatorsUnlockedEvent.create({
    id: extrinsicId,
    domainId,
    operatorId,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createOperatorDeregistration(
  operatorId: string,
  owner: string,
  domainId: string,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): OperatorDeregistration {
  return OperatorDeregistration.create({
    id: operatorId,
    owner,
    domainId,
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
  epoch: bigint,
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
  blockHeight: bigint,
  extrinsicId: string,
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
    epoch,
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
    blockHeight,
    extrinsicId,
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
  timestamp: Date,
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
    timestamp,
    blockHeight,
  });
}

export function createDepositHistory(
  hash: string,
  domainId: string,
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
  timestamp: Date,
  blockHeight: bigint
): DepositHistory {
  return DepositHistory.create({
    id: hash,
    domainId,
    accountId,
    operatorId,
    nominatorId: getNominationId(accountId, domainId, operatorId),
    shares,
    storageFeeDeposit,
    sharesKnown,
    storageFeeDepositKnown,
    effectiveDomainIdPending,
    effectiveDomainEpochPending,
    amountPending,
    storageFeeDepositPending,
    timestamp,
    blockHeight,
  });
}

export function createWithdrawalHistory(
  hash: string,
  domainId: string,
  accountId: string,
  operatorId: string,
  totalWithdrawalAmount: bigint,
  domainEpoch: number,
  unlockAtConfirmedDomainBlockNumber: bigint,
  shares: bigint,
  storageFeeRefund: bigint,
  timestamp: Date,
  blockHeight: bigint
): WithdrawalHistory {
  return WithdrawalHistory.create({
    id: hash,
    domainId,
    accountId,
    operatorId,
    nominatorId: getNominationId(accountId, domainId, operatorId),
    totalWithdrawalAmount,
    domainEpoch,
    unlockAtConfirmedDomainBlockNumber,
    shares,
    storageFeeRefund,
    timestamp,
    blockHeight,
  });
}
