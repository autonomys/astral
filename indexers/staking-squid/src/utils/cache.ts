import { Store } from "@subsquid/typeorm-store";
import { Entity } from "@subsquid/typeorm-store/src/store";
import {
  Account,
  Bundle,
  BundleAuthor,
  Deposit,
  Domain,
  DomainBlock,
  DomainEpoch,
  Nominator,
  Operator,
  RewardEvent,
  Stats,
  StatsPerAccount,
  StatsPerDomain,
  StatsPerNominator,
  StatsPerOperator,
  Withdrawal,
} from "../model";
import type { Ctx } from "../processor";

export type PermanentCache = {
  domains: Map<string, Domain>;
  accounts: Map<string, Account>;
  operators: Map<string, Operator>;
  nominators: Map<string, Nominator>;
  deposits: Map<string, Deposit>;
  withdrawals: Map<string, Withdrawal>;
  domainEpochs: Map<string, DomainEpoch>;
};

export type TemporaryCache = {
  bundles: Map<string, Bundle>;
  bundleAuthors: Map<string, BundleAuthor>;
  domainBlocks: Map<string, DomainBlock>;
  operatorRewardedEvents: Map<string, RewardEvent>;
  stats: Map<string, Stats>;
  statsPerDomain: Map<string, StatsPerDomain>;
  statsPerOperator: Map<string, StatsPerOperator>;
  statsPerAccount: Map<string, StatsPerAccount>;
  statsPerNominator: Map<string, StatsPerNominator>;
};

export type LastBlockBundleIndexKey =
  `lastBlockBundleIndex:${string}-${string}`;
export type AllTimeHighStakedKey = `allTimeHighStaked:${string}`;
export type AllTimeHighSharePriceKey =
  `allTimeHighSharePrice:${string}:${string}`;
type InternalKeyStore =
  | LastBlockBundleIndexKey
  | AllTimeHighStakedKey
  | AllTimeHighSharePriceKey;

type CacheManager = {
  isModified: boolean;
  internalKeyStore: Map<InternalKeyStore, string>;
};

export type Cache = PermanentCache & TemporaryCache & CacheManager;

export const initPermanentCache: PermanentCache = {
  domains: new Map(),
  accounts: new Map(),
  operators: new Map(),
  nominators: new Map(),
  deposits: new Map(),
  withdrawals: new Map(),
  domainEpochs: new Map(),
};

export const initTemporaryCache: TemporaryCache = {
  bundles: new Map(),
  bundleAuthors: new Map(),
  domainBlocks: new Map(),
  operatorRewardedEvents: new Map(),
  stats: new Map(),
  statsPerDomain: new Map(),
  statsPerOperator: new Map(),
  statsPerAccount: new Map(),
  statsPerNominator: new Map(),
};

export const initCacheManager: CacheManager = {
  isModified: false,
  internalKeyStore: new Map(),
};

export const initCache: Cache = {
  ...initPermanentCache,
  ...initTemporaryCache,
  ...initCacheManager,
};

export const load = async (ctx: Ctx<Store>): Promise<Cache> => {
  const [
    domains,
    accounts,
    operators,
    nominators,
    deposits,
    withdrawals,
    domainEpochs,
  ] = await Promise.all([
    ctx.store.find(Domain),
    ctx.store.find(Account),
    ctx.store.find(Operator),
    ctx.store.find(Nominator),
    ctx.store.find(Deposit),
    ctx.store.find(Withdrawal),
    ctx.store.find(DomainEpoch),
  ]);

  console.log(
    "\x1b[32mLoaded in cache:\x1b[0m",
    domains.length + " domains, ",
    accounts.length + " accounts, ",
    operators.length + " operators, ",
    nominators.length + " nominators, ",
    deposits.length + " deposits, ",
    withdrawals.length + " withdrawals, ",
    domainEpochs.length + " domainEpochs"
  );

  return {
    ...initCache,
    domains: new Map(domains.map((d) => [d.id, d])),
    accounts: new Map(accounts.map((a) => [a.id, a])),
    operators: new Map(operators.map((o) => [o.id, o])),
    nominators: new Map(nominators.map((n) => [n.id, n])),
    deposits: new Map(deposits.map((d) => [d.id, d])),
    withdrawals: new Map(withdrawals.map((w) => [w.id, w])),
    domainEpochs: new Map(domainEpochs.map((de) => [de.id, de])),
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

  let logPerm = logEntry("domains", cache.domains);
  logPerm += logEntry("accounts", cache.accounts);
  logPerm += logEntry("operators", cache.operators);
  logPerm += logEntry("nominators", cache.nominators);
  logPerm += logEntry("deposits", cache.deposits);
  logPerm += logEntry("withdrawals", cache.withdrawals);
  logPerm += logEntry("domainEpochs", cache.domainEpochs);

  let logTemp = logEntry("bundles", cache.bundles);
  logTemp += logEntry("bundleAuthors", cache.bundleAuthors);
  logTemp += logEntry("domainBlocks", cache.domainBlocks);
  logTemp += logEntry("operatorRewardedEvents", cache.operatorRewardedEvents);
  logTemp += logEntry("stats", cache.stats);
  logTemp += logEntry("statsPerDomain", cache.statsPerDomain);
  logTemp += logEntry("statsPerOperator", cache.statsPerOperator);
  logTemp += logEntry("statsPerAccount", cache.statsPerAccount);
  logTemp += logEntry("statsPerNominator", cache.statsPerNominator);

  console.log("\x1b[34mSaving in database:\x1b[0m", logPerm);
  console.log(" and ", logTemp, "\n");

  await Promise.all(
    Object.keys(cache).map((k) =>
      !Object.keys(initCacheManager).includes(k)
        ? saveEntry(ctx, cache, k as keyof Cache)
        : null
    )
  );

  // Clear the cache for entries not needed for reference
  cache.internalKeyStore.clear();
  cache.bundles.clear();
  cache.bundleAuthors.clear();
  cache.operatorRewardedEvents.clear();
  cache.domainBlocks.clear();
  cache.stats.clear();
  cache.statsPerDomain.clear();
  cache.statsPerOperator.clear();
  cache.statsPerAccount.clear();
  cache.statsPerNominator.clear();

  cache.isModified = false;
};
