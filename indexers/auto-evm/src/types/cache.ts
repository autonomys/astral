import type { Operator, Withdrawal } from "@autonomys/auto-consensus";

export type CachedBlock = {
  id: string;
  sortId: string;
  height: bigint;
  hash: string;
  timestamp: Date;
  parentHash: string;
  specId: string;
  stateRoot: string;
  extrinsicsRoot: string;
  extrinsicsCount: number;
  eventsCount: number;
  logsCount: number;
  transfersCount: number;
  transferValue: bigint;
  authorId: string;
};

export type CachedLog = {
  id: string;
  sortId: string;
  logId: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  indexInBlock: number;
  kind: string;
  value: string;
  timestamp: Date;
};

export type CachedExtrinsic = {
  id: string;
  sortId: string;
  extrinsicId: string;
  hash: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  indexInBlock: number;
  section: string;
  module: string;
  name: string;
  success: boolean;
  timestamp: Date;
  nonce: bigint;
  signer: string;
  signature: string;
  eventsCount: number;
  args: string;
  error: string;
  tip: bigint;
  fee: bigint;
  pos: number;
};

export type CachedEvent = {
  id: string;
  sortId: string;
  eventId: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  extrinsicId: string;
  extrinsicHash: string;
  indexInBlock: bigint;
  section: string;
  module: string;
  name: string;
  timestamp: Date;
  phase: string;
  pos: number;
  args: string;
};

export type CachedAccountHistory = {
  id: string;
  accountId: string;
  nonce: bigint;
  free: bigint;
  reserved: bigint;
  total: bigint;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
};

export type CachedTransfer = {
  id: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  extrinsicId: string;
  eventId: string;
  from: string;
  fromChain: string;
  to: string;
  toChain: string;
  value: bigint;
  fee: bigint;
  type: string;
  success: boolean;
  isFinalized: boolean;
  timestamp: Date;
};

export type PersistentCache = {};

export type Cache = PersistentCache & {
  // Metadata
  currentBlock: number | null;
  targetHeight: number | null;
  lastProcessedHeight: number | null;
  // Consensus entities
  blocks: CachedBlock[];
  logs: CachedLog[];
  extrinsics: CachedExtrinsic[];
  events: CachedEvent[];
  transfers: CachedTransfer[];
  accountHistories: CachedAccountHistory[];
  // Addresses balances to update
  addressToUpdate: Set<string>;
  // Totals (for consensus.blocks)
  totalTransferValue: bigint;
};
