'use client'

import useMediaQuery from '@/hooks/useMediaQuery'
import { shortString } from '@autonomys/auto-utils'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { SortedTable } from 'components/common/SortedTable'
import { StatusIcon } from 'components/common/StatusIcon'
import { INTERNAL_ROUTES } from 'constants/routes'
import type { HomeQuery } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import type { Cell } from 'types/table'
import { utcToLocalRelativeTime } from 'utils/time'

type Row = HomeQuery['consensus_blocks'][number]['extrinsics'][number]

type Props = {
  data: HomeQuery | undefined
  loading: boolean
}

export const HomeExtrinsicList: FC<Props> = ({ data, loading }) => {
  const { network, section } = useIndexers()

  const isDesktop = useMediaQuery('(min-width: 640px)')
  const PAGE_SIZE = useMemo(() => (isDesktop ? 10 : 3), [isDesktop])

  const extrinsics = useMemo(
    () => data?.consensus_blocks?.flatMap((block) => block.extrinsics || []).slice(0, PAGE_SIZE),
    [data?.consensus_blocks, PAGE_SIZE],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'hash',
        header: 'Hash',
        cell: ({ row }: Cell<Row>) => (
          <Link
            className='hover:text-primaryAccent'
            key={`${row.index}-home-extrinsic-hash`}
            href={INTERNAL_ROUTES.extrinsics.id.page(network, section, row.original.id)}
          >
            <div>{shortString(row.original.hash)}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'block',
        header: 'Block',
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-home-extrinsic-block`}>{row.original.block_height}</div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Call',
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-home-extrinsic-action`}>
            {row.original.name.split('.')[1].toUpperCase()}
          </div>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-home-extrinsic-time`}>
            {utcToLocalRelativeTime(row.original.timestamp)}
          </div>
        ),
      },
      {
        accessorKey: 'success',
        header: 'Status',
        cell: ({ row }: Cell<Row>) => (
          <div
            className='flex items-center justify-center'
            key={`${row.index}-home-extrinsic-status`}
          >
            <StatusIcon status={row.original.success} />
          </div>
        ),
      },
    ],
    [network, section],
  )

  return (
    <div className='w-full flex-col rounded-lg border border-gray-200 bg-white p-4 dark:border-none dark:bg-boxDark'>
      <div className='mb-6 inline-flex w-full items-center justify-between align-middle'>
        <div className='text-md uppercase leading-normal text-gray-600 dark:text-white'>
          Latest Extrinsics
        </div>
        <Link
          data-testid='testLinkExtrinsics'
          href={'/' + network + '/' + section + '/' + INTERNAL_ROUTES.extrinsics.list}
          className='p-2 transition duration-150 ease-in-out'
        >
          <ArrowLongRightIcon stroke='#1949D2' className='size-6' />
        </Link>
      </div>

      <SortedTable
        data={extrinsics ?? []}
        columns={columns}
        showNavigation={false}
        pageCount={1}
        filename='home-latest-extrinsics'
        loading={loading}
        emptyMessage='No extrinsics found'
      />
    </div>
  )
}
