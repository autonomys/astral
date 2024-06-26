import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { MobileCard, Row } from 'components/common/MobileCard'
import { INTERNAL_ROUTES } from 'constants/routes'
import { GetAllOperatorsQuery } from 'gql/rewardTypes'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useMemo } from 'react'

type Props = {
  operator: GetAllOperatorsQuery['operatorsConnection']['edges'][0]['node']
  index: number
}

export const OperatorsListCard: FC<Props> = ({ operator }) => {
  const { selectedChain, selectedDomain } = useDomains()

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
      { name: 'Status', value: operator.status ? operator.status : 'unknown' },
    ]
    return rows
  }, [
    operator.currentDomainId,
    operator.currentTotalStake,
    operator.minimumNominatorStake,
    operator.nominationTax,
    operator.operatorOwner,
    operator.signingKey,
    operator.status,
    operator.totalShares,
    selectedChain.token.symbol,
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
