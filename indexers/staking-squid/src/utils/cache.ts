import type { Store } from "@subsquid/typeorm-store";
import {
  Account,
  Deposit,
  Domain,
  Nominator,
  Operator,
  OperatorRewardEvent,
  Stats,
  StatsPerDomain,
  StatsPerOperator,
  Withdrawal,
} from "../model";
import type { Ctx } from "../processor";

export type Cache = {
  domains: Map<string, Domain>;
  accounts: Map<string, Account>;
  operators: Map<string, Operator>;
  nominators: Map<string, Nominator>;
  deposits: Map<string, Deposit>;
  withdrawals: Map<string, Withdrawal>;

  operatorRewardedEvents: Map<string, OperatorRewardEvent>;

  stats: Map<string, Stats>;
  statsPerDomain: Map<string, StatsPerDomain>;
  statsPerOperator: Map<string, StatsPerOperator>;
};

export const initCache: Cache = {
  domains: new Map(),
  accounts: new Map(),
  operators: new Map(),
  nominators: new Map(),
  deposits: new Map(),
  withdrawals: new Map(),

  operatorRewardedEvents: new Map(),

  stats: new Map(),
  statsPerDomain: new Map(),
  statsPerOperator: new Map(),
};

export const load = async (ctx: Ctx<Store>): Promise<Cache> => {
  const domains = await ctx.store.find(Domain);
  const accounts = await ctx.store.find(Account);
  const operators = await ctx.store.find(Operator);
  const nominators = await ctx.store.find(Nominator);
  const deposits = await ctx.store.find(Deposit);
  const withdrawals = await ctx.store.find(Withdrawal);

  return {
    ...initCache,
    domains: new Map(domains.map((d) => [d.id, d])),
    accounts: new Map(accounts.map((a) => [a.id, a])),
    operators: new Map(operators.map((o) => [o.id, o])),
    nominators: new Map(nominators.map((n) => [n.id, n])),
    deposits: new Map(deposits.map((d) => [d.id, d])),
    withdrawals: new Map(withdrawals.map((w) => [w.id, w])),
  };
};

export const save = async (ctx: Ctx<Store>, cache: Cache) => {
  console.log("Saving " + cache.domains.size + " domains");
  await ctx.store.save(Array.from(cache.domains.values()));
  console.log("Saving " + cache.accounts.size + " accounts");
  await ctx.store.save(Array.from(cache.accounts.values()));
  console.log("Saving " + cache.operators.size + " operators");
  await ctx.store.save(Array.from(cache.operators.values()));
  console.log("Saving " + cache.nominators.size + " nominators");
  await ctx.store.save(Array.from(cache.nominators.values()));
  console.log("Saving " + cache.deposits.size + " deposits");
  await ctx.store.save(Array.from(cache.deposits.values()));
  console.log("Saving " + cache.withdrawals.size + " withdrawals");
  await ctx.store.save(Array.from(cache.withdrawals.values()));

  console.log(
    "Saving " +
      cache.operatorRewardedEvents.size +
      " operatorRewardedEvents events"
  );
  await ctx.store.save(Array.from(cache.operatorRewardedEvents.values()));

  await ctx.store.save(Array.from(cache.stats.values()));
  await ctx.store.save(Array.from(cache.statsPerDomain.values()));
  await ctx.store.save(Array.from(cache.statsPerOperator.values()));
};
