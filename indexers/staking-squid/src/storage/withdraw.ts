import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { Operator, Withdrawal } from "../model";
import type { Ctx, CtxBlock } from "../processor";
import { getOrCreateAllStats } from "./stats";

export const createWithdrawal = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  props: Partial<Withdrawal>
): Promise<Withdrawal> => {
  const withdraw = new Withdrawal({
    id: randomUUID(),
    account: "st",
    shares: BigInt(0),
    extrinsicHash: "0x",
    status: JSON.stringify({}),
    ...props,
    blockNumber: block.header.height,
    timestamp: new Date(block.header.timestamp || 0),
  });

  await ctx.store.insert(withdraw);

  const withdrawsCount = await ctx.store.count(Withdrawal);
  ctx.log.child("withdraws").info(`count: ${withdrawsCount}`);

  await getOrCreateAllStats(
    ctx,
    block,
    props.operator?.domainId,
    props.operator?.operatorId
  );

  return withdraw;
};

export const getOrCreateWithdraw = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  operator: Operator,
  account: string
): Promise<Withdrawal> => {
  const blockNumber = block.header.height;

  const withdraw = await ctx.store.findOneBy(Withdrawal, {
    blockNumber,
    account,
    operator,
  });

  if (!withdraw)
    return await createWithdrawal(ctx, block, {
      blockNumber,
      account,
      operator,
    });

  return withdraw;
};
