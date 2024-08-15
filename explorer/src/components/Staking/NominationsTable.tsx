'use client'

import { useApolloClient } from '@apollo/client'
import { PaginationState, SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE, TOKEN } from 'constants/'
import {
  Order_By as OrderBy,
  UserNominationsPendingActionsQuery,
  UserNominationsPendingActionsQueryVariables,
} from 'gql/types/staking'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { bigNumberToFormattedString } from 'utils/number'
import { QUERY_USER_NOMINATIONS_PENDING_ACTIONS } from './staking.query'

type Row = UserNominationsPendingActionsQuery['nominator'][0]

export const NominationsTable: FC = () => {
  const { ref, inView } = useInView()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const columns = useMemo(
    () => [
      {
        accessorKey: 'account_id',
        header: 'Account ID',
        enableSorting: true,
        cell: ({ row }: { row: { original: Row } }) => <div>{row.original.account_id}</div>,
      },
      {
        accessorKey: 'deposits',
        header: 'Deposits',
        enableSorting: false,
        cell: ({ row }: { row: { original: Row } }) => (
          <div>
            {row.original.deposits.map((deposit) => (
              <div key={deposit.id}>
                {bigNumberToFormattedString(deposit.amount)} {TOKEN.symbol}
              </div>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'withdrawals',
        header: 'Withdrawals',
        enableSorting: false,
        cell: ({ row }: { row: { original: Row } }) => (
          <div>
            {row.original.withdrawals.map((withdrawal) => (
              <div key={withdrawal.id}>
                {bigNumberToFormattedString(withdrawal.shares)} {TOKEN.symbol}
              </div>
            ))}
          </div>
        ),
      },
    ],
    [],
  )

  const orderBy = useMemo(
    () => ({ [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }),
    [sorting],
  )

  const variables: UserNominationsPendingActionsQueryVariables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where: {},
    }),
    [pagination, orderBy],
  )

  const { loading, data, setIsVisible } = useSquidQuery<
    UserNominationsPendingActionsQuery,
    UserNominationsPendingActionsQueryVariables
  >(QUERY_USER_NOMINATIONS_PENDING_ACTIONS, {
    variables,
    skip: !inView,
    pollInterval: 6000,
    context: { clientName: 'staking' },
  })

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  const nominatorsList = useMemo(() => data?.nominator || [], [data])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-4' ref={ref}>
        {!loading ? (
          <SortedTable
            data={nominatorsList}
            columns={columns}
            pageCount={1}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={setSorting}
            pagination={pagination}
            onPaginationChange={setPagination}
          />
        ) : (
          <Spinner isSmall />
        )}
      </div>
    </div>
  )
}
