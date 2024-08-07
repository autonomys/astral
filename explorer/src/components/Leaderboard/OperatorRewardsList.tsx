'use client'

/* eslint-disable camelcase */
import { useApolloClient } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { DebouncedInput } from 'components/common/DebouncedInput'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE, TOKEN } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  OperatorRewardsOrderByInput,
  type OperatorsConnectionRewardsQuery,
  type OperatorsConnectionRewardsQueryVariables,
} from 'gql/graphql'
import useChains from 'hooks/useChains'
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
import { countTablePages } from 'utils/table'
import { NotFound } from '../layout/NotFound'
import { QUERY_OPERATORS_REWARDS_LIST } from './querys'

export const OperatorRewardsList = () => {
  const { ref, inView } = useInView()
  const [searchOperator, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'amount', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const { network } = useChains()
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
          OperatorsConnectionRewardsQuery['operatorRewardsConnection']['edges'][0]['node']
        >) => {
          const newCount = pagination.pageIndex * pagination.pageSize + row.index
          return <div>{pagination.pageIndex + 1 > 1 ? newCount + 1 : row.index + 1}</div>
        },
      },

      {
        accessorKey: 'id',
        header: 'Operator',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<
          OperatorsConnectionRewardsQuery['operatorRewardsConnection']['edges'][0]['node']
        >) => {
          return (
            <div className='row flex items-center gap-3'>
              <Link
                data-testid={`account-link-${row.index}`}
                href={INTERNAL_ROUTES.operators.id.page(network, 'consensus', row.original.id)}
                className='hover:text-purpleAccent'
              >
                <div>{isLargeLaptop ? row.original.id : shortString(row.original.id)}</div>
              </Link>
            </div>
          )
        },
      },
      {
        accessorKey: 'amount',
        header: 'Operator rewards',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<
          OperatorsConnectionRewardsQuery['operatorRewardsConnection']['edges'][0]['node']
        >) => (
          <div>
            {row.original.amount
              ? `${numberWithCommas(bigNumberToNumber(row.original.amount))} ${TOKEN.symbol}`
              : 0}
          </div>
        ),
      },
    ]
  }, [pagination.pageIndex, pagination.pageSize, network, isLargeLaptop])

  const orderBy = useMemo(
    () => sort(sorting, OperatorRewardsOrderByInput.AmountDesc) as OperatorRewardsOrderByInput,
    [sorting],
  )

  const variables = useMemo(
    () => ({
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
      orderBy,
      where: searchOperator ? { id_eq: searchOperator } : {},
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, searchOperator],
  )

  const { setIsVisible } = useSquidQuery<
    OperatorsConnectionRewardsQuery,
    OperatorsConnectionRewardsQueryVariables
  >(
    QUERY_OPERATORS_REWARDS_LIST,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.leaderboard,
    'operators',
  )

  const {
    leaderboard: { operators },
  } = useQueryStates()

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, QUERY_OPERATORS_REWARDS_LIST, 'operatorRewardsConnection', {
        orderBy,
      }),
    [apolloClient, orderBy],
  )

  const handleSearch = useCallback(
    (value: string | number) => {
      setSearch(typeof value === 'string' ? value : value.toString())
      setPagination({ ...pagination, pageIndex: 0 })
    },
    [pagination],
  )

  const operatorRewardsConnection = useMemo(
    () => hasValue(operators) && operators.value.operatorRewardsConnection,
    [operators],
  )
  const totalCount = useMemo(
    () => operatorRewardsConnection && operatorRewardsConnection.totalCount,
    [operatorRewardsConnection],
  )
  const pageCount = useMemo(
    () => (totalCount ? countTablePages(totalCount, pagination.pageSize) : 0),
    [totalCount, pagination],
  )
  const operatorRewards = useMemo(
    () =>
      operatorRewardsConnection &&
      operatorRewardsConnection.edges.map((operatorRewards) => operatorRewards.node),
    [operatorRewardsConnection],
  )

  const noData = useMemo(() => {
    if (isLoading(operators)) return <Spinner isSmall />
    if (!hasValue(operators)) return <NotFound />
    return null
  }, [operators])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex w-full flex-col sm:mt-0'>
        <div className='flex w-full flex-col gap-4 px-4'>
          <div className='text-base font-medium text-grayDark dark:text-white'>
            Operators Leaderboard
          </div>
          <div className='flex gap-2'>
            <DebouncedInput
              type='text'
              className='block w-full max-w-xl rounded-3xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white'
              placeholder='Search by operator id'
              onChange={handleSearch}
              value={searchOperator}
            />
          </div>
        </div>
        <div className='my-6 rounded'>
          <div ref={ref}>
            {operatorRewards ? (
              <SortedTable
                data={operatorRewards}
                columns={columns}
                showNavigation={true}
                sorting={sorting}
                onSortingChange={setSorting}
                pagination={pagination}
                pageCount={pageCount}
                onPaginationChange={setPagination}
                filename='leaderboard-operator-rewards-list'
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

export default OperatorRewardsList
