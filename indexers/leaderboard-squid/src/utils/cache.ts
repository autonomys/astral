import type { Store } from "@subsquid/typeorm-store";
import { Entity } from "@subsquid/typeorm-store/src/store";
import {
  AccountExtrinsicFailedTotalCount,
  AccountExtrinsicSuccessTotalCount,
  AccountExtrinsicTotalCount,
  AccountRemarkCount,
  AccountTransactionFeePaidTotalValue,
  AccountTransferReceiverTotalCount,
  AccountTransferReceiverTotalValue,
  AccountTransferSenderTotalCount,
  AccountTransferSenderTotalValue,
  FarmerBlockTotalCount,
  FarmerBlockTotalValue,
  FarmerVoteAndBlockTotalCount,
  FarmerVoteAndBlockTotalValue,
  FarmerVoteTotalCount,
  FarmerVoteTotalValue,
  NominatorDepositsTotalCount,
  NominatorDepositsTotalValue,
  NominatorWithdrawalsTotalCount,
  OperatorBundleTotalCount,
  OperatorDepositsTotalCount,
  OperatorDepositsTotalValue,
  OperatorTotalRewardsCollected,
  OperatorTotalTaxCollected,
  OperatorWithdrawalsTotalCount,
} from "../model";
import type { Ctx } from "../processor";

export type CacheEntries = {
  farmerVoteTotalCount: Map<string, FarmerVoteTotalCount>;
  farmerVoteTotalValue: Map<string, FarmerVoteTotalValue>;
  farmerBlockTotalCount: Map<string, FarmerBlockTotalCount>;
  farmerBlockTotalValue: Map<string, FarmerBlockTotalValue>;
  farmerVoteAndBlockTotalCount: Map<string, FarmerVoteAndBlockTotalCount>;
  farmerVoteAndBlockTotalValue: Map<string, FarmerVoteAndBlockTotalValue>;

  operatorTotalRewardsCollected: Map<string, OperatorTotalRewardsCollected>;
  operatorTotalTaxCollected: Map<string, OperatorTotalTaxCollected>;
  operatorBundleTotalCount: Map<string, OperatorBundleTotalCount>;
  operatorDepositsTotalCount: Map<string, OperatorDepositsTotalCount>;
  operatorDepositsTotalValue: Map<string, OperatorDepositsTotalValue>;
  operatorWithdrawalsTotalCount: Map<string, OperatorWithdrawalsTotalCount>;

  nominatorDepositsTotalCount: Map<string, NominatorDepositsTotalCount>;
  nominatorDepositsTotalValue: Map<string, NominatorDepositsTotalValue>;
  nominatorWithdrawalsTotalCount: Map<string, NominatorWithdrawalsTotalCount>;

  accountTransferSenderTotalCount: Map<string, AccountTransferSenderTotalCount>;
  accountTransferSenderTotalValue: Map<string, AccountTransferSenderTotalValue>;
  accountTransferReceiverTotalCount: Map<
    string,
    AccountTransferReceiverTotalCount
  >;
  accountTransferReceiverTotalValue: Map<
    string,
    AccountTransferReceiverTotalValue
  >;
  accountRemarkCount: Map<string, AccountRemarkCount>;

  accountExtrinsicTotalCount: Map<string, AccountExtrinsicTotalCount>;
  accountExtrinsicSuccessTotalCount: Map<
    string,
    AccountExtrinsicSuccessTotalCount
  >;
  accountExtrinsicFailedTotalCount: Map<
    string,
    AccountExtrinsicFailedTotalCount
  >;
  accountTransactionFeePaidTotalValue: Map<
    string,
    AccountTransactionFeePaidTotalValue
  >;
};

export type Cache = CacheEntries & { isModified: boolean };

const farmersKeys = [
  "farmerVoteTotalCount",
  "farmerVoteTotalValue",
  "farmerBlockTotalCount",
  "farmerBlockTotalValue",
  "farmerVoteAndBlockTotalCount",
  "farmerVoteAndBlockTotalValue",
];

const operatorsKeys = [
  "operatorTotalRewardsCollected",
  "operatorTotalTaxCollected",
  "operatorBundleTotalCount",
  "operatorDepositsTotalCount",
  "operatorDepositsTotalValue",
  "operatorWithdrawalsTotalCount",
];

const nominatorsKeys = [
  "nominatorDepositsTotalCount",
  "nominatorDepositsTotalValue",
  "nominatorWithdrawalsTotalCount",
];

const accountsKeys = [
  "accountTransferSenderTotalCount",
  "accountTransferSenderTotalValue",
  "accountTransferReceiverTotalCount",
  "accountTransferReceiverTotalValue",
  "accountRemarkCount",
  "accountExtrinsicTotalCount",
  "accountExtrinsicSuccessTotalCount",
  "accountExtrinsicFailedTotalCount",
  "accountTransactionFeePaidTotalValue",
];

