import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { Nominator, Operator, Withdrawal, WithdrawalStatus } from "../model";
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
  if (!props.account) props.account = getCallSigner(extrinsic.call);
  if (!props.operator)
    props.operator = await getOrCreateOperator(ctx, block, 0);
  if (!props.nominator && props.operator)
    props.nominator = await getOrCreateNominator(
      ctx,
      block,
      extrinsic,
      props.operator
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

  return withdrawal;
};

export const getOrCreateWithdrawal = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  operator: Operator,
  nominator: Nominator,
  props: Partial<Withdrawal> = {}
): Promise<Withdrawal> => {
  const account = getCallSigner(extrinsic.call);
  const blockNumber = getBlockNumber(block);
  const withdrawal = await ctx.store.findOneBy(Withdrawal, {
    account,
    blockNumber,
    operator,
    nominator,
  });

  if (!withdrawal)
    return await createWithdrawal(ctx, block, extrinsic, {
      account,
      operator,
      nominator,
      ...props,
    });

  return withdrawal;
};
