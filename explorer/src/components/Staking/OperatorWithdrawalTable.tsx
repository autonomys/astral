import { utcToLocalRelativeTime } from '@/utils/time'
import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  OperatorByIdQuery,
  OperatorWithdrawalsByIdDocument,
  OperatorWithdrawalsByIdQuery,
  OperatorWithdrawalsByIdQueryVariables,
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
import { bigNumberToFormattedString, numberFormattedString, numberWithCommas } from 'utils/number'
import { countTablePages } from 'utils/table'
import { AccountIconWithLink } from '../common/AccountIcon'
import { Spinner } from '../common/Spinner'

type Props = {
  operator: OperatorByIdQuery['staking_operators_by_pk']
  withdrawalsCount: number
}

type Row = OperatorWithdrawalsByIdQuery['staking_withdrawals'][0]

export const OperatorWithdrawalTable: FC<Props> = ({ operator, withdrawalsCount }) => {
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
        accessorKey: 'shares',
        header: 'Shares',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => bigNumberToFormattedString(row.original.shares),
      },
      {
        accessorKey: 'storage_fee_refund',
        header: 'Storage Fee Refund',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.storage_fee_refund)} ${tokenSymbol}`,
      },
      {
        accessorKey: 'estimated_amount',
        header: 'Estimated Amount',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.estimated_amount)} ${tokenSymbol}`,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => <div>{row.original.status}</div>,
      },
      {
        accessorKey: 'timestamp',
        header: 'Timestamp',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => <div>{utcToLocalRelativeTime(row.original.timestamp)}</div>,
      },
      {
        accessorKey: 'withdraw_extrinsic_id',
        header: 'Extrinsic Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`withdraw_extrinsic_id-${row.original.id}`}
            data-testid={`withdraw_extrinsic_id-at-${row.index}`}
            href={INTERNAL_ROUTES.extrinsics.id.page(
              network,
              Routes.consensus,
              row.original.withdraw_extrinsic_id,
            )}
            className='hover:text-primaryAccent'
          >
            <div>{row.original.withdraw_extrinsic_id}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'epoch_withdrawal_requested_at',
        header: 'Epoch Requested At',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.epoch_withdrawal_requested_at)}</div>
        ),
      },
      {
        accessorKey: 'domain_block_number_withdrawal_requested_at',
        header: 'Domain Block Requested At',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>
            {numberFormattedString(row.original.domain_block_number_withdrawal_requested_at)}
          </div>
        ),
      },
      {
        accessorKey: 'created_at',
        header: 'Created At',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`created_at-${row.original.id}`}
            data-testid={`created_at-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              parseInt(row.original.created_at?.toString() ?? '0'),
            )}
            className='hover:text-primaryAccent'
          >
            <div>{row.original.created_at}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'domain_block_number_ready_at',
        header: 'Domain Block Ready At',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.domain_block_number_ready_at)}</div>
        ),
      },
      {
        accessorKey: 'updated_at',
        header: 'Updated At',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`updated_at-${row.original.id}`}
            data-testid={`updated_at-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              parseInt(row.original.updated_at?.toString() ?? '0'),
            )}
            className='hover:text-primaryAccent'
          >
            <div>{row.original.updated_at}</div>
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
    OperatorWithdrawalsByIdQuery,
    OperatorWithdrawalsByIdQueryVariables
  >(
    OperatorWithdrawalsByIdDocument,
    {
      variables,
      skip: !inFocus,
      context: { clientName: 'staking' },
    },
    Routes.staking,
    'operatorWithdrawals',
  )

  const operatorWithdrawals = useQueryStates((state) => state.staking.operatorWithdrawals)

  const withdrawals = useMemo(
    () => (hasValue(operatorWithdrawals) ? operatorWithdrawals.value.staking_withdrawals : []),
    [operatorWithdrawals],
  )

  const totalLabel = useMemo(() => numberWithCommas(withdrawalsCount), [withdrawalsCount])
  const pageCount = useMemo(
    () => countTablePages(withdrawalsCount, pagination.pageSize),
    [withdrawalsCount, pagination],
  )

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  if (!operator) return null

  return (
    <div ref={ref}>
      <div className='mt-5 flex w-full justify-between'>
        <div className='text-base font-medium text-grayDark dark:text-white'>{`Withdrawals (${totalLabel})`}</div>
      </div>
      {!loading ? (
        <SortedTable
          data={withdrawals}
          columns={columns}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          filename='operator-withdrawals-list'
        />
      ) : (
        <Spinner isSmall />
      )}
    </div>
  )
}
