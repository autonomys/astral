import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import { MobileCard } from 'common/components'
import { Operator } from 'operator/helpers/types'

dayjs.extend(relativeTime)

type Props = {
  operator: Operator
  index: number
}

const OperatorListCard: FC<Props> = ({ operator }) => {
  const body = [
    { name: 'id', value: operator.id },
    { name: 'Total Stake', value: operator.currentTotalStake },
    { name: 'Total Shares', value: operator.totalShares },
    { name: 'Status', value: operator.status },
  ]
  return (
    <MobileCard
      id='account-list-mobile'
      header={
        <div key={`${operator.id}-operator-id`} className='flex row items-center gap-3 -mt-3 -mx-1'>
          <p className='font-medium text-[#241235] text-sm break-all dark:text-white'>
            {operator.id}
          </p>
        </div>
      }
      body={body}
    />
  )
}

export default OperatorListCard
