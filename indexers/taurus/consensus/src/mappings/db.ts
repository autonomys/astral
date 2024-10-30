import { capitalizeFirstLetter } from "@autonomys/auto-utils";
import {
  AccountHistory,
  Block,
  Event,
  Extrinsic,
  Log,
  Reward,
  Transfer,
} from "../types";
import { dateEntry, getSortId, moduleId, moduleName } from "./utils";

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
    authorId,
  });
  await block.save();
  return block;
}

export async function createAndSaveLog(
  blockHeight: bigint,
  blockHash: string,
  indexInBlock: number,
  rawKind: string,
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
    logKindId: rawKind,
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

export async function createAndSaveExtrinsic(
  hash: string,
  blockHeight: bigint,
  blockHash: string,
  indexInBlock: number,
  section: string,
  method: string,
  success: boolean,
  timestamp: Date,
  nonce: bigint,
  signer: string,
  signature: string,
  args: string,
  error: string,
  tip: bigint,
  fee: bigint,
  pos: number
): Promise<Extrinsic> {
  const extrinsicId = `${blockHeight}-${indexInBlock}`;
  const sortId = getSortId(blockHeight, BigInt(indexInBlock));
  const extrinsic = Extrinsic.create({
    id: extrinsicId,
    sortId,
    hash,
    blockHeight,
    blockHash,
    indexInBlock,
    extrinsicModuleId: moduleId(section, method),
    name: moduleName(section, method),
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
  });
  await extrinsic.save();
  return extrinsic;
}

export async function createAndSaveEvent(
  blockHeight: bigint,
  blockHash: string,
  indexInBlock: bigint,
  extrinsicId: string,
  extrinsicHash: string,
  callIndex: string,
  section: string,
  method: string,
  timestamp: Date,
  phase: string,
  pos: number,
  args: string
): Promise<Event> {
  const id = `${blockHeight}-${indexInBlock.toString()}`;
  const sortId = getSortId(blockHeight, BigInt(indexInBlock));
  const event = Event.create({
    id,
    sortId,
    blockHeight,
    blockHash,
    extrinsicId,
    extrinsicHash,
    indexInBlock,
    eventModuleId: moduleId(section, method),
    name: moduleName(section, method),
    timestamp,
    phase,
    pos,
    args,
  });
  await event.save();
  return event;
}

// Accounts DB Functions

export async function createAndSaveAccountHistory(
  id: string,
  blockNumber: bigint,
  nonce: bigint,
  free: bigint,
  reserved: bigint,
  total: bigint
): Promise<AccountHistory> {
  const accountHistory = AccountHistory.create({
    id,
    nonce,
    free,
    reserved,
    total,
    ...dateEntry(blockNumber),
  });
  await accountHistory.save();
  return accountHistory;
}

export async function createAndSaveTransfer(
  blockNumber: bigint,
  extrinsicId: string,
  eventId: string,
  from: string,
  to: string,
  value: bigint,
  fee: bigint,
  success: boolean,
  timestamp: bigint,
  date: Date
): Promise<Transfer> {
  const id = extrinsicId + "-" + eventId;
  const transfer = Transfer.create({
    id,
    extrinsicId,
    eventId,
    from,
    to,
    value,
    fee,
    success,
    timestamp,
    date,
    createdAt: blockNumber,
  });
  await transfer.save();
  return transfer;
}

export async function createAndSaveReward(
  blockHeight: bigint,
  blockHash: string,
  accountId: string,
  indexInBlock: bigint,
  rewardType: string,
  amount: bigint,
  timestamp: Date
): Promise<Reward> {
  const id =
    accountId + "-" + blockHeight.toString() + "-" + indexInBlock.toString();
  const reward = Reward.create({
    id,
    blockHeight,
    blockHash,
    accountId,
    indexInBlock,
    rewardType,
    amount,
    timestamp,
  });
  await reward.save();
  return reward;
}
