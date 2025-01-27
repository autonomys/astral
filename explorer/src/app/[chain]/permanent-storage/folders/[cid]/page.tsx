import { Folder } from '@/components/Storage/Folders/Folder'
import { shortString } from '@autonomys/auto-utils'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, CIDPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({
  params: { chain, cid },
}: ChainPageProps & CIDPageProps): Metadata =>
  getMetadata(chain, 'File', cid ? shortString(cid) : '')

const Page: FC = () => <Folder />

export default Page
