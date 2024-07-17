import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { Operator, OperatorRewardEvent, OperatorStatus } from "../model";
import type { Ctx, CtxBlock } from "../processor";
import { getBlockNumber, getTimestamp } from "../utils";
import { getOrCreateDomain } from "./domain";
import { getOrCreateAllStats } from "./stats";

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
    operatorOwner: "st",
    minimumNominatorStake: BigInt(0),
    nominationTax: 0,
    taxCollected: BigInt(0),
    pendingTotalStake: BigInt(0),
    pendingStorageFeeDeposit: BigInt(0),
    currentTotalStake: BigInt(0),
    currentStorageFeeDeposit: BigInt(0),
    currentEpochRewards: BigInt(0),
    currentTotalShares: BigInt(0),
    deposits: [],
    nominators: [],
    withdrawals: [],
    operatorRewards: [],
    operatorFees: [],
    status: OperatorStatus.PENDING,
    depositsCount: 0,
    nominatorsCount: 0,
    withdrawalsCount: 0,
    bundleCount: 0,
    lastBundleAt: 0,
    ...props,
    updatedAt: getBlockNumber(block),
  });

  await ctx.store.insert(operator);

  const operatorsCount = await ctx.store.count(Operator);
  ctx.log.child("operators").info(`count: ${operatorsCount}`);

  await getOrCreateAllStats(ctx, block, props.domainId, props.operatorId);

  return operator;
};

export const getOrCreateOperator = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  operatorId: number
): Promise<Operator> => {
  const operator = await ctx.store.findOneBy(Operator, { operatorId });

  if (!operator)
    return await createOperator(ctx, block, {
      domainId: 0,
      operatorId,
    });

  return operator;
};

export const createOperatorRewardEvent = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  props: Partial<OperatorRewardEvent>
): Promise<OperatorRewardEvent> => {
  const operatorRewardEvent = new OperatorRewardEvent({
    id: randomUUID(),
    extrinsicHash: "0x",
    amount: BigInt(0),
    ...props,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
  });

  await ctx.store.insert(operatorRewardEvent);

  const [stats, statsPerDomain, statsPerOperator] = await getOrCreateAllStats(
    ctx,
    block,
    props.operator?.domainId,
    props.operator?.operatorId
  );

  stats.totalFees += props.amount || BigInt(0);
  statsPerDomain.totalFees += props.amount || BigInt(0);
  statsPerOperator.totalFees += props.amount || BigInt(0);

  await ctx.store.save(stats);
  await ctx.store.save(statsPerDomain);
  await ctx.store.save(statsPerOperator);

  return operatorRewardEvent;
};
