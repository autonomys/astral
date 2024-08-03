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

export type PermanentCache = {
  domains: Map<string, Domain>;
  accounts: Map<string, Account>;
  operators: Map<string, Operator>;
  nominators: Map<string, Nominator>;
};

export type TemporaryCache = {
  deposits: Map<string, Deposit>;
  withdrawals: Map<string, Withdrawal>;
  bundles: Map<string, Bundle>;
  operatorRewardedEvents: Map<string, OperatorRewardEvent>;
  stats: Map<string, Stats>;
  statsPerDomain: Map<string, StatsPerDomain>;
  statsPerOperator: Map<string, StatsPerOperator>;
};

export type Cache = PermanentCache & TemporaryCache;

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
  const [domains, accounts, operators, nominators] = await Promise.all([
    ctx.store.find(Domain),
    ctx.store.find(Account),
    ctx.store.find(Operator),
    ctx.store.find(Nominator),
  ]);

  return {
    ...initCache,
    domains: new Map(domains.map((d) => [d.id, d])),
    accounts: new Map(accounts.map((a) => [a.id, a])),
    operators: new Map(operators.map((o) => [o.id, o])),
    nominators: new Map(nominators.map((n) => [n.id, n])),
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

    console.log(`Saving ${entity.size} ${name} entries to the database.`);

    await ctx.store.save(Array.from(entity.values()));
  } catch (e) {
    console.error(`Failed to save ${name} with error:`, e);
  }
};

export const save = async (ctx: Ctx<Store>, cache: Cache) => {
  await Promise.all(
    Object.keys(cache).map((k) => saveEntry(ctx, cache, k as keyof Cache))
  );

  // Clear the cache for entries not needed for reference
  cache.deposits.clear();
  cache.withdrawals.clear();
  cache.bundles.clear();
  cache.operatorRewardedEvents.clear();
  cache.stats.clear();
  cache.statsPerDomain.clear();
  cache.statsPerOperator.clear();
};
