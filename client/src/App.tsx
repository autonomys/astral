import { FC, useLayoutEffect } from 'react'
import { HashRouter, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom'
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
import chains from 'layout/config/chains.json'

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

// Legacy gemini 2 routing support
// TODO: remove when possible
const LegacyGemini2Redirect: FC<{ path: string }> = ({ path }) => {
  const { setSelectedChain } = useDomains()

  // Set selected chain to gemini 2
  setSelectedChain(chains[1])

  const gemini2Chain = chains[1].urls.page

  const params = useParams()

  const [key] = Object.keys(params)
  const param = params[key]

  const to = param ? `/${gemini2Chain}/${path}/${param}` : `/${gemini2Chain}/${path}`

  return <Navigate replace to={to} />
}

const UpdateSelectedChainByPath: FC = () => {
  const { setSelectedChain, selectedChain, chains } = useDomains()

  const location = useLocation()

  const regex = new RegExp('^/([^/]+)')

  const match = location.pathname.match(regex)

  if (match && match[1] !== selectedChain.urls.page) {
    const urlSelectedPage = match[1]
    const newChain = chains.find((chain) => chain.urls.page === urlSelectedPage)

    if (newChain) {
      setSelectedChain(newChain)
    }
  }

  return null
}

function App() {
  const { selectedChain } = useDomains()

  return (
    <HashRouter>
      <ScrollToTopWrapper>
        <Layout>
          {/* TODO: add DomainHeader once we have support for domains */}
          <Header />
          <UpdateSelectedChainByPath />
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
                <Route path={INTERNAL_ROUTES.home}>
                  <Route path={INTERNAL_ROUTES.blocks.list}>
                    <Route index element={<LegacyGemini2Redirect path='blocks' />} />
                    <Route
                      path={INTERNAL_ROUTES.blocks.id.path}
                      element={<LegacyGemini2Redirect path='blocks' />}
                    />
                  </Route>
                  <Route path={INTERNAL_ROUTES.extrinsics.list}>
                    <Route index element={<LegacyGemini2Redirect path='extrinsics' />} />
                    <Route
                      path={INTERNAL_ROUTES.extrinsics.id.path}
                      element={<LegacyGemini2Redirect path='extrinsics' />}
                    />
                  </Route>
                  <Route path={INTERNAL_ROUTES.accounts.list}>
                    <Route index element={<LegacyGemini2Redirect path='accounts' />} />
                    <Route
                      path={INTERNAL_ROUTES.accounts.id.path}
                      element={<LegacyGemini2Redirect path='accounts' />}
                    />
                  </Route>
                  <Route path={INTERNAL_ROUTES.events.list}>
                    <Route index element={<LegacyGemini2Redirect path='events' />} />
                    <Route
                      path={INTERNAL_ROUTES.events.id.path}
                      element={<LegacyGemini2Redirect path='events' />}
                    />
                  </Route>
                  <Route path={INTERNAL_ROUTES.logs.list}>
                    <Route index element={<LegacyGemini2Redirect path='logs' />} />
                    <Route
                      path={INTERNAL_ROUTES.logs.id.path}
                      element={<LegacyGemini2Redirect path='logs' />}
                    />
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
                </Route>

                <Route element={<NotFound />} path={INTERNAL_ROUTES.notFound} />
              </Routes>
            </Container>
          </ErrorBoundary>
          <Footer />
          <Toaster />
        </Layout>
      </ScrollToTopWrapper>
    </HashRouter>
  )
}

export default App
