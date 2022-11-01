import { BrowserRouter, Routes, Route } from "react-router-dom";

// blockList
import BlockListContainer from "BlockList";
// extrinsicList
import ExtrinsicListContainer from "ExtrinsicList";
// layout
import {
  MainLayout,
  MainLayoutContainer,
  MainLayoutFooter,
  MainLayoutHeader,
} from "layout";
// home
import Home from "Home";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <MainLayoutHeader />
        <MainLayoutContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="block" element={<BlockListContainer />} />
            <Route path="extrinsic" element={<ExtrinsicListContainer />} />
          </Routes>
        </MainLayoutContainer>
        <MainLayoutFooter />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
