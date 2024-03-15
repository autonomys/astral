import { shortString } from '@/utils/string'
import { CopyButton } from 'components/common/CopyButton'
import { List, StyledListItem } from 'components/common/List'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Block } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import { FC } from 'react'
import { BlockAuthor } from './BlockAuthor'

dayjs.extend(relativeTime)

type Props = {
  block: Block
  isDesktop?: boolean
}

export const BlockDetailsCard: FC<Props> = ({ block, isDesktop = false }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const chain = selectedChain.urls.page

  return (
    <div className='w-full'>
      <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] sm:p-6'>
        <div className='mb-10 flex items-center justify-between'>
          <h3 className='text-sm font-semibold leading-none text-gray-900 dark:text-white lg:text-2xl'>
            Block #{block.height}
          </h3>
          {/* TODO: uncomment when we have support for best blocks, currently all blocks are archived
          <div className='bg-[#241235] text-xs font-medium  px-5 py-3 rounded-full block leading-normal text-white'>
            Best Block
          </div> */}
        </div>

        <div className='flow-root'>
          <List>
            <StyledListItem title='Author'>
              <CopyButton value={block.author?.id || ''} message='Block author copied'>
                <BlockAuthor
                  domain={selectedDomain}
                  chain={chain}
                  author={block.author?.id}
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
              <CopyButton value={block.parentHash} message='Parent hash copied'>
                {isDesktop ? block.parentHash : shortString(block.parentHash)}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Extrinsics Root'>{block?.extrinsicsRoot}</StyledListItem>
            <StyledListItem title='Spec Version'>{block.specId?.toString() || ''}</StyledListItem>
          </List>
        </div>
      </div>
    </div>
  )
}
