import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'
import { useSubscription } from '@apollo/client'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

// common
import Table, { Column } from 'common/components/Table'
import { INTERNAL_ROUTES } from 'common/routes'
import ErrorFallback from 'common/components/ErrorFallback'
import StatusIcon from 'common/components/StatusIcon'
import TableLoadingSkeleton from 'common/components/TableLoadingSkeleton'
import useMediaQuery from 'common/hooks/useMediaQuery'

// gql
import { Block } from 'gql/graphql'

// home
import { HomeBlockCard } from './HomeBlockCard'
import { QUERY_BLOCK_LISTS, QUERY_HOME_LISTS } from 'Home/query'

dayjs.extend(relativeTime)

const HomeBlockList: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const PAGE_SIZE = isDesktop ? 10 : 3
  const { data, error, loading } = useSubscription(QUERY_BLOCK_LISTS, {
    variables: { limit: PAGE_SIZE, offset: 0 },
    onData({ client }) {
      client.refetchQueries({
        include: [QUERY_HOME_LISTS],
      })
    },
  })

  if (loading) {
    return <TableLoadingSkeleton additionClass='lg:w-1/2' />
  }

  if (error || !data) {
    return <ErrorFallback error={error} />
  }

  // methods
  const generateColumns = (blocks: Block[]): Column[] => [
    {
      title: 'Height',
      cells: blocks.map(({ height, id }) => (
        <Link key={`${id}-home-block-height`} to={INTERNAL_ROUTES.blocks.id.page(height)}>
          <div>#{height}</div>
        </Link>
      )),
    },
    {
      title: 'Extrinsics',
      cells: blocks.map(({ extrinsics, id }) => (
        <div key={`${id}-home-block-extrinsics`}>{extrinsics?.length}</div>
      )),
    },
    {
      title: 'Events',
      cells: blocks.map(({ events, id }) => (
        <div key={`${id}-home-block-events`}>{events?.length}</div>
      )),
    },
    {
      title: 'Time',
      cells: blocks.map(({ timestamp, id }) => {
        const blockDate = dayjs(timestamp).fromNow(true)

        return <div key={`${id}-home-block-time`}>{blockDate} ago</div>
      }),
    },
    {
      title: 'Status',
      cells: blocks.map(({ id, extrinsics }) => (
        <div className='flex items-center justify-center' key={`${id}-home-block-status`}>
          <StatusIcon status={extrinsics[0].success} />
        </div>
      )),
    },
  ]

  // constants
  const blocks = data.blocks
  const columns = generateColumns(blocks)

  return isDesktop ? (
    <div className='flex-col p-4 md:w-full border border-gray-200 rounded-lg bg-white'>
      <div className='w-full inline-flex justify-between items-center align-middle mb-6'>
        <div className='text-gray-600 uppercase text-md leading-normal'>Latest Blocks</div>
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
        <div className='text-gray-600 uppercase text-md leading-normal'>Latest Blocks</div>
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
