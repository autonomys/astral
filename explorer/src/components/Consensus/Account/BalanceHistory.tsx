/* eslint-disable camelcase */
import { useApolloClient } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { Tooltip } from 'components/common/Tooltip'
import { NotFound } from 'components/layout/NotFound'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { formatUnits } from 'ethers'
import {
  BalanceHistoryByAccountIdQuery,
  BalanceHistoryByAccountIdQueryVariables,
  Order_By as OrderBy,
  Consensus_Transfers_Select_Column as TransferColumn,
  Consensus_Transfers_Bool_Exp as TransferWhere,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber } from 'utils/number'
import { countTablePages } from 'utils/table'
import { QUERY_ACCOUNT_BALANCE_HISTORY } from './query'

type Props = {
  accountId: string
}

type Row = BalanceHistoryByAccountIdQuery['consensus_account_histories'][0]

export const BalanceHistory: FC<Props> = ({ accountId }) => {
  const { ref, inView } = useInView()
  const [sorting, setSorting] = useState<SortingState>([
    { id: TransferColumn.CreatedAt, desc: true },
  ])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const { network, tokenSymbol } = useIndexers()
  const apolloClient = useApolloClient()
  const inFocus = useWindowFocus()

  const orderBy = useMemo(
    () =>
      sorting && sorting.length > 0
        ? sorting[0].id.endsWith('aggregate')
          ? { [sorting[0].id]: sorting[0].desc ? { count: OrderBy.Desc } : { count: OrderBy.Asc } }
          : { [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }
        : { id: OrderBy.Asc },
    [sorting],
  )

  const where: TransferWhere = useMemo(() => ({ id: { _eq: accountId } }), [accountId])

  const variables = useMemo(() => {
    return {
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where,
    }
  }, [orderBy, pagination.pageIndex, pagination.pageSize, where])

  const { data, loading, setIsVisible } = useIndexersQuery<
    BalanceHistoryByAccountIdQuery,
    BalanceHistoryByAccountIdQueryVariables
  >(QUERY_ACCOUNT_BALANCE_HISTORY, {
    variables,
    skip: !inFocus,
    pollInterval: 6000,
  })

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(
        apolloClient,
        QUERY_ACCOUNT_BALANCE_HISTORY,
        'consensus_account_histories',
        variables,
      ),
    [apolloClient, variables],
  )

  const histories = useMemo(() => data && data.consensus_account_histories, [data])
  const totalCount = useMemo(
    () =>
      data && data.consensus_account_histories_aggregate
        ? data.consensus_account_histories_aggregate.aggregate?.count
        : 0,
    [data],
  )
  const pageCount = useMemo(
    () => (totalCount ? countTablePages(totalCount, pagination.pageSize) : 0),
    [totalCount, pagination.pageSize],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'created_at',
        header: 'Block',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`created_at-${row.original.id}`} className='row flex items-center gap-3'>
            <Link
              data-testid={`transfer-created_at-${row.index}`}
              href={INTERNAL_ROUTES.blocks.id.page(
                network,
                Routes.consensus,
                row.original.created_at,
              )}
              className='hover:text-primaryAccent'
            >
              <div>{row.original.created_at}</div>
            </Link>
          </div>
        ),
      },
      {
        accessorKey: 'nonce',
        header: 'Nonce',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.original.id}-nonce-${row.index}`}>{row.original.nonce}</div>
        ),
      },
      {
        accessorKey: 'free',
        header: 'Free',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.original.id}-free-${row.index}`}>
            <Tooltip text={`${formatUnits(row.original.free)} ${tokenSymbol}`}>
              {`${bigNumberToNumber(row.original.free, 6)} ${tokenSymbol}`}
            </Tooltip>
          </div>
        ),
      },
      {
        accessorKey: 'reserved',
        header: 'Reserved',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.original.id}-reserved-${row.index}`}>
            <Tooltip text={`${formatUnits(row.original.reserved)} ${tokenSymbol}`}>
              {`${bigNumberToNumber(row.original.reserved, 6)} ${tokenSymbol}`}
            </Tooltip>
          </div>
        ),
      },
      {
        accessorKey: 'total',
        header: 'Total',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.original.id}-total-${row.index}`}>
            <Tooltip text={`${formatUnits(row.original.total)} ${tokenSymbol}`}>
              {`${bigNumberToNumber(row.original.total, 6)} ${tokenSymbol}`}
            </Tooltip>
          </div>
        ),
      },
    ],
    [network, tokenSymbol],
  )

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col sm:mt-0'>
      <div ref={ref}>
        {!loading && histories ? (
          <SortedTable
            data={histories}
            columns={columns}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={setSorting}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={setPagination}
            filename='account-balance-history'
            fullDataDownloader={fullDataDownloader}
          />
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
