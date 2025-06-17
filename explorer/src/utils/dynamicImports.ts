import dynamic from 'next/dynamic'

// Dynamic imports for large components to reduce initial bundle size
export const DynamicChart = dynamic(
  () => import('@nivo/line').then((mod) => ({ default: mod.ResponsiveLine })),
  { ssr: false },
)

export const DynamicBarChart = dynamic(
  () => import('@nivo/bar').then((mod) => ({ default: mod.ResponsiveBar })),
  { ssr: false },
)

export const DynamicPieChart = dynamic(
  () => import('@nivo/pie').then((mod) => ({ default: mod.ResponsivePie })),
  { ssr: false },
)

export const DynamicSwiper = dynamic(
  () => import('swiper/react').then((mod) => ({ default: mod.Swiper })),
  { ssr: false },
)

export const DynamicSwiperSlide = dynamic(
  () => import('swiper/react').then((mod) => ({ default: mod.SwiperSlide })),
  { ssr: false },
)

export const DynamicLottie = dynamic(
  () => import('lottie-react').then((mod) => ({ default: mod.default })),
  { ssr: false },
)

export const DynamicQRCode = dynamic(
  () => import('qrcode.react').then((mod) => ({ default: mod.QRCodeSVG })),
  { ssr: false },
)

export const DynamicReactJson = dynamic(
  () => import('react-json-view').then((mod) => ({ default: mod.default })),
  { ssr: false },
)
