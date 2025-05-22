'use client'

import { useSubscription } from '@apollo/client'
import { capitalizeFirstLetter, shortString } from '@autonomys/auto-utils'
import { AccountIconWithLink } from 'components/common/AccountIcon'
import { CopyButton } from 'components/common/CopyButton'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { TableSettings } from 'components/common/TableSettings'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { FILTERS_OPTIONS } from 'constants/tables'
import {
  ExtrinsicsCountAndModulesDocument,
  ExtrinsicsCountAndModulesQuery,
  ExtrinsicsCountAndModulesQueryVariables,
  ExtrinsicsDocument,
  ExtrinsicsSubscription,
  ExtrinsicsSubscriptionVariables,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import Link from 'next/link'
import { FC, useMemo } from 'react'
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
    orderBy,
    whereForSearch,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<ExtrinsicsFilters>(TABLE)

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
      // Section
      ...(filters.section && { section: { _eq: `${filters.section}` } }),
      // Module
      ...(filters.module && { module: { _eq: `${filters.module}` } }),
    }),
    [filters, whereForSearch],
  )

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      where,
      orderBy,
    }),
    [pagination.pageSize, pagination.pageIndex, where, orderBy],
  )

  const { loading: loadingCountAndModules, data: dataCountAndModules } = useIndexersQuery<
    ExtrinsicsCountAndModulesQuery,
    ExtrinsicsCountAndModulesQueryVariables
  >(ExtrinsicsCountAndModulesDocument, {
    variables,
  })

  const { loading, data } = useSubscription<
    ExtrinsicsSubscription,
    ExtrinsicsSubscriptionVariables
  >(ExtrinsicsDocument, {
    variables,
  })

  const totalCount = useMemo(
    () =>
      dataCountAndModules && dataCountAndModules.consensus_extrinsics_aggregate.aggregate
        ? dataCountAndModules.consensus_extrinsics_aggregate.aggregate.count
        : 0,
    [dataCountAndModules],
  )

  const extrinsics = useMemo(() => data && data.consensus_extrinsics, [data])
  const filtersOptions = useMemo(
    () =>
      dataCountAndModules
        ? FILTERS_OPTIONS[TABLE].map((filter) => ({
            ...filter,
            ...(filter.key === 'section' && {
              options: [
                ...new Set(dataCountAndModules.consensus_extrinsic_modules.map((m) => m.section)),
              ],
            }),
            ...(filter.key === 'module' && {
              options: dataCountAndModules.consensus_extrinsic_modules.map((m) => ({
                value: m.method,
                label: m.method + ' (' + m.section + ')',
              })),
            }),
          }))
        : undefined,
    [dataCountAndModules],
  )

  const pageCount = useMemo(() => {
    const countToUse =
      Object.keys(where).length > 0 && totalCount < MAX_RECORDS ? totalCount : MAX_RECORDS
    return Math.ceil(countToUse / pagination.pageSize)
  }, [pagination.pageSize, totalCount, where])

  const columns = useMemo(
    () =>
      getTableColumns<Row>(TABLE, selectedColumns, {
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
            <div>{row.original.blockHeight}</div>
          </Link>
        ),
        blockHash: ({ row }: Cell<Row>) => (
          <CopyButton value={row.original.blockHash} message='Block hash copied'>
            {shortString(row.original.blockHash)}
          </CopyButton>
        ),
        indexInBlock: ({ row }: Cell<Row>) => row.original.indexInBlock.toString(),
        success: ({ row }: Cell<Row>) => <StatusIcon status={row.original.success} />,
        nonce: ({ row }: Cell<Row>) => row.original.nonce,
        signer: ({ row }: Cell<Row>) => (
          <AccountIconWithLink
            address={row.original.signer}
            network={network}
            section={Routes.consensus}
            forceShortString={true}
          />
        ),
        signature: ({ row }: Cell<Row>) => (
          <CopyButton value={row.original.signature} message='Signature copied'>
            {shortString(row.original.signature)}
          </CopyButton>
        ),
        tip: ({ row }: Cell<Row>) => row.original.tip,
        fee: ({ row }: Cell<Row>) => row.original.fee,
      }),
    [network, section, selectedColumns],
  )

  const isDataLoaded = useMemo(() => {
    return !loading && !loadingCountAndModules && extrinsics && dataCountAndModules && data
  }, [data, dataCountAndModules, extrinsics, loading, loadingCountAndModules])

  const noData = useMemo(() => {
    if (loading || loadingCountAndModules) return <Spinner isSmall />
    if (!data || !dataCountAndModules) return <NotFound />
    return null
  }, [data, dataCountAndModules, loading, loadingCountAndModules])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-0'>
        <TableSettings
          table={TABLE}
          filters={filters}
          overrideFiltersOptions={filtersOptions}
          totalCount={'500,000+'}
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
