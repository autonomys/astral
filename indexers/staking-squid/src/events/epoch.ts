import type { Store } from "@subsquid/typeorm-store";
import { Domain, Operator } from "../model";
import type { ProcessorContext } from "../processor";
import { createDomain } from "../storage/domain";

export async function processEpochTransitionEvent(
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0],
  event: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]["events"][0]
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
    operator.currentTotalStake = operator.pendingTotalStake;
    operator.currentStorageFeeDeposit = operator.currentStorageFeeDeposit;
    operator.updatedAt = block.header.height;

    await ctx.store.save(operator);
  }
}
