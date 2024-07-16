import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { emptyOperator, emptyOperatorRewardEvent } from "../assets";
import { Operator, OperatorRewardEvent } from "../model";
import type { ProcessorContext } from "../processor";
import { getOrCreateDomain } from "./domain";
import { getOrCreateAllStats } from "./stats";

export const createOperator = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  props: Partial<Operator>
): Promise<Operator> => {
  if (props.domainId) await getOrCreateDomain(ctx, block, props.domainId);

  const operator = new Operator({
    ...emptyOperator,
    ...props,
    id: randomUUID(),
    updatedAt: block.header.height,
  });

  await ctx.store.insert(operator);

  const operatorsCount = await ctx.store.count(Operator);
  ctx.log.child("operators").info(`count: ${operatorsCount}`);

  await getOrCreateAllStats(ctx, block, props.domainId, props.operatorId);

  return operator;
};

export const getOrCreateOperator = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  operatorId: number
): Promise<Operator> => {
  const operator = await ctx.store.findOneBy(Operator, { operatorId });

  if (!operator)
    return await createOperator(ctx, block, {
      domainId: 0,
      operatorId,
    });

  return operator;
};

export const createOperatorRewardEvent = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  props: Partial<OperatorRewardEvent>
): Promise<OperatorRewardEvent> => {
  const operatorRewardEvent = new OperatorRewardEvent({
    ...emptyOperatorRewardEvent,
    ...props,
    id: randomUUID(),
    blockNumber: block.header.height,
    timestamp: new Date(block.header.timestamp || 0),
  });

  await ctx.store.insert(operatorRewardEvent);

  const [stats, statsPerDomain, statsPerOperator] = await getOrCreateAllStats(
    ctx,
    block,
    props.operator?.domainId,
    props.operator?.operatorId
  );

  stats.totalFees += props.amount || BigInt(0);
  statsPerDomain.totalFees += props.amount || BigInt(0);
  statsPerOperator.totalFees += props.amount || BigInt(0);

  await ctx.store.save(stats);
  await ctx.store.save(statsPerDomain);
  await ctx.store.save(statsPerOperator);

  return operatorRewardEvent;
};
