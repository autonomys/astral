'use client'

import { useApolloClient } from '@apollo/client'
import { capitalizeFirstLetter } from '@autonomys/auto-utils'
import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { DomainsListQuery, DomainsListQueryVariables, Order_By as OrderBy } from 'gql/graphql'
import { useConsensusData } from 'hooks/useConsensusData'
import { useDomainsData } from 'hooks/useDomainsData'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableStates } from 'states/tables'
import type { Cell, DomainsFilters, TableSettingsTabs } from 'types/table'
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
import { NotFound } from '../layout/NotFound'
import { QUERY_DOMAIN_LIST } from './query'

type Row = DomainsListQuery['staking_domains'][0]
const TABLE = 'domains'

export const DomainsList: FC = () => {
  const { ref, inView } = useInView()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'sort_id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  useDomainsData()
  useConsensusData()
  const { network, section, tokenSymbol, tokenDecimals } = useIndexers()
  const apolloClient = useApolloClient()
  const inFocus = useWindowFocus()
  const availableColumns = useTableStates((state) => state[TABLE].columns)
  const selectedColumns = useTableStates((state) => state[TABLE].selectedColumns)
  const filtersOptions = useTableStates((state) => state[TABLE].filtersOptions)
  const filters = useTableStates((state) => state[TABLE].filters) as DomainsFilters
  const showTableSettings = useTableStates((state) => state[TABLE].showTableSettings)
  const setColumns = useTableStates((state) => state.setColumns)
  const setFilters = useTableStates((state) => state.setFilters)
  const showSettings = useTableStates((state) => state.showSettings)
  const hideSettings = useTableStates((state) => state.hideSettings)
  const resetSettings = useTableStates((state) => state.resetSettings)
  const showReset = useTableStates((state) => state.showReset)

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
            >
              <div>{capitalizeFirstLetter(row.original.name)}</div>
            </Tooltip>
          </div>
        ),
        runtimeId: ({ row }: Cell<Row>) => row.original.runtimeId.toString(),
        runtime: ({ row }: Cell<Row>) => row.original.runtime,
        runtimeInfo: ({ row }: Cell<Row>) => row.original.runtimeInfo,
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
        currentEpochDuration: ({ row }: Cell<Row>) =>
          numberFormattedString(row.original.currentEpochDuration),
        lastEpochDuration: ({ row }: Cell<Row>) =>
          numberFormattedString(row.original.currentEpochDuration),
        last6EpochsDuration: ({ row }: Cell<Row>) =>
          numberFormattedString(row.original.last6EpochsDuration),
        last144EpochDuration: ({ row }: Cell<Row>) =>
          numberFormattedString(row.original.last144EpochDuration),
        last1kEpochDuration: ({ row }: Cell<Row>) =>
          numberFormattedString(row.original.last1kEpochDuration),
      }),
    [selectedColumns, network, section, tokenSymbol],
  )

  const orderBy = useMemo(
    () =>
      sorting && sorting.length > 0
        ? sorting[0].id.endsWith('aggregate')
          ? { [sorting[0].id]: sorting[0].desc ? { count: OrderBy.Desc } : { count: OrderBy.Asc } }
          : { [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }
        : { id: OrderBy.Asc },
    [sorting],
  )

  const where = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions: Record<string, any> = {}

    // Add search conditions
    availableColumns
      .filter((column) => column.searchable)
      .forEach((column) => {
        const searchKey = `search-${column.name}` as keyof DomainsFilters
        const searchValue = filters[searchKey]
        if (searchValue) {
          conditions[column.name] = { _ilike: `%${searchValue}%` }
        }
      })

    // Total Stake
    if (filters.totalStakeMin || filters.totalStakeMax) {
      conditions['current_total_stake'] = {}
      if (filters.totalStakeMin) {
        conditions.current_total_stake._gte = BigInt(
          Math.floor(parseFloat(filters.totalStakeMin) * 10 ** tokenDecimals),
        ).toString()
      }
      if (filters.totalStakeMax) {
        conditions.current_total_stake._lte = BigInt(
          Math.floor(parseFloat(filters.totalStakeMax) * 10 ** tokenDecimals),
        ).toString()
      }
    }

    // Total Deposits
    if (filters.totalDepositsMin || filters.totalDepositsMax) {
      conditions['total_deposits'] = {}
      if (filters.totalDepositsMin) {
        conditions.total_deposits._gte = BigInt(
          Math.floor(parseFloat(filters.totalDepositsMin) * 10 ** tokenDecimals),
        ).toString()
      }
      if (filters.totalDepositsMax) {
        conditions.total_deposits._lte = BigInt(
          Math.floor(parseFloat(filters.totalDepositsMax) * 10 ** tokenDecimals),
        ).toString()
      }
    }

    // Total Rewards Collected
    if (filters.totalRewardsCollectedMin || filters.totalRewardsCollectedMax) {
      conditions['total_rewards_collected'] = {}
      if (filters.totalRewardsCollectedMin) {
        conditions.total_rewards_collected._gte = BigInt(
          Math.floor(parseFloat(filters.totalRewardsCollectedMin) * 10 ** tokenDecimals),
        ).toString()
      }
      if (filters.totalRewardsCollectedMax) {
        conditions.total_rewards_collected._lte = BigInt(
          Math.floor(parseFloat(filters.totalRewardsCollectedMax) * 10 ** tokenDecimals),
        ).toString()
      }
    }

    // Deposit Count
    if (filters.depositsCountMin || filters.depositsCountMax) {
      conditions['deposits_aggregate'] = { count: { predicate: {} } }
      if (filters.depositsCountMin)
        conditions.deposits_aggregate.count.predicate._gte = filters.depositsCountMin
      if (filters.depositsCountMax)
        conditions.deposits_aggregate.count.predicate._lte = filters.depositsCountMax
    }

    // Completed Epoch
    if (filters.completedEpochMin || filters.completedEpochMax) {
      conditions['completed_epoch'] = {}
      if (filters.completedEpochMin) conditions.completed_epoch._gte = filters.completedEpochMin
      if (filters.completedEpochMax) conditions.completed_epoch._lte = filters.completedEpochMax
    }

    // Bundle Count
    if (filters.bundleCountMin || filters.bundleCountMax) {
      conditions['bundle_count'] = {}
      if (filters.bundleCountMin) conditions.bundle_count._gte = filters.bundleCountMin
      if (filters.bundleCountMax) conditions.bundle_count._lte = filters.bundleCountMax
    }

    return conditions
  }, [availableColumns, filters, tokenDecimals])

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
    QUERY_DOMAIN_LIST,
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
      downloadFullData(apolloClient, QUERY_DOMAIN_LIST, TABLE, {
        orderBy,
      }),
    [apolloClient, orderBy],
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

  const noData = useMemo(() => {
    if (isLoading(domains)) return <Spinner isSmall />
    if (!hasValue(domains)) return <NotFound />
    return null
  }, [domains])

  const handleFilterChange = useCallback(
    (filterName: string, value: string | boolean) => {
      setFilters(TABLE, {
        ...filters,
        [filterName]: value,
      })
    },
    [filters, setFilters],
  )

  const handleClickOnColumnToEditTable = useCallback(
    (column: string, checked: boolean) =>
      checked
        ? setColumns(TABLE, [...selectedColumns, column])
        : setColumns(
            TABLE,
            selectedColumns.filter((c) => c !== column),
          ),
    [selectedColumns, setColumns],
  )

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-4' ref={ref}>
        <TableSettings
          tableName={capitalizeFirstLetter(TABLE)}
          totalCount={totalCount}
          availableColumns={availableColumns}
          selectedColumns={selectedColumns}
          filters={filters}
          showTableSettings={showTableSettings}
          showSettings={(setting: TableSettingsTabs) => showSettings(TABLE, setting)}
          hideSettings={() => hideSettings(TABLE)}
          handleColumnChange={handleClickOnColumnToEditTable}
          handleFilterChange={handleFilterChange}
          filterOptions={filtersOptions}
          handleReset={() => resetSettings(TABLE)}
          showReset={showReset(TABLE)}
        />
        {!loading && domainsList ? (
          <SortedTable
            data={domainsList}
            columns={columns}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={setSorting}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={setPagination}
            filename='staking-domains-list'
            fullDataDownloader={fullDataDownloader}
          />
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
