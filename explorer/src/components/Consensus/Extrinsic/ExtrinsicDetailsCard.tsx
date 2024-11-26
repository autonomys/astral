import { shortString } from '@autonomys/auto-utils'
import { Arguments } from 'components/common/Arguments'
import { CopyButton } from 'components/common/CopyButton'
import { List, StyledListItem } from 'components/common/List'
import { StatusIcon } from 'components/common/StatusIcon'
import { INTERNAL_ROUTES } from 'constants/routes'
import { ExtrinsicsByIdQuery } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { FC } from 'react'
import { parseArgs } from 'utils/indexerParsing'
import { utcToLocalRelativeTime, utcToLocalTime } from 'utils/time'

type Props = {
  extrinsic: NonNullable<ExtrinsicsByIdQuery['consensus_extrinsics'][number]>
  isDesktop?: boolean
}

export const ExtrinsicDetailsCard: FC<Props> = ({ extrinsic, isDesktop = false }) => {
  const { network, section } = useIndexers()

  const [module, call] = extrinsic.name.split('.')

  return (
    <div className='w-full'>
      <div className='flex'>
        <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white p-4 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientFrom dark:via-gradientVia dark:to-gradientTo sm:p-6'>
          <div className='mb-10 flex items-center justify-between'>
            <h3 className='text-sm font-medium text-grayDarker dark:text-white  md:text-2xl'>
              Extrinsic #{extrinsic.id}
            </h3>
            <div className='flex items-center justify-center gap-2 rounded-full bg-grayDarker px-5 py-3'>
              <div className=' block text-xs font-semibold leading-normal text-white'>
                #{extrinsic.block_height}
              </div>
              <StatusIcon status={extrinsic.success} />
            </div>
          </div>
          <div className='flex w-full flex-col gap-5 md:flex-row'>
            <div className='w-full md:flex-1'>
              <List>
                <StyledListItem title='Timestamp'>
                  {utcToLocalTime(extrinsic.timestamp)}
                </StyledListItem>
                <StyledListItem title='Block Number'>
                  <Link
                    href={INTERNAL_ROUTES.blocks.id.page(network, section, extrinsic.block_height)}
                  >
                    <div> {extrinsic.block_height}</div>
                  </Link>
                </StyledListItem>
                <StyledListItem title='Block Time'>
                  {utcToLocalRelativeTime(extrinsic.timestamp)}
                </StyledListItem>
                <StyledListItem title='Hash'>
                  <CopyButton value={extrinsic.hash} message='Hash copied'>
                    {isDesktop ? extrinsic.hash : shortString(extrinsic.hash)}
                  </CopyButton>
                </StyledListItem>
                <StyledListItem title='Module'>{module}</StyledListItem>
                <StyledListItem title='Call'>{call}</StyledListItem>
                <StyledListItem title='Sender'>
                  {isDesktop ? extrinsic.signer : shortString(extrinsic.signer)}
                </StyledListItem>
                <StyledListItem title='Signature'>
                  {isDesktop
                    ? shortString(extrinsic.signature || '', 10, 80)
                    : shortString(extrinsic.signature || '')}
                </StyledListItem>
              </List>
            </div>
            <div className='mb-4 w-full break-all rounded-lg border border-purpleLight bg-purpleLight p-4 shadow dark:border-none dark:bg-white/10 sm:max-w-xs sm:p-6 lg:max-w-md'>
              <Arguments args={parseArgs(extrinsic.args)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
