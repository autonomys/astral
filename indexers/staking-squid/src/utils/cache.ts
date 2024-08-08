import { Store } from "@subsquid/typeorm-store";
import { Entity } from "@subsquid/typeorm-store/src/store";
import {
  Account,
  Bundle,
  BundleAuthor,
  Deposit,
  Domain,
  Nominator,
  Operator,
  RewardEvent,
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
  bundleAuthors: Map<string, BundleAuthor>;
  operatorRewardedEvents: Map<string, RewardEvent>;
  stats: Map<string, Stats>;
  statsPerDomain: Map<string, StatsPerDomain>;
  statsPerOperator: Map<string, StatsPerOperator>;
};

export type Cache = PermanentCache & TemporaryCache & { isModified: boolean };

export const initCache: Cache = {
  isModified: false,

  domains: new Map(),
  accounts: new Map(),
  operators: new Map(),
  nominators: new Map(),
  deposits: new Map(),
  withdrawals: new Map(),
  bundles: new Map(),
  bundleAuthors: new Map(),
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

  console.log(
    "Loaded in cache:",
    domains.length + " domains",
    accounts.length + " accounts",
    operators.length + " operators",
    nominators.length + " nominators"
  );

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

    await ctx.store.save(Array.from(entity.values()));
  } catch (e) {
    console.error(`Failed to save ${name} with error:`, e);
  }
};

const logEntry = <K>(name: string, entry: Map<string, K>) =>
  entry.size > 0 ? entry.size + " " + name + ", " : "";

export const save = async (ctx: Ctx<Store>, cache: Cache) => {
  // If the cache is not modified, skip saving
  if (!cache.isModified) return;

  let log = logEntry("domains", cache.domains);
  log += logEntry("accounts", cache.accounts);
  log += logEntry("operators", cache.operators);
  log += logEntry("nominators", cache.nominators);

  log += logEntry("deposits", cache.deposits);
  log += logEntry("withdrawals", cache.withdrawals);
  log += logEntry("bundles", cache.bundles);
  log += logEntry("bundleAuthors", cache.bundleAuthors);
  log += logEntry("operatorRewardedEvents", cache.operatorRewardedEvents);
  log += logEntry("stats", cache.stats);
  log += logEntry("statsPerDomain", cache.statsPerDomain);
  log += logEntry("statsPerOperator", cache.statsPerOperator);

  console.log("Saving in database:", log);

  await Promise.all(
    Object.keys(cache).map((k) =>
      k !== "isModified" ? saveEntry(ctx, cache, k as keyof Cache) : null
    )
  );

  // Clear the cache for entries not needed for reference
  cache.deposits.clear();
  cache.withdrawals.clear();
  cache.bundles.clear();
  cache.bundleAuthors.clear();
  cache.operatorRewardedEvents.clear();
  cache.stats.clear();
  cache.statsPerDomain.clear();
  cache.statsPerOperator.clear();
};
