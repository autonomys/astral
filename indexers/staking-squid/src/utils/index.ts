import { codec } from "@subsquid/ss58";
import type { Store } from "@subsquid/typeorm-store";
import { decodeHex } from "@subsquid/util-internal-hex";
import type { CtxBlock, ProcessorContext } from "../processor";

export const hexToAccount = (hex: string): string =>
  codec(2254).encode(decodeHex(hex));

export const getCallSigner = (
  call: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]["call"]
): string => hexToAccount((call as any).origin.value.value);

export const appendOrArray = <T>(arr: T[] | undefined, item: T): T[] =>
  !arr ? [item] : [...arr, item];

export const getBlockNumber = (block: CtxBlock): number => block.header.height;

export const getTimestamp = (block: CtxBlock): Date =>
  new Date(block.header.timestamp || 0);

export const domainUID = (domainId: number): string => `${domainId}`;

export const operatorUID = (operatorId: number): string => `${operatorId}`;

export const nominatorUID = (operatorId: number, account: string): string =>
  `${operatorId}-${account}`;
