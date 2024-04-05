import { Block } from 'components/Block/Block'
import { chains } from 'constants/chains'
import { metadata } from 'constants/metadata'
import { Metadata } from 'next'
import { FC } from 'react'
import type { BlockIdPageProps, ChainPageProps } from 'types/app'

export async function generateMetadata({
  params: { chain, blockId },
}: ChainPageProps & BlockIdPageProps): Promise<Metadata> {
  const chainTitle = chains.find((c) => c.urls.page === chain)?.title || 'Unknown chain'
  const title = `${metadata.title} - ${chainTitle} - Block ${blockId}`
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
  return <Block />
}

export default Page
