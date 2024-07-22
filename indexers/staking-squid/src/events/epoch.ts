import { parseOperator } from "@autonomys/auto-consensus";
import type { ApiDecoration } from "@polkadot/api/types";
import type { Store } from "@subsquid/typeorm-store";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  createDomain,
  getOrCreateDomain,
  getOrCreateOperator,
} from "../storage";
import { getBlockNumber } from "../utils";

export async function processEpochTransitionEvent(
  ctx: Ctx<Store>,
  apiAt: ApiDecoration<"promise">,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const domainId = Number(event.args.domainId);
  const domain = await getOrCreateDomain(ctx, block, domainId);
  const completedEpoch = Number(event.args.completedEpochIndex);

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

  const operatorsAll = await apiAt.query.domains.operators.entries();
  const allOperators = (operatorsAll as unknown as any[]).map((o) =>
    parseOperator(o)
  );
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
  ctx.log
    .child(`DomainId ${domainId} - Current epoch`)
    .info(completedEpoch.toString());
}
