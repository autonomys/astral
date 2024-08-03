import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  createBundle,
  getOrCreateAccount,
  getOrCreateDomain,
  getOrCreateOperator,
} from "../storage";
import { ExecutionReceipt, SealedBundleHeader, Transfers } from "../types/v1";
import { getBlockNumber } from "../utils";
import { Cache } from "../utils/cache";

export function processBundleStoredEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const domainId = Number(event.args.domainId);
  const operatorId = Number(event.args.bundleAuthor);

  const sealedHeader = extrinsic.call?.args.opaqueBundle
    .sealedHeader as SealedBundleHeader;
  const domain = getOrCreateDomain(cache, block, domainId);
  const operator = getOrCreateOperator(cache, block, operatorId);
  const account = getOrCreateAccount(cache, block, operator.accountId);

  const receipt = sealedHeader.header.receipt as ExecutionReceipt;
  const transfers = receipt.transfers as Transfers;
  const totalTransfersIn = transfers.transfersIn.reduce(
    (acc, t) => acc + BigInt(t[1]),
    BigInt(0)
  );
  const transfersInCount = Number(transfers.transfersIn.length);
  const totalTransfersOut = transfers.transfersOut.reduce(
    (acc, t) => acc + BigInt(t[1]),
    BigInt(0)
  );
  const transfersOutCount = Number(transfers.transfersOut.length);
  const totalRejectedTransfersClaimed =
    transfers.rejectedTransfersClaimed.reduce(
      (acc, t) => acc + BigInt(t[1]),
      BigInt(0)
    );
  const rejectedTransfersClaimedCount = Number(
    transfers.rejectedTransfersClaimed.length
  );
  const totalTransfersRejected = transfers.transfersRejected.reduce(
    (acc, t) => acc + BigInt(t[1]),
    BigInt(0)
  );
  const transfersRejectedCount = Number(transfers.transfersRejected.length);
  const totalVolume = totalTransfersIn + totalTransfersOut;

  const bundle = createBundle(account.id, domain.id, operator.id, {
    domainBlockNumber: Number(receipt.domainBlockNumber),
    consensusBlockNumber: Number(receipt.consensusBlockNumber),
    consensusBlockHash: receipt.consensusBlockHash,
    totalTransfersIn,
    transfersInCount,
    totalTransfersOut,
    transfersOutCount,
    totalRejectedTransfersClaimed,
    rejectedTransfersClaimedCount,
    totalTransfersRejected,
    transfersRejectedCount,
    totalVolume,
    consensusStorageFee: BigInt(receipt.blockFees.consensusStorageFee),
    domainExecutionFee: BigInt(receipt.blockFees.domainExecutionFee),
    burnedBalance: BigInt(receipt.blockFees.burnedBalance),
  });
  cache.bundles.set(bundle.id, bundle);

  domain.lastDomainBlockNumber = Number(receipt.domainBlockNumber);
  domain.updatedAt = getBlockNumber(block);

  cache.domains.set(domain.id, domain);

  operator.bundleCount++;
  operator.lastBundleAt = getBlockNumber(block);
  operator.updatedAt = getBlockNumber(block);

  cache.operators.set(operator.id, operator);

  return cache;
}
