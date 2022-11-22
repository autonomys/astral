import { FC } from 'react';
import { Account } from 'gql/graphql';

// common
import StatItem from 'common/components/StatItem';

// account
import AccountBalancePieChart from './AccountBalancePieChart';
import { bigNumberToNumber } from 'common/helpers';

type Props = {
  account: Account;
};

const AccountBalanceStats: FC<Props> = ({ account }) => {
  const accountFree = bigNumberToNumber(account.free || 0, 18);
  const accountReserved = bigNumberToNumber(account.reserved || 0, 18);
  return (
    <div className="w-full flex bg-[#F3FBFF] rounded-md p-4">
      <AccountBalancePieChart account={account} />
      <div className="flex w-full py-10">
        <div className="flex flex-col gap-8">
          <div className="flex">
            <div className="mr-4 w-1 bg-[#E970F8] h-10" />
            <StatItem title="Transferable" value={`${accountFree} tSSC`} />
          </div>
          <div className="flex">
            <div className="mr-4 w-1 bg-[#9179EC] h-10" />
            <StatItem title="Stacking" value={`${accountReserved} tSSC`} />
          </div>
          <div className="flex">
            <div className="mr-4 w-1 bg-[#D9F0FC] h-10" />
            <StatItem title="Other" value={'0 tSSC'} />
          </div>
        </div>
        <div className="mx-10 w-0.5 bg-[#D9F0FC]" />

        <div className="flex gap-10">
          <div className="flex flex-col gap-8">
            <StatItem title="Received" value="0 tSSC" />
            <StatItem title="Unbounding" value="0 tSSC" />
            <StatItem title="Democracy" value="0 tSSC" />
          </div>
          <div className="flex flex-col gap-8">
            <StatItem title="Election" value="0 tSSC" />
            <StatItem title="Vesting" value="0 tSSC" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountBalanceStats;
