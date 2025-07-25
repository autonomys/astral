import { Operator, Withdrawal } from '@autonomys/auto-consensus';
import {
  BundleSubmission,
  DomainInstantiation,
  NominatorDeposit,
  NominatorsUnlockedEvent,
  NominatorWithdrawal,
  OperatorDeregistration,
  OperatorEpochSharePrice,
  OperatorRegistration,
  OperatorReward,
  OperatorTaxCollection,
  RuntimeCreation,
  StorageFundAccount,
  UnlockedEvent,
} from '../types';
import { getNominationId } from './utils';

export type Cache = {
  bundleSubmission: BundleSubmission[];
  domainInstantiation: DomainInstantiation[];
  operatorRegistration: OperatorRegistration[];
  operatorReward: OperatorReward[];
  operatorTaxCollection: OperatorTaxCollection[];
  operatorDeregistration: OperatorDeregistration[];
  runtimeCreation: RuntimeCreation[];
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
  withdrawEvent: any[];
};

export const initializeCache = (): Cache => ({
  bundleSubmission: [],
  domainInstantiation: [],
  operatorRegistration: [],
  operatorReward: [],
  operatorTaxCollection: [],
  operatorDeregistration: [],
  runtimeCreation: [],
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
  withdrawEvent: [],
});

export const saveCache = async (cache: Cache) => {
  await Promise.all([
    store.bulkCreate(`BundleSubmission`, cache.bundleSubmission),
    store.bulkCreate(`DomainInstantiation`, cache.domainInstantiation),
    store.bulkCreate(`OperatorRegistration`, cache.operatorRegistration),
    store.bulkCreate(`OperatorReward`, cache.operatorReward),
    store.bulkCreate(`OperatorTaxCollection`, cache.operatorTaxCollection),
    store.bulkCreate(`OperatorDeregistration`, cache.operatorDeregistration),
    store.bulkCreate(`RuntimeCreation`, cache.runtimeCreation),
    store.bulkCreate(`UnlockedEvent`, cache.unlockedEvent),
    store.bulkCreate(`NominatorsUnlockedEvent`, cache.nominatorsUnlockedEvent),
    store.bulkCreate(`OperatorEpochSharePrice`, cache.operatorEpochSharePrice),
    store.bulkCreate(`NominatorDeposit`, cache.nominatorDeposit),
    store.bulkCreate(`NominatorWithdrawal`, cache.nominatorWithdrawal),
    store.bulkCreate(`StorageFundAccount`, cache.storageFundAccount),
  ]);
};

export function createRuntimeCreation(
  runtimeId: string,
  name: string,
  type: string,
  createdBy: string,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
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
  eventId: string,
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
  eventId: string,
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
    processed: false,
  });
}

export function createOperatorReward(
  domainId: string,
  operatorId: string,
  amount: bigint,
  atBlockNumber: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
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
    processed: false,
  });
}

export function createOperatorTaxCollection(
  domainId: string,
  operatorId: string,
  amount: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
): OperatorTaxCollection {
  return OperatorTaxCollection.create({
    id: eventId,
    domainId,
    operatorId,
    amount,
    blockHeight,
    extrinsicId,
    eventId,
    processed: false,
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
  eventId: string,
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
  address: string,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
): NominatorsUnlockedEvent {
  return NominatorsUnlockedEvent.create({
    id: eventId,
    domainId,
    operatorId,
    address,
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
  eventId: string,
): OperatorDeregistration {
  return OperatorDeregistration.create({
    id: operatorId,
    owner,
    domainId,
    blockHeight,
    extrinsicId,
    eventId,
    processed: false,
  });
}

export function createBundleSubmission(
  id: string,
  proposer: string,
  domainId: string,
  operatorId: string,
  domainBlockNumber: bigint,
  epoch: bigint,
  consensusBlockNumber: bigint,
  extrinsicId: string,
  eventId: string,
  blockHeight: bigint,
): BundleSubmission {
  return BundleSubmission.create({
    id: domainId + '-' + id,
    proposer,
    bundleId: id,
    domainId,
    operatorId,
    domainBlockNumber,
    epoch,
    consensusBlockNumber,
    extrinsicId,
    eventId,
    blockHeight,
    processed: false,
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
  blockHeight: bigint,
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
  processed: boolean,
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
  processed: boolean,
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
  blockHeight: bigint,
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

// RUNTIME CACHE FUNCTIONS

export function createWithdrawEvent(
  address: string,
  domainId: string,
  operatorId: string,
  timestamp: Date,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
): any {
  return {
    address,
    domainId,
    operatorId,
    nominatorId: getNominationId(address, domainId, operatorId),
    timestamp,
    blockHeight,
    extrinsicId,
    eventId,
  };
}

export function createNominatorDepositEvent(
  address: string,
  domainId: string,
  operatorId: string,
  extrinsicId: string,
  eventId: string,
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
