import { useState, FC } from "react";
import { useQuery } from "@apollo/client";

// ExtrinsicList
import ExtrinsicTable from "Extrinsic/components/ExtrinsicTable";
import { QUERY_EXTRINSIC_LIST } from "Extrinsic/query";

// common
import TableLoadingSkeleton from "common/components/TableLoadingSkeleton";
import ErrorFallback from "common/components/ErrorFallback";
import SearchBar from "common/components/SearchBar";

const ExtrinsicList: FC = () => {
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;
  const { data, error, loading } = useQuery(QUERY_EXTRINSIC_LIST, {
    variables: { limit: PAGE_SIZE, offset: page * PAGE_SIZE },
  });

  if (loading) {
    //return <TableLoadingSkeleton withPagination={true} />;
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

  if (error || !data) {
    return <ErrorFallback error={error} />;
  }

  const nextPage = () => setPage((prev) => prev + 1);
  const previousPage = () => setPage((prev) => prev - 1);

  return (
    <div className="w-full flex flex-col align-middle">
      <div className="grid grid-cols-2">
        <SearchBar />
      </div>
      <ExtrinsicTable
        extrinsics={data.extrinsics}
        page={page}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
};

export default ExtrinsicList;
