import { FC, useState } from 'react'
import { useQuery } from '@apollo/client'

// block
import BlockTable from 'Block/components/BlockTable';
import { QUERY_BLOCK_LIST_CONNECTION } from 'Block/query';

// common
import Spinner from 'common/components/Spinner';
import ErrorFallback from 'common/components/ErrorFallback';
import SearchBar from 'common/components/SearchBar';
import Pagination from 'common/components/Pagination';

const BlockList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastCursor, setLastCursor] = useState(undefined);
  const PAGE_SIZE = 10;

  const {
    data: connectionData,
    error: connectionError,
    loading: connectionLoading,
  } = useQuery(QUERY_BLOCK_LIST_CONNECTION, {
    variables: { first: PAGE_SIZE, after: lastCursor },
  });

  if (connectionLoading) {
    return <Spinner />;
  }

  if (connectionError || !connectionData) {
    return <ErrorFallback error={connectionError} />;
  }

  const blocksConnection = connectionData.blocksConnection.edges.map(
    (block) => block.node
  );
  const totalCount = connectionData.blocksConnection.totalCount;

  const pageInfo = connectionData.blocksConnection.pageInfo;

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    setLastCursor(pageInfo.endCursor);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
    setLastCursor(pageInfo.endCursor);
  };

  return (
    <div className="w-full flex flex-col align-middle">
      <div className="grid grid-cols-2">
        <SearchBar />
      </div>
      <BlockTable blocks={blocksConnection} />
      <Pagination
        nextPage={handleNextPage}
        previousPage={handlePreviousPage}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        totalCount={totalCount}
        hasNextPage={pageInfo.hasNextPage}
        hasPreviousPage={pageInfo.hasPreviousPage}
      />
    </div>
  );
};

export default BlockList
