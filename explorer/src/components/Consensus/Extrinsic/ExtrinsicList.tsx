'use client'

import { numberWithCommas } from '@/utils/number'
import { useSubscription } from '@apollo/client'
import { capitalizeFirstLetter, shortString } from '@autonomys/auto-utils'
import { CopyButton } from 'components/common/CopyButton'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { TableSettings } from 'components/common/TableSettings'
import { INTERNAL_ROUTES } from 'constants/routes'
import { FILTERS_OPTIONS } from 'constants/tables'
import {
  ExtrinsicsAggregateDocument,
  ExtrinsicsAggregateQuery,
  ExtrinsicsAggregateQueryVariables,
  ExtrinsicsDocument,
  ExtrinsicsModulesDocument,
  ExtrinsicsModulesQuery,
  ExtrinsicsModulesQueryVariables,
  ExtrinsicsSubscription,
  ExtrinsicsSubscriptionVariables,
  // eslint-disable-next-line camelcase
  Order_By,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import Link from 'next/link'
import { FC, useEffect, useMemo, useRef } from 'react'
import { useTableSettings } from 'states/tables'
import { Cell, ExtrinsicsFilters } from 'types/table'
import { getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'

type Row = ExtrinsicsSubscription['consensus_extrinsics'][0]
const TABLE = 'extrinsics'
const MAX_RECORDS = 500000

export const ExtrinsicList: FC = () => {
  const { network, section } = useIndexers()

  const {
    pagination,
    sorting,
    selectedColumns,
    filters,
    whereForSearch,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<ExtrinsicsFilters>(TABLE)

  // Ref to store previous where value for comparison
  const prevWhereRef = useRef<string | null>(null)

  const where = useMemo(
    () => ({
      ...whereForSearch,
      // Block Height
      ...((filters.blockHeightMin || filters.blockHeightMax) && {
        // eslint-disable-next-line camelcase
        block_height: {
          ...(filters.blockHeightMin && { _gte: filters.blockHeightMin }),
          ...(filters.blockHeightMax && { _lte: filters.blockHeightMax }),
        },
      }),
      // Module
      ...(filters.module && { module: { _eq: `${filters.module}` } }),
    }),
    [filters, whereForSearch],
  )

  // Effect to reset pagination when where clause changes
  useEffect(() => {
    const currentWhere = JSON.stringify(where)
    const prevWhere = prevWhereRef.current

    if (prevWhere !== null && prevWhere !== currentWhere) {
      // Reset pagination to first page when where clause changes
      onPaginationChange({ pageIndex: 0, pageSize: pagination.pageSize })
    }

    prevWhereRef.current = currentWhere
  }, [where, onPaginationChange, pagination.pageSize])

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      where,
      orderBy: {
        // eslint-disable-next-line camelcase
        block_height: Order_By.Desc,
      },
    }),
    [pagination.pageSize, pagination.pageIndex, where],
  )

  const countVariables = useMemo(
    () => ({
      where: Object.keys(where).length > 0 ? where : undefined,
    }),
    [where],
  )

  const { loading: loadingAggregate, data: dataAggregate } = useIndexersQuery<
    ExtrinsicsAggregateQuery,
    ExtrinsicsAggregateQueryVariables
  >(ExtrinsicsAggregateDocument, {
    variables: countVariables,
  })

  const { loading: loadingModules, data: dataModules } = useIndexersQuery<
    ExtrinsicsModulesQuery,
    ExtrinsicsModulesQueryVariables
  >(ExtrinsicsModulesDocument, {})

  const { loading, data } = useSubscription<
    ExtrinsicsSubscription,
    ExtrinsicsSubscriptionVariables
  >(ExtrinsicsDocument, {
    variables,
  })

  const totalCount = useMemo(
    () =>
      dataAggregate && dataAggregate.consensus_extrinsics_aggregate.aggregate
        ? dataAggregate.consensus_extrinsics_aggregate.aggregate.count
        : 0,
    [dataAggregate],
  )

  const extrinsics = useMemo(() => data && data.consensus_extrinsics, [data])
  const filtersOptions = useMemo(
    () =>
      dataModules
        ? FILTERS_OPTIONS[TABLE].map((filter) => ({
            ...filter,
            ...(filter.key === 'module' && {
              options: dataModules?.consensus_extrinsic_modules.map((m) => ({
                value: m.method,
                label: m.method + ' (' + m.section + ')',
              })),
            }),
          }))
        : undefined,
    [dataModules],
  )

  const pageCount = useMemo(() => {
    const countToUse = Object.keys(where).length > 0 ? totalCount : MAX_RECORDS
    return Math.ceil(countToUse / pagination.pageSize)
  }, [pagination.pageSize, totalCount, where])

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
          timestamp: ({ row }: Cell<Row>) => utcToLocalRelativeTime(row.original.timestamp),
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

  const isDataLoaded = useMemo(() => {
    if (countVariables.where) {
      return !loading && !loadingAggregate && !loadingModules && extrinsics
    }
    return !loading && !loadingModules && extrinsics
  }, [extrinsics, loading, loadingAggregate, loadingModules, countVariables])

  const noData = useMemo(() => {
    if (loading || loadingAggregate) return <Spinner isSmall />
    if (!data || !dataAggregate) return <NotFound />
    return null
  }, [data, dataAggregate, loading, loadingAggregate])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-0'>
        <TableSettings
          table={TABLE}
          filters={filters}
          overrideFiltersOptions={filtersOptions}
          totalCount={`(${numberWithCommas(MAX_RECORDS)}+)`}
        />
        {isDataLoaded && extrinsics ? (
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
