import { SubstrateBlock } from '@subsquid/substrate-processor';
import { CallItem, Context, EventItem } from './processor'
import { Block, Extrinsic, Event, Call } from './model';
import { getOrCreateAccount } from './utils';
import { SubspaceRecordsRootStorage, SubspaceSolutionRangesStorage } from './types/storage';

export async function processBlocks(ctx: Context) {
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();
  const batchEvents: Event[] = [];
  const batchBlocks: Block[] = [];

  for (const { header, items } of ctx.blocks) {
    const block = await createBlock(ctx, header);
    batchBlocks.push(block);

    const callItems = items.filter(({ kind }) => kind === "call") as CallItem[];
    const eventItems = items.filter(({ kind }) => kind === "event") as EventItem[];
    // some extrinsics (i.e. Utility.batch_all) have parent call and child calls
    // in that case we need to process parent calls first
    const parentCalls = callItems.filter(({ call }) => !call.parent);
    const childCalls = callItems.filter(({ call }) => call.parent);

    // process block extrinsics / parent calls
    for (const item of parentCalls) {
      const extrinsic = await createExtrinsic(ctx, item, block);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const call = createCall(item, block, extrinsic!, null);
      extrinsicsMap.set(extrinsic.id, extrinsic);
      callsMap.set(call.id, call);
    }

    // process child calls
    for (const item of childCalls) {
      const extrinsic = extrinsicsMap.get(item.extrinsic.id);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const parent = callsMap.get(item.call.parent!.id);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const call = createCall(item, block, extrinsic!, parent!);
      callsMap.set(call.id, call);
    }

    // process block events
    for (const item of eventItems) {
      // some events may not have associated extrinsic / call 
      // i.e. TransactionFees.StorageFeesEscrowChange
      let extrinsic = null;
      let call = null;

      if (item.event.extrinsic) {
        extrinsic = extrinsicsMap.get(item.event.extrinsic.id);
        call = callsMap.get(item.event.extrinsic.call.id);
      }

      const event = new Event({
        ...item.event,
        block,
        extrinsic,
        call,
        timestamp: block.timestamp,
      });

      batchEvents.push(event);
    }
  }

  await ctx.store.save(batchBlocks);
  await ctx.store.save([...extrinsicsMap.values()]);
  await ctx.store.save([...callsMap.values()]);
  await ctx.store.save(batchEvents);

  ctx.log
    .child('blocks')
    .info(`added: 
      ${batchBlocks.length} blocks, 
      ${extrinsicsMap.size} extrinsics, 
      ${callsMap.size} calls, 
      ${batchEvents.length} events
    `);
}

async function createBlock(ctx: Context, header: SubstrateBlock) {
  const spacePledged = await getSpacePledged(ctx, header);
  const blockchainSize = await getHistorySize(ctx, header);

  return new Block({
    ...header,
    height: BigInt(header.height),
    timestamp: new Date(header.timestamp),
    spacePledged,
    blockchainSize,
  });
}

async function createExtrinsic(ctx: Context, { name, extrinsic }: CallItem, block: Block) {
  let signer = null;
  let signature = null;

  if (extrinsic.signature) {
    signer = await getOrCreateAccount(ctx, block.height, extrinsic.signature.address.value);
    signature = extrinsic.signature.signature.value;
  }

  return new Extrinsic({
    ...extrinsic,
    name,
    fee: extrinsic.fee || null,
    tip: extrinsic.tip || null,
    signer,
    signature,
    block,
    timestamp: block.timestamp,
  })
}

function createCall(
  { call }: CallItem,
  block: Block,
  extrinsic: Extrinsic,
  parent: Call | null,
) {
  return new Call({
    ...call,
    timestamp: block.timestamp,
    block,
    extrinsic,
    parent,
  })
}

async function getSpacePledged(ctx: Context, blockHeader: SubstrateBlock): Promise<bigint> {
  const MAX_U64 = (2n ** 64n) - 1n;
  const SLOT_PROBABILITY = [1n, 6n];
  const PIECE_SIZE = 4096n;

  const storage = new SubspaceSolutionRangesStorage(ctx, blockHeader);
  const solutionRange = (await storage.getAsV3()).current;

  return BigInt(
    MAX_U64 * SLOT_PROBABILITY[0] / SLOT_PROBABILITY[1] / solutionRange * PIECE_SIZE
  );
}

async function getHistorySize(ctx: Context, blockHeader: SubstrateBlock): Promise<bigint> {
  // these constants may change post Gemini-II
  const WITNESS_SIZE = 48;
  const PIECE_SIZE = 32 * 1024;
  const PIECES_IN_SEGMENT = 256;
  const RECORD_SIZE = PIECE_SIZE - WITNESS_SIZE;
  const RECORDED_HISTORY_SEGMENT_SIZE = RECORD_SIZE * PIECES_IN_SEGMENT / 2;
  const SEGMENT_SIZE = RECORDED_HISTORY_SEGMENT_SIZE / RECORD_SIZE * PIECE_SIZE * 2;

  const storage = new SubspaceRecordsRootStorage(ctx, blockHeader);
  const segments = (await storage.getAllAsV3()).length;

  return BigInt(segments * SEGMENT_SIZE);
}
