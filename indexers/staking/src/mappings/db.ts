import { Operator, Withdrawal } from "@autonomys/auto-consensus";
import {
  BundleSubmission,
  DomainBlockHistory,
  DomainInstantiation,
  DomainStakingHistory,
  NominatorDeposit,
  NominatorsUnlockedEvent,
  NominatorWithdrawal,
  OperatorDeregistration,
  OperatorEpochSharePrice,
  OperatorRegistration,
  OperatorReward,
  OperatorStakingHistory,
  OperatorTaxCollection,
  RuntimeCreation,
  StorageFundAccount,
  UnlockedEvent,
  WithdrawEvent,
} from "../types";
import { getNominationId } from "./utils";

export type Cache = {
  bundleSubmission: BundleSubmission[];
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
  unlockedEvent: UnlockedEvent[];
  nominatorsUnlockedEvent: NominatorsUnlockedEvent[];
  operatorEpochSharePrice: OperatorEpochSharePrice[];
  nominatorDeposit: any[];
  nominatorWithdrawal: any[];
  storageFundAccount: any[];
  // only for caching purposes
  parentBlockOperators: Operator[];
  currentWithdrawal: Withdrawal[];

  // Event tracking
  nominatorDepositEvent: any[];
};

export const initializeCache = (): Cache => ({
  bundleSubmission: [],
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
  unlockedEvent: [],
  nominatorsUnlockedEvent: [],
  operatorEpochSharePrice: [],
  nominatorDeposit: [],
  nominatorWithdrawal: [],
  storageFundAccount: [],
  // only for caching purposes
  parentBlockOperators: [],
  currentWithdrawal: [],

  // Event tracking
  nominatorDepositEvent: [],
});

export const saveCache = async (cache: Cache) => {
  await Promise.all([
    store.bulkCreate(`BundleSubmission`, cache.bundleSubmission),
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
    store.bulkCreate(`UnlockedEvent`, cache.unlockedEvent),
    store.bulkCreate(`NominatorsUnlockedEvent`, cache.nominatorsUnlockedEvent),
    store.bulkCreate(`OperatorEpochSharePrice`, cache.operatorEpochSharePrice),
    store.bulkCreate(`NominatorDeposit`, cache.nominatorDeposit),
    store.bulkCreate(`NominatorWithdrawal`, cache.nominatorWithdrawal),
    store.bulkCreate(`StorageFundAccount`, cache.storageFundAccount),
  ]);
};

// Helper Cache functions
export function createNominatorDepositEvent(
  address: string,
  domainId: string,
  operatorId: string,
  extrinsicId: string,
  eventId: string
): any {
  return {
    address,
    domainId,
    operatorId,
    nominatorId: getNominationId(address, domainId, operatorId),
    extrinsicId,
    eventId,
  };
}


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

export function createWithdrawEvent(
  address: string,
  domainId: string,
  operatorId: string,
  timestamp: Date,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): WithdrawEvent {
  return WithdrawEvent.create({
    id: eventId + "-" + getNominationId(address, domainId, operatorId),
    address,
    domainId,
    operatorId,
    nominatorId: getNominationId(address, domainId, operatorId),
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
    id: eventId,
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
    id: eventId,
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
  address: string,
  amount: bigint,
  storageFee: bigint,
  timestamp: Date,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): UnlockedEvent {
  return UnlockedEvent.create({
    id: eventId,
    domainId,
    operatorId,
    address,
    nominatorId: getNominationId(address, domainId, operatorId),
    amount,
    storageFee,
    timestamp,
    blockHeight,
    extrinsicId,
    eventId,
    processed: false,
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
    id: eventId,
    domainId,
    operatorId,
    blockHeight,
    extrinsicId,
    eventId,
    processed: false,
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
  address: string,
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
    address,
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

export function createOperatorEpochSharePrice(
  operatorId: string,
  domainId: string,
  epochIndex: number,
  sharePrice: bigint,
  totalStake: bigint,
  totalShares: bigint,
  timestamp: Date,
  blockHeight: bigint
): OperatorEpochSharePrice {
  const id = `${operatorId}-${domainId}-${epochIndex}`;
  return OperatorEpochSharePrice.create({
    id,
    operatorId,
    domainId,
    epochIndex,
    sharePrice,
    totalStake,
    totalShares,
    timestamp,
    blockHeight,
  });
}

export function createNominatorDeposit(
  id: string,
  address: string,
  operatorId: string,
  domainId: string,
  knownShares: bigint,
  knownStorageFeeDeposit: bigint,
  pendingAmount: bigint,
  pendingStorageFeeDeposit: bigint,
  pendingEffectiveDomainEpoch: bigint,
  extrinsicIds: string,
  eventIds: string,
  timestamp: Date,
  blockHeights: string,
  blockHeight: bigint,
  processed: boolean
) {
  return NominatorDeposit.create({
    id,
    address,
    operatorId,
    domainId,
    knownShares,
    knownStorageFeeDeposit,
    pendingAmount,
    pendingStorageFeeDeposit,
    pendingEffectiveDomainEpoch,
    extrinsicIds,
    eventIds,
    timestamp,
    blockHeights,
    blockHeight,
    processed,
  });
}

export function createNominatorWithdrawal(
  id: string,
  address: string,
  operatorId: string,
  domainId: string,
  withdrawalInSharesAmount: bigint,
  withdrawalInSharesStorageFeeRefund: bigint,
  withdrawalInSharesDomainEpoch: string,
  withdrawalInSharesUnlockBlock: bigint,
  totalWithdrawalAmount: bigint,
  totalStorageFeeWithdrawal: bigint,
  withdrawalsJson: string,
  totalPendingWithdrawals: bigint,
  timestamp: Date,
  blockHeight: bigint,
  eventIds: string,
  extrinsicIds: string,
  blockHeights: string,
  processed: boolean
) {
  return NominatorWithdrawal.create({
    id,
    address,
    operatorId,
    domainId,
    withdrawalInSharesAmount,
    withdrawalInSharesStorageFeeRefund,
    withdrawalInSharesDomainEpoch,
    withdrawalInSharesUnlockBlock,
    totalWithdrawalAmount,
    totalStorageFeeWithdrawal,
    withdrawalsJson,
    totalPendingWithdrawals,
    timestamp,
    blockHeight,
    processed,
    eventIds,
    extrinsicIds,
    blockHeights,
  });
}

export function createStorageFundAccount(
  operatorId: string,
  address: string,
  balance: bigint,
  timestamp: Date,
  blockHeight: bigint
) {
  return StorageFundAccount.create({
    id: operatorId,
    operatorId,
    address,
    balance,
    timestamp,
    blockHeight,
  });
}
