import { Swap } from 'components/Swap'
import { chains } from 'constants/chains'
import { metadata } from 'constants/metadata'
import { Metadata } from 'next'
import { FC } from 'react'
import type { AccountIdPageProps, ChainPageProps } from 'types/app'

export async function generateMetadata({
  params: { chain },
}: ChainPageProps & AccountIdPageProps): Promise<Metadata> {
  const chainTitle = chains.find((c) => c.urls.page === chain)?.title || 'Unknown chain'
  const title = `${metadata.title} - ${chainTitle} - Swap`
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
  return <Swap />
}

export default Page
