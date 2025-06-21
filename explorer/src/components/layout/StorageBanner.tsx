import { EXTERNAL_ROUTES } from '@/constants/routes'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { useMemo } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { cn } from 'utils/cn'

export const StorageBanner = () => {
  const isDesktop = useMediaQuery('(min-width: 1280px)')
  const isMobile = useMediaQuery('(max-width: 640px)')

  const features = useMemo(
    () => [
      {
        title: 'End-to-End Encryption',
        desc: 'Secure your data with end-to-end encryption',
        route: EXTERNAL_ROUTES.autoDrive,
      },
      {
        title: 'Create API Keys',
        desc: 'API keys to access decentralized storage',
        route: EXTERNAL_ROUTES.autoDrive,
      },
      {
        title: 'NPM Support',
        desc: 'Auto-Drive secure storage via @autonomys/auto-drive',
        route: EXTERNAL_ROUTES.autoDrivePackage,
      },
      {
        title: 'REST API',
        desc: 'Auto-Drive secure storage via REST API',
        route: EXTERNAL_ROUTES.autoDriveRestApi,
      },
      {
        title: 'Auto-DAG Data Structure',
        desc: 'Uses the Auto-DAG data structure to store data on chain',
        route: EXTERNAL_ROUTES.autoDagPackage,
      },
    ],
    [],
  )

  return (
    <div className='my-t container relative mx-auto mb-8 mt-4 overflow-hidden rounded-lg bg-white p-6 py-16 shadow-lg dark:bg-boxDark'>
      <div className='container relative mx-auto text-center'>
        <div className='space-y-4'>
          <h1 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl'>
            Join Auto Drive &
            <span className='mt-1 block bg-gradient-to-r from-gradientFrom to-gradientVia bg-clip-text text-transparent dark:text-white'>
              Experience the Future of Storage!
            </span>
          </h1>

          <p className='mx-auto max-w-xl text-sm text-gray-600 dark:text-gray-300'>
            Sign in, to Auto Drive now to store, share, and download your files securely with
            Autonomys Network decentralized permanent storage.
          </p>
        </div>

        <div className='mt-6'>
          <Swiper
            slidesPerView={1}
            spaceBetween={12}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              renderBullet: (index, className) =>
                `<span key="${index}" class="${className}" style="background-color: #1949D2;"></span>`,
            }}
            autoplay={
              isMobile
                ? {
                    delay: 3000,
                    disableOnInteraction: false,
                  }
                : false
            }
            breakpoints={{
              460: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 12,
              },
            }}
            modules={[Pagination, Autoplay]}
            className={cn('mx-auto w-full', isDesktop ? '!pb-0' : '!pb-10')}
          >
            <div className='swiper-wrapper items-stretch'>
              {features.map((feature, index) => (
                <SwiperSlide key={`feature-${index}`} className='!h-auto'>
                  <div className='flex h-full'>
                    <Link
                      href={feature.route}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-full'
                    >
                      <div className='flex h-[90px] flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition-all duration-200 hover:bg-gray-100 hover:shadow-md dark:border-gray-700 dark:bg-boxDark dark:hover:bg-grayDarker'>
                        <h3 className='text-center text-sm font-semibold text-gray-900 dark:text-white'>
                          {feature.title}
                        </h3>
                        <div className='flex flex-1 items-center justify-center'>
                          <p className='text-center text-xs text-gray-600 dark:text-gray-300'>
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </div>
            <div className='swiper-pagination mt-4'></div>
          </Swiper>
        </div>

        <div className='mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <Link href={EXTERNAL_ROUTES.autoDrive} target='_blank' rel='noopener noreferrer'>
            <button className='hover:scale-101 inline-flex items-center rounded-lg bg-gradient-to-r from-buttonLightFrom to-buttonLightTo px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gradientVia/20 dark:from-buttonDarkFrom dark:to-buttonDarkTo'>
              Get Started With Auto Drive
              <ArrowRightIcon className='ml-2 size-5' />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StorageBanner
