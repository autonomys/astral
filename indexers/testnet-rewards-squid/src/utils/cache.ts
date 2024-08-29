import { Store } from "@subsquid/typeorm-store";
import { Entity } from "@subsquid/typeorm-store/src/store";
import {
  Account,
  AccountPerCampaign,
  Campaign,
  Reward,
  SlackMessage,
  Verification,
} from "../model";
import type { Ctx } from "../processor";

export type PermanentCache = {
  accounts: Map<string, Account>;
  campaigns: Map<string, Campaign>;
  accountPerCampaigns: Map<string, AccountPerCampaign>;
  slackMessages: Map<string, SlackMessage>;
};

export type TemporaryCache = {
  rewards: Map<string, Reward>;
  verifications: Map<string, Verification>;
};

type InternalKeyStore = string;

type CacheManager = {
  isModified: boolean;
  internalKeyStore: Map<InternalKeyStore, string>;
};

export type Cache = PermanentCache & TemporaryCache & CacheManager;

export const initPermanentCache: PermanentCache = {
  accounts: new Map(),
  campaigns: new Map(),
  accountPerCampaigns: new Map(),
  slackMessages: new Map(),
};

export const initTemporaryCache: TemporaryCache = {
  rewards: new Map(),
  verifications: new Map(),
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
  const [accounts, campaigns, accountPerCampaigns, slackMessages] =
    await Promise.all([
      ctx.store.find(Account),
      ctx.store.find(Campaign),
      ctx.store.find(AccountPerCampaign),
      ctx.store.find(SlackMessage),
    ]);

  console.log(
    "\x1b[32mLoaded in cache:\x1b[0m",
    accounts.length + " accounts, ",
    campaigns.length + " campaigns, ",
    accountPerCampaigns.length + " accountPerCampaigns, ",
    slackMessages.length + " slackMessages, "
  );

  return {
    ...initCache,
    campaigns: new Map(campaigns.map((c) => [c.id, c])),
    accountPerCampaigns: new Map(accountPerCampaigns.map((ac) => [ac.id, ac])),
    slackMessages: new Map(slackMessages.map((sm) => [sm.id, sm])),
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

  let logPerm = logEntry("accounts", cache.accounts);
  logPerm += logEntry("campaigns", cache.campaigns);
  logPerm += logEntry("accountPerCampaigns", cache.accountPerCampaigns);
  logPerm += logEntry("slackMessages", cache.slackMessages);

  let logTemp = logEntry("rewards", cache.rewards);
  logTemp += logEntry("verifications", cache.verifications);

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
  cache.rewards.clear();
  cache.verifications.clear();

  cache.isModified = false;
};
