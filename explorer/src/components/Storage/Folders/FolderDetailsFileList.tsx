'use client'

import { useApolloClient } from '@apollo/client'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  FolderChildrenByIdDocument,
  FolderChildrenByIdQuery,
  FolderChildrenByIdQueryVariables,
  Order_By as OrderBy,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { CIDParam } from 'types/app'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { countTablePages } from 'utils/table'

type Row = FolderChildrenByIdQuery['files_folder_cids'][number]

export const FolderDetailsFileList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section } = useIndexers()
  const { cid } = useParams<CIDParam>()
  const apolloClient = useApolloClient()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()

  const orderBy = useMemo(
    () =>
      sorting && sorting.length > 0
        ? sorting[0].id.endsWith('aggregate')
          ? { [sorting[0].id]: sorting[0].desc ? { count: OrderBy.Desc } : { count: OrderBy.Asc } }
          : { [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }
        : // eslint-disable-next-line camelcase
          { id: OrderBy.Desc },
    [sorting],
  )

  const variables = useMemo(
    () => ({
      limit: 10, // pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      cid: cid as string,
    }),
    [cid, orderBy, pagination.pageIndex, pagination.pageSize],
  )

  const { loading, setIsVisible } = useIndexersQuery<
    FolderChildrenByIdQuery,
    FolderChildrenByIdQueryVariables
  >(
    FolderChildrenByIdDocument,
    {
      variables,
      skip: !inFocus,
    },
    Routes.storage,
    'folderChildren',
  )

  const consensusEntry = useQueryStates((state) => state[Routes.storage].folderChildren)
  const cids = useMemo(
    () => (hasValue(consensusEntry) ? consensusEntry.value.files_folder_cids : []),
    [consensusEntry],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'child_cid',
        header: 'File CID',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-extrinsic-event-id`}
            className='w-full hover:text-primaryAccent'
            href={INTERNAL_ROUTES.files.id.page(network, section, row.original.child_cid)}
          >
            <div>{row.original.child_cid}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'name',
        header: 'File Name',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-extrinsic-event-action`}>{row.original.chunk?.name}</div>
        ),
      },
    ],
    [network, section],
  )

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, FolderChildrenByIdDocument, 'files_folder_cids', variables),
    [apolloClient, variables],
  )

  const totalCount = useMemo(() => (cids ? cids.length : 0), [cids])
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!hasValue(consensusEntry)) return <NotFound />
    return null
  }, [loading, consensusEntry])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='mt-5 flex w-full flex-col space-y-4 sm:mt-0' ref={ref}>
      {!loading && cids ? (
        <SortedTable
          data={cids}
          columns={columns}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          filename='extrinsic-details-event-list'
          fullDataDownloader={fullDataDownloader}
        />
      ) : (
        noData
      )}
    </div>
  )
}
