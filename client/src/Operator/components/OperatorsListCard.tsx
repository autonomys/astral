import { Operator } from 'gql/graphql'
import { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

// common
import MobileCard, { Row } from 'common/components/MobileCard'
import { bigNumberToNumber, numberWithCommas, shortString } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import useWallet from 'common/hooks/useWallet'
import { INTERNAL_ROUTES } from 'common/routes'

// operator
import { ActionsDropdown } from './ActionsDropdown'
import { OperatorAction, OperatorActionType } from './ActionsModal'

type Props = {
  operator: Operator
  action: OperatorAction
  handleAction: (value: OperatorAction) => void
  index: number
  excludeActions?: OperatorActionType[]
  nominatorMaxStake?: string
}

const OperatorsListCard: FC<Props> = ({
  operator,
  action,
  handleAction,
  excludeActions,
  nominatorMaxStake,
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
      { name: 'Status', value: operator.status ? operator.status : 'unknown' },
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
  ])

  return (
    <MobileCard
      id='operator-list-mobile'
      header={
        <Link
          key={`${operator.id}-operator-id-${operator.signingKey}`}
          data-testid={`operator-link-${operator.id}-${operator.signingKey}}`}
          className='hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.operators.id.page(
            selectedChain.urls.page,
            selectedDomain,
            operator.id,
          )}
        >
          <p className='font-medium text-[#241235] text-sm break-all dark:text-white'>
            {operator.id}
          </p>
        </Link>
      }
      body={body}
    />
  )
}

export default OperatorsListCard
