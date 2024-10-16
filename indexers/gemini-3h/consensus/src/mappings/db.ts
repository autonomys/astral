import {
  Block,
  Event,
  EventModule,
  Extrinsic,
  ExtrinsicModule,
  Log,
  LogKind,
  Section,
} from "../types";
import { capitalizeFirstLetter, moduleId, moduleName, sortId } from "./utils";

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
  let block = await Block.get(id);
  if (!block) {
    block = Block.create({
      id,
      sortId: sortId(height),
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
  }
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
  await createAndSaveLogKindIfNotExists(rawKind, kind);

  const id = `${blockHeight}-${indexInBlock}`;
  let log = await Log.get(id);
  if (!log) {
    log = Log.create({
      id,
      sortId: sortId(blockHeight, BigInt(indexInBlock)),
      blockHeight,
      blockHash,
      indexInBlock,
      logKindId: rawKind,
      kind,
      value,
      timestamp,
    });
    await log.save();
  }
  return log;
}

export async function saveLog(logs: Log[]): Promise<void> {
  await Promise.all(logs.map((log) => log.save()));
}

export async function createAndSaveSectionIfNotExists(
  section: string
): Promise<Section> {
  const id = section;
  let sectionObj = await Section.get(id);
  if (!sectionObj) {
    sectionObj = Section.create({
      id,
      section: capitalizeFirstLetter(section),
    });
    await sectionObj.save();
  }
  return sectionObj;
}

export async function createAndSaveExtrinsicModuleNameIfNotExists(
  section: string,
  method: string
): Promise<ExtrinsicModule> {
  const id = moduleId(section, method);
  let module = await ExtrinsicModule.get(id);
  if (!module) {
    module = ExtrinsicModule.create({
      id,
      sectionId: section,
      section: capitalizeFirstLetter(section),
      method,
    });
    await module.save();
  }
  return module;
}

export async function createAndSaveEventModuleNameIfNotExists(
  section: string,
  method: string
): Promise<EventModule> {
  const id = moduleId(section, method);
  let module = await EventModule.get(id);
  if (!module) {
    module = EventModule.create({
      id,
      sectionId: section,
      section: capitalizeFirstLetter(section),
      method,
    });
    await module.save();
  }
  return module;
}

export async function createAndSaveLogKindIfNotExists(
  rawKind: string,
  kind: string
): Promise<LogKind> {
  let logKind = await LogKind.get(rawKind);
  if (!logKind) {
    logKind = LogKind.create({
      id: rawKind,
      kind,
    });
    await logKind.save();
  }
  return logKind;
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
  await createAndSaveSectionIfNotExists(section);
  await createAndSaveExtrinsicModuleNameIfNotExists(section, method);

  // Create extrinsic
  const extrinsicId = `${blockHeight}-${indexInBlock}`;
  const extrinsic = Extrinsic.create({
    id: extrinsicId,
    sortId: sortId(blockHeight, BigInt(indexInBlock)),
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
  await createAndSaveSectionIfNotExists(section);
  await createAndSaveEventModuleNameIfNotExists(section, method);

  // Create event
  const id = `${blockHeight}-${indexInBlock.toString()}`;
  const event = Event.create({
    id,
    sortId: sortId(blockHeight, BigInt(indexInBlock)),
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
