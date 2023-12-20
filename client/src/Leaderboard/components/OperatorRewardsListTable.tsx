import { FC } from 'react'
import { OperatorRewards } from 'gql/graphql'
import { Link } from 'react-router-dom'

// common
import useDomains from 'common/hooks/useDomains'
import useMediaQuery from 'common/hooks/useMediaQuery'
import { PAGE_SIZE } from 'common/constants'
import { Column, Table } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import { bigNumberToNumber, numberWithCommas, shortString } from 'common/helpers'

// leaderboard
import OperatorRewardsListCard from './OperatorRewardsListCard'

interface Props {
  operators: OperatorRewards[]
  page: number
}

const OperatorRewardsListTable: FC<Props> = ({ operators, page }) => {
  const { selectedChain } = useDomains()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  const newCount = PAGE_SIZE * Number(page + 1) - 10

  // methods
  const generateColumns = (operators: OperatorRewards[]): Column[] => [
    {
      title: 'Rank',
      cells: operators.map((id, index) => (
        <div key={`${id}-account-index`}>{page + 1 > 1 ? newCount + index + 1 : index + 1}</div>
      )),
    },
    {
      title: 'Operator',
      cells: operators.map(({ id }, index) => (
        <div key={`${id}-account-id`} className='flex row items-center gap-3'>
          <Link
            data-testid={`account-link-${index}`}
            to={INTERNAL_ROUTES.operators.id.page(selectedChain.urls.page, 'consensus', id)}
            className='hover:text-[#DE67E4]'
          >
            <div>{isLargeLaptop ? id : shortString(id)}</div>
          </Link>
        </div>
      )),
    },
    {
      title: 'Operator rewards',
      cells: operators.map(({ amount, id }) => (
        <div key={`${id}-reward-block`}>
          {amount ? `${numberWithCommas(bigNumberToNumber(amount))} tSSC` : 0}
        </div>
      )),
    },
  ]

  // constants
  const columns = generateColumns(operators)

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
      {operators.map((operator, index) => (
        <OperatorRewardsListCard
          index={index}
          operator={operator}
          key={`reward-list-card-${operator.id}`}
        />
      ))}
    </div>
  )
}

export default OperatorRewardsListTable
