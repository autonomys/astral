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
import TableLoadingSkeleton from "common/components/TableLoadingSkeleton";
import ErrorFallback from "common/components/ErrorFallback";
import SearchBar from "common/components/SearchBar";

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
    // return (
    //   <div className="w-full flex flex-col align-middle">
    //     <HomeChainInfo />
    //     <div className="flex w-full">
    //       <TableLoadingSkeleton additionClass="pr-4 py-4 lg:w-1/2 md:w-full" />
    //       <TableLoadingSkeleton additionClass="p-4 lg:w-1/2 md:w-full" />
    //     </div>
    //   </div>
    // );
    return (
      <div className=" w-full min-h-screen flex justify-center items-center">
        <div className="flex min-h-screen w-full items-center justify-center ">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#ABCFEF] via-[#929EEA] to-[#91D3A0] animate-spin">
            <div className="h-9 w-9 rounded-full background-gradient"></div>
          </div>
        </div>
      </div>
    );
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
