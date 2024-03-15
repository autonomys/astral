import { numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import Identicon from '@polkadot/react-identicon'
import { MobileCard } from 'components/common/MobileCard'
import { INTERNAL_ROUTES } from 'constants/routes'
import { NominatorsConnectionQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC } from 'react'
import { ActionsDropdown } from './ActionsDropdown'
import { OperatorAction, OperatorActionType } from './ActionsModal'

type Props = {
  nominator: NominatorsConnectionQuery['nominatorsConnection']['edges'][0]['node']
  action?: OperatorAction
  handleAction?: (value: OperatorAction) => void
  index?: number
  excludeActions?: OperatorActionType[]
  nominatorMaxStake?: string
}

export const NominatorListCard: FC<Props> = ({
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
          className='row -mx-1 -mt-3 flex items-center gap-3'
        >
          <Identicon value={nominator.account.id} size={49} theme='beachball' />
          <Link
            href={INTERNAL_ROUTES.accounts.id.page(
              selectedChain.urls.page,
              selectedDomain,
              nominator.account.id,
            )}
          >
            <p className='break-all text-sm font-medium text-[#241235] dark:text-white'>
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
