import { blockchainSize, spacePledged } from "@autonomys/auto-consensus";
import { Codec, SignedBlock } from "@autonomys/auto-utils";
import { ZERO_BIGINT } from "../structures/constants.ts";
import { Cache } from "../types/cache.ts";
import { Block, Digest, Event, Extrinsic } from "../types/chain.ts";
import { BlockSchema } from "../utils/schemas.ts";
import { api, getApiAt } from "./client.ts";

export const getLastBlock = async () => {
  const [lastBlockHash, lastBlock] = await Promise.all([
    api.rpc.chain.getBlockHash(),
    api.rpc.chain.getHeader(),
  ]);

  const blockData = {
    ...lastBlock.toPrimitive(),
    hash: lastBlockHash.toHex(),
  };

  return BlockSchema.parse(blockData) as Block;
};

export const getNextBlockHash = async (blockNumber: number) =>
  await api.rpc.chain.getBlockHash(blockNumber);

const parseExtrinsic = (extrinsic: Codec): Extrinsic => {
  const hash = extrinsic.hash.toHex();
  const {
    isSigned,
    method: { section, method },
  } = extrinsic.toHuman() as any;
  const {
    signature: {
      signer: { id: signer },
      signature,
    },
    method: { callIndex, args },
    nonce,
    tip,
  } = extrinsic.toPrimitive() as any;
  return {
    hash,
    isSigned,
    section,
    method,
    signer,
    signature,
    callIndex,
    args,
    nonce: nonce ? BigInt(nonce) : ZERO_BIGINT,
    tip: tip ? BigInt(tip) : ZERO_BIGINT,
  };
};

export const parseBlockExtrinsics = (block: SignedBlock): Extrinsic[] => {
  if (!block.block.extrinsics || block.block.extrinsics.length === 0) return [];
  return block.block.extrinsics.map(parseExtrinsic);
};

export const getBlockAndMore = async (cache: Cache) => {
  if (!cache.currentBlock) throw new Error("Current block not found");

  const nextBlockNumber = cache.currentBlock;
  const _blockHash = await getNextBlockHash(nextBlockNumber);

  const height = BigInt(nextBlockNumber);
  const hash = _blockHash.toHex();

  const apiAtNextBlock = await getApiAt(api, hash);

  const queries: Promise<any>[] = [
    // Basic queries
    api.rpc.chain.getBlock(hash),
    apiAtNextBlock.query.system.events(),
    apiAtNextBlock.query.system.digest(),
    apiAtNextBlock.query.system.lastRuntimeUpgrade(),
    apiAtNextBlock.query.timestamp.now(),
  ];

  const queriesResults = await Promise.all(queries);

  const [
    // Basic queries
    rawBlock,
    rawEvents,
    rawDigest,
    rawLastRuntimeUpgrade,
    rawTimestamp,
  ] = queriesResults;

  const rawBlockPrimitive = rawBlock.toPrimitive();
  const header = rawBlockPrimitive.block.header;

  const digestPrimitive = rawDigest.toPrimitive() as Digest;
  const logs = digestPrimitive.logs.map((log, index) => {
    const kind = Object.keys(log)[0];
    const _value = log[kind];
    const value =
      Array.isArray(_value) && _value.length === 2
        ? { data: _value[1], engine: _value[0] }
        : { data: _value };

    return {
      kind,
      value,
      index,
    };
  });

  const lastRuntimeUpgrade = rawLastRuntimeUpgrade.toPrimitive() as {
    specVersion: number;
    specName: string;
  };
  const timestamp = rawTimestamp.toPrimitive();
  const date = new Date(timestamp);

  const extrinsics = await parseBlockExtrinsics(rawBlock);

  const rawEventsPrimitiveArray = rawEvents.toPrimitive() as Array<any>;
  const rawEventsHumanArray = rawEvents.toHuman() as Array<any>;
  const events: Event[] = rawEventsPrimitiveArray.map((event, index) => ({
    ...event,
    event: {
      ...rawEventsHumanArray[index].event,
      ...event.event,
    },
  }));

  const logsCount = logs.length;
  const eventsCount = events.length;
  const extrinsicsCount = extrinsics.length;

  const author = "";

  return {
    height,
    hash,
    timestamp,
    date,
    header,
    logs,
    extrinsics,
    events,
    logsCount,
    eventsCount,
    extrinsicsCount,
    author,
    specVersion: lastRuntimeUpgrade.specVersion,
    specName: lastRuntimeUpgrade.specName,
  };
};
