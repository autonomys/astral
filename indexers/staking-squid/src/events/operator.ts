import type { Store } from "@subsquid/typeorm-store";
import { Nominator, NominatorStatus, OperatorStatus } from "../model";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { getOrCreateOperator } from "../storage";
import { getBlockNumber } from "../utils";

export async function processOperatorSlashedEvent(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);
  const operator = await getOrCreateOperator(ctx, block, operatorId);

  operator.currentTotalStake = BigInt(0);
  operator.currentStorageFeeDeposit = BigInt(0);
  operator.status = OperatorStatus.SLASHED;
  operator.updatedAt = getBlockNumber(block);

  await ctx.store.save(operator);

  const nominators = await ctx.store.findBy(Nominator, { operator });
  for (const nominator of nominators) {
    nominator.status = NominatorStatus.SLASHED;
    nominator.updatedAt = getBlockNumber(block);

    await ctx.store.save(nominator);
  }
}

export async function processOperatorTaxCollectedEvent(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);
  const operator = await getOrCreateOperator(ctx, block, operatorId);

  operator.totalTaxCollected =
    operator.totalTaxCollected + BigInt(event.args.tax);
  operator.updatedAt = getBlockNumber(block);

  await ctx.store.save(operator);
}
