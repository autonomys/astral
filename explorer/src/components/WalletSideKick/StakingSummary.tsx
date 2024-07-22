import { bigNumberToNumber } from '@/utils/number'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import type { Chain } from 'constants/chains'
import { ROUTE_EXTRA_FLAG_TYPE, ROUTE_FLAG_VALUE_OPEN_CLOSE, Routes } from 'constants/routes'
import { StakingSummaryQuery, StakingSummaryQueryVariables } from 'gql/graphql'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isError, isLoading, useQueryStates } from 'states/query'
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
  const { ref, inView } = useInView()
  const inFocus = useWindowFocus()
  const { get } = useSearchParams()
  const isSideKickOpen = get(ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK)

  const variables = useMemo(
    () => ({
      first: 10,
      subspaceAccount,
    }),
    [subspaceAccount],
  )
  const { setIsVisible } = useSquidQuery<StakingSummaryQuery, StakingSummaryQueryVariables>(
    QUERY_STAKING_SUMMARY,
    {
      variables,
      skip: !inFocus || isSideKickOpen !== ROUTE_FLAG_VALUE_OPEN_CLOSE.OPEN,
      pollInterval: 6000,
    },
    ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK,
    'stakingSummary',
  )

  const {
    walletSidekick: { stakingSummary },
  } = useQueryStates()

  const operators = useMemo(
    () => hasValue(stakingSummary) && stakingSummary.value.operators,
    [stakingSummary],
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

  const nominators = useMemo(
    () => hasValue(stakingSummary) && stakingSummary.value.nominators,
    [stakingSummary],
  )
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

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

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
        <div ref={ref}>
          {isLoading(stakingSummary) && (
            <ExclamationTriangleIcon className='size-5' stroke='orange' />
          )}
          {isError(stakingSummary) && (
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
                <Link
                  key={'totalOperatorStake'}
                  data-testid='totalOperatorStake-link'
                  className='hover:text-purpleAccent'
                  href={`/${selectedChain.urls.page}/${Routes.staking}`}
                >
                  <StyledListItem title='Your total staked in your own operators'>
                    {bigNumberToNumber(totalOperatorStake)} {tokenSymbol}
                  </StyledListItem>
                </Link>
              )}
              {totalNominatedStake !== '0' && (
                <Link
                  key={'totalNominatedStake'}
                  data-testid='totalNominatedStake-link'
                  className='hover:text-purpleAccent'
                  href={`/${selectedChain.urls.page}/${Routes.staking}`}
                >
                  <StyledListItem title='Your total nominated to other operators'>
                    {bigNumberToNumber(totalNominatedStake)} {tokenSymbol}
                  </StyledListItem>
                </Link>
              )}
              {totalOperatorCount > 0 && (
                <Link
                  key={'totalOperatorCount'}
                  data-testid='totalOperatorCount-link'
                  className='hover:text-purpleAccent'
                  href={`/${selectedChain.urls.page}/${Routes.staking}`}
                >
                  <StyledListItem title='Amount of operators you control'>
                    {totalOperatorCount}
                  </StyledListItem>
                </Link>
              )}
              {totalNominatedCount > 0 && (
                <Link
                  key={'totalNominatedCount'}
                  data-testid='totalNominatedCount-link'
                  className='hover:text-purpleAccent'
                  href={`/${selectedChain.urls.page}/${Routes.staking}`}
                >
                  <StyledListItem title='Amount of nomination'>
                    {totalNominatedCount}
                  </StyledListItem>
                </Link>
              )}
            </List>
          ) : (
            <div className='m-2 flex items-center pt-4'>
              <Link
                data-testid='totalNominatedCount-link'
                className='hover:text-purpleAccent'
                href={`/${selectedChain.urls.page}/${Routes.staking}`}
              >
                <span className='text-sm font-medium text-grayDarker dark:text-white'>
                  Your wallet has not staked any {tokenSymbol} yet! Head over to the operators page
                  to stake your {tokenSymbol}
                </span>
              </Link>
            </div>
          )}
        </div>
      </Accordion>
    </div>
  )
}
