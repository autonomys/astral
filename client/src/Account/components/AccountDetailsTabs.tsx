import { FC } from "react";
import { Extrinsic } from "gql/graphql";

// common
import Tabs from "common/components/Tabs";
import AccountExtrinsicList from "./AccountExtrinsicList";

type Props = {
  extrinsics: Extrinsic[];
};

const AccountDetailsTabs: FC<Props> = ({ extrinsics }) => {
  const tabs = [
    {
      title: "Extrinsics",
      content: <AccountExtrinsicList extrinsics={extrinsics} />,
    },
  ];

  return <Tabs id="block-details-tab" tabs={tabs} />;
};

export default AccountDetailsTabs;
