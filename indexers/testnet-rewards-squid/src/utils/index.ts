import { DEFAULT_SS58_FORMAT } from "@autonomys/auto-utils";
import { codec } from "@subsquid/ss58";
import type { Store } from "@subsquid/typeorm-store";
import { decodeHex } from "@subsquid/util-internal-hex";
import type { CtxBlock, ProcessorContext } from "../processor";

export const SHARES_CALCULATION_MULTIPLIER = BigInt(1000000000000);

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

export const getBlockNumber = (block: CtxBlock): number => block.header.height;

export const getTimestamp = (block: CtxBlock): Date =>
  new Date(block.header.timestamp ?? 0);

export const logBlock = (blocks: CtxBlock[]): void => {
  const from = getBlockNumber(blocks[0]);
  const to = getBlockNumber(blocks[blocks.length - 1]);
  return console.log(
    "\x1b[33mProcessing " + blocks.length + " blocks\x1b[0m",
    "From " + from,
    "to " + to + " (" + (to - from) + " blocks)"
  );
};
