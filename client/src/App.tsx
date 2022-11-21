import { BrowserRouter, Routes, Route } from 'react-router-dom'

// common
import { INTERNAL_ROUTES } from 'common/routes'
// block
import BlockList from 'Block/components/BlockList'
import Block from 'Block/components/Block'
// extrinsic
import Extrinsic from 'Extrinsic/components/Extrinsic'
import ExtrinsicList from 'Extrinsic/components/ExtrinsicList'
// layout
import { Layout, Container, Footer, Header } from 'layout/components'
// home
import Home from "Home";
// account
import AccountList from "Account/components/AccountList";
import Account from "Account/components/Account";
//event
import EventList from "Event/components/EventList";
import HeaderBackground from "layout/components/HeaderBackground";

// Import Swiper styles
import "swiper/css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Container>
          <HeaderBackground />
          <Routes>
            <Route element={<Home />} path={INTERNAL_ROUTES.home} />
            <Route path={INTERNAL_ROUTES.blocks.list}>
              <Route index element={<BlockList />} />
              <Route
                element={<Block />}
                path={INTERNAL_ROUTES.blocks.id.path}
              />
            </Route>
            <Route path={INTERNAL_ROUTES.extrinsics.list}>
              <Route index element={<ExtrinsicList />} />
              <Route
                path={INTERNAL_ROUTES.extrinsics.id.path}
                element={<Extrinsic />}
              />
            </Route>
            <Route path={INTERNAL_ROUTES.accounts.list}>
              <Route index element={<AccountList />} />
              <Route
                path={INTERNAL_ROUTES.accounts.id.path}
                element={<Account />}
              />
            </Route>
            <Route path={INTERNAL_ROUTES.events.list}>
              <Route index element={<EventList />} />
            </Route>
          </Routes>
        </Container>
        <Footer />
      </Layout>
    </BrowserRouter>
  )
}

export default App
