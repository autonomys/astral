import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

// gql
import { Block } from "gql/graphql";

// common
import { shortString } from "common/helpers";
import Table, { Column } from "common/components/Table";
import { INTERNAL_ROUTES } from "common/routes";

dayjs.extend(relativeTime);

interface Props {
  blocks: Block[];
}

const BlockList: FC<Props> = ({ blocks }) => {
  // methods
  const generateColumns = (blocks: Block[]): Column[] => [
    {
      title: "Block",
      cells: blocks.map(({ height }) => (
        <Link to={INTERNAL_ROUTES.blocks.id.page(height)}>
          <div>{height}</div>
        </Link>
      )),
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
      cells: blocks.map(() => <div></div>),
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
      title: "Block hash",
      cells: blocks.map(({ hash }) => <div>{shortString(hash)}</div>),
    },
  ];

  // constants
  const columns = generateColumns(blocks);

  return (
    <div className="w-full">
      <div className="rounded my-6">
        <Table
          columns={columns}
          emptyMessage="There are no blocks to show"
          tableProps="bg-white rounded-md"
          tableHeaderProps="border-b border-gray-200"
          id="latest-blocks"
        />
      </div>
    </div>
  );
};

export default BlockList;
