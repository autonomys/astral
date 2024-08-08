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
  const { domainId, bundleAuthor } = event.args;
  const domainIdNum = Number(domainId);
  const operatorId = Number(bundleAuthor);

  const sealedHeader = extrinsic.call?.args.opaqueBundle
    .sealedHeader as SealedBundleHeader;
  const domain = getOrCreateDomain(cache, block, domainIdNum);
  const operator = getOrCreateOperator(cache, block, operatorId);
  const account = getOrCreateAccount(cache, block, operator.accountId);

  const receipt = sealedHeader.header.receipt as ExecutionReceipt;
  const { transfers } = receipt;

  const totalTransfersIn = transfers.transfersIn.reduce(
    (acc, [, amount]) => acc + BigInt(amount),
    BigInt(0)
  );
  const transfersInCount = transfers.transfersIn.length;

  const totalTransfersOut = transfers.transfersOut.reduce(
    (acc, [, amount]) => acc + BigInt(amount),
    BigInt(0)
  );
  const transfersOutCount = transfers.transfersOut.length;

  const totalRejectedTransfersClaimed =
    transfers.rejectedTransfersClaimed.reduce(
      (acc, [, amount]) => acc + BigInt(amount),
      BigInt(0)
    );
  const rejectedTransfersClaimedCount =
    transfers.rejectedTransfersClaimed.length;

  const totalTransfersRejected = transfers.transfersRejected.reduce(
    (acc, [, amount]) => acc + BigInt(amount),
    BigInt(0)
  );
  const transfersRejectedCount = transfers.transfersRejected.length;

  const totalVolume = totalTransfersIn + totalTransfersOut;

  const {
    domainBlockNumber,
    consensusBlockNumber,
    consensusBlockHash,
    blockFees,
  } = receipt;

  const bundle = createBundle(account.id, domain.id, operator.id, {
    domainBlockNumber: Number(domainBlockNumber),
    consensusBlockNumber: Number(consensusBlockNumber),
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
    consensusStorageFee: BigInt(blockFees.consensusStorageFee),
    domainExecutionFee: BigInt(blockFees.domainExecutionFee),
    burnedBalance: BigInt(blockFees.burnedBalance),
  });

  cache.bundles.set(bundle.id, bundle);

  domain.lastDomainBlockNumber = Number(domainBlockNumber);
  domain.totalTransfersIn += totalTransfersIn;
  domain.transfersInCount += transfersInCount;
  domain.totalTransfersOut += totalTransfersOut;
  domain.transfersOutCount += transfersOutCount;
  domain.totalRejectedTransfersClaimed += totalRejectedTransfersClaimed;
  domain.rejectedTransfersClaimedCount += rejectedTransfersClaimedCount;
  domain.totalTransfersRejected += totalTransfersRejected;
  domain.transfersRejectedCount += transfersRejectedCount;
  domain.totalVolume += totalVolume;
  domain.totalConsensusStorageFee += BigInt(blockFees.consensusStorageFee);
  domain.totalDomainExecutionFee += BigInt(blockFees.domainExecutionFee);
  domain.totalBurnedBalance += BigInt(blockFees.burnedBalance);
  domain.bundleCount++;
  domain.lastBundleAt = getBlockNumber(block);
  domain.updatedAt = getBlockNumber(block);

  cache.domains.set(domain.id, domain);

  operator.totalTransfersIn += totalTransfersIn;
  operator.transfersInCount += transfersInCount;
  operator.totalTransfersOut += totalTransfersOut;
  operator.transfersOutCount += transfersOutCount;
  operator.totalRejectedTransfersClaimed += totalRejectedTransfersClaimed;
  operator.rejectedTransfersClaimedCount += rejectedTransfersClaimedCount;
  operator.totalTransfersRejected += totalTransfersRejected;
  operator.transfersRejectedCount += transfersRejectedCount;
  operator.totalConsensusStorageFee += BigInt(blockFees.consensusStorageFee);
  operator.totalDomainExecutionFee += BigInt(blockFees.domainExecutionFee);
  operator.totalBurnedBalance += BigInt(blockFees.burnedBalance);
  operator.totalVolume += totalVolume;
  operator.bundleCount++;
  operator.lastBundleAt = getBlockNumber(block);
  operator.updatedAt = getBlockNumber(block);

  cache.operators.set(operator.id, operator);

  cache.isModified = true;

  return cache;
}
