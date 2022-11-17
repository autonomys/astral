import { FC } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// common
import TableLoadingSkeleton from "common/components/TableLoadingSkeleton";

// account
import { QUERY_ACCOUNT_BY_ID } from "Account/query";
import AccountDetailsCard from "./AccountDetailsCard";
import AccountDetailsTabs from "./AccountDetailsTabs";

const Account: FC = () => {
  const { accountId } = useParams();

  const { data, error, loading } = useQuery(QUERY_ACCOUNT_BY_ID, {
    variables: { accountId: accountId },
  });

  if (loading) {
    return <TableLoadingSkeleton withPagination={true} />;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  const account = data.accountById;

  return (
    <div className="w-full grid grid-rows-2 gap-3">
      <AccountDetailsCard account={account} />
      <AccountDetailsTabs extrinsics={account.extrinsics} />
    </div>
  );
};

export default Account;
