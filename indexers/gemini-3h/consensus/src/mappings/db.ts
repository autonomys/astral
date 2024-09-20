import {
  Account,
  Block,
  Event,
  EventModule,
  Extrinsic,
  ExtrinsicModule,
  Log,
  Section,
} from "../types";

const moduleId = (section: string, method: string) => `${section}.${method}`;

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
  const blocks = await Block.getByHash(hash);
  let block = blocks ? blocks[0] : undefined;
  if (!block) {
    block = Block.create({
      id: hash,
      height,
      timestamp,
      hash,
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
  }
  return block;
}

export function prepareLog(
  blockHeight: bigint,
  blockHash: string,
  indexInBlock: number,
  rawKind: string,
  kind: string,
  value: string
): Log {
  const id = `${blockHeight}-${indexInBlock}`;
  return Log.create({
    id,
    logId: id,
    blockHeight,
    blockHash,
    indexInBlock,
    rawKind,
    kind,
    value,
  });
}

export async function saveLog(logs: Log[]): Promise<void> {
  await Promise.all(logs.map((log) => log.save()));
}

export async function createAndSaveSectionIfNotExists(
  section: string
): Promise<Section> {
  const sections = await Section.getBySection(section);
  let sectionObj = sections ? sections[0] : undefined;
  if (!sectionObj) {
    sectionObj = Section.create({
      id: section,
      section,
    });
    await sectionObj.save();
  }
  return sectionObj;
}

export async function createAndSaveExtrinsicModuleNameIfNotExists(
  section: string,
  method: string,
  index: string
): Promise<ExtrinsicModule> {
  const id = moduleId(section, method);
  const modules = await ExtrinsicModule.getByModuleId(id);
  let module = modules ? modules[0] : undefined;
  if (!module) {
    module = ExtrinsicModule.create({
      id,
      moduleId: id,
      index,
      section,
      method,
    });
    await module.save();
  }
  return module;
}

export async function createAndSaveEventModuleNameIfNotExists(
  section: string,
  method: string,
  index: string
): Promise<EventModule> {
  const id = moduleId(section, method);
  const modules = await EventModule.getByModuleId(id);
  let module = modules ? modules[0] : undefined;
  if (!module) {
    module = EventModule.create({
      id,
      moduleId: id,
      index,
      section,
      method,
    });
    await module.save();
  }
  return module;
}

export async function createAndSaveExtrinsic(
  extrinsicHash: string,
  blockHeight: bigint,
  blockHash: string,
  indexInBlock: number,
  callIndex: string,
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
  await createAndSaveSectionIfNotExists(section);
  await createAndSaveExtrinsicModuleNameIfNotExists(section, method, callIndex);

  // Create extrinsic
  const extrinsicId = `${blockHeight}-${indexInBlock}`;
  const extrinsic = Extrinsic.create({
    id: extrinsicId,
    extrinsicId,
    extrinsicHash,
    blockHeight,
    blockHash,
    indexInBlock,
    moduleId: moduleId(section, method),
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
  await createAndSaveSectionIfNotExists(section);
  await createAndSaveEventModuleNameIfNotExists(section, method, callIndex);

  // Create event
  const eventId = `${blockHeight}-${indexInBlock.toString()}`;
  const event = Event.create({
    id: eventId,
    eventId,
    blockHeight,
    blockHash,
    extrinsicId,
    extrinsicHash,
    indexInBlock,
    moduleId: moduleId(section, method),
    timestamp,
    phase,
    pos,
    args,
  });
  await event.save();
  return event;
}

export async function createAndSaveAccountIfNotExists(
  accountId: string,
  nonce: bigint,
  free: bigint,
  reserved: bigint,
  total: bigint,
  createdAt: bigint,
  updatedAt: bigint
): Promise<Account> {
  const accounts = await Account.getByAccountId(accountId);
  let account = accounts ? accounts[0] : undefined;
  if (!account) {
    account = Account.create({
      id: accountId,
      accountId,
      nonce,
      free,
      reserved,
      total,
      createdAt,
      updatedAt,
    });
    await account.save();
  }
  return account;
}
