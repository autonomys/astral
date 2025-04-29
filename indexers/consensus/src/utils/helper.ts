import type { Operator, Withdrawal } from "@autonomys/auto-consensus";
import {
  cidOfNode,
  cidToString,
  decodeNode,
  PBNode,
} from "@autonomys/auto-dag-data";
import { capitalizeFirstLetter, stringify } from "@autonomys/auto-utils";
import { Bytes } from "@polkadot/types";
import { compactStripLength } from "@polkadot/util";
import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import {
  PAD_ZEROS,
  SHARES_CALCULATION_MULTIPLIER,
  ZERO_BIGINT,
} from "../structures/constants.ts";
import { Cache, CachedOperatorStakingHistory } from "../types/cache.ts";
import { Event, Transfer } from "../types/chain.ts";
import { Cid, ModifiedArgs, ParsedArgs } from "../types/data.ts";

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

export const getNominationId = (
  accountId: string,
  domainId: string,
  operatorId: string
): string => accountId + "-" + domainId + "-" + operatorId;

export const createHashId = (data: any): string =>
  createHash("sha256").update(stringify(data)).digest("hex");

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

export const hexToUint8Array = (hex: string): Uint8Array => {
  if (hex.length % 2 !== 0)
    throw new Error("Hex string must have an even length");
  return new Uint8Array(
    hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );
};

export const parseDataToCid = (data: string): ParsedArgs => {
  let cid: Cid = "";
  let modifiedArgs: ModifiedArgs = undefined;
  let node: PBNode | null = null;
  try {
    const hexString = data.startsWith("0x") ? data.slice(2) : data;
    const buffer = Buffer.from(hexString, "hex");
    try {
      const [length, bytes] = compactStripLength(buffer);
      const isValidLength = length === bytes.length;
      try {
        const encoded = isValidLength
          ? Bytes.from(buffer)
          : hexToUint8Array(data);
        node = decodeNode(encoded);
      } catch (error) {
        node = decodeNode(buffer);
      }
      cid = cidToString(cidOfNode(node));
    } catch (error) {
      const encoded = Bytes.from(buffer);
      const node = decodeNode(encoded);
      cid = cidToString(cidOfNode(node));
    }
    modifiedArgs = stringify({ cid });
  } catch (error) {
    console.error("Error decoding remark or seedHistory extrinsic");
    console.error(error);
  }
  return { cid, modifiedArgs };
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

export const findOperatorFromOperatorsCache = (
  cache: Cache,
  operatorId: string
): CachedOperatorStakingHistory => {
  const opFromCache = cache.operatorStakingHistory.find(
    (o) => o.operatorId === operatorId
  );
  if (!opFromCache) throw new Error("Operator from cache not found");
  return opFromCache;
};

export const findDomainIdFromOperatorsCache = (
  cache: Cache,
  operatorId: string
): string => {
  const opFromCache = cache.operatorStakingHistory.find(
    (o) => o.operatorId === operatorId
  );
  if (!opFromCache) {
    const parentOpFromCache = cache.parentBlockOperators.find(
      (o) => o.operatorId.toString() === operatorId
    );
    if (!parentOpFromCache) throw new Error("Operator from cache not found");
    return parentOpFromCache.operatorDetails.currentDomainId.toString();
  }
  return opFromCache.currentDomainId;
};

export const findEpochFromDomainStakingHistoryCache = (
  cache: Cache,
  domainId: string
): number => {
  const domainFromCache = cache.domainStakingHistory.find(
    (o) => o.domainId === domainId
  );
  if (!domainFromCache) throw new Error("Domain from cache not found");
  return domainFromCache.currentEpochIndex;
};

export const findWithdrawalFromWithdrawalCache = (
  cache: Cache,
  operatorId: string,
  accountId: string
): Withdrawal["withdrawalInShares"] => {
  const withdrawal = cache.currentWithdrawal.find(
    (w) => w.operatorId.toString() === operatorId && w.account === accountId
  );
  if (!withdrawal) throw new Error("Withdrawal not found");
  return withdrawal.withdrawalInShares;
};

export const aggregateByDomainId = (
  operators: Operator[],
  targetDomainId: bigint
) => {
  const filteredOperators = operators.filter(
    (operator) => operator.operatorDetails.currentDomainId === targetDomainId
  );

  let totalStakeSum = BigInt(0);
  let totalSharesSum = BigInt(0);

  for (const operator of filteredOperators) {
    totalStakeSum += operator.operatorDetails.currentTotalStake;
    totalSharesSum += operator.operatorDetails.currentTotalShares;
  }

  return {
    domainId: targetDomainId,
    totalStake: totalStakeSum,
    totalShares: totalSharesSum,
  };
};

export const calculateShares = (stakeAmount: bigint, sharePrice: bigint) => {
  return (
    (stakeAmount * SHARES_CALCULATION_MULTIPLIER) /
    (sharePrice > ZERO_BIGINT ? sharePrice : SHARES_CALCULATION_MULTIPLIER)
  );
};
