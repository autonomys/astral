import {
  Chunk,
  Cid,
  File,
  FileCid,
  Folder,
  FolderCid,
  Metadata,
  MetadataCid,
} from "../types";

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

const prepareRelation = (cid: string, link: string) => ({
  id: `${cid}:${link}`,
  parentCid: cid,
  childCid: link,
});

export async function createAndSaveMetadata(
  cid: string,
  links: string[],
  name?: string
): Promise<Metadata> {
  const metadata = Metadata.create({
    id: cid,
    size: BigInt(0),
    name,
  });
  await metadata.save();
  if (links.length > 0) {
    const relations = links.map((link) =>
      MetadataCid.create(prepareRelation(cid, link))
    );
    await Promise.all(relations.map((relation) => relation.save()));
  }
  return metadata;
}

export async function createAndSaveFolder(
  cid: string,
  links: string[],
  name?: string
): Promise<Folder> {
  const folder = Folder.create({
    id: cid,
    size: BigInt(0),
    name,
  });
  await folder.save();
  if (links.length > 0) {
    const relations = links.map((link) =>
      FolderCid.create(prepareRelation(cid, link))
    );
    await Promise.all(relations.map((relation) => relation.save()));
  }
  return folder;
}

export async function createAndSaveFile(
  cid: string,
  links: string[],
  name?: string
): Promise<File> {
  const file = File.create({
    id: cid,
    size: BigInt(0),
    name,
  });
  await file.save();
  if (links.length > 0) {
    const relations = links.map((link) =>
      FileCid.create(prepareRelation(cid, link))
    );
    await Promise.all(relations.map((relation) => relation.save()));
  }
  return file;
}
