'use client'

import { numberWithCommas } from '@/utils/number'
import { useQuery, useSubscription } from '@apollo/client'
import { capitalizeFirstLetter, shortString } from '@autonomys/auto-utils'
import { CopyButton } from 'components/common/CopyButton'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { TableSettings } from 'components/common/TableSettings'
import { Tooltip } from 'components/common/Tooltip'
import { INTERNAL_ROUTES } from 'constants/routes'
import {
  ExtrinsicsDocument,
  ExtrinsicsSubscription,
  ExtrinsicsSubscriptionVariables,
  // eslint-disable-next-line camelcase
  Order_By,
  SearchExtrinsicsByBlockHashDocument,
  SearchExtrinsicsByBlockHashQuery,
  SearchExtrinsicsByBlockHashQueryVariables,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { useTableSettings } from 'states/tables'
import { Cell, ExtrinsicsFilters } from 'types/table'
import { getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime, utcToLocalTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'

type Row = ExtrinsicsSubscription['consensus_extrinsics'][0]
const TABLE = 'extrinsics'
let MAX_RECORDS = 500000

export const ExtrinsicList: FC = () => {
  const { network, section } = useIndexers()

  const {
    pagination,
    sorting,
    selectedColumns,
    filters,
    stringForSearch,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<ExtrinsicsFilters>(TABLE)

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,

      orderBy: {
        // eslint-disable-next-line camelcase
        block_height: Order_By.Desc,
      },
    }),
    [pagination.pageSize, pagination.pageIndex],
  )

  const { loading, data } = useSubscription<
    ExtrinsicsSubscription,
    ExtrinsicsSubscriptionVariables
  >(ExtrinsicsDocument, {
    variables,
  })

  const { loading: loadingSearch, data: dataSearch } = useQuery<
    SearchExtrinsicsByBlockHashQuery,
    SearchExtrinsicsByBlockHashQueryVariables
  >(SearchExtrinsicsByBlockHashDocument, {
    variables: {
      search: (stringForSearch as { block_hash: string })?.block_hash,
      limit: 10,
    },
  })

  const extrinsics = useMemo(() => {
    if (dataSearch) return dataSearch.consensus_search_extrinsics_by_block_hash
    if (data) return data.consensus_extrinsics
    return []
  }, [data, dataSearch])

  const pageCount = useMemo(() => {
    if (dataSearch) {
      MAX_RECORDS =
        dataSearch.consensus_search_extrinsics_by_block_hash_aggregate?.aggregate?.count ?? 0
    }
    return Math.ceil(MAX_RECORDS / pagination.pageSize)
  }, [dataSearch, pagination.pageSize])

  const columns = useMemo(
    () =>
      getTableColumns<Row>(
        TABLE,
        selectedColumns,
        {
          sortId: ({ row }: Cell<Row>) => (
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
          hash: ({ row }: Cell<Row>) => (
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
          blockHash: ({ row }: Cell<Row>) => (
            <CopyButton value={row.original.blockHash} message='Block hash copied'>
              {shortString(row.original.blockHash)}
            </CopyButton>
          ),
          success: ({ row }: Cell<Row>) => <StatusIcon status={row.original.success} />,
        },
        {},
        {
          sortId: false,
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

  const noData = useMemo(() => {
    if (loading || loadingSearch) return <Spinner isSmall />
    if (!data && !dataSearch) return <NotFound />
    return null
  }, [data, loading, loadingSearch, dataSearch])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-0'>
        <TableSettings
          table={TABLE}
          filters={filters}
          overrideFiltersOptions={[]}
          totalCount={`(${numberWithCommas(MAX_RECORDS)}+)`}
        />
        {!loading && !loadingSearch && extrinsics ? (
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
          />
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
