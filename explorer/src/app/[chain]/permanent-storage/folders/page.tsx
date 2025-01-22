import { FolderList } from '@/components/Storage/Folders/FolderList'
import { getMetadata } from '@/utils/metadata/basic'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Folders', undefined)

const Page: FC = () => <FolderList />

export default Page
