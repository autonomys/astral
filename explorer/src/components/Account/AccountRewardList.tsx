'use client'

/* eslint-disable camelcase */
import { PAGE_SIZE } from '@/constants/general'
import { AccountIdParam } from '@/types/app'
import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { useApolloClient, useQuery } from '@apollo/client'
import { sendGAEvent } from '@next/third-parties/google'
import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { Cell } from 'types/table'
import { formatAddress } from 'utils//formatAddress'
import { downloadFullData } from 'utils/downloadFullData'
import { sort } from 'utils/sort'
import type { Account, RewardEvent, RewardsListQuery } from '../gql/graphql'
import { NotFound } from '../layout/NotFound'
import { AccountDetailsCard } from './AccountDetailsCard'
import { QUERY_REWARDS_LIST } from './query'

dayjs.extend(relativeTime)

export const AccountRewardList: FC = () => {
  const { selectedChain, selectedDomain } = useDomains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'block_height', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')
  const { accountId } = useParams<AccountIdParam>()

  const orderBy = useMemo(() => sort(sorting, 'block_height_DESC'), [sorting])

  const variables = useMemo(
    () => ({
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
      sortBy: orderBy,
      accountId,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, accountId],
  )

  const { data, error, loading } = useQuery<RewardsListQuery>(QUERY_REWARDS_LIST, {
    variables,
    pollInterval: 6000,
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

  const columns = useMemo(
    () => [
      {
        accessorKey: 'block.height',
        header: 'Block Number',
        enableSorting: true,
        cell: ({ row }: Cell<RewardEvent>) => {
          return (
            <Link
              key={`${row.original.id}-account-index`}
              className='hover:text-purpleAccent'
              href={INTERNAL_ROUTES.blocks.id.page(
                selectedChain.urls.page,
                selectedDomain,
                row.original.block?.height,
              )}
            >
              <div>{row.original.block?.height}</div>
            </Link>
          )
        },
      },
      {
        accessorKey: 'block.hash',
        header: 'Block Hash',
        enableSorting: true,
        cell: ({ row }: Cell<RewardEvent>) => {
          return (
            <div key={`${row.original.id}-account-id`} className='row flex items-center gap-3'>
              <div>
                {isLargeLaptop
                  ? row.original.block?.hash
                  : shortString(row.original.block?.hash || '')}
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        enableSorting: true,
        cell: ({ row }: Cell<RewardEvent>) => {
          const blockDate = dayjs(row.original.timestamp).fromNow(true)

          return <div key={`${row.original.id}-block-time`}>{blockDate}</div>
        },
      },
      {
        accessorKey: 'name',
        header: 'Type',
        enableSorting: true,
        cell: ({ row }: Cell<RewardEvent>) => {
          const type = row.original.name
            .split('.')[1]
            .split(/(?=[A-Z])/)
            .join(' ')
          return <div key={`${row.original.id}-account-locked`}>{type}</div>
        },
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        enableSorting: true,
        cell: ({ row }: Cell<RewardEvent>) => (
          <div key={`${row.original.id}-account-balance`}>
            {row.original.amount ? bigNumberToNumber(row.original.amount) : 0}{' '}
            {selectedChain.token.symbol}
          </div>
        ),
      },
    ],
    [selectedChain, selectedDomain, isLargeLaptop],
  )

  const pageCount = useMemo(
    () => (totalCount ? Math.floor(totalCount / pagination.pageSize) : 0),
    [totalCount, pagination.pageSize],
  )

  const apolloClient = useApolloClient()
  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, QUERY_REWARDS_LIST, 'rewardEventsConnection', {
        orderBy,
      }),
    [apolloClient, orderBy],
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
        <div className='w-full'>
          <div className='my-6 rounded'>
            <SortedTable
              data={rewards}
              columns={columns}
              showNavigation={true}
              sorting={sorting}
              onSortingChange={setSorting}
              pagination={pagination}
              pageCount={pageCount}
              onPaginationChange={setPagination}
              fullDataDownloader={fullDataDownloader}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
