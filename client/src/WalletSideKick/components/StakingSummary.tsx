import { useQuery } from '@apollo/client'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Nominator, NominatorsConnection, OperatorsConnection } from 'gql/graphql'
import { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

// common
import { Accordion, List, StyledListItem } from 'common/components'
import { bigNumberToNumber } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import { INTERNAL_ROUTES } from 'common/routes'

// query
import { QUERY_STAKING_SUMMARY } from '../querys'

interface StakingSummaryProps {
  subspaceAccount: string
  tokenSymbol: string
}

export const StakingSummary: FC<StakingSummaryProps> = ({ subspaceAccount, tokenSymbol }) => {
  const { selectedChain } = useDomains()

  const summaryVariables = useMemo(
    () => ({
      first: 10,
      subspaceAccount,
    }),
    [subspaceAccount],
  )

  const {
    data: stackingSummaryData,
    error: stackingSummaryError,
    loading: stackingSummaryLoading,
  } = useQuery(QUERY_STAKING_SUMMARY, {
    variables: summaryVariables,
    pollInterval: 6000,
  })

  const operators: OperatorsConnection = useMemo(
    () =>
      stackingSummaryData && stackingSummaryData.operators ? stackingSummaryData.operators : [],
    [stackingSummaryData],
  )
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

  const nominators: NominatorsConnection = useMemo(
    () =>
      stackingSummaryData && stackingSummaryData.nominators ? stackingSummaryData.nominators : [],
    [stackingSummaryData],
  )
  const nominatorsConnection: Nominator[] = useMemo(
    () =>
      nominators && nominators.edges ? nominators.edges.map((nominator) => nominator.node) : [],
    [nominators],
  )
  const totalNominatedCount = useMemo(() => (nominators ? nominators.totalCount : 0), [nominators])
  const totalNominatedStake = useMemo(
    () =>
      nominatorsConnection
        .reduce(
          (acc, nominator) =>
            acc +
            (BigInt(nominator.operator.currentTotalStake) /
              BigInt(nominator.operator.totalShares)) *
              BigInt(nominator.shares),
          BigInt(0),
        )
        .toString(),
    [nominatorsConnection],
  )

  const totalStake = useMemo(
    () => (BigInt(totalOperatorStake) + BigInt(totalNominatedStake)).toString(),
    [totalOperatorStake, totalNominatedStake],
  )

  return (
    <div className='p-5 m-2 mt-0 bg-[#DDEFF1] rounded-[20px] dark:bg-[#1E254E] dark:text-white'>
      <Accordion
        title={
          <div className='flex items-center m-2 mb-0 pt-4'>
            <span className='text-[#241235] text-base font-medium dark:text-white'>
              Staking Summary
            </span>
          </div>
        }
      >
        {stackingSummaryLoading && <ExclamationTriangleIcon className='h-5 w-5' stroke='orange' />}
        {stackingSummaryError && (
          <div className='flex items-center m-2 pt-4'>
            <span className='text-[#241235] text-base font-medium dark:text-white'>
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
                  className='hover:text-[#DE67E4]'
                  to={`../${selectedChain.urls.page}/operators/${INTERNAL_ROUTES.operators.manage}`}
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
                  className='hover:text-[#DE67E4]'
                  to={`../${selectedChain.urls.page}/operators/${INTERNAL_ROUTES.operators.nomination}`}
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
                  className='hover:text-[#DE67E4]'
                  to={`../${selectedChain.urls.page}/operators/${INTERNAL_ROUTES.operators.manage}`}
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
                  className='hover:text-[#DE67E4]'
                  to={`../${selectedChain.urls.page}/operators/${INTERNAL_ROUTES.operators.nomination}`}
                >
                  <StyledListItem title='Amount of nomination'>
                    {totalNominatedCount}
                  </StyledListItem>
                </Link>
              </li>
            )}
          </List>
        ) : (
          <div className='flex items-center m-2 pt-4'>
            <Link
              data-testid='totalNominatedCount-link'
              className='hover:text-[#DE67E4]'
              to={`../${selectedChain.urls.page}/operators/${INTERNAL_ROUTES.operators.list}`}
            >
              <span className='text-[#241235] text-sm font-medium dark:text-white'>
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
