import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { emptyOperator, emptyOperatorRewardEvent } from "../assets";
import { Operator, OperatorRewardEvent } from "../model";
import type { ProcessorContext } from "../processor";
import { getOrCreateDomain } from "./domain";

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

  return operatorRewardEvent;
};
