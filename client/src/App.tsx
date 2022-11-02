import { BrowserRouter, Routes, Route } from "react-router-dom";

// blockList
import BlockListContainer from "BlockList";
// extrinsicList
import ExtrinsicListContainer from "ExtrinsicList";
// layout
import { Layout, Container, Footer, Header } from "layout/components";
// home
import Home from "Home";
import { INTERNAL_ROUTES } from "common/routes";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Container>
          <Routes>
            <Route path={INTERNAL_ROUTES.home} element={<Home />} />
            <Route
              path={INTERNAL_ROUTES.blocks}
              element={<BlockListContainer />}
            />
            <Route
              path={INTERNAL_ROUTES.extrinsics}
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
