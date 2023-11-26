import config from "../config";
import * as ss58 from "@subsquid/ss58";
import { HexSink } from "@subsquid/scale-codec";
import { xxhash128 } from "@subsquid/util-xxhash";
import { SubstrateBlock, decodeHex } from "@subsquid/substrate-processor";
import { toHex } from "@subsquid/util-internal-hex";
import {
  Block,
  Extrinsic,
  Call,
  Account,
  ExtrinsicModuleName,
  EventModuleName,
  Operator,
  Nominator,
} from "../model";
import { CallItem, EventItem, Context } from "../processor";
import { randomUUID } from "crypto";
import { createSystemAccountStorage } from "../balances/storage";
import { ApiPromise } from "@polkadot/api";

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

  const sectors =
    ((MAX_U64 / SLOT_PROBABILITY[1]) * SLOT_PROBABILITY[0]) /
    ((MAX_PIECES_IN_SECTOR * RECORD_NUM_CHUNKS) / RECORD_NUM_S_BUCKETS);

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
  return async function getOrCreateAccount(
    header: SubstrateBlock,
    accountId: string
  ): Promise<Account> {
    const storage = createSystemAccountStorage(ctx, header);
    const accountBufferId = decodeHex(accountId);
    const id = encodeId(accountBufferId);
    let account = await ctx.store.get(Account, id);

    // update account nonce if it exists
    const accountInfo = await storage.asV0.get(accountBufferId);

    if (!account) {
      account = new Account({
        id: id,
        updatedAt: BigInt(header.height),
        nonce: accountInfo ? BigInt(accountInfo.nonce) : 0n,
      });

      await ctx.store.insert(account);
    }

    return account;
  };
}

/**
 *
 * @param id
 * @returns substrate account address properly encoded
 */
export function encodeId(id: Uint8Array) {
  return ss58.codec(config.prefix).encode(id);
}
/**
 *
 * @param ctx
 * @returns void
 */
export function addExtrinsicModuleNameFactory(ctx: Context) {
  return async function addExtrinsicModuleName(name: string): Promise<void> {
    let module = await ctx.store.findOneBy(ExtrinsicModuleName, { name: name });

    if (!module) {
      module = new ExtrinsicModuleName({
        id: randomUUID(),
        name: name,
      });

      await ctx.store.insert(module);
    }
  };
}

/**
 *
 * @param ctx
 * @returns void
 */
export function addEventModuleNameFactory(ctx: Context) {
  return async function addEventModuleName(name: string): Promise<void> {
    let module = await ctx.store.findOneBy(EventModuleName, { name: name });

    if (!module) {
      module = new EventModuleName({
        id: randomUUID(),
        name: name,
      });

      await ctx.store.insert(module);
    }
  };
}

/**
 *
 * @param ctx
 * @param api
 * @returns
 */
export function getOrCreateOperatorFactory(ctx: Context, api: ApiPromise) {
  return async function getOrCreateOperator(
    operatorId: bigint
  ): Promise<Operator | undefined> {
    const block = ctx.blocks[ctx.blocks.length - 1];
    let operator = await ctx.store.get(Operator, operatorId.toString());

    if (!operator) {
      const operatorInfo = (
        await api.query.domains.operators(operatorId)
      ).toJSON() as any;

      if (operatorInfo) {
        operator = new Operator({
          id: operatorId.toString(),
          status: operatorInfo.status.toString(),
          signingKey: operatorInfo.signingKey,
          totalShares: BigInt(operatorInfo.totalShares),
          currentEpochRewards: operatorInfo.currentEpochRewards,
          currentTotalStake: BigInt(operatorInfo.currentTotalStake),
          nominationTax: operatorInfo.nominationTax,
          minimumNominatorStake: BigInt(operatorInfo.minimumNominatorStake),
          nextDomainId: operatorInfo.nextDomainId,
          currentDomainId: operatorInfo.currentDomainId,
          updatedAt: BigInt(block.header.height),
        });

        await ctx.store.insert(operator);
      }
    }

    return operator;
  };
}

/**
 *
 * @param ctx
 * @param api
 * @returns
 */
export function getOrCreateNominatorsFactory(
  ctx: Context,
  api: ApiPromise,
  getOrCreateAccount: (
    header: SubstrateBlock,
    accountId: string
  ) => Promise<Account>
) {
  return async function getOrCreateNominators(
    operator: Operator
  ): Promise<Nominator[]> {
    const nominatorsList: Nominator[] = [];
    const operatorId = BigInt(operator.id);
    const block = ctx.blocks[ctx.blocks.length - 1];
    const blockHeight = BigInt(block.header.height);

    const nominators = await api.query.domains.nominators.entries(operatorId);
    const nominatorsLength = nominators.length;

    for (let i = 0; i < nominatorsLength; i++) {
      const nominatorId = nominators[i][0].args[1].toString();

      let nominator = await ctx.store.get(
        Nominator,
        `${operator.id}-${nominatorId}`
      );

      if (!nominator) {
        const nominatorInfo = nominators[i][1].toJSON() as any;

        const existingNominator = await ctx.store.get(Nominator, nominatorId);
        const hexAccountId = api.registry
          .createType("AccountId", nominatorId)
          .toHex();
        const account = await getOrCreateAccount(block.header, hexAccountId);

        nominator = new Nominator({
          ...existingNominator,
          id: `${operator.id}-${nominatorId}`,
          operator: operator,
          account: account,
          shares: BigInt(nominatorInfo.shares),
          updatedAt: blockHeight,
        });

        nominatorsList.push(nominator);

        await ctx.store.save(nominator);
      }
    }

    return nominatorsList;
  };
}
