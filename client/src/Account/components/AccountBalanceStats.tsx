import { FC } from 'react'
import { Account } from 'gql/graphql'

// common
import { StatItem } from 'common/components'

// account
import { AccountBalancePieChart } from 'Account/components'
import { bigNumberToNumber } from 'common/helpers'

type Props = {
  account: Account
}

const AccountBalanceStats: FC<Props> = ({ account }) => {
  const accountFree = bigNumberToNumber(account.free || 0, 18)
  const accountReserved = bigNumberToNumber(account.reserved || 0, 18)
  return (
    <div className='w-full flex items-center justify-center flex-col md:gap-5 md:px-5 md:items-start md:flex-row bg-[#F3FBFF] rounded-md p-4 md:justify-start dark:bg-white/10'>
      <div className='flex w-full justify-center items-center lg:items-end lg:justify-end'>
        <AccountBalancePieChart account={account} />
      </div>
      <div className='flex w-full md:py-10 items-center md:gap-5'>
        <div className='flex flex-auto md:flex-none md:flex-col gap-8 justify-center'>
          <div className='flex items-center'>
            <div className='mr-4 w-1 bg-[#E970F8] h-[30px]' />
            <StatItem title='Transferable' value={`${accountFree} tSSC`} />
          </div>
          <div className='flex items-center'>
            <div className='mr-4 w-1 bg-[#9179EC] h-[30px]' />
            <StatItem title='Staking' value={`${accountReserved} tSSC`} />
          </div>
          <div className='hidden md:flex items-center'>
            <div className='mr-4 w-1 bg-[#D9F0FC] h-[30px]' />
            <StatItem title='Other' value={'0 tSSC'} />
          </div>
        </div>
        <div className='mx-10 w-0.5 hidden bg-[#D9F0FC]' />

        <div className='hidden md:flex gap-10'>
          <div className='flex flex-col gap-8'>
            <StatItem title='Received' value='0 tSSC' />
            <StatItem title='Unbounding' value='0 tSSC' />
            <StatItem title='Democracy' value='0 tSSC' />
          </div>
          <div className='flex flex-col gap-8'>
            <StatItem title='Election' value='0 tSSC' />
            <StatItem title='Vesting' value='0 tSSC' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountBalanceStats
