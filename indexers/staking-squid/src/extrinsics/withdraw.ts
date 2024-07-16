import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { Nominator, Withdrawal } from "../model";
import type { ProcessorContext } from "../processor";
import { getOrCreateOperator } from "../storage/operator";
import { events } from "../types";
import { getCallSigner } from "../utils/account";

export async function processWithdrawStake(
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]
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
    const withdrawal = new Withdrawal({
      id: randomUUID(),
      blockNumber: block.header.height,
      account,
      shares: extrinsic.call ? BigInt(extrinsic.call.args.shares) : BigInt(0),
      operator,
      nominator,
      timestamp: new Date(block.header.timestamp || 0),
      extrinsicHash: extrinsic.hash,
      status: JSON.stringify({ pending: null }),
    });

    await ctx.store.insert(withdrawal);

    operator.withdrawals = operator.withdrawals
      ? [...operator.withdrawals, withdrawal]
      : [withdrawal];
    operator.withdrawalsCount++;

    nominator.withdrawals = nominator.withdrawals
      ? [...nominator.withdrawals, withdrawal]
      : [withdrawal];

    await ctx.store.save(operator);
    await ctx.store.save(nominator);
  }
}
