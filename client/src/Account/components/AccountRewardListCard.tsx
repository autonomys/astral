import { FC } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { RewardEvent } from 'gql/graphql'

// common
import { bigNumberToNumber, shortString } from 'common/helpers'
import { MobileCard } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

type Props = {
  reward: RewardEvent
  index: number
}

const AccountRewardListCard: FC<Props> = ({ reward }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const body = [
    { name: 'Block Hash', value: shortString(reward.block?.hash || '') },
    { name: 'Type', value: reward.name.split('.')[1] },
    { name: 'Time', value: dayjs(reward.timestamp).fromNow(true) },
    { name: 'Amount', value: bigNumberToNumber(reward.amount || 0) },
  ]
  return (
    <MobileCard
      id='account-list-mobile'
      header={
        <div key={`${reward.id}-account-id`} className='flex row items-center gap-3 -mt-3 -mx-1'>
          <Link
            className='font-medium text-[#241235] text-sm break-all dark:text-white hover:text-[#DE67E4]'
            to={INTERNAL_ROUTES.blocks.id.page(
              selectedChain.urls.page,
              selectedDomain,
              reward.block?.height,
            )}
          >
            <div>{reward.block?.height}</div>
          </Link>
        </div>
      }
      body={body}
    />
  )
}

export default AccountRewardListCard
