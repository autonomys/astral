import { FC } from 'react'
import { Extrinsic } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ReactJson from 'react-json-view'

// common
import { List, StyledListItem } from 'common/components/List'
import { shortString } from 'common/helpers'

dayjs.extend(relativeTime)

type Props = {
  extrinsic: Extrinsic
  isDesktop?: boolean
}

const ExtrinsicDetailsCard: FC<Props> = ({ extrinsic, isDesktop = false }) => {
  return (
    <div className='w-full'>
      <div className='flex'>
        <div className='border border-slate-100 bg-white shadow rounded-lg mb-4 p-4 sm:p-6 w-full'>
          <div className='flex items-center justify-between mb-10'>
            <h3 className='font-medium text-sm text-[#241235] md:text-2xl'>
              Extrinsic #{extrinsic.block.height}-{extrinsic.pos}
            </h3>
            <div className='bg-[#241235] text-xs font-semibold px-5 py-3 rounded-full block leading-normal text-white'>
              #{extrinsic.block.height}
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-5 w-full'>
            <div className='w-full md:flex-1'>
              <List>
                <StyledListItem title='Timestamp'>
                  {dayjs(extrinsic.block.timestamp).format('DD MMM YYYY | HH:mm:ss(Z)')}
                </StyledListItem>
                <StyledListItem title='Block Time'>
                  {dayjs(extrinsic.block.timestamp).fromNow(true)}
                </StyledListItem>
                <StyledListItem title='Hash'>
                  {isDesktop ? extrinsic.hash : shortString(extrinsic.hash)}
                </StyledListItem>
                <StyledListItem title='Module'>{extrinsic.name}</StyledListItem>
                <StyledListItem title='Call'>{extrinsic.name}</StyledListItem>
              </List>
            </div>
            <div className='w-full sm:max-w-xs lg:max-w-md border border-[#F3FBFF] bg-[#F3FBFF] shadow rounded-lg mb-4 p-4 sm:p-6 break-all'>
              <ReactJson src={extrinsic.args || {}} iconStyle='circle' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExtrinsicDetailsCard
