import { ZERO_BIGINT } from "../structures/constants.ts";
import {
  Cache,
  CachedAccountHistory,
  CachedBlock,
  CachedBundleSubmission,
  CachedChunk,
  CachedCid,
  CachedDepositEvent,
  CachedDomainInstantiation,
  CachedDomainStakingHistory,
  CachedEvent,
  CachedExtrinsic,
  CachedFile,
  CachedFileCid,
  CachedFileError,
  CachedFolder,
  CachedFolderCid,
  CachedLeaderboardEntity,
  CachedLog,
  CachedMetadata,
  CachedMetadataCid,
  CachedNominatorsUnlockedEvent,
  CachedOperatorDeregistration,
  CachedOperatorRegistration,
  CachedOperatorReward,
  CachedOperatorStakingHistory,
  CachedOperatorTaxCollection,
  CachedReward,
  CachedRuntimeCreation,
  CachedTransfer,
  CachedUnlockedEvent,
  CachedWithdrawEvent,
  PersistentCache,
} from "../types/cache.ts";
import {
  getBlockId,
  getNominationId,
  getSortId,
  moduleName,
} from "./helper.ts";

export const initializePersistentCache = (): PersistentCache => ({
  operatorOwnerMap: new Map<string, string>(),
});

export const initializeCache = (persistentCache: PersistentCache): Cache => ({
  ...persistentCache,
  // Metadata
  currentBlock: null,
  targetHeight: null,
  lastProcessedHeight: null,
  // Consensus entities
  blocks: [],
  extrinsics: [],
  events: [],
  logs: [],
  rewards: [],
  transfers: [],
  accountHistories: [],
  // Leaderboard entities
  accountExtrinsicFailedTotalCountHistory: [],
  accountExtrinsicSuccessTotalCountHistory: [],
  accountExtrinsicTotalCountHistory: [],
  accountRemarkCountHistory: [],
  accountTransactionFeePaidTotalValueHistory: [],
  accountTransferReceiverTotalCountHistory: [],
  accountTransferReceiverTotalValueHistory: [],
  accountTransferSenderTotalCountHistory: [],
  accountTransferSenderTotalValueHistory: [],
  farmerBlockTotalCountHistory: [],
  farmerBlockTotalValueHistory: [],
  farmerVoteAndBlockTotalCountHistory: [],
  farmerVoteAndBlockTotalValueHistory: [],
  farmerVoteTotalCountHistory: [],
  farmerVoteTotalValueHistory: [],
  nominatorDepositsTotalCountHistory: [],
  nominatorDepositsTotalValueHistory: [],
  nominatorWithdrawalsTotalCountHistory: [],
  nominatorWithdrawalsTotalValueHistory: [],
  operatorBundleTotalCountHistory: [],
  operatorDepositsTotalCountHistory: [],
  operatorDepositsTotalValueHistory: [],
  operatorTotalRewardsCollectedHistory: [],
  operatorTotalTaxCollectedHistory: [],
  operatorWithdrawalsTotalCountHistory: [],
  operatorWithdrawalsTotalValueHistory: [],
  // Files entities
  cids: [],
  chunks: [],
  folders: [],
  files: [],
  filesErrors: [],
  metadata: [],
  metadataCids: [],
  folderCids: [],
  fileCids: [],
  // Staking entities
  bundleSubmission: [],
  runtimeCreation: [],
  domainInstantiation: [],
  operatorRegistration: [],
  operatorDeregistration: [],
  depositEvent: [],
  withdrawEvent: [],
  unlockedEvent: [],
  nominatorsUnlockedEvent: [],
  operatorReward: [],
  operatorTaxCollection: [],
  domainStakingHistory: [],
  operatorStakingHistory: [],
  // Addresses balances to update
  addressToUpdate: new Set<string>(),
  // Totals (for consensus.blocks)
  totalBlockRewardsCount: 0,
  totalVoteRewardsCount: 0,
  totalTransferValue: ZERO_BIGINT,
  totalRewardValue: ZERO_BIGINT,
  totalBlockRewardValue: ZERO_BIGINT,
  totalVoteRewardValue: ZERO_BIGINT,
  // only for caching purposes
  parentBlockOperators: [],
  currentWithdrawal: [],
});

export const updatePersistentCache = (
  cache: Cache,
  persistentCache: PersistentCache
) => {
  persistentCache.operatorOwnerMap = cache.operatorOwnerMap;
};

