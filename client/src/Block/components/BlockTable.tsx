import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

// gql
import { Block } from 'gql/graphql'

// common
import { shortString } from 'common/helpers'
import { Table, Column, CopyButton } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'

// block
import { BlockListCard } from 'Block/components'

dayjs.extend(relativeTime)

interface Props {
  blocks: Block[]
  isDesktop?: boolean
}

const BlockList: FC<Props> = ({ blocks, isDesktop = true }) => {
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
      title: 'Block hash',
      cells: blocks.map(({ hash, id }) => (
        <div key={`${id}-block-hash`}>
          <CopyButton value={hash} message='Hash copied'>
            {shortString(hash)}
          </CopyButton>
        </div>
      )),
    },
  ]

  // constants
  const columns = generateColumns(blocks)

  return isDesktop ? (
    <div className='w-full'>
      <div className='rounded my-6'>
        <Table
          columns={columns}
          emptyMessage='There are no blocks to show'
          tableProps='bg-white rounded-md'
          tableHeaderProps='border-b border-gray-200'
          id='latest-blocks'
        />
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {blocks.map((block) => (
        <BlockListCard block={block} key={`home-block-card-${block.id}`} />
      ))}
    </div>
  )
}

export default BlockList
