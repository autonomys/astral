import { balance } from "@autonomys/auto-consensus";
// import { ApiAtBlockHash } from "@autonomys/auto-utils";
// import { Struct, u64 } from "@polkadot/types";
// import { AccountId32 } from "@polkadot/types/interfaces";
import { SubstrateBlock } from "@subql/types";
// import { HexSink } from "@subsquid/scale-codec";
// import { xxhash128 } from "@subsquid/util-xxhash";
import { solutionRanges } from "../typegens/subspace/storage";
// import { Block as BlockSQD } from "../typegens/support";
// import { digest } from "../typegens/system/storage";
// import { DigestItem_PreRuntime } from "../typegens/v0";
import { Account, Block, Event, Extrinsic } from "../types";

const PIECE_SIZE = BigInt(1048576);
const MAX_PIECES_IN_SECTOR = BigInt(1000);

const ENDPOINT = "wss://rpc-squids.gemini-3h.subspace.network/ws";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  const test = await balance(
    api as any,
    "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
  );
  logger.info(`test: ${test} ${test.free.toString()}`);
  // Deconstruct the block object
  const { block: blockHeader, timestamp, specVersion, events } = block;
  const {
    header: { number, parentHash, stateRoot, extrinsicsRoot },
    hash,
    extrinsics,
  } = blockHeader;

  logger.info(`Connecting to ${ENDPOINT}`);

  logger.info(`Block Hash: ${hash.toString()}`);

  // const [solutionRang, blockchainSize, owner] = await Promise.all([
  // solutionRanges.v0.get(blockHeader as any),
  // getHistorySize(blockHeader.hash.toString(), api as any),
  // getBlockAuthor(blockHeader as any, api as any),
  // ]);

  // const solutionRang = await solutionRanges.v0.get(blockHeader as any);
  // const spacePledged = solutionRang
  //   ? calcSpacePledged(solutionRang.current)
  //   : calcSpacePledged(
  //       solutionRanges.v0.getDefault(blockHeader as any).current
  //     );

  logger.info(`Block number: ${number.toString()}`);
  logger.info(`Timestamp: ${timestamp}`);
  logger.info(`Block hash: ${hash.toString()}`);
  logger.info(`Parent hash: ${parentHash.toString()}`);
  logger.info(`Spec version: ${specVersion.toString()}`);
  logger.info(`State root: ${stateRoot.toString()}`);
  logger.info(`Extrinsics root: ${extrinsicsRoot.toString()}`);
  logger.info(`Extrinsics count: ${extrinsics.length}`);
  logger.info(`Events count: ${events.length}`);

  // To-Do
  const spacePledged = BigInt(0);
  const blockchainSize = BigInt(0);
  logger.info(`spacePledged: ${spacePledged.toString()}`);
  logger.info(`blockchainSize: ${blockchainSize.toString()}`);

  const blockRecord = Block.create({
    id: number.toString(),
    height: number.toBigInt(),
    timestamp: new Date(Number(timestamp) * 1000),
    hash: hash.toString(),
    parentHash: parentHash.toString(),
    specId: specVersion.toString(),
    stateRoot: stateRoot.toString(),
    extrinsicsRoot: extrinsicsRoot.toString(),
    spacePledged,
    blockchainSize,
    extrinsicsCount: extrinsics.length,
    eventsCount: events.length,
  });

  if (extrinsics.length > 0) {
    for (let i = 0; i < extrinsics.length; i++) {
      const extrinsic = extrinsics[i];
      logger.info(
        `Extrinsic: ${extrinsic.method.section}.${extrinsic.method.method}`
      );
      const {
        method: { args },
      } = extrinsic;

      const extrinsicRecord = Extrinsic.create({
        id: `${blockRecord.id}-${extrinsic.callIndex}`,
        hash: extrinsic.hash.toString(),
        indexInBlock: i,
        nonce: extrinsic.nonce?.toBigInt(),
        name: `${extrinsic.method.section}.${extrinsic.method.method}`,
        signerId: extrinsic.signer?.toString(),
        signature: extrinsic.signature?.toString(),
        error: "",
        tip: extrinsic.tip?.toBigInt(),
        fee: BigInt(0),
        success: true,
        blockId: blockRecord.id,
        timestamp: new Date(Number(timestamp)),
        args: JSON.stringify(args),
      });
      await extrinsicRecord.save();
    }
  }

  if (events.length > 0) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      logger.info(`Event: ${event.toString()}`);

      const eventRecord = Event.create({
        id: `${blockRecord.id}-${i}`,
        indexInBlock: i,
        name: ``,
        timestamp: new Date(Number(timestamp) * 1000),
        phase: event.phase.isApplyExtrinsic
          ? "ApplyExtrinsic"
          : event.phase.toString(),
        pos: 0,
        args: "",
        blockId: blockRecord.id,
        extrinsicId: "",
      });

      await eventRecord.save();
    }
  }

  await blockRecord.save();
  logger.info("Block record saved successfully");
}

