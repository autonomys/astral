import { randomUUID } from "crypto";
import { Bundle, BundleAuthor } from "../model";
import { bundleUID } from "../utils";

export const createBundle = (
  domainId: string,
  domainBlockId: string,
  domainBlockHash: string,
  domainBlockBundleIndex: number | string,
  props?: Partial<Bundle>
): Bundle =>
  new Bundle({
    id: bundleUID(domainId, domainBlockHash, domainBlockBundleIndex),
    domainId,
    domainBlockId,
    domainEpochId: "",
    domainBlockNumber: 0,
    domainBlockHash: "",
    domainBlockExtrinsicRoot: "",
    epoch: 0,
    consensusBlockNumber: 0,
    consensusBlockHash: "",
    totalTransfersIn: BigInt(0),
    transfersInCount: 0,
    totalTransfersOut: BigInt(0),
    transfersOutCount: 0,
    totalRejectedTransfersClaimed: BigInt(0),
    rejectedTransfersClaimedCount: 0,
    totalTransfersRejected: BigInt(0),
    transfersRejectedCount: 0,
    totalVolume: BigInt(0),
    consensusStorageFee: BigInt(0),
    domainExecutionFee: BigInt(0),
    burnedBalance: BigInt(0),
    ...props,
  });

export const createBundleAuthor = (
  domainId: string,
  accountId: string,
  operatorId: string,
  bundleId: string,
  domainBlockId: string,
  epoch: number,
  props?: Partial<BundleAuthor>
): BundleAuthor =>
  new BundleAuthor({
    id: bundleUID(domainId, bundleId, operatorId),
    domainId,
    accountId,
    operatorId,
    bundleId,
    domainBlockId,
    domainEpochId: "",
    epoch,
    ...props,
  });
