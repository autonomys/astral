import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { emptyStats } from "../assets";
import { Domain, Nominator, Operator, Stats } from "../model";
import type { ProcessorContext } from "../processor";

export const createStats = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  props: Partial<Stats>
): Promise<Stats> => {
  const totalDomains = await ctx.store.count(Domain);
  const totalOperators = await ctx.store.count(Operator);
  const totalNominators = await ctx.store.count(Nominator);

  const totalActiveOperators = await ctx.store.countBy(Operator, {
    status: JSON.stringify({ registered: null }),
  });
  const totalSlashedOperators = await ctx.store.countBy(Operator, {
    status: JSON.stringify({ slashed: null }),
  });

  const stats = new Stats({
    ...emptyStats,
    ...props,
    id: randomUUID(),
    totalDomains,
    totalOperators,
    totalNominators,
    totalActiveOperators,
    totalSlashedOperators,
  });

  await ctx.store.insert(stats);

  return stats;
};

export const getOrCreateStats = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  domainId: number
): Promise<Stats> => {
  const blockNumber = block.header.height;

  const stats = await ctx.store.findOneBy(Stats, { blockNumber });

  if (!stats) return await createStats(ctx, block, { blockNumber });

  return stats;
};
