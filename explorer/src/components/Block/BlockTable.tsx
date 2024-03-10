import { shortString } from '@/utils/string'
import { CopyButton } from 'components/common/CopyButton'
import { Column, Table } from 'components/common/Table'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Block } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'
import { BlockAuthor } from './BlockAuthor'
import { BlockListCard } from './BlockListCard'

dayjs.extend(relativeTime)

interface Props {
  blocks: Block[]
  isDesktop?: boolean
}

export const BlockTable: FC<Props> = ({ blocks, isDesktop = true }) => {
  const { selectedChain, selectedDomain } = useDomains()

  const chain = selectedChain.urls.page

  // methods
  const generateColumns = useCallback(
    (blocks: Block[]): Column[] => [
      {
        title: 'Block',
        cells: blocks.map(({ height, id }, index) => (
          <Link
            key={`${id}-block-height`}
            data-testid={`block-link-${index}`}
            className='hover:text-[#DE67E4]'
            href={INTERNAL_ROUTES.blocks.id.page(chain, selectedDomain, height)}
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
        cells: blocks.map(({ events, id }) => (
          <div key={`${id}-block-events`}>{events?.length}</div>
        )),
      },
      {
        title: 'Block hash',
        cells: blocks.map(({ hash, id }, index) => (
          <div key={`${id}-block-hash`}>
            <CopyButton data-testid={`testCopy-${index}`} value={hash} message='Hash copied'>
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
              <BlockAuthor
                domain={selectedDomain}
                chain={chain}
                author={author?.id}
                isDesktop={false}
              />
            </CopyButton>
          </div>
        )),
      },
    ],
    [selectedDomain, chain],
  )

  // constants
  const columns = useMemo(() => generateColumns(blocks), [blocks, generateColumns])

  return isDesktop ? (
    <div className='w-full'>
      <div className='my-6 rounded'>
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
