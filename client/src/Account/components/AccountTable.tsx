import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// common
import Table, { Column } from "common/components/Table";

dayjs.extend(relativeTime);

type Account = {
  id: string;
  updatedAt: number;
  total: string;
  reserved: string;
  free: string;
};

interface Props {
  accounts: Account[];
}

const AccountTable: FC<Props> = ({ accounts }) => {
  // methods
  const generateColumns = (accounts: Account[]): Column[] => [
    {
      title: "Rank",
      cells: accounts.map((_, index) => <div>{index + 1}</div>),
    },
    {
      title: "Account",
      cells: accounts.map(({ id }) => {
        return <div>{id}</div>;
      }),
    },
    {
      title: "Extrinsics",
      cells: accounts.map(() => <div></div>),
    },
    {
      title: "Locked (TSSC)",
      cells: accounts.map(({ reserved }) => <div>{reserved}</div>),
    },
    {
      title: "Balance (TSSC)",
      cells: accounts.map(({ free }) => <div>{free}</div>),
    },
  ];

  // constants
  const columns = generateColumns(accounts);

  return (
    <div className="w-full">
      <div className="rounded my-6">
        <Table
          columns={columns}
          emptyMessage="There are no accounts to show"
          tableProps="shadow-md"
          tableHeaderProps="bg-gray-200"
          id="accounts-list"
        />
      </div>
    </div>
  );
};

export default AccountTable;
