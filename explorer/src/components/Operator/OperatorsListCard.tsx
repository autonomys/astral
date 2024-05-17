import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { MobileCard, Row } from 'components/common/MobileCard'
import { Chains } from 'constants/'
import { INTERNAL_ROUTES } from 'constants/routes'
import { OperatorsConnectionQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { operatorStatus } from 'utils/operator'
import { capitalizeFirstLetter } from 'utils/string'
import { ActionsDropdown } from './ActionsDropdown'
import { OperatorAction, OperatorActionType } from './ActionsModal'

type Props = {
  operator: OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']
  action: OperatorAction
  handleAction: (value: OperatorAction) => void
  index: number
  excludeActions?: OperatorActionType[]
  nominatorMaxStake?: string
  lastBlock?: number
}

export const OperatorsListCard: FC<Props> = ({
  operator,
  action,
  handleAction,
  excludeActions,
  nominatorMaxStake,
  lastBlock,
}) => {
  const { selectedChain, selectedDomain } = useDomains()
  const { actingAccount } = useWallet()

  const body = useMemo(() => {
    const rows: Row[] = [
      { name: 'Domain', value: operator.currentDomainId === 0 ? 'Subspace' : 'Nova' },
      { name: 'Signing Key', value: shortString(operator.signingKey) },
      { name: 'Owner', value: shortString(operator.operatorOwner || '') },
      {
        name: 'Minimum Stake',
        value: `${bigNumberToNumber(operator.minimumNominatorStake)} tSSC`,
      },
      { name: 'Nominator Tax', value: `${operator.nominationTax}%` },
      { name: 'Total Stake', value: `${bigNumberToNumber(operator.currentTotalStake)} tSSC` },
      { name: 'Total Shares', value: numberWithCommas(operator.totalShares) },
      {
        name: 'Status',
        value: operator.status
          ? selectedChain.urls.page === Chains.gemini3g
            ? operator.status
            : capitalizeFirstLetter(operatorStatus(operator.status, lastBlock))
          : 'unknown',
      },
    ]
    if (actingAccount)
      rows.push({
        name: 'Actions',
        value: (
          <ActionsDropdown
            action={action}
            handleAction={handleAction}
            row={{
              original: {
                id: operator.id,
                currentTotalStake: operator.currentTotalStake,
              },
            }}
            excludeActions={excludeActions}
            nominatorMaxStake={nominatorMaxStake}
          />
        ),
      })
    return rows
  }, [
    actingAccount,
    action,
    excludeActions,
    handleAction,
    lastBlock,
    nominatorMaxStake,
    operator.currentDomainId,
    operator.currentTotalStake,
    operator.id,
    operator.minimumNominatorStake,
    operator.nominationTax,
    operator.operatorOwner,
    operator.signingKey,
    operator.status,
    operator.totalShares,
    selectedChain.urls.page,
  ])

  return (
    <MobileCard
      id='operator-list-mobile'
      header={
        <Link
          key={`${operator.id}-operator-id-${operator.signingKey}`}
          data-testid={`operator-link-${operator.id}-${operator.signingKey}}`}
          className='hover:text-[#DE67E4]'
          href={INTERNAL_ROUTES.operators.id.page(
            selectedChain.urls.page,
            selectedDomain,
            operator.id,
          )}
        >
          <p className='break-all text-sm font-medium text-[#241235] dark:text-white'>
            {operator.id}
          </p>
        </Link>
      }
      body={body}
    />
  )
}
