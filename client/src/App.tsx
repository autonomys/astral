import { BrowserRouter, Routes, Route } from "react-router-dom";

// blockList
import BlockList from "Block/components/BlockList";
// extrinsicList
import ExtrinsicListContainer from "ExtrinsicList";
// layout
import { Layout, Container, Footer, Header } from "layout/components";
// home
import Home from "Home";
import { INTERNAL_ROUTES } from "common/routes";
import Block from "Block/components/Block";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Container>
          <Routes>
            <Route path={INTERNAL_ROUTES.home} element={<Home />} />
            <Route path={INTERNAL_ROUTES.blocks.list}>
              <Route index element={<BlockList />} />
              <Route
                path={INTERNAL_ROUTES.blocks.id.path}
                element={<Block />}
              />
            </Route>
            <Route path={INTERNAL_ROUTES.blocks.list}>
              <Route index element={<BlockList />} />
            </Route>
            <Route
              path={INTERNAL_ROUTES.extrinsics.list}
              element={<ExtrinsicListContainer />}
            />
          </Routes>
        </Container>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
