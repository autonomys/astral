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
  nominatorMaxShares?: bigint
  lastBlock?: number
}

export const OperatorsListCard: FC<Props> = ({
  operator,
  action,
  handleAction,
  excludeActions,
  nominatorMaxShares,
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
        value: `${bigNumberToNumber(operator.minimumNominatorStake)} ${selectedChain.token.symbol}`,
      },
      { name: 'Nominator Tax', value: `${operator.nominationTax}%` },
      {
        name: 'Total Stake',
        value: `${bigNumberToNumber(operator.currentTotalStake)} ${selectedChain.token.symbol}`,
      },
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
                totalShares: operator.totalShares,
              },
            }}
            excludeActions={excludeActions}
            nominatorMaxShares={nominatorMaxShares}
          />
        ),
      })
    return rows
  }, [
    operator.currentDomainId,
    operator.signingKey,
    operator.operatorOwner,
    operator.minimumNominatorStake,
    operator.nominationTax,
    operator.currentTotalStake,
    operator.totalShares,
    operator.status,
    operator.id,
    selectedChain.token.symbol,
    selectedChain.urls.page,
    lastBlock,
    actingAccount,
    action,
    handleAction,
    excludeActions,
    nominatorMaxShares,
  ])

  return (
    <MobileCard
      id='operator-list-mobile'
      header={
        <Link
          key={`${operator.id}-operator-id-${operator.signingKey}`}
          data-testid={`operator-link-${operator.id}-${operator.signingKey}}`}
          className='hover:text-purpleAccent'
          href={INTERNAL_ROUTES.operators.id.page(
            selectedChain.urls.page,
            selectedDomain,
            operator.id,
          )}
        >
          <p className='text-grayDarker break-all text-sm font-medium dark:text-white'>
            {operator.id}
          </p>
        </Link>
      }
      body={body}
    />
  )
}
