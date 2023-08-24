import { HexSink } from "@subsquid/scale-codec";
import { xxhash128 } from "@subsquid/util-xxhash";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { toHex } from "@subsquid/util-internal-hex";
import { Block, Extrinsic, Call, Account } from "../model";
import { CallItem, EventItem, Context } from "../processor";

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

const PIECE_SIZE = BigInt(1048576);
const SLOT_PROBABILITY = [BigInt(1), BigInt(6)];

/**
 * Calculates the space pledged by a solution
 * @param {bigint} solutionRange - range of the solution
 * @return {bigint} - space pledged in bytes
 */
export function calcSpacePledged(solutionRange: bigint): bigint {
  const MAX_U64 = BigInt(2 ** 64 - 1);

  const RECORD_BUCKETS = BigInt(65536);
  const RECORD_CHUNKS = BigInt(32768);
  const SOLUTION_RANGE = BigInt(8);
  const SCALAR = BigInt(32);

  const history_size =
    (MAX_U64 * SLOT_PROBABILITY[0]) /
    SLOT_PROBABILITY[1] /
    (solutionRange * PIECE_SIZE) /
    (RECORD_BUCKETS * RECORD_CHUNKS) /
    (SOLUTION_RANGE * SCALAR);

  return history_size;
}

/*
 * Calculates the size of the history in bytes
 * @param {number} segmentsCount - number of segments in the history
 * @return {bigint} - size of the history in bytes
 */
export function calcHistorySize(segmentsCount: number): bigint {
  const segmentCountBigInt = BigInt(segmentsCount);
  const PIECES_IN_SEGMENT = BigInt(256);

  return PIECE_SIZE * PIECES_IN_SEGMENT * segmentCountBigInt;
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
  return async function getOrCreateAccount(
    blockHeight: bigint,
    accountId: string
  ): Promise<Account> {
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
