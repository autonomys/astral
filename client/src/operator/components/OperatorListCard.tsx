import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Operator } from 'gql/graphql'

// common
import { MobileCard } from 'common/components'
import { bigNumberToNumber, shortString } from 'common/helpers'

dayjs.extend(relativeTime)

type Props = {
  operator: Operator
  index: number
  isDesktop?: boolean
}

const OperatorListCard: FC<Props> = ({ operator, isDesktop }) => {
  const body = [
    { name: 'id', value: !isDesktop ? shortString(operator.id) : operator.id },
    { name: 'Total Stake', value: bigNumberToNumber(operator.currentTotalStake, 18) },
    { name: 'Total Shares', value: bigNumberToNumber(operator.totalShares, 18) },
    { name: 'Status', value: operator.status ? operator.status : 'unknown' },
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
