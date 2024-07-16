import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { Nominator, Operator } from "../model";
import type { ProcessorContext } from "../processor";
import { getOrCreateAllStats } from "./stats";

export const createNominator = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  props: Partial<Nominator>
): Promise<Nominator> => {
  const nominator = new Nominator({
    id: randomUUID(),
    account: "st",
    shares: BigInt(0),
    deposits: [],
    withdrawals: [],
    status: JSON.stringify({}),
    ...props,
    updatedAt: block.header.height,
  });

  await ctx.store.insert(nominator);

  const nominatorsCount = await ctx.store.count(Nominator);
  ctx.log.child("nominators").info(`count: ${nominatorsCount}`);

  await getOrCreateAllStats(
    ctx,
    block,
    props.operator?.domainId,
    props.operator?.operatorId
  );

  return nominator;
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
