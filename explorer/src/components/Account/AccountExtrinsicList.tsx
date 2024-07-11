/* eslint-disable camelcase */
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
  Extrinsic,
  ExtrinsicOrderByInput,
  ExtrinsicWhereInput,
  ExtrinsicsByAccountIdQuery,
  ExtrinsicsByAccountIdQueryVariables,
} from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { downloadFullData } from 'utils/downloadFullData'
import { sort } from 'utils/sort'
import { shortString } from 'utils/string'
import { AccountExtrinsicFilterDropdown } from './AccountExtrinsicFilterDropdown'
import { QUERY_ACCOUNT_EXTRINSICS } from './query'

type Props = {
  accountId: string
}

type Row = {
  row: {
    index: number
    original: Extrinsic
  }
}

export const AccountExtrinsicList: FC<Props> = ({ accountId }) => {
  const { ref, inView } = useInView()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'block_height', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const [filters, setFilters] = useState<ExtrinsicWhereInput>({})

  const { selectedChain, selectedDomain } = useDomains()
  const apolloClient = useApolloClient()
  const inFocus = useWindowFocus()

  const orderBy = useMemo(
    () => sort(sorting, ExtrinsicOrderByInput.BlockHeightDesc) as ExtrinsicOrderByInput,
    [sorting],
  )

  const variables = useMemo(() => {
    return {
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
      orderBy,
      where: {
        ...filters,
        signer: {
          id_eq: accountId,
        },
      },
    }
  }, [accountId, filters, orderBy, pagination.pageIndex, pagination.pageSize])

  const { setIsVisible } = useSquidQuery<
    ExtrinsicsByAccountIdQuery,
    ExtrinsicsByAccountIdQueryVariables
  >(
    QUERY_ACCOUNT_EXTRINSICS,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    selectedChain?.isDomain ? Routes.nova : Routes.consensus,
    'accountExtrinsic',
  )

  const {
    consensus: { accountExtrinsic: consensusEntry },
    consensus: { accountExtrinsic: evmEntry },
  } = useQueryStates()

  const loading = useMemo(() => {
    if (selectedChain?.isDomain) return isLoading(evmEntry)
    return isLoading(consensusEntry)
  }, [evmEntry, consensusEntry, selectedChain])

  const data = useMemo(() => {
    if (selectedChain?.isDomain && hasValue(evmEntry)) return evmEntry.value
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry, evmEntry, selectedChain])

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, QUERY_ACCOUNT_EXTRINSICS, 'extrinsicsConnection', { orderBy }),
    [apolloClient, orderBy],
  )

  const extrinsicsConnection = useMemo(() => data && data.extrinsicsConnection, [data])
  const extrinsics = useMemo(
    () =>
      extrinsicsConnection &&
      extrinsicsConnection.edges.map((extrinsic) => extrinsic.node as Extrinsic),
    [extrinsicsConnection],
  )
  const totalCount = useMemo(
    () => extrinsicsConnection && extrinsicsConnection.totalCount,
    [extrinsicsConnection],
  )
  const pageCount = useMemo(
    () => (totalCount ? Math.floor(totalCount / pagination.pageSize) : 0),
    [totalCount, pagination.pageSize],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'block.height',
        header: 'Extrinsic Id',
        enableSorting: true,
        cell: ({ row }: Row) => (
          <Link
            key={`${row.original.id}-extrinsic-block-${row.original.indexInBlock}`}
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(
              selectedChain.urls.page,
              selectedDomain,
              row.original.id,
            )}
          >
            <div>{`${row.original.block.height}-${row.original.indexInBlock}`}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'block.timestamp',
        header: 'Time',
        enableSorting: true,
        cell: ({ row }) => (
          <div key={`${row.original.id}-extrinsic-time-${row.index}`}>
            {dayjs(row.original.block.timestamp).fromNow(true)}
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
    [selectedDomain, selectedChain],
  )

  const noData = useMemo(() => {
    if (loading) return <Spinner />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='mt-5 flex w-full flex-col align-middle'>
      <div className='mt-6 rounded-[20px] bg-white p-6 dark:border-none dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset'>
        <div className='flex w-full justify-center gap-2'>
          <div className='text-sm text-purpleShade2 dark:text-white/75'>Action Filter:</div>
          <AccountExtrinsicFilterDropdown filters={filters} setFilters={setFilters} />
        </div>
      </div>
      <div className='my-6 rounded' ref={ref}>
        {extrinsics ? (
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
    </div>
  )
}
