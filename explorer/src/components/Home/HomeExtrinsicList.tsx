import { shortString } from '@/utils/string'
import { ApolloError } from '@apollo/client'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { StatusIcon } from 'components/common/StatusIcon'
import { Column, Table } from 'components/common/Table'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Extrinsic } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'
import type { HomeQueryDomainQuery, HomeQueryQuery } from '../gql/graphql'
import { HomeExtrinsicCard } from './HomeExtrinsicCard'

dayjs.extend(relativeTime)

interface HomeExtrinsicListProps {
  loading: boolean
  error?: ApolloError | undefined
  data: HomeQueryQuery | HomeQueryDomainQuery
  isDesktop: boolean
}

export const HomeExtrinsicListHeader = () => (
  <div className='mb-6 inline-flex w-full items-center justify-between align-middle'>
    <div className='text-md uppercase leading-normal text-gray-600 dark:text-white'>
      Latest Extrinsics
    </div>
    <Link
      data-testid='testLinkExtrinsics'
      href={INTERNAL_ROUTES.extrinsics.list}
      className='p-2 transition duration-150 ease-in-out'
    >
      <ArrowLongRightIcon stroke='#DE67E4' className='size-6' />
    </Link>
  </div>
)

export const HomeExtrinsicList: FC<HomeExtrinsicListProps> = ({ data, isDesktop }) => {
  const { selectedChain, selectedDomain } = useDomains()
  // methods
  const generateColumns = useCallback(
    (extrinsics: Extrinsic[]): Column[] => [
      {
        title: 'Hash',
        cells: extrinsics.map(({ id, hash }) => (
          <Link
            className='hover:text-purpleAccent'
            key={`${id}-home-extrinsic-hash`}
            href={INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, selectedDomain, id)}
          >
            <div>{shortString(hash)}</div>
          </Link>
        )),
      },
      {
        title: 'Block',
        cells: extrinsics.map(({ block, id }) => (
          <div key={`${id}-home-extrinsic-block`}>{block.height}</div>
        )),
      },
      {
        title: 'Call',
        cells: extrinsics.map(({ name, id }) => (
          <div key={`${id}-home-extrinsic-action`}>{name.split('.')[1].toUpperCase()}</div>
        )),
      },
      {
        title: 'Time',
        cells: extrinsics.map(({ id, timestamp }) => {
          const blockDate = dayjs(timestamp).fromNow(true)

          return <div key={`${id}-home-extrinsic-time`}>{blockDate} ago</div>
        }),
      },
      {
        title: 'Status',
        cells: extrinsics.map(({ id, success }) => (
          <div className='flex items-center justify-center' key={`${id}-home-extrinsic-status`}>
            <StatusIcon status={success} />
          </div>
        )),
      },
    ],
    [selectedChain.urls.page, selectedDomain],
  )

  // constants
  const extrinsics = useMemo(() => data.extrinsics as Extrinsic[], [data.extrinsics])
  const columns = useMemo(() => generateColumns(extrinsics), [extrinsics, generateColumns])

  return isDesktop ? (
    <div className='w-full flex-col rounded-[20px] border border-gray-200 bg-white p-4 dark:border-none dark:bg-gradient-to-r dark:from-purpleUndertone dark:to-blueMedium'>
      <HomeExtrinsicListHeader />
      <Table
        columns={columns}
        emptyMessage='There are no extrinsics to show'
        id='home-latest-extrinsics'
      />
    </div>
  ) : (
    <div className='w-full'>
      <HomeExtrinsicListHeader />
      {extrinsics.map((extrinsic) => (
        <HomeExtrinsicCard extrinsic={extrinsic} key={`home-extrinsic-card-${extrinsic.id}`} />
      ))}
    </div>
  )
}
