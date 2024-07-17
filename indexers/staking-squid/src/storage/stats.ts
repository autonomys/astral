import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import {
  Domain,
  Nominator,
  Operator,
  OperatorStatus,
  Stats,
  StatsPerDomain,
  StatsPerOperator,
} from "../model";
import type { Ctx, CtxBlock } from "../processor";
import { getBlockNumber, getTimestamp } from "../utils";

const emptyStats = {
  blockNumber: 0,
  totalDomains: 0,
  totalOperators: 0,
  totalNominators: 0,
  totalActiveOperators: 0,
  totalSlashedOperators: 0,
  totalStaked: BigInt(0),
  totalFees: BigInt(0),
  totalDeposits: BigInt(0),
  totalWithdrawals: BigInt(0),
  allTimeHighStaked: BigInt(0),
};

export const createStats = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  props: Partial<Stats> = {}
): Promise<Stats> => {
  const totalDomains = await ctx.store.count(Domain);
  const totalOperators = await ctx.store.count(Operator);
  const totalNominators = await ctx.store.count(Nominator);

  const totalActiveOperators = await ctx.store.countBy(Operator, {
    status: OperatorStatus.REGISTERED,
  });
  const totalSlashedOperators = await ctx.store.countBy(Operator, {
    status: OperatorStatus.SLASHED,
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
    timestamp: getTimestamp(block),
  });

  await ctx.store.insert(stats);

  return stats;
};

export const getOrCreateStats = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  props?: Partial<Stats>
): Promise<Stats> => {
  const blockNumber = getBlockNumber(block);

  const stats = await ctx.store.findOneBy(Stats, { blockNumber });

  if (!stats) return await createStats(ctx, block, { ...props, blockNumber });

  return stats;
};

export const createStatsPerDomain = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  props: Partial<StatsPerDomain> = {}
): Promise<StatsPerDomain> => {
  const totalOperators = await ctx.store.count(Operator);
  const totalNominators = await ctx.store.count(Nominator);

  const totalActiveOperators = await ctx.store.countBy(Operator, {
    status: OperatorStatus.REGISTERED,
  });
  const totalSlashedOperators = await ctx.store.countBy(Operator, {
    status: OperatorStatus.SLASHED,
  });

  const statsPerDomain = new StatsPerDomain({
    ...emptyStats,
    ...props,
    id: randomUUID(),
    totalOperators,
    totalNominators,
    totalActiveOperators,
    totalSlashedOperators,
    timestamp: getTimestamp(block),
  });

  await ctx.store.insert(statsPerDomain);

  return statsPerDomain;
};

export const getOrCreateStatsPerDomain = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  domainId: number,
  props?: Partial<StatsPerDomain>
): Promise<StatsPerDomain> => {
  const blockNumber = getBlockNumber(block);

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
  ctx: Ctx<Store>,
  block: CtxBlock,
  props: Partial<StatsPerOperator>
): Promise<StatsPerOperator> => {
  const totalNominators = await ctx.store.count(Nominator);

  const statsPerOperator = new StatsPerOperator({
    ...emptyStats,
    ...props,
    id: randomUUID(),
    totalNominators,
    timestamp: getTimestamp(block),
  });

  await ctx.store.insert(statsPerOperator);

  return statsPerOperator;
};

export const getOrCreateStatsPerOperator = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  operatorId: number,
  props?: Partial<StatsPerOperator>
): Promise<StatsPerOperator> => {
  const blockNumber = getBlockNumber(block);
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
  ctx: Ctx<Store>,
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
  ctx: Ctx<Store>,
  block: CtxBlock,
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
