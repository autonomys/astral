import { FC, useState } from "react";
import { useQuery } from "@apollo/client";

// common
import ErrorFallback from "common/components/ErrorFallback";
import TableLoadingSkeleton from "common/components/TableLoadingSkeleton";
//event
import { QUERY_EVENT_LIST } from "Event/query";
import EventTable from "Event/components/EventTable";

const EventList: FC = () => {
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;
  const { data, error, loading } = useQuery(QUERY_EVENT_LIST, {
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
    <EventTable
      events={data.events}
      page={page}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export default EventList;
