import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { emptyWithdrawal } from "../assets";
import { Operator, Withdrawal } from "../model";
import type { ProcessorContext } from "../processor";

export const createWithdrawal = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  props: Partial<Withdrawal>
): Promise<Withdrawal> => {
  const withdraw = new Withdrawal({
    ...emptyWithdrawal,
    ...props,
    timestamp: new Date(block.header.timestamp || 0),
    id: randomUUID(),
  });

  await ctx.store.insert(withdraw);

  return withdraw;
};

export const getOrCreateWithdraw = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
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
