import config from "../config";
import * as ss58 from "@subsquid/ss58";
import { HexSink } from "@subsquid/scale-codec";
import { xxhash128 } from "@subsquid/util-xxhash";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { toHex } from "@subsquid/util-internal-hex";
import { Block, Extrinsic, Call, Account, ExtrinsicModuleName, EventModuleName } from "../model";
import { CallItem, EventItem, Context } from "../processor";
import { randomUUID }from 'crypto';

/**
 * Takes a predicate and a list of items and returns the
 * pair of lists of the same type of elements which do and do not
 * satisfy, the predicate, respectively.
 * @param {Function} predicate A predicate to determine which side the element belongs to.
 * @param {Array} items the list (or other filterable) to partition.
 * @return {Array} An array, containing first the subset of elements that satisfy the
 *         predicate, and second the subset of elements that do not satisfy.
 */
export function partitionItems<Item = CallItem | EventItem>(
  predicate: (item: Item) => boolean,
  items: Item[]
): Item[][] {
  const partitioned: Item[][] = [[], []];

  for (const item of items) {
    const partitionIndex: 0 | 1 = predicate(item) ? 0 : 1;
    partitioned[partitionIndex].push(item);
  }

  return partitioned;
}

interface CreateBlockParams {
  header: SubstrateBlock;
  spacePledged: bigint;
  blockchainSize: bigint;
  extrinsicsCount: number;
  eventsCount: number;
  author: Account | undefined;
}

export function createBlock({
  header,
  spacePledged,
  blockchainSize,
  extrinsicsCount,
  eventsCount,
  author,
}: CreateBlockParams) {
  return new Block({
    ...header,
    height: BigInt(header.height),
    timestamp: new Date(header.timestamp),
    spacePledged,
    blockchainSize,
    extrinsicsCount,
    eventsCount,
    author,
  });
}

export function createExtrinsic(
  { name, extrinsic, call }: CallItem,
  block: Block,
  signature: string | null = null,
  signer: Account | null = null
) {
  return new Extrinsic({
    ...extrinsic,
    name,
    fee: extrinsic.fee || null,
    tip: extrinsic.tip || null,
    signer,
    signature,
    block,
    timestamp: block.timestamp,
    args: call.args,
  });
}

export function createCall(
  { call }: CallItem,
  block: Block,
  extrinsic: Extrinsic,
  parent: Call | null
) {
  return new Call({
    ...call,
    timestamp: block.timestamp,
    block,
    extrinsic,
    parent,
  });
}

const PIECE_SIZE = 1048576n;
const MAX_PIECES_IN_SECTOR = 1000n;


/**
 * Calculates the number of sectors pledged by a solution range, based on monorepo calculation
 * in function solution_range_to_sectors: https://github.com/subspace/subspace/blob/main/crates/subspace-runtime/src/lib.rs#L227-L236
 * @param {bigint} solutionRange - range of the solution
 * @return {bigint} - sectors pledged number
 */
export function solutionRangeToSectors(solutionRange: bigint): bigint {
  const MAX_U64 = 2n ** 64n - 1n;
  const SLOT_PROBABILITY = [1n, 6n];
  const RECORD_NUM_CHUNKS = 32768n;
  const RECORD_NUM_S_BUCKETS = 65536n;

  const sectors = MAX_U64
      / SLOT_PROBABILITY[1] * SLOT_PROBABILITY[0]
      / (MAX_PIECES_IN_SECTOR * RECORD_NUM_CHUNKS / RECORD_NUM_S_BUCKETS);

  // Take solution range into account
  return sectors / solutionRange;
}

/**
 * Calculates the space pledged by a solution range, based on monorepo calculation
 * in function TotalSpacePledged: https://github.com/subspace/subspace/blob/main/crates/subspace-runtime/src/lib.rs#L442-L447
 * @param {bigint} solutionRange - range of the solution
 * @return {bigint} - space pledged in bytes
 */
export function calcSpacePledged(solutionRange: bigint): bigint {
  const sectors = solutionRangeToSectors(solutionRange);

  return sectors * MAX_PIECES_IN_SECTOR * PIECE_SIZE;
}

/*
 * Calculates the size of the history in bytes
 * @param {number} segmentsCount - number of segments in the history
 * @return {bigint} - size of the history in bytes
 */
export function calcHistorySize(segmentsCount: number): bigint {
  const PIECES_IN_SEGMENT = 256n;
  const segmentsCountBigInt = BigInt(segmentsCount);

  return PIECE_SIZE * PIECES_IN_SEGMENT * segmentsCountBigInt;
}

/**
 * Converts string into Scale-encoded hash
 * @param {string} name
 * @return {string} - hex result
 */
function getNameHash(name: string): string {
  const digest = xxhash128().update(name).digest();
  const sink = new HexSink();
  sink.u128(digest);
  const hash = sink.toHex();
  return hash;
}

/**
 * Converts prefix and name into Scale-encoded hash, useful for querying storage
 * @param {string} prefix - pallet name (i.e "Subspace")
 * @param {string} name - storage name (i.e. "RecordsRoot")
 * @return {string} - hex result
 */
export function getStorageHash(prefix: string, name: string) {
  return getNameHash(prefix) + getNameHash(name).slice(2);
}

/**
 * Converts a SCALE-encoded log into a human-readable format
 * @param {null | Uint8Array | Uint8Array[]} value - SCALE-encoded log
 * @return {null | {data: string} | {engine: string, data: string}} - human-readable log
 */
export function decodeLog(value: null | Uint8Array | Uint8Array[]) {
  if (!value) return null;

  if (Array.isArray(value)) {
    return {
      engine: value[0].toString(),
      data: toHex(value[1]),
    };
  }

  return { data: toHex(value) };
}

/**
 * Returns a function that returns an account by id or creates a new one if it doesn't exist
 * @param {Context} ctx - processor context
 * @return {Function} - getOrCreateAccount function
 * @example
 * const getOrCreateAccount = getOrCreateAccountFactory(ctx);
 * const account = await getOrCreateAccount(blockHeight, accountId);
 */
export function getOrCreateAccountFactory(ctx: Context) {
  return async function getOrCreateAccount(blockHeight: bigint, accountId: string): Promise<Account> {
    let account = await ctx.store.get(Account, accountId);

    if (!account) {
      account = new Account({
        id: accountId,
        updatedAt: blockHeight,
      });

      await ctx.store.insert(account);
    }

    return account;
  };
}

export function encodeId(id: Uint8Array) {
  return ss58.codec(config.prefix).encode(id);
}

export function addExtrinsicModuleNameFactory(ctx: Context) {
  return async function addExtrinsicModuleName(name: string): Promise<void> {
    let module = await ctx.store.findOneBy(ExtrinsicModuleName, {name: name});

    if (!module) {
      module = new ExtrinsicModuleName({
        id: randomUUID(),
        name: name,
      });

      await ctx.store.insert(module);
    }
  };
}

export function addEventModuleNameFactory(ctx: Context) {
  return async function addEventModuleName(name: string): Promise<void> {
    let module = await ctx.store.findOneBy(EventModuleName, {name: name});

    if (!module) {
      module = new EventModuleName({
        id: randomUUID(),
        name: name,
      });

      await ctx.store.insert(module);
    }
  };
}