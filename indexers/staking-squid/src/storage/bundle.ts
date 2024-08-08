import { randomUUID } from "crypto";
import { Bundle, BundleAuthor } from "../model";
import { bundleUID } from "../utils";
import { Cache } from "../utils/cache";

export const createBundle = (
  domainId: string,
  domainBlockHash: string,
  props?: Partial<Bundle>
): Bundle =>
  new Bundle({
    id: bundleUID(domainId, domainBlockHash),
    domainId,
    domainBlockNumber: 0,
    domainBlockHash: "",
    domainBlockExtrinsicRoot: "",
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
  bundleId: string,
  accountId: string,
  operatorId: string,
  props?: Partial<BundleAuthor>
): BundleAuthor =>
  new BundleAuthor({
    id: randomUUID(),
    bundleId,
    accountId,
    operatorId,
    ...props,
  });
