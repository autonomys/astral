'use client'

import { PAGE_SIZE } from '@/constants/general'
import { ApolloError } from '@apollo/client'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import type { SortingState } from '@tanstack/react-table'
import { NewTable } from 'components/common/NewTable'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Block } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import type { Cell } from 'types/table'
import type { HomeQueryDomainQuery, HomeQueryQuery } from '../gql/graphql'

dayjs.extend(relativeTime)

interface HomeBlockListProps {
  loading: boolean
  error?: ApolloError | undefined
  data: HomeQueryDomainQuery | HomeQueryQuery
}

export const HomeBlockListHeader: FC = () => (
  <div className='mb-6 inline-flex w-full items-center justify-between align-middle'>
    <div className='text-md uppercase leading-normal text-gray-600 dark:text-white'>
      Latest Blocks
    </div>
    <Link
      href={INTERNAL_ROUTES.blocks.list}
      data-testid='testLinkBlocks'
      className='p-2 transition duration-150 ease-in-out'
    >
      <ArrowLongRightIcon stroke='#DE67E4' className='size-6' />
    </Link>
  </div>
)

export const HomeBlockList: FC<HomeBlockListProps> = ({ data }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const blocks = useMemo(() => data.blocks as Block[], [data.blocks])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'height',
        header: 'Height',
        enableSorting: true,
        cell: ({ row }: Cell<Block>) => (
          <Link
            className='flex gap-2 hover:text-purpleAccent'
            key={`${row.index}-home-block-height`}
            href={INTERNAL_ROUTES.blocks.id.page(
              selectedChain.urls.page,
              selectedDomain,
              row.original.height,
            )}
          >
            <div>#{row.original.height}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'extrinsicsCount',
        header: 'Extrinsics',
        enableSorting: true,
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-home-block-extrinsicsCount`}>{row.original.extrinsicsCount}</div>
        ),
      },
      {
        accessorKey: 'eventsCount',
        header: 'Events',
        enableSorting: true,
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-home-block-eventsCount`}>{row.original.eventsCount}</div>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        enableSorting: true,
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-home-block-timestamp`}>
            {dayjs(row.original.timestamp).fromNow(true)}
          </div>
        ),
      },
    ],
    [selectedChain.urls.page, selectedDomain],
  )

  const totalCount = useMemo(() => (blocks ? blocks.length : 0), [blocks])
  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  return (
    <div className='w-full flex-col rounded-[20px] border border-gray-200 bg-white p-4 dark:border-none dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset'>
      <HomeBlockListHeader />
      <NewTable
        data={blocks}
        columns={columns}
        showNavigation={true}
        sorting={sorting}
        onSortingChange={setSorting}
        pagination={pagination}
        pageCount={pageCount}
        onPaginationChange={setPagination}
        filename='home-latest-blocks'
      />
    </div>
  )
}
