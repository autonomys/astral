import { ExtrinsicList } from 'components/Extrinsic/ExtrinsicList'
import { chains } from 'constants/chains'
import { metadata } from 'constants/metadata'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import type { ChainPageProps } from 'types/app'

export async function generateMetadata({ params: { chain } }: ChainPageProps): Promise<Metadata> {
  const headersList = headers()
  const domain = headersList.get('x-forwarded-host') || ''
  const protocol = headersList.get('x-forwarded-proto') || ''

  const chainTitle = chains.find((c) => c.urls.page === chain)?.title || 'Unknown chain'
  const title = `${metadata.title} - ${chainTitle} - Extrinsics`
  return {
    ...metadata,
    title,
    openGraph: {
      ...metadata.openGraph,
      title,
      images: {
        ...metadata.openGraph.images,
        url: new URL(`${chain}/image`, `${protocol}://${domain}`).toString(),
        secureUrl: new URL(`${chain}/image`, `${protocol}://${domain}`).toString(),
      },
    },
    twitter: {
      ...metadata.twitter,
      title,
      images: {
        ...metadata.twitter.images,
        url: new URL(`${chain}/image`, `${protocol}://${domain}`).toString(),
        secureUrl: new URL(`${chain}/image`, `${protocol}://${domain}`).toString(),
      },
    },
  }
}

export default async function Page() {
  return <ExtrinsicList />
}
