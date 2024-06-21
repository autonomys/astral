import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { MobileCard } from 'components/common/MobileCard'
import { INTERNAL_ROUTES } from 'constants/routes'
import { OperatorRewards } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  operator: OperatorRewards
  index: number
}

export const OperatorRewardsListCard: FC<Props> = ({ operator, index }) => {
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
        <div key={`${operator.id}-account-id`} className='row -mx-1 -mt-3 flex items-center gap-3'>
          <Link
            href={INTERNAL_ROUTES.operators.id.page(
              selectedChain.urls.page,
              'consensus',
              operator.id,
            )}
          >
            <p className='break-all text-sm font-medium text-grayDarker dark:text-white'>
              {operator.id}
            </p>
          </Link>
        </div>
      }
      body={body}
    />
  )
}
