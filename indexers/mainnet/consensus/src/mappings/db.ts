import {
  AccountHistory,
  Block,
  Event,
  Extrinsic,
  Log,
  Reward,
  Transfer,
} from "../types";
import { dateEntry, getSortId, moduleName } from "./utils";

// Core Consensus DB Functions

export async function createAndSaveBlock(
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
): Promise<Block> {
  const id = height.toString();
  const sortId = getSortId(height);
  const block = Block.create({
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
  });
  await block.save();
  return block;
}

export async function createAndSaveLog(
  blockHeight: bigint,
  blockHash: string,
  indexInBlock: number,
  kind: string,
  value: string,
  timestamp: Date
): Promise<Log> {
  const id = `${blockHeight}-${indexInBlock}`;
  const sortId = getSortId(blockHeight, BigInt(indexInBlock));
  const log = Log.create({
    id,
    sortId,
    blockHeight,
    blockHash,
    indexInBlock,
    kind,
    value,
    timestamp,
  });
  await log.save();
  return log;
}

export async function saveLog(logs: Log[]): Promise<void> {
  await Promise.all(logs.map((log) => log.save()));
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
): Extrinsic {
  const extrinsicId = `${blockHeight}-${indexInBlock}`;
  const sortId = getSortId(blockHeight, BigInt(indexInBlock));
  return Extrinsic.create({
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
  });
}

export async function saveExtrinsics(extrinsics: Extrinsic[]): Promise<void> {
  await Promise.all(extrinsics.map((extrinsic) => extrinsic.save()));
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
): Event {
  const id = `${blockHeight}-${indexInBlock.toString()}`;
  const sortId = getSortId(blockHeight, BigInt(indexInBlock));
  return Event.create({
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
  });
}

export async function saveEvents(events: Event[]): Promise<void> {
  await Promise.all(events.map((event) => event.save()));
}

// Accounts DB Functions

export function createAccountHistory(
  id: string,
  blockNumber: bigint,
  nonce: bigint,
  free: bigint,
  reserved: bigint,
  total: bigint
): AccountHistory {
  const accountHistory = AccountHistory.create({
    id,
    nonce,
    free,
    reserved,
    total,
    ...dateEntry(blockNumber),
  });
  return accountHistory;
}

export async function saveAccountHistories(
  accountHistories: AccountHistory[]
): Promise<void> {
  await Promise.all(
    accountHistories.map((accountHistory) => accountHistory.save())
  );
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
): Transfer {
  const id = extrinsicId + "-" + eventId;
  return Transfer.create({
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
  });
}

export async function saveTransfers(transfers: Transfer[]): Promise<void> {
  await Promise.all(transfers.map((transfer) => transfer.save()));
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
): Reward {
  const id = accountId + "-" + eventId;
  return Reward.create({
    id,
    blockHeight,
    blockHash,
    extrinsicId,
    eventId,
    accountId,
    rewardType,
    amount,
    timestamp,
  });
}

export async function saveRewards(rewards: Reward[]): Promise<void> {
  await Promise.all(rewards.map((reward) => reward.save()));
}
