import {
  Chunk,
  Cid,
  Error,
  File,
  FileCid,
  Folder,
  FolderCid,
  Metadata,
  MetadataCid,
} from "../types";
import { getSortId } from "./utils";

export type Cache = {
  cid: Cid[];
  chunk: Chunk[];
  folder: Folder[];
  file: File[];
  error: Error[];
  metadata: Metadata[];
  metadataCid: MetadataCid[];
  folderCid: FolderCid[];
  fileCid: FileCid[];
};

export const initializeCache = (): Cache => ({
  cid: [],
  chunk: [],
  folder: [],
  file: [],
  error: [],
  metadata: [],
  metadataCid: [],
  folderCid: [],
  fileCid: [],
});

export const saveCache = async (cache: Cache) => {
  await Promise.all([
    store.bulkCreate(`Cid`, cache.cid),
    store.bulkCreate(`Chunk`, cache.chunk),
    store.bulkCreate(`Folder`, cache.folder),
    store.bulkCreate(`File`, cache.file),
    store.bulkCreate(`Error`, cache.error),
    store.bulkCreate(`Metadata`, cache.metadata),
    store.bulkCreate(`MetadataCid`, cache.metadataCid),
    store.bulkCreate(`FolderCid`, cache.folderCid),
    store.bulkCreate(`FileCid`, cache.fileCid),
  ]);
};

export function createCid(
  cid: string,
  blockHeight: bigint,
  blockHash: string,
  extrinsicId: string,
  extrinsicHash: string,
  indexInBlock: number,
  links: string[],
  blake3Hash: string,
  timestamp: Date
): Cid {
  return Cid.create({
    id: cid,
    blockHeight,
    blockHash,
    extrinsicId,
    extrinsicHash,
    indexInBlock,
    links,
    blake3Hash,
    isArchived: false,
    timestamp,
  });
}

export function createChunk(
  cid: string,
  type: string,
  linkDepth: number,
  size?: bigint,
  name?: string,
  data?: string,
  uploadOptions?: string
): Chunk {
  return Chunk.create({
    id: cid,
    type,
    linkDepth,
    size,
    name,
    data,
    uploadOptions,
  });
}

const prepareRelation = (cid: string, link: string) => ({
  id: cid + ":" + link,
  parentCid: cid,
  childCid: link,
});

export function createMetadata(
  cid: string,
  links: string[],
  name: string,
  blockHeight: bigint,
  extrinsicId: string
): { metadata: Metadata; relations: MetadataCid[] } {
  const metadata = Metadata.create({
    id: cid,
    sortId: getSortId(blockHeight, extrinsicId),
    size: BigInt(0),
    name,
    blockHeight,
    extrinsicId,
  });
  if (links.length > 0)
    return {
      metadata,
      relations: links.map((link) =>
        MetadataCid.create(prepareRelation(cid, link))
      ),
    };
  return { metadata, relations: [] };
}

export function createFolder(
  cid: string,
  links: string[],
  name: string,
  blockHeight: bigint,
  extrinsicId: string
): { folder: Folder; relations: FolderCid[] } {
  const folder = Folder.create({
    id: cid,
    sortId: getSortId(blockHeight, extrinsicId),
    size: BigInt(0),
    name,
    blockHeight,
    extrinsicId,
  });
  if (links.length > 0)
    return {
      folder,
      relations: links.map((link) =>
        FolderCid.create(prepareRelation(cid, link))
      ),
    };
  return { folder, relations: [] };
}

export function createFile(
  cid: string,
  links: string[],
  name: string,
  blockHeight: bigint,
  extrinsicId: string
): { file: File; relations: FileCid[] } {
  const file = File.create({
    id: cid,
    sortId: getSortId(blockHeight, extrinsicId),
    size: BigInt(0),
    name,
    blockHeight,
    extrinsicId,
  });
  if (links.length > 0)
    return {
      file,
      relations: links.map((link) =>
        FileCid.create(prepareRelation(cid, link))
      ),
    };
  return { file, relations: [] };
}

export function createError(
  blockHeight: bigint,
  blockHash: string,
  extrinsicId: string,
  extrinsicHash: string,
  indexInBlock: number,
  error: string,
  timestamp: Date
): Error {
  return Error.create({
    id: extrinsicId,
    blockHeight,
    blockHash,
    extrinsicId,
    extrinsicHash,
    indexInBlock,
    error,
    timestamp,
  });
}
