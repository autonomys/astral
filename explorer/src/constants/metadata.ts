const title = 'Astral - Subspace Explorer'
const organization = 'Subspace Labs'
const description = 'Subspace Labs Gemini Block Explorer'
const keywords =
  'Subspace, Subspace Network, Subspace Explorer, Subspace Labs, Subspace Labs Gemini, Subspace Labs Gemini Block Explorer'
export const url = 'https://explorer.subspace.network'
const twitter = '@SubspaceLabs'
const images = {
  url: url + '/images/share.png',
  secureUrl: url + 'image/png',
  width: 900,
  height: 600,
  alt: title,
}
const videos = {
  url: 'https://www.youtube.com/watch?v=S60OLuW-fe0',
  secureUrl: 'https://www.youtube.com/watch?v=S60OLuW-fe0',
  type: 'text/html',
  width: 1280,
  height: 720,
}

export const lang = 'en'
export const metadata = {
  title,
  description,
  icons: { icon: '/favicon.ico', apple: '/favicon.ico' },
  manifest: '/manifest.json',
  metadataBase: new URL(url),
  keywords: keywords ? keywords.split(',') : [],
  authors: {
    name: organization,
    url,
  },
  publisher: organization,
  robots: { index: true, follow: true },
  openGraph: {
    title,
    type: 'website',
    url,
    siteName: title,
    description,
    images,
    videos,
  },
  twitter: {
    card: 'summary_large_image',
    site: twitter,
    description,
    title,
    images,
  },
  formatDetection: { telephone: true },
}
