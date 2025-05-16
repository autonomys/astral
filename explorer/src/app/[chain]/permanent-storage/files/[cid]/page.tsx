import { File } from '@/components/Storage/Files/File'
import { shortString } from '@autonomys/auto-utils'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, CIDPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({
  params: { chain, cid },
}: ChainPageProps & CIDPageProps): Metadata => {
  const metadata = getMetadata(
    chain,
    'File',
    cid ? shortString(cid) : '',
    '/images/auto-drive-banner.svg',
    false,
  )
  console.log(metadata)
  return metadata
}

const Page: FC = () => <File />

export default Page
