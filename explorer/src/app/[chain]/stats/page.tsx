import { Stats } from 'components/Stats'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Stats', undefined)

const Page: FC<ChainPageProps> = () => <Stats />

export default Page
