'use client'

/* eslint-disable camelcase */
import { useApolloClient } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { DebouncedInput } from 'components/common/DebouncedInput'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  AccountRewardsOrderByInput,
  AccountsConnectionRewardsQuery,
  AccountsConnectionRewardsQueryVariables,
} from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { sort } from 'utils/sort'
import { shortString } from 'utils/string'
import { AccountIcon } from '../common/AccountIcon'
import { NotFound } from '../layout/NotFound'
import { QUERY_REWARDS_LIST } from './querys'

export const VoteBlockRewardList = () => {
  const { ref, inView } = useInView()
  const [searchAccount, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'operator', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const { selectedChain } = useDomains()
  const apolloClient = useApolloClient()

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')
  const inFocus = useWindowFocus()

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
              <AccountIcon address={row.original.id} size={26} />
              <Link
                data-testid={`account-link-${row.index}`}
                href={INTERNAL_ROUTES.accounts.id.page(
                  selectedChain.urls.page,
                  'consensus',
                  row.original.id,
                )}
                className='hover:text-purpleAccent'
              >
                <div>{isLargeLaptop ? row.original.id : shortString(row.original.id)}</div>
              </Link>
            </div>
          )
        },
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
              ? `${numberWithCommas(bigNumberToNumber(row.original.block))} ${selectedChain.token.symbol}`
              : 0}
          </div>
        ),
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
              ? `${numberWithCommas(bigNumberToNumber(row.original.vote))} ${selectedChain.token.symbol}`
              : 0}
          </div>
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
              ? `${numberWithCommas(bigNumberToNumber(row.original.amount))} ${selectedChain.token.symbol}`
              : 0}
          </div>
        ),
      },
    ]
  }, [selectedChain, pagination, isLargeLaptop])

  const orderBy = useMemo(
    () => sort(sorting, AccountRewardsOrderByInput.AmountDesc) as AccountRewardsOrderByInput,
    [sorting],
  )

  const variables: AccountsConnectionRewardsQueryVariables = useMemo(
    () => ({
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
      orderBy,
      where: searchAccount
        ? { id_eq: searchAccount }
        : {
            OR: [
              { vote_gt: '0', vote_isNull: false },
              { block_gt: '0', block_isNull: false },
            ],
          },
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, searchAccount],
  )

  const { setIsVisible } = useSquidQuery<
    AccountsConnectionRewardsQuery,
    AccountsConnectionRewardsQueryVariables
  >(
    QUERY_REWARDS_LIST,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.leaderboard,
    'farmers',
  )

  const {
    leaderboard: { farmers },
  } = useQueryStates()

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, QUERY_REWARDS_LIST, 'accountRewardsConnection', { orderBy }),
    [apolloClient, orderBy],
  )

  const handleSearch = useCallback(
    (value: string | number) => {
      setSearch(typeof value === 'string' ? value : value.toString())
      setPagination({ ...pagination, pageIndex: 0 })
    },
    [pagination],
  )

  const accountRewardsConnection = useMemo(
    () => hasValue(farmers) && farmers.value.accountRewardsConnection,
    [farmers],
  )
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

  const noData = useMemo(() => {
    if (isLoading(farmers)) return <Spinner isSmall />
    if (!hasValue(farmers)) return <NotFound />
    return null
  }, [farmers])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex w-full flex-col sm:mt-0'>
        <div className='flex w-full flex-col gap-4 px-4'>
          <div className='text-base font-medium text-grayDark dark:text-white'>
            Farmers Leaderboard
          </div>
          <div className='flex gap-2'>
            <DebouncedInput
              type='text'
              className='block w-full max-w-xl rounded-3xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white'
              placeholder='Search by account address'
              onChange={handleSearch}
              value={searchAccount}
            />
          </div>
        </div>
        <div className='my-6 rounded'>
          <div ref={ref}>
            {accountRewards ? (
              <SortedTable
                data={accountRewards}
                columns={columns}
                showNavigation={true}
                sorting={sorting}
                onSortingChange={setSorting}
                pagination={pagination}
                pageCount={pageCount}
                onPaginationChange={setPagination}
                filename='leaderboard-vote-block-reward-list'
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
