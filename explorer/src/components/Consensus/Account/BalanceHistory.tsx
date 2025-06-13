/* eslint-disable camelcase */
import { useApolloClient } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Tooltip } from 'components/common/Tooltip'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { formatUnits } from 'ethers'
import {
  BalanceHistoryByAccountIdDocument,
  BalanceHistoryByAccountIdQuery,
  BalanceHistoryByAccountIdQueryVariables,
  Consensus_Account_Histories_Select_Column as BalanceHistoryColumn,
  Consensus_Account_Histories_Bool_Exp as BalanceHistoryWhere,
  Order_By as OrderBy,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber } from 'utils/number'
import { countTablePages } from 'utils/table'

type Props = {
  accountId: string
}

type Row = BalanceHistoryByAccountIdQuery['consensus_account_histories'][0]

export const BalanceHistory: FC<Props> = ({ accountId }) => {
  const { ref, inView } = useInView()
  const [sorting, setSorting] = useState<SortingState>([
    { id: BalanceHistoryColumn.CreatedAt, desc: true },
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

  const where: BalanceHistoryWhere = useMemo(() => ({ id: { _eq: accountId } }), [accountId])

  const variables = useMemo(() => {
    return {
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where,
    }
  }, [orderBy, pagination.pageIndex, pagination.pageSize, where])

  const { loading, setIsVisible } = useIndexersQuery<
    BalanceHistoryByAccountIdQuery,
    BalanceHistoryByAccountIdQueryVariables
  >(
    BalanceHistoryByAccountIdDocument,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    'accountBalanceHistory',
  )

  const consensusEntry = useQueryStates((state) => state.consensus.accountBalanceHistory)

  const histories = useMemo(
    () => hasValue(consensusEntry) && consensusEntry.value.consensus_account_histories,
    [consensusEntry],
  )

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(
        apolloClient,
        BalanceHistoryByAccountIdDocument,
        'consensus_account_histories',
        variables,
      ),
    [apolloClient, variables],
  )

  const totalCount = useMemo(
    () =>
      hasValue(consensusEntry) && consensusEntry.value.consensus_account_histories_aggregate
        ? consensusEntry.value.consensus_account_histories_aggregate.aggregate?.count
        : 0,
    [consensusEntry],
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

  const isDataLoading = useMemo(() => {
    if (loading || isLoading(consensusEntry) || !histories) return true
    return false
  }, [consensusEntry, loading, histories])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col sm:mt-0'>
      <div ref={ref}>
        <SortedTable
          data={histories || []}
          columns={columns}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          filename='account-balance-history'
          fullDataDownloader={fullDataDownloader}
          loading={isDataLoading}
          emptyMessage='No balance history found'
        />
      </div>
    </div>
  )
}
