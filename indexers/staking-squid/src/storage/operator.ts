import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { Operator, OperatorStatus } from "../model";
import type { Ctx, CtxBlock } from "../processor";
import { getBlockNumber } from "../utils";
import { getOrCreateDomain } from "./domain";

export const createOperator = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  props: Partial<Operator>
): Promise<Operator> => {
  if (props.domainId) await getOrCreateDomain(ctx, block, props.domainId);

  const operator = new Operator({
    id: randomUUID(),
    operatorId: 0,
    signingKey: "0x",
    owner: "st",
    minimumNominatorStake: BigInt(0),
    nominationTax: 0,
    currentTotalStake: BigInt(0),
    currentStorageFeeDeposit: BigInt(0),
    currentEpochRewards: BigInt(0),
    currentTotalShares: BigInt(0),
    totalDeposits: BigInt(0),
    totalTaxCollected: BigInt(0),
    deposits: [],
    nominators: [],
    withdrawals: [],
    operatorRewards: [],
    operatorFees: [],
    rawStatus: JSON.stringify({}),
    status: OperatorStatus.PENDING,
    nominatorsCount: 0,
    depositsCount: 0,
    withdrawalsCount: 0,
    bundleCount: 0,
    lastBundleAt: 0,
    ...props,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

  await ctx.store.insert(operator);

  const count = await ctx.store.count(Operator);
  ctx.log.child("operators").info(`count: ${count}`);

  return operator;
};

export const getOrCreateOperator = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  operatorId: number,
  props: Partial<Operator> = {}
): Promise<Operator> => {
  const operator = await ctx.store.findOneBy(Operator, { operatorId });

  if (!operator)
    return await createOperator(ctx, block, {
      domainId: 0,
      operatorId,
      ...props,
    });

  return operator;
};
