import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { emptyOperator } from "../assets/operator";
import { Operator } from "../model";
import type { ProcessorContext } from "../processor";
import { getOrCreateDomain } from "./domain";

export const createOperator = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  domainId: number,
  operatorId: number
): Promise<Operator> => {
  await getOrCreateDomain(ctx, block, domainId);

  const operator = new Operator({
    ...emptyOperator,
    id: randomUUID(),
    domainId,
    operatorId,
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

  if (!operator) return await createOperator(ctx, block, 0, operatorId);

  return operator;
};
