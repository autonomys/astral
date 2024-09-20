import { SubstrateBlock } from "@subql/types";
import { Account, Block, Event, Extrinsic } from "../types";
import { checkAndGetBlock } from "./db";
import { stringify } from "./utils";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  logger.info(
    `Handling block ${stringify({
      block: Object.keys(block),
      blockHeader: Object.keys(block.block),
      blockHeaderHeader: Object.keys(block.block.header),
    })}`
  );
  const { block: blockHeader, timestamp, specVersion, events } = block;
  const {
    header: { number, parentHash, stateRoot, extrinsicsRoot },
    hash,
    extrinsics,
  } = blockHeader;
  const height = BigInt(number.toString());

  logger.info(`height ${height}`);
  logger.info(`events ${stringify(events)}`);

  // To-Do
  const spacePledged = BigInt(0);
  const blockchainSize = BigInt(0);
  const authorId = "st0x";
  logger.info(`spacePledged: ${spacePledged.toString()}`);
  logger.info(`blockchainSize: ${blockchainSize.toString()}`);

  await checkAndGetBlock(
    hash.toString(),
    height,
    timestamp ? timestamp : new Date(0),
    parentHash.toString(),
    specVersion.toString(),
    stateRoot.toString(),
    extrinsicsRoot.toString(),
    spacePledged,
    blockchainSize,
    extrinsics.length,
    events.length,
    authorId
  );
  /*
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
        id: `${height}-${extrinsic.callIndex}`,
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
        blockId: height.toString(),
        timestamp: new Date(Number(timestamp)),
        args: JSON.stringify(args),
      });
      await extrinsicRecord.save();
    }
  }
*/
  /*
  if (events.length > 0) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      logger.info(`Event: ${event.toString()}`);

      const eventRecord = Event.create({
        id: `${height}-${i}`,
        indexInBlock: i,
        name: ``,
        timestamp: new Date(Number(timestamp) * 1000),
        phase: event.phase.isApplyExtrinsic
          ? "ApplyExtrinsic"
          : event.phase.toString(),
        pos: 0,
        args: "",
        blockId: height.toString(),
        extrinsicId: "",
      });

      await eventRecord.save();
    }
  }
  */
  logger.info("Block record saved successfully");
}
