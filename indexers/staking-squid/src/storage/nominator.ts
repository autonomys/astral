import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { emptyNominator } from "../assets";
import { Nominator, Operator } from "../model";
import type { ProcessorContext } from "../processor";

export const createNominator = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  props: Partial<Nominator>
): Promise<Nominator> => {
  const operator = new Nominator({
    ...emptyNominator,
    ...props,
    id: randomUUID(),
    updatedAt: block.header.height,
  });

  await ctx.store.insert(operator);

  return operator;
};

export const getOrCreateNominator = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  operator: Operator,
  account: string
): Promise<Nominator> => {
  const nominator = await ctx.store.findOneBy(Nominator, { account, operator });

  if (!nominator)
    return await createNominator(ctx, block, {
      account,
      operator,
    });

  return nominator;
};
