import { shortString } from '@autonomys/auto-utils'
import { CopyButton } from 'components/common/CopyButton'
import { List, StyledListItem } from 'components/common/List'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { FileByIdQuery } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { FC } from 'react'
import { utcToLocalRelativeTime, utcToLocalTime } from 'utils/time'

type Props = {
  file: NonNullable<FileByIdQuery['files_files'][number]>
  isDesktop?: boolean
}

export const FileDetailsCard: FC<Props> = ({ file, isDesktop = false }) => {
  const { network } = useIndexers()

  return (
    <div className='w-full'>
      <div className='flex'>
        <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white p-4 shadow dark:border-none dark:bg-boxDark sm:p-6'>
          <div className='mb-10 flex items-center justify-between'>
            <h3 className='text-sm font-medium text-grayDarker dark:text-white  md:text-2xl'>
              File root CID
            </h3>
            <div className='flex items-center justify-center gap-2 rounded-full bg-buttonDarkTo px-5 py-3'>
              <div className=' block text-xs font-semibold leading-normal text-white'>
                {file.id}
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col gap-5 md:flex-row'>
            <div className='w-full md:flex-1'>
              <List>
                <StyledListItem title='File Name'>{file.name}</StyledListItem>
                <StyledListItem title='CID'>
                  <CopyButton value={file.id ?? ''} message='CID copied'>
                    {isDesktop ? file.id : shortString(file.id ?? '')}
                  </CopyButton>
                </StyledListItem>
                <StyledListItem title='Timestamp'>
                  {utcToLocalTime(file.cid?.timestamp)}
                </StyledListItem>
                <StyledListItem title='Block Number'>
                  <Link
                    href={INTERNAL_ROUTES.blocks.id.page(
                      network,
                      Routes.consensus,
                      file.cid?.blockHeight,
                    )}
                  >
                    <div> {file.cid?.blockHeight}</div>
                  </Link>
                </StyledListItem>
                <StyledListItem title='Block Hash'>
                  <CopyButton value={file.cid?.blockHash ?? ''} message='Hash copied'>
                    {isDesktop ? file.cid?.blockHash : shortString(file.cid?.blockHash ?? '')}
                  </CopyButton>
                </StyledListItem>
                <StyledListItem title='Extrinsic ID'>
                  <Link
                    href={INTERNAL_ROUTES.extrinsics.id.page(
                      network,
                      Routes.consensus,
                      file.cid?.extrinsicId ?? '',
                    )}
                  >
                    <div> {file.cid?.extrinsicId}</div>
                  </Link>
                </StyledListItem>
                <StyledListItem title='Extrinsic Hash'>
                  <CopyButton value={file.cid?.extrinsicHash ?? ''} message='Hash copied'>
                    {isDesktop
                      ? file.cid?.extrinsicHash
                      : shortString(file.cid?.extrinsicHash ?? '')}
                  </CopyButton>
                </StyledListItem>
                <StyledListItem title='Block Time'>
                  {utcToLocalRelativeTime(file.cid?.timestamp)}
                </StyledListItem>
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
