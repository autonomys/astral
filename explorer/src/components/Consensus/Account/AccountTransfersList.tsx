/* eslint-disable camelcase */
import { utcToLocalRelativeTime } from '@/utils/time'
import { useApolloClient } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { AccountIconWithLink } from 'components/common/AccountIcon'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { Tooltip } from 'components/common/Tooltip'
import { NotFound } from 'components/layout/NotFound'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { formatUnits } from 'ethers'
import {
  Order_By as OrderBy,
  Consensus_Transfers_Select_Column as TransferColumn,
  TransfersByAccountIdDocument,
  TransfersByAccountIdQuery,
  TransfersByAccountIdQueryVariables,
  Consensus_Transfers_Bool_Exp as TransferWhere,
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

type Row = TransfersByAccountIdQuery['consensus_transfers'][0]

export const AccountTransfersList: FC<Props> = ({ accountId }) => {
  const { ref, inView } = useInView()
  const [sorting, setSorting] = useState<SortingState>([
    { id: TransferColumn.BlockHeight, desc: true },
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

  const { loading, setIsVisible } = useIndexersQuery<
    TransfersByAccountIdQuery,
    TransfersByAccountIdQueryVariables
  >(
    TransfersByAccountIdDocument,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
      context: { clientName: 'accounts' },
    },
    Routes.consensus,
    'accountTransfers',
  )

  const consensusEntry = useQueryStates((state) => state.consensus.accountTransfers)

  const transfers = useMemo(
    () => hasValue(consensusEntry) && consensusEntry.value.consensus_transfers,
    [consensusEntry],
  )

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(
        apolloClient,
        TransfersByAccountIdDocument,
        'consensus_transfers',
        variables,
      ),
    [apolloClient, variables],
  )
  const totalCount = useMemo(
    () =>
      hasValue(consensusEntry) && consensusEntry.value.consensus_transfers_aggregate.aggregate
        ? consensusEntry.value.consensus_transfers_aggregate.aggregate.count
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
          <div key={`block_height-${row.original.id}`} className='row flex items-center gap-3'>
            <Link
              data-testid={`transfer-block_height-${row.index}`}
              href={INTERNAL_ROUTES.blocks.id.page(
                network,
                Routes.consensus,
                row.original.block_height,
              )}
              className='hover:text-primaryAccent'
            >
              <div>{row.original.block_height}</div>
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
              <div>{row.original.extrinsic_id}</div>
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
          <AccountIconWithLink
            address={row.original.from}
            network={network}
            section={Routes.consensus}
          />
        ),
      },
      {
        accessorKey: 'to',
        header: 'To',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <AccountIconWithLink
            address={row.original.to}
            network={network}
            section={Routes.consensus}
          />
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
            {utcToLocalRelativeTime(row.original.timestamp)}
          </div>
        ),
      },
    ],
    [accountId, network, tokenSymbol],
  )

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!hasValue(consensusEntry)) return <NotFound />
    return null
  }, [consensusEntry, loading])

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
            filename='account-transfers-list'
            fullDataDownloader={fullDataDownloader}
          />
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
