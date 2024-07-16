import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { emptyNominator } from "../assets/nominator";
import { Domain, Operator } from "../model";
import type { ProcessorContext } from "../processor";

export async function processEpochTransitionEvent(
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0],
  event: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]["events"][0]
) {
  const domainId = Number(event.args.domainId);
  const domain = await ctx.store.findOneBy(Domain, { domainId });

  if (!domain) {
    const newDomain = new Domain({
      ...emptyNominator,
      id: randomUUID(),
      domainId,
      completedEpoch: Number(event.args.completedEpochIndex),
      updatedAt: block.header.height,
    });

    await ctx.store.insert(newDomain);
  } else {
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
