import { randomUUID } from "crypto";
import { Deposit, DepositStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { getBlockNumber, getTimestamp } from "../utils";

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
    epochDepositedAt: 0,
    domainBlockNumberDepositedAt: 0,
    stakedAt: 0,
    ...props,
    timestamp: getTimestamp(block),
    extrinsicHash: extrinsic.hash,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });
