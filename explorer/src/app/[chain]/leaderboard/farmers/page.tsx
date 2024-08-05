import { Leaderboard } from 'components/Leaderboard'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { Metadata } from 'next'
import type { ChainPageProps } from 'types/app'

export async function generateMetadata({ params: { chain } }: ChainPageProps): Promise<Metadata> {
  const chainTitle = indexers.find((c) => c.network === chain)?.title || 'Unknown chain'
  const title = `${metadata.title} - ${chainTitle} - Farmers Leaderboard`
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

export default async function Page() {
  return <Leaderboard />
}
