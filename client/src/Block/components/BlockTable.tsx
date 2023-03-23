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
import { useDomains } from 'common/providers/ChainProvider'
import BlockAuthor from './BlockAuthor'

dayjs.extend(relativeTime)

interface Props {
  blocks: Block[]
  isDesktop?: boolean
}

const BlockList: FC<Props> = ({ blocks, isDesktop = true }) => {
  const { selectedChain } = useDomains()

  const chain = selectedChain.urls.page

  // methods
  const generateColumns = (blocks: Block[]): Column[] => [
    {
      title: 'Block',
      cells: blocks.map(({ height, id }) => (
        <Link
          key={`${id}-block-height`}
          className='hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.blocks.id.page(chain, height)}
        >
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
    {
      title: 'Block Author',
      cells: blocks.map(({ author, id }) => (
        <div key={`${id}-block-author`}>
          <CopyButton value={author?.id || 'Unkown'} message='Author account copied'>
            <BlockAuthor chain={chain} author={author?.id} isDesktop={false} />
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
          tableProps='bg-white rounded-[20px] dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
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
