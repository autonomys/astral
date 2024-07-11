import { numberPositionSuffix } from '@/utils/number'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import {
  INTERNAL_ROUTES,
  ROUTE_EXTRA_FLAG_TYPE,
  ROUTE_FLAG_VALUE_OPEN_CLOSE,
  Routes,
} from 'constants/routes'
import { AccountsTopLeaderboardQuery, AccountsTopLeaderboardQueryVariables } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isError, isLoading, useQueryStates } from 'states/query'
import { QUERY_TOP_LEADERBOARD } from './query'

interface LeaderboardProps {
  subspaceAccount: string
}

export const useLeaderboard = (subspaceAccount: string) => {
  const inFocus = useWindowFocus()
  const { get } = useSearchParams()
  const isSideKickOpen = get(ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK)

  const variables = useMemo(
    () => ({
      first: 100,
    }),
    [],
  )
  const { setIsVisible } = useSquidQuery<
    AccountsTopLeaderboardQuery,
    AccountsTopLeaderboardQueryVariables
  >(
    QUERY_TOP_LEADERBOARD,
    {
      variables,
      skip: !inFocus || isSideKickOpen !== ROUTE_FLAG_VALUE_OPEN_CLOSE.OPEN,
      pollInterval: 6000,
    },
    ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK,
    'leaderboard',
  )

  const {
    walletSidekick: { leaderboard },
  } = useQueryStates()

  const loading = useMemo(() => isLoading(leaderboard), [leaderboard])
  const data = useMemo(() => hasValue(leaderboard) && leaderboard.value, [leaderboard])
  const error = useMemo(() => isError(leaderboard), [leaderboard])

  const topFarmers = useMemo(() => {
    if (!data || !data.farmers) return 0
    const account = data.farmers.edges.find((edge) => edge.node.id === subspaceAccount)
    if (!account) return 0
    return parseInt(account.cursor)
  }, [data, subspaceAccount])

  const topOperators = useMemo(() => {
    if (!data || !data.operators) return 0
    const account = data.operators.edges.find((edge) => edge.node.id === subspaceAccount)
    if (!account) return 0
    return parseInt(account.cursor)
  }, [data, subspaceAccount])

  const topNominators = useMemo(() => {
    if (!data || !data.nominators) return 0
    const account = data.nominators.edges.find((edge) => edge.node.id === subspaceAccount)
    if (!account) return 0
    return parseInt(account.cursor)
  }, [data, subspaceAccount])

  const hasTopPositions = useMemo(
    () => topFarmers > 0 || topOperators > 0 || topNominators > 0,
    [topFarmers, topOperators, topNominators],
  )

  return {
    topFarmers,
    topOperators,
    topNominators,
    hasTopPositions,
    error,
    loading,
    setIsVisible,
  }
}

export const Leaderboard: FC<LeaderboardProps> = ({ subspaceAccount }) => {
  const { ref, inView } = useInView()
  const { selectedChain } = useDomains()
  const { topFarmers, topOperators, topNominators, hasTopPositions, error, loading, setIsVisible } =
    useLeaderboard(subspaceAccount)

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='m-2 mt-0 rounded-[20px] bg-grayLight p-5 dark:bg-blueAccent dark:text-white'>
      <Accordion
        title={
          <div className='m-2 mb-0 flex items-center pt-4'>
            <span className='text-base font-medium text-grayDarker dark:text-white'>
              Leaderboard
            </span>
          </div>
        }
      >
        <div ref={ref}>
          {loading && <ExclamationTriangleIcon className='size-5' stroke='orange' />}
          {error && (
            <div className='m-2 flex items-center pt-4'>
              <span className='text-base font-medium text-grayDarker dark:text-white'>
                We are unable to load your wallet data
              </span>
            </div>
          )}
          {hasTopPositions ? (
            <List>
              {topFarmers > 0 && (
                <li key='topFarmers'>
                  <Link
                    data-testid='topFarmers-link'
                    className='hover:text-purpleAccent'
                    href={`/${selectedChain.urls.page}/${Routes.leaderboard}/${INTERNAL_ROUTES.leaderboard.farmers}`}
                  >
                    <StyledListItem title='Top Farmer'>
                      {numberPositionSuffix(topFarmers)} place
                    </StyledListItem>
                  </Link>
                </li>
              )}
              {topOperators > 0 && (
                <li key='topOperators'>
                  <Link
                    data-testid='topOperators-link'
                    className='hover:text-purpleAccent'
                    href={`/${selectedChain.urls.page}/${Routes.leaderboard}/${INTERNAL_ROUTES.leaderboard.operators}`}
                  >
                    <StyledListItem title='Top Operator'>
                      {numberPositionSuffix(topOperators)} place
                    </StyledListItem>
                  </Link>
                </li>
              )}
              {topNominators > 0 && (
                <li key='topNominators'>
                  <Link
                    data-testid='topNominators-link'
                    className='hover:text-purpleAccent'
                    href={`/${selectedChain.urls.page}/${Routes.leaderboard}/${INTERNAL_ROUTES.leaderboard.nominators}`}
                  >
                    <StyledListItem title='Top Nominator'>
                      {numberPositionSuffix(topNominators)} place
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
                href={`/${selectedChain.urls.page}/${Routes.leaderboard}/${INTERNAL_ROUTES.leaderboard.farmers}`}
              >
                <span className='text-sm font-medium text-grayDarker dark:text-white'>
                  Your wallet is not in any of the top 100 leaderboard positions!
                </span>
              </Link>
            </div>
          )}
        </div>
      </Accordion>
    </div>
  )
}
