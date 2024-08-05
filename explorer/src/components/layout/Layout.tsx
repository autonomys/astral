'use client'

import Footer from '@/components/layout/Footer'
import { CookieBanner } from 'components/common/CookieBanner'
import { ErrorFallback } from 'components/common/ErrorFallback'
import { useOutOfSyncBanner } from 'components/common/OutOfSyncBanner'
import { Container } from 'components/layout/Container'
import { SectionHeader } from 'components/layout/SectionHeader'
import { usePathname } from 'next/navigation'
import { FC, ReactNode, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ReactGA from 'react-ga4'

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
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-b from-bronze to-purpleMist font-['Montserrat'] dark:bg-dark">
      <div className="relative flex min-h-screen w-full flex-col bg-[url('/images/backgroundColor.svg')] bg-cover font-['Montserrat']">
        {outOfSync}
        <SectionHeader />
        {subHeader}
        <ErrorBoundary
          fallbackRender={ErrorFallback}
          onReset={() => window.location.reload()}
          // TODO: consider adding error monitoring
          onError={(error) => console.error(error)}
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
