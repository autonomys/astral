import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { ApolloError } from '@apollo/client'

// common
import { Table, Column } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'

// gql
import { Block } from 'gql/graphql'

// home
import { HomeBlockCard } from 'Home/components'

dayjs.extend(relativeTime)

interface HomeBlockListProps {
  loading: boolean
  error?: ApolloError | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  isDesktop: boolean
}

const HomeBlockList: FC<HomeBlockListProps> = ({ data, isDesktop }) => {
  // methods
  const generateColumns = (blocks: Block[]): Column[] => [
    {
      title: 'Height',
      cells: blocks.map(({ height, id }) => (
        <Link
          className='flex gap-2'
          key={`${id}-home-block-height`}
          to={INTERNAL_ROUTES.blocks.id.page(height)}
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
  ]

  // constants
  const blocks = data.blocks
  const columns = generateColumns(blocks)

  return isDesktop ? (
    <div className='flex-col p-4 w-full border border-gray-200 rounded-lg bg-white dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2]'>
      <div className='w-full inline-flex justify-between items-center align-middle mb-6'>
        <div className='text-gray-600 uppercase text-md leading-normal dark:text-white'>Latest Blocks</div>
        <Link
          to={INTERNAL_ROUTES.blocks.list}
          className='px-2 py-2 transition ease-in-out duration-150'
        >
          <ArrowLongRightIcon stroke='#DE67E4' className='w-6 h-6' />
        </Link>
      </div>
      <Table columns={columns} emptyMessage='There are no blocks to show' id='home-latest-blocks' />
    </div>
  ) : (
    <div className='w-full'>
      <div className='w-full inline-flex justify-between items-center align-middle mb-6'>
        <div className='text-gray-600 uppercase text-md leading-normal dark:text-white'>Latest Blocks</div>
        <Link
          to={INTERNAL_ROUTES.blocks.list}
          className='px-2 py-2 transition ease-in-out duration-150'
        >
          <ArrowLongRightIcon stroke='#DE67E4' className='w-6 h-6' />
        </Link>
      </div>
      {blocks.map((block) => (
        <HomeBlockCard block={block} key={`home-block-card-${block.id}`} />
      ))}
    </div>
  )
}

export default HomeBlockList
