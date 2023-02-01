import { FC } from 'react'
import { ResponsivePie } from '@nivo/pie'

// gql
import { Account } from 'gql/graphql'

// common
import { bigNumberToNumber } from 'common/helpers'

type Props = {
  account: Account
}

const AccountBalancePieChart: FC<Props> = ({ account }) => {
  const otherNumber = Number(account.total) - Number(account.free) - Number(account.reserved)
  const transferable = account.free ? bigNumberToNumber(account.free, 18) : 0
  const staking = account.reserved ? bigNumberToNumber(account.reserved, 18) : 0
  const other = otherNumber ? bigNumberToNumber(otherNumber.toString(), 18) : 0

  const data = [
    {
      id: 'other',
      label: 'Other',
      value: other,
      color: '#D9F0FC',
    },
    {
      id: 'transferable',
      label: 'Transferable',
      value: transferable,
      color: '#E970F8',
    },
    {
      id: 'staking',
      label: 'Staking',
      value: staking,
      color: '#9179EC',
    },
  ]

  const emptyState = [{ id: 'No value to show', label: '', value: true, color: '#e5e7eb' }]

  const isEmpty = other === 0 && staking === 0 && transferable === 0

  return (
    <div className={'sm:h-80 sm:w-2/4 h-60 w-full'}>
      {isEmpty ? (
        <ResponsivePie
          data={emptyState}
          margin={{ top: 20, right: 0, bottom: 40, left: 0 }}
          innerRadius={0.5}
          padAngle={0}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ datum: 'data.color' }}
          enableArcLabels={false}
          sortByValue={true}
          enableArcLinkLabels={true}
        />
      ) : (
        <ResponsivePie
          data={data}
          margin={{ top: 20, right: 0, bottom: 40, left: 0 }}
          innerRadius={0.5}
          padAngle={0}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ datum: 'data.color' }}
          enableArcLabels={false}
          sortByValue={true}
          enableArcLinkLabels={false}
        />
      )}
    </div>
  )
}

export default AccountBalancePieChart
