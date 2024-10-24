'use client'

import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { SortedTable } from 'components/common/SortedTable'
import { StatusIcon } from 'components/common/StatusIcon'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { HomeQueryQuery } from 'gql/graphql'
import useChains from 'hooks/useChains'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import type { Cell } from 'types/table'
import { shortString } from 'utils/string'

dayjs.extend(relativeTime)

interface HomeExtrinsicListProps {
  data: HomeQueryQuery
}

type Row = HomeQueryQuery['consensus_extrinsics'][number]

export const HomeExtrinsicList: FC<HomeExtrinsicListProps> = ({ data }) => {
  const { network, section } = useChains()

  const extrinsics = useMemo(() => data.consensus_extrinsics, [data.consensus_extrinsics])

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
            {dayjs(row.original.timestamp).fromNow(true)} ago
          </div>
        ),
      },
      {
        accessorKey: 'name',
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
    <div className='w-full flex-col rounded-[20px] border border-gray-200 bg-white p-4 dark:border-none dark:bg-gradient-to-r dark:from-purpleUndertone dark:to-gradientToSecondary'>
      <div className='mb-6 inline-flex w-full items-center justify-between align-middle'>
        <div className='text-md uppercase leading-normal text-gray-600 dark:text-white'>
          Latest Extrinsics
        </div>
        <Link
          data-testid='testLinkExtrinsics'
          href={'/' + network + '/' + section + '/' + INTERNAL_ROUTES.extrinsics.list}
          className='p-2 transition duration-150 ease-in-out'
        >
          <ArrowLongRightIcon stroke='#DE67E4' className='size-6' />
        </Link>
      </div>
      <SortedTable
        data={extrinsics}
        columns={columns}
        showNavigation={false}
        pageCount={1}
        filename='home-latest-extrinsics'
      />
    </div>
  )
}