export function createBlock(
  hash: string,
  height: bigint,
  timestamp: Date,
  parentHash: string,
  specId: string,
  stateRoot: string,
  extrinsicsRoot: string,
  spacePledged: bigint,
  blockchainSize: bigint,
  extrinsicsCount: number,
  eventsCount: number,
  logsCount: number,
  transfersCount: number,
  rewardsCount: number,
  blockRewardsCount: number,
  voteRewardsCount: number,
  transferValue: bigint,
  rewardValue: bigint,
  blockRewardValue: bigint,
  voteRewardValue: bigint,
  authorId: string
): CachedBlock {
  return {
    id: getBlockId(height, hash),
    sortId: getSortId(height),
    height,
    hash,
    timestamp,
    parentHash,
    specId,
    stateRoot,
    extrinsicsRoot,
    spacePledged,
    blockchainSize,
    extrinsicsCount,
    eventsCount,
    logsCount,
    transfersCount,
    rewardsCount,
    blockRewardsCount,
    voteRewardsCount,
    transferValue,
    rewardValue,
    blockRewardValue,
    voteRewardValue,
    authorId,
  };
}

export function createLog(
  blockHeight: bigint,
  blockHash: string,
  indexInBlock: number,
  kind: string,
  value: string,
  timestamp: Date
): CachedLog {
  const blockId = getBlockId(blockHeight, blockHash);
  return {
    id: blockId + "-" + indexInBlock,
    sortId: getSortId(blockHeight, BigInt(indexInBlock)),
    logId: blockId + "-" + indexInBlock,
    blockId,
    blockHeight,
    blockHash,
    indexInBlock,
    kind,
    value,
    timestamp,
  };
}

export function createExtrinsic(
  hash: string,
  blockHeight: bigint,
  blockHash: string,
  indexInBlock: number,
  section: string,
  module: string,
  success: boolean,
  timestamp: Date,
  nonce: bigint,
  signer: string,
  signature: string,
  eventsCount: number,
  args: string,
  error: string,
  tip: bigint,
  fee: bigint,
  pos: number,
  cid: string
): CachedExtrinsic {
  const blockId = getBlockId(blockHeight, blockHash);
  return {
    id: blockId + "-" + indexInBlock,
    sortId: getSortId(blockHeight, BigInt(indexInBlock)),
    extrinsicId: blockId + "-" + indexInBlock,
    hash,
    blockId,
    blockHeight,
    blockHash,
    indexInBlock,
    section,
    module,
    name: moduleName(section, module),
    success,
    timestamp,
    nonce,
    signer,
    signature,
    eventsCount,
    args,
    error,
    tip,
    fee,
    pos,
    cid,
  };
}

export function createEvent(
  blockHeight: bigint,
  blockHash: string,
  indexInBlock: bigint,
  extrinsicId: string,
  extrinsicHash: string,
  section: string,
  module: string,
  timestamp: Date,
  phase: string,
  pos: number,
  args: string,
  cid: string
): CachedEvent {
  const blockId = getBlockId(blockHeight, blockHash);
  return {
    id: blockId + "-" + indexInBlock.toString(),
    sortId: getSortId(blockHeight, indexInBlock),
    eventId: blockId + "-" + indexInBlock.toString(),
    blockId,
    blockHeight,
    blockHash,
    extrinsicId,
    extrinsicHash,
    indexInBlock,
    section,
    module,
    name: moduleName(section, module),
    timestamp,
    phase,
    pos,
    args,
    cid,
  };
}

// Accounts DB Functions

export function createAccountHistory(
  accountId: string,
  blockHeight: bigint,
  blockHash: string,
  nonce: bigint,
  free: bigint,
  reserved: bigint,
  total: bigint
): CachedAccountHistory {
  const blockId = getBlockId(blockHeight, blockHash);
  return {
    id: accountId + "-" + blockId,
    accountId,
    nonce,
    free,
    reserved,
    total,
    blockId,
    blockHeight,
    blockHash,
  };
}

export function createTransfer(
  blockHeight: bigint,
  blockHash: string,
  extrinsicId: string,
  eventId: string,
  from: string,
  fromChain: string,
  to: string,
  toChain: string,
  value: bigint,
  fee: bigint,
  type: string,
  success: boolean,
  isFinalized: boolean,
  timestamp: Date
): CachedTransfer {
  return {
    id: extrinsicId + "-" + eventId,
    blockId: getBlockId(blockHeight, blockHash),
    blockHeight,
    blockHash,
    extrinsicId,
    eventId,
    from,
    fromChain,
    to,
    toChain,
    value,
    fee,
    type,
    success,
    isFinalized,
    timestamp,
  };
}

