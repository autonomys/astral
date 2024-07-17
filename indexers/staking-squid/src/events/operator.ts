import type { Store } from "@subsquid/typeorm-store";
import { Nominator } from "../model";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { createOperatorRewardEvent, getOrCreateOperator } from "../storage";
import { appendOrArray, getBlockNumber } from "../utils";

export async function processOperatorSlashedEvent(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);
  const operator = await getOrCreateOperator(ctx, block, operatorId);

  operator.pendingTotalStake = BigInt(0);
  operator.pendingStorageFeeDeposit = BigInt(0);
  operator.currentTotalStake = BigInt(0);
  operator.currentStorageFeeDeposit = BigInt(0);
  operator.status = JSON.stringify({
    slashed: event.args.reason.__kind || "unknown",
  });
  operator.updatedAt = getBlockNumber(block);

  await ctx.store.save(operator);

  const nominators = await ctx.store.findBy(Nominator, { operator });
  for (const nominator of nominators) {
    nominator.status = JSON.stringify({
      slashed: event.args.reason.__kind || "unknown",
    });
    nominator.updatedAt = getBlockNumber(block);

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
  const operator = await getOrCreateOperator(ctx, block, operatorId);

  const opRewardEvent = await createOperatorRewardEvent(ctx, block, {
    operator,
    extrinsicHash: extrinsic.hash,
    amount: BigInt(event.args.reward),
  });

  operator.currentEpochRewards += BigInt(event.args.reward);
  operator.operatorRewards = appendOrArray(
    operator.operatorRewards,
    opRewardEvent
  );
  operator.updatedAt = getBlockNumber(block);

  await ctx.store.save(operator);
}

export async function processOperatorTaxCollectedEvent(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);
  const operator = await getOrCreateOperator(ctx, block, operatorId);

  operator.taxCollected = operator.taxCollected + BigInt(event.args.tax);
  operator.updatedAt = getBlockNumber(block);

  await ctx.store.save(operator);
}
