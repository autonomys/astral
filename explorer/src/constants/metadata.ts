/**
 * Central metadata configuration for the Autonomys Explorer
 *
 * This file contains the base metadata used throughout the application.
 *
 * The keywords are organized by category to make maintenance easier.
 * New global keywords should be added here, while page-specific ones
 * can be added to the respective page components.
 */

const title = 'Autonomys Network Explorer | Blocks, Staking, Storage & More'
const organization = 'Autonomys Labs'
const description =
  'Dive into Autonomys Network blockchain data: view consensus metrics, stake with validators, transfer tokens, and store data permanently on a decentralized Web3 network'
const keywords = [
  // Brand keywords
  'Autonomys',
  'Autonomys Explorer',
  'Autonomys Network',
  'Autonomys Labs',
  'Autonomys Network Block Explorer',
  'Autonomys Network Explorer',
  'Autonomys blockchain',
  'Autonomys blocks',
  'Autonomys transactions',
  'Autonomys accounts',
  'Autonomys PoAS consensus (Proof-of-Archival-Storage)',
  'Autonomys Block analysis',
  'Autonomys Transaction details',
  'Autonomys Blockchain explorer',
  'Autonomy Network blockchain explorer',
  'Autonomy Network block explorer',
  'Autonomy Network transaction search',
  'Autonomy Network PoAS consensus',
  'Search Autonomy Network addresses',
  'Autonomys Staking',
  'Autonomys Staking Interface',
  'Autonomys Storage',
  'Autonomys Permanent Storage',
  'Decentralized Storage',
  'Blockchain Storage',
  'Autonomys Farming',
  'Storage Farming',
  'Storage Provider',
  'Autonomys Mining',
  'Blockchain Mining',
  'Autonomys Rewards',
  'Storage Rewards',
  'Autonomys Transfer',
  'Token Transfer',
  'Send Tokens',
  'Blockchain Transactions',
  'Autonomys Wallet',
  'Cryptocurrency Transfer',
  'Digital Asset Transfer',
]
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
  keywords,
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
