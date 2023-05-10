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
  extrinsicsCount: number;
  eventsCount: number;
}

export function createBlock({
  header,
  extrinsicsCount,
  eventsCount,
}: CreateBlockParams) {
  return new Block({
    ...header,
    height: BigInt(header.height),
    timestamp: new Date(header.timestamp),
    extrinsicsCount,
    eventsCount,
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
