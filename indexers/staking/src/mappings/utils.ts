import { EventRecord, stringify } from "@autonomys/auto-utils";
import { createHash } from "crypto";
import { PAD_ZEROS, ZERO_BIGINT } from "./constants";
import { Transfer } from "./types";

export const getSortId = (
  blockHeight: bigint | string,
  indexInBlock?: bigint | string
): string => {
  const str1 = blockHeight.toString().padStart(32, PAD_ZEROS);
  if (indexInBlock === undefined) return str1;
  const str2 = indexInBlock.toString().padStart(32, PAD_ZEROS);
  return str1 + "-" + str2;
};

export const createHashId = (data: any): string =>
  createHash("sha256").update(stringify(data)).digest("hex");

export const calculateTransfer = (transfers: Transfer[]) => {
  if (!Array.isArray(transfers)) return [ZERO_BIGINT, ZERO_BIGINT];
  let total = ZERO_BIGINT;
  const length = transfers.length;
  for (let i = 0; i < length; i++) {
    total += BigInt(transfers[i][1]);
  }
  return [total, BigInt(length)];
};

export const findOneExtrinsicEvent = (
  events: EventRecord[],
  section: string,
  method: string
) => {
  return events.find(
    (e) =>
      e.phase.isApplyExtrinsic &&
      e.event.section === section &&
      e.event.method === method
  );
};
