import { numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { MobileCard, Row } from 'components/common/MobileCard'
import { GetAllNominatorsQuery } from 'gql/rewardTypes'
import { FC, useMemo } from 'react'

type Props = {
  nominator: GetAllNominatorsQuery['nominatorsConnection']['edges'][0]['node']
  index: number
}

export const OperatorsListCard: FC<Props> = ({ nominator }) => {
  const body = useMemo(() => {
    const rows: Row[] = [
      {
        name: 'Operator',
        value: `${nominator.operator.id}-${nominator.operator.currentDomainId === 0 ? 'Consensus' : 'EVM'}`,
      },
      { name: 'Account', value: shortString(nominator.account.id) },
      { name: 'Shares', value: numberWithCommas(nominator.shares) },
      {
        name: 'Status',
        value: nominator.status,
      },
    ]
    return rows
  }, [
    nominator.account.id,
    nominator.operator.currentDomainId,
    nominator.operator.id,
    nominator.shares,
    nominator.status,
  ])

  return (
    <MobileCard
      id='operator-list-mobile'
      header={
        <p className='break-all text-sm font-medium text-[#241235] dark:text-white'>
          {nominator.id}
        </p>
      }
      body={body}
    />
  )
}
