'use client'

import { CookieBanner } from 'components/common/CookieBanner'
import { ErrorFallback } from 'components/common/ErrorFallback'
import { Container } from 'components/layout/Container'
import Footer from 'components/layout/Footer'
import { SectionHeader } from 'components/layout/SectionHeader'
import { usePathname } from 'next/navigation'
import { FC, ReactNode, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ReactGA from 'react-ga4'
import { logError } from 'utils/log'
import { DeprecatingBanner } from '../common/DeprecatingBanner'

type Props = {
  children?: ReactNode
  subHeader?: ReactNode
}

export const MainLayout: FC<Props> = ({ children, subHeader }) => {
  const pathname = usePathname()
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: pathname })
  }, [pathname])

  return (
    <div className='relative flex min-h-screen w-full flex-col bg-gradient-to-b from-backgroundLight to-backgroundDark dark:bg-boxDark dark:from-backgroundDarker dark:to-backgroundDarkest'>
      <div className='relative flex min-h-screen w-full flex-col'>
        <DeprecatingBanner />
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
        <div className='fixed bottom-0 z-10 w-full'>
          <CookieBanner />
        </div>
      </div>
    </div>
  )
}
