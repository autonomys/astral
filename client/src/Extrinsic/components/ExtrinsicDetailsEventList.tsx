import { FC } from "react";
import { Event } from "gql/graphql";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// common
import Table, { Column } from "common/components/Table";

dayjs.extend(relativeTime);

type Props = {
  events: Event[];
};

const ExtrinsicDetailsEventList: FC<Props> = ({ events }) => {
  // methods
  const generateColumns = (events: Event[]): Column[] => [
    {
      title: "Event Id",
      cells: events.map(({ block, pos }) => (
        <div>{`${block.height}-${pos}`}</div>
      )),
    },
    {
      title: "Extrinsic Id",
      cells: events.map(({ extrinsic }) => (
        <div>
          {extrinsic ? `${extrinsic.block.height}-${extrinsic.pos}` : ""}
        </div>
      )),
    },
    {
      title: "Action",
      cells: events.map(({ name }) => <div>{name.split(".")[1]}</div>),
    },
    {
      title: "Type",
      cells: events.map(({ phase }) => {
        return <div>{phase}</div>;
      }),
    },
  ];

  // constants
  const columns = generateColumns(events);

  return (
    <Table
      columns={columns}
      emptyMessage="There are no events to show"
      id="block-details-event-list"
    />
  );
};

export default ExtrinsicDetailsEventList;
