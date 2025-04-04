import { PublicProfile } from '@/components/Profile/PublicProfile'
import { ChainPageProps } from '@/types/app'
import { Metadata } from 'next'
import { FC } from 'react'

import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Public Profile', undefined, '/images/share.png', false)

const Page: FC = () => {
  return <PublicProfile />
}

export default Page
