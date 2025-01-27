import {
  BundleSubmission,
  Deposit,
  DomainInstantiation,
  OperatorRegistration,
  OperatorReward,
  RuntimeCreation,
} from "../types";
import { getSortId } from "./utils";

type Cache = {
  bundleSubmission: BundleSubmission[];
  deposit: Deposit[];
  domainInstantiation: DomainInstantiation[];
  operatorRegistration: OperatorRegistration[];
  operatorReward: OperatorReward[];
  runtimeCreation: RuntimeCreation[];
};

export const initializeCache = (): Cache => ({
  bundleSubmission: [],
  deposit: [],
  domainInstantiation: [],
  operatorRegistration: [],
  operatorReward: [],
  runtimeCreation: [],
});

export const saveCache = async (cache: Cache) => {
  await Promise.all([
    store.bulkCreate(`BundleSubmission`, cache.bundleSubmission),
    store.bulkCreate(`Deposit`, cache.deposit),
    store.bulkCreate(`DomainInstantiation`, cache.domainInstantiation),
    store.bulkCreate(`OperatorRegistration`, cache.operatorRegistration),
    store.bulkCreate(`OperatorReward`, cache.operatorReward),
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

export function createDeposit(
  accountId: string,
  domainId: string,
  operatorId: string,
  amount: bigint,
  storageFeeDeposit: bigint,
  extrinsicId: string,
  blockHeight: bigint
): Deposit {
  const nominatorId = `${accountId}-${domainId}-${operatorId}`;
  const id = `${blockHeight}-${extrinsicId}-${nominatorId}`;
  return Deposit.create({
    id,
    sortId: `${getSortId(blockHeight, extrinsicId)}`,
    accountId,
    domainId,
    operatorId,
    nominatorId,
    amount,
    storageFeeDeposit,
    totalAmount: amount + storageFeeDeposit,
    extrinsicId,
    createdAt: blockHeight,
  });
}

export function createOperatorReward(
  operatorId: string,
  amount: bigint,
  atBlockNumber: bigint,
  extrinsicId: string,
  blockHeight: bigint
): OperatorReward {
  return OperatorReward.create({
    id: extrinsicId,
    operatorId,
    amount,
    atBlockNumber,
    extrinsicId,
    createdAt: blockHeight,
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
