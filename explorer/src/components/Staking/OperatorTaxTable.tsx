import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  OperatorByIdQuery,
  OperatorTaxCollectedByIdDocument,
  OperatorTaxCollectedByIdQuery,
  OperatorTaxCollectedByIdQueryVariables,
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
import { Spinner } from '../common/Spinner'

type Props = {
  operator: OperatorByIdQuery['staking_operators_by_pk']
}

type Row = OperatorTaxCollectedByIdQuery['staking_operator_tax_collections'][0]

export const OperatorTaxTable: FC<Props> = ({ operator }) => {
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
        accessorKey: 'domain_id',
        header: 'Domain Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.domains.id.page(network, Routes.domains, row.original.domain_id)}
          >
            <div>{row.original.domain_id}</div>
          </Link>
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
    OperatorTaxCollectedByIdQuery,
    OperatorTaxCollectedByIdQueryVariables
  >(
    OperatorTaxCollectedByIdDocument,
    {
      variables,
      skip: !inFocus,
      context: { clientName: 'staking' },
    },
    Routes.staking,
    'operatorRewards',
  )

  const operatorTaxCollected = useQueryStates((state) => state.staking.operatorTaxCollected)

  const taxCollected = useMemo(
    () =>
      hasValue(operatorTaxCollected)
        ? operatorTaxCollected.value.staking_operator_tax_collections
        : [],
    [operatorTaxCollected],
  )

  const totalCount = useMemo(
    () =>
      hasValue(operatorTaxCollected)
        ? operatorTaxCollected.value.staking_operator_tax_collections_aggregate?.aggregate?.count
        : 0,
    [operatorTaxCollected],
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
        <div className='text-base font-medium text-grayDark dark:text-white'>{`Tax Collected (${totalLabel})`}</div>
      </div>
      {!loading ? (
        <SortedTable
          data={taxCollected}
          columns={columns}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          filename='operator-rewards-list'
        />
      ) : (
        <Spinner isSmall />
      )}
    </div>
  )
}
