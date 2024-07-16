import type { Store } from "@subsquid/typeorm-store";
import { Domain, Operator } from "../model";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { createDomain } from "../storage/domain";

export async function processEpochTransitionEvent(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const domainId = Number(event.args.domainId);
  const domain = await ctx.store.findOneBy(Domain, { domainId });

  if (!domain)
    await createDomain(ctx, block, {
      domainId,
      completedEpoch: Number(event.args.completedEpochIndex),
    });
  else {
    domain.completedEpoch = Number(event.args.completedEpochIndex);
    domain.updatedAt = block.header.height;

    await ctx.store.save(domain);
  }

  const operators = await ctx.store.findBy(Operator, { domainId });
  for (const operator of operators) {
    operator.currentEpochRewards = BigInt(0);
    operator.currentTotalStake += operator.pendingTotalStake;
    operator.currentStorageFeeDeposit += operator.pendingStorageFeeDeposit;
    operator.pendingTotalStake = BigInt(0);
    operator.pendingStorageFeeDeposit = BigInt(0);
    operator.updatedAt = block.header.height;

    await ctx.store.save(operator);
  }
}
