import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

// common
import Table, { Column } from 'common/components/Table'
import { shortString } from 'common/helpers'
import { INTERNAL_ROUTES } from 'common/routes'

// gql
import { Block } from 'gql/graphql'

dayjs.extend(relativeTime)

type Props = {
  blocks: Block[]
}

const HomeBlockList: FC<Props> = ({ blocks }) => {
  // methods
  const generateColumns = (blocks: Block[]): Column[] => [
    {
      title: 'Block',
      cells: blocks.map(({ height }) => (
        <Link key={height} to={INTERNAL_ROUTES.blocks.id.page(height)}>
          <div>{height}</div>
        </Link>
      )),
    },
    {
      title: 'Time',
      cells: blocks.map(({ timestamp }) => {
        const blockDate = dayjs(timestamp).fromNow(true)

        return <div key={timestamp}>{blockDate}</div>
      }),
    },
    {
      title: 'Extrinsics',
      cells: blocks.map(({ extrinsics }) => (
        <div key={extrinsics?.length}>{extrinsics?.length}</div>
      )),
    },
    {
      title: 'Events',
      cells: blocks.map(({ events }) => <div key={events?.length}>{events?.length}</div>),
    },
    {
      title: 'Block hash',
      cells: blocks.map(({ hash }) => <div key={hash}>{shortString(hash)}</div>),
    },
  ]

  // constants
  const columns = generateColumns(blocks)

  return (
    <div className='flex-col p-4 lg:w-1/2 md:w-full border border-gray-200 rounded-lg mr-2'>
      <div className='w-full inline-flex justify-between align-middle mb-6'>
        <div className='text-gray-600 uppercase text-md leading-normal'>Latest Blocks</div>
        <Link
          className='px-2 py-2 rounded-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150'
          to={INTERNAL_ROUTES.blocks.list}
        >
          View all
        </Link>
      </div>
      <Table columns={columns} emptyMessage='There are no blocks to show' id='home-latest-blocks' />
    </div>
  )
}

export default HomeBlockList
