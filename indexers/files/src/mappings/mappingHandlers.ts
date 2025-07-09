global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
global.Buffer = require('buffer/').Buffer;

import {
  blake3HashFromCid,
  cidOfNode,
  cidToString,
  decodeNode,
  IPLDNodeData,
  MetadataType,
  PBNode,
} from '@autonomys/auto-dag-data';
import { stringify } from '@autonomys/auto-utils';
import { Bytes } from '@polkadot/types';
import { compactStripLength } from '@polkadot/util';
import { SubstrateExtrinsic } from '@subql/types';
import {
  createChunk,
  createCid,
  createError,
  createFile,
  createFolder,
  createMetadata,
  initializeCache,
  saveCache,
} from './db';
import { ExtrinsicPrimitive } from './types';
import { hexToUint8Array } from './utils';

export async function handleCall(_call: SubstrateExtrinsic): Promise<void> {
  const {
    idx,
    block: {
      timestamp,
      block: {
        header: { number, hash: _blockHash },
      },
    },
    extrinsic: { method, hash },
    success,
  } = _call;
  // Skip if extrinsic failed
  if (!success) return;

  const height = BigInt(number.toString());
  const blockHash = _blockHash.toString();
  const extrinsicId = `${height}-${idx}`;
  const extrinsicHash = hash.toString();
  const blockTimestamp = timestamp ? timestamp : new Date(0);

  const cache = initializeCache();
  const methodToPrimitive = method.toPrimitive() as ExtrinsicPrimitive;
  try {
    const data = methodToPrimitive.args.remark;
    const hexString = data.startsWith('0x') ? data.slice(2) : data;
    const buffer = Buffer.from(hexString, 'hex');
    const [length, bytes] = compactStripLength(buffer);
    const isValidLength = length === bytes.length;
    let node: PBNode | null = null;

    try {
      const encoded = isValidLength ? Bytes.from(buffer) : hexToUint8Array(data);
      node = decodeNode(encoded);
    } catch {
      node = decodeNode(buffer);
    }
    const cidObject = cidOfNode(node);
    const cid = cidToString(cidObject);
    const blake3HashArrayBuffer = blake3HashFromCid(cidObject);
    const blake3Hash = Buffer.from(blake3HashArrayBuffer).toString('hex');
    const links = node.Links.map((l) => cidToString(l.Hash));
    if (cid) {
      cache.cid.push(
        createCid(
          cid,
          height,
          blockHash,
          extrinsicId,
          extrinsicHash,
          idx,
          links,
          blake3Hash,
          blockTimestamp,
        ),
      );

      if (node.Data) {
        const nodeData = IPLDNodeData.decode(node.Data);
        let stringifyData = '';
        try {
          const data = JSON.parse(stringify(nodeData.data)).data;
          if (!data) throw new Error('Data is null');

          const dataAsArrayBuffer = new Uint8Array(data);
          stringifyData = stringify(dataAsArrayBuffer);
        } catch {
          stringifyData = stringify(nodeData.data);
        }
        cache.chunk.push(
          createChunk(
            cid,
            nodeData.type,
            nodeData.linkDepth,
            nodeData.size,
            nodeData.name,
            stringifyData,
            stringify(nodeData.uploadOptions),
          ),
        );

        switch (nodeData.type) {
          case MetadataType.Metadata: {
            const { metadata, relations } = createMetadata(
              cid,
              links,
              nodeData.name ?? '',
              height,
              extrinsicId,
            );
            cache.metadata.push(metadata);
            cache.metadataCid.push(...relations);
            break;
          }
          case MetadataType.Folder: {
            const { folder, relations } = createFolder(
              cid,
              links,
              nodeData.name ?? '',
              height,
              extrinsicId,
            );
            cache.folder.push(folder);
            cache.folderCid.push(...relations);
            break;
          }
          case MetadataType.File: {
            const { file, relations } = createFile(
              cid,
              links,
              nodeData.name ?? '',
              height,
              extrinsicId,
            );
            cache.file.push(file);
            cache.fileCid.push(...relations);
            break;
          }
          // Skip inlinks and chunks as they are already saved in chunks table
          case MetadataType.FileInlink:
          case MetadataType.FileChunk:
          case MetadataType.FolderInlink:
          case MetadataType.MetadataInlink:
          case MetadataType.MetadataChunk:
            break;
          default:
            logger.warn(`Unknown node type: ${nodeData.type} for cid: ${cid}`);
            break;
        }
      }
    }
  } catch (error: any) {
    logger.error('Error decoding remark or seedHistory extrinsic');
    logger.error(error);
    cache.error.push(
      createError(
        height,
        blockHash,
        extrinsicId,
        extrinsicHash,
        idx,
        stringify(error),
        blockTimestamp,
      ),
    );
  }

  // Save cache
  await saveCache(cache);
}
