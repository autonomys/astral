import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Block } from 'gql/graphql'

// common
import { List, StyledListItem } from 'common/components/List'
import { shortString } from 'common/helpers'

dayjs.extend(relativeTime)

type Props = {
  block: Block
  isDesktop?: boolean
}

const BlockDetailsCard: FC<Props> = ({ block, isDesktop = false }) => {
  return (
    <div className='w-full'>
      <div className='border border-slate-100 bg-white shadow rounded-xl mb-4 py-4 px-3 sm:p-6 w-full'>
        <div className='flex items-center justify-between mb-10'>
          <h3 className='font-semibold leading-none text-gray-900 text-sm lg:text-2xl'>
            Block #{block.height}
          </h3>
          <div className='bg-[#241235] text-xs font-medium  px-5 py-3 rounded-full block leading-normal text-white'>
            Best Block
          </div>
        </div>

        <div className='flow-root'>
          <List>
            <StyledListItem title='Timestamp'>
              {dayjs(block.timestamp).format('DD MMM YYYY | HH:mm:ss(Z)')}
            </StyledListItem>
            <StyledListItem title='Block Time'>
              {dayjs(block.timestamp).fromNow(true)}
            </StyledListItem>
            <StyledListItem title='Hash'>
              {isDesktop ? block.hash : shortString(block.hash)}
            </StyledListItem>
            <StyledListItem title='Parent Hash'>
              {isDesktop ? block.parentHash : shortString(block.parentHash)}
            </StyledListItem>
            <StyledListItem title='Extrinsics Root'>{block?.extrinsicRoot}</StyledListItem>
            <StyledListItem title='Spec Version'>{block.specId?.toString() || ''}</StyledListItem>
          </List>
        </div>
      </div>
    </div>
  )
}

export default BlockDetailsCard
