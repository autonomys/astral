import { chainesSet, chains } from 'constants/chains'
import { lang, metadata } from 'constants/metadata'
import { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { Provider } from 'providers'
import type { ChainPageProps } from 'types/app'
import '../../styles/index.css'

export async function generateStaticParams() {
  return Array.from(chainesSet).map((chain) => ({ chain }))
}

export default async function RootLayout({
  children,
}: ChainPageProps & { children: React.ReactNode }) {
  return (
    <html lang={lang}>
      <head lang='en' />
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
}

export async function generateMetadata({ params: { chain } }: ChainPageProps): Promise<Metadata> {
  const headersList = headers()
  const domain = headersList.get('x-forwarded-host') || ''
  const protocol = headersList.get('x-forwarded-proto') || ''

  const chainTitle = chains.find((c) => c.urls.page === chain)?.title || 'Unknown chain'
  return {
    ...metadata,
    title: `${metadata.title} - ${chainTitle}`,
    openGraph: {
      ...metadata.openGraph,
      title: `${metadata.openGraph.title} - ${chainTitle}`,
      images: {
        ...metadata.openGraph.images,
        url: new URL(`${chain}/image`, `${protocol}://${domain}`).toString(),
        secureUrl: new URL(`${chain}/image`, `${protocol}://${domain}`).toString(),
      },
    },
    twitter: {
      ...metadata.twitter,
      title: `${metadata.twitter.title} - ${chainTitle}`,
      images: {
        ...metadata.twitter.images,
        url: new URL(`${chain}/image`, `${protocol}://${domain}`).toString(),
        secureUrl: new URL(`${chain}/image`, `${protocol}://${domain}`).toString(),
      },
    },
  }
}
