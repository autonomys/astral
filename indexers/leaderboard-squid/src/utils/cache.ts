import type { Store } from '@subsquid/typeorm-store'
import { Entity } from '@subsquid/typeorm-store/src/store'
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
} from '../model'
import type { Ctx } from '../processor'
import { log } from './index'

export type CacheEntries = {
  farmerVoteTotalCount: Map<string, FarmerVoteTotalCount>
  farmerVoteTotalValue: Map<string, FarmerVoteTotalValue>
  farmerBlockTotalCount: Map<string, FarmerBlockTotalCount>
  farmerBlockTotalValue: Map<string, FarmerBlockTotalValue>
  farmerVoteAndBlockTotalCount: Map<string, FarmerVoteAndBlockTotalCount>
  farmerVoteAndBlockTotalValue: Map<string, FarmerVoteAndBlockTotalValue>

  operatorTotalRewardsCollected: Map<string, OperatorTotalRewardsCollected>
  operatorTotalTaxCollected: Map<string, OperatorTotalTaxCollected>
  operatorBundleTotalCount: Map<string, OperatorBundleTotalCount>
  operatorDepositsTotalCount: Map<string, OperatorDepositsTotalCount>
  operatorDepositsTotalValue: Map<string, OperatorDepositsTotalValue>
  operatorWithdrawalsTotalCount: Map<string, OperatorWithdrawalsTotalCount>

  nominatorDepositsTotalCount: Map<string, NominatorDepositsTotalCount>
  nominatorDepositsTotalValue: Map<string, NominatorDepositsTotalValue>
  nominatorWithdrawalsTotalCount: Map<string, NominatorWithdrawalsTotalCount>

  accountTransferSenderTotalCount: Map<string, AccountTransferSenderTotalCount>
  accountTransferSenderTotalValue: Map<string, AccountTransferSenderTotalValue>
  accountTransferReceiverTotalCount: Map<string, AccountTransferReceiverTotalCount>
  accountTransferReceiverTotalValue: Map<string, AccountTransferReceiverTotalValue>
  accountRemarkCount: Map<string, AccountRemarkCount>

  accountExtrinsicTotalCount: Map<string, AccountExtrinsicTotalCount>
  accountExtrinsicSuccessTotalCount: Map<string, AccountExtrinsicSuccessTotalCount>
  accountExtrinsicFailedTotalCount: Map<string, AccountExtrinsicFailedTotalCount>
  accountTransactionFeePaidTotalValue: Map<string, AccountTransactionFeePaidTotalValue>
}

export type Cache = CacheEntries & { isModified: boolean }

const farmersKeys = [
  'farmerVoteTotalCount',
  'farmerVoteTotalValue',
  'farmerBlockTotalCount',
  'farmerBlockTotalValue',
  'farmerVoteAndBlockTotalCount',
  'farmerVoteAndBlockTotalValue',
]

const operatorsKeys = [
  'operatorTotalRewardsCollected',
  'operatorTotalTaxCollected',
  'operatorBundleTotalCount',
  'operatorDepositsTotalCount',
  'operatorDepositsTotalValue',
  'operatorWithdrawalsTotalCount',
]

const nominatorsKeys = [
  'nominatorDepositsTotalCount',
  'nominatorDepositsTotalValue',
  'nominatorWithdrawalsTotalCount',
]

const accountsKeys = [
  'accountTransferSenderTotalCount',
  'accountTransferSenderTotalValue',
  'accountTransferReceiverTotalCount',
  'accountTransferReceiverTotalValue',
  'accountRemarkCount',
  'accountExtrinsicTotalCount',
  'accountExtrinsicSuccessTotalCount',
  'accountExtrinsicFailedTotalCount',
  'accountTransactionFeePaidTotalValue',
]

const keys = [...farmersKeys, ...operatorsKeys, ...nominatorsKeys, ...accountsKeys]

