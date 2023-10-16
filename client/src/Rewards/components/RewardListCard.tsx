import { FC } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Identicon from '@polkadot/react-identicon'

// gql
import { Account } from 'gql/graphql'

// common
import { bigNumberToNumber } from 'common/helpers'
import { MobileCard } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'
import { Reward } from 'Rewards/helpers'

dayjs.extend(relativeTime)

type Props = {
  reward: Reward
  index: number
}

const RewardListCard: FC<Props> = ({ reward, index }) => {
  const { selectedChain } = useDomains()
  const body = [
    { name: 'Rank', value: index },
    { name: 'Block reward', value: reward.blockReward },
    { name: 'Vote reward', value: reward.voteReward },
    { name: 'Total reward', value: reward.totalReward },
  ]
  return (
    <MobileCard
      id='account-list-mobile'
      header={
        <div
          key={`${reward.account}-account-id`}
          className='flex row items-center gap-3 -mt-3 -mx-1'
        >
          <Link to={INTERNAL_ROUTES.accounts.id.page(selectedChain.urls.page, reward.account)}>
            <p className='font-medium text-[#241235] text-sm break-all dark:text-white'>
              {reward.account}
            </p>
          </Link>
        </div>
      }
      body={body}
    />
  )
}

export default RewardListCard
