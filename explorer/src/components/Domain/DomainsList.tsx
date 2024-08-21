'use client'

import { capitalizeFirstLetter, shortString } from '@/utils/string'
import { useApolloClient } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE, TOKEN } from 'constants/'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { DomainsListQuery, DomainsListQueryVariables, Order_By as OrderBy } from 'gql/types/staking'
import useChains from 'hooks/useChains'
import { useConsensusData } from 'hooks/useConsensusData'
import { useDomainsData } from 'hooks/useDomainsData'
import { useSquidQuery } from 'hooks/useSquidQuery'
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
  numberWithCommas,
} from 'utils/number'
import { countTablePages } from 'utils/table'
import { AccountIcon } from '../common/AccountIcon'
import { TableSettings } from '../common/TableSettings'
import { Tooltip } from '../common/Tooltip'
import { NotFound } from '../layout/NotFound'
import { QUERY_DOMAIN_LIST } from './staking.query'

type Row = DomainsListQuery['domain'][0]
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
  const inFocus = useWindowFocus()

  const { network, section } = useChains()
  const apolloClient = useApolloClient()

  const {
    domains: {
      columns: availableColumns,
      selectedColumns,
      filtersOptions,
      filters: operatorFilters,
      showTableSettings,
    },
    setColumns,
    setFilters,
    showSettings,
    hideSettings,
    resetSettings,
    showReset,
  } = useTableStates()
  const filters = useMemo(() => operatorFilters as DomainsFilters, [operatorFilters])

  const columns = useMemo(() => {
    const cols = []
    if (selectedColumns.includes('id'))
      cols.push({
        accessorKey: 'sort_id',
        header: 'Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.domains.id.page(network, section, row.original.id)}
          >
            <div>{row.original.id}</div>
          </Link>
        ),
      })
    if (selectedColumns.includes('account_id'))
      cols.push({
        accessorKey: 'account_id',
        header: 'Owner',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            className='flex items-center gap-2 hover:text-purpleAccent'
            href={INTERNAL_ROUTES.accounts.id.page(
              network,
              Routes.consensus,
              row.original.account_id,
            )}
          >
            <AccountIcon address={row.original.account_id} size={26} />
            <div>{shortString(row.original.account_id)}</div>
          </Link>
        ),
      })
    if (selectedColumns.includes('name'))
      cols.push({
        accessorKey: 'name',
        header: 'Domain Name',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div className='row flex items-center gap-3'>
            <Tooltip
              text={
                <span>
                  Runtime: {row.original.runtime} <br />
                  Details: {row.original.runtime_info}
                </span>
              }
            >
              <div>{capitalizeFirstLetter(row.original.name)}</div>
            </Tooltip>
          </div>
        ),
      })
    if (selectedColumns.includes('runtime_id'))
      cols.push({
        accessorKey: 'runtime_id',
        header: 'Runtime Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => <div>{row.original.runtime_id}</div>,
      })
    if (selectedColumns.includes('runtime'))
      cols.push({
        accessorKey: 'runtime',
        header: 'Runtime',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => <div>{row.original.runtime}</div>,
      })
    if (selectedColumns.includes('runtime_info'))
      cols.push({
        accessorKey: 'runtime_info',
        header: 'Runtime Info',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => <div>{row.original.runtime_info}</div>,
      })
    if (selectedColumns.includes('completed_epoch'))
      cols.push({
        accessorKey: 'completed_epoch',
        header: 'Completed epoch',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>
            <Tooltip
              text={
                <span>
                  Completed epoch: {numberFormattedString(row.original.completed_epoch)} <br />
                  Last block #: {row.original.last_domain_block_number}
                </span>
              }
            >
              {row.original.completed_epoch}
            </Tooltip>
          </div>
        ),
      })
    if (selectedColumns.includes('last_domain_block_number'))
      cols.push({
        accessorKey: 'last_domain_block_number',
        header: 'Last Domain Block Number',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>
            <Tooltip
              text={
                <span>
                  Last block #: {row.original.last_domain_block_number} <br />
                  Completed epoch: {numberFormattedString(row.original.completed_epoch)}
                </span>
              }
            >
              {row.original.last_domain_block_number}
            </Tooltip>
          </div>
        ),
      })
    if (selectedColumns.includes('total_deposits'))
      cols.push({
        accessorKey: 'total_deposits',
        header: 'Total deposits',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_deposits)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_estimated_withdrawals'))
      cols.push({
        accessorKey: 'total_estimated_withdrawals',
        header: 'Total Estimated Withdrawals',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_estimated_withdrawals)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_withdrawals'))
      cols.push({
        accessorKey: 'total_withdrawals',
        header: 'Total Withdrawals',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_withdrawals)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_tax_collected'))
      cols.push({
        accessorKey: 'total_tax_collected',
        header: 'Total Tax Collected',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_tax_collected)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_rewards_collected'))
      cols.push({
        accessorKey: 'total_rewards_collected',
        header: 'Rewards collected',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_rewards_collected)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_transfers_in'))
      cols.push({
        accessorKey: 'total_transfers_in',
        header: 'Total Transfers In',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_transfers_in)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('transfers_in_count'))
      cols.push({
        accessorKey: 'transfers_in_count',
        header: 'Transfers In Count',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.transfers_in_count)}</div>
        ),
      })
    if (selectedColumns.includes('total_transfers_out'))
      cols.push({
        accessorKey: 'total_transfers_out',
        header: 'Total Transfers Out',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_transfers_out)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('transfers_out_count'))
      cols.push({
        accessorKey: 'transfers_out_count',
        header: 'Transfers Out Count',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.transfers_out_count)}</div>
        ),
      })
    if (selectedColumns.includes('total_rejected_transfers_claimed'))
      cols.push({
        accessorKey: 'total_rejected_transfers_claimed',
        header: 'Total Rejected Transfers Claimed',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_rejected_transfers_claimed)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('rejected_transfers_claimed_count'))
      cols.push({
        accessorKey: 'rejected_transfers_claimed_count',
        header: 'Rejected Transfers Claimed Count',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.rejected_transfers_claimed_count)}</div>
        ),
      })
    if (selectedColumns.includes('total_transfers_rejected'))
      cols.push({
        accessorKey: 'total_transfers_rejected',
        header: 'Total Transfers Rejected',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_transfers_rejected)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('transfers_rejected_count'))
      cols.push({
        accessorKey: 'transfers_rejected_count',
        header: 'Transfers Rejected Count',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.transfers_rejected_count)}</div>
        ),
      })
    if (selectedColumns.includes('total_volume'))
      cols.push({
        accessorKey: 'total_volume',
        header: 'Total Volume',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_volume)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_consensus_storage_fee'))
      cols.push({
        accessorKey: 'total_consensus_storage_fee',
        header: 'Consensus storage fee',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_consensus_storage_fee)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_domain_execution_fee'))
      cols.push({
        accessorKey: 'total_domain_execution_fee',
        header: 'Domain execution fee',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_domain_execution_fee)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_burned_balance'))
      cols.push({
        accessorKey: 'total_burned_balance',
        header: 'Total Burned Balance',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_burned_balance)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('current_total_stake'))
      cols.push({
        accessorKey: 'current_total_stake',
        header: 'Total stake',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Tooltip
            text={
              <span>
                Current total stake: {bigNumberToFormattedString(row.original.current_total_stake)}
                {TOKEN.symbol}
                <br />
                Storage fee deposit:{' '}
                {bigNumberToFormattedString(row.original.current_storage_fee_deposit)}{' '}
                {TOKEN.symbol}
              </span>
            }
          >
            <div>{`${bigNumberToFormattedString(BigInt(row.original.current_total_stake) + BigInt(row.original.current_storage_fee_deposit))} ${TOKEN.symbol}`}</div>
          </Tooltip>
        ),
      })
    if (selectedColumns.includes('current_storage_fee_deposit'))
      cols.push({
        accessorKey: 'current_storage_fee_deposit',
        header: 'Storage Fee Deposit',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Tooltip
            text={
              <span>
                Storage fee deposit:{' '}
                {bigNumberToFormattedString(row.original.current_storage_fee_deposit)}{' '}
                {TOKEN.symbol}
                <br />
                Current total stake: {bigNumberToFormattedString(row.original.current_total_stake)}
                {TOKEN.symbol}
              </span>
            }
          >
            <div>{`${bigNumberToFormattedString(BigInt(row.original.current_storage_fee_deposit))} ${TOKEN.symbol}`}</div>
          </Tooltip>
        ),
      })
    if (selectedColumns.includes('accumulated_epoch_stake'))
      cols.push({
        accessorKey: 'accumulated_epoch_stake',
        header: 'Accumulated Epoch Stake',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.accumulated_epoch_stake)}</div>
        ),
      })
    if (selectedColumns.includes('accumulated_epoch_storage_fee_deposit'))
      cols.push({
        accessorKey: 'accumulated_epoch_storage_fee_deposit',
        header: 'Accumulated Epoch Storage Fee Deposit',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>
            {bigNumberToFormattedString(row.original.accumulated_epoch_storage_fee_deposit)}
          </div>
        ),
      })
    if (selectedColumns.includes('bundle_count'))
      cols.push({
        accessorKey: 'bundle_count',
        header: 'Bundle Count',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => <div>{numberFormattedString(row.original.bundle_count)}</div>,
      })
    if (selectedColumns.includes('last_bundle_at'))
      cols.push({
        accessorKey: 'last_bundle_at',
        header: 'Last Bundle',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`created_at-${row.original.id}`}
            data-testid={`created-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              parseInt(row.original.last_bundle_at?.toString() ?? '0'),
            )}
            className='hover:text-purpleAccent'
          >
            <div>{row.original.last_bundle_at}</div>
          </Link>
        ),
      })
    if (selectedColumns.includes('created_at'))
      cols.push({
        accessorKey: 'created_at',
        header: 'Created',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`created_at-${row.original.id}`}
            data-testid={`created-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              parseInt(row.original.created_at?.toString() ?? '0'),
            )}
            className='hover:text-purpleAccent'
          >
            <div>{row.original.created_at}</div>
          </Link>
        ),
      })
    if (selectedColumns.includes('updated_at'))
      cols.push({
        accessorKey: 'updated_at',
        header: 'Updated',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`created_at-${row.original.id}`}
            data-testid={`created-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              parseInt(row.original.created_at?.toString() ?? '0'),
            )}
            className='hover:text-purpleAccent'
          >
            <div>{row.original.updated_at}</div>
          </Link>
        ),
      })
    if (selectedColumns.includes('current_total_shares'))
      cols.push({
        accessorKey: 'current_total_shares',
        header: 'Current Total Shares',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.current_total_shares)}</div>
        ),
      })
    if (selectedColumns.includes('current_share_price'))
      cols.push({
        accessorKey: 'current_share_price',
        header: 'Current Share Price',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${formatUnitsToNumber((row.original.current_share_price * 1000000).toString())} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('accumulated_epoch_rewards'))
      cols.push({
        accessorKey: 'accumulated_epoch_rewards',
        header: 'Accumulated Epoch Rewards',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.accumulated_epoch_rewards)}</div>
        ),
      })
    if (selectedColumns.includes('accumulated_epoch_shares'))
      cols.push({
        accessorKey: 'accumulated_epoch_shares',
        header: 'Accumulated Epoch Shares',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.accumulated_epoch_shares)}</div>
        ),
      })
    if (selectedColumns.includes('current_epoch_duration'))
      cols.push({
        accessorKey: 'current_epoch_duration',
        header: 'Current Epoch Duration',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.current_epoch_duration)}</div>
        ),
      })
    if (selectedColumns.includes('last_epoch_duration'))
      cols.push({
        accessorKey: 'last_epoch_duration',
        header: 'Last Epoch Duration',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.last_epoch_duration)}</div>
        ),
      })
    if (selectedColumns.includes('last6_epochs_duration'))
      cols.push({
        accessorKey: 'last6_epochs_duration',
        header: 'Last 6 Epochs Duration',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.last6_epochs_duration)}</div>
        ),
      })
    if (selectedColumns.includes('last144_epoch_duration'))
      cols.push({
        accessorKey: 'last144_epoch_duration',
        header: 'Last 144 Epoch Duration',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.last144_epoch_duration)}</div>
        ),
      })
    if (selectedColumns.includes('last1k_epoch_duration'))
      cols.push({
        accessorKey: 'last1k_epoch_duration',
        header: 'Last 1K Epoch Duration',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.last1k_epoch_duration)}</div>
        ),
      })
    return cols
  }, [selectedColumns, network, section])

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
          Math.floor(parseFloat(filters.totalStakeMin) * 10 ** TOKEN.decimals),
        ).toString()
      }
      if (filters.totalStakeMax) {
        conditions.current_total_stake._lte = BigInt(
          Math.floor(parseFloat(filters.totalStakeMax) * 10 ** TOKEN.decimals),
        ).toString()
      }
    }

    // Total Deposits
    if (filters.totalDepositsMin || filters.totalDepositsMax) {
      conditions['total_deposits'] = {}
      if (filters.totalDepositsMin) {
        conditions.total_deposits._gte = BigInt(
          Math.floor(parseFloat(filters.totalDepositsMin) * 10 ** TOKEN.decimals),
        ).toString()
      }
      if (filters.totalDepositsMax) {
        conditions.total_deposits._lte = BigInt(
          Math.floor(parseFloat(filters.totalDepositsMax) * 10 ** TOKEN.decimals),
        ).toString()
      }
    }

    // Total Rewards Collected
    if (filters.totalRewardsCollectedMin || filters.totalRewardsCollectedMax) {
      conditions['total_rewards_collected'] = {}
      if (filters.totalRewardsCollectedMin) {
        conditions.total_rewards_collected._gte = BigInt(
          Math.floor(parseFloat(filters.totalRewardsCollectedMin) * 10 ** TOKEN.decimals),
        ).toString()
      }
      if (filters.totalRewardsCollectedMax) {
        conditions.total_rewards_collected._lte = BigInt(
          Math.floor(parseFloat(filters.totalRewardsCollectedMax) * 10 ** TOKEN.decimals),
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
  }, [filters, availableColumns])

  const variables: DomainsListQueryVariables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, where],
  )

  const { loading, setIsVisible } = useSquidQuery<DomainsListQuery, DomainsListQueryVariables>(
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

  const {
    domains: { domains },
  } = useQueryStates()

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(
        apolloClient,
        QUERY_DOMAIN_LIST,
        TABLE,
        {
          orderBy,
        },
        ['limit', 'offset'],
        { clientName: 'staking' },
      ),
    [apolloClient, orderBy],
  )

  const domainsList = useMemo(() => (hasValue(domains) ? domains.value.domain : []), [domains])

  const totalCount = useMemo(
    () => (hasValue(domains) && domains.value.domain_aggregate.aggregate?.count) || 0,
    [domains],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
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

  const handleReset = useCallback(() => resetSettings(TABLE), [resetSettings])

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

  const _showSettings = useCallback(
    (setting: TableSettingsTabs) => showSettings(TABLE, setting),
    [showSettings],
  )
  const _hideSettings = useCallback(() => hideSettings(TABLE), [hideSettings])

  const _showReset = useCallback(
    () => showReset(TABLE),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showReset, selectedColumns, operatorFilters],
  )

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-4' ref={ref}>
        <TableSettings
          tableName='Domains'
          totalLabel={totalLabel}
          availableColumns={availableColumns}
          selectedColumns={selectedColumns}
          filters={filters}
          showTableSettings={showTableSettings}
          showSettings={_showSettings}
          hideSettings={_hideSettings}
          handleColumnChange={handleClickOnColumnToEditTable}
          handleFilterChange={handleFilterChange}
          filterOptions={filtersOptions}
          handleReset={handleReset}
          showReset={_showReset()}
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
