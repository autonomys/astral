import { useApolloClient } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { NotFound } from 'components/layout/NotFound'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import dayjs from 'dayjs'
import {
  ExtrinsicsByAccountIdQuery,
  ExtrinsicsByAccountIdQueryVariables,
  Order_By as OrderBy,
} from 'gql/graphql'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { shortString } from 'utils/string'
import { countTablePages } from 'utils/table'
import { QUERY_ACCOUNT_EXTRINSICS } from './query'

type Props = {
  accountId: string
}

type Row = ExtrinsicsByAccountIdQuery['consensus_extrinsics'][0]

export const AccountExtrinsicList: FC<Props> = ({ accountId }) => {
  const { ref, inView } = useInView()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'block_height', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const { network, section } = useChains()
  const apolloClient = useApolloClient()
  const inFocus = useWindowFocus()

  // eslint-disable-next-line camelcase
  const orderBy = useMemo(() => ({ block_height: OrderBy.Desc }), [])

  const where = useMemo(
    () => ({
      signer: { _eq: accountId },
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

  const { loading, setIsVisible } = useSquidQuery<
    ExtrinsicsByAccountIdQuery,
    ExtrinsicsByAccountIdQueryVariables
  >(
    QUERY_ACCOUNT_EXTRINSICS,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    'accountExtrinsic',
  )

  const {
    consensus: { accountExtrinsic: consensusEntry },
  } = useQueryStates()

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, QUERY_ACCOUNT_EXTRINSICS, 'extrinsicsConnection', {
        orderBy,
        where,
      }),
    [apolloClient, orderBy, where],
  )

  const extrinsics = useMemo(() => data && data.consensus_extrinsics, [data])
  const totalCount = useMemo(
    () =>
      data && data.consensus_extrinsics_aggregate.aggregate
        ? data.consensus_extrinsics_aggregate.aggregate.count
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
        accessorKey: 'block.height',
        header: 'Extrinsic Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.original.id}-extrinsic-block-${row.original.index_in_block}`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(network, section, row.original.id)}
          >
            <div>{`${row.original.block_height}-${row.original.index_in_block}`}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'block.timestamp',
        header: 'Time',
        enableSorting: true,
        cell: ({ row }) => (
          <div key={`${row.original.id}-extrinsic-time-${row.index}`}>
            {dayjs(row.original.timestamp).fromNow(true)}
          </div>
        ),
      },
      {
        accessorKey: 'success',
        header: 'Status',
        enableSorting: true,
        cell: ({ row }) => (
          <div
            className='md:flex md:items-center md:justify-start md:pl-5'
            key={`${row.original.id}-home-extrinsic-status-${row.index}`}
          >
            <StatusIcon status={row.original.success} />
          </div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Action',
        enableSorting: true,
        cell: ({ row }) => (
          <div key={`${row.original.id}-extrinsic-action-${row.index}`}>
            {row.original.name.split('.')[1].toUpperCase()}
          </div>
        ),
      },
      {
        accessorKey: 'hash',
        header: 'Block hash',
        enableSorting: true,
        cell: ({ row }) => (
          <div key={`${row.original.id}-extrinsic-hash-${row.index}`}>
            <CopyButton value={row.original.hash} message='Hash copied'>
              {shortString(row.original.hash)}
            </CopyButton>
          </div>
        ),
      },
    ],
    [network, section],
  )

  const noData = useMemo(() => {
    if (loading && isLoading(consensusEntry)) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading, consensusEntry])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col sm:mt-0' ref={ref}>
      {!loading && extrinsics ? (
        <SortedTable
          data={extrinsics}
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
  )
}
