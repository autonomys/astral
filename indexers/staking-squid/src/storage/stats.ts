import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { emptyStats } from "../assets";
import {
  Domain,
  Nominator,
  Operator,
  Stats,
  StatsPerDomain,
  StatsPerOperator,
} from "../model";
import type { ProcessorContext } from "../processor";

export const createStats = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  props: Partial<Stats> = {}
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
    timestamp: new Date(block.header.timestamp || 0),
  });

  await ctx.store.insert(stats);

  return stats;
};

export const getOrCreateStats = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  props?: Partial<Stats>
): Promise<Stats> => {
  const blockNumber = block.header.height;

  const stats = await ctx.store.findOneBy(Stats, { blockNumber });

  if (!stats) return await createStats(ctx, block, { ...props, blockNumber });

  return stats;
};

export const createStatsPerDomain = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  props: Partial<StatsPerDomain> = {}
): Promise<StatsPerDomain> => {
  const totalOperators = await ctx.store.count(Operator);
  const totalNominators = await ctx.store.count(Nominator);

  const totalActiveOperators = await ctx.store.countBy(Operator, {
    status: JSON.stringify({ registered: null }),
  });
  const totalSlashedOperators = await ctx.store.countBy(Operator, {
    status: JSON.stringify({ slashed: null }),
  });

  const statsPerDomain = new StatsPerDomain({
    ...emptyStats,
    ...props,
    id: randomUUID(),
    totalOperators,
    totalNominators,
    totalActiveOperators,
    totalSlashedOperators,
    timestamp: new Date(block.header.timestamp || 0),
  });

  await ctx.store.insert(statsPerDomain);

  return statsPerDomain;
};

export const getOrCreateStatsPerDomain = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  domainId: number,
  props?: Partial<StatsPerDomain>
): Promise<StatsPerDomain> => {
  const blockNumber = block.header.height;

  const statsPerDomain = await ctx.store.findOneBy(StatsPerDomain, {
    domainId,
    blockNumber,
  });

  if (!statsPerDomain)
    return await createStatsPerDomain(ctx, block, {
      ...props,
      domainId,
      blockNumber,
    });

  return statsPerDomain;
};

export const createStatsPerOperator = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  props: Partial<StatsPerOperator>
): Promise<StatsPerOperator> => {
  const totalNominators = await ctx.store.count(Nominator);

  const statsPerOperator = new StatsPerOperator({
    ...emptyStats,
    ...props,
    id: randomUUID(),
    totalNominators,
    timestamp: new Date(block.header.timestamp || 0),
  });

  await ctx.store.insert(statsPerOperator);

  return statsPerOperator;
};

export const getOrCreateStatsPerOperator = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  operatorId: number,
  props?: Partial<StatsPerOperator>
): Promise<StatsPerOperator> => {
  const blockNumber = block.header.height;
  const operator = await ctx.store.findOneBy(Operator, { operatorId });
  const domainId = operator?.domainId;

  const statsPerOperator = await ctx.store.findOneBy(StatsPerOperator, {
    domainId,
    operatorId,
    blockNumber,
  });

  if (!statsPerOperator)
    return await createStatsPerOperator(ctx, block, {
      ...props,
      domainId,
      operatorId,
      blockNumber,
    });

  return statsPerOperator;
};

export const updateAllStats = async (
  ctx: ProcessorContext<Store>,
  stats: Stats,
  statsPerDomain: StatsPerDomain,
  statsPerOperator: StatsPerOperator,
  props: Partial<Stats & StatsPerDomain & StatsPerOperator>
): Promise<[Stats, StatsPerDomain, StatsPerOperator]> => {
  if (props) {
    Object.keys(props).forEach((key) => {
      (stats as any)[key] = (props as any)[key];
      (statsPerDomain as any)[key] = (props as any)[key];
      (statsPerOperator as any)[key] = (props as any)[key];
    });
    await ctx.store.save(stats);
    await ctx.store.save(statsPerDomain);
    await ctx.store.save(statsPerOperator);
  }

  return [stats, statsPerDomain, statsPerOperator];
};

export const getOrCreateAllStats = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  domainId: number = 0,
  operatorId: number = 0,
  props?: Partial<Stats & StatsPerDomain & StatsPerOperator>
): Promise<[Stats, StatsPerDomain, StatsPerOperator]> => {
  const stats = await getOrCreateStats(ctx, block, props);
  const statsPerDomain = await getOrCreateStatsPerDomain(
    ctx,
    block,
    domainId,
    props
  );
  const statsPerOperator = await getOrCreateStatsPerOperator(
    ctx,
    block,
    operatorId,
    props
  );
  if (props)
    await updateAllStats(ctx, stats, statsPerDomain, statsPerOperator, props);

  return [stats, statsPerDomain, statsPerOperator];
};
