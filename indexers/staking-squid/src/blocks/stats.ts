import type { Store } from "@subsquid/typeorm-store";
import { Domain, Operator } from "../model";
import type { Ctx, CtxBlock } from "../processor";
import {
  getOrCreateStats,
  getOrCreateStatsPerDomain,
  getOrCreateStatsPerOperator,
} from "../storage";

export async function processStatsAtEndOfBlock(
  ctx: Ctx<Store>,
  block: CtxBlock
) {
  await getOrCreateStats(ctx, block);
  const domains = await ctx.store.find(Domain);
  for (let domain of domains) {
    await getOrCreateStatsPerDomain(ctx, block, domain.domainId);

    const operators = await ctx.store.findBy(Operator, {
      domainId: domain.domainId,
    });
    for (let operator of operators) {
      await getOrCreateStatsPerOperator(
        ctx,
        block,
        operator.domainId,
        operator.operatorId
      );
    }
  }
}