const keys = [
  ...farmersKeys,
  ...operatorsKeys,
  ...nominatorsKeys,
  ...accountsKeys,
];

export const initCache: Cache = {
  isModified: false,
  ...farmersKeys.reduce((acc, key) => ({ ...acc, [key]: new Map() }), {}),
  ...operatorsKeys.reduce((acc, key) => ({ ...acc, [key]: new Map() }), {}),
  ...nominatorsKeys.reduce((acc, key) => ({ ...acc, [key]: new Map() }), {}),
  ...accountsKeys.reduce((acc, key) => ({ ...acc, [key]: new Map() }), {}),
} as Cache;

export const load = async (ctx: Ctx<Store>): Promise<Cache> => {
  const [
    farmerVoteTotalCount,
    farmerVoteTotalValue,
    farmerBlockTotalCount,
    farmerBlockTotalValue,
    farmerVoteAndBlockTotalCount,
    farmerVoteAndBlockTotalValue,
  ] = await Promise.all([
    ctx.store.find(FarmerVoteTotalCount),
    ctx.store.find(FarmerVoteTotalValue),
    ctx.store.find(FarmerBlockTotalCount),
    ctx.store.find(FarmerBlockTotalValue),
    ctx.store.find(FarmerVoteAndBlockTotalCount),
    ctx.store.find(FarmerVoteAndBlockTotalValue),
  ]);

  const [
    operatorTotalRewardsCollected,
    operatorTotalTaxCollected,
    operatorBundleTotalCount,
    operatorDepositsTotalCount,
    operatorDepositsTotalValue,
    operatorWithdrawalsTotalCount,
  ] = await Promise.all([
    ctx.store.find(OperatorTotalRewardsCollected),
    ctx.store.find(OperatorTotalTaxCollected),
    ctx.store.find(OperatorBundleTotalCount),
    ctx.store.find(OperatorDepositsTotalCount),
    ctx.store.find(OperatorDepositsTotalValue),
    ctx.store.find(OperatorWithdrawalsTotalCount),
  ]);

  const [
    nominatorDepositsTotalCount,
    nominatorDepositsTotalValue,
    nominatorWithdrawalsTotalCount,
  ] = await Promise.all([
    ctx.store.find(NominatorDepositsTotalCount),
    ctx.store.find(NominatorDepositsTotalValue),
    ctx.store.find(NominatorWithdrawalsTotalCount),
  ]);

  const [
    accountTransferSenderTotalCount,
    accountTransferSenderTotalValue,
    accountTransferReceiverTotalCount,
    accountTransferReceiverTotalValue,
    accountRemarkCount,
    accountExtrinsicTotalCount,
    accountExtrinsicSuccessTotalCount,
    accountExtrinsicFailedTotalCount,
    accountTransactionFeePaidTotalValue,
  ] = await Promise.all([
    ctx.store.find(AccountTransferSenderTotalCount),
    ctx.store.find(AccountTransferSenderTotalValue),
    ctx.store.find(AccountTransferReceiverTotalCount),
    ctx.store.find(AccountTransferReceiverTotalValue),
    ctx.store.find(AccountRemarkCount),
    ctx.store.find(AccountExtrinsicTotalCount),
    ctx.store.find(AccountExtrinsicSuccessTotalCount),
    ctx.store.find(AccountExtrinsicFailedTotalCount),
    ctx.store.find(AccountTransactionFeePaidTotalValue),
  ]);

  console.log(
    farmerVoteTotalCount.length + " farmerVoteTotalCount, ",
    farmerVoteTotalValue.length + " farmerVoteTotalValue, ",
    farmerBlockTotalCount.length + " farmerBlockTotalCount, ",
    farmerBlockTotalValue.length + " farmerBlockTotalValue, ",
    farmerVoteAndBlockTotalCount.length + " farmerVoteAndBlockTotalCount, ",
    farmerVoteAndBlockTotalValue.length + " farmerVoteAndBlockTotalValue"
  );
  console.log(
    operatorTotalRewardsCollected.length + " operatorTotalRewardsCollected, ",
    operatorTotalTaxCollected.length + " operatorTotalTaxCollected, ",
    operatorBundleTotalCount.length + " operatorBundleTotalCount, ",
    operatorDepositsTotalCount.length + " operatorDepositsTotalCount, ",
    operatorDepositsTotalValue.length + " operatorDepositsTotalValue, ",
    operatorWithdrawalsTotalCount.length + " operatorWithdrawalsTotalCount"
  );
  console.log(
    nominatorDepositsTotalCount.length + " nominatorDepositsTotalCount, ",
    nominatorDepositsTotalValue.length + " nominatorDepositsTotalValue, ",
    nominatorWithdrawalsTotalCount.length + " nominatorWithdrawalsTotalCount"
  );
  console.log(
    accountTransferSenderTotalCount.length +
      " accountTransferSenderTotalCount, ",
    accountTransferSenderTotalValue.length +
      " accountTransferSenderTotalValue, ",
    accountTransferReceiverTotalCount.length +
      " accountTransferReceiverTotalCount, ",
    accountTransferReceiverTotalValue.length +
      " accountTransferReceiverTotalValue, ",
    accountRemarkCount.length + " accountRemarkCount, ",
    accountExtrinsicTotalCount.length + " accountExtrinsicTotalCount, ",
    accountExtrinsicSuccessTotalCount.length +
      " accountExtrinsicSuccessTotalCount, ",
    accountExtrinsicFailedTotalCount.length +
      " accountExtrinsicFailedTotalCount, ",
    accountTransactionFeePaidTotalValue.length +
      " accountTransactionFeePaidTotalValue"
  );

  return {
    ...initCache,
    farmerVoteTotalCount: new Map(
      farmerVoteTotalCount.map((d) => [d.accountId, d])
    ),
    farmerVoteTotalValue: new Map(
      farmerVoteTotalValue.map((a) => [a.accountId, a])
    ),
    farmerBlockTotalCount: new Map(
      farmerBlockTotalCount.map((o) => [o.accountId, o])
    ),
    farmerBlockTotalValue: new Map(
      farmerBlockTotalValue.map((n) => [n.accountId, n])
    ),
    farmerVoteAndBlockTotalCount: new Map(
      farmerVoteAndBlockTotalCount.map((o) => [o.accountId, o])
    ),
    farmerVoteAndBlockTotalValue: new Map(
      farmerVoteAndBlockTotalValue.map((n) => [n.accountId, n])
    ),
    operatorTotalRewardsCollected: new Map(
      operatorTotalRewardsCollected.map((o) => [o.operatorId, o])
    ),
    operatorTotalTaxCollected: new Map(
      operatorTotalTaxCollected.map((n) => [n.operatorId, n])
    ),
    operatorBundleTotalCount: new Map(
      operatorBundleTotalCount.map((n) => [n.operatorId, n])
    ),
    operatorDepositsTotalCount: new Map(
      operatorDepositsTotalCount.map((n) => [n.operatorId, n])
    ),
    operatorDepositsTotalValue: new Map(
      operatorDepositsTotalValue.map((n) => [n.operatorId, n])
    ),
    operatorWithdrawalsTotalCount: new Map(
      operatorWithdrawalsTotalCount.map((n) => [n.operatorId, n])
    ),
    nominatorDepositsTotalCount: new Map(
      nominatorDepositsTotalCount.map((n) => [n.accountId, n])
    ),
    nominatorDepositsTotalValue: new Map(
      nominatorDepositsTotalValue.map((n) => [n.accountId, n])
    ),
    nominatorWithdrawalsTotalCount: new Map(
      nominatorWithdrawalsTotalCount.map((n) => [n.accountId, n])
    ),
    accountTransferSenderTotalCount: new Map(
      accountTransferSenderTotalCount.map((n) => [n.accountId, n])
    ),
    accountTransferSenderTotalValue: new Map(
      accountTransferSenderTotalValue.map((n) => [n.accountId, n])
    ),
    accountTransferReceiverTotalCount: new Map(
      accountTransferReceiverTotalCount.map((n) => [n.accountId, n])
    ),
    accountTransferReceiverTotalValue: new Map(
      accountTransferReceiverTotalValue.map((n) => [n.accountId, n])
    ),
    accountRemarkCount: new Map(
      accountRemarkCount.map((n) => [n.accountId, n])
    ),
    accountExtrinsicTotalCount: new Map(
      accountExtrinsicTotalCount.map((n) => [n.accountId, n])
    ),
    accountExtrinsicSuccessTotalCount: new Map(
      accountExtrinsicSuccessTotalCount.map((n) => [n.accountId, n])
    ),
    accountExtrinsicFailedTotalCount: new Map(
      accountExtrinsicFailedTotalCount.map((n) => [n.accountId, n])
    ),
    accountTransactionFeePaidTotalValue: new Map(
      accountTransactionFeePaidTotalValue.map((n) => [n.accountId, n])
    ),
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

const logEntries = (cache: Cache, keys: string[]) => {
  return keys
    .map((key) =>
      logEntry(key, cache[key as keyof CacheEntries] as Map<string, unknown>)
    )
    .join("");
};

export const save = async (ctx: Ctx<Store>, cache: Cache) => {
  // If the cache is not modified, skip saving
  if (!cache.isModified) return;

  const log = logEntries(cache, keys);

  console.log("\x1b[34mSaving in database:\x1b[0m", log, "\n");

  await Promise.all(
    Object.keys(cache).map((k) =>
      k !== "isModified" ? saveEntry(ctx, cache, k as keyof Cache) : null
    )
  );

  // Clear the cache for entries not needed for reference
  keys.forEach((key) => {
    cache[key as keyof CacheEntries].clear();
  });
};
