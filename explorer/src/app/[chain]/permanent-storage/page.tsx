import { FileList } from 'components/Storage/Files/FileList'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, undefined, undefined)

const Page: FC = () => <FileList />

export default Page
