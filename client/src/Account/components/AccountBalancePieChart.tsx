import { FC } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Account } from "gql/graphql";
import { bigNumberToNumber } from "common/helpers";

type Props = {
  account: Account;
};

const AccountBalancePieChart: FC<Props> = ({ account }) => {
  const data = [
    {
      id: "other",
      label: "Other",
      value: 0,
      color: "#D9F0FC",
    },
    {
      id: "transferable",
      label: "Transferable",
      value: bigNumberToNumber(account.free, 18),
      color: "#E970F8",
    },
    {
      id: "staking",
      label: "Staking",
      value: bigNumberToNumber(account.reserved, 18),
      color: "#9179EC",
    },
  ];

  return (
    <div className="h-80 w-2/4">
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 0, bottom: 40, left: 0 }}
        innerRadius={0.5}
        padAngle={0}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ datum: "data.color" }}
        enableArcLabels={false}
        sortByValue={true}
        enableArcLinkLabels={false}
      />
    </div>
  );
};

export default AccountBalancePieChart;
