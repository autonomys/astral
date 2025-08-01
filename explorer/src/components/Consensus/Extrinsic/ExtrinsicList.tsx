'use client'

import { numberWithCommas } from '@/utils/number'
import { useQuery, useSubscription } from '@apollo/client'
import { capitalizeFirstLetter, isHex, shortString } from '@autonomys/auto-utils'
import { CopyButton } from 'components/common/CopyButton'
import { SortedTable } from 'components/common/SortedTable'
import { StatusIcon } from 'components/common/StatusIcon'
import { TableSettings } from 'components/common/TableSettings'
import { Tooltip } from 'components/common/Tooltip'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  ExtrinsicsByBlockHashDocument,
  ExtrinsicsByBlockHashQuery,
  ExtrinsicsByBlockHashQueryVariables,
  ExtrinsicsDocument,
  ExtrinsicsSubscription,
  ExtrinsicsSubscriptionVariables,
  // eslint-disable-next-line camelcase
  Order_By,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useMemo } from 'react'
import { useTableSettings } from 'states/tables'
import { Cell, ExtrinsicsFilters } from 'types/table'
import { getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime, utcToLocalTime } from 'utils/time'

type Row =
  | ExtrinsicsSubscription['consensus_extrinsics'][0]
  | ExtrinsicsByBlockHashQuery['consensus_blocks'][0]['extrinsics'][0]
const TABLE = 'extrinsics'
const MAX_RECORDS = 500000

export const ExtrinsicList: FC = () => {
  const { network, section } = useIndexers()
  const { push } = useRouter()

  const {
    pagination,
    sorting,
    selectedColumns,
    filters,
    stringForSearch,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<ExtrinsicsFilters>(TABLE)

  // Handle custom search for unique identifiers
  const handleSearchSubmit = useCallback(
    (columnName: string, value: string): boolean => {
      if (value.trim()) {
        // Extrinsic hash search - navigate directly
        if (columnName === 'extrinsicHash' && isHex(value.trim())) {
          push(INTERNAL_ROUTES.extrinsics.id.page(network, Routes.consensus, value.trim()))
          return true // Handled
        }
      }

      return false // Not handled, use default behavior
    },
    [network, push],
  )

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      where: stringForSearch,
      orderBy: [
        // eslint-disable-next-line camelcase
        { block_height: Order_By.Desc },
        // eslint-disable-next-line camelcase
        { index_in_block: Order_By.Asc },
      ],
    }),
    [pagination.pageSize, pagination.pageIndex, stringForSearch],
  )

  const { loading, data } = useSubscription<
    ExtrinsicsSubscription,
    ExtrinsicsSubscriptionVariables
  >(ExtrinsicsDocument, {
    variables,
    skip: Object.keys(stringForSearch).length > 0,
  })

  const { data: dataByBlockHash, loading: loadingByBlockHash } = useQuery<
    ExtrinsicsByBlockHashQuery,
    ExtrinsicsByBlockHashQueryVariables
  >(ExtrinsicsByBlockHashDocument, {
    variables: {
      where: stringForSearch,
      limit: 1,
      offset: 0,
    },
    skip: Object.keys(stringForSearch).length === 0,
  })

  const currentTotalRecords = useMemo(() => {
    if (Object.keys(stringForSearch).length > 0 && dataByBlockHash) {
      return dataByBlockHash.consensus_blocks[0]?.extrinsics?.length ?? 0
    }
    return MAX_RECORDS
  }, [dataByBlockHash, stringForSearch])

  const extrinsics = useMemo(() => {
    if (Object.keys(stringForSearch).length > 0 && dataByBlockHash)
      return (
        dataByBlockHash.consensus_blocks[0]?.extrinsics?.slice(
          pagination.pageIndex * pagination.pageSize,
          (pagination.pageIndex + 1) * pagination.pageSize,
        ) ?? []
      )
    if (data) return data.consensus_extrinsics ?? []
    return []
  }, [data, dataByBlockHash, pagination.pageIndex, pagination.pageSize, stringForSearch])

  const pageCount = useMemo(() => {
    return Math.ceil(currentTotalRecords / pagination.pageSize)
  }, [currentTotalRecords, pagination.pageSize])

  const columns = useMemo(
    () =>
      getTableColumns<Row>(
        TABLE,
        selectedColumns,
        {
          id: ({ row }: Cell<Row>) => (
            <Link
              key={`${row.index}-extrinsic-id`}
              className='w-full whitespace-nowrap hover:text-primaryAccent'
              href={INTERNAL_ROUTES.extrinsics.id.page(network, section, row.original.id)}
            >
              <div>{row.original.id}</div>
            </Link>
          ),
          timestamp: ({ row }: Cell<Row>) => (
            <Tooltip text={utcToLocalTime(row.original.timestamp)}>
              <div>{utcToLocalRelativeTime(row.original.timestamp)}</div>
            </Tooltip>
          ),
          extrinsicHash: ({ row }: Cell<Row>) => (
            <CopyButton value={row.original.hash} message='Hash copied'>
              {shortString(row.original.hash)}
            </CopyButton>
          ),
          section: ({ row }: Cell<Row>) => capitalizeFirstLetter(row.original.section),
          module: ({ row }: Cell<Row>) => capitalizeFirstLetter(row.original.module),
          blockHeight: ({ row }: Cell<Row>) => (
            <Link
              key={`${row.index}-extrinsic-block_height`}
              className='hover:text-primaryAccent'
              href={INTERNAL_ROUTES.blocks.id.page(network, section, row.original.blockHeight)}
            >
              <div>{numberWithCommas(row.original.blockHeight)}</div>
            </Link>
          ),
          hash: ({ row }: Cell<Row>) => (
            <CopyButton value={row.original.blockHash} message='Block hash copied'>
              {shortString(row.original.blockHash)}
            </CopyButton>
          ),
          success: ({ row }: Cell<Row>) => <StatusIcon status={row.original.success} />,
        },
        {},
        {
          id: false,
          blockHeight: false,
          hash: false,
          section: false,
          module: false,
          timestamp: false,
          success: false,
        },
      ),
    [network, section, selectedColumns],
  )

  const isDataLoaded = useMemo(() => {
    if (Object.keys(stringForSearch).length > 0) {
      return !loadingByBlockHash
    }
    return !loading && extrinsics.length
  }, [loading, loadingByBlockHash, stringForSearch, extrinsics])

  const isDataLoading = useMemo(() => {
    if (loading || loadingByBlockHash || !isDataLoaded) return true
    return false
  }, [loading, loadingByBlockHash, isDataLoaded])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-0'>
        <TableSettings
          table={TABLE}
          filters={filters}
          overrideFiltersOptions={[]}
          onSearchSubmit={handleSearchSubmit}
          totalCount={`(${numberWithCommas(currentTotalRecords)}${currentTotalRecords === MAX_RECORDS && Object.keys(stringForSearch).length === 0 ? '+' : ''})`}
        />
        <SortedTable
          data={extrinsics}
          columns={columns}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={onSortingChange}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={onPaginationChange}
          filename={TABLE}
          loading={isDataLoading}
          emptyMessage='No extrinsics found'
        />
      </div>
    </div>
  )
}
