import {
  BundleSubmission,
  Deposit,
  Domain,
  Operator,
  OperatorReward,
  Runtime,
} from "../types";
import { getSortId } from "./utils";

export async function createAndSaveRuntime(
  runtimeId: string,
  name: string,
  type: string,
  createdBy: string,
  blockHeight: bigint,
  extrinsicId: string
): Promise<void> {
  const runtime = Runtime.create({
    id: runtimeId,
    sortId: getSortId(runtimeId),
    name,
    type,
    createdBy,
    blockHeight,
    extrinsicId,
  });
  await runtime.save();
}

export async function createAndSaveDomain(
  domainId: string,
  name: string,
  runtimeId: number,
  runtime: string,
  runtimeInfo: string,
  completedEpoch: bigint,
  createdBy: string,
  blockHeight: bigint,
  extrinsicId: string
): Promise<void> {
  const id = domainId.toLowerCase();
  const domain = Domain.create({
    id,
    sortId: getSortId(id),
    name,
    runtimeId,
    runtime,
    runtimeInfo,
    completedEpoch,
    createdBy,
    blockHeight,
    extrinsicId,
  });
  await domain.save();
}

export async function createAndSaveOperator(
  operatorId: string,
  owner: string,
  domainId: string,
  signingKey: string,
  minimumNominatorStake: bigint,
  nominationTax: number,
  blockHeight: bigint,
  extrinsicId: string
): Promise<void> {
  const id = operatorId.toLowerCase();
  const operator = Operator.create({
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
  await operator.save();
}

export async function createAndSaveDeposit(
  accountId: string,
  domainId: string,
  operatorId: string,
  amount: bigint,
  storageFeeDeposit: bigint,
  extrinsicId: string,
  blockHeight: bigint
): Promise<void> {
  const nominatorId = `${accountId}-${domainId}-${operatorId}`;
  const id = `${blockHeight}-${extrinsicId}-${nominatorId}`;
  const nominator = Deposit.create({
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
  await nominator.save();
}

export async function createAndSaveOperatorReward(
  operatorId: string,
  amount: bigint,
  atBlockNumber: bigint,
  extrinsicId: string,
  blockHeight: bigint
): Promise<void> {
  const nominator = OperatorReward.create({
    id: extrinsicId,
    operatorId,
    amount,
    atBlockNumber,
    extrinsicId,
    createdAt: blockHeight,
  });
  await nominator.save();
}

export async function createAndSaveBundleSubmission(
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
): Promise<void> {
  const bundleId = `${domainId}-${id.toLowerCase()}`;
  const bundle = BundleSubmission.create({
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
  await bundle.save();
}
