import { Entity } from "@subql/types-core";
import { ZERO_BIGINT } from "./constants";
import { getSortId, moduleName } from "./utils";

export type Cache = {
  rewards: Entity[];
  transfers: Entity[];

  addressToUpdate: Set<string>;
  // Totals
  totalBlockRewardsCount: number;
  totalVoteRewardsCount: number;
  totalTransferValue: bigint;
  totalRewardValue: bigint;
  totalBlockRewardValue: bigint;
  totalVoteRewardValue: bigint;
};

export const initializeCache = (): Cache => ({
  rewards: [],
  transfers: [],

  addressToUpdate: new Set<string>(),
  // Totals
  totalBlockRewardsCount: 0,
  totalVoteRewardsCount: 0,
  totalTransferValue: ZERO_BIGINT,
  totalRewardValue: ZERO_BIGINT,
  totalBlockRewardValue: ZERO_BIGINT,
  totalVoteRewardValue: ZERO_BIGINT,
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
  success: boolean,
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
    success,
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
) {
  return {
    id: accountId + "-" + eventId,
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
