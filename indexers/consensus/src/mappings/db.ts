import { getSortId, moduleName } from "./utils";

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
  const id = height.toString();
  const sortId = getSortId(height);
  return {
    id,
    sortId,
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

export function createAndSaveLog(
  blockHeight: bigint,
  blockHash: string,
  indexInBlock: number,
  kind: string,
  value: string,
  timestamp: Date
) {
  const id = `${blockHeight}-${indexInBlock}`;
  const sortId = getSortId(blockHeight, BigInt(indexInBlock));
  return {
    id,
    sortId,
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
  args: string,
  error: string,
  tip: bigint,
  fee: bigint,
  pos: number,
  cid?: string
) {
  const extrinsicId = `${blockHeight}-${indexInBlock}`;
  const sortId = getSortId(blockHeight, BigInt(indexInBlock));
  return {
    id: extrinsicId,
    sortId,
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
  const id = `${blockHeight}-${indexInBlock.toString()}`;
  const sortId = getSortId(blockHeight, BigInt(indexInBlock));
  return {
    id,
    sortId,
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
  to: string,
  value: bigint,
  fee: bigint,
  success: boolean,
  timestamp: Date
) {
  const id = extrinsicId + "-" + eventId;
  return {
    id,
    blockHeight,
    blockHash,
    extrinsicId,
    eventId,
    from,
    to,
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
  const id = accountId + "-" + eventId;
  return {
    id,
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
