'use client'

import { useApolloClient } from '@apollo/client'
import { shortString } from '@autonomys/auto-utils'
import { sendGAEvent } from '@next/third-parties/google'
import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES } from 'constants/routes'
import {
  AccountByIdQuery,
  Order_By as OrderBy,
  RewardsListQuery,
  RewardsListQueryVariables,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useMediaQuery from 'hooks/useMediaQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { AccountIdParam } from 'types/app'
import type { Cell } from 'types/table'
import { formatAddress } from 'utils//formatAddress'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { countTablePages } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'
import { AccountDetailsCard } from './AccountDetailsCard'
import { QUERY_REWARDS_LIST } from './query'

type Row = RewardsListQuery['consensus_rewards'][number]

export const AccountRewardList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section, tokenSymbol } = useIndexers()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'block_height', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')
  const { accountId } = useParams<AccountIdParam>()
  const inFocus = useWindowFocus()

  // eslint-disable-next-line camelcase
  const sortBy = useMemo(() => ({ block_height: OrderBy.Desc }), [])

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      sortBy,
      accountId: accountId ?? '',
    }),
    [pagination.pageSize, pagination.pageIndex, sortBy, accountId],
  )

  const { data, loading } = useIndexersQuery<RewardsListQuery, RewardsListQueryVariables>(
    QUERY_REWARDS_LIST,
    {
      variables,
      pollInterval: 6000,
    },
    inView,
    inFocus,
  )

  const rewards = useMemo(() => data && data.consensus_rewards, [data])
  const totalCount = useMemo(
    () =>
      data && data.consensus_rewards_aggregate.aggregate
        ? data.consensus_rewards_aggregate.aggregate.count
        : 0,
    [data],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const account = useMemo(
    () =>
      rewards &&
      (rewards[0].account as unknown as AccountByIdQuery['consensus_account_histories'][number]),
    [rewards],
  )
  const convertedAddress = useMemo(() => (account ? formatAddress(account.id) : ''), [account])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'block.height',
        header: 'Block Number',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => {
          return (
            <Link
              key={`${row.original.id}-account-index`}
              className='hover:text-primaryAccent'
              href={INTERNAL_ROUTES.blocks.id.page(network, section, row.original.block?.height)}
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
        cell: ({ row }: Cell<Row>) => {
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
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.original.id}-block-time`}>
            {utcToLocalRelativeTime(row.original.timestamp)}
          </div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Type',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => {
          const type = row.original.reward_type
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
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.original.id}-account-balance`}>
            {row.original.amount ? bigNumberToNumber(row.original.amount) : 0} {tokenSymbol}
          </div>
        ),
      },
    ],
    [network, section, isLargeLaptop, tokenSymbol],
  )

  const pageCount = useMemo(
    () => (totalCount ? countTablePages(totalCount, pagination.pageSize) : 0),
    [totalCount, pagination.pageSize],
  )

  const apolloClient = useApolloClient()
  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, QUERY_REWARDS_LIST, 'rewardEventsConnection', {
        sortBy,
        accountId: accountId ?? '',
      }),
    [accountId, apolloClient, sortBy],
  )

  useEffect(() => {
    sendGAEvent('event', 'visit_account_rewards_page', { value: accountId })
  }, [accountId])

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  return (
    <div className='flex w-full flex-col align-middle'>
      {convertedAddress && (
        <AccountDetailsCard account={account} accountAddress={convertedAddress} />
      )}

      <div className='mt-5 flex w-full justify-between'>
        <div className='text-base font-medium text-grayDark dark:text-white'>{`Rewards (${totalLabel})`}</div>
      </div>
      <div className='mt-5 flex w-full flex-col sm:mt-0'></div>
      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <div className='w-full'>
          <div className='my-6 rounded' ref={ref}>
            {!loading && rewards ? (
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
            ) : (
              noData
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
