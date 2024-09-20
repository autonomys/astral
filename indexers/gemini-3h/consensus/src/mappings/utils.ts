import {
  SubstrateBlock,
  SubstrateEvent,
  SubstrateExtrinsic,
} from "@subql/types";

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
