import { ApolloError } from '@apollo/client'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { Column, Table } from 'components/common/Table'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Block } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'
import type { HomeQueryDomainQuery, HomeQueryQuery } from '../gql/graphql'
import { HomeBlockCard } from './HomeBlockCard'

dayjs.extend(relativeTime)

interface HomeBlockListProps {
  loading: boolean
  error?: ApolloError | undefined
  data: HomeQueryDomainQuery | HomeQueryQuery
  isDesktop: boolean
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

export const HomeBlockList: FC<HomeBlockListProps> = ({ data, isDesktop }) => {
  const { selectedChain, selectedDomain } = useDomains()
  // methods
  const generateColumns = useCallback(
    (blocks: Block[]): Column[] => [
      {
        title: 'Height',
        cells: blocks.map(({ height, id }) => (
          <Link
            className='flex gap-2 hover:text-[#DE67E4]'
            key={`${id}-home-block-height`}
            href={INTERNAL_ROUTES.blocks.id.page(selectedChain.urls.page, selectedDomain, height)}
          >
            <div>#{height}</div>
          </Link>
        )),
      },
      {
        title: 'Extrinsics',
        cells: blocks.map(({ extrinsicsCount, id }) => (
          <div key={`${id}-home-block-extrinsics`}>{extrinsicsCount}</div>
        )),
      },
      {
        title: 'Events',
        cells: blocks.map(({ eventsCount, id }) => (
          <div key={`${id}-home-block-events`}>{eventsCount}</div>
        )),
      },
      {
        title: 'Time',
        cells: blocks.map(({ timestamp, id }) => {
          const blockDate = dayjs(timestamp).fromNow(true)

          return <div key={`${id}-home-block-time`}>{blockDate} ago</div>
        }),
      },
    ],
    [selectedChain.urls.page, selectedDomain],
  )

  // constants
  const blocks = useMemo(() => data.blocks as Block[], [data.blocks])
  const columns = useMemo(() => generateColumns(blocks), [blocks, generateColumns])

  return isDesktop ? (
    <div className='w-full flex-col rounded-[20px] border border-gray-200 bg-white p-4 dark:border-none dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2]'>
      <HomeBlockListHeader />
      <Table columns={columns} emptyMessage='There are no blocks to show' id='home-latest-blocks' />
    </div>
  ) : (
    <div className='w-full'>
      <HomeBlockListHeader />
      {blocks.map((block) => (
        <HomeBlockCard block={block} key={`home-block-card-${block.id}`} />
      ))}
    </div>
  )
}
