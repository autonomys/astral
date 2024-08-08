import { DEFAULT_SS58_FORMAT } from "@autonomys/auto-utils";
import { codec } from "@subsquid/ss58";
import type { Store } from "@subsquid/typeorm-store";
import { decodeHex } from "@subsquid/util-internal-hex";
import type { CtxBlock, ProcessorContext } from "../processor";

export const hexToAccount = (hex: string): string => {
  try {
    return codec(DEFAULT_SS58_FORMAT).encode(decodeHex(hex));
  } catch (error) {
    console.error("Failed to convert hex to account:", error);
    return "";
  }
};

export const getCallSigner = (
  call: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]["call"]
): string => {
  try {
    return hexToAccount((call as any).origin.value.value);
  } catch (error) {
    console.error("Failed to get call signer:", error);
    return "";
  }
};

export const appendOrArray = <T>(arr: T[] | undefined, item: T): T[] =>
  arr ? [...arr, item] : [item];

export const getBlockNumber = (block: CtxBlock): number => block.header.height;

export const getTimestamp = (block: CtxBlock): Date =>
  new Date(block.header.timestamp ?? 0);

export const domainUID = (domainId: number): string => `${domainId}`;

export const operatorUID = (operatorId: number): string => `${operatorId}`;

export const nominatorUID = (operatorId: number, account: string): string =>
  `${operatorId}-${account}`;

export const bundleUID = (
  domainId: number | string,
  domainBlockHash: string
): string => `${domainId}-${domainBlockHash}`;

export const logBlock = (blocks: CtxBlock[]): void =>
  console.log(
    "Processing " + blocks.length + " blocks",
    "From " + getBlockNumber(blocks[0]),
    "to " + getBlockNumber(blocks[blocks.length - 1])
  );
