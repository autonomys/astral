import { GoogleAnalytics } from '@next/third-parties/google'
import { indexers, networks } from 'constants/indexers'
import { lang, metadata } from 'constants/metadata'
import { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import NextTopLoader from 'nextjs-toploader'
import { Provider } from 'providers'
import { Toaster } from 'react-hot-toast'
import type { ChainPageProps } from 'types/app'
import '../../styles/index.css'

export async function generateStaticParams() {
  return Array.from(networks).map((chain) => ({ chain }))
}

export default async function RootLayout({
  children,
}: ChainPageProps & { children: React.ReactNode }) {
  return (
    <html lang={lang}>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      )}
      <head lang='en' />
      <body>
        <NextTopLoader color='#1949D2' height={2} showSpinner={false} />
        <Toaster position='bottom-center' />
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

  const chainTitle = indexers.find((c) => c.network === chain)?.title || 'Unknown chain'
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
