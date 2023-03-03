import { useEffect, useLayoutEffect } from 'react'
import { HashRouter, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ErrorBoundary } from 'react-error-boundary'

// common
import { ErrorFallback } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'

// block
import { Block, BlockList } from 'Block/components'

// extrinsic
import { Extrinsic, ExtrinsicList } from 'Extrinsic/components'

// layout
import { Layout, Container, Footer, Header, NotFound, HeaderBackground } from 'layout/components'

// home
import Home from 'Home'

// account
import { AccountList, Account } from 'Account/components'

// event
import { Event, EventList } from 'Event/components'

// log
import { Log, LogList } from 'Log/components'
import { useDomains } from 'common/providers/ChainProvider'

// force page scroll to top on route change
function ScrollToTopWrapper({ children }) {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}

// force page scroll to top on route change
function UpdateURLOnRefresh({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { selectedChain } = useDomains()

  useEffect(() => {
    if (location.pathname !== selectedChain.urls.page) {
      navigate(selectedChain.urls.page)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChain])
  return children
}

function App() {
  const { selectedChain } = useDomains()

  return (
    <HashRouter>
      <ScrollToTopWrapper>
        <UpdateURLOnRefresh>
          <Layout>
            {/* TODO: add DomainHeader once we have support for domains */}
            <Header />
            <ErrorBoundary
              fallbackRender={ErrorFallback}
              onReset={() => window.location.reload()}
              // TODO: consider adding error monitoring
              onError={(error) => console.error(error)}
            >
              <Container>
                <HeaderBackground />
                <Routes>
                  <Route
                    path={INTERNAL_ROUTES.home}
                    element={<Navigate to={selectedChain.urls.page} />}
                  />
                  <Route path={':network'}>
                    <Route index element={<Home />} />
                    <Route path={INTERNAL_ROUTES.blocks.list}>
                      <Route index element={<BlockList />} />
                      <Route element={<Block />} path={INTERNAL_ROUTES.blocks.id.path} />
                    </Route>
                    <Route path={INTERNAL_ROUTES.extrinsics.list}>
                      <Route index element={<ExtrinsicList />} />
                      <Route path={INTERNAL_ROUTES.extrinsics.id.path} element={<Extrinsic />} />
                    </Route>
                    <Route path={INTERNAL_ROUTES.accounts.list}>
                      <Route index element={<AccountList />} />
                      <Route path={INTERNAL_ROUTES.accounts.id.path} element={<Account />} />
                    </Route>
                    <Route path={INTERNAL_ROUTES.events.list}>
                      <Route index element={<EventList />} />
                      <Route path={INTERNAL_ROUTES.events.id.path} element={<Event />} />
                    </Route>
                    <Route path={INTERNAL_ROUTES.logs.list}>
                      <Route index element={<LogList />} />
                      <Route path={INTERNAL_ROUTES.logs.id.path} element={<Log />} />
                    </Route>
                  </Route>

                  <Route element={<NotFound />} path={INTERNAL_ROUTES.notFound} />
                </Routes>
              </Container>
            </ErrorBoundary>
            <Footer />
            <Toaster />
          </Layout>
        </UpdateURLOnRefresh>
      </ScrollToTopWrapper>
    </HashRouter>
  )
}

export default App
