import { ReactNode, useEffect, useLayoutEffect } from 'react'
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
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
import SearchResult from 'layout/components/SearchResult'
import Gemini2Static from 'layout/components/Gemini2Static'

// home
import Home from 'Home'

// account
import { AccountList, Account } from 'Account/components'

// event
import { Event, EventList } from 'Event/components'

// log
import { Log, LogList } from 'Log/components'
import useDomains from 'common/hooks/useDomains'

// force page scroll to top on route change
function ScrollToTopWrapper({ children }) {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}

type Props = {
  children: ReactNode
}

const UpdateSelectedChainByPath = ({ children }: Props) => {
  const { setSelectedChain, selectedChain, chains } = useDomains()

  const location = useLocation()

  useEffect(() => {
    const regex = new RegExp('^/([^/]+)')

    const match = location.pathname.match(regex)

    if (match && match[1] !== selectedChain.urls.page) {
      const urlSelectedPage = match[1]
      const newChain = chains.find((chain) => chain.urls.page === urlSelectedPage)

      if (newChain) {
        setSelectedChain(newChain)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return <>{children}</>
}

function App() {
  const { selectedChain } = useDomains()

  return (
    <HashRouter>
      <ScrollToTopWrapper>
        <Layout>
          {/* TODO: add DomainHeader once we have support for domains */}
          <UpdateSelectedChainByPath>
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
                  {/* Start: Legacy routing support */}
                  {/* TODO: remove when possible */}
                  <Route path='/gemini-2a'>
                    <Route index element={<Gemini2Static />} />
                    <Route path={INTERNAL_ROUTES.blocks.list}>
                      <Route index element={<Gemini2Static />} />
                      <Route path={INTERNAL_ROUTES.blocks.id.path} element={<Gemini2Static />} />
                    </Route>
                    <Route path={INTERNAL_ROUTES.extrinsics.list}>
                      <Route index element={<Gemini2Static />} />
                      <Route
                        path={INTERNAL_ROUTES.extrinsics.id.path}
                        element={<Gemini2Static />}
                      />
                    </Route>
                    <Route path={INTERNAL_ROUTES.accounts.list}>
                      <Route index element={<Gemini2Static />} />
                      <Route path={INTERNAL_ROUTES.accounts.id.path} element={<Gemini2Static />} />
                    </Route>
                    <Route path={INTERNAL_ROUTES.events.list}>
                      <Route index element={<Gemini2Static />} />
                      <Route path={INTERNAL_ROUTES.events.id.path} element={<Gemini2Static />} />
                    </Route>
                    <Route path={INTERNAL_ROUTES.logs.list}>
                      <Route index element={<Gemini2Static />} />
                      <Route path={INTERNAL_ROUTES.logs.id.path} element={<Gemini2Static />} />
                    </Route>
                    <Route path={INTERNAL_ROUTES.search.result.path}>
                      <Route index element={<SearchResult />} />
                    </Route>
                  </Route>
                  {/* End: Legacy routing support */}
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
                    <Route path={INTERNAL_ROUTES.search.result.path}>
                      <Route index element={<SearchResult />} />
                    </Route>
                  </Route>

                  <Route element={<NotFound />} path={INTERNAL_ROUTES.notFound} />
                </Routes>
              </Container>
            </ErrorBoundary>
          </UpdateSelectedChainByPath>
          <Footer />
          <Toaster />
        </Layout>
      </ScrollToTopWrapper>
    </HashRouter>
  )
}

export default App
