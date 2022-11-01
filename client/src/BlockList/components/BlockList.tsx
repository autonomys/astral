import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// gql
import { Block } from "gql/graphql";

// common
import { shortString } from "common/helpers";
import Table, { Column } from "common/components/Table";
import Pagination from "common/components/Pagination";

dayjs.extend(relativeTime);

interface Props {
  blocks: Block[];
  nextPage: () => void;
  previousPage: () => void;
  page: number;
}

const BlockList: FC<Props> = ({ blocks, nextPage, previousPage, page }) => {
  // methods
  const generateColumns = (blocks: Block[]): Column[] => [
    {
      title: "Block",
      cells: blocks.map(({ height }) => <div>{height}</div>),
    },
    {
      title: "Time",
      cells: blocks.map(({ timestamp }) => {
        const blockDate = dayjs(timestamp).fromNow(true);
        return <div>{blockDate}</div>;
      }),
    },
    {
      title: "Status",
      cells: blocks.map((ghy) => <div></div>),
    },
    {
      title: "Extrinsics",
      cells: blocks.map(({ extrinsics }) => <div>{extrinsics?.length}</div>),
    },
    {
      title: "Events",
      cells: blocks.map(({ events }) => <div>{events?.length}</div>),
    },
    {
      title: "Validator",
      cells: blocks.map(({ validator }) => <div>{validator}</div>),
    },
    {
      title: "Block hash",
      cells: blocks.map(({ hash }) => <div>{shortString(hash)}</div>),
    },
  ];

  // constants
  const columns = generateColumns(blocks);

  return (
    <Table
      columns={columns}
      emptyMessage="There are no blocks to show"
      footer={
        <Pagination
          page={page}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      }
      id="latest-blocks"
    />
  );
};

export default BlockList;
