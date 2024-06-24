'use client'

/* eslint-disable camelcase */
import { PAGE_SIZE } from '@/constants/general'
import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { useApolloClient, useQuery } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { DebouncedInput } from 'components/common/DebouncedInput'
import { NewTable } from 'components/common/NewTable'
import { NotAllowed } from 'components/common/NotAllowed'
import { Spinner } from 'components/common/Spinner'
import { INTERNAL_ROUTES } from 'constants/routes'
import type { OperatorsConnectionRewardsQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { sort } from 'utils/sort'
import { NotFound } from '../layout/NotFound'
import { QUERY_OPERATORS_REWARDS_LIST } from './querys'

export const OperatorRewardsList = () => {
  const [searchOperator, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'amount', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const { selectedChain } = useDomains()
  const apolloClient = useApolloClient()

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

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
                href={INTERNAL_ROUTES.operators.id.page(
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
              ? `${numberWithCommas(bigNumberToNumber(row.original.amount))} ${selectedChain.token.symbol}`
              : 0}
          </div>
        ),
      },
    ]
  }, [selectedChain, pagination, isLargeLaptop])

  const orderBy = useMemo(() => sort(sorting, 'amount_DESC'), [sorting])

  const getQueryVariables = useCallback(
    (
      sorting: SortingState,
      pagination: {
        pageSize: number
        pageIndex: number
      },
      searchOperator: string,
    ) => {
      return {
        first: pagination.pageSize,
        after:
          pagination.pageIndex > 0
            ? (pagination.pageIndex * pagination.pageSize).toString()
            : undefined,
        orderBy,
        where: searchOperator ? { id_eq: searchOperator } : {},
      }
    },
    [orderBy],
  )

  const variables = useMemo(
    () => getQueryVariables(sorting, pagination, searchOperator),
    [sorting, pagination, searchOperator, getQueryVariables],
  )

  const { data, error, loading } = useQuery<OperatorsConnectionRewardsQuery>(
    QUERY_OPERATORS_REWARDS_LIST,
    {
      variables,
      pollInterval: 6000,
    },
  )

  useErrorHandler(error)

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

  const operatorRewardsConnection = useMemo(() => data && data.operatorRewardsConnection, [data])
  const totalCount = useMemo(
    () => operatorRewardsConnection && operatorRewardsConnection.totalCount,
    [operatorRewardsConnection],
  )
  const pageCount = useMemo(
    () => (totalCount ? Math.floor(totalCount / pagination.pageSize) : 0),
    [totalCount, pagination],
  )
  const operatorRewards = useMemo(
    () =>
      operatorRewardsConnection &&
      operatorRewardsConnection.edges.map((operatorRewards) => operatorRewards.node),
    [operatorRewardsConnection],
  )

  if (loading) return <Spinner />
  if (selectedChain.isDomain) return <NotAllowed />
  if (!data || !operatorRewards) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex w-full flex-col sm:mt-0'>
        <div className='flex w-full flex-col gap-4 px-4'>
          <div className='text-grayDark text-base font-medium dark:text-white'>
            Operators Leaderboard
          </div>
          <div className='flex gap-2'>
            <DebouncedInput
              type='text'
              className='dark:bg-blueAccent block w-full max-w-xl rounded-3xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:text-white'
              placeholder='Search by operator id'
              onChange={handleSearch}
              value={searchOperator}
            />
          </div>
        </div>
        <div className='my-6 rounded'>
          <NewTable
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
        </div>
      </div>
    </div>
  )
}

export default OperatorRewardsList
