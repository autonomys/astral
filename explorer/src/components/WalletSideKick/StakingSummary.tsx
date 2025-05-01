import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import { BIGINT_ZERO, SHARES_CALCULATION_MULTIPLIER } from 'constants/general'
import {
  ROUTE_EXTRA_FLAG_TYPE,
  ROUTE_FLAG_VALUE_OPEN_CLOSE,
  Routes,
  RoutesStaking,
} from 'constants/routes'
import {
  StakingSummaryDocument,
  StakingSummaryQuery,
  StakingSummaryQueryVariables,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isError, isLoading, useQueryStates } from 'states/query'
import { bigNumberToNumber } from 'utils/number'

interface StakingSummaryProps {
  subspaceAccount: string
  tokenSymbol: string
}

export const StakingSummary: FC<StakingSummaryProps> = ({ subspaceAccount, tokenSymbol }) => {
  const { ref, inView } = useInView()
  const { network } = useIndexers()
  const inFocus = useWindowFocus()
  const searchParams = useSearchParams()
  const isSideKickOpen = searchParams.get(ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK)

  const variables = useMemo(
    () => ({
      first: 10,
      subspaceAccount,
    }),
    [subspaceAccount],
  )
  const { setIsVisible } = useIndexersQuery<StakingSummaryQuery, StakingSummaryQueryVariables>(
    StakingSummaryDocument,
    {
      variables,
      skip: !inFocus || isSideKickOpen !== ROUTE_FLAG_VALUE_OPEN_CLOSE.OPEN,
      pollInterval: 6000,
      context: { clientName: 'staking' },
    },
    ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK,
    'stakingSummary',
  )

  const stakingSummary = useQueryStates((state) => state.walletSidekick.stakingSummary)

  const totalOperatorCount = useMemo(
    () =>
      (hasValue(stakingSummary) &&
        stakingSummary.value.staking_operators_aggregate.aggregate?.count) ||
      0,
    [stakingSummary],
  )
  const totalOperatorStake = useMemo(
    () =>
      hasValue(stakingSummary)
        ? stakingSummary.value.staking_nominators
            .filter((n) => n.operator?.account_id === subspaceAccount)
            .reduce((acc, nominator) => {
              const totalShares = nominator.deposits.reduce(
                (acc, curr) => acc + BigInt(curr.estimated_shares),
                BIGINT_ZERO,
              )
              const estimatedStake = BigInt(nominator.operator?.current_share_price) * totalShares
              return estimatedStake > BIGINT_ZERO
                ? acc + estimatedStake / SHARES_CALCULATION_MULTIPLIER
                : acc
            }, BIGINT_ZERO)
        : BIGINT_ZERO,
    [stakingSummary, subspaceAccount],
  )

  const totalNominatedCount = useMemo(
    () =>
      (hasValue(stakingSummary) &&
        stakingSummary.value.staking_nominators_aggregate.aggregate?.count) ||
      0,
    [stakingSummary],
  )

  const totalNominatedStake = useMemo(
    () =>
      hasValue(stakingSummary)
        ? stakingSummary.value.staking_nominators
            .filter((n) => n.operator?.account_id !== subspaceAccount)
            .reduce((acc, nominator) => {
              const totalShares = nominator.deposits.reduce(
                (acc, curr) => acc + BigInt(curr.estimated_shares),
                BIGINT_ZERO,
              )
              const estimatedStake = BigInt(nominator.operator?.current_share_price) * totalShares
              return estimatedStake > BIGINT_ZERO
                ? acc + estimatedStake / SHARES_CALCULATION_MULTIPLIER
                : acc
            }, BIGINT_ZERO)
        : BIGINT_ZERO,
    [stakingSummary, subspaceAccount],
  )

  const totalStaked = useMemo(
    () => totalOperatorStake + totalNominatedStake,
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
          {totalStaked > BIGINT_ZERO ? (
            <List>
              <StyledListItem title='Your total staked'>
                {bigNumberToNumber(totalStaked)} {tokenSymbol}
              </StyledListItem>
              {totalOperatorStake > BIGINT_ZERO && (
                <Link
                  key={'totalOperatorStake'}
                  data-testid='totalOperatorStake-link'
                  className='hover:text-primaryAccent'
                  href={`/${network}/${Routes.staking}/${RoutesStaking.nominations}`}
                >
                  <StyledListItem title='Your total staked in your own operators'>
                    {bigNumberToNumber(totalOperatorStake)} {tokenSymbol}
                  </StyledListItem>
                </Link>
              )}
              {totalNominatedStake > BIGINT_ZERO && (
                <Link
                  key={'totalNominatedStake'}
                  data-testid='totalNominatedStake-link'
                  className='hover:text-primaryAccent'
                  href={`/${network}/${Routes.staking}/${RoutesStaking.nominations}`}
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
                  className='hover:text-primaryAccent'
                  href={`/${network}/${Routes.staking}/${RoutesStaking.nominations}`}
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
                  className='hover:text-primaryAccent'
                  href={`/${network}/${Routes.staking}/${RoutesStaking.nominations}`}
                >
                  <StyledListItem title='Amount of nominations'>
                    {totalNominatedCount}
                  </StyledListItem>
                </Link>
              )}
            </List>
          ) : (
            <div className='m-2 flex items-center pt-4'>
              <Link
                data-testid='totalNominatedCount-link'
                className='hover:text-primaryAccent'
                href={`/${network}/${Routes.staking}`}
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
