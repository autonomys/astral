'use client'

import { StatusIcon } from '@/components/common/StatusIcon'
import { useApolloClient } from '@apollo/client'
import { shortString } from '@autonomys/auto-utils'
import { sendGAEvent } from '@next/third-parties/google'
import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  AccountByIdQuery,
  Order_By as OrderBy,
  RewardsListDocument,
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
import { useConsensusStates } from 'states/consensus'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { AccountIdParam } from 'types/app'
import type { Cell } from 'types/table'
import { formatAddress } from 'utils//formatAddress'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { countTablePages } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'
import { AccountDetailsCard } from './AccountDetailsCard'

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
  const { accountId: rawAccountId } = useParams<AccountIdParam>()
  const inFocus = useWindowFocus()
  const accountId = formatAddress(rawAccountId)
  const lastNetworkBlockNumber = useConsensusStates((state) => state.lastBlockNumber)
  const lastBlockNumber = useMemo(
    () => lastNetworkBlockNumber[network],
    [lastNetworkBlockNumber, network],
  )
  const orderBy = useMemo(
    () =>
      sorting && sorting.length > 0
        ? sorting[0].id.endsWith('aggregate')
          ? { [sorting[0].id]: sorting[0].desc ? { count: OrderBy.Desc } : { count: OrderBy.Asc } }
          : { [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }
        : // eslint-disable-next-line camelcase
          { block_height: OrderBy.Desc },
    [sorting],
  )

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      accountId: accountId ?? '',
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, accountId],
  )

  const { loading, setIsVisible } = useIndexersQuery<RewardsListQuery, RewardsListQueryVariables>(
    RewardsListDocument,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    'accountReward',
  )

  const consensusEntry = useQueryStates((state) => state.consensus.accountReward)

  const rewards = useMemo(
    () => hasValue(consensusEntry) && consensusEntry.value.consensus_rewards,
    [consensusEntry],
  )
  const totalCount = useMemo(
    () =>
      hasValue(consensusEntry) && consensusEntry.value.consensus_rewards_aggregate.aggregate
        ? consensusEntry.value.consensus_rewards_aggregate.aggregate.count
        : 0,
    [consensusEntry],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const account = useMemo(
    () =>
      rewards
        ? (rewards[0].account as unknown as AccountByIdQuery['consensus_accounts_by_pk'])
        : undefined,
    [rewards],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'block_height',
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
        accessorKey: 'block_hash',
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
        accessorKey: 'reward_type',
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
      {
        accessorKey: 'block_height',
        header: 'Confirmation',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => {
          const confirmations = lastBlockNumber
            ? Math.max(0, lastBlockNumber - row.original.block_height)
            : 0
          return (
            <div
              key={`${row.original.id}-account-confirmation`}
              className='flex items-center gap-2'
            >
              <StatusIcon status={confirmations >= 10} isPending={confirmations < 10} />
              <span className={confirmations < 10 ? 'text-orange-500' : 'text-green-500'}>
                {confirmations}
              </span>
            </div>
          )
        },
      },
    ],
    [network, section, isLargeLaptop, tokenSymbol, lastBlockNumber],
  )

  const pageCount = useMemo(
    () => (totalCount ? countTablePages(totalCount, pagination.pageSize) : 0),
    [totalCount, pagination.pageSize],
  )

  const apolloClient = useApolloClient()
  const fullDataDownloader = useCallback(
    () => downloadFullData(apolloClient, RewardsListDocument, 'consensus_rewards', variables),
    [apolloClient, variables],
  )

  useEffect(() => {
    sendGAEvent('event', 'visit_account_rewards_page', { value: accountId })
  }, [accountId])

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!hasValue(consensusEntry)) return <NotFound />
    return null
  }, [consensusEntry, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      {accountId && <AccountDetailsCard account={account} accountAddress={accountId} />}

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
