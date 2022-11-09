import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

// common
import Table, { Column } from "common/components/Table";
import { shortString } from "common/helpers";
import { INTERNAL_ROUTES } from "common/routes";

//gql
import { Extrinsic } from "gql/graphql";

dayjs.extend(relativeTime);

interface Props {
  extrinsics: Extrinsic[];
}

const HomeExtrinsicList: FC<Props> = ({ extrinsics }) => {
  // methods
  const generateColumns = (extrinsics: Extrinsic[]): Column[] => [
    {
      title: "ID",
      cells: extrinsics.map(({ block, pos, id }) => (
        <Link to={INTERNAL_ROUTES.extrinsics.id.page(id)}>
          <div>{`${pos}.${block.height}`}</div>
        </Link>
      )),
    },
    {
      title: "Block",
      cells: extrinsics.map(({ block }) => <div>{block.height}</div>),
    },
    {
      title: "Time",
      cells: extrinsics.map(({ block }) => {
        const blockDate = dayjs(block.timestamp).fromNow(true);
        return <div>{blockDate}</div>;
      }),
    },
    {
      title: "Action",
      cells: extrinsics.map(({ call }) => (
        <div>{call.name.split(".")[1].toUpperCase()}</div>
      )),
    },
    {
      title: "Block hash",
      cells: extrinsics.map(({ hash }) => <div>{shortString(hash)}</div>),
    },
  ];

  // constants
  const columns = generateColumns(extrinsics);

  return (
    <div className="flex-col p-4 lg:w-1/2 md:w-full border border-gray-200 rounded-lg ml-2">
      <div className="inline-flex justify-between align-middle w-full mb-6">
        <div className="text-gray-600 uppercase text-md leading-normal">
          Latest Extrinsics
        </div>
        <Link
          to={INTERNAL_ROUTES.extrinsics.list}
          className="px-2 py-2 rounded-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
        >
          View all
        </Link>
      </div>
      <Table
        columns={columns}
        emptyMessage="There are no extrinsics to show"
        id="home-latest-extrinsics"
      />
    </div>
  );
};

export default HomeExtrinsicList;
