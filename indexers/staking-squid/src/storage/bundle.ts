import { randomUUID } from "crypto";
import { Bundle } from "../model";

export const createBundle = (
  accountId: string,
  domainId: string,
  operatorId: string,
  props?: Partial<Bundle>
): Bundle =>
  new Bundle({
    id: randomUUID(),
    accountId,
    domainId,
    operatorId,
    domainBlockNumber: 0,
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
