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
    //return <TableLoadingSkeleton withPagination={true} />;
    return (
      <div className=" w-full min-h-screen flex justify-center items-center">
        <div className="flex min-h-screen w-full items-center justify-center ">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#ABCFEF] via-[#929EEA] to-[#91D3A0] animate-spin">
            <div className="h-9 w-9 rounded-full background-gradient"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  const account = data.accountById;

  return (
    <div className="w-full">
      <AccountDetailsCard account={account} />
      <AccountDetailsTabs extrinsics={account.extrinsics} />
    </div>
  );
};

export default Account;
