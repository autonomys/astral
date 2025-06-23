import { shortString } from '@autonomys/auto-utils'
import { CopyButton } from 'components/common/CopyButton'
import { List, StyledListItem } from 'components/common/List'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { FolderByIdQuery } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { FC } from 'react'
import { utcToLocalRelativeTime, utcToLocalTime } from 'utils/time'

type Props = {
  folder: NonNullable<FolderByIdQuery['files_folders'][number]>
  isDesktop?: boolean
}

export const FolderDetailsCard: FC<Props> = ({ folder, isDesktop = false }) => {
  const { network } = useIndexers()

  return (
    <div className='w-full'>
      <div className='flex'>
        <div className='mb-4 w-full rounded-lg border border-slate-100 bg-white p-4 shadow dark:border-none dark:bg-boxDark sm:p-6'>
          <div className='mb-10 flex items-center justify-between'>
            <h3 className='text-sm font-medium text-grayDarker dark:text-white md:text-2xl'>
              Folder root CID
            </h3>
            <div className='flex items-center justify-center gap-2 rounded-lg bg-buttonLightFrom px-5 py-2'>
              <div className='block text-xs font-semibold leading-normal text-white'>
                {folder.id}
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col gap-5 md:flex-row'>
            <div className='w-full md:flex-1'>
              <List>
                <StyledListItem title='Folder Name'>{folder.name}</StyledListItem>
                <StyledListItem title='CID'>
                  <CopyButton value={folder.id ?? ''} message='CID copied'>
                    {isDesktop ? folder.id : shortString(folder.id ?? '')}
                  </CopyButton>
                </StyledListItem>
                <StyledListItem title='Timestamp'>
                  {utcToLocalTime(folder.cid?.timestamp)}
                </StyledListItem>
                <StyledListItem title='Block Number'>
                  <Link
                    href={INTERNAL_ROUTES.blocks.id.page(
                      network,
                      Routes.consensus,
                      folder.cid?.blockHeight,
                    )}
                  >
                    <div> {folder.cid?.blockHeight}</div>
                  </Link>
                </StyledListItem>
                <StyledListItem title='Block Hash'>
                  <CopyButton value={folder.cid?.blockHash ?? ''} message='Hash copied'>
                    {isDesktop ? folder.cid?.blockHash : shortString(folder.cid?.blockHash ?? '')}
                  </CopyButton>
                </StyledListItem>
                <StyledListItem title='Extrinsic ID'>
                  <Link
                    href={INTERNAL_ROUTES.extrinsics.id.page(
                      network,
                      Routes.consensus,
                      folder.cid?.extrinsicId ?? '',
                    )}
                  >
                    <div> {folder.cid?.extrinsicId}</div>
                  </Link>
                </StyledListItem>
                <StyledListItem title='Extrinsic Hash'>
                  <CopyButton value={folder.cid?.extrinsicHash ?? ''} message='Hash copied'>
                    {isDesktop
                      ? folder.cid?.extrinsicHash
                      : shortString(folder.cid?.extrinsicHash ?? '')}
                  </CopyButton>
                </StyledListItem>
                <StyledListItem title='Block Time'>
                  {utcToLocalRelativeTime(folder.cid?.timestamp)}
                </StyledListItem>
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
