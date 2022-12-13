import { HashRouter, Routes, Route } from 'react-router-dom'

// common
import { INTERNAL_ROUTES } from 'common/routes'

// block
import { Block, BlockList } from 'Block/components'

// extrinsic
import { Extrinsic, ExtrinsicList } from 'Extrinsic/components'

// layout
import {
  Layout,
  Container,
  Footer,
  Header,
  DomainHeader,
  NotFound,
  HeaderBackground,
} from 'layout/components'

// home
import Home from 'Home'

// account
import { AccountList, Account } from 'Account/components'

// event
import { Event, EventList } from 'Event/components'

// log
import { Log, LogList } from 'Log/components'

// Import Swiper styles
import 'swiper/css'

function App() {
  return (
    <HashRouter>
      <Layout>
        <DomainHeader />
        <Header />
        <Container>
          <HeaderBackground />
          <Routes>
            <Route element={<Home />} path={INTERNAL_ROUTES.home} />
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
            <Route element={<NotFound />} path={INTERNAL_ROUTES.notFound} />
          </Routes>
        </Container>
        <Footer />
      </Layout>
    </HashRouter>
  )
}

export default App
