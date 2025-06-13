'use client'

import { useApolloClient } from '@apollo/client'
import { capitalizeFirstLetter } from '@autonomys/auto-utils'
import { SortedTable } from 'components/common/SortedTable'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { DomainsListDocument, DomainsListQuery, DomainsListQueryVariables } from 'gql/graphql'
import { useConsensusData } from 'hooks/useConsensusData'
import { useDomainsData } from 'hooks/useDomainsData'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, useQueryStates } from 'states/query'
import { useTableSettings } from 'states/tables'
import type { Cell, DomainsFilters } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import {
  bigNumberToFormattedString,
  formatUnitsToNumber,
  numberFormattedString,
} from 'utils/number'
import { countTablePages, getTableColumns } from 'utils/table'
import { AccountIconWithLink } from '../common/AccountIcon'
import { TableSettings } from '../common/TableSettings'
import { Tooltip } from '../common/Tooltip'

type Row = DomainsListQuery['staking_domains'][0]
const TABLE = 'domains'

export const DomainsList: FC = () => {
  const { ref, inView } = useInView()
  useDomainsData()
  useConsensusData()
  const { network, section, tokenSymbol, tokenDecimals } = useIndexers()
  const apolloClient = useApolloClient()
  const inFocus = useWindowFocus()
  const {
    pagination,
    sorting,
    selectedColumns,
    filters,
    orderBy,
    whereForSearch,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<DomainsFilters>(TABLE)

  const columns = useMemo(
    () =>
      getTableColumns<Row>(TABLE, selectedColumns, {
        sortId: ({ row }: Cell<Row>) => (
          <Link
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.domains.id.page(network, section, row.original.id)}
          >
            <div>{row.original.id}</div>
          </Link>
        ),
        accountId: ({ row }: Cell<Row>) => (
          <AccountIconWithLink
            address={row.original.accountId}
            network={network}
            section={Routes.consensus}
          />
        ),
        name: ({ row }: Cell<Row>) => (
          <div className='row flex items-center gap-3'>
            <Tooltip
              text={
                <span>
                  Runtime: {row.original.runtime} <br />
                  Details: {row.original.runtimeInfo}
                </span>
              }
              direction='bottom'
              className='max-w-[650px]'
            >
              <div>{capitalizeFirstLetter(row.original.name)}</div>
            </Tooltip>
          </div>
        ),
        runtimeId: ({ row }: Cell<Row>) => row.original.runtimeId.toString(),
        runtime: ({ row }: Cell<Row>) => row.original.runtime,
        completedEpoch: ({ row }: Cell<Row>) => (
          <div>
            <Tooltip
              text={
                <span>
                  Completed epoch: {numberFormattedString(row.original.completedEpoch)} <br />
                  Last block #: {row.original.lastDomainBlockNumber}
                </span>
              }
              direction='bottom'
            >
              {row.original.completedEpoch}
            </Tooltip>
          </div>
        ),
        lastDomainBlockNumber: ({ row }: Cell<Row>) => (
          <div>
            <Tooltip
              text={
                <span>
                  Last block #: {row.original.lastDomainBlockNumber} <br />
                  Completed epoch: {numberFormattedString(row.original.completedEpoch)}
                </span>
              }
              direction='bottom'
            >
              {row.original.lastDomainBlockNumber}
            </Tooltip>
          </div>
        ),
        totalDeposits: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.totalDeposits)} ${tokenSymbol}`,
        totalEstimatedWithdrawals: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.totalEstimatedWithdrawals)} ${tokenSymbol}`,
        totalWithdrawals: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.totalWithdrawals)} ${tokenSymbol}`,
        totalTaxCollected: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.totalTaxCollected)} ${tokenSymbol}`,
        totalRewardsCollected: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.totalRewardsCollected)} ${tokenSymbol}`,
        totalTransfersIn: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.totalTransfersIn)} ${tokenSymbol}`,
        transfersInCount: ({ row }: Cell<Row>) =>
          numberFormattedString(row.original.transfersInCount),
        totalTransfersOut: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.totalTransfersOut)} ${tokenSymbol}`,
        transfersOutCount: ({ row }: Cell<Row>) =>
          numberFormattedString(row.original.transfers_out_count),
        totalRejectedTransfersClaimed: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.totalRejectedTransfersClaimed)} ${tokenSymbol}`,
        rejectedTransfersClaimedCount: ({ row }: Cell<Row>) =>
          numberFormattedString(row.original.rejectedTransfersClaimedCount),
        totalTransfersRejected: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.totalTransfersRejected)} ${tokenSymbol}`,
        transfersRejectedCount: ({ row }: Cell<Row>) =>
          numberFormattedString(row.original.transfersRejectedCount),
        totalVolume: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.totalVolume)} ${tokenSymbol}`,
        totalConsensusStorageFee: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.totalConsensusStorageFee)} ${tokenSymbol}`,
        totalDomainExecutionFee: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.totalDomainExecutionFee)} ${tokenSymbol}`,
        totalBurnedBalance: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.totalBurnedBalance)} ${tokenSymbol}`,
        currentTotalStake: ({ row }: Cell<Row>) => (
          <Tooltip
            text={
              <span>
                Current total stake: {bigNumberToFormattedString(row.original.currentTotalStake)}
                {tokenSymbol}
                <br />
                Storage fee deposit:{' '}
                {bigNumberToFormattedString(row.original.currentStorageFeeDeposit)} {tokenSymbol}
              </span>
            }
            direction='bottom'
          >
            <div>{`${bigNumberToFormattedString(BigInt(row.original.currentTotalStake) + BigInt(row.original.currentStorageFeeDeposit))} ${tokenSymbol}`}</div>
          </Tooltip>
        ),
        accumulatedEpochStake: ({ row }: Cell<Row>) =>
          numberFormattedString(row.original.accumulated_epoch_stake),
        accumulatedEpochStorageFeeDeposit: ({ row }: Cell<Row>) =>
          bigNumberToFormattedString(row.original.accumulatedEpochStorageFeeDeposit),
        bundleCount: ({ row }: Cell<Row>) => numberFormattedString(row.original.bundleCount),
        lastBundleAt: ({ row }: Cell<Row>) => (
          <Link
            key={`created_at-${row.original.id}`}
            data-testid={`created-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              parseInt(row.original.lastBundleAt?.toString() ?? '0'),
            )}
            className='hover:text-primaryAccent'
          >
            <div>{row.original.lastBundleAt}</div>
          </Link>
        ),
        currentStorageFeeDeposit: ({ row }: Cell<Row>) => (
          <Tooltip
            text={
              <span>
                Current total stake: {bigNumberToFormattedString(row.original.currentTotalStake)}
                {tokenSymbol}
                <br />
                Storage fee deposit:{' '}
                {bigNumberToFormattedString(row.original.currentStorageFeeDeposit)} {tokenSymbol}
              </span>
            }
            direction='bottom'
          >
            <div>{`${bigNumberToFormattedString(BigInt(row.original.currentTotalStake) + BigInt(row.original.currentStorageFeeDeposit))} ${tokenSymbol}`}</div>
          </Tooltip>
        ),
        createdAt: ({ row }: Cell<Row>) => (
          <Link
            key={`created_at-${row.original.id}`}
            data-testid={`created-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              parseInt(row.original.createdAt?.toString() ?? '0'),
            )}
            className='hover:text-primaryAccent'
          >
            <div>{row.original.createdAt}</div>
          </Link>
        ),
        updatedAt: ({ row }: Cell<Row>) => (
          <Link
            key={`created_at-${row.original.id}`}
            data-testid={`created-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              parseInt(row.original.updatedAt?.toString() ?? '0'),
            )}
            className='hover:text-primaryAccent'
          >
            <div>{row.original.updatedAt}</div>
          </Link>
        ),
        currentTotalShares: ({ row }: Cell<Row>) =>
          numberFormattedString(row.original.currentTotalShares),
        currentSharePrice: ({ row }: Cell<Row>) =>
          `${formatUnitsToNumber((row.original.currentSharePrice * 1000000).toString())} ${tokenSymbol}`,
        accumulatedEpochRewards: ({ row }: Cell<Row>) =>
          numberFormattedString(row.original.accumulatedEpochRewards),
        accumulatedEpochShares: ({ row }: Cell<Row>) =>
          numberFormattedString(row.original.accumulatedEpochShares),
        // currentEpochDuration: ({ row }: Cell<Row>) =>
        //   numberFormattedString(row.original.currentEpochDuration),
        // lastEpochDuration: ({ row }: Cell<Row>) =>
        //   numberFormattedString(row.original.currentEpochDuration),
        // last6EpochsDuration: ({ row }: Cell<Row>) =>
        //   numberFormattedString(row.original.last6EpochsDuration),
        // last144EpochDuration: ({ row }: Cell<Row>) =>
        //   numberFormattedString(row.original.last144EpochDuration),
        // last1kEpochDuration: ({ row }: Cell<Row>) =>
        //   numberFormattedString(row.original.last1kEpochDuration),
      }),
    [selectedColumns, network, section, tokenSymbol],
  )

  const where = useMemo(
    () => ({
      ...whereForSearch,
      // Total Stake
      ...((filters.totalStakeMin || filters.totalStakeMax) && {
        // eslint-disable-next-line camelcase
        current_total_stake: {
          ...(filters.totalStakeMin && {
            _gte: BigInt(
              Math.floor(parseFloat(filters.totalStakeMin) * 10 ** tokenDecimals),
            ).toString(),
          }),
          ...(filters.totalStakeMax && {
            _lte: BigInt(
              Math.floor(parseFloat(filters.totalStakeMax) * 10 ** tokenDecimals),
            ).toString(),
          }),
        },
      }),
      // Total Deposits
      ...((filters.totalDepositsMin || filters.totalDepositsMax) && {
        // eslint-disable-next-line camelcase
        total_deposits: {
          ...(filters.totalDepositsMin && {
            _gte: BigInt(
              Math.floor(parseFloat(filters.totalDepositsMin) * 10 ** tokenDecimals),
            ).toString(),
          }),
          ...(filters.totalDepositsMax && {
            _lte: BigInt(
              Math.floor(parseFloat(filters.totalDepositsMax) * 10 ** tokenDecimals),
            ).toString(),
          }),
        },
      }),
      // Total Rewards Collected
      ...((filters.totalRewardsCollectedMin || filters.totalRewardsCollectedMax) && {
        // eslint-disable-next-line camelcase
        total_rewards_collected: {
          ...(filters.totalRewardsCollectedMin && {
            _gte: BigInt(
              Math.floor(parseFloat(filters.totalRewardsCollectedMin) * 10 ** tokenDecimals),
            ).toString(),
          }),
          ...(filters.totalRewardsCollectedMax && {
            _lte: BigInt(
              Math.floor(parseFloat(filters.totalRewardsCollectedMax) * 10 ** tokenDecimals),
            ).toString(),
          }),
        },
      }),
      // Deposit Count
      ...((filters.depositsCountMin || filters.depositsCountMax) && {
        // eslint-disable-next-line camelcase
        deposits_aggregate: {
          count: {
            predicate: {
              ...(filters.depositsCountMin && { _gte: parseFloat(filters.depositsCountMin) }),
              ...(filters.depositsCountMax && { _lte: parseFloat(filters.depositsCountMax) }),
            },
          },
        },
      }),
      // Completed Epoch
      ...((filters.completedEpochMin || filters.completedEpochMax) && {
        // eslint-disable-next-line camelcase
        completed_epoch: {
          ...(filters.completedEpochMin && { _gte: filters.completedEpochMin }),
          ...(filters.completedEpochMax && { _lte: filters.completedEpochMax }),
        },
      }),
      // Bundle Count
      ...((filters.bundleCountMin || filters.bundleCountMax) && {
        // eslint-disable-next-line camelcase
        bundle_count: {
          ...(filters.bundleCountMin && { _gte: filters.bundleCountMin }),
          ...(filters.bundleCountMax && { _lte: filters.bundleCountMax }),
        },
      }),
    }),
    [filters, tokenDecimals, whereForSearch],
  )

  const variables: DomainsListQueryVariables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, where],
  )

  const { loading, setIsVisible } = useIndexersQuery<DomainsListQuery, DomainsListQueryVariables>(
    DomainsListDocument,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
      context: { clientName: 'staking' },
    },
    Routes.domains,
    TABLE,
  )

  const domains = useQueryStates((state) => state.domains.domains)

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, DomainsListDocument, 'staking_' + TABLE, {
        orderBy,
        where,
      }),
    [apolloClient, orderBy, where],
  )

  const domainsList = useMemo(
    () => (hasValue(domains) ? domains.value.staking_domains : []),
    [domains],
  )

  const totalCount = useMemo(
    () => (hasValue(domains) && domains.value.staking_domains_aggregate.aggregate?.count) || 0,
    [domains],
  )
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const isDataLoading = useMemo(() => {
    if (loading || !domainsList) return true
    return false
  }, [domainsList, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-4' ref={ref}>
        <TableSettings table={TABLE} totalCount={totalCount} filters={filters} />
        <SortedTable
          data={domainsList}
          columns={columns}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={onSortingChange}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={onPaginationChange}
          filename='staking-domains-list'
          fullDataDownloader={fullDataDownloader}
          loading={isDataLoading}
          emptyMessage='No domains found'
          skeletonLoaderClassName='py-6'
        />
      </div>
    </div>
  )
}
