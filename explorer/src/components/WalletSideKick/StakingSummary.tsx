import { bigNumberToNumber } from '@/utils/number'
import { useQuery } from '@apollo/client'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import type { Chain } from 'constants/chains'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { StakingSummaryQuery } from 'gql/graphql'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { QUERY_STAKING_SUMMARY } from './query'

interface StakingSummaryProps {
  subspaceAccount: string
  selectedChain: Chain
  tokenSymbol: string
}

export const StakingSummary: FC<StakingSummaryProps> = ({
  subspaceAccount,
  selectedChain,
  tokenSymbol,
}) => {
  const summaryVariables = useMemo(
    () => ({
      first: 10,
      subspaceAccount,
    }),
    [subspaceAccount],
  )
  const { data, error, loading } = useQuery<StakingSummaryQuery>(QUERY_STAKING_SUMMARY, {
    variables: summaryVariables,
    pollInterval: 6000,
  })

  const operators = useMemo(() => data && data.operators, [data])
  const totalOperatorCount = useMemo(() => (operators ? operators.totalCount : 0), [operators])
  const totalOperatorStake = useMemo(
    () =>
      operators && operators.edges
        ? operators.edges
            .reduce((acc, operator) => acc + BigInt(operator.node.currentTotalStake), BigInt(0))
            .toString()
        : '0',
    [operators],
  )

  const nominators = useMemo(() => data && data.nominators, [data])
  const nominatorsConnection = useMemo(
    () => nominators && nominators.edges.map((nominator) => nominator.node),
    [nominators],
  )
  const totalNominatedCount = useMemo(
    () => (nominators ? nominators.totalCount - totalOperatorCount : 0),
    [nominators, totalOperatorCount],
  )
  const totalNominatedStake = useMemo(
    () =>
      nominatorsConnection
        ? nominatorsConnection
            .filter((nominator) => nominator.operator.operatorOwner !== subspaceAccount)
            .reduce(
              (acc, nominator) =>
                acc +
                (BigInt(nominator.operator.currentTotalStake) /
                  BigInt(nominator.operator.totalShares)) *
                  BigInt(nominator.shares),
              BigInt(0),
            )
            .toString()
        : '0',
    [nominatorsConnection, subspaceAccount],
  )

  const totalStake = useMemo(
    () => (BigInt(totalOperatorStake) + BigInt(totalNominatedStake)).toString(),
    [totalOperatorStake, totalNominatedStake],
  )

  return (
    <div className='m-2 mt-0 rounded-[20px] bg-grayLight p-5 dark:bg-blueAccent dark:text-white'>
      <Accordion
        title={
          <div className='m-2 mb-0 flex items-center pt-4'>
            <span className='text-base font-medium text-grayDarker dark:text-white'>
              Staking Summary
            </span>
          </div>
        }
      >
        {loading && <ExclamationTriangleIcon className='size-5' stroke='orange' />}
        {error && (
          <div className='m-2 flex items-center pt-4'>
            <span className='text-base font-medium text-grayDarker dark:text-white'>
              We are unable to load your wallet data
            </span>
          </div>
        )}
        {totalStake !== '0' ? (
          <List>
            <StyledListItem title='Your total staked'>
              {bigNumberToNumber(totalStake)} {tokenSymbol}
            </StyledListItem>
            {totalOperatorStake !== '0' && (
              <li key={'totalOperatorStake'}>
                <Link
                  data-testid='totalOperatorStake-link'
                  className='hover:text-purpleAccent'
                  href={`/${selectedChain.urls.page}/${Routes.operators}/${INTERNAL_ROUTES.operators.manage}`}
                >
                  <StyledListItem title='Your total staked in your own operators'>
                    {bigNumberToNumber(totalOperatorStake)} {tokenSymbol}
                  </StyledListItem>
                </Link>
              </li>
            )}
            {totalNominatedStake !== '0' && (
              <li key={'totalNominatedStake'}>
                <Link
                  data-testid='totalNominatedStake-link'
                  className='hover:text-purpleAccent'
                  href={`/${selectedChain.urls.page}/${Routes.operators}/${INTERNAL_ROUTES.operators.nomination}`}
                >
                  <StyledListItem title='Your total nominated to other operators'>
                    {bigNumberToNumber(totalNominatedStake)} {tokenSymbol}
                  </StyledListItem>
                </Link>
              </li>
            )}
            {totalOperatorCount > 0 && (
              <li key={'totalOperatorCount'}>
                <Link
                  data-testid='totalOperatorCount-link'
                  className='hover:text-purpleAccent'
                  href={`/${selectedChain.urls.page}/${Routes.operators}/${INTERNAL_ROUTES.operators.manage}`}
                >
                  <StyledListItem title='Amount of operators you control'>
                    {totalOperatorCount}
                  </StyledListItem>
                </Link>
              </li>
            )}
            {totalNominatedCount > 0 && (
              <li key={'totalNominatedCount'}>
                <Link
                  data-testid='totalNominatedCount-link'
                  className='hover:text-purpleAccent'
                  href={`/${selectedChain.urls.page}/${Routes.operators}/${INTERNAL_ROUTES.operators.nomination}`}
                >
                  <StyledListItem title='Amount of nomination'>
                    {totalNominatedCount}
                  </StyledListItem>
                </Link>
              </li>
            )}
          </List>
        ) : (
          <div className='m-2 flex items-center pt-4'>
            <Link
              data-testid='totalNominatedCount-link'
              className='hover:text-purpleAccent'
              href={`/${selectedChain.urls.page}/${Routes.operators}/${INTERNAL_ROUTES.operators.list}`}
            >
              <span className='text-sm font-medium text-grayDarker dark:text-white'>
                Your wallet has not staked any {tokenSymbol} yet! Head over to the operators page to
                stake your {tokenSymbol}
              </span>
            </Link>
          </div>
        )}
      </Accordion>
    </div>
  )
}
