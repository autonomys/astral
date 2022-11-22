import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';

// common
import ErrorFallback from 'common/components/ErrorFallback';
import Spinner from 'common/components/Spinner';
// event
import { QUERY_EVENT_CONNECTION_LIST } from 'Event/query';
import EventTable from 'Event/components/EventTable';
import SearchBar from 'common/components/SearchBar';
import Pagination from 'common/components/Pagination';

const EventList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastCursor, setLastCursor] = useState(undefined);
  const PAGE_SIZE = 10;

  const {
    data: connectionData,
    error: connectionError,
    loading: connectionLoading,
  } = useQuery(QUERY_EVENT_CONNECTION_LIST, {
    variables: { first: PAGE_SIZE, after: lastCursor },
  });

  if (connectionLoading) {
    return <Spinner />;
  }

  if (connectionError || !connectionData) {
    return <ErrorFallback error={connectionError} />;
  }

  const eventsConnection = connectionData.eventsConnection.edges.map(
    (event) => event.node
  );
  const totalCount = connectionData.eventsConnection.totalCount;

  const pageInfo = connectionData.eventsConnection.pageInfo;

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
      <EventTable events={eventsConnection} />
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

export default EventList;
