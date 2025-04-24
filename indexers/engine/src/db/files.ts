import {
  Cache,
  CachedChunk,
  CachedCid,
  CachedFile,
  CachedFileCid,
  CachedFileError,
  CachedFolder,
  CachedFolderCid,
  CachedMetadata,
  CachedMetadataCid,
} from "../types/cache.ts";
import { sql } from "./client.ts";
import { insert } from "./helper.ts";

export const insertCids = async (cids: CachedCid[], sqlClient?: typeof sql) => {
  if (cids.length === 0) return;

  const values = cids.map((cid) => [
    cid.id,
    cid.cid,
    cid.blockId,
    cid.blockHeight.toString(),
    cid.blockHash,
    cid.extrinsicId,
    cid.extrinsicHash,
    cid.indexInBlock,
    cid.links,
    cid.blake3Hash,
    cid.isArchived,
    cid.timestamp,
  ]);
  const columns = [
    "id",
    "cid",
    "block_id",
    "block_height",
    "block_hash",
    "extrinsic_id",
    "extrinsic_hash",
    "index_in_block",
    "links",
    "blake3_hash",
    "is_archived",
    "timestamp",
  ];
  return await insert("files.cids", columns, values, sqlClient);
};

export const insertChunks = async (
  chunks: CachedChunk[],
  sqlClient?: typeof sql
) => {
  if (chunks.length === 0) return;

  const values = chunks.map((chunk) => [
    chunk.id,
    chunk.cid,
    chunk.blockId,
    chunk.blockHeight.toString(),
    chunk.blockHash,
    chunk.type,
    chunk.linkDepth,
    chunk.size.toString(),
    chunk.name,
    chunk.data ?? "",
    chunk.uploadOptions,
  ]);
  const columns = [
    "id",
    "cid",
    "block_id",
    "block_height",
    "block_hash",
    "type",
    "link_depth",
    "size",
    "name",
    "data",
    "upload_options",
  ];
  return await insert("files.chunks", columns, values, sqlClient);
};

export const insertFileCids = async (
  fileCids: CachedFileCid[],
  sqlClient?: typeof sql
) => {
  if (fileCids.length === 0) return;

  const values = fileCids.map((fileCid) => [
    fileCid.id,
    fileCid.blockId,
    fileCid.parentCid,
    fileCid.childCid,
  ]);
  const columns = ["id", "block_id", "parent_cid", "child_cid"];
  return await insert("files.file_cids", columns, values, sqlClient);
};

export const insertFiles = async (
  files: CachedFile[],
  sqlClient?: typeof sql
) => {
  if (files.length === 0) return;

  const values = files.map((file) => [
    file.id,
    file.sortId,
    file.cid,
    file.blockId,
    file.blockHeight.toString(),
    file.blockHash,
    file.extrinsicId,
    file.size.toString(),
    file.name,
  ]);
  const columns = [
    "id",
    "sort_id",
    "cid",
    "block_id",
    "block_height",
    "block_hash",
    "extrinsic_id",
    "size",
    "name",
  ];
  return await insert("files.files", columns, values, sqlClient);
};

export const insertFolderCids = async (
  folderCids: CachedFolderCid[],
  sqlClient?: typeof sql
) => {
  if (folderCids.length === 0) return;

  const values = folderCids.map((folderCid) => [
    folderCid.id,
    folderCid.blockId,
    folderCid.parentCid,
    folderCid.childCid,
  ]);
  const columns = ["id", "block_id", "parent_cid", "child_cid"];
  return await insert("files.folder_cids", columns, values, sqlClient);
};

export const insertFolders = async (
  folders: CachedFolder[],
  sqlClient?: typeof sql
) => {
  if (folders.length === 0) return;

  const values = folders.map((folder) => [
    folder.id,
    folder.sortId,
    folder.cid,
    folder.blockId,
    folder.blockHeight.toString(),
    folder.blockHash,
    folder.extrinsicId,
    folder.size.toString(),
    folder.name,
  ]);
  const columns = [
    "id",
    "sort_id",
    "cid",
    "block_id",
    "block_height",
    "block_hash",
    "extrinsic_id",
    "size",
    "name",
  ];
  return await insert("files.folders", columns, values, sqlClient);
};

export const insertMetadataCids = async (
  metadataCids: CachedMetadataCid[],
  sqlClient?: typeof sql
) => {
  if (metadataCids.length === 0) return;

  const values = metadataCids.map((metadataCid) => [
    metadataCid.id,
    metadataCid.blockId,
    metadataCid.parentCid,
    metadataCid.childCid,
  ]);
  const columns = ["id", "block_id", "parent_cid", "child_cid"];
  return await insert("files.metadata_cids", columns, values, sqlClient);
};

export const insertMetadata = async (
  metadata: CachedMetadata[],
  sqlClient?: typeof sql
) => {
  if (metadata.length === 0) return;

  const values = metadata.map((metadata) => [
    metadata.id,
    metadata.sortId,
    metadata.cid,
    metadata.blockId,
    metadata.blockHeight.toString(),
    metadata.blockHash,
    metadata.extrinsicId,
    metadata.size.toString(),
    metadata.name,
  ]);
  const columns = [
    "id",
    "sort_id",
    "cid",
    "block_id",
    "block_height",
    "block_hash",
    "extrinsic_id",
    "size",
    "name",
  ];
  return await insert("files.metadata", columns, values, sqlClient);
};

export const insertErrors = async (
  errors: CachedFileError[],
  sqlClient?: typeof sql
) => {
  if (errors.length === 0) return;

  const values = errors.map((error) => [
    error.id,
    error.blockId,
    error.blockHeight.toString(),
    error.blockHash,
    error.extrinsicId,
    error.extrinsicHash,
    error.indexInBlock,
    error.error,
    error.timestamp,
  ]);
  const columns = [
    "id",
    "block_id",
    "block_height",
    "block_hash",
    "extrinsic_id",
    "extrinsic_hash",
    "index_in_block",
    "error",
    "timestamp",
  ];
  return await insert("files.errors", columns, values, sqlClient);
};

export const insertCachedFilesData = (cache: Cache, txSql: typeof sql) => {
  const promises = [];

  if (cache.cids.length > 0) promises.push(insertCids(cache.cids, txSql));

  if (cache.chunks.length > 0) promises.push(insertChunks(cache.chunks, txSql));

  if (cache.fileCids.length > 0)
    promises.push(insertFileCids(cache.fileCids, txSql));

  if (cache.files.length > 0) promises.push(insertFiles(cache.files, txSql));

  if (cache.folderCids.length > 0)
    promises.push(insertFolderCids(cache.folderCids, txSql));

  if (cache.folders.length > 0)
    promises.push(insertFolders(cache.folders, txSql));

  if (cache.metadataCids.length > 0)
    promises.push(insertMetadataCids(cache.metadataCids, txSql));

  if (cache.metadata.length > 0)
    promises.push(insertMetadata(cache.metadata, txSql));

  if (cache.filesErrors.length > 0)
    promises.push(insertErrors(cache.filesErrors, txSql));

  if (promises.length === 0) return [];

  return promises;
};
