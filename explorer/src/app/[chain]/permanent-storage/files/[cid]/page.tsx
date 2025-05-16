import { File } from '@/components/Storage/Files/File'
import { shortString } from '@autonomys/auto-utils'
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
    `/${chain}/permanent-storage/files/${cid}`,
  )

const Page: FC = () => <File />

export default Page
