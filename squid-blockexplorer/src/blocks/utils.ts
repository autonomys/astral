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


/**
 * Calculates the space pledged by a solution range, based on monorepo calculation
 * in function TotalSpacePledged: https://github.com/subspace/subspace/blob/f782f7297a6d61d8f22a3b10d201396fe30708fd/crates/subspace-runtime/src/lib.rs#L396-L399
 * @param {bigint} solutionRange - range of the solution
 * @return {bigint} - space pledged in bytes
 */
export function calcSpacePledged(solutionRange: bigint): bigint {
  const MAX_U64 = 2n ** 64n - 1n;
  const PIECE_SIZE = 1048576n;
  const SLOT_PROBABILITY = [1n, 6n];

  const RECORD_NUM_S_BUCKETS = 65536n;
  const RECORD_NUM_CHUNKS = 32768n;
  const SIZE_OF_SOLUTION_RANGE = 8n;
  const SCALAR_FULL_BYTES = 32n;

  const totalSpacePledged = BigInt(
    MAX_U64 * PIECE_SIZE * SLOT_PROBABILITY[0]
    / RECORD_NUM_S_BUCKETS * RECORD_NUM_CHUNKS
    / solutionRange
    / SLOT_PROBABILITY[1]
    * SCALAR_FULL_BYTES
    / SIZE_OF_SOLUTION_RANGE);

  return totalSpacePledged;
}

/*
 * Calculates the size of the history in bytes
 * @param {number} segmentsCount - number of segments in the history
 * @return {bigint} - size of the history in bytes
 */
export function calcHistorySize(segmentsCount: number): bigint {
  const PIECES_IN_SEGMENT = 256;
  const PIECE_SIZE = 1048576;

  return BigInt(PIECE_SIZE * PIECES_IN_SEGMENT * segmentsCount);
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
