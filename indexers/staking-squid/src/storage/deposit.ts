import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { emptyDeposit } from "../assets";
import { Deposit, Operator } from "../model";
import type { ProcessorContext } from "../processor";

export const createDeposit = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  props: Partial<Deposit>
): Promise<Deposit> => {
  const deposit = new Deposit({
    ...emptyDeposit,
    ...props,
    timestamp: new Date(block.header.timestamp || 0),
    id: randomUUID(),
  });

  await ctx.store.insert(deposit);

  return deposit;
};

export const getOrCreateDeposit = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  operator: Operator,
  account: string
): Promise<Deposit> => {
  const blockNumber = block.header.height;

  const deposit = await ctx.store.findOneBy(Deposit, {
    blockNumber,
    account,
    operator,
  });

  if (!deposit)
    return await createDeposit(ctx, block, {
      blockNumber,
      account,
      operator,
    });

  return deposit;
};
