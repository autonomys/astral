const title = 'Astral - Autonomys Explorer'
const organization = 'Autonomys Labs'
const description = 'Autonomys Labs Explorer'
const keywords =
  'Autonomys,Autonomys Explorer,Autonomys Network,Autonomys Lab,Autonomys Network Block Explorer'
export const url = process.env.NEXTAUTH_URL || 'https://explorer.autonomys.xyz'
const twitter = '@AutonomysNet'
const images = {
  url: url + '/images/share.png',
  secureUrl: url + '/image/png',
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
