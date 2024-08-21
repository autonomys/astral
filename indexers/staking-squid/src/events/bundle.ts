import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  createBundle,
  createBundleAuthor,
  getOrCreateAccount,
  getOrCreateDomain,
  getOrCreateDomainEpoch,
  getOrCreateOperator,
} from "../storage";
import { createDomainBlock } from "../storage/domainBlock";
import { ExecutionReceipt, SealedBundleHeader } from "../types/v1";
import { blockUID, bundleUID, getBlockNumber, getTimestamp } from "../utils";
import { Cache, LastBlockBundleIndexKey } from "../utils/cache";

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
    domainBlockHash,
    domainBlockExtrinsicRoot,
    consensusBlockNumber,
    consensusBlockHash,
    blockFees,
  } = receipt;

  const keyIdLastBlockBundleIndex: LastBlockBundleIndexKey = `lastBlockBundleIndex:${domainId}-${domainBlockHash}`;
  const lastBlockBundleIndex = cache.internalKeyStore.get(
    keyIdLastBlockBundleIndex
  );
  const blockBundleIndex = lastBlockBundleIndex
    ? parseInt(lastBlockBundleIndex) + 1
    : 0;
  cache.internalKeyStore.set(
    keyIdLastBlockBundleIndex,
    blockBundleIndex.toString()
  );

  const epoch = domain.completedEpoch;
  const domainEpoch = getOrCreateDomainEpoch(cache, block, domainId, epoch, {
    epoch,
    blockNumberStart: Number(domainBlockNumber),
    timestampStart: getTimestamp(block),
    consensusBlockNumberStart: getBlockNumber(block),
    consensusBlockHashStart: block.header.hash,
  });
  domainEpoch.blockNumberEnd = Number(domainBlockNumber);
  domainEpoch.timestampEnd = getTimestamp(block);
  domainEpoch.consensusBlockNumberEnd = getBlockNumber(block);
  domainEpoch.consensusBlockHashEnd = block.header.hash;
  domainEpoch.blockCount =
    domainEpoch.blockNumberEnd - domainEpoch.blockNumberStart + 1;
  domainEpoch.epochDuration = BigInt(
    domainEpoch.timestampEnd.getTime() - domainEpoch.timestampStart.getTime()
  );
  domainEpoch.updatedAt = getBlockNumber(block);

  cache.domainEpochs.set(domainEpoch.id, domainEpoch);

  let bundle = cache.bundles.get(
    bundleUID(domainId, domainBlockHash, blockBundleIndex)
  );
  let domainBlock = cache.domainBlocks.get(
    blockUID(domainId, domainBlockNumber)
  );
  if (!domainBlock) {
    domainBlock = createDomainBlock(
      block,
      domainId,
      domainBlockNumber,
      domainBlockHash,
      {
        domainEpochId: domainEpoch.id,
        extrinsicRoot: domainBlockExtrinsicRoot,
        epoch: domain.completedEpoch,
        consensusBlockNumber: Number(consensusBlockNumber),
        consensusBlockHash,
      }
    );
    cache.domainBlocks.set(domainBlock.id, domainBlock);
  }

  if (!bundle) {
    bundle = createBundle(
      domain.id,
      domainBlock.id,
      domainBlockHash,
      blockBundleIndex,
      {
        domainBlockId: domainBlock.id,
        domainEpochId: domainEpoch.id,
        domainBlockNumber: Number(domainBlockNumber),
        domainBlockHash,
        domainBlockExtrinsicRoot,
        epoch: domain.completedEpoch,
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
      }
    );
    cache.bundles.set(bundle.id, bundle);

    const bundleAuthor = createBundleAuthor(
      domain.id,
      account.id,
      operator.id,
      bundle.id,
      domainBlock.id,
      domain.completedEpoch,
      {
        domainEpochId: domainEpoch.id,
      }
    );
    cache.bundleAuthors.set(bundleAuthor.id, bundleAuthor);

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
    domain.currentEpochDuration = domainEpoch.epochDuration;
    if (epoch > 0) {
      const lastEpoch = getOrCreateDomainEpoch(
        cache,
        block,
        domainId,
        epoch - 1
      );
      const lastEpochTimestampEnd = lastEpoch.timestampEnd.getTime();
      domain.lastEpochDuration = lastEpoch.epochDuration;
      if (epoch > 6) {
        domain.last6EpochsDuration = BigInt(
          lastEpochTimestampEnd -
            getOrCreateDomainEpoch(
              cache,
              block,
              domainId,
              epoch - 6
            ).timestampEnd.getTime()
        );
      }
      if (epoch > 144) {
        domain.last144EpochDuration = BigInt(
          lastEpochTimestampEnd -
            getOrCreateDomainEpoch(
              cache,
              block,
              domainId,
              epoch - 144
            ).timestampEnd.getTime()
        );
      }
      if (epoch > 1000) {
        domain.last1kEpochDuration = BigInt(
          lastEpochTimestampEnd -
            getOrCreateDomainEpoch(
              cache,
              block,
              domainId,
              epoch - 1000
            ).timestampEnd.getTime()
        );
      }
    }
    domain.lastBundleAt = getBlockNumber(block);
    domain.updatedAt = getBlockNumber(block);
    cache.domains.set(domain.id, domain);
  }

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
