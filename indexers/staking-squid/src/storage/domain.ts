import { Domain, DomainRuntime } from '../model'
import type { CtxBlock } from '../processor'
import { domainUID, getBlockNumber } from '../utils'
import { Cache } from '../utils/cache'

export const createDomain = (
  block: CtxBlock,
  domainId: number | string,
  props: Partial<Domain>,
): Domain =>
  new Domain({
    id: typeof domainId === 'string' ? domainId : domainUID(domainId),
    sortId: typeof domainId === 'string' ? parseInt(domainId) : domainId,
    accountId: '0x',
    name: '',
    runtimeId: 0,
    runtime: DomainRuntime.EVM,
    runtimeInfo: JSON.stringify({}),
    completedEpoch: 0,
    lastDomainBlockNumber: 0,
    totalDeposits: BigInt(0),
    totalEstimatedWithdrawals: BigInt(0),
    totalWithdrawals: BigInt(0),
    totalTaxCollected: BigInt(0),
    totalRewardsCollected: BigInt(0),
    totalTransfersIn: BigInt(0),
    transfersInCount: 0,
    totalTransfersOut: BigInt(0),
    transfersOutCount: 0,
    totalRejectedTransfersClaimed: BigInt(0),
    rejectedTransfersClaimedCount: 0,
    totalTransfersRejected: BigInt(0),
    transfersRejectedCount: 0,
    totalVolume: BigInt(0),
    totalConsensusStorageFee: BigInt(0),
    totalDomainExecutionFee: BigInt(0),
    totalBurnedBalance: BigInt(0),
    currentTotalStake: BigInt(0),
    currentStorageFeeDeposit: BigInt(0),
    currentTotalShares: BigInt(0),
    currentSharePrice: BigInt(0),
    accumulatedEpochStake: BigInt(0),
    accumulatedEpochStorageFeeDeposit: BigInt(0),
    accumulatedEpochRewards: BigInt(0),
    accumulatedEpochShares: BigInt(0),
    bundleCount: 0,
    lastBundleAt: 0,
    currentEpochDuration: BigInt(0),
    lastEpochDuration: BigInt(0),
    last6EpochsDuration: BigInt(0),
    last144EpochDuration: BigInt(0),
    last1kEpochDuration: BigInt(0),
    ...props,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  })

export const getOrCreateDomain = (
  cache: Cache,
  block: CtxBlock,
  domainId: number | string,
  props: Partial<Domain> = {},
): Domain => {
  const domain = cache.domains.get(typeof domainId === 'string' ? domainId : domainUID(domainId))

  if (!domain) return createDomain(block, domainId, props)

  return domain
}
