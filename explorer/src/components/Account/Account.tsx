'use client'

import { useQuery } from '@apollo/client'
import { sendGAEvent } from '@next/third-parties/google'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useErrorHandler } from 'react-error-boundary'
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
  const { accountId: rawAccountId } = useParams<AccountIdParam>()
  const { selectedChain } = useDomains()
  const accountId = selectedChain.isDomain ? rawAccountId : formatAddress(rawAccountId)

  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const AccountQuery = selectedChain.isDomain ? QUERY_ACCOUNT_BY_ID_EVM : QUERY_ACCOUNT_BY_ID

  const { data, error, loading } = useQuery<AccountByIdQuery | AccountByIdEvmQuery>(AccountQuery, {
    variables: { accountId },
  })

  useErrorHandler(error)

  const account = useMemo(() => data && (data.accountById as SquidAccount), [data])

  useEffect(() => {
    sendGAEvent('event', 'visit_account_rewards_page', { value: accountId })
  }, [accountId])

  if (loading) return <Spinner />
  if (!accountId || !data || !data.accountById || !account) return <NotFound />

  return (
    <div className='flex w-full flex-col space-y-4'>
      <AccountDetailsCard account={account} accountAddress={accountId} isDesktop={isDesktop} />
      <div className='flex flex-col gap-8 lg:flex-row lg:justify-between'>
        <AccountGraphs account={account} isDesktop={isDesktop} />
        <AccountRewardsHistory isDesktop={isDesktop} rewards={data.rewardEvents as RewardEvent[]} />
      </div>
      <AccountExtrinsicList accountId={accountId} />
    </div>
  )
}
