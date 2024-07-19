import type { ApiPromise } from "@autonomys/auto-utils";
import type { Store } from "@subsquid/typeorm-store";
import { Operator, OperatorStatus } from "../model";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { createDomain, getOrCreateDomain } from "../storage";
import { getBlockNumber } from "../utils";

export async function processEpochTransitionEvent(
  ctx: Ctx<Store>,
  api: ApiPromise,
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
    operator.updatedAt = getBlockNumber(block);

    if (operator.status === OperatorStatus.PENDING)
      operator.status = OperatorStatus.REGISTERED;

    await ctx.store.save(operator);
  }
}
