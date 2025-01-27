import { FileList } from '@/components/Storage/Files/FileList'
import { getMetadata } from '@/utils/metadata/basic'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Files', undefined, '/images/share-permanent-storage.png')

const Page: FC = () => <FileList />

export default Page
