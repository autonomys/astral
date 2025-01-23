import { FileList } from '@/components/Storage/Files/FileList'
import { getMetadata } from '@/utils/metadata/basic'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Files', undefined)

const Page: FC = () => <FileList />

export default Page