export const initCache: Cache = {
  isModified: false,
  ...farmersKeys.reduce((acc, key) => ({ ...acc, [key]: new Map() }), {}),
  ...operatorsKeys.reduce((acc, key) => ({ ...acc, [key]: new Map() }), {}),
  ...nominatorsKeys.reduce((acc, key) => ({ ...acc, [key]: new Map() }), {}),
  ...accountsKeys.reduce((acc, key) => ({ ...acc, [key]: new Map() }), {}),
} as Cache

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
  ])

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
  ])

  const [nominatorDepositsTotalCount, nominatorDepositsTotalValue, nominatorWithdrawalsTotalCount] =
    await Promise.all([
      ctx.store.find(NominatorDepositsTotalCount),
      ctx.store.find(NominatorDepositsTotalValue),
      ctx.store.find(NominatorWithdrawalsTotalCount),
    ])

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
  ])

  log(
    '\x1b[32mLoading from database:\x1b[0m',
    (
      farmerVoteTotalCount.length +
      farmerVoteTotalValue.length +
      farmerBlockTotalCount.length +
      farmerBlockTotalValue.length +
      farmerVoteAndBlockTotalCount.length +
      farmerVoteAndBlockTotalValue.length +
      operatorTotalRewardsCollected.length +
      operatorTotalTaxCollected.length +
      operatorBundleTotalCount.length +
      operatorDepositsTotalCount.length +
      operatorDepositsTotalValue.length +
      operatorWithdrawalsTotalCount.length +
      nominatorDepositsTotalCount.length +
      nominatorDepositsTotalValue.length +
      nominatorWithdrawalsTotalCount.length +
      accountTransferSenderTotalCount.length +
      accountTransferSenderTotalValue.length +
      accountTransferReceiverTotalCount.length +
      accountTransferReceiverTotalValue.length +
      accountRemarkCount.length +
      accountExtrinsicTotalCount.length +
      accountExtrinsicSuccessTotalCount.length +
      accountExtrinsicFailedTotalCount.length +
      accountTransactionFeePaidTotalValue.length
    ).toString() + ' entries',
  )

  return {
    ...initCache,
    farmerVoteTotalCount: new Map(farmerVoteTotalCount.map((d) => [d.id, d])),
    farmerVoteTotalValue: new Map(farmerVoteTotalValue.map((a) => [a.id, a])),
    farmerBlockTotalCount: new Map(farmerBlockTotalCount.map((o) => [o.id, o])),
    farmerBlockTotalValue: new Map(farmerBlockTotalValue.map((n) => [n.id, n])),
    farmerVoteAndBlockTotalCount: new Map(farmerVoteAndBlockTotalCount.map((o) => [o.id, o])),
    farmerVoteAndBlockTotalValue: new Map(farmerVoteAndBlockTotalValue.map((n) => [n.id, n])),
    operatorTotalRewardsCollected: new Map(operatorTotalRewardsCollected.map((o) => [o.id, o])),
    operatorTotalTaxCollected: new Map(operatorTotalTaxCollected.map((n) => [n.id, n])),
    operatorBundleTotalCount: new Map(operatorBundleTotalCount.map((n) => [n.id, n])),
    operatorDepositsTotalCount: new Map(operatorDepositsTotalCount.map((n) => [n.id, n])),
    operatorDepositsTotalValue: new Map(operatorDepositsTotalValue.map((n) => [n.id, n])),
    operatorWithdrawalsTotalCount: new Map(operatorWithdrawalsTotalCount.map((n) => [n.id, n])),
    nominatorDepositsTotalCount: new Map(nominatorDepositsTotalCount.map((n) => [n.id, n])),
    nominatorDepositsTotalValue: new Map(nominatorDepositsTotalValue.map((n) => [n.id, n])),
    nominatorWithdrawalsTotalCount: new Map(nominatorWithdrawalsTotalCount.map((n) => [n.id, n])),
    accountTransferSenderTotalCount: new Map(accountTransferSenderTotalCount.map((n) => [n.id, n])),
    accountTransferSenderTotalValue: new Map(accountTransferSenderTotalValue.map((n) => [n.id, n])),
    accountTransferReceiverTotalCount: new Map(
      accountTransferReceiverTotalCount.map((n) => [n.id, n]),
    ),
    accountTransferReceiverTotalValue: new Map(
      accountTransferReceiverTotalValue.map((n) => [n.id, n]),
    ),
    accountRemarkCount: new Map(accountRemarkCount.map((n) => [n.id, n])),
    accountExtrinsicTotalCount: new Map(accountExtrinsicTotalCount.map((n) => [n.id, n])),
    accountExtrinsicSuccessTotalCount: new Map(
      accountExtrinsicSuccessTotalCount.map((n) => [n.id, n]),
    ),
    accountExtrinsicFailedTotalCount: new Map(
      accountExtrinsicFailedTotalCount.map((n) => [n.id, n]),
    ),
    accountTransactionFeePaidTotalValue: new Map(
      accountTransactionFeePaidTotalValue.map((n) => [n.id, n]),
    ),
  }
}

const saveEntry = async <E extends Entity>(ctx: Ctx<Store>, cache: Cache, name: keyof Cache) => {
  try {
    const entity = cache[name] as unknown as Map<string, E>
    if (entity.size === 0) return

    await ctx.store.save(Array.from(entity.values()))
  } catch (e) {
    console.error(`Failed to save ${name} with error:`, e)
  }
}

const logEntry = <K>(name: string, entry: Map<string, K>) => (entry.size > 0 ? entry.size : 0)

const logEntries = (cache: Cache, keys: string[]) => {
  return keys.reduce(
    (acc, key) => logEntry(key, cache[key as keyof CacheEntries] as Map<string, unknown>) + acc,
    0,
  )
}

export const save = async (ctx: Ctx<Store>, cache: Cache) => {
  // If the cache is not modified, skip saving
  if (!cache.isModified) return

  log('\x1b[34mSaving in database:\x1b[0m', logEntries(cache, keys).toString(), 'entries\n')

  await Promise.all(
    Object.keys(cache).map((k) =>
      k !== 'isModified' ? saveEntry(ctx, cache, k as keyof Cache) : null,
    ),
  )

  // Clear the cache for entries not needed for reference
  keys.forEach((key) => {
    cache[key as keyof CacheEntries].clear()
  })
}
