import type { ApiDecoration } from "@polkadot/api/types";
import type { Store } from "@subsquid/typeorm-store";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  getOrCreateDomain,
  getOrCreateNominator,
  getOrCreateOperator,
  getOrCreateWithdrawal,
} from "../storage";
import { appendOrArray, getBlockNumber } from "../utils";

export async function processWithdrewStakeEvent(
  ctx: Ctx<Store>,
  apiAt: ApiDecoration<"promise">,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);
  const shares = extrinsic.call?.args.shares.toBigInt();

  const operator = await getOrCreateOperator(ctx, block, operatorId);
  const nominator = await getOrCreateNominator(ctx, block, extrinsic, operator);
  const withdrawal = await getOrCreateWithdrawal(
    ctx,
    block,
    extrinsic,
    operator,
    nominator,
    { shares }
  );

  const operatorWithdrawals = appendOrArray(operator.withdrawals, withdrawal);
  operator.withdrawals = operatorWithdrawals;
  operator.withdrawalsCount = operatorWithdrawals.length;

  operator.updatedAt = getBlockNumber(block);

  await ctx.store.save(operator);

  const nominatorWithdrawals = appendOrArray(nominator.withdrawals, withdrawal);
  nominator.withdrawals = nominatorWithdrawals;
  nominator.withdrawalsCount = nominatorWithdrawals.length;

  nominator.updatedAt = getBlockNumber(block);

  await ctx.store.save(nominator);
}
