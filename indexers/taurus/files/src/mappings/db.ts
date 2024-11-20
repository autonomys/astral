import { Chunk, Cid, File } from "../types";

export async function createAndSaveCid(
  cid: string,
  blockHeight: bigint,
  blockHash: string,
  extrinsicId: string,
  extrinsicHash: string,
  indexInBlock: number,
  links: string[],
  timestamp: Date
): Promise<Cid> {
  const _cid = Cid.create({
    id: cid,
    blockHeight,
    blockHash,
    extrinsicId,
    extrinsicHash,
    indexInBlock,
    links,
    timestamp,
  });
  await _cid.save();
  return _cid;
}

export async function createAndSaveChunk(
  cid: string,
  type: string,
  linkDepth: number,
  size?: bigint,
  name?: string,
  data?: string,
  uploadOptions?: string
): Promise<Chunk> {
  const chunk = Chunk.create({
    id: cid,
    type,
    linkDepth,
    size,
    name,
    data,
    uploadOptions,
  });
  await chunk.save();
  return chunk;
}

export async function createAndSaveFile(
  cid: string,
  links: string[],
  size: bigint,
  name?: string
): Promise<File> {
  const file = File.create({
    id: cid,
    links,
    size,
    name,
  });
  await file.save();
  return file;
}
