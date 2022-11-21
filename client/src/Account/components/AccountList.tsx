import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';

// account
import AccountTable from 'Account/components/AccountTable';
import { QUERY_ACCOUNT_CONNECTION_LIST } from 'Account/query';

// common
import Spinner from 'common/components/Spinner';
import ErrorFallback from 'common/components/ErrorFallback';
import SearchBar from 'common/components/SearchBar';
import Pagination from 'common/components/Pagination';

const AccountList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastCursor, setLastCursor] = useState(undefined);
  const PAGE_SIZE = 10;

  const {
    data: connectionData,
    error: connectionError,
    loading: connectionLoading,
  } = useQuery(QUERY_ACCOUNT_CONNECTION_LIST, {
    variables: { first: PAGE_SIZE, after: lastCursor },
  });

  if (connectionLoading) {
    return <Spinner />;
  }

  if (connectionError || !connectionData) {
    return <ErrorFallback error={connectionError} />;
  }

  const accountsConnection = connectionData.accountsConnection.edges.map(
    (extrinsic) => extrinsic.node
  );
  const totalCount = connectionData.accountsConnection.totalCount;

  const pageInfo = connectionData.accountsConnection.pageInfo;

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
      <AccountTable accounts={accountsConnection} />
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

export default AccountList;
