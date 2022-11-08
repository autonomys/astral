import { FC } from "react";
import { Link } from "react-router-dom";
import { Event } from "gql/graphql";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// common
import Pagination from "common/components/Pagination";
import Table, { Column } from "common/components/Table";
import { INTERNAL_ROUTES } from "common/routes";

dayjs.extend(relativeTime);

interface Props {
  events: Event[];
  nextPage: () => void;
  previousPage: () => void;
  page: number;
}

const EventTable: FC<Props> = ({ events, nextPage, previousPage, page }) => {
  // methods
  const generateColumns = (events: Event[]): Column[] => [
    {
      title: "Block",
      cells: events.map(({ block }) => (
        <Link to={INTERNAL_ROUTES.blocks.id.page(block.height)}>
          {block.height}
        </Link>
      )),
    },
    {
      title: "Time",
      cells: events.map(({ block }) => {
        const blockDate = dayjs(block.timestamp).fromNow(true);
        return <div>{blockDate}</div>;
      }),
    },
    {
      title: "Action",
      cells: events.map(({ name }) => <div>{name.split(".")[1]}</div>),
    },
    {
      title: "Type",
      cells: events.map(({ phase }) => <div>{phase}</div>),
    },
    {
      title: "Index in block",
      cells: events.map(({ indexInBlock }) => <div>{indexInBlock}</div>),
    },
  ];

  // constants
  const columns = generateColumns(events);

  return (
    <div className="w-full">
      <div className="rounded my-6">
        <Table
          columns={columns}
          emptyMessage="There are no blocks to show"
          tableProps="shadow-md"
          tableHeaderProps="bg-gray-200"
          footer={
            <Pagination
              page={page}
              nextPage={nextPage}
              previousPage={previousPage}
            />
          }
          id="latest-events"
        />
      </div>
    </div>
  );
};

export default EventTable;
