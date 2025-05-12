'use client'

import { sendGAEvent } from '@next/third-parties/google'
import { PageTabs } from 'components/common/PageTabs'
import { Spinner } from 'components/common/Spinner'
import { Tab } from 'components/common/Tabs'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import { AccountByIdDocument, AccountByIdQuery, AccountByIdQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useMediaQuery from 'hooks/useMediaQuery'
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
import { AccountTransfersList } from './AccountTransfersList'
import { BalanceHistory } from './BalanceHistory'

export const Account: FC = () => {
  const { ref, inView } = useInView()
  const { accountId: rawAccountId } = useParams<AccountIdParam>()
  const inFocus = useWindowFocus()
  const accountId = formatAddress(rawAccountId)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const { loading, setIsVisible } = useIndexersQuery<AccountByIdQuery, AccountByIdQueryVariables>(
    AccountByIdDocument,
    {
      variables: { accountId: accountId ?? '' },
      skip: !inFocus,
    },
    Routes.consensus,
    'account',
  )

  const consensusEntry = useQueryStates((state) => state.consensus.account)

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const account = useMemo(() => data && data.consensus_accounts_by_pk, [data])
  const rewards = useMemo(() => (data ? data.consensus_rewards : []), [data])

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
            <div className='mb-8 flex flex-col gap-8 lg:flex-row lg:justify-between'>
              <AccountGraphs account={account} isDesktop={isDesktop} />
              <AccountRewardsHistory isDesktop={isDesktop} rewards={rewards} />
            </div>
            <PageTabs isDesktop={isDesktop} pillStyle='py-2' activePillStyle='py-2'>
              <Tab title='Balance History'>
                <BalanceHistory accountId={accountId} />
              </Tab>
              <Tab title='Extrinsic List'>
                <AccountExtrinsicList accountId={accountId} />
              </Tab>
              <Tab title='Transfers'>
                <AccountTransfersList accountId={accountId} />
              </Tab>
            </PageTabs>
          </>
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
