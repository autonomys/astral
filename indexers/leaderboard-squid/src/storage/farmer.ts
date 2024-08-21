import {
  FarmerBlockTotalCount,
  FarmerBlockTotalValue,
  FarmerVoteAndBlockTotalCount,
  FarmerVoteAndBlockTotalValue,
  FarmerVoteTotalCount,
  FarmerVoteTotalValue,
} from '../model'
import type { CtxBlock } from '../processor'
import { getBlockNumber, getTimestamp } from '../utils'
import { Cache } from '../utils/cache'

export const createFarmerVoteTotalCount = (
  block: CtxBlock,
  accountId: string,
  props: Partial<FarmerVoteTotalCount>,
): FarmerVoteTotalCount =>
  new FarmerVoteTotalCount({
    id: accountId,
    rank: 0,
    value: 0,
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  })

export const getOrCreateFarmerVoteTotalCount = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<FarmerVoteTotalCount> = {},
): FarmerVoteTotalCount => {
  const farmerVoteTotalCount = cache.farmerVoteTotalCount.get(accountId)

  if (!farmerVoteTotalCount) return createFarmerVoteTotalCount(block, accountId, props)

  return farmerVoteTotalCount
}

export const createFarmerVoteTotalValue = (
  block: CtxBlock,
  accountId: string,
  props: Partial<FarmerVoteTotalValue>,
): FarmerVoteTotalValue =>
  new FarmerVoteTotalValue({
    id: accountId,
    rank: 0,
    value: BigInt(0),
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  })

export const getOrCreateFarmerVoteTotalValue = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<FarmerVoteTotalValue> = {},
): FarmerVoteTotalValue => {
  const farmerVoteTotalValue = cache.farmerVoteTotalValue.get(accountId)

  if (!farmerVoteTotalValue) return createFarmerVoteTotalValue(block, accountId, props)

  return farmerVoteTotalValue
}

export const createFarmerBlockTotalCount = (
  block: CtxBlock,
  accountId: string,
  props: Partial<FarmerBlockTotalCount>,
): FarmerBlockTotalCount =>
  new FarmerBlockTotalCount({
    id: accountId,
    rank: 0,
    value: 0,
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  })

export const getOrCreateFarmerBlockTotalCount = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<FarmerBlockTotalCount> = {},
): FarmerBlockTotalCount => {
  const farmerBlockTotalCount = cache.farmerBlockTotalCount.get(accountId)

  if (!farmerBlockTotalCount) return createFarmerBlockTotalCount(block, accountId, props)

  return farmerBlockTotalCount
}

export const createFarmerBlockTotalValue = (
  block: CtxBlock,
  accountId: string,
  props: Partial<FarmerBlockTotalValue>,
): FarmerBlockTotalValue =>
  new FarmerBlockTotalValue({
    id: accountId,
    rank: 0,
    value: BigInt(0),
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  })

export const getOrCreateFarmerBlockTotalValue = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<FarmerBlockTotalValue> = {},
): FarmerBlockTotalValue => {
  const farmerBlockTotalValue = cache.farmerBlockTotalValue.get(accountId)

  if (!farmerBlockTotalValue) return createFarmerBlockTotalValue(block, accountId, props)

  return farmerBlockTotalValue
}

export const createFarmerVoteAndBlockTotalCount = (
  block: CtxBlock,
  accountId: string,
  props: Partial<FarmerVoteAndBlockTotalCount>,
): FarmerVoteAndBlockTotalCount =>
  new FarmerVoteAndBlockTotalCount({
    id: accountId,
    rank: 0,
    value: 0,
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  })

export const getOrCreateFarmerVoteAndBlockTotalCount = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<FarmerVoteAndBlockTotalCount> = {},
): FarmerVoteAndBlockTotalCount => {
  const farmerVoteAndBlockTotalCount = cache.farmerVoteAndBlockTotalCount.get(accountId)

  if (!farmerVoteAndBlockTotalCount)
    return createFarmerVoteAndBlockTotalCount(block, accountId, props)

  return farmerVoteAndBlockTotalCount
}

export const createFarmerVoteAndBlockTotalValue = (
  block: CtxBlock,
  accountId: string,
  props: Partial<FarmerVoteAndBlockTotalValue>,
): FarmerVoteAndBlockTotalValue =>
  new FarmerVoteAndBlockTotalValue({
    id: accountId,
    rank: 0,
    value: BigInt(0),
    ...props,
    lastContributionAt: getTimestamp(block),
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  })

export const getOrCreateFarmerVoteAndBlockTotalValue = (
  cache: Cache,
  block: CtxBlock,
  accountId: string,
  props: Partial<FarmerVoteAndBlockTotalValue> = {},
): FarmerVoteAndBlockTotalValue => {
  const farmerVoteAndBlockTotalValue = cache.farmerVoteAndBlockTotalValue.get(accountId)

  if (!farmerVoteAndBlockTotalValue)
    return createFarmerVoteAndBlockTotalValue(block, accountId, props)

  return farmerVoteAndBlockTotalValue
}
