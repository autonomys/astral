import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  OperatorByIdQuery,
  OperatorFundsUnlockByIdDocument,
  OperatorFundsUnlockByIdQuery,
  OperatorFundsUnlockByIdQueryVariables,
  Order_By as OrderBy,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { bigNumberToFormattedString, numberWithCommas } from 'utils/number'
import { countTablePages } from 'utils/table'
import { AccountIconWithLink } from '../common/AccountIcon'
import { Spinner } from '../common/Spinner'

type Props = {
  operator: OperatorByIdQuery['staking_operators_by_pk']
}

type Row = OperatorFundsUnlockByIdQuery['staking_unlocked_events'][0]

export const OperatorFundsUnlockTable: FC<Props> = ({ operator }) => {
  const { ref, inView } = useInView()
  const { operatorId } = useParams<{ operatorId?: string }>()
  const inFocus = useWindowFocus()
  const { network, tokenSymbol } = useIndexers()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const columns = useMemo(
    () => [
      {
        accessorKey: 'account_id',
        header: 'Account Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <AccountIconWithLink
            address={row.original.account_id}
            network={network}
            section={Routes.consensus}
          />
        ),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.amount)} ${tokenSymbol}`,
      },
      {
        accessorKey: 'storage_fee',
        header: 'Storage Fee',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.storage_fee)} ${tokenSymbol}`,
      },

      {
        accessorKey: 'block_height',
        header: 'Block Height',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`block_height-${row.original.id}`}
            data-testid={`block_height-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              parseInt(row.original.block_height?.toString() ?? '0'),
            )}
            className='hover:text-primaryAccent'
          >
            <div>{row.original.block_height}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'extrinsic_id',
        header: 'Extrinsic Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`extrinsic_id-${row.original.id}`}
            data-testid={`extrinsic_id-at-${row.index}`}
            href={INTERNAL_ROUTES.extrinsics.id.page(
              network,
              Routes.consensus,
              row.original.extrinsic_id,
            )}
            className='hover:text-primaryAccent'
          >
            <div>{row.original.extrinsic_id}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'event_id',
        header: 'Event Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`event_id-${row.original.id}`}
            data-testid={`event_id-at-${row.index}`}
            href={INTERNAL_ROUTES.events.id.page(network, Routes.consensus, row.original.event_id)}
            className='hover:text-primaryAccent'
          >
            <div>{row.original.event_id}</div>
          </Link>
        ),
      },
    ],
    [network, tokenSymbol],
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

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      // eslint-disable-next-line camelcase
      where: { operator_id: { _eq: operatorId } },
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, operatorId],
  )

  const { loading, setIsVisible } = useIndexersQuery<
    OperatorFundsUnlockByIdQuery,
    OperatorFundsUnlockByIdQueryVariables
  >(
    OperatorFundsUnlockByIdDocument,
    {
      variables,
      skip: !inFocus,
      context: { clientName: 'staking' },
    },
    Routes.staking,
    'operatorFundsUnlock',
  )

  const operatorFundsUnlock = useQueryStates((state) => state.staking.operatorFundsUnlock)

  const fundsUnlock = useMemo(
    () => (hasValue(operatorFundsUnlock) ? operatorFundsUnlock.value.staking_unlocked_events : []),
    [operatorFundsUnlock],
  )

  const totalCount = useMemo(
    () =>
      hasValue(operatorFundsUnlock)
        ? operatorFundsUnlock.value.staking_unlocked_events_aggregate.aggregate?.count
        : 0,
    [operatorFundsUnlock],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const pageCount = useMemo(
    () => countTablePages(Number(totalCount), pagination.pageSize),
    [totalCount, pagination],
  )

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  if (!operator) return null

  return (
    <div ref={ref}>
      <div className='mt-5 flex w-full justify-between'>
        <div className='text-base font-medium text-grayDark dark:text-white'>{`Funds Unlock (${totalLabel})`}</div>
      </div>
      {!loading ? (
        <SortedTable
          data={fundsUnlock}
          columns={columns}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          filename='operator-funds-unlock-list'
        />
      ) : (
        <Spinner isSmall />
      )}
    </div>
  )
}
