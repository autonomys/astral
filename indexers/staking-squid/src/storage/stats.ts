import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import {
  Deposit,
  Domain,
  Nominator,
  Operator,
  OperatorStatus,
  Stats,
  StatsPerDomain,
  StatsPerOperator,
  Withdrawal,
} from "../model";
import type { Ctx, CtxBlock } from "../processor";
import { getBlockNumber, getTimestamp } from "../utils";
import { getOrCreateOperator } from "./operator";

export const createStatsPerOperator = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  props: Partial<StatsPerOperator>
): Promise<StatsPerOperator> => {
  const operator = await getOrCreateOperator(ctx, block, props.operatorId || 0);

  const statsPerOperator = new StatsPerOperator({
    id: randomUUID(),
    domainId: operator.domainId,
    operatorId: operator.operatorId,
    totalStaked: operator.currentTotalStake,
    totalFees: BigInt(0),
    totalDeposits: operator.totalDeposits,
    totalWithdrawals: BigInt(0),
    allTimeHighStaked: BigInt(0),
    nominatorsCount: operator.nominatorsCount,
    depositsCount: operator.depositsCount,
    withdrawalsCount: operator.withdrawalsCount,
    ...props,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
  });

  await ctx.store.insert(statsPerOperator);

  return statsPerOperator;
};

export const getOrCreateStatsPerOperator = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  domainId: number,
  operatorId: number,
  props: Partial<StatsPerOperator> = {}
): Promise<StatsPerOperator> => {
  const blockNumber = getBlockNumber(block);
  const statsPerOperator = await ctx.store.findOneBy(StatsPerOperator, {
    domainId,
    operatorId,
    blockNumber,
  });

  if (!statsPerOperator)
    return await createStatsPerOperator(ctx, block, {
      domainId,
      operatorId,
      blockNumber,
      ...props,
    });

  return statsPerOperator;
};

export const createStatsPerDomain = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  props: Partial<StatsPerDomain>
): Promise<StatsPerDomain> => {
  const filter = { domainId: props.domainId || 0 };
  const operators = await ctx.store.findBy(Operator, filter);

  const activeOperatorsCount = operators.filter(
    (operator) => operator.status === OperatorStatus.REGISTERED
  ).length;
  const slashedOperatorsCount = operators.filter(
    (operator) => operator.status === OperatorStatus.SLASHED
  ).length;

  const totalStaked = operators.reduce(
    (total, operator) => total + operator.currentTotalStake,
    BigInt(0)
  );
  const totalDeposits = operators.reduce(
    (total, operator) => total + operator.totalDeposits,
    BigInt(0)
  );

  const statsPerDomain = new StatsPerDomain({
    id: randomUUID(),
    domainId: 0,
    totalStaked,
    totalFees: BigInt(0),
    totalDeposits,
    totalWithdrawals: BigInt(0),
    allTimeHighStaked: BigInt(0),
    operatorsCount: operators.length,
    activeOperatorsCount,
    slashedOperatorsCount,
    nominatorsCount: 0,
    depositsCount: 0,
    withdrawalsCount: 0,
    ...props,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
  });

  await ctx.store.insert(statsPerDomain);

  return statsPerDomain;
};

export const getOrCreateStatsPerDomain = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  domainId: number,
  props: Partial<StatsPerDomain> = {}
): Promise<StatsPerDomain> => {
  const blockNumber = getBlockNumber(block);
  const statsPerDomain = await ctx.store.findOneBy(StatsPerDomain, {
    domainId,
    blockNumber,
  });

  if (!statsPerDomain)
    return await createStatsPerDomain(ctx, block, {
      domainId,
      blockNumber,
      ...props,
    });

  return statsPerDomain;
};

export const createStats = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  props: Partial<Stats>
): Promise<Stats> => {
  const operators = await ctx.store.find(Operator);

  const activeOperatorsCount = operators.filter(
    (operator) => operator.status === OperatorStatus.REGISTERED
  ).length;
  const slashedOperatorsCount = operators.filter(
    (operator) => operator.status === OperatorStatus.SLASHED
  ).length;

  const totalStaked = operators.reduce(
    (total, operator) => total + operator.currentTotalStake,
    BigInt(0)
  );
  const totalDeposits = operators.reduce(
    (total, operator) => total + operator.totalDeposits,
    BigInt(0)
  );

  const stats = new Stats({
    id: randomUUID(),
    totalStaked,
    totalFees: BigInt(0),
    totalDeposits,
    totalWithdrawals: BigInt(0),
    allTimeHighStaked: BigInt(0),
    domainsCount: await ctx.store.count(Domain),
    operatorsCount: operators.length,
    activeOperatorsCount,
    slashedOperatorsCount,
    nominatorsCount: await ctx.store.count(Nominator),
    depositsCount: await ctx.store.count(Deposit),
    withdrawalsCount: await ctx.store.count(Withdrawal),
    ...props,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
  });

  await ctx.store.insert(stats);

  return stats;
};

export const getOrCreateStats = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  props: Partial<Stats> = {}
): Promise<Stats> => {
  const blockNumber = getBlockNumber(block);
  const stats = await ctx.store.findOneBy(Stats, {
    blockNumber,
  });

  if (!stats)
    return await createStats(ctx, block, {
      blockNumber,
      ...props,
    });

  return stats;
};
