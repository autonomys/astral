import type { Store } from "@subsquid/typeorm-store";
import {
  Account,
  Deposit,
  Domain,
  Nominator,
  Operator,
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

export const save = async (ctx: Ctx<Store>, cache: Cache) =>
  Object.keys(cache).forEach(
    async (key) => await ctx.store.save([...cache[key as keyof Cache].values()])
  );