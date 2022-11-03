import { FC } from "react";
import { useQuery } from "@apollo/client";

// blockList
import { QUERY_BLOCK_LIST } from "Block/query";

// extrinsicList
import { QUERY_EXTRINSIC_LIST } from "ExtrinsicList/query";

// home
import HomeBlockList from "Home/components/HomeBlockList";
import HomeExtrinsicList from "Home/components/HomeExtrinsicList";
import HomeChainInfo from "Home/components/HomeChainInfo";

// common
import TableLoadingSkeleton from "common/components/TableLoadingSkeleton";
import ErrorFallback from "common/components/ErrorFallback";

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
    return (
      <div className="w-full flex flex-col align-middle">
        <HomeChainInfo />
        <div className="flex w-full">
          <TableLoadingSkeleton additionClass="pr-4 py-4 lg:w-1/2 md:w-full" />
          <TableLoadingSkeleton additionClass="p-4 lg:w-1/2 md:w-full" />
        </div>
      </div>
    );
  }

  if (blocksError || !blocksData || extrinsicsError || !extrinsicsData) {
    return <ErrorFallback error={blocksError || extrinsicsError} />;
  }

  return (
    <div className="w-full flex flex-col align-middle">
      <HomeChainInfo />
      <div className="flex w-full">
        <HomeBlockList blocks={blocksData.blocks} />
        <HomeExtrinsicList extrinsics={extrinsicsData.extrinsics} />
      </div>
    </div>
  );
};

export default Home;
