import { MobileCard } from 'components/common/MobileCard'
import { TOKEN } from 'constants/general'
import { INTERNAL_ROUTES } from 'constants/routes'
import { OperatorRewards } from 'gql/graphql'
import useChains from 'hooks/useChains'
import Link from 'next/link'
import { FC } from 'react'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'

type Props = {
  operator: OperatorRewards
  index: number
}

export const OperatorRewardsListCard: FC<Props> = ({ operator, index }) => {
  const { network } = useChains()
  const body = [
    { name: 'Rank', value: index },
    {
      name: 'Operator reward',
      value: operator.amount
        ? `${numberWithCommas(bigNumberToNumber(operator.amount))} ${TOKEN.symbol}`
        : 0,
    },
  ]
  return (
    <MobileCard
      id='account-list-mobile'
      header={
        <div key={`${operator.id}-account-id`} className='row -mx-1 -mt-3 flex items-center gap-3'>
          <Link href={INTERNAL_ROUTES.operators.id.page(network, 'consensus', operator.id)}>
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
