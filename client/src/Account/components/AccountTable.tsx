import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

// gql
import { Account } from "gql/graphql";

// common
import Table, { Column } from "common/components/Table";
import { INTERNAL_ROUTES } from "common/routes";
import { bigNumberToNumber } from "common/helpers";

dayjs.extend(relativeTime);

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
      cells: accounts.map(({ id }) => (
        <Link to={INTERNAL_ROUTES.accounts.id.page(id)}>
          <div>{id}</div>
        </Link>
      )),
    },
    {
      title: "Extrinsics",
      cells: accounts.map(({ extrinsics }) => <div>{extrinsics.length}</div>),
    },
    {
      title: "Locked (TSSC)",
      cells: accounts.map(({ reserved }) => (
        <div>{bigNumberToNumber(reserved || 0, 18)}</div>
      )),
    },
    {
      title: "Balance (TSSC)",
      cells: accounts.map(({ total }) => (
        <div>{bigNumberToNumber(total || 0, 18)}</div>
      )),
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
          tableProps="bg-white rounded-md"
          tableHeaderProps="border-b border-gray-200"
          id="accounts-list"
        />
      </div>
    </div>
  );
};

export default AccountTable;
