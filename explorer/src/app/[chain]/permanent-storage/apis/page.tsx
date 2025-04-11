import { APIs } from '@/components/Storage/APIs/APIs'
import { getMetadata } from '@/utils/metadata/basic'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'APIs', undefined, '/images/share-permanent-storage.png')

const Page: FC = () => <APIs />

export default Page