export const solutionRangeToSectors = (solutionRange: bigint): bigint => {
  const MAX_U64 = BigInt(2) ** BigInt(64) - BigInt(1);
  const SLOT_PROBABILITY = [BigInt(1), BigInt(6)];
  const RECORD_NUM_CHUNKS = BigInt(32768);
  const RECORD_NUM_S_BUCKETS = BigInt(65536);

  const sectors =
    ((MAX_U64 / SLOT_PROBABILITY[1]) * SLOT_PROBABILITY[0]) /
    ((MAX_PIECES_IN_SECTOR * RECORD_NUM_CHUNKS) / RECORD_NUM_S_BUCKETS);

  // Take solution range into account
  return sectors / solutionRange;
};

export const calcSpacePledged = (solutionRange: bigint): bigint => {
  const sectors = solutionRangeToSectors(solutionRange);

  return sectors * MAX_PIECES_IN_SECTOR * PIECE_SIZE;
};

// export const calcHistorySize = (segmentsCount: number): bigint => {
//   const PIECES_IN_SEGMENT = BigInt(256);
//   const segmentsCountBigInt = BigInt(segmentsCount);

//   return PIECE_SIZE * PIECES_IN_SEGMENT * segmentsCountBigInt;
// };

// interface Solution extends Struct {
//   readonly public_key: AccountId32;
//   readonly reward_address: AccountId32;
// }

// export interface SubPreDigest extends Struct {
//   readonly slot: u64;
//   readonly solution: Solution;
// }

// export const getBlockAuthor = async (
//   blockHeader: BlockSQD,
//   api: ApiAtBlockHash
// ) => {
//   if (blockHeader.height === 0) return; // genesis block does not have logs
//   const storage =
//     (await digest.v0.get(blockHeader)) ?? digest.v0.getDefault(blockHeader);
//   const preRuntimeRaw = storage.logs.find(
//     (digestItem) => digestItem.__kind === "PreRuntime"
//   ) as DigestItem_PreRuntime;
//   if (!preRuntimeRaw) return;

//   const subPreDigest = api.registry.createType(
//     "SubPreDigest",
//     preRuntimeRaw.value[1]
//   );
//   return (
//     subPreDigest as unknown as SubPreDigest
//   ).solution.reward_address.toString();
// };

// const getNameHash = (name: string): string => {
//   const digest = xxhash128().update(name).digest();
//   const sink = new HexSink();
//   sink.u128(digest);
//   const hash = sink.toHex();
//   return hash;
// };

// export const getStorageHash = (prefix: string, name: string) => {
//   return getNameHash(prefix) + getNameHash(name).slice(2);
// };

// export const getHistorySize = async (
//   blockHeaderHash: string,
//   api: ApiAtBlockHash
// ) => {
//   const storageHash = getStorageHash("Subspace", "SegmentCommitment");

//   const totalSizeBytes = await api.query.state.getStorageSizeAt(
//     storageHash,
//     blockHeaderHash
//   );
//   const totalSize = BigInt(totalSizeBytes.toString());
//   if (totalSize === BigInt(0)) return BigInt(0);

//   const keys = await api.query.state.getChildKeys(storageHash, blockHeaderHash);

//   const keySize = await api.query.state.getStorageSizeAt(keys, blockHeaderHash);
//   const keySizeBigInt = BigInt(keySize.toString());

//   const segmentsCount = totalSize / keySizeBigInt;

//   return calcHistorySize(Number(segmentsCount));
// };