export function createReward(
  blockHeight: bigint,
  blockHash: string,
  extrinsicId: string,
  eventId: string,
  accountId: string,
  rewardType: string,
  amount: bigint,
  timestamp: Date
): CachedReward {
  return {
    id: accountId + "-" + eventId,
    blockId: getBlockId(blockHeight, blockHash),
    blockHeight,
    blockHash,
    extrinsicId,
    eventId,
    accountId,
    rewardType,
    amount,
    timestamp,
  };
}

export function createLeaderboardEntity(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  blockHash: string,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): CachedLeaderboardEntity {
  return {
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockId: getBlockId(blockHeight, blockHash),
    blockHeight,
    extrinsicId,
    eventId,
  };
}

export function createCid(
  cid: string,
  blockHeight: bigint,
  blockHash: string,
  extrinsicId: string,
  extrinsicHash: string,
  indexInBlock: number,
  links: string[],
  blake3Hash: string,
  timestamp: Date
): CachedCid {
  return {
    id: cid + "-" + blockHash + "-" + extrinsicId,
    cid,
    blockId: getBlockId(blockHeight, blockHash),
    blockHeight,
    blockHash,
    extrinsicId,
    extrinsicHash,
    indexInBlock,
    links,
    blake3Hash,
    isArchived: false,
    timestamp,
  };
}

export function createChunk(
  cid: string,
  type: string,
  linkDepth: number,
  size: bigint,
  name: string,
  data: string,
  uploadOptions: string,
  blockHeight: bigint,
  blockHash: string,
  extrinsicId: string
): CachedChunk {
  return {
    id: cid + "-" + blockHash + "-" + extrinsicId,
    cid,
    blockId: getBlockId(blockHeight, blockHash),
    blockHeight,
    blockHash,
    type,
    linkDepth,
    size,
    name,
    data,
    uploadOptions,
  };
}

const prepareRelation = (
  cid: string,
  link: string,
  blockId: string,
  blockHash: string,
  extrinsicId: string
) => ({
  id: cid + ":" + link + "-" + blockHash + "-" + extrinsicId,
  blockId,
  parentCid: cid,
  childCid: link,
});

export function createMetadata(
  cid: string,
  links: string[],
  name: string,
  blockHeight: bigint,
  blockHash: string,
  extrinsicId: string
): { metadata: CachedMetadata; relations: CachedMetadataCid[] } {
  const blockId = getBlockId(blockHeight, blockHash);
  const metadata = {
    id: cid + "-" + blockHash + "-" + extrinsicId,
    sortId: getSortId(blockHeight, extrinsicId),
    cid,
    blockId,
    blockHeight,
    blockHash,
    extrinsicId,
    size: BigInt(0),
    name,
  };
  if (links.length > 0)
    return {
      metadata,
      relations: links.map((link) =>
        prepareRelation(cid, link, blockId, blockHash, extrinsicId)
      ),
    };
  return { metadata, relations: [] };
}

export function createFolder(
  cid: string,
  links: string[],
  name: string,
  blockHeight: bigint,
  blockHash: string,
  extrinsicId: string
): { folder: CachedFolder; relations: CachedFolderCid[] } {
  const blockId = getBlockId(blockHeight, blockHash);
  const folder = {
    id: cid + "-" + blockHash + "-" + extrinsicId,
    sortId: getSortId(blockHeight, extrinsicId),
    cid,
    blockId,
    blockHeight,
    blockHash,
    extrinsicId,
    size: BigInt(0),
    name,
  };
  if (links.length > 0)
    return {
      folder,
      relations: links.map((link) =>
        prepareRelation(cid, link, blockId, blockHash, extrinsicId)
      ),
    };
  return { folder, relations: [] };
}

export function createFile(
  cid: string,
  links: string[],
  name: string,
  blockHeight: bigint,
  blockHash: string,
  extrinsicId: string
): { file: CachedFile; relations: CachedFileCid[] } {
  const blockId = getBlockId(blockHeight, blockHash);
  const file = {
    id: cid + "-" + blockHash + "-" + extrinsicId,
    sortId: getSortId(blockHeight, extrinsicId),
    cid,
    blockId,
    blockHeight,
    blockHash,
    extrinsicId,
    size: BigInt(0),
    name,
  };
  if (links.length > 0)
    return {
      file,
      relations: links.map((link) =>
        prepareRelation(cid, link, blockId, blockHash, extrinsicId)
      ),
    };
  return { file, relations: [] };
}

