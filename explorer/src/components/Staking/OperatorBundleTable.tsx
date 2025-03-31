import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  OperatorBundlesByIdDocument,
  OperatorBundlesByIdQuery,
  OperatorBundlesByIdQueryVariables,
  OperatorByIdQuery,
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
import { Spinner } from '../common/Spinner'

type Props = {
  operator: OperatorByIdQuery['staking_operators_by_pk']
  bundlesCount: number
}

type Row = OperatorBundlesByIdQuery['staking_bundle_submissions'][0]

export const OperatorBundleTable: FC<Props> = ({ operator, bundlesCount }) => {
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
        accessorKey: 'domain_block_number',
        header: 'Domain Block Number',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => row.original.domain_block_number,
      },
      {
        accessorKey: 'epoch',
        header: 'Epoch',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => row.original.epoch,
      },
      {
        accessorKey: 'total_transfers_in',
        header: 'Total Transfers In',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.total_transfers_in)} ${tokenSymbol}`,
      },
      {
        accessorKey: 'transfers_in_count',
        header: 'Transfers In Count',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => numberFormattedString(row.original.transfers_in_count),
      },
      {
        accessorKey: 'total_transfers_out',
        header: 'Total Transfers Out',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.total_transfers_out)} ${tokenSymbol}`,
      },
      {
        accessorKey: 'transfers_out_count',
        header: 'Transfers Out Count',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => numberFormattedString(row.original.transfers_out_count),
      },
      {
        accessorKey: 'total_rejected_transfers_claimed',
        header: 'Total Rejected Transfers Claimed',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.total_rejected_transfers_claimed)} ${tokenSymbol}`,
      },
      {
        accessorKey: 'total_transfers_rejected',
        header: 'Total Transfers Rejected',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.total_transfers_rejected)} ${tokenSymbol}`,
      },
      {
        accessorKey: 'transfers_rejected_count',
        header: 'Transfers Rejected Count',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => numberFormattedString(row.original.transfers_rejected_count),
      },
      {
        accessorKey: 'total_volume',
        header: 'Total Volume',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.total_volume)} ${tokenSymbol}`,
      },
      {
        accessorKey: 'consensus_storage_fee',
        header: 'Consensus Storage Fee',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.consensus_storage_fee)} ${tokenSymbol}`,
      },
      {
        accessorKey: 'domain_execution_fee',
        header: 'Domain Execution Fee',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.domain_execution_fee)} ${tokenSymbol}`,
      },
      {
        accessorKey: 'burned_balance',
        header: 'Burned Balance',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) =>
          `${bigNumberToFormattedString(row.original.burned_balance)} ${tokenSymbol}`,
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
    OperatorBundlesByIdQuery,
    OperatorBundlesByIdQueryVariables
  >(
    OperatorBundlesByIdDocument,
    {
      variables,
      skip: !inFocus,
      context: { clientName: 'staking' },
    },
    Routes.staking,
    'operatorBundles',
  )

  const operatorBundles = useQueryStates((state) => state.staking.operatorBundles)

  const bundles = useMemo(
    () => (hasValue(operatorBundles) ? operatorBundles.value.staking_bundle_submissions : []),
    [operatorBundles],
  )

  const totalLabel = useMemo(() => numberWithCommas(bundlesCount), [bundlesCount])
  const pageCount = useMemo(
    () => countTablePages(bundlesCount, pagination.pageSize),
    [bundlesCount, pagination],
  )

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  if (!operator) return null

  return (
    <div ref={ref}>
      <div className='mt-5 flex w-full justify-between'>
        <div className='text-base font-medium text-grayDark dark:text-white'>{`Bundles (${totalLabel})`}</div>
      </div>
      {!loading ? (
        <SortedTable
          data={bundles}
          columns={columns}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          filename='operator-bundles-list'
        />
      ) : (
        <Spinner isSmall />
      )}
    </div>
  )
}
