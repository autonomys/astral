import {
  blake3HashFromCid,
  cidOfNode,
  cidToString,
  decodeNode,
  IPLDNodeData,
  MetadataType,
  PBNode,
} from "@autonomys/auto-dag-data";
import { stringify } from "@autonomys/auto-utils";
import { Bytes } from "@polkadot/types";
import { compactStripLength } from "@polkadot/util";
import { Buffer } from "node:buffer";
import { Cache } from "../types/cache.ts";
import { Event, Extrinsic } from "../types/chain.ts";
import {
  createChunk,
  createCid,
  createFile,
  createFileError,
  createFolder,
  createLeaderboardEntity,
  createMetadata,
} from "../utils/cache.ts";
import { hexToUint8Array } from "../utils/helper.ts";

type ExtrinsicHandler = (params: {
  extrinsicEvents: Event[];
  cache: Cache;
  height: bigint;
  date: Date;
  hash: string;
  extrinsicId: string;
  extrinsicSigner: string;
  extrinsic: Extrinsic;
  extrinsicIdx: number;
}) => void;

const handleRemark: ExtrinsicHandler = ({
  extrinsicEvents,
  cache,
  height,
  date,
  hash,
  extrinsicId,
  extrinsicSigner,
  extrinsic,
  extrinsicIdx,
}) => {
  const eventRemarked = extrinsicEvents.find(
    (e) => e.event.section === "system" && e.event.method === "Remarked"
  );
  const eventRemarkedId = eventRemarked
    ? height + "-" + eventRemarked.event.index.toString()
    : "";
  cache.accountRemarkCountHistory.push(
    createLeaderboardEntity(
      extrinsicSigner,
      BigInt(1),
      height,
      hash,
      extrinsicId,
      eventRemarkedId,
      date
    )
  );

  try {
    const data = (extrinsic.args as any).remark;
    const hexString = data.startsWith("0x") ? data.slice(2) : data;
    const buffer = Buffer.from(hexString, "hex");
    const [length, bytes] = compactStripLength(buffer);
    const isValidLength = length === bytes.length;
    let node: PBNode | null = null;

    try {
      const encoded = isValidLength
        ? Bytes.from(buffer)
        : hexToUint8Array(data);
      node = decodeNode(encoded);
    } catch (error) {
      node = decodeNode(buffer);
    }
    const cidObject = cidOfNode(node);
    const cid = cidToString(cidObject);
    const blake3HashArrayBuffer = blake3HashFromCid(cidObject);
    const blake3Hash = Buffer.from(blake3HashArrayBuffer).toString("hex");
    const links = node.Links.map((l) => cidToString(l.Hash));
    if (cid) {
      cache.cids.push(
        createCid(
          cid,
          height,
          hash,
          extrinsicId,
          extrinsic.hash,
          extrinsicIdx,
          links,
          blake3Hash,
          date
        )
      );

      if (node.Data) {
        const nodeData = IPLDNodeData.decode(node.Data);
        let stringifyData = "";
        try {
          const data = JSON.parse(stringify(nodeData.data)).data;
          if (!data) throw new Error("Data is null");

          const dataAsArrayBuffer = new Uint8Array(data);
          stringifyData = stringify(dataAsArrayBuffer);
        } catch {
          stringifyData = stringify(nodeData.data);
        }
        cache.chunks.push(
          createChunk(
            cid,
            nodeData.type,
            nodeData.linkDepth,
            nodeData.size ?? BigInt(0),
            nodeData.name ?? "",
            stringifyData,
            nodeData.uploadOptions ? stringify(nodeData.uploadOptions) : "",
            height,
            hash,
            extrinsicId
          )
        );

        switch (nodeData.type) {
          case MetadataType.Metadata: {
            const { metadata, relations } = createMetadata(
              cid,
              links,
              nodeData.name ?? "",
              height,
              hash,
              extrinsicId,
              date
            );
            cache.metadata.push(metadata);
            cache.metadataCids.push(...relations);
            break;
          }
          case MetadataType.Folder: {
            const { folder, relations } = createFolder(
              cid,
              links,
              nodeData.name ?? "",
              height,
              hash,
              extrinsicId,
              date
            );
            cache.folders.push(folder);
            cache.folderCids.push(...relations);
            break;
          }
          case MetadataType.File: {
            const { file, relations } = createFile(
              cid,
              links,
              nodeData.name ?? "",
              height,
              hash,
              extrinsicId,
              date
            );
            cache.files.push(file);
            cache.fileCids.push(...relations);
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
            console.warn(`Unknown node type: ${nodeData.type} for cid: ${cid}`);
            break;
        }
      }
    }
  } catch (error: any) {
    console.error("Error decoding remark or seedHistory extrinsic");
    console.error(error);
    cache.filesErrors.push(
      createFileError(
        height,
        hash,
        extrinsicId,
        extrinsic.hash,
        extrinsicIdx,
        stringify(error),
        date
      )
    );
  }
};

export const EXTRINSIC_HANDLERS: Record<string, ExtrinsicHandler> = {
  "system.remark": handleRemark,
  "system.remarkWithEvent": handleRemark,
  "historySeeding.seedHistory": handleRemark,
};
