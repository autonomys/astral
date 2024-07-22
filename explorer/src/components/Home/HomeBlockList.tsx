'use client'

import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { SortedTable } from 'components/common/SortedTable'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Block } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import type { Cell } from 'types/table'
import type { HomeQueryDomainQuery, HomeQueryQuery } from '../gql/graphql'

dayjs.extend(relativeTime)

interface HomeBlockListProps {
  data: HomeQueryDomainQuery | HomeQueryQuery
}

export const HomeBlockList: FC<HomeBlockListProps> = ({ data }) => {
  const { selectedChain, selectedDomain } = useDomains()

  const blocks = useMemo(() => data.blocks as Block[], [data.blocks])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'height',
        header: 'Height',
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
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-home-block-extrinsicsCount`}>{row.original.extrinsicsCount}</div>
        ),
      },
      {
        accessorKey: 'eventsCount',
        header: 'Events',
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-home-block-eventsCount`}>{row.original.eventsCount}</div>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-home-block-timestamp`}>
            {dayjs(row.original.timestamp).fromNow(true)}
          </div>
        ),
      },
    ],
    [selectedChain.urls.page, selectedDomain],
  )

  return (
    <div className='w-full flex-col rounded-[20px] border border-gray-200 bg-white p-4 dark:border-none dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset'>
      <div className='mb-6 inline-flex w-full items-center justify-between align-middle'>
        <div className='text-md uppercase leading-normal text-gray-600 dark:text-white'>
          Latest Blocks
        </div>
        <Link
          href={
            '/' + selectedChain.urls.page + '/' + selectedDomain + '/' + INTERNAL_ROUTES.blocks.list
          }
          data-testid='testLinkBlocks'
          className='p-2 transition duration-150 ease-in-out'
        >
          <ArrowLongRightIcon stroke='#DE67E4' className='size-6' />
        </Link>
      </div>
      <SortedTable
        data={blocks}
        columns={columns}
        showNavigation={false}
        pageCount={1}
        filename='home-latest-blocks'
      />
    </div>
  )
}
