import { capitalizeFirstLetter } from "@autonomys/auto-utils";
import { SubstrateBlock } from "@subql/types";

export const dateEntry = (blockNumber: number | bigint) => {
  if (typeof blockNumber === "number") {
    blockNumber = BigInt(blockNumber);
  }
  return {
    createdAt: blockNumber,
    updatedAt: blockNumber,
  };
};

export const getBlockNumberFromBlock = (block: SubstrateBlock): number => {
  try {
    return block.block.header.number.toNumber();
  } catch (error) {
    logger.error(`Error getting block number: ${error}`);
    throw error;
  }
};

export const decodeLog = (value: null | Uint8Array | Uint8Array[]) => {
  if (!value) return null;

  if (Array.isArray(value)) {
    return {
      engine: value[0].toString(),
      data: value[1],
    };
  }

  return { data: value };
};

export const moduleName = (section: string, method: string) =>
  `${capitalizeFirstLetter(section)}.${capitalizeFirstLetter(method)}`;

export const getSortId = (
  blockHeight: bigint,
  indexInBlock?: bigint
): string => {
  const totalLength = 32;
  const str1 = blockHeight.toString().padStart(totalLength, "0");

  if (indexInBlock === undefined) return str1;

  const str2 = indexInBlock.toString().padStart(totalLength, "0");
  return `${str1}-${str2}`;
};

export const hexToUint8Array = (hex: string): Uint8Array => {
  if (hex.length % 2 !== 0)
    throw new Error("Hex string must have an even length");
  return new Uint8Array(
    hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );
};
