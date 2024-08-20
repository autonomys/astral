'use client'

import { sendGAEvent } from '@next/third-parties/google'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import {
  AccountByIdQuery,
  AccountByIdQueryVariables,
  RewardEvent,
  Account as SquidAccount,
} from 'gql/graphql'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { AccountIdParam } from 'types/app'
import { formatAddress } from 'utils/formatAddress'
import { AccountDetailsCard } from './AccountDetailsCard'
import { AccountExtrinsicList } from './AccountExtrinsicList'
import { AccountGraphs } from './AccountGraphs'
import { AccountRewardsHistory } from './AccountRewardsHistory'
import { QUERY_ACCOUNT_BY_ID } from './query'

export const Account: FC = () => {
  const { ref, inView } = useInView()
  const { accountId: rawAccountId } = useParams<AccountIdParam>()
  const inFocus = useWindowFocus()
  const accountId = formatAddress(rawAccountId)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const { loading, setIsVisible } = useSquidQuery<AccountByIdQuery, AccountByIdQueryVariables>(
    QUERY_ACCOUNT_BY_ID,
    {
      variables: { accountId: accountId ?? '' },
      skip: !inFocus,
    },
    Routes.consensus,
    'account',
  )

  const {
    consensus: { account: consensusEntry },
  } = useQueryStates()

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const account = useMemo(() => data && (data.accountById as SquidAccount), [data])
  const rewards = useMemo(() => (data ? (data.rewardEvents as RewardEvent[]) : []), [data])

  useEffect(() => {
    sendGAEvent('event', 'visit_account_page', { value: accountId })
  }, [accountId])

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!hasValue(consensusEntry)) return <NotFound />
    return null
  }, [loading, consensusEntry])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col space-y-4'>
      <div ref={ref}>
        {!loading && accountId ? (
          <>
            <AccountDetailsCard
              account={account}
              accountAddress={accountId}
              isDesktop={isDesktop}
            />
            <div className='flex flex-col gap-8 lg:flex-row lg:justify-between'>
              <AccountGraphs account={account} isDesktop={isDesktop} />
              <AccountRewardsHistory isDesktop={isDesktop} rewards={rewards} />
            </div>
            <AccountExtrinsicList accountId={accountId} />
          </>
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
