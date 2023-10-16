import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'
import Identicon from '@polkadot/react-identicon'

// gql
import { Account } from 'gql/graphql'

// common
import { Table, Column } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import { bigNumberToNumber, shortString } from 'common/helpers'
import useMediaQuery from 'common/hooks/useMediaQuery'

// account
import { AccountListCard } from 'Account/components'
import { PAGE_SIZE } from 'common/constants'
import useDomains from 'common/hooks/useDomains'
import RewardListCard from './RewardListCard'
import { Reward } from 'Rewards/helpers'

dayjs.extend(relativeTime)

interface Props {
  rewards: Reward[]
}

const RewardTable: FC<Props> = ({ rewards }) => {
  const { selectedChain } = useDomains()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  // methods
  const generateColumns = (rewards: Reward[]): Column[] => [
    {
      title: 'Rank',
      cells: rewards.map(({ rank }) => <div key={`${rank}-reward-rank`}>{rank}</div>),
    },
    {
      title: 'Account',
      cells: rewards.map(({ account }, index) => (
        <div key={`${account}-reward-id`} className='flex row items-center gap-3'>
          <Link
            data-testid={`reward-link-${index}`}
            to={INTERNAL_ROUTES.accounts.id.page(selectedChain.urls.page, account)}
            className='hover:text-[#DE67E4]'
          >
            <div>{isLargeLaptop ? account : shortString(account)}</div>
          </Link>
        </div>
      )),
    },
    {
      title: 'Block rewards',
      cells: rewards.map(({ blockReward, account }) => (
        <div key={`${account}-reward-block`}>{blockReward}</div>
      )),
    },
    {
      title: 'Vote rewards',
      cells: rewards.map(({ voteReward, account }) => (
        <div key={`${account}-reward-vote`}>{voteReward}</div>
      )),
    },
    {
      title: 'Total rewards',
      cells: rewards.map(({ totalReward, account }) => (
        <div key={`${account}-reward-total`}>{totalReward}</div>
      )),
    },
  ]

  // constants
  const columns = generateColumns(rewards)

  return isDesktop ? (
    <div className='w-full'>
      <div className='rounded my-6'>
        <Table
          columns={columns}
          emptyMessage='There are no rewards to show'
          tableProps='bg-white rounded-[20px] dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
          tableHeaderProps='border-b border-gray-200'
          id='rewards-list'
        />
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {rewards.map((reward, index) => (
        <RewardListCard index={index} reward={reward} key={`reward-list-card-${reward.account}`} />
      ))}
    </div>
  )
}

export default RewardTable
