import { HexSink } from "@subsquid/scale-codec";
import { xxhash128 } from "@subsquid/util-xxhash";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { toHex } from '@subsquid/util-internal-hex';
import { Block, Extrinsic, Call, Account } from "../model";
import { CallItem, EventItem } from "../processor";

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
  items: Item[],
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
  { name, extrinsic }: CallItem,
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
  });
}

export function createCall(
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
  });
}

export function calcSpacePledged(solutionRange: bigint): bigint {
  const MAX_U64 = (2n ** 64n) - 1n;
  const SLOT_PROBABILITY = [1n, 6n];
  const PIECE_SIZE = 4096n;

  return BigInt(
    MAX_U64 * SLOT_PROBABILITY[0] / SLOT_PROBABILITY[1] / solutionRange * PIECE_SIZE
  );
}

export function calcHistorySize(segmentsCount: number): bigint {
  // TODO: these constants may change post Gemini-II
  const WITNESS_SIZE = 48;
  const PIECE_SIZE = 32 * 1024;
  const PIECES_IN_SEGMENT = 256;
  const RECORD_SIZE = PIECE_SIZE - WITNESS_SIZE;
  const RECORDED_HISTORY_SEGMENT_SIZE = RECORD_SIZE * PIECES_IN_SEGMENT / 2;
  const SEGMENT_SIZE = RECORDED_HISTORY_SEGMENT_SIZE / RECORD_SIZE * PIECE_SIZE * 2;

  return BigInt(segmentsCount * SEGMENT_SIZE);
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
