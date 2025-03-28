import { GoogleAnalytics } from '@next/third-parties/google'
import { indexers, networks } from 'constants/indexers'
import { lang, metadata } from 'constants/metadata'
import { Metadata, Viewport } from 'next'
import { Libre_Franklin as LibreFranklin, Roboto_Serif as RobotoSerif } from 'next/font/google'
import { headers } from 'next/headers'
import { Provider } from 'providers'
import { Toaster } from 'react-hot-toast'
import type { ChainPageProps } from 'types/app'
import '../../styles/index.css'

const robotoSerif = RobotoSerif({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-roboto-serif',
})

const libreFranklin = LibreFranklin({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-libre-franklin',
})

export async function generateStaticParams() {
  return Array.from(networks).map((chain) => ({ chain }))
}

export default async function RootLayout({
  children,
}: ChainPageProps & { children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${robotoSerif.variable} ${libreFranklin.variable}`}>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      )}
      <head lang='en' />
      <body>
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
