'use client'

import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { SortedTable } from 'components/common/SortedTable'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { HomeQueryQuery } from 'gql/graphql'
import useChains from 'hooks/useChains'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import type { Cell } from 'types/table'

dayjs.extend(relativeTime)

interface HomeBlockListProps {
  data: HomeQueryQuery
}

type Row = HomeQueryQuery['consensus_blocks'][number]

export const HomeBlockList: FC<HomeBlockListProps> = ({ data }) => {
  const { network, section } = useChains()

  const blocks = useMemo(() => data.consensus_blocks, [data.consensus_blocks])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'height',
        header: 'Height',
        cell: ({ row }: Cell<Row>) => (
          <Link
            className='flex gap-2 hover:text-primaryAccent'
            key={`${row.index}-home-block-height`}
            href={INTERNAL_ROUTES.blocks.id.page(network, section, row.original.height)}
          >
            <div>#{row.original.height}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'extrinsicsCount',
        header: 'Extrinsics',
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-home-block-extrinsicsCount`}>{row.original.extrinsics_count}</div>
        ),
      },
      {
        accessorKey: 'eventsCount',
        header: 'Events',
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-home-block-eventsCount`}>{row.original.events_count}</div>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-home-block-timestamp`}>
            {dayjs(row.original.timestamp).fromNow(true)}
          </div>
        ),
      },
    ],
    [network, section],
  )

  return (
    <div className='w-full flex-col rounded-[20px] border border-gray-200 bg-white p-4 dark:border-none dark:bg-gradient-to-r dark:from-gradientFrom dark:via-gradientVia dark:to-gradientTo'>
      <div className='mb-6 inline-flex w-full items-center justify-between align-middle'>
        <div className='text-md uppercase leading-normal text-gray-600 dark:text-white'>
          Latest Blocks
        </div>
        <Link
          href={'/' + network + '/' + section + '/' + INTERNAL_ROUTES.blocks.list}
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
