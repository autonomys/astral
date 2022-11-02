import { FC, useState } from "react";
import { useQuery } from "@apollo/client";

// blockList
import BlockList from "BlockList/components/BlockList";
import { QUERY_BLOCK_LIST } from "BlockList/query";

// common
import TableLoadingSkeleton from "common/components/TableLoadingSkeleton";
import ErrorFallback from "common/components/ErrorFallback";

const BlockListContainer: FC = () => {
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;
  const { data, error, loading } = useQuery(QUERY_BLOCK_LIST, {
    variables: { limit: PAGE_SIZE, offset: page * PAGE_SIZE },
  });

  if (loading) {
    return <TableLoadingSkeleton withPagination={true} />;
  }

  if (error || !data) {
    return <ErrorFallback error={error} />;
  }

  const nextPage = () => setPage((prev) => prev + 1);
  const previousPage = () => setPage((prev) => prev - 1);

  return (
    <BlockList
      blocks={data.blocks}
      page={page}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export default BlockListContainer;
