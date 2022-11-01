import { useState, FC } from "react";
import { useQuery } from "@apollo/client";

// ExtrinsicList
import ExtrinsicList from "ExtrinsicList/components/ExtrinsicList";
import { QUERY_EXTRINSIC_LIST } from "ExtrinsicList/query";

// common
import TableLoadingSkeleton from "common/components/TableLoadingSkeleton";

const BlockListContainer: FC = () => {
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;
  const { data, error, loading } = useQuery(QUERY_EXTRINSIC_LIST, {
    variables: { limit: PAGE_SIZE, offset: page * PAGE_SIZE },
  });

  if (loading) {
    return (
      <div className="w-full">
        <TableLoadingSkeleton />
        <div className="flex py-8 justify-end">
          <div className="animate-pulse">
            <div className="relative z-0 inline-flex shadow-sm">
              <div className="h-10 bg-gray-100 w-12 rounded-l-md"></div>
              <div className="h-10 bg-gray-100 rounded-r-md w-12 "></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  const nextPage = () => setPage((prev) => prev + 1);
  const previousPage = () => setPage((prev) => prev - 1);

  return (
    <ExtrinsicList
      extrinsics={data.extrinsics}
      page={page}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export default BlockListContainer;
