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
      cells: blocks.map(({ height, id }) => (
        <Link key={`${id}-home-block-height`} to={INTERNAL_ROUTES.blocks.id.page(height)}>
          <div>{height}</div>
        </Link>
      )),
    },
    {
      title: 'Time',
      cells: blocks.map(({ timestamp, id }) => {
        const blockDate = dayjs(timestamp).fromNow(true)

        return <div key={`${id}-home-block-time`}>{blockDate}</div>
      }),
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
      title: 'Block hash',
      cells: blocks.map(({ hash, id }) => (
        <div key={`${id}-home-block-hash`}>{shortString(hash)}</div>
      )),
    },
  ]

  // constants
  const columns = generateColumns(blocks)

  return (
    <div className='flex-col p-4 lg:w-1/2 md:w-full border border-gray-200 rounded-lg mr-2 bg-white'>
      <div className='w-full inline-flex justify-between items-center align-middle mb-6'>
        <div className='text-gray-600 uppercase text-md leading-normal'>Latest Blocks</div>
        <Link
          to={INTERNAL_ROUTES.blocks.list}
          className='px-2 py-2 transition ease-in-out duration-150'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='#DE67E4'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
            />
          </svg>
        </Link>
      </div>
      <Table columns={columns} emptyMessage='There are no blocks to show' id='home-latest-blocks' />
    </div>
  )
}

export default HomeBlockList
