'use client'

/* eslint-disable camelcase */
import { PAGE_SIZE } from '@/constants/general'
import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { useApolloClient, useQuery } from '@apollo/client'
import Identicon from '@polkadot/react-identicon'
import { SortingState } from '@tanstack/react-table'
import { DebouncedInput } from 'components/common/DebouncedInput'
import { NewTable } from 'components/common/NewTable'
import { NotAllowed } from 'components/common/NotAllowed'
import { Spinner } from 'components/common/Spinner'
import { INTERNAL_ROUTES } from 'constants/routes'
import type {
  AccountLeaderboardEventsCountQuery,
  AccountsConnectionRewardsQuery,
} from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useCallback, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { NotFound } from '../layout/NotFound'
import { VoteBlockRewardListCard } from './VoteBlockRewardListCard'
import { QUERY_EVENTS_COUNT, QUERY_REWARDS_LIST } from './querys'

interface EventsCountProps {
  subspaceAddress: string
  events: string[]
}

export const EventsCount: FC<EventsCountProps> = ({ subspaceAddress, events }) => {
  const { data, error, loading } = useQuery<AccountLeaderboardEventsCountQuery>(
    QUERY_EVENTS_COUNT,
    {
      variables: {
        where: {
          AND: {
            account: { id_eq: subspaceAddress },
            name_in: events,
          },
        },
        orderBy: 'id_DESC',
      },
      pollInterval: 6000,
    },
  )

  const eventsCount = useMemo(() => data && data.rewardEventsConnection.totalCount, [data])

  if (error) return <div>Error</div>

  return <div>{loading ? <Spinner /> : eventsCount}</div>
}

