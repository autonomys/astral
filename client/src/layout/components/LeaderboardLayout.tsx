import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from './Layout'
import DomainHeader from './DomainHeader'
import LeaderBoardHeader from './LeaderboardHeader'
import { ErrorBoundary } from 'react-error-boundary'
import Container from './Container'

import { ErrorFallback } from 'common/components'

const LeaderboardLayout = () => {
  return (
    <Layout>
      <DomainHeader />
      <LeaderBoardHeader />
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

export default LeaderboardLayout
