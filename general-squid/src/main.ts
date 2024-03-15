import { Block } from "@subsquid/substrate-processor";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { Block as BlockModel, Call, Event, Extrinsic, Log } from "./model"; // Adjust import paths as needed

import { ProcessorContext, processor } from "./processor";
import { events } from "./types";
import { currentBlockAuthorInfo } from "./types/subspace/storage";

const types = {
  Solution: {
    public_key: "AccountId32",
    reward_address: "AccountId32",
  },
  SubPreDigest: {
    slot: "u64",
    solution: "Solution",
  },
};

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  //let operatorRewards = await getOperatorEvents(ctx, api);
  const blocks: BlockModel[] = [];

  for (let block of ctx.blocks) {
    console.log("🚀 ~ processor.run ~ block:", block);
    blocks.push(await handleBlock(block));
  }
  //await ctx.store.save([...operatorRewards]);
});

async function handleBlock(block: Block): Promise<BlockModel> {
  const blockEntity = new BlockModel();

  const blockAuthor = await currentBlockAuthorInfo.v0.get(block.header);
  console.log("🚀 ~ handleBlock ~ blockAuthor:", blockAuthor)

  blockEntity.id = block.header.hash.toString();
  blockEntity.height = BigInt(block.header.height);
  //blockEntity.timestamp = new Date(block.timestamp);
  blockEntity.hash = block.header.hash.toString();
  blockEntity.parentHash = block.header.parentHash.toString();
  blockEntity.specId = block.header.specVersion.toString();
  //   blockEntity.stateRoot = block.stateRoot.toString();
  //   blockEntity.extrinsicsRoot = block.extrinsicsRoot.toString();

  // Assuming spacePledged and blockchainSize are available through custom logic or external calls
  blockEntity.spacePledged = BigInt(0); // Placeholder, replace with actual logic
  blockEntity.blockchainSize = BigInt(0); // Placeholder, replace with actual logic

  //   blockEntity.extrinsicsCount = block.extrinsics.length;
  //   blockEntity.eventsCount = block.events.length;

  // Optional: Extract author from block authorship, if available
  // This requires knowledge of the network's consensus mechanism and how to extract block author
  // blockEntity.author = extractBlockAuthor(block); // Implement this function based on your network specifics

  //await store.save(blockEntity);

  // Process extrinsics
  // for (const [index, extrinsic] of block.extrinsics.entries()) {
  //     await handleExtrinsic(extrinsic, blockEntity, index);
  // }

  // Process events
  // for (const [index, event] of block.events.entries()) {
  //     await handleEvent(event, blockEntity, index);
  // }

  return blockEntity;
  // Additional handlers for Calls, Logs, and RewardEvents can be implemented in a similar pattern
  // ensure they are related to this block entity
}

// async function handleExtrinsic(extrinsic: SubstrateExtrinsic, blockEntity: Block, indexInBlock: number): Promise<void> {
//     // Placeholder for extrinsic handling logic
//     // Similar to block handling, but focusing on the specifics of each extrinsic
// }

// async function handleEvent(event: SubstrateEvent, blockEntity: Block, indexInBlock: number): Promise<void> {
//     // Placeholder for event handling logic
//     // Similar to block handling, but focusing on the specifics of each event
// }

// Implement additional functions like handleCall, handleLog, and handleRewardEvent as needed
