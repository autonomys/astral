import { ResponsivePie } from '@nivo/pie'
import { AccountByIdQuery } from 'gql/graphql'
import { useTheme } from 'providers/ThemeProvider'
import { FC } from 'react'
import { bigNumberToNumber } from 'utils/number'

type Props = {
  account: AccountByIdQuery['consensus_accounts_by_pk'] | undefined
}

export const AccountBalancePieChart: FC<Props> = ({ account }) => {
  const { isDark } = useTheme()
  const otherNumber = account
    ? Number(account.total) - Number(account.free) - Number(account.reserved)
    : 0
  const transferable = account ? bigNumberToNumber(account.free) : 0
  const staking = account ? bigNumberToNumber(account.reserved) : 0
  const other = otherNumber ? bigNumberToNumber(otherNumber) : 0

  const data = [
    {
      id: 'other',
      label: 'Other',
      value: other,
      color: '#EBEFFC',
    },
    {
      id: 'transferable',
      label: 'Transferable',
      value: transferable,
      color: '#1949D2',
    },
    {
      id: 'staking',
      label: 'Staking',
      value: staking,
      color: '#ABCFEF',
    },
  ]

  const emptyState = [
    {
      id: 'No value to show',
      label: '',
      value: 1,
      color: isDark ? '#D9F0FC' : '#e5e7eb',
    },
  ]

  const isEmpty = other === 0 && staking === 0 && transferable === 0

  return (
    <div className='h-80 w-2/4 lg:h-[400px] lg:w-full'>
      {!isEmpty ? (
        <ResponsivePie
          data={isEmpty ? emptyState : data}
          enableArcLinkLabels={isEmpty}
          margin={{ top: 20, right: 0, bottom: 40, left: 0 }}
          innerRadius={0}
          padAngle={0}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ datum: 'data.color' }}
          enableArcLabels={false}
          sortByValue={true}
          // do not render tooltip if there is no data
          tooltip={isEmpty ? () => null : undefined}
        />
      ) : (
        <div className='flex h-full items-center justify-center'>
          <div className='text-[13px] font-semibold text-gray-900 dark:text-white'>No balance</div>
        </div>
      )}
    </div>
  )
}
