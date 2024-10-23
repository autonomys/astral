import { CopyButton } from 'components/common/CopyButton'
import { List, StyledListItem } from 'components/common/List'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { BlockByIdQuery } from 'gql/graphql'
import useChains from 'hooks/useChains'
import { FC } from 'react'
import { shortString } from 'utils/string'
import { BlockAuthor } from './BlockAuthor'

dayjs.extend(relativeTime)

type Props = {
  block: NonNullable<BlockByIdQuery['consensus_blocks_by_pk']>
  isDesktop?: boolean
}

export const BlockDetailsCard: FC<Props> = ({ block, isDesktop = false }) => {
  const { network, section } = useChains()
  const chain = network

  return (
    <div className='w-full'>
      <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientFrom dark:via-gradientVia dark:to-gradientTo sm:p-6'>
        <div className='mb-10 flex items-center justify-between'>
          <h3 className='text-sm font-semibold leading-none text-gray-900 dark:text-white lg:text-2xl'>
            Block #{block.height}
          </h3>
          {/* TODO: uncomment when we have support for best blocks, currently all blocks are archived
          <div className='bg-grayDarker text-xs font-medium  px-5 py-3 rounded-full block leading-normal text-white'>
            Best Block
          </div> */}
        </div>

        <div className='flow-root'>
          <List>
            <StyledListItem title='Author'>
              <CopyButton value={block.author_id} message='Block author copied'>
                <BlockAuthor
                  domain={section}
                  chain={chain}
                  author={block.author_id}
                  isDesktop={isDesktop}
                />
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Timestamp'>
              {dayjs(block.timestamp).format('DD MMM YYYY | HH:mm:ss(Z)')}
            </StyledListItem>
            <StyledListItem title='Block Time'>
              {dayjs(block.timestamp).fromNow(true)}
            </StyledListItem>
            <StyledListItem title='Hash'>
              <CopyButton value={block.hash} message='Hash copied'>
                {isDesktop ? block.hash : shortString(block.hash)}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Parent Hash'>
              <CopyButton value={block.parent_hash} message='Parent hash copied'>
                {isDesktop ? block.parent_hash : shortString(block.parent_hash)}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Extrinsics Root'>{block?.extrinsics_root}</StyledListItem>
            <StyledListItem title='Spec Version'>{block.spec_id}</StyledListItem>
          </List>
        </div>
      </div>
    </div>
  )
}
