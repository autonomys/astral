import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

// gql
import { Block } from 'gql/graphql'

// common
import { shortString } from 'common/helpers'
import Table, { Column } from 'common/components/Table'
import Pagination from 'common/components/Pagination'
import { INTERNAL_ROUTES } from 'common/routes'

dayjs.extend(relativeTime)

type Props = {
  blocks: Block[]
  nextPage: () => void
  previousPage: () => void
  page: number
}

const BlockList: FC<Props> = ({ blocks, nextPage, previousPage, page }) => {
  // methods
  const generateColumns = (blocks: Block[]): Column[] => [
    {
      title: 'Block',
      cells: blocks.map(({ height, id }) => (
        <Link key={`${id}-block-height`} to={INTERNAL_ROUTES.blocks.id.page(height)}>
          <div>{height}</div>
        </Link>
      )),
    },
    {
      title: 'Time',
      cells: blocks.map(({ timestamp, id }) => {
        const blockDate = dayjs(timestamp).fromNow(true)

        return <div key={`${id}-block-time`}>{blockDate}</div>
      }),
    },
    {
      title: 'Status',
      cells: blocks.map(() => <></>),
    },
    {
      title: 'Extrinsics',
      cells: blocks.map(({ extrinsics, id }) => (
        <div key={`${id}-block-extrinsics`}>{extrinsics?.length}</div>
      )),
    },
    {
      title: 'Events',
      cells: blocks.map(({ events, id }) => <div key={`${id}-block-events`}>{events?.length}</div>),
    },
    {
      title: 'Validator',
      cells: blocks.map(({ validator, id }) => (
        <div key={`${id}-block-validator`}>{validator}</div>
      )),
    },
    {
      title: 'Block hash',
      cells: blocks.map(({ hash, id }) => <div key={`${id}-block-hash`}>{shortString(hash)}</div>),
    },
  ]

  // constants
  const columns = generateColumns(blocks)

  return (
    <div className='w-full'>
      <div className='rounded my-6'>
        <Table
          columns={columns}
          emptyMessage='There are no blocks to show'
          footer={<Pagination nextPage={nextPage} page={page} previousPage={previousPage} />}
          id='latest-blocks'
          tableHeaderProps='bg-gray-200'
          tableProps='shadow-md'
        />
      </div>
    </div>
  )
}

export default BlockList
