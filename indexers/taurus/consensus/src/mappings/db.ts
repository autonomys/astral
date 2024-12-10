import {
  Account,
  AccountHistory,
  Block,
  Event,
  EventModule,
  Extrinsic,
  ExtrinsicModule,
  Log,
  LogKind,
  Reward,
  Section,
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
  accountsCount: number,
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
  const previousBlock = await Block.getByHeight(height - BigInt(1), {
    limit: 1,
  });
  const cumulativeExtrinsicsCount =
    previousBlock.length > 0
      ? previousBlock[0].cumulativeExtrinsicsCount + BigInt(extrinsicsCount)
      : BigInt(extrinsicsCount);
  const cumulativeEventsCount =
    previousBlock.length > 0
      ? previousBlock[0].cumulativeEventsCount + BigInt(eventsCount)
      : BigInt(eventsCount);
  const cumulativeAccountsCount =
    previousBlock.length > 0
      ? previousBlock[0].cumulativeAccountsCount + BigInt(accountsCount)
      : BigInt(accountsCount);
  const cumulativeTransfersCount =
    previousBlock.length > 0
      ? previousBlock[0].cumulativeTransfersCount + BigInt(transfersCount)
      : BigInt(transfersCount);
  const cumulativeRewardsCount =
    previousBlock.length > 0
      ? previousBlock[0].cumulativeRewardsCount + BigInt(rewardsCount)
      : BigInt(rewardsCount);
  const cumulativeBlockRewardsCount =
    previousBlock.length > 0
      ? previousBlock[0].cumulativeBlockRewardsCount + BigInt(blockRewardsCount)
      : BigInt(blockRewardsCount);
  const cumulativeVoteRewardsCount =
    previousBlock.length > 0
      ? previousBlock[0].cumulativeVoteRewardsCount + BigInt(voteRewardsCount)
      : BigInt(voteRewardsCount);
  const cumulativeTransferValue =
    previousBlock.length > 0
      ? previousBlock[0].cumulativeTransferValue + transferValue
      : transferValue;
  const cumulativeRewardValue =
    previousBlock.length > 0
      ? previousBlock[0].cumulativeRewardValue + rewardValue
      : rewardValue;
  const cumulativeBlockRewardValue =
    previousBlock.length > 0
      ? previousBlock[0].cumulativeBlockRewardValue + blockRewardValue
      : blockRewardValue;
  const cumulativeVoteRewardValue =
    previousBlock.length > 0
      ? previousBlock[0].cumulativeVoteRewardValue + voteRewardValue
      : voteRewardValue;

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
    accountsCount,
    transfersCount,
    rewardsCount,
    blockRewardsCount,
    voteRewardsCount,
    transferValue,
    rewardValue,
    blockRewardValue,
    voteRewardValue,
    cumulativeExtrinsicsCount,
    cumulativeEventsCount,
    cumulativeAccountsCount,
    cumulativeTransfersCount,
    cumulativeRewardsCount,
    cumulativeBlockRewardsCount,
    cumulativeVoteRewardsCount,
    cumulativeTransferValue,
    cumulativeRewardValue,
    cumulativeBlockRewardValue,
    cumulativeVoteRewardValue,
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

export async function createSection(id: string): Promise<Section | null> {
  const existingSection = await Section.getBySection(id, {
    limit: 1,
  });
  const doesSectionExist = existingSection.length > 0;
  if (!doesSectionExist)
    return Section.create({
      id,
      section: id,
    });
  return null;
}

export async function saveSections(sections: Section[]): Promise<void> {
  await Promise.all(sections.map((section) => section.save()));
}

export async function createExtrinsicModule(
  section: string,
  method: string
): Promise<ExtrinsicModule | null> {
  const name = moduleName(section, method);
  const existingExtrinsicModule = await ExtrinsicModule.getByName(name, {
    limit: 1,
  });
  const doesExtrinsicModuleExist = existingExtrinsicModule.length > 0;
  if (!doesExtrinsicModuleExist)
    return ExtrinsicModule.create({
      id: name,
      section,
      method,
      name,
    });
  return null;
}

export async function saveExtrinsicModules(
  extrinsicModules: ExtrinsicModule[]
): Promise<void> {
  await Promise.all(
    extrinsicModules.map((extrinsicModule) => extrinsicModule.save())
  );
}

export async function createEventModule(
  section: string,
  method: string
): Promise<EventModule | null> {
  const name = moduleName(section, method);
  const existingEventModule = await EventModule.getByName(name, {
    limit: 1,
  });
  const doesEventModuleExist = existingEventModule.length > 0;
  if (!doesEventModuleExist)
    return EventModule.create({
      id: name,
      section,
      method,
      name,
    });
  return null;
}

export async function saveEventModules(
  eventModules: EventModule[]
): Promise<void> {
  await Promise.all(eventModules.map((eventModule) => eventModule.save()));
}

export async function createLogKind(id: string): Promise<LogKind | null> {
  const existingLogKind = await LogKind.getByKind(id, {
    limit: 1,
  });
  const doesLogKindExist = existingLogKind.length > 0;
  if (!doesLogKindExist)
    return LogKind.create({
      id,
      kind: id,
    });
  return null;
}

export async function saveLogKinds(logKinds: LogKind[]): Promise<void> {
  await Promise.all(logKinds.map((logKind) => logKind.save()));
}

// Accounts DB Functions

export async function createAndSaveAccountHistory(
  id: string,
  blockNumber: bigint,
  nonce: bigint,
  free: bigint,
  reserved: bigint,
  total: bigint
): Promise<boolean> {
  const existingAccount = await Account.getByAccountId(id, {
    limit: 1,
  });
  const doesAccountExist = existingAccount.length > 0;
  if (!doesAccountExist) {
    const account = Account.create({
      id,
      accountId: id,
      nonce,
      free,
      reserved,
      total,
      ...dateEntry(blockNumber),
    });
    await account.save();
  }

  const accountHistory = AccountHistory.create({
    id,
    nonce,
    free,
    reserved,
    total,
    ...dateEntry(blockNumber),
  });
  await accountHistory.save();
  return doesAccountExist;
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
