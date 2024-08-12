import { codec } from "@subsquid/ss58";
import type { Store } from "@subsquid/typeorm-store";
import { decodeHex } from "@subsquid/util-internal-hex";
import type { CtxBlock, ProcessorContext } from "../processor";

export const hexToAccount = (hex: string): string =>
  codec(2254).encode(decodeHex(hex));

export const getCallSigner = (
  call: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]["call"]
): string => hexToAccount((call as any).origin.value.value);

export const getExtrinsicSigner = (
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]
): string => hexToAccount((extrinsic as any).signature?.address.value);

export const appendOrArray = <T>(arr: T[] | undefined, item: T): T[] =>
  !arr ? [item] : [...arr, item];

export const getBlockNumber = (block: CtxBlock): number => block.header.height;

export const getTimestamp = (block: CtxBlock): Date =>
  new Date(block.header.timestamp || 0);

export const domainUID = (domainId: number): string => `${domainId}`;

export const operatorUID = (operatorId: number): string => `${operatorId}`;

export const nominatorUID = (operatorId: number, account: string): string =>
  `${operatorId}-${account}`;

export const log = (msg: string, ...extra: string[]): void => {
  const _msg = Array.isArray(extra) ? msg + " " + extra.join(" ") : msg;
  console.log(
    process.env.ENABLE_COLOR_LOG ? _msg : _msg.replace(/\x1b\[\d+m/g, "")
  );
};

export const logBlock = (blocks: CtxBlock[]): void => {
  const from = getBlockNumber(blocks[0]);
  const to = getBlockNumber(blocks[blocks.length - 1]);
  return log(
    "\x1b[33mProcessing:\x1b[0m",
    blocks.length + " blocks",
    "From " + from,
    "to " + to + " (" + (to - from) + " blocks)"
  );
};
