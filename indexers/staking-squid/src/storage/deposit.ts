import { randomUUID } from "crypto";
import { Deposit, DepositStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { getBlockNumber, getTimestamp } from "../utils";
import { Cache } from "../utils/cache";

export const createDeposit = (
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  props: Partial<Deposit>
): Deposit =>
  new Deposit({
    id: randomUUID(),
    amount: BigInt(0),
    storageFeeDeposit: BigInt(0),
    status: DepositStatus.PENDING,
    ...props,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
    extrinsicHash: extrinsic.hash,
  });
