import { randomUUID } from "crypto";
import { Withdrawal, WithdrawalStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { getBlockNumber, getTimestamp } from "../utils";
import { Cache } from "../utils/cache";

export const createWithdrawal = (
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  props: Partial<Withdrawal>
): Withdrawal =>
  new Withdrawal({
    id: randomUUID(),
    shares: BigInt(0),
    status: WithdrawalStatus.PENDING,
    ...props,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
    extrinsicHash: extrinsic.hash,
  });
