'use client'

/* eslint-disable camelcase */
import { PAGE_SIZE } from '@/constants/general'
import { AccountIdParam } from '@/types/app'
import { numberWithCommas } from '@/utils/number'
import { useQuery } from '@apollo/client'
import { sendGAEvent } from '@next/third-parties/google'
import { SortingState } from '@tanstack/react-table'
import { Spinner } from 'components/common/Spinner'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { formatAddress } from 'utils//formatAddress'
import type { Account, RewardEvent, RewardsListQuery } from '../gql/graphql'
import { NotFound } from '../layout/NotFound'
import { AccountDetailsCard } from './AccountDetailsCard'
import { AccountRewardTable } from './AccountRewardTable'
import { QUERY_REWARDS_LIST } from './query'

export const AccountRewardList: FC = () => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'block_height', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const { accountId } = useParams<AccountIdParam>()

  const { data, error, loading } = useQuery<RewardsListQuery>(QUERY_REWARDS_LIST, {
    variables: {
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
      accountId,
      sortBy: sorting.length
        ? sorting.map((s) => `${s.id}_${s.desc ? 'DESC' : 'ASC'}`).join(',')
        : 'block_height_DESC',
    },
  })

  useErrorHandler(error)

  const rewardEventsConnection = useMemo(() => data && data.rewardEventsConnection, [data])
  const rewards = useMemo(
    () =>
      rewardEventsConnection &&
      rewardEventsConnection.edges.map((reward) => reward.node as RewardEvent),
    [rewardEventsConnection],
  )
  const totalCount = useMemo(
    () => rewardEventsConnection && rewardEventsConnection.totalCount,
    [rewardEventsConnection],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const account = useMemo(() => rewards && (rewards[0].account as Account), [rewards])
  const convertedAddress = useMemo(() => (account ? formatAddress(account.id) : ''), [account])
  const pageCount = useMemo(
    () => (totalCount ? Math.floor(totalCount / pagination.pageSize) : 0),
    [totalCount, pagination.pageSize],
  )

  useEffect(() => {
    sendGAEvent('event', 'visit_account_rewards_page', { value: accountId })
  }, [accountId])

  if (loading) return <Spinner />
  if (!account || !convertedAddress || !data || !rewards) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      <AccountDetailsCard account={account} accountAddress={convertedAddress} />

      <div className='mt-5 flex w-full justify-between'>
        <div className='text-base font-medium text-grayDark dark:text-white'>{`Rewards (${totalLabel})`}</div>
      </div>
      <div className='mt-5 flex w-full flex-col sm:mt-0'></div>
      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <AccountRewardTable
          rewards={rewards}
          sorting={sorting}
          pageCount={pageCount}
          setSorting={setSorting}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  )
}
