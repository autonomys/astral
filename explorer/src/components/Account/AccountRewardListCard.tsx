import { bigNumberToNumber } from '@/utils/number'
import { shortString } from '@/utils/string'
import { MobileCard } from 'components/common/MobileCard'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { RewardEvent } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC } from 'react'

dayjs.extend(relativeTime)

type Props = {
  reward: RewardEvent
  index: number
}

export const AccountRewardListCard: FC<Props> = ({ reward }) => {
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
        <div key={`${reward.id}-account-id`} className='row -mx-1 -mt-3 flex items-center gap-3'>
          <Link
            className='break-all text-sm font-medium text-grayDarker hover:text-purpleAccent dark:text-white'
            href={INTERNAL_ROUTES.blocks.id.page(
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
