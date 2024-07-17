import type { Store } from "@subsquid/typeorm-store";
import { Nominator } from "../model";
import type { Ctx, CtxBlock, CtxExtrinsic } from "../processor";
import { createWithdrawal, getOrCreateOperator } from "../storage";
import { events } from "../types";
import { appendOrArray, getCallSigner } from "../utils";

export async function processWithdrawStake(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  const account = getCallSigner(extrinsic.call);
  const operatorId = Number(extrinsic.call?.args.operatorId);

  const operator = await getOrCreateOperator(ctx, block, operatorId);
  const nominator = await ctx.store.findOneByOrFail(Nominator, {
    operator,
    account,
  });
  const withdrewStakeEvent = extrinsic.events.find(
    (e) => e.name === events.domains.withdrewStake.name
  );

  if (withdrewStakeEvent) {
    const withdrawal = await createWithdrawal(ctx, block, {
      account,
      shares: extrinsic.call ? BigInt(extrinsic.call.args.shares) : BigInt(0),
      operator,
      nominator,
      extrinsicHash: extrinsic.hash,
      status: JSON.stringify({ pending: null }),
    });

    operator.withdrawals = appendOrArray(operator.withdrawals, withdrawal);
    operator.withdrawalsCount++;

    nominator.withdrawals = appendOrArray(nominator.withdrawals, withdrawal);

    await ctx.store.save(operator);
    await ctx.store.save(nominator);
  }
}
