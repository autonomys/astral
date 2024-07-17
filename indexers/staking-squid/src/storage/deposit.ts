import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { Deposit, DepositStatus, Operator } from "../model";
import type { Ctx, CtxBlock } from "../processor";
import { getBlockNumber, getTimestamp } from "../utils";
import { getOrCreateAllStats } from "./stats";

export const createDeposit = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  props: Partial<Deposit>
): Promise<Deposit> => {
  const deposit = new Deposit({
    id: randomUUID(),
    account: "st",
    amount: BigInt(0),
    storageFeeDeposit: BigInt(0),
    extrinsicHash: "0x",
    status: DepositStatus.PENDING,
    ...props,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
  });

  await ctx.store.insert(deposit);

  const depositsCount = await ctx.store.count(Deposit);
  ctx.log.child("deposits").info(`count: ${depositsCount}`);

  const [stats, statsPerDomain, statsPerOperator] = await getOrCreateAllStats(
    ctx,
    block,
    props.operator?.domainId,
    props.operator?.operatorId
  );
  stats.totalStaked += deposit.amount;
  stats.totalDeposits += deposit.amount;
  if (stats.totalStaked > stats.allTimeHighStaked)
    stats.allTimeHighStaked = stats.totalStaked;

  statsPerDomain.totalStaked += deposit.amount;
  statsPerDomain.totalDeposits += deposit.amount;
  if (statsPerDomain.totalStaked > statsPerDomain.allTimeHighStaked)
    statsPerDomain.allTimeHighStaked = statsPerDomain.totalStaked;

  statsPerOperator.totalStaked += deposit.amount;
  statsPerOperator.totalDeposits += deposit.amount;
  if (statsPerOperator.totalStaked > statsPerOperator.allTimeHighStaked)
    statsPerOperator.allTimeHighStaked = statsPerOperator.totalStaked;

  await ctx.store.save(stats);
  await ctx.store.save(statsPerDomain);
  await ctx.store.save(statsPerOperator);

  return deposit;
};

export const getOrCreateDeposit = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  operator: Operator,
  account: string
): Promise<Deposit> => {
  const blockNumber = getBlockNumber(block);

  const deposit = await ctx.store.findOneBy(Deposit, {
    blockNumber,
    account,
    operator,
  });

  if (!deposit)
    return await createDeposit(ctx, block, {
      blockNumber,
      account,
      operator,
    });

  return deposit;
};
