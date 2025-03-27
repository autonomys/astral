'use client'

import { capitalizeFirstLetter, shortString } from '@autonomys/auto-utils'
import { AccountIconWithLink } from 'components/common/AccountIcon'
import { CopyButton } from 'components/common/CopyButton'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { TableSettings } from 'components/common/TableSettings'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { FILTERS_OPTIONS } from 'constants/tables'
import { ExtrinsicsDocument, ExtrinsicsQuery, ExtrinsicsQueryVariables } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import Link from 'next/link'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableSettings } from 'states/tables'
import { Cell, ExtrinsicsFilters } from 'types/table'
import { getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'

type Row = ExtrinsicsQuery['consensus_extrinsics'][0]
const TABLE = 'extrinsics'

export const ExtrinsicList: FC = () => {
  const { ref, inView } = useInView()
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
      ...(filters.section && { section: { _eq: `%${filters.section}%` } }),
      // Module
      ...(filters.module && { module: { _eq: `%${filters.module}%` } }),
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

  const { loading, setIsVisible } = useIndexersQuery<ExtrinsicsQuery, ExtrinsicsQueryVariables>(
    ExtrinsicsDocument,
    {
      variables,
      pollInterval: 6000,
    },
    Routes.consensus,
    TABLE,
  )

  const consensusEntry = useQueryStates((state) => state.consensus.extrinsics)

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const extrinsics = useMemo(() => data && data.consensus_extrinsics, [data])
  const filtersOptions = useMemo(
    () =>
      data
        ? FILTERS_OPTIONS[TABLE].map((filter) => ({
            ...filter,
            ...(filter.key === 'section' && {
              options: [...new Set(data.consensus_extrinsic_modules.map((m) => m.section))],
            }),
            ...(filter.key === 'module' && {
              options: data.consensus_extrinsic_modules.map((m) => ({
                value: m.method,
                label: m.method + ' (' + m.section + ')',
              })),
            }),
          }))
        : undefined,
    [data],
  )
  const totalCount = useMemo(
    () =>
      data && data.consensus_extrinsics_aggregate.aggregate
        ? data.consensus_extrinsics_aggregate.aggregate.count
        : 0,
    [data],
  )
  const pageCount = useMemo(
    () => Math.ceil(Number(totalCount) / pagination.pageSize),
    [totalCount, pagination],
  )

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

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, consensusEntry, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-4' ref={ref}>
        <TableSettings
          table={TABLE}
          totalCount={totalCount}
          filters={filters}
          overrideFiltersOptions={filtersOptions}
        />
        {!loading && extrinsics ? (
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
