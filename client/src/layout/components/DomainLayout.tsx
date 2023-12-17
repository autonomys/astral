import { Outlet } from 'react-router-dom'
import Layout from './Layout'
import DomainHeader from './DomainHeader'
import Header from './Header'
import { ErrorBoundary } from 'react-error-boundary'
import Container from './Container'

import { ErrorFallback } from 'common/components'

const DomainLayout = () => {
  return (
    <Layout>
      <DomainHeader />
      <Header />
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

export default DomainLayout