export const VoteBlockRewardList = () => {
  const [searchAccount, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'operator', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const { selectedChain } = useDomains()
  const apolloClient = useApolloClient()

  const columns = useMemo(() => {
    return [
      {
        header: 'Rank',
        enableSorting: false,
        cell: ({
          row,
        }: Cell<
          AccountsConnectionRewardsQuery['accountRewardsConnection']['edges'][0]['node']
        >) => {
          const newCount = pagination.pageIndex * pagination.pageSize + row.index
          return <div>{pagination.pageIndex + 1 > 1 ? newCount + 1 : row.index + 1}</div>
        },
      },
      {
        accessorKey: 'id',
        header: 'Account',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<
          AccountsConnectionRewardsQuery['accountRewardsConnection']['edges'][0]['node']
        >) => {
          return (
            <div className='row flex items-center gap-3'>
              <Identicon value={row.original.id} size={26} theme='beachball' />
              <Link
                data-testid={`account-link-${row.index}`}
                href={INTERNAL_ROUTES.accounts.id.page(
                  selectedChain.urls.page,
                  'consensus',
                  row.original.id,
                )}
                className='hover:text-[#DE67E4]'
              >
                <div>{shortString(row.original.id)}</div>
              </Link>
            </div>
          )
        },
      },
      {
        accessorKey: 'blockCount',
        header: 'Block rewards count',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<
          AccountsConnectionRewardsQuery['accountRewardsConnection']['edges'][0]['node']
        >) => <EventsCount subspaceAddress={row.original.id} events={['Rewards.BlockReward']} />,
      },
      {
        accessorKey: 'block',
        header: 'Block rewards',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<
          AccountsConnectionRewardsQuery['accountRewardsConnection']['edges'][0]['node']
        >) => (
          <div>
            {row.original.block
              ? `${numberWithCommas(bigNumberToNumber(row.original.block))} tSSC`
              : 0}
          </div>
        ),
      },
      {
        accessorKey: 'voteCount',
        header: 'Vote rewards count',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<
          AccountsConnectionRewardsQuery['accountRewardsConnection']['edges'][0]['node']
        >) => <EventsCount subspaceAddress={row.original.id} events={['Rewards.VoteReward']} />,
      },
      {
        accessorKey: 'vote',
        header: 'Vote rewards',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<
          AccountsConnectionRewardsQuery['accountRewardsConnection']['edges'][0]['node']
        >) => (
          <div>
            {row.original.vote
              ? `${numberWithCommas(bigNumberToNumber(row.original.vote))} tSSC`
              : 0}
          </div>
        ),
      },
      {
        accessorKey: 'count',
        header: 'Total rewards count',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<
          AccountsConnectionRewardsQuery['accountRewardsConnection']['edges'][0]['node']
        >) => (
          <EventsCount
            subspaceAddress={row.original.id}
            events={['Rewards.BlockReward', 'Rewards.VoteReward']}
          />
        ),
      },
      {
        accessorKey: 'amount',
        header: 'Total rewards',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<
          AccountsConnectionRewardsQuery['accountRewardsConnection']['edges'][0]['node']
        >) => (
          <div>
            {row.original.amount
              ? `${numberWithCommas(bigNumberToNumber(row.original.amount))} tSSC`
              : 0}
          </div>
        ),
      },
    ]
  }, [selectedChain, pagination])

  const getQueryVariables = useCallback(
    (
      sorting: SortingState,
      pagination: {
        pageSize: number
        pageIndex: number
      },
      searchAccount: string,
    ) => {
      return {
        first: pagination.pageSize,
        after:
          pagination.pageIndex > 0
            ? (pagination.pageIndex * pagination.pageSize).toString()
            : undefined,
        orderBy:
          sorting.map((s) => `${s.id}_${s.desc ? 'DESC' : 'ASC'}`).join(',') || 'amount_DESC',
        where: searchAccount
          ? { id_eq: searchAccount }
          : { vote_gt: '0', vote_isNull: false, OR: { block_gt: '0', block_isNull: false } },
      }
    },
    [],
  )

  const variables = useMemo(
    () => getQueryVariables(sorting, pagination, searchAccount),
    [sorting, pagination, searchAccount, getQueryVariables],
  )

  const { data, error, loading } = useQuery<AccountsConnectionRewardsQuery>(QUERY_REWARDS_LIST, {
    variables: variables,
    pollInterval: 6000,
  })

  useErrorHandler(error)

  const fullDataDownloader = useCallback(
    () => downloadFullData(apolloClient, QUERY_REWARDS_LIST),
    [apolloClient],
  )

  const handleSearch = useCallback(
    (value: string | number) => {
      setSearch(typeof value === 'string' ? value : value.toString())
      setPagination({ ...pagination, pageIndex: 0 })
    },
    [pagination],
  )

  const accountRewardsConnection = useMemo(() => data && data.accountRewardsConnection, [data])
  const accountRewards = useMemo(
    () =>
      accountRewardsConnection &&
      accountRewardsConnection.edges.map((accountRewards) => accountRewards.node),
    [accountRewardsConnection],
  )
  const totalCount = useMemo(
    () => accountRewardsConnection && accountRewardsConnection.totalCount,
    [accountRewardsConnection],
  )
  const pageCount = useMemo(
    () => (totalCount ? Math.floor(totalCount / pagination.pageSize) : 0),
    [totalCount, pagination.pageSize],
  )

  if (loading) return <Spinner />
  if (selectedChain.isDomain) return <NotAllowed />
  if (!data || !accountRewards) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex w-full flex-col sm:mt-0'>
        <div className='flex w-full flex-col gap-4 px-4'>
          <div className='text-base font-medium text-[#282929] dark:text-white'>
            Farmers Leaderboard
          </div>
          <div className='flex gap-2'>
            <DebouncedInput
              type='text'
              className='block w-full max-w-xl rounded-3xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-[#1E254E] dark:text-white'
              placeholder='Search by account address'
              onChange={handleSearch}
              value={searchAccount}
            />
          </div>
        </div>
        <div className='my-6 rounded'>
          <NewTable
            data={accountRewards}
            columns={columns}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={setSorting}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={setPagination}
            fullDataDownloader={fullDataDownloader}
            mobileComponent={<MobileComponent accounts={accountRewards} />}
          />
        </div>
      </div>
    </div>
  )
}

type MobileComponentProps = {
  accounts: AccountsConnectionRewardsQuery['accountRewardsConnection']['edges'][0]['node'][]
}

export const MobileComponent: FC<MobileComponentProps> = ({ accounts }) => (
  <div className='w-full'>
    {accounts.map((account, index) => (
      <VoteBlockRewardListCard
        index={index}
        account={account}
        key={`reward-list-card-${account.id}`}
      />
    ))}
  </div>
)
