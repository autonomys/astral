import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

// gql
import { Extrinsic } from "gql/graphql";

// common
import { shortString } from "common/helpers";
import Table, { Column } from "common/components/Table";
import Pagination from "common/components/Pagination";
import { INTERNAL_ROUTES } from "common/routes";

dayjs.extend(relativeTime);

interface Props {
  extrinsics: Extrinsic[];
  nextPage: () => void;
  previousPage: () => void;
  page: number;
}

const ExtrinsicTable: FC<Props> = ({
  extrinsics,
  page,
  nextPage,
  previousPage,
}) => {
  // methods
  const generateColumns = (extrinsics: Extrinsic[]): Column[] => [
    {
      title: "Block",
      cells: extrinsics.map(({ block, pos, id }) => (
        <Link to={INTERNAL_ROUTES.extrinsics.id.page(id)}>
          <div>{`${block.height}-${pos}`}</div>
        </Link>
      )),
    },
    {
      title: "Time",
      cells: extrinsics.map(({ block }) => {
        const blockDate = dayjs(block.timestamp).fromNow(true);
        return <div>{blockDate}</div>;
      }),
    },
    {
      title: "Status",
      cells: extrinsics.map(() => <div></div>),
    },
    {
      title: "Action",
      cells: extrinsics.map(({ call }) => (
        <div>{call.name.split(".")[1].toUpperCase()}</div>
      )),
    },
    {
      title: "Success",
      cells: extrinsics.map(({ success }) => <div>{success}</div>),
    },
    {
      title: "Block hash",
      cells: extrinsics.map(({ hash }) => <div>{shortString(hash)}</div>),
    },
  ];

  // constants
  const columns = generateColumns(extrinsics);

  return (
    <div className="w-full">
      <div className="rounded my-6">
        <Table
          columns={columns}
          emptyMessage="There are no extrinsics to show"
          id="latest-extrinsics"
          tableProps="shadow-md"
          tableHeaderProps="bg-gray-200"
          footer={
            <Pagination
              page={page}
              nextPage={nextPage}
              previousPage={previousPage}
            />
          }
        />
      </div>
    </div>
  );
};

export default ExtrinsicTable;
