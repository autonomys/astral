import { SubstrateBlock } from "@subql/types";

const PIECE_SIZE = BigInt(1048576);
const MAX_PIECES_IN_SECTOR = BigInt(1000);

export const stringify = (value: any) =>
  JSON.stringify(value, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

export const dateEntry = (blockNumber: number | bigint) => ({
  createdAt: blockNumber,
  updatedAt: blockNumber,
});

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

export const solutionRangeToSectors = (solutionRange: bigint): bigint => {
  logger.info(
    `solutionRangeToSectors.solutionRange ${solutionRange.toString()}`
  );
  const MAX_U64 = BigInt(2 ** 64 - 1);
  const SLOT_PROBABILITY = [BigInt(1), BigInt(6)];
  const RECORD_NUM_CHUNKS = BigInt(32768);
  const RECORD_NUM_S_BUCKETS = BigInt(65536);

  const sectors =
    ((MAX_U64 / SLOT_PROBABILITY[1]) * SLOT_PROBABILITY[0]) /
    ((MAX_PIECES_IN_SECTOR * RECORD_NUM_CHUNKS) / RECORD_NUM_S_BUCKETS);

  // Take solution range into account
  return sectors / solutionRange;
};

export const calcSpacePledged = (solutionRange: bigint): bigint =>
  solutionRangeToSectors(solutionRange) * MAX_PIECES_IN_SECTOR * PIECE_SIZE;

export const calcHistorySize = (segmentsCount: number): bigint => {
  const PIECES_IN_SEGMENT = BigInt(256);
  const segmentsCountBigInt = BigInt(segmentsCount);

  return PIECE_SIZE * PIECES_IN_SEGMENT * segmentsCountBigInt;
};

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const moduleId = (section: string, method: string) =>
  `${section}.${method}`;

export const moduleName = (section: string, method: string) =>
  `${capitalizeFirstLetter(section)}.${capitalizeFirstLetter(method)}`;

export const sortId = (blockHeight: bigint, indexInBlock?: bigint): string => {
  const totalLength = 32;
  const str1 = blockHeight.toString().padStart(totalLength, "0");

  if (indexInBlock === undefined) return str1;

  const str2 = indexInBlock.toString().padStart(totalLength, "0");
  return `${str1}-${str2}`;
};
