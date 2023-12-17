import { FC } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { RewardEvent } from 'gql/graphql'

// account
import { AccountRewardListCard } from 'Account/components'

// common
import { Table, Column } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import { bigNumberToNumber, shortString } from 'common/helpers'
import useMediaQuery from 'common/hooks/useMediaQuery'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

interface Props {
  rewards: RewardEvent[]
}

const AccountRewardTable: FC<Props> = ({ rewards }) => {
  const { selectedChain, selectedDomain } = useDomains()

  const isDesktop = useMediaQuery('(min-width: 640px)')

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  // methods
  const generateColumns = (rewards: RewardEvent[]): Column[] => [
    {
      title: 'Block Number',
      cells: rewards.map(({ block, id }) => (
        <Link
          key={`${id}-account-index`}
          className='hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.blocks.id.page(
            selectedChain.urls.page,
            selectedDomain,
            block?.height,
          )}
        >
          <div>{block?.height}</div>
        </Link>
      )),
    },
    {
      title: 'Block Hash',
      cells: rewards.map(({ id, block }) => (
        <div key={`${id}-account-id`} className='flex row items-center gap-3'>
          <div>{isLargeLaptop ? block?.hash : shortString(block?.hash || '')}</div>
        </div>
      )),
    },
    {
      title: 'Time',
      cells: rewards.map(({ timestamp, id }) => {
        const blockDate = dayjs(timestamp).fromNow(true)

        return <div key={`${id}-block-time`}>{blockDate}</div>
      }),
    },
    {
      title: 'Type',
      cells: rewards.map(({ name, id }) => {
        const type = name
          .split('.')[1]
          .split(/(?=[A-Z])/)
          .join(' ')
        return <div key={`${id}-account-locked`}>{type}</div>
      }),
    },
    {
      title: 'Amount',
      cells: rewards.map(({ amount, id }) => (
        <div key={`${id}-account-balance`}>{amount ? bigNumberToNumber(amount, 18) : 0} tSSC</div>
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
          id='accounts-list'
        />
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {rewards.map((reward, index) => (
        <AccountRewardListCard
          index={index}
          reward={reward}
          key={`account-list-card-${reward.id}`}
        />
      ))}
    </div>
  )
}

export default AccountRewardTable
