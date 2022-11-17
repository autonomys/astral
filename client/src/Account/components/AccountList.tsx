import { FC, useState } from "react";
import { useQuery } from "@apollo/client";

// account
import AccountTable from "Account/components/AccountTable";
import { QUERY_ACCOUNT_LIST } from "Account/query";

// common
import TableLoadingSkeleton from "common/components/TableLoadingSkeleton";
import ErrorFallback from "common/components/ErrorFallback";

const AccountList: FC = () => {
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;
  const { data, error, loading } = useQuery(QUERY_ACCOUNT_LIST, {
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

  const accounts = data.accounts;

  return (
    <AccountTable
      accounts={accounts}
      page={page}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export default AccountList;
