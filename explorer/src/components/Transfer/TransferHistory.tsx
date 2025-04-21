'use client'

import { utcToLocalRelativeTime } from '@/utils/time'
import { useApolloClient } from '@apollo/client'
import { capitalizeFirstLetter, shortString } from '@autonomys/auto-utils'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  TransferHistoryDocument,
  TransferHistoryQuery,
  TransferHistoryQueryVariables,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableSettings } from 'states/tables'
import type { Cell, TransfersFilters } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToFormattedString } from 'utils/number'
import { countTablePages, getTableColumns } from 'utils/table'
import { AccountIconWithLink } from '../common/AccountIcon'
import { StatusIcon } from '../common/StatusIcon'
import { TableSettings } from '../common/TableSettings'
import { NotFound } from '../layout/NotFound'
import { WalletButton } from '../WalletButton'

type Row = TransferHistoryQuery['consensus_transfers'][0]
const TABLE = 'transfers'

interface TransferHistoryProps {
  domainId?: string
}

export const TransferHistory: FC<TransferHistoryProps> = ({ domainId }) => {
  const { ref, inView } = useInView()
  const { network, tokenSymbol, tokenDecimals } = useIndexers()
  const { subspaceAccount, actingAccount } = useWallet()
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
  } = useTableSettings<TransfersFilters>(TABLE)

  const apolloClient = useApolloClient()

  const isWalletConnected = useMemo(() => {
    if (actingAccount?.address) return true
    if (subspaceAccount) return true
    return false
  }, [actingAccount, subspaceAccount])

  const columns = useMemo(() => {
    return getTableColumns<Row>(
      TABLE,
      selectedColumns,
      {
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
          return (
            <Link
              className='hover:text-primaryAccent'
              href={INTERNAL_ROUTES.domains.id.page(
                network,
                Routes.domains,
                row.original.from_chain,
              )}
            >
              <div>{capitalizeFirstLetter(row.original.from_chain)}</div>
            </Link>
          )
        },
        toChain: ({ row }: Cell<Row>) => {
          return (
            <Link
              className='hover:text-primaryAccent'
              href={INTERNAL_ROUTES.domains.id.page(network, Routes.domains, row.original.to_chain)}
            >
              <div>{capitalizeFirstLetter(row.original.to_chain)}</div>
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
      },
      {
        blockHeight: 'Block',
        timestamp: 'Time',
      },
    )
  }, [selectedColumns, network, tokenSymbol])

  const where = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions: Record<string, any> = whereForSearch

    if (domainId) {
      conditions['from_chain'] = {}
      conditions.from_chain._eq = domainId
    }

    if (subspaceAccount) {
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
  }, [domainId, subspaceAccount, whereForSearch, filters, tokenDecimals])

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
      skip: !inFocus || !isWalletConnected,
      pollInterval: 6000,
    },
    Routes.transfer,
    TABLE,
  )

  const transfers = useQueryStates((state) => state.transfer.transfers)

  const fullDataDownloader = useCallback(() => {
    return downloadFullData(apolloClient, TransferHistoryDocument, 'consensus_' + TABLE, {
      orderBy,
      where,
    })
  }, [apolloClient, orderBy, where])

  const transfersList = useMemo(() => {
    if (hasValue(transfers)) return transfers.value.consensus_transfers
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

  if (!isWalletConnected) {
    return (
      <div className='flex w-full flex-col items-center justify-center gap-4 p-8 text-center'>
        <p className='text-lg font-medium'>Please connect your wallet to view your transfers.</p>
        <WalletButton />
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-4' ref={ref}>
        <TableSettings table={TABLE} totalCount={totalCount} filters={filters} />
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
