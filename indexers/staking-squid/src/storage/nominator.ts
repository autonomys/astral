import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { Nominator, NominatorStatus, Operator } from "../model";
import type { Ctx, CtxBlock } from "../processor";
import { getBlockNumber } from "../utils";
import { getOrCreateOperator } from "./operator";

export const createNominator = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  props: Partial<Nominator>
): Promise<Nominator> => {
  if (props.operator) props.operator = await getOrCreateOperator(ctx, block, 0);

  const nominator = new Nominator({
    id: randomUUID(),
    account: "st",
    shares: BigInt(0),
    deposits: [],
    withdrawals: [],
    depositsCount: 0,
    withdrawalsCount: 0,
    totalDeposits: BigInt(0),
    status: NominatorStatus.PENDING,
    ...props,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

  await ctx.store.insert(nominator);

  const count = await ctx.store.count(Nominator);
  ctx.log.child("nominators").info(`count: ${count}`);

  return nominator;
};

export const getOrCreateNominator = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  operator: Operator,
  account: string,
  props: Partial<Nominator> = {}
): Promise<Nominator> => {
  const nominator = await ctx.store.findOneBy(Nominator, { account, operator });

  if (!nominator)
    return await createNominator(ctx, block, {
      account,
      operator,
      ...props,
    });

  return nominator;
};
