'use client'

import { utcToLocalRelativeTime } from '@/utils/time'
import { useApolloClient } from '@apollo/client'
import { shortString } from '@autonomys/auto-utils'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  TransferHistoryDocument,
  TransferHistoryQuery,
  TransferHistoryQueryVariables,
} from 'gql/graphql'
import { useConsensusData } from 'hooks/useConsensusData'
import { useDomainsData } from 'hooks/useDomainsData'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useConsensusStates } from 'states/consensus'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableSettings } from 'states/tables'
import { useViewStates } from 'states/view'
import type { Cell, FilterOption, TransferHistoryFilters } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToFormattedString } from 'utils/number'
import { countTablePages, getTableColumns } from 'utils/table'
import { AccountIconWithLink } from '../common/AccountIcon'
import { StatusIcon } from '../common/StatusIcon'
import { TableSettings } from '../common/TableSettings'
import { NotFound } from '../layout/NotFound'

type Row = TransferHistoryQuery['consensus_transfers'][0]
const TABLE = 'transfers'

interface TransferHistoryProps {
  domainId?: string
}

export const TransferHistory: FC<TransferHistoryProps> = ({ domainId }) => {
  const { ref, inView } = useInView()
  const { network, tokenSymbol, tokenDecimals } = useIndexers()
  const { subspaceAccount } = useWallet()
  const { domainRegistry } = useConsensusStates()
  useConsensusData()
  useDomainsData()
  const inFocus = useWindowFocus()
  const { myPositionOnly } = useViewStates()

  const chainOptions = ['consensus', 'domain:0']
  const statusOptions = [
    { value: 'true', label: 'Success' },
    { value: 'false', label: 'Failed' },
  ]

  const overrideFiltersOptions = useMemo<FilterOption[]>(
    () => [
      { type: 'dropdown', label: 'From Chain', key: 'fromChain', options: chainOptions },
      { type: 'dropdown', label: 'To Chain', key: 'toChain', options: chainOptions },
      { type: 'dropdown', label: 'Status', key: 'success', options: statusOptions },
      { type: 'text', label: 'Block', key: 'blockHeight' },
      { type: 'range', label: 'Amount', key: 'value' },
      { type: 'range', label: 'Fee', key: 'fee' },
    ],
    [],
  )

  const {
    pagination,
    sorting,
    selectedColumns,
    filters,
    orderBy,
    whereForSearch,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<TransferHistoryFilters>(TABLE)

  const apolloClient = useApolloClient()

  const columns = useMemo(() => {
    // Get the default columns from the utility function
    const defaultColumns = getTableColumns<Row>(
      TABLE,
      selectedColumns,
      {
        blockHeight: ({ row }: Cell<Row>) => (
          <div className='row flex items-center gap-3'>
            <Link
              href={INTERNAL_ROUTES.blocks.id.page(
                network,
                Routes.consensus,
                parseInt(row.original.block_height?.toString() ?? '0'),
              )}
              className='hover:text-primaryAccent'
            >
              <div>{row.original.block_height}</div>
            </Link>
          </div>
        ),
        extrinsicId: ({ row }: Cell<Row>) => (
          <div className='row flex items-center gap-3'>
            <Link
              href={INTERNAL_ROUTES.extrinsics.id.page(
                network,
                Routes.consensus,
                row.original.extrinsic_id,
              )}
              className='hover:text-primaryAccent'
            >
              <div>{row.original.extrinsic_id}</div>
            </Link>
          </div>
        ),
        id: ({ row }: Cell<Row>) => <div>{row.original.id}</div>,
        from: ({ row }: Cell<Row>) => (
          <AccountIconWithLink
            address={row.original.from}
            network={network}
            section={Routes.consensus}
          />
        ),
        to: ({ row }: Cell<Row>) => (
          <AccountIconWithLink
            address={row.original.to}
            network={network}
            section={Routes.consensus}
          />
        ),
        fromChain: ({ row }: Cell<Row>) => {
          const domain = domainRegistry.find((d) => d.domainId === row.original.from_chain)
          return (
            <Link
              className='hover:text-primaryAccent'
              href={INTERNAL_ROUTES.domains.id.page(
                network,
                Routes.domains,
                row.original.from_chain,
              )}
            >
              <div>
                {domain
                  ? domain.domainConfig.domainName.charAt(0).toUpperCase() +
                    domain.domainConfig.domainName.slice(1)
                  : '#' + row.original.from_chain}
              </div>
            </Link>
          )
        },
        toChain: ({ row }: Cell<Row>) => {
          const domain = domainRegistry.find((d) => d.domainId === row.original.to_chain)
          return (
            <Link
              className='hover:text-primaryAccent'
              href={INTERNAL_ROUTES.domains.id.page(network, Routes.domains, row.original.to_chain)}
            >
              <div>
                {domain
                  ? domain.domainConfig.domainName.charAt(0).toUpperCase() +
                    domain.domainConfig.domainName.slice(1)
                  : '#' + row.original.to_chain}
              </div>
            </Link>
          )
        },
        value: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.value)} ${tokenSymbol}`,
        timestamp: ({ row }: Cell<Row>) => (
          <div key={`${row.original.id}-created_at-${row.index}`}>
            {utcToLocalRelativeTime(row.original.timestamp)}
          </div>
        ),
        success: ({ row }: Cell<Row>) => <StatusIcon status={row.original.success} />,
        fee: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.fee)} ${tokenSymbol}`,
        eventId: ({ row }: Cell<Row>) => <div>{row.original.event_id}</div>,
        blockHash: ({ row }: Cell<Row>) => <div>{shortString(row.original.block_hash)}</div>,
        uuid: ({ row }: Cell<Row>) => <div>{row.original.uuid}</div>,
      },
      {
        blockHeight: 'Block',
        timestamp: 'Time',
      },
      {
        eventId: false,
        blockHash: false,
        uuid: false,
      },
    )
    // Make sure the 'value' and 'fee' columns are sortable by explicitly setting their accessorKey
    return defaultColumns.map((column) => {
      if (column.id === 'value') {
        return {
          ...column,
          accessorKey: 'value',
          enableSorting: true,
        }
      }
      if (column.id === 'fee') {
        return {
          ...column,
          accessorKey: 'fee',
          enableSorting: true,
        }
      }
      if (column.id === 'blockHeight') {
        return {
          ...column,
          accessorKey: 'block_height',
          enableSorting: true,
        }
      }
      if (column.id === 'extrinsicId') {
        return {
          ...column,
          accessorKey: 'extrinsic_id',
          enableSorting: true,
        }
      }
      return column
    })
  }, [selectedColumns, domainRegistry, network, tokenSymbol])

  const where = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions: Record<string, any> = whereForSearch

    if (domainId) {
      conditions['from_chain'] = {}
      conditions.from_chain._eq = domainId
    }

    if (subspaceAccount && myPositionOnly) {
      conditions._or = [{ from: { _eq: subspaceAccount } }, { to: { _eq: subspaceAccount } }]
    } else if (conditions._or) delete conditions._or

    // Amount
    if (filters.valueMin || filters.valueMax) {
      conditions['value'] = {}
      if (filters.valueMin) {
        conditions.value._gte = BigInt(
          Math.floor(parseFloat(filters.valueMin) * 10 ** tokenDecimals),
        ).toString()
      }
      if (filters.valueMax) {
        conditions.value._lte = BigInt(
          Math.floor(parseFloat(filters.valueMax) * 10 ** tokenDecimals),
        ).toString()
      }
    }
    // Block Height
    if (filters.blockHeight) {
      // Parse to integer since block_height is numeric
      const blockHeightValue = parseInt(filters.blockHeight)

      // Use _eq for exact match with numbers
      if (!isNaN(blockHeightValue)) {
        conditions['block_height'] = { _eq: blockHeightValue }
      }
    }

    // From/To Address
    if (filters.from) {
      conditions['from'] = { _ilike: `%${filters.from}%` }
    }
    if (filters.to) {
      conditions['to'] = { _ilike: `%${filters.to}%` }
    }

    // Chain IDs
    if (filters.fromChain) {
      conditions['from_chain'] = { _eq: filters.fromChain }
    }
    if (filters.toChain) {
      conditions['to_chain'] = { _eq: filters.toChain }
    }

    // Success status
    if (filters.success) {
      conditions['success'] = { _eq: filters.success === 'true' }
    }

    // Fee
    if (filters.feeMin || filters.feeMax) {
      conditions['fee'] = {}
      if (filters.feeMin) {
        conditions.fee._gte = BigInt(
          Math.floor(parseFloat(filters.feeMin) * 10 ** tokenDecimals),
        ).toString()
      }
      if (filters.feeMax) {
        conditions.fee._lte = BigInt(
          Math.floor(parseFloat(filters.feeMax) * 10 ** tokenDecimals),
        ).toString()
      }
    }

    return conditions
  }, [domainId, subspaceAccount, myPositionOnly, whereForSearch, filters, tokenDecimals])

  const variables: TransferHistoryQueryVariables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where,
      accountId: subspaceAccount ?? '',
    }),
    [pagination, orderBy, where, subspaceAccount],
  )

  const { loading, setIsVisible } = useIndexersQuery<
    TransferHistoryQuery,
    TransferHistoryQueryVariables
  >(
    TransferHistoryDocument,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
      context: { clientName: 'transfer' },
    },
    Routes.transfer,
    'transferHistory',
  )

  const transfers = useQueryStates((state) => state.transfer.transferHistory)

  const fullDataDownloader = useCallback(() => {
    return downloadFullData(apolloClient, TransferHistoryDocument, 'consensus_' + TABLE, {
      orderBy,
      where,
    })
  }, [apolloClient, orderBy, where])

  const transfersList = useMemo(() => {
    if (hasValue(transfers))
      return transfers.value.consensus_transfers.map((o) => {
        return {
          ...o,
        }
      })
    return []
  }, [transfers])

  const totalCount = useMemo(
    () =>
      (hasValue(transfers) && transfers.value?.consensus_transfers_aggregate?.aggregate?.count) ||
      0,
    [transfers],
  )
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading || isLoading(transfers)) return <Spinner isSmall />
    if (!hasValue(transfers)) return <NotFound />
    return null
  }, [loading, transfers])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-4' ref={ref}>
        <TableSettings
          table={TABLE}
          totalCount={totalCount}
          filters={filters}
          overrideFiltersOptions={overrideFiltersOptions}
        />
        {!loading && transfersList ? (
          <SortedTable
            data={transfersList}
            columns={columns}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={onSortingChange}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={onPaginationChange}
            filename='transfer-history'
            fullDataDownloader={fullDataDownloader}
          />
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
