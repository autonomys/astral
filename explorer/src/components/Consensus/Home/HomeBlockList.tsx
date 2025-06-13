'use client'

import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { SortedTable } from 'components/common/SortedTable'
import { INTERNAL_ROUTES } from 'constants/routes'
import type { HomeQuery } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import type { Cell } from 'types/table'
import { utcToLocalRelativeTime } from 'utils/time'

type Row = HomeQuery['consensus_blocks'][number]

type Props = {
  data: HomeQuery | undefined
  loading: boolean
}

export const HomeBlockList: FC<Props> = ({ data, loading }) => {
  const { network, section } = useIndexers()

  const blocks = useMemo(() => data?.consensus_blocks, [data?.consensus_blocks])

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
            {utcToLocalRelativeTime(row.original.timestamp)}
          </div>
        ),
      },
    ],
    [network, section],
  )

  return (
    <div className='w-full flex-col rounded-[20px] border border-gray-200 bg-white p-4 dark:border-none dark:bg-boxDark'>
      <div className='mb-6 inline-flex w-full items-center justify-between align-middle'>
        <div className='text-md uppercase leading-normal text-gray-600 dark:text-white'>
          Latest Blocks
        </div>
        <Link
          href={'/' + network + '/' + section + '/' + INTERNAL_ROUTES.blocks.list}
          data-testid='testLinkBlocks'
          className='p-2 transition duration-150 ease-in-out'
        >
          <ArrowLongRightIcon stroke='#1949D2' className='size-6' />
        </Link>
      </div>

      <SortedTable
        data={blocks ?? []}
        columns={columns}
        showNavigation={false}
        pageCount={1}
        filename='home-latest-blocks'
        loading={loading}
        emptyMessage='No blocks found'
      />
    </div>
  )
}
