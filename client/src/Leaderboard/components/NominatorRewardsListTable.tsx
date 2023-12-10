import { FC } from 'react'
import { AccountRewards } from 'gql/graphql'
import { Link } from 'react-router-dom'
import Identicon from '@polkadot/react-identicon'

// common
import useDomains from 'common/hooks/useDomains'
import useMediaQuery from 'common/hooks/useMediaQuery'
import { PAGE_SIZE } from 'common/constants'
import { Column, Table } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import { bigNumberToNumber, numberWithCommas, shortString } from 'common/helpers'

// leaderboard
import NominatorRewardsListCard from './NominatorRewardsListCard'

interface Props {
  accounts: AccountRewards[]
  page: number
}

const NominatorRewardsListTable: FC<Props> = ({ accounts, page }) => {
  const { selectedChain } = useDomains()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  const newCount = PAGE_SIZE * Number(page + 1) - 10

  // methods
  const generateColumns = (accounts: AccountRewards[]): Column[] => [
    {
      title: 'Rank',
      cells: accounts.map((id, index) => (
        <div key={`${id}-account-index`}>{page + 1 > 1 ? newCount + index + 1 : index + 1}</div>
      )),
    },
    {
      title: 'Account',
      cells: accounts.map(({ id }, index) => (
        <div key={`${id}-account-id`} className='flex row items-center gap-3'>
          <Identicon value={id} size={26} theme='beachball' />
          <Link
            data-testid={`account-link-${index}`}
            to={INTERNAL_ROUTES.accounts.id.page(selectedChain.urls.page, 'consensus', id)}
            className='hover:text-[#DE67E4]'
          >
            <div>{isLargeLaptop ? id : shortString(id)}</div>
          </Link>
        </div>
      )),
    },
    {
      title: 'Operator rewards',
      cells: accounts.map(({ operator, id }) => (
        <div key={`${id}-reward-block`}>
          {operator ? `${numberWithCommas(bigNumberToNumber(operator, 18))} tSSC` : 0}
        </div>
      )),
    },
    {
      title: 'Total rewards',
      cells: accounts.map(({ amount, id }) => {
        return (
          <div key={`${id}-reward-total-percent`}>
            {amount ? `${numberWithCommas(bigNumberToNumber(amount, 18))} tSSC` : 0}
          </div>
        )
      }),
    },
  ]

  // constants
  const columns = generateColumns(accounts)

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
      {accounts.map((account, index) => (
        <NominatorRewardsListCard
          index={index}
          account={account}
          key={`reward-list-card-${account.id}`}
        />
      ))}
    </div>
  )
}

export default NominatorRewardsListTable
