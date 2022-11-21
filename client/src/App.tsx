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
import Home from 'Home'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Container>
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
                index
                element={<Extrinsic />}
                path={INTERNAL_ROUTES.extrinsics.id.path}
              />
            </Route>
          </Routes>
        </Container>
        <Footer />
      </Layout>
    </BrowserRouter>
  )
}

export default App
