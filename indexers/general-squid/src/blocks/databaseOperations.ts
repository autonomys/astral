import { StoreWithCache } from "@belopash/typeorm-store";
import { decodeHex } from "@subsquid/substrate-processor";
import { randomUUID } from "crypto";
import * as model from "../model";
import {
  BlockHeader,
  Call,
  Event,
  Extrinsic,
  ProcessorContext,
} from "../processor";
import {
  blockchainHistorySize,
  totalSpacePledged,
} from "../types/transaction-fees/constants";
import { decodeLog } from "./utils";

export async function saveBlock(
  ctx: ProcessorContext<StoreWithCache>,
  block: BlockHeader,
  author: string,
  extrinsicsCount: number,
  eventsCount: number,
  logsCount: number,
  callsCount: number
): Promise<model.Block> {
  const spacePledged = totalSpacePledged.v0.get(block);
  const historySize = blockchainHistorySize.v0.get(block);

  const entity = new model.Block({
    id: block.id,
    height: block.height,
    hash: block.hash,
    parentHash: block.parentHash,
    stateRoot: block.stateRoot,
    extrinsicsRoot: block.extrinsicsRoot,
    specId: `${block.specName}@${block.specVersion}`,
    specName: block.specName,
    specVersion: block.specVersion,
    implName: block.implName,
    implVersion: block.implVersion,
    timestamp: new Date(block.timestamp ?? 0),
    validator: block.validator ? decodeHex(block.validator) : undefined,
    spacePledged,
    blockchainSize: historySize,
    author,
    extrinsicsCount,
    callsCount,
    eventsCount,
    logsCount,
  });

  await ctx.store.insert(entity);

  // return the saved block
  return entity;
}

export async function saveExtrinsic(
  ctx: ProcessorContext<StoreWithCache>,
  block: model.Block,
  extrinsic: Extrinsic
) {
  const entity = new model.Extrinsic({
    id: extrinsic.id,
    block,
    index: extrinsic.index,
    version: extrinsic.version,
    signature: new model.ExtrinsicSignature(extrinsic.signature),
    tip: extrinsic.tip,
    fee: extrinsic.fee,
    success: extrinsic.success,
    error: extrinsic.error,
    hash: extrinsic.hash,
    timestamp: new Date(block.timestamp ?? 0),
    args: extrinsic.call?.args,
    name: extrinsic.call?.name,
  });

  if (extrinsic.call?.name) {
    const moduleNameEntity = new model.ExtrinsicModuleName({
      id: randomUUID(),
      name: extrinsic.call.name,
    });

    await ctx.store.insert(moduleNameEntity);
  }

  await ctx.store.insert(entity);
}

export async function saveCall(
  ctx: ProcessorContext<StoreWithCache>,
  block: model.Block,
  call: Call
) {
  const extrinsic = await ctx.store.getOrFail(
    model.Extrinsic,
    call.getExtrinsic().id
  );

  const parent = call.parentCall
    ? await ctx.store.getOrFail(model.Call, call.parentCall.id)
    : undefined;

  const [pallet, name] = call.name.split(".");

  const entity = new model.Call({
    id: call.id,
    block,
    extrinsic,
    parent,
    address: call.address,
    success: call.success,
    error: call.error,
    pallet,
    name,
    timestamp: new Date(block.timestamp ?? 0),
    args: call.args,
  });
  await ctx.store.insert(entity);

  if (call.address.length == 0) {
    extrinsic.call = entity;
    await ctx.store.upsert(extrinsic);
  }
}

export async function saveEvent(
  ctx: ProcessorContext<StoreWithCache>,
  block: model.Block,
  event: Event
) {
  const extrinsic = event.extrinsic
    ? await ctx.store.getOrFail(model.Extrinsic, event.extrinsic.id)
    : undefined;
  const call = event.call
    ? await ctx.store.getOrFail(model.Call, event.call.id)
    : undefined;

  const [pallet, name] = event.name.split(".");

  const entity = new model.Event({
    id: event.id,
    block,
    extrinsic,
    call,
    index: event.index,
    phase: event.phase,
    pallet,
    name,
    timestamp: new Date(block.timestamp ?? 0),
    args: event.args,
  });
  await ctx.store.insert(entity);

  const moduleNameEntity = new model.EventModuleName({
    id: randomUUID(),
    name: event.name,
  });

  await ctx.store.insert(moduleNameEntity);
}

export async function saveLog(
  ctx: ProcessorContext<StoreWithCache>,
  block_: BlockHeader,
  log: any,
  index: number
) {
  const block = await ctx.store.getOrFail(model.Block, block_.id);
  const entity = new model.Log({
    id: `${block.id}-${index}`,
    kind: log.__kind,
    // uncast to access 'value' prop, which is not present on all DigestItems
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: decodeLog(log.value),
    block,
  });
  await ctx.store.insert(entity);
}
