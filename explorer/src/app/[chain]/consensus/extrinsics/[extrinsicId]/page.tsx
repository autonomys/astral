import { shortString } from '@/utils/string'
import { Extrinsic } from 'components/Extrinsic/Extrinsic'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, ExtrinsicIdPageProps } from 'types/app'

export async function generateMetadata({
  params: { chain, extrinsicId },
}: ChainPageProps & ExtrinsicIdPageProps): Promise<Metadata> {
  const chainTitle = indexers.find((c) => c.network === chain)?.title || 'Unknown chain'
  const title = `${metadata.title} - ${chainTitle} - Extrinsic ${extrinsicId ? shortString(extrinsicId) : ''}`
  return {
    ...metadata,
    title,
    openGraph: {
      ...metadata.openGraph,
      title,
    },
    twitter: {
      ...metadata.twitter,
      title,
    },
  }
}

const Page: FC = () => {
  return <Extrinsic />
}

export default Page
