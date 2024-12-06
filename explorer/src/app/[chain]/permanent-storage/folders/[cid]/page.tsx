import { Folder } from '@/components/Storage/Folders/Folder'
import { shortString } from '@autonomys/auto-utils'
import { Routes } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, CIDPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({
  params: { chain, cid },
}: ChainPageProps & CIDPageProps): Metadata =>
  getMetadata(
    chain,
    'File',
    cid ? shortString(cid) : '',
    `${chain}/${Routes.consensus}/folders/${cid}`,
  )

const Page: FC = () => <Folder />

export default Page
