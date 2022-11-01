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
    return <TableLoadingSkeleton withPagination={true} />;
  }

  // TODO: Add error component
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
