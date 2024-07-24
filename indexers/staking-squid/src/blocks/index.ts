import type { ApiPromise } from "@autonomys/auto-utils";
import type { ApiDecoration } from "@polkadot/api/types";
import type { Store } from "@subsquid/typeorm-store";
import { processExtrinsics } from "../extrinsics";
import { Domain, Operator } from "../model";
import type { Ctx, CtxBlock } from "../processor";
import {
  getOrCreateStats,
  getOrCreateStatsPerDomain,
  getOrCreateStatsPerOperator,
} from "../storage";
import { getBlockNumber } from "../utils";

export async function processBlocks(ctx: Ctx<Store>, api: ApiPromise) {
  for (let block of ctx.blocks) {
    const apiAt = await api.at(block.header.hash);
    await processBlock(ctx, apiAt, block);
  }
}

async function processBlock(
  ctx: Ctx<Store>,
  apiAt: ApiDecoration<"promise">,
  block: CtxBlock
) {
  await processExtrinsics(ctx, apiAt, block, block.extrinsics);
  await getOrCreateStats(ctx, block);
  const domains = await ctx.store.find(Domain);
  for (let domain of domains) {
    await getOrCreateStatsPerDomain(ctx, block, domain.domainId);
  }
  const operators = await ctx.store.find(Operator);
  for (let operator of operators) {
    await getOrCreateStatsPerOperator(
      ctx,
      block,
      operator.domainId,
      operator.operatorId
    );
  }
  ctx.log.child(`Last block`).info(getBlockNumber(block).toString());
}
