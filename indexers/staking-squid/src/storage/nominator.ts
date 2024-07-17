import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { Nominator, Operator } from "../model";
import type { Ctx, CtxBlock } from "../processor";
import { getBlockNumber } from "../utils";
import { getOrCreateAllStats } from "./stats";

export const createNominator = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
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
    updatedAt: getBlockNumber(block),
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
  ctx: Ctx<Store>,
  block: CtxBlock,
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
