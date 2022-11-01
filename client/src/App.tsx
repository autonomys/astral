import { BrowserRouter, Routes, Route } from "react-router-dom";

// blockList
import BlockListContainer from "BlockList";
// extrinsicList
import ExtrinsicListContainer from "ExtrinsicList";
// layout
import { Layout, Container, Footer, Header } from "layout/components";
// home
import Home from "Home";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="blocks" element={<BlockListContainer />} />
            <Route path="extrinsics" element={<ExtrinsicListContainer />} />
          </Routes>
        </Container>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
