import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'
import Container from './Container'
import DomainHeader from './DomainHeader'
import Layout from './Layout'
import OperatorHeader from './OperatorHeader'

import { ErrorFallback } from 'common/components'

const OperatorLayout = () => {
  return (
    <Layout>
      <DomainHeader />
      <OperatorHeader />
      <ErrorBoundary
        fallbackRender={ErrorFallback}
        onReset={() => window.location.reload()}
        // TODO: consider adding error monitoring
        onError={(error) => console.error(error)}
      >
        <Container>
          <Outlet />
        </Container>
      </ErrorBoundary>
    </Layout>
  )
}

export default OperatorLayout
