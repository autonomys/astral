import { Store } from "@subsquid/typeorm-store";
import { Entity } from "@subsquid/typeorm-store/src/store";
import {
  Account,
  Bundle,
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

  bundles: Map<string, Bundle>;
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

  bundles: new Map(),
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

const saveEntry = async <E extends Entity>(
  ctx: Ctx<Store>,
  cache: Cache,
  name: keyof Cache
) => {
  try {
    const entity = cache[name] as unknown as Map<string, E>;
    if (entity.size === 0) return;

    console.log("Saving " + entity.size + " " + name);

    const entries = Array.from(entity.values());

    await ctx.store.save(entries);
  } catch (e) {
    console.error("Failed to save " + name + " with error: " + e);
  }
};

export const save = async (ctx: Ctx<Store>, cache: Cache) => {
  await saveEntry(ctx, cache, "domains");
  await saveEntry(ctx, cache, "accounts");
  await saveEntry(ctx, cache, "operators");
  await saveEntry(ctx, cache, "nominators");
  await saveEntry(ctx, cache, "deposits");
  await saveEntry(ctx, cache, "withdrawals");

  await saveEntry(ctx, cache, "bundles");
  await saveEntry(ctx, cache, "operatorRewardedEvents");

  await saveEntry(ctx, cache, "stats");
  await saveEntry(ctx, cache, "statsPerDomain");
  await saveEntry(ctx, cache, "statsPerOperator");

  // Clear the cache after saving for entry not needed for reference
  cache.deposits.clear();
  cache.withdrawals.clear();

  cache.bundles.clear();
  cache.operatorRewardedEvents.clear();

  cache.stats.clear();
  cache.statsPerDomain.clear();
  cache.statsPerOperator.clear();
};
