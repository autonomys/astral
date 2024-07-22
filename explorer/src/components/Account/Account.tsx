'use client'

import { sendGAEvent } from '@next/third-parties/google'
import { useEvmExplorerBanner } from 'components/common/EvmExplorerBanner'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import { AccountByIdEvmQueryVariables, AccountByIdQueryVariables } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { AccountIdParam } from 'types/app'
import { formatAddress } from 'utils/formatAddress'
import {
  AccountByIdEvmQuery,
  AccountByIdQuery,
  RewardEvent,
  Account as SquidAccount,
} from '../gql/graphql'
import { AccountDetailsCard } from './AccountDetailsCard'
import { AccountExtrinsicList } from './AccountExtrinsicList'
import { AccountGraphs } from './AccountGraphs'
import { AccountRewardsHistory } from './AccountRewardsHistory'
import { QUERY_ACCOUNT_BY_ID, QUERY_ACCOUNT_BY_ID_EVM } from './query'

export const Account: FC = () => {
  const { ref, inView } = useInView()
  const { accountId: rawAccountId } = useParams<AccountIdParam>()
  const { selectedChain } = useDomains()
  const novaExplorerBanner = useEvmExplorerBanner('address/' + rawAccountId)
  const inFocus = useWindowFocus()
  const accountId = selectedChain.isDomain ? rawAccountId : formatAddress(rawAccountId)

  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const AccountQuery = selectedChain.isDomain ? QUERY_ACCOUNT_BY_ID_EVM : QUERY_ACCOUNT_BY_ID

  const { setIsVisible } = useSquidQuery<
    AccountByIdQuery | AccountByIdEvmQuery,
    AccountByIdQueryVariables | AccountByIdEvmQueryVariables
  >(
    AccountQuery,
    {
      variables: { accountId: accountId ?? '' },
      skip: !inFocus,
    },
    selectedChain?.isDomain ? Routes.nova : Routes.consensus,
    'account',
  )

  const {
    consensus: { account: consensusEntry },
    nova: { account: evmEntry },
  } = useQueryStates()

  const loading = useMemo(() => {
    if (selectedChain?.isDomain) return isLoading(evmEntry)
    return isLoading(consensusEntry)
  }, [evmEntry, consensusEntry, selectedChain])

  const data = useMemo(() => {
    if (selectedChain?.isDomain && hasValue(evmEntry)) return evmEntry.value
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry, evmEntry, selectedChain])

  const account = useMemo(() => data && (data.accountById as SquidAccount), [data])
  const rewards = useMemo(() => (data ? (data.rewardEvents as RewardEvent[]) : []), [data])

  useEffect(() => {
    sendGAEvent('event', 'visit_account_page', { value: accountId })
  }, [accountId])

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col space-y-4'>
      {novaExplorerBanner}
      <div ref={ref}>
        {accountId ? (
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
