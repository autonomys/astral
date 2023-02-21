import { FC } from 'react'
import { Extrinsic } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ReactJson from 'react-json-view'
import { Link } from 'react-router-dom'

// common
import { CopyButton, List, StatusIcon, StyledListItem } from 'common/components'
import { shortString } from 'common/helpers'
import { INTERNAL_ROUTES } from 'common/routes'

dayjs.extend(relativeTime)

type Props = {
  extrinsic: Extrinsic
  isDesktop?: boolean
}

const ExtrinsicDetailsCard: FC<Props> = ({ extrinsic, isDesktop = false }) => {
  return (
    <div className='w-full'>
      <div className='flex'>
        <div className='border border-slate-100 bg-white shadow rounded-[20px] mb-4 p-4 sm:p-6 w-full'>
          <div className='flex items-center justify-between mb-10'>
            <h3 className='font-medium text-sm text-[#241235] md:text-2xl'>
              Extrinsic #{extrinsic.block.height}-{extrinsic.pos}
            </h3>
            <div className='flex bg-[#241235] rounded-full px-5 py-3 gap-2 items-center justify-center'>
              <div className=' text-xs font-semibold block leading-normal text-white'>
                #{extrinsic.block.height}
              </div>
              <StatusIcon status={extrinsic.success} />
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-5 w-full'>
            <div className='w-full md:flex-1'>
              <List>
                <StyledListItem title='Timestamp'>
                  {dayjs(extrinsic.block.timestamp).format('DD MMM YYYY | HH:mm:ss(Z)')}
                </StyledListItem>
                <StyledListItem title='Block Number'>
                  <Link to={INTERNAL_ROUTES.blocks.id.page(extrinsic.block.height)}>
                    <div> {extrinsic.block.height}</div>
                  </Link>
                </StyledListItem>
                <StyledListItem title='Block Time'>
                  {dayjs(extrinsic.block.timestamp).fromNow(true)}
                </StyledListItem>
                <StyledListItem title='Hash'>
                  <CopyButton value={extrinsic.hash} message='Hash copied'>
                    {isDesktop ? extrinsic.hash : shortString(extrinsic.hash)}
                  </CopyButton>
                </StyledListItem>
                <StyledListItem title='Module'>{extrinsic.name}</StyledListItem>
                <StyledListItem title='Call'>{extrinsic.name}</StyledListItem>
                <StyledListItem title='Sender'>
                  {isDesktop ? extrinsic.signer?.id : shortString(extrinsic.signer?.id || '')}
                </StyledListItem>
                <StyledListItem title='Signature'>
                  {isDesktop
                    ? shortString(extrinsic.signature || '', 10, 80)
                    : shortString(extrinsic.signature || '')}
                </StyledListItem>
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