export function createFileError(
  blockHeight: bigint,
  blockHash: string,
  extrinsicId: string,
  extrinsicHash: string,
  indexInBlock: number,
  error: string,
  timestamp: Date
): CachedFileError {
  return {
    id: extrinsicId,
    blockId: getBlockId(blockHeight, blockHash),
    blockHeight,
    blockHash,
    extrinsicId,
    extrinsicHash,
    indexInBlock,
    error,
    timestamp,
  };
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
): CachedBundleSubmission {
  return {
    id: domainId + "-" + id,
    accountId,
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
): CachedRuntimeCreation {
  return {
    id: runtimeId,
    sortId: getSortId(runtimeId),
    name,
    type,
    createdBy,
    blockHeight,
    extrinsicId,
    eventId,
  };
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
): CachedDomainInstantiation {
  const id = domainId.toLowerCase();
  return {
    id,
    sortId: getSortId(id),
    name,
    runtimeId,
    runtime,
    runtimeInfo,
    createdBy,
    blockHeight,
    extrinsicId,
    eventId,
  };
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
): CachedOperatorRegistration {
  return {
    id: operatorId,
    sortId: getSortId(domainId, operatorId),
    owner,
    domainId,
    signingKey,
    minimumNominatorStake,
    nominationTax,
    blockHeight,
    extrinsicId,
    eventId,
  };
}

export function createOperatorDeregistration(
  operatorId: string,
  owner: string,
  domainId: string,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): CachedOperatorDeregistration {
  return {
    id: operatorId,
    owner,
    domainId,
    blockHeight,
    extrinsicId,
    eventId,
  };
}

export function createDepositEvent(
  accountId: string,
  domainId: string,
  operatorId: string,
  amount: bigint,
  storageFeeDeposit: bigint,
  totalAmount: bigint,
  estimatedShares: bigint,
  timestamp: Date,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): CachedDepositEvent {
  return {
    id: eventId + "-" + getNominationId(accountId, domainId, operatorId),
    sortId: getSortId(blockHeight, extrinsicId),
    accountId,
    domainId,
    operatorId,
    nominatorId: getNominationId(accountId, domainId, operatorId),
    amount,
    storageFeeDeposit,
    totalAmount,
    estimatedShares,
    timestamp,
    blockHeight,
    extrinsicId,
    eventId,
  };
}

export function createWithdrawEvent(
  accountId: string,
  domainId: string,
  operatorId: string,
  toWithdraw: string,
  shares: bigint,
  storageFeeRefund: bigint,
  estimatedAmount: bigint,
  timestamp: Date,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): CachedWithdrawEvent {
  return {
    id: eventId + "-" + getNominationId(accountId, domainId, operatorId),
    sortId: getSortId(blockHeight, extrinsicId),
    accountId,
    domainId,
    operatorId,
    nominatorId: getNominationId(accountId, domainId, operatorId),
    toWithdraw,
    shares,
    storageFeeRefund,
    estimatedAmount,
    timestamp,
    blockHeight,
    extrinsicId,
    eventId,
  };
}

export function createUnlockedEvent(
  domainId: string,
  operatorId: string,
  accountId: string,
  amount: bigint,
  storageFee: bigint,
  timestamp: Date,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): CachedUnlockedEvent {
  return {
    id: eventId,
    domainId,
    operatorId,
    accountId,
    nominatorId: getNominationId(accountId, domainId, operatorId),
    amount,
    storageFee,
    timestamp,
    blockHeight,
    extrinsicId,
    eventId,
  };
}

export function createNominatorsUnlockedEvent(
  domainId: string,
  operatorId: string,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): CachedNominatorsUnlockedEvent {
  return {
    id: eventId,
    domainId,
    operatorId,
    blockHeight,
    extrinsicId,
    eventId,
  };
}

export function createOperatorReward(
  domainId: string,
  operatorId: string,
  amount: bigint,
  atBlockNumber: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): CachedOperatorReward {
  return {
    id: eventId,
    domainId,
    operatorId,
    amount,
    atBlockNumber,
    blockHeight,
    extrinsicId,
    eventId,
  };
}

export function createOperatorTaxCollection(
  domainId: string,
  operatorId: string,
  amount: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string
): CachedOperatorTaxCollection {
  return {
    id: eventId,
    domainId,
    operatorId,
    amount,
    blockHeight,
    extrinsicId,
    eventId,
  };
}

export function createDomainStakingHistory(
  hash: string,
  domainId: string,
  currentEpochIndex: number,
  currentTotalStake: bigint,
  currentTotalShares: bigint,
  sharePrice: bigint,
  timestamp: Date,
  blockHeight: bigint
): CachedDomainStakingHistory {
  return {
    id: hash,
    domainId,
    currentEpochIndex,
    currentTotalStake,
    currentTotalShares,
    sharePrice,
    timestamp,
    blockHeight,
  };
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
): CachedOperatorStakingHistory {
  return {
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
  };
}
