import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { Operator, Withdrawal, WithdrawalStatus } from "../model";
import type { Ctx, CtxBlock, CtxExtrinsic } from "../processor";
import { getBlockNumber, getCallSigner, getTimestamp } from "../utils";
import { getOrCreateNominator } from "./nominator";
import { getOrCreateOperator } from "./operator";

export const createWithdrawal = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  props: Partial<Withdrawal>
): Promise<Withdrawal> => {
  const account = getCallSigner(extrinsic.call);
  if (props.operator) props.operator = await getOrCreateOperator(ctx, block, 0);
  if (props.nominator && props.operator)
    props.nominator = await getOrCreateNominator(
      ctx,
      block,
      props.operator,
      account
    );

  const withdrawal = new Withdrawal({
    id: randomUUID(),
    account: "st",
    shares: BigInt(0),
    status: WithdrawalStatus.PENDING,
    ...props,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
    extrinsicHash: extrinsic.hash,
  });

  await ctx.store.insert(withdrawal);

  const count = await ctx.store.count(Withdrawal);
  ctx.log.child("withdrawals").info(`count: ${count}`);

  return withdrawal;
};

export const getOrCreateWithdrawal = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  operator: Operator,
  account: string,
  props: Partial<Withdrawal> = {}
): Promise<Withdrawal> => {
  const blockNumber = getBlockNumber(block);
  const withdrawal = await ctx.store.findOneBy(Withdrawal, {
    account,
    blockNumber,
  });

  if (!withdrawal)
    return await createWithdrawal(ctx, block, extrinsic, {
      account,
      operator,
      ...props,
    });

  return withdrawal;
};
