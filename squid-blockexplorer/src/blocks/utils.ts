import { SubstrateBlock } from '@subsquid/substrate-processor';
import { Block, Extrinsic, Call, Account } from '../model';
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


export function createBlock(
  header: SubstrateBlock,
  spacePledged: bigint,
  blockchainSize: bigint
) {
  return new Block({
    ...header,
    height: BigInt(header.height),
    timestamp: new Date(header.timestamp),
    spacePledged,
    blockchainSize,
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
