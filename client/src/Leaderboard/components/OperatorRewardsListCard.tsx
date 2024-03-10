import { FC } from 'react'
import { Link } from 'react-router-dom'

// gql
import { OperatorRewards } from 'gql/graphql'

// common
import { bigNumberToNumber, numberWithCommas } from 'common/helpers'
import { MobileCard } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'

type Props = {
  operator: OperatorRewards
  index: number
}

const OperatorRewardsListCard: FC<Props> = ({ operator, index }) => {
  const { selectedChain } = useDomains()
  const body = [
    { name: 'Rank', value: index },
    {
      name: 'Operator reward',
      value: operator.amount ? `${numberWithCommas(bigNumberToNumber(operator.amount))} tSSC` : 0,
    },
  ]
  return (
    <MobileCard
      id='account-list-mobile'
      header={
        <div key={`${operator.id}-account-id`} className='flex row items-center gap-3 -mt-3 -mx-1'>
          <Link
            to={INTERNAL_ROUTES.operators.id.page(
              selectedChain.urls.page,
              'consensus',
              operator.id,
            )}
          >
            <p className='font-medium text-[#241235] text-sm break-all dark:text-white'>
              {operator.id}
            </p>
          </Link>
        </div>
      }
      body={body}
    />
  )
}

export default OperatorRewardsListCard
