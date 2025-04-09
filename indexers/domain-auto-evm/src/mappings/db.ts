import { Entity } from "@subql/types-core";
import { ZERO_BIGINT } from "./constants";
import { getSortId, moduleName } from "./utils";

export type Cache = {
  rewards: Entity[];
  transfers: Entity[];

  addressToUpdate: Set<string>;
  // Totals
  totalTransferValue: bigint;

  evmTransactions: Entity[];
  evmCodes: Entity[];
  evmCodeSelectors: Entity[];
};

export const initializeCache = (): Cache => ({
  rewards: [],
  transfers: [],

  addressToUpdate: new Set<string>(),
  // Totals
  totalTransferValue: ZERO_BIGINT,

  evmTransactions: [],
  evmCodes: [],
  evmCodeSelectors: [],
});

// Core Consensus DB Functions

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
) {
  return {
    id: height.toString(),
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
) {
  return {
    id: blockHeight + "-" + indexInBlock,
    sortId: getSortId(blockHeight, BigInt(indexInBlock)),
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
  cid?: string
) {
  return {
    id: blockHeight + "-" + indexInBlock,
    sortId: getSortId(blockHeight, BigInt(indexInBlock)),
    hash,
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
  cid?: string
) {
  return {
    id: blockHeight + "-" + indexInBlock.toString(),
    sortId: getSortId(blockHeight, indexInBlock),
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
  id: string,
  blockNumber: bigint,
  nonce: bigint,
  free: bigint,
  reserved: bigint,
  total: bigint
) {
  return {
    id,
    nonce,
    free,
    reserved,
    total,
    createdAt: blockNumber,
    updatedAt: blockNumber,
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
) {
  return {
    id: extrinsicId + "-" + eventId,
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

export function createEvmBlock(
  hash: string,
  height: bigint,
  timestamp: Date,
  blockTimestamp: number,
  parentHash: string,
  stateRoot: string,
  transactionsRoot: string,
  receiptsRoot: string,
  transactionsCount: number,
  transferValue: bigint,
  authorId: string,
  gasUsed: bigint,
  gasLimit: bigint,
  extraData: string,
  difficulty: bigint,
  totalDifficulty: bigint,
  size: bigint
) {
  return {
    id: height.toString(),
    sortId: getSortId(height),
    height,
    hash,
    timestamp,
    blockTimestamp,
    parentHash,
    stateRoot,
    transactionsRoot,
    receiptsRoot,
    transactionsCount,
    transferValue,
    authorId,
    gasUsed,
    gasLimit,
    extraData,
    difficulty,
    totalDifficulty,
    size,
  };
}

export function createEvmTransaction(
  hash: string,
  nonce: bigint,
  blockHash: string,
  blockNumber: bigint,
  timestamp: Date,
  blockTimestamp: number,
  transactionIndex: bigint,
  from: string,
  to: string,
  value: bigint,
  gasPrice: bigint,
  maxFeePerGas: bigint,
  maxPriorityFeePerGas: bigint,
  gas: bigint,
  input: string,
  creates: string,
  raw: string,
  publicKey: string,
  chainId: bigint,
  standardV: bigint,
  v: string,
  r: string,
  s: string,
  accessList: string,
  transactionType: bigint
) {
  return {
    id: hash,
    sortId: getSortId(blockNumber, transactionIndex),
    hash,
    nonce,
    blockHash,
    blockNumber,
    timestamp,
    blockTimestamp,
    transactionIndex,
    from,
    to,
    value,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gas,
    input,
    creates,
    raw,
    publicKey,
    chainId,
    standardV,
    v,
    r,
    s,
    accessList,
    transactionType,
  };
}

export function createEvmCode(address: string, code: string, abi: string) {
  return {
    id: address,
    address,
    code,
    abi,
  };
}

export function createEvmCodeSelector(address: string, selector: string) {
  return {
    id: address + "-" + selector,
    address,
    selector,
    name: "",
    signature: "",
  };
}
