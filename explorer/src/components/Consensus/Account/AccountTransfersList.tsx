/* eslint-disable camelcase */
import { useApolloClient } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { AccountIcon } from 'components/common/AccountIcon'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { Tooltip } from 'components/common/Tooltip'
import { NotFound } from 'components/layout/NotFound'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { formatUnits } from 'ethers'
import {
  Order_By as OrderBy,
  Consensus_Transfers_Select_Column as TransferColumn,
  TransfersByAccountIdQuery,
  TransfersByAccountIdQueryVariables,
  Consensus_Transfers_Bool_Exp as TransferWhere,
} from 'gql/graphql'
import useChains from 'hooks/useChains'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber } from 'utils/number'
import { formatExtrinsicId, shortString } from 'utils/string'
import { countTablePages } from 'utils/table'
import { QUERY_ACCOUNT_TRANSFERS } from './query'

dayjs.extend(relativeTime)

type Props = {
  accountId: string
}

type Row = TransfersByAccountIdQuery['consensus_transfers'][0]

export const AccountTransfersList: FC<Props> = ({ accountId }) => {
  const { ref, inView } = useInView()
  const [sorting, setSorting] = useState<SortingState>([
    { id: TransferColumn.CreatedAt, desc: true },
  ])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')
  const { network, tokenSymbol } = useChains()
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

  const where: TransferWhere = useMemo(
    () => ({
      _or: [{ from: { _eq: accountId } }, { to: { _eq: accountId } }],
    }),
    [accountId],
  )

  const variables = useMemo(() => {
    return {
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where,
    }
  }, [orderBy, pagination.pageIndex, pagination.pageSize, where])

  const { data, loading, setIsVisible } = useSquidQuery<
    TransfersByAccountIdQuery,
    TransfersByAccountIdQueryVariables
  >(QUERY_ACCOUNT_TRANSFERS, {
    variables,
    skip: !inFocus,
    pollInterval: 6000,
    context: { clientName: 'accounts' },
  })

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, QUERY_ACCOUNT_TRANSFERS, 'extrinsicsConnection', {
        orderBy,
        where,
      }),
    [apolloClient, orderBy, where],
  )

  const transfers = useMemo(() => data && data.consensus_transfers, [data])
  const totalCount = useMemo(
    () =>
      data && data.consensus_transfers_aggregate.aggregate
        ? data.consensus_transfers_aggregate.aggregate.count
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
        accessorKey: 'extrinsic_id',
        header: 'Extrinsic',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`extrinsic_id-${row.original.id}`} className='row flex items-center gap-3'>
            <Link
              data-testid={`transfer-extrinsic_id-${row.index}`}
              href={INTERNAL_ROUTES.extrinsics.id.page(
                network,
                Routes.consensus,
                row.original.extrinsic_id,
              )}
              className='hover:text-primaryAccent'
            >
              <div>{formatExtrinsicId(row.original.extrinsic_id)}</div>
            </Link>
          </div>
        ),
      },
      {
        accessorKey: 'direction',
        header: 'Direction',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div
            key={`direction-${row.original.id}`}
            className={`row flex items-center gap-3 text-${row.original.from === accountId ? 'red-500' : 'greenBright'}`}
          >
            {row.original.from === accountId ? 'Sent' : 'Received'}
          </div>
        ),
      },
      {
        accessorKey: 'from',
        header: 'From',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`from-${row.original.id}`} className='row flex items-center gap-3'>
            {isLargeLaptop && <AccountIcon address={row.original.from} size={26} />}
            <Link
              data-testid={`transfer-from-${row.index}`}
              href={INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, row.original.from)}
              className='hover:text-primaryAccent'
            >
              <div>{shortString(row.original.from)}</div>
            </Link>
          </div>
        ),
      },
      {
        accessorKey: 'to',
        header: 'To',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`to-${row.original.id}`} className='row flex items-center gap-3'>
            {isLargeLaptop && <AccountIcon address={row.original.to} size={26} />}
            <Link
              data-testid={`transfer-to-${row.index}`}
              href={INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, row.original.to)}
              className='hover:text-primaryAccent'
            >
              <div>{shortString(row.original.to)}</div>
            </Link>
          </div>
        ),
      },
      {
        accessorKey: 'value',
        header: 'Amount',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.original.id}-value-${row.index}`}>
            <Tooltip text={`${formatUnits(row.original.value)} ${tokenSymbol}`}>
              {`${bigNumberToNumber(row.original.value)} ${tokenSymbol}`}
            </Tooltip>
          </div>
        ),
      },
      {
        accessorKey: 'fee',
        header: 'Fee paid',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.original.id}-fee-${row.index}`}>
            <Tooltip text={`${formatUnits(row.original.fee)} ${tokenSymbol}`}>
              {`${bigNumberToNumber(row.original.fee, 6)} ${tokenSymbol}`}
            </Tooltip>
          </div>
        ),
      },
      {
        accessorKey: 'success',
        header: 'Status',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div
            className='md:flex md:items-center md:justify-start md:pl-5'
            key={`${row.original.id}-home-extrinsic-status-${row.index}`}
          >
            <StatusIcon status={row.original.success} />
          </div>
        ),
      },
      {
        accessorKey: 'date',
        header: 'Date',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.original.id}-created_at-${row.index}`}>
            {dayjs(row.original.date).fromNow(true)} ago
          </div>
        ),
      },
    ],
    [accountId, isLargeLaptop, network, tokenSymbol],
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
        {!loading && transfers ? (
          <SortedTable
            data={transfers}
            columns={columns}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={setSorting}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={setPagination}
            filename='account-extrinsic-list'
            fullDataDownloader={fullDataDownloader}
          />
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
