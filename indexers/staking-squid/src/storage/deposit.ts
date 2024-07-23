import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { Deposit, DepositStatus, Operator } from "../model";
import type { Ctx, CtxBlock, CtxExtrinsic } from "../processor";
import { getBlockNumber, getTimestamp } from "../utils";
import { getOrCreateOperator } from "./operator";

export const createDeposit = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  props: Partial<Deposit>
): Promise<Deposit> => {
  if (props.operator) props.operator = await getOrCreateOperator(ctx, block, 0);

  const deposit = new Deposit({
    id: randomUUID(),
    account: "st",
    amount: BigInt(0),
    storageFeeDeposit: BigInt(0),
    status: DepositStatus.PENDING,
    ...props,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
    extrinsicHash: extrinsic.hash,
  });

  await ctx.store.insert(deposit);

  const depositsCount = await ctx.store.count(Deposit);
  ctx.log.child("deposits").info(`count: ${depositsCount}`);

  return deposit;
};

export const getOrCreateDeposit = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  operator: Operator,
  account: string,
  props: Partial<Deposit> = {}
): Promise<Deposit> => {
  const blockNumber = getBlockNumber(block);
  const deposit = await ctx.store.findOneBy(Deposit, { account, blockNumber });

  if (!deposit)
    return await createDeposit(ctx, block, extrinsic, {
      account,
      operator,
      ...props,
    });

  return deposit;
};
