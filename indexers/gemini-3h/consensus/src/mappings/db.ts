import { Block } from "../types";

export async function checkAndGetBlock(
  hash: string,
  height: bigint,
  timestamp: Date,
  parentHash: string,
  specId: string,
  stateRoot: string,
  extrinsicsRoot: string,
  spacePledged: bigint,
  blockchainSize: bigint,
  extrinsicsCount: number,
  eventsCount: number,
  authorId: string
): Promise<Block> {
  const blocks = await Block.getByHash(hash);
  let block = blocks ? blocks[0] : undefined;
  if (!block) {
    block = Block.create({
      id: hash,
      height,
      timestamp,
      hash,
      parentHash,
      specId,
      stateRoot,
      extrinsicsRoot,
      spacePledged,
      blockchainSize,
      extrinsicsCount,
      eventsCount,
      authorId,
    });
    await block.save();
  }
  return block;
}
