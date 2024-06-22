import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Extrinsic } from 'gql/graphql'
import Link from 'next/link'
import { FC } from 'react'

// common
import { shortString } from '@/utils/string'
import { Arguments } from 'components/common/Arguments'
import { CopyButton } from 'components/common/CopyButton'
import { List, StyledListItem } from 'components/common/List'
import { StatusIcon } from 'components/common/StatusIcon'
import { INTERNAL_ROUTES } from 'constants/routes'
import useDomains from 'hooks/useDomains'

dayjs.extend(relativeTime)

type Props = {
  extrinsic: Extrinsic
  isDesktop?: boolean
}

export const ExtrinsicDetailsCard: FC<Props> = ({ extrinsic, isDesktop = false }) => {
  const { selectedChain, selectedDomain } = useDomains()

  const [module, call] = extrinsic.name.split('.')

  return (
    <div className='w-full'>
      <div className='flex'>
        <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white p-4 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset sm:p-6'>
          <div className='mb-10 flex items-center justify-between'>
            <h3 className='text-sm font-medium text-grayDarker dark:text-white  md:text-2xl'>
              Extrinsic #{extrinsic.block.height}-{extrinsic.indexInBlock}
            </h3>
            <div className='flex items-center justify-center gap-2 rounded-full bg-grayDarker px-5 py-3'>
              <div className=' block text-xs font-semibold leading-normal text-white'>
                #{extrinsic.block.height}
              </div>
              <StatusIcon status={extrinsic.success} />
            </div>
          </div>
          <div className='flex w-full flex-col gap-5 md:flex-row'>
            <div className='w-full md:flex-1'>
              <List>
                <StyledListItem title='Timestamp'>
                  {dayjs(extrinsic.block.timestamp).format('DD MMM YYYY | HH:mm:ss(Z)')}
                </StyledListItem>
                <StyledListItem title='Block Number'>
                  <Link
                    href={INTERNAL_ROUTES.blocks.id.page(
                      selectedChain.urls.page,
                      selectedDomain,
                      extrinsic.block.height,
                    )}
                  >
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
                <StyledListItem title='Module'>{module}</StyledListItem>
                <StyledListItem title='Call'>{call}</StyledListItem>
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
            <div className='mb-4 w-full break-all rounded-lg border border-blueLight bg-blueLight p-4 shadow dark:border-none dark:bg-white/10 sm:max-w-xs sm:p-6 lg:max-w-md'>
              <Arguments args={extrinsic.args} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
