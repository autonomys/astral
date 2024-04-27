/* eslint-disable camelcase */
import { useApolloClient, useQuery } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { Extrinsic, ExtrinsicWhereInput } from 'gql/graphql'
import { FC, useCallback, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { Link } from 'react-router-dom'

// account
import { AccountExtrinsicFilterDropdown } from 'Account/components'
import { QUERY_ACCOUNT_EXTRINSICS } from 'Account/query'

// extrinsic
import { ExtrinsicListCard } from 'Extrinsic/components'

// common
import { CopyButton, Spinner, StatusIcon } from 'common/components'
import NewTable from 'common/components/NewTable'
import { PAGE_SIZE } from 'common/constants'
import { downloadFullData, shortString } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import { INTERNAL_ROUTES } from 'common/routes'

type Props = {
  accountId: string
}

const ExtrinsicList: FC<Props> = ({ accountId }) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'block_height', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const [filters, setFilters] = useState<ExtrinsicWhereInput>({})

  const { selectedChain, selectedDomain } = useDomains()
  const apolloClient = useApolloClient()

  const cols = useMemo(
    () => createColumns(selectedDomain, selectedChain),
    [selectedDomain, selectedChain],
  )

  const { data, error, loading } = useQuery(QUERY_ACCOUNT_EXTRINSICS, {
    variables: getQueryVariables(sorting, pagination, filters, accountId),
    pollInterval: 6000,
  })

  useErrorHandler(error)

  const fullDataDownloader = useCallback(
    () => downloadFullData(apolloClient, QUERY_ACCOUNT_EXTRINSICS),
    [apolloClient],
  )

  if (loading) {
    return <Spinner />
  }

  const extrinsicsConnection = data.extrinsicsConnection.edges.map((extrinsic) => extrinsic.node)
  const totalCount = data.extrinsicsConnection.totalCount

  const pageCount = Math.floor(totalCount / pagination.pageSize)

  return (
    <div className='w-full flex flex-col align-middle mt-5'>
      <div className='rounded-[20px] mt-6 p-6 bg-white dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'>
        <div className='w-full justify-center flex gap-2'>
          <div className='text-[#857EC2] text-sm dark:text-white/75'>Action Filter:</div>
          <AccountExtrinsicFilterDropdown filters={filters} setFilters={setFilters} />
        </div>
      </div>
      <div className='rounded my-6'>
        <NewTable
          data={extrinsicsConnection}
          columns={cols}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          fullDataDownloader={fullDataDownloader}
          mobileComponent={<MobileComponent extrinsics={extrinsicsConnection} />}
        />
      </div>
    </div>
  )
}

export default ExtrinsicList

const createColumns = (selectedDomain, selectedChain) => {
  return [
    {
      accessorKey: 'id',
      header: 'Extrinsic Id',
      enableSorting: true,
      cell: ({ row }) => (
        <Link
          key={`${row.original.id}-extrinsic-block-${row.original.indexInBlock}`}
          className='hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.extrinsics.id.page(
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
      accessorKey: 'timestamp',
      header: 'Time',
      enableSorting: true,
      cell: ({ row }) => {
        const blockDate = dayjs(row.original.block.timestamp).fromNow(true)

        return <div key={`${row.original.id}-extrinsic-time-${row.index}`}>{blockDate}</div>
      },
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
  ]
}

const getQueryVariables = (sorting, pagination, filters, accountId) => {
  return {
    first: pagination.pageSize,
    after:
      pagination.pageIndex > 0
        ? (pagination.pageIndex * pagination.pageSize).toString()
        : undefined,
    orderBy:
      sorting.map((s) => `${s.id}_${s.desc ? 'DESC' : 'ASC'}`).join(',') || 'block_height_DESC',
    where: {
      ...filters,
      signer: {
        id_eq: accountId,
      },
    },
  }
}

type MobileComponentProps = {
  extrinsics: Extrinsic[]
}

const MobileComponent: FC<MobileComponentProps> = ({ extrinsics }) => (
  <div className='w-full'>
    {extrinsics.map((extrinsic, index) => (
      <ExtrinsicListCard
        extrinsic={extrinsic}
        key={`extrinsic-list-card-${extrinsic.id}-${index}`}
      />
    ))}
  </div>
)
