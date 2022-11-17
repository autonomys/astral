import { FC } from "react";
import { useQuery } from "@apollo/client";

// blockList
import { QUERY_BLOCK_LIST } from "Block/query";

// extrinsicList
import { QUERY_EXTRINSIC_LIST } from "Extrinsic/query";

// home
import HomeBlockList from "Home/components/HomeBlockList";
import HomeExtrinsicList from "Home/components/HomeExtrinsicList";
import HomeChainInfo from "Home/components/HomeChainInfo";

// common
import ErrorFallback from "common/components/ErrorFallback";
import SearchBar from "common/components/SearchBar";
import Spinner from "common/components/Spinner";

const Home: FC = () => {
  const PAGE_SIZE = 10;
  const {
    data: blocksData,
    error: blocksError,
    loading: blocksLoading,
  } = useQuery(QUERY_BLOCK_LIST, {
    variables: { limit: PAGE_SIZE, offset: 0 },
  });

  const {
    data: extrinsicsData,
    error: extrinsicsError,
    loading: extrinsicsLoading,
  } = useQuery(QUERY_EXTRINSIC_LIST, {
    variables: { limit: PAGE_SIZE, offset: 0 },
  });

  if (blocksLoading || extrinsicsLoading) {
    return <Spinner />;
  }

  if (blocksError || !blocksData || extrinsicsError || !extrinsicsData) {
    return <ErrorFallback error={blocksError || extrinsicsError} />;
  }

  return (
    <div className="w-full flex flex-col align-middle">
      <SearchBar />
      <HomeChainInfo blocks={blocksData.blocks} />
      <div className="flex w-full">
        <HomeBlockList blocks={blocksData.blocks} />
        <HomeExtrinsicList extrinsics={extrinsicsData.extrinsics} />
      </div>
    </div>
  );
};

export default Home;
