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

export type CachedEvmBlock = {
  id: string;
  sortId: string;
  height: bigint;
  hash: string;
  timestamp: Date;
  blockTimestamp: number;
  parentHash: string;
  stateRoot: string;
  transactionsRoot: string;
  receiptsRoot: string;
  transactionsCount: number;
  transferValue: bigint;
  authorId: string;
  gasUsed: bigint;
  gasLimit: bigint;
  extraData: string;
  difficulty: bigint;
  totalDifficulty: bigint;
  size: bigint;
};

export type CachedEvmTransaction = {
  id: string;
  sortId: string;
  hash: string;
  nonce: bigint;
  // blockId: string;
  // blockHeight: bigint;
  blockHash: string;
  blockNumber: bigint;
  timestamp: Date;
  blockTimestamp: number;
  transactionIndex: bigint;
  from: string;
  to: string;
  value: bigint;
  gasPrice: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  gas: bigint;
  input: string;
  creates: string;
  raw: string;
  publicKey: string;
  chainId: bigint;
  standardV: bigint;
  v: string;
  r: string;
  s: string;
  accessList: string;
  transactionType: bigint;
};
export type CachedEvmCodeSelector = {
  id: string;
  address: string;
  selector: string;
  name: string;
  signature: string;
};

export type CachedEvmCode = {
  id: string;
  address: string;
  code: string;
  abi: string;
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
  // EVM entities
  evmBlocks: CachedEvmBlock[];
  evmTransactions: CachedEvmTransaction[];
  evmCodes: CachedEvmCode[];
  evmCodeSelectors: CachedEvmCodeSelector[];
  // Addresses balances to update
  addressToUpdate: Set<string>;
  // Totals (for consensus.blocks)
  totalTransferValue: bigint;
};
