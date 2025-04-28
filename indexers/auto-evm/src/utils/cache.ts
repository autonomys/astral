import { ZERO_BIGINT } from "../structures/constants.ts";
import {
  Cache,
  CachedAccountHistory,
  CachedBlock,
  CachedEvent,
  CachedExtrinsic,
  CachedLog,
  CachedTransfer,
  PersistentCache,
} from "../types/cache.ts";
import { getBlockId, getSortId, moduleName } from "./helper.ts";

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
  transfers: [],
  accountHistories: [],
  // Addresses balances to update
  addressToUpdate: new Set<string>(),
  // Totals (for consensus.blocks)
  totalTransferValue: ZERO_BIGINT,
});

export const updatePersistentCache = (
  cache: Cache,
  persistentCache: PersistentCache
) => {};

export function createBlock(
  hash: string,
  height: bigint,
  timestamp: Date,
  parentHash: string,
  specId: string,
  stateRoot: string,
  extrinsicsRoot: string,
  extrinsicsCount: number,
  eventsCount: number,
  logsCount: number,
  transfersCount: number,
  transferValue: bigint,
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
    extrinsicsCount,
    eventsCount,
    logsCount,
    transfersCount,
    transferValue,
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
  pos: number
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
  args: string
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
