import { capitalizeFirstLetter } from "@autonomys/auto-utils";
import { PAD_ZEROS, ZERO_BIGINT } from "../structures/constants.ts";
import { Event, Transfer } from "../types/chain.ts";

export const moduleName = (section: string, method: string) =>
  `${capitalizeFirstLetter(section)}.${capitalizeFirstLetter(method)}`;

export const getSortId = (
  blockHeight: bigint | string,
  indexInBlock?: bigint | string
): string => {
  const str1 = blockHeight.toString().padStart(32, PAD_ZEROS);
  if (indexInBlock === undefined) return str1;
  const str2 = indexInBlock.toString().padStart(32, PAD_ZEROS);
  return str1 + "-" + str2;
};

export const getBlockId = (
  blockHeight: bigint | string,
  blockHash?: string
): string => {
  return blockHeight.toString() + "-" + blockHash;
};

export const groupEventsFromBatchAll = (events: Event[]): Event[][] => {
  const result: Event[][] = [];
  let currentGroup: Event[] = [];

  for (const event of events) {
    if (
      event.event.section === "utility" &&
      event.event.method === "ItemCompleted"
    ) {
      if (currentGroup.length > 0) {
        result.push(currentGroup);
        currentGroup = [];
      }
    } else currentGroup.push(event);
  }

  if (currentGroup.length > 0) result.push(currentGroup);

  return result;
};

export const calculateTransfer = (transfers: Transfer) => {
  if (!transfers) return [ZERO_BIGINT, ZERO_BIGINT];
  let total = ZERO_BIGINT;
  const length = Object.keys(transfers).length;
  for (const key in transfers) {
    total += BigInt(transfers[key]);
  }
  return [total, BigInt(length)];
};

export const findOneExtrinsicEvent = (
  events: Event[],
  section: string,
  method: string
) => {
  return events.find(
    (e) =>
      (e.phase as any).applyExtrinsic &&
      e.event.section === section &&
      e.event.method === method
  );
};
