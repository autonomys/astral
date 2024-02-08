import Identicon from '@polkadot/react-identicon'
import { Nominator } from 'gql/graphql'
import { FC } from 'react'
import { Link } from 'react-router-dom'

// common
import { MobileCard } from 'common/components'
import { numberWithCommas, shortString } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import { INTERNAL_ROUTES } from 'common/routes'

// operator
import { ActionsDropdown } from './ActionsDropdown'
import { OperatorAction, OperatorActionType } from './ActionsModal'

type Props = {
  nominator: Nominator
  action?: OperatorAction
  handleAction?: (value: OperatorAction) => void
  index?: number
  excludeActions?: OperatorActionType[]
  nominatorMaxStake?: string
}

const NominatorListCard: FC<Props> = ({
  nominator,
  action,
  handleAction,
  excludeActions,
  nominatorMaxStake,
}) => {
  const { selectedChain, selectedDomain } = useDomains()

  const body = [
    { name: 'Id', value: nominator.account.id ? shortString(nominator.account.id) : 'Unknown' },
    { name: 'Shares', value: nominator.shares ? numberWithCommas(nominator.shares) : 0 },
  ]
  return (
    <MobileCard
      id='nominator-list-mobile'
      header={
        <div
          key={`${nominator.account.id}-account-id`}
          className='flex row items-center gap-3 -mt-3 -mx-1'
        >
          <Identicon value={nominator.account.id} size={49} theme='beachball' />
          <Link
            to={INTERNAL_ROUTES.accounts.id.page(
              selectedChain.urls.page,
              selectedDomain,
              nominator.account.id,
            )}
          >
            <p className='font-medium text-[#241235] text-sm break-all dark:text-white'>
              {nominator.account.id}
            </p>
          </Link>
          {action && handleAction && (
            <ActionsDropdown
              action={action}
              handleAction={handleAction}
              excludeActions={excludeActions}
              row={{
                original: {
                  id: nominator.account.id,
                  currentTotalStake: (
                    (BigInt(nominator.operator.currentTotalStake) * BigInt(nominator.shares)) /
                    BigInt(nominator.operator.totalShares)
                  ).toString(),
                },
              }}
              nominatorMaxStake={nominatorMaxStake}
            />
          )}
        </div>
      }
      body={body}
    />
  )
}

export default NominatorListCard
