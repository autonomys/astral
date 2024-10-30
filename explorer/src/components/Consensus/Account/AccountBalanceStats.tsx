import { StatItem } from 'components/common/StatItem'
import { TOKEN } from 'constants/general'
import { AccountByIdQuery } from 'gql/graphql'
import { FC } from 'react'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { AccountBalancePieChart } from './AccountBalancePieChart'

type Props = {
  account: AccountByIdQuery['consensus_accounts'][number] | undefined
  isDesktop?: boolean
}

export const AccountBalanceStats: FC<Props> = ({ account, isDesktop = false }) => {
  const accountTotal = bigNumberToNumber(account ? account.total : 0)
  const accountFree = bigNumberToNumber(account ? account.free : 0)
  const accountReserved = bigNumberToNumber(account ? account.reserved : 0)
  const freePercent = accountTotal ? (100 * accountFree) / accountTotal : 0
  const reservedPercent = accountTotal ? (100 * accountReserved) / accountTotal : 0

  const backgroundStyle = !isDesktop
    ? 'dark:bg-gradient-to-r dark:from-gradientFrom dark:via-gradientVia dark:to-gradientTo rounded-[20px]'
    : ''

  return (
    <div
      className={`w-full flex-col items-center justify-center p-4 md:gap-8 md:px-5 lg:grid lg:grid-cols-4 lg:rounded-md xl:grid-cols-3 ${backgroundStyle}`}
    >
      <div className='flex items-baseline gap-4 justify-self-start lg:hidden'>
        <div className='text-[26px] font-medium text-gray-900 dark:text-white'>
          {numberWithCommas(accountTotal)}
        </div>
        <div className='text-[13px] font-semibold text-gray-900 dark:text-white'>
          {TOKEN.symbol}
        </div>
      </div>
      <div className='col-span-2 flex size-full items-center justify-center lg:items-end lg:justify-end'>
        <AccountBalancePieChart account={account} />
      </div>
      <div className='flex w-full items-center lg:gap-4 lg:py-8'>
        <div className='flex flex-row justify-center gap-8 lg:flex-none lg:flex-col'>
          <div className='flex items-center'>
            <div className='mr-2 h-[30px] w-1 bg-primaryAccent' />
            <StatItem
              title='Free'
              value={`${numberWithCommas(accountFree)} ${TOKEN.symbol} (${freePercent.toFixed(2)}%)`}
            />
          </div>
          <div className='flex items-center'>
            <div className='mr-2 h-[30px] w-1 bg-pastelBlue' />
            <StatItem
              title='Reserved'
              value={`${numberWithCommas(accountReserved)} ${TOKEN.symbol} (${reservedPercent.toFixed(2)}%)`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
