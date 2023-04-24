import { FC } from 'react'
import { Account } from 'gql/graphql'

// common
import { StatItem } from 'common/components'

// account
import { AccountBalancePieChart } from 'Account/components'
import { bigNumberToNumber, numberWithCommas } from 'common/helpers'

type Props = {
  account: Account
  isDesktop?: boolean
}

const AccountBalanceStats: FC<Props> = ({ account, isDesktop = false }) => {
  const accountTotal = bigNumberToNumber(account.total || 0, 18)
  const accountFree = bigNumberToNumber(account.free || 0, 18)
  const accountReserved = bigNumberToNumber(account.reserved || 0, 18)
  const freePercent = (100 * accountFree) / accountTotal
  const reservedPercent = (100 * accountReserved) / accountTotal

  const backgroundStyle = !isDesktop
    ? 'dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] rounded-[20px]'
    : ''

  return (
    <div
      className={`w-full md:grid md:grid-cols-3 items-center justify-center flex-col md:gap-8 md:px-5 2xl:rounded-md p-4 ${backgroundStyle}`}
    >
      <div className='flex w-full h-full justify-center items-center lg:items-end lg:justify-end col-span-2'>
        <AccountBalancePieChart account={account} />
      </div>
      <div className='flex w-full md:py-10 items-center md:gap-5'>
        <div className='flex flex-auto md:flex-none md:flex-col gap-8 justify-center'>
          <div className='flex items-center'>
            <div className='mr-4 w-1 bg-[#E970F8] h-[30px]' />
            <StatItem
              title='Free'
              value={`${numberWithCommas(accountFree)} tSSC (${freePercent}%)`}
            />
          </div>
          <div className='flex items-center'>
            <div className='mr-4 w-1 bg-[#D9F0FC] h-[30px]' />
            <StatItem title='Reserved' value={`${accountReserved} tSSC (${reservedPercent}%)`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountBalanceStats
