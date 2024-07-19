import { operators } from "@autonomys/auto-consensus";
import type { ApiPromise } from "@autonomys/auto-utils";
import type { Store } from "@subsquid/typeorm-store";
import { Operator } from "../model";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  createDomain,
  getOrCreateDomain,
  getOrCreateOperator,
} from "../storage";
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

  const allOperators = await operators(api);
  for (const operator of allOperators) {
    const op = await getOrCreateOperator(
      ctx,
      block,
      parseInt(operator.operatorId.toString())
    );
    op.currentEpochRewards = operator.operatorDetails.currentEpochRewards;
    op.currentTotalShares = operator.operatorDetails.currentTotalShares;
    op.currentTotalStake = operator.operatorDetails.currentTotalStake;
    op.currentStorageFeeDeposit =
      operator.operatorDetails.totalStorageFeeDeposit;
    op.rawStatus = JSON.stringify(operator.operatorDetails.status);
    op.updatedAt = getBlockNumber(block);

    await ctx.store.save(op);
  }
}
