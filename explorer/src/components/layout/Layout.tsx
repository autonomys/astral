'use client'

import { CookieBanner } from 'components/common/CookieBanner'
import { ErrorFallback } from 'components/common/ErrorFallback'
import { useOutOfSyncBanner } from 'components/common/OutOfSyncBanner'
import { UnsupportedNetworkBanner } from 'components/common/UnsupportedNetworkBanner'
import { Container } from 'components/layout/Container'
import Footer from 'components/layout/Footer'
import { SectionHeader } from 'components/layout/SectionHeader'
import { usePathname } from 'next/navigation'
import { FC, ReactNode, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ReactGA from 'react-ga4'
import { logError } from 'utils/log'

type Props = {
  children?: ReactNode
  subHeader?: ReactNode
}

export const MainLayout: FC<Props> = ({ children, subHeader }) => {
  const pathname = usePathname()
  const outOfSync = useOutOfSyncBanner()

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: pathname })
  }, [pathname])

  return (
    <div className='relative flex min-h-screen w-full flex-col bg-gradient-to-b from-backgroundLight to-backgroundDark dark:bg-boxDark dark:from-backgroundDarker dark:to-backgroundDarkest'>
      <div className='relative flex min-h-screen w-full flex-col'>
        {outOfSync}
        <UnsupportedNetworkBanner />
        <SectionHeader />
        {subHeader}
        <ErrorBoundary
          fallbackRender={ErrorFallback}
          onReset={() => window.location.reload()}
          onError={async (error) => await logError(pathname, error)}
        >
          <Container>{children}</Container>
        </ErrorBoundary>
        <Footer />
        <div className='sticky bottom-0 w-full'>
          <CookieBanner />
        </div>
      </div>
    </div>
  )
}
