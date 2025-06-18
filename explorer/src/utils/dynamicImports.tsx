import dynamic from 'next/dynamic'
import React from 'react'

// Loading components for better UX
const ChartLoading = () => (
  <div className='flex h-80 w-full items-center justify-center'>
    <div className='text-gray-500'>Loading chart...</div>
  </div>
)

const ComponentLoading = () => (
  <div className='flex h-20 w-full items-center justify-center'>
    <div className='text-gray-500'>Loading...</div>
  </div>
)

// Dynamic imports for large components to reduce initial bundle size
export const DynamicChart = dynamic(
  () => import('@nivo/line').then((mod) => ({ default: mod.ResponsiveLine })),
  {
    ssr: false,
    loading: ChartLoading,
  },
)

export const DynamicBarChart = dynamic(
  () => import('@nivo/bar').then((mod) => ({ default: mod.ResponsiveBar })),
  {
    ssr: false,
    loading: ChartLoading,
  },
)

export const DynamicPieChart = dynamic(
  () => import('@nivo/pie').then((mod) => ({ default: mod.ResponsivePie })),
  {
    ssr: false,
    loading: ChartLoading,
  },
)

// Dynamic imports for heavy UI components
export const DynamicSwiper = dynamic(
  () => import('swiper/react').then((mod) => ({ default: mod.Swiper })),
  {
    ssr: false,
    loading: ComponentLoading,
  },
)

export const DynamicSwiperSlide = dynamic(
  () => import('swiper/react').then((mod) => ({ default: mod.SwiperSlide })),
  {
    ssr: false,
    loading: ComponentLoading,
  },
)

// Dynamic imports for Polkadot components
export const DynamicIdenticon = dynamic(
  () => import('@polkadot/react-identicon').then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: ComponentLoading,
  },
)

// Dynamic imports for form components
export const DynamicFormik = dynamic(
  () => import('formik').then((mod) => ({ default: mod.Form })),
  {
    ssr: false,
    loading: ComponentLoading,
  },
)

export const DynamicField = dynamic(
  () => import('formik').then((mod) => ({ default: mod.Field })),
  {
    ssr: false,
    loading: ComponentLoading,
  },
)

// Dynamic imports for heavy utility libraries
export const DynamicEthers = {
  formatUnits: () => import('ethers').then((mod) => mod.formatUnits),
  isAddress: () => import('ethers').then((mod) => mod.isAddress),
}

// Dynamic imports for heavy components that are not immediately needed
export const DynamicTransfer = dynamic(
  () => import('../components/Transfer').then((mod) => ({ default: mod.Transfer })),
  {
    ssr: false,
    loading: ComponentLoading,
  },
)

export const DynamicStaking = dynamic(
  () =>
    import('../components/Staking/StakingComingSoon').then((mod) => ({
      default: mod.StakingComingSoon,
    })),
  {
    ssr: false,
    loading: ComponentLoading,
  },
)

export const DynamicStorage = dynamic(
  () => import('../components/Storage/Files/FileList').then((mod) => ({ default: mod.FileList })),
  {
    ssr: false,
    loading: ComponentLoading,
  },
)

export const DynamicLeaderboard = dynamic(
  () => import('../components/Leaderboard').then((mod) => ({ default: mod.AccountLeaderboard })),
  {
    ssr: false,
    loading: ComponentLoading,
  },
)

// Dynamic imports for heavy libraries
export const DynamicLottie = dynamic(
  () => import('lottie-react').then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: ComponentLoading,
  },
)

export const DynamicQRCode = dynamic(
  () => import('qrcode.react').then((mod) => ({ default: mod.QRCodeSVG })),
  {
    ssr: false,
    loading: ComponentLoading,
  },
)

export const DynamicReactJson = dynamic(
  () => import('react-json-view').then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: ComponentLoading,
  },
)

export const DynamicSwaggerUI = dynamic(
  () => import('swagger-ui-react').then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: ComponentLoading,
  },
)
