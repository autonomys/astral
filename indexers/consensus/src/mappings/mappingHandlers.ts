import {
  SubstrateBlock,
  SubstrateEvent,
  SubstrateExtrinsic,
} from "@subql/types";
import { Account, Block, Event, Extrinsic } from "../types";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  // Deconstruct the block object
  const {
    block: {
      header: { number, parentHash, stateRoot, extrinsicsRoot },
      hash,
      extrinsics,
    },
    timestamp,
    specVersion,
    events,
  } = block;

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
