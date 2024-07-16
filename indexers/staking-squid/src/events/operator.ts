import type { Store } from "@subsquid/typeorm-store";
import { Nominator, Operator } from "../model";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { createOperatorRewardEvent } from "../storage/operator";

export async function processOperatorSlashedEvent(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);
  const operator = await ctx.store.findOneByOrFail(Operator, { operatorId });

  operator.pendingTotalStake = BigInt(0);
  operator.pendingStorageFeeDeposit = BigInt(0);
  operator.currentTotalStake = BigInt(0);
  operator.currentStorageFeeDeposit = BigInt(0);
  operator.status = JSON.stringify({
    slashed: event.args.reason.__kind || "unknown",
  });
  operator.updatedAt = block.header.height;

  await ctx.store.save(operator);

  const nominators = await ctx.store.findBy(Nominator, { operator });
  for (const nominator of nominators) {
    nominator.status = JSON.stringify({
      slashed: event.args.reason.__kind || "unknown",
    });
    nominator.updatedAt = block.header.height;

    await ctx.store.save(nominator);
  }
}

export async function processOperatorRewardedEvent(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);
  const operator = await ctx.store.findOneByOrFail(Operator, { operatorId });

  const opRewardEvent = await createOperatorRewardEvent(ctx, block, {
    operator,
    extrinsicHash: extrinsic.hash,
    amount: BigInt(event.args.reward),
  });

  operator.currentEpochRewards += BigInt(event.args.reward);
  operator.operatorRewards = operator.operatorRewards
    ? [...operator.operatorRewards, opRewardEvent]
    : [opRewardEvent];
  operator.updatedAt = block.header.height;

  await ctx.store.save(operator);
}

export async function processOperatorTaxCollectedEvent(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);
  const operator = await ctx.store.findOneByOrFail(Operator, { operatorId });

  operator.taxCollected = operator.taxCollected + BigInt(event.args.tax);
  operator.updatedAt = block.header.height;

  await ctx.store.save(operator);
}
