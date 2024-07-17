import type { Store } from "@subsquid/typeorm-store";
import { Operator } from "../model";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { createDomain, getOrCreateDomain } from "../storage";
import { getBlockNumber } from "../utils";

export async function processEpochTransitionEvent(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const domainId = Number(event.args.domainId);
  const domain = await getOrCreateDomain(ctx, block, domainId);

  if (!domain)
    await createDomain(ctx, block, {
      domainId,
      completedEpoch: Number(event.args.completedEpochIndex),
    });
  else {
    domain.completedEpoch = Number(event.args.completedEpochIndex);
    domain.updatedAt = getBlockNumber(block);

    await ctx.store.save(domain);
  }

  const operators = await ctx.store.findBy(Operator, { domainId });
  for (const operator of operators) {
    operator.currentEpochRewards = BigInt(0);
    operator.currentTotalStake += operator.pendingTotalStake;
    operator.currentStorageFeeDeposit += operator.pendingStorageFeeDeposit;
    operator.pendingTotalStake = BigInt(0);
    operator.pendingStorageFeeDeposit = BigInt(0);
    operator.updatedAt = getBlockNumber(block);

    await ctx.store.save(operator);
  }
}
