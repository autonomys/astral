'use client'

import { CookieBanner } from 'components/common/CookieBanner'
import { ErrorFallback } from 'components/common/ErrorFallback'
import { Container } from 'components/layout/Container'
import { DomainHeader } from 'components/layout/DomainHeader'
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

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: pathname })
  }, [pathname])

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-b from-[#F1F7F8] to-[#EFFDFF] font-['Montserrat'] dark:bg-dark">
      <div className="relative flex min-h-screen w-full flex-col bg-[url('/images/backgroundColor.svg')] bg-cover font-['Montserrat']">
        <DomainHeader />
        {subHeader}
        <ErrorBoundary
          fallbackRender={ErrorFallback}
          onReset={() => window.location.reload()}
          // TODO: consider adding error monitoring
          onError={(error) => console.error(error)}
        >
          <Container>{children}</Container>
        </ErrorBoundary>
        <div className='sticky bottom-0 w-full'>
          <CookieBanner />
        </div>
      </div>
    </div>
  )
}
