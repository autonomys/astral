/* eslint-disable camelcase */

import { useApolloClient } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { GET_ALL_NOMINATORS } from 'components/StakeWars/rewardsQuery'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { STAKE_WARS_PAGE_SIZE, STAKE_WARS_PHASES } from 'constants/general'
import {
  GetAllNominatorsQuery,
  GetAllNominatorsQueryVariables,
  NominatorOrderByInput,
} from 'gql/graphql'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { sort } from 'utils/sort'
import { shortString } from 'utils/string'
import { countTablePages } from 'utils/table'
import { NotStarted } from '../layout/NotStarted'
import { NominatorWithRewards, getNominatorRewards } from './helpers/calculateNominatorReward'

type Props = {
  currentBlock: number
}

export const NominatorList: FC<Props> = ({ currentBlock }) => {
  const { ref, inView } = useInView()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'shares', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: STAKE_WARS_PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()
  const apolloClient = useApolloClient()

  const columns = useMemo(() => {
    const cols = [
      {
        header: 'Rank',
        enableSorting: false,
        cell: ({ row }: Cell<NominatorWithRewards>) => <div>{row.index + 1}</div>,
      },
      {
        accessorKey: 'account',
        header: 'Account',
        enableSorting: true,
        cell: ({ row }: Cell<NominatorWithRewards>) => (
          <div className='row flex items-center gap-3'>
            <div>{shortString(row.original.account.id)}</div>
          </div>
        ),
      },
      {
        accessorKey: 'shares',
        header: 'Shares',
        enableSorting: true,
        cell: ({ row }: Cell<NominatorWithRewards>) => (
          <div>{numberWithCommas(row.original.shares)}</div>
        ),
      },
      {
        accessorKey: 'nominatorReward',
        header: 'Rewards',
        enableSorting: true,
        cell: ({ row }: Cell<NominatorWithRewards>) => (
          <div>{bigNumberToNumber(row.original.nominatorReward.toString())}</div>
        ),
      },
      {
        accessorKey: 'operatorReward',
        header: 'Operators Rewards',
        enableSorting: true,
        cell: ({ row }: Cell<NominatorWithRewards>) => (
          <div>{bigNumberToNumber(row.original.operatorReward.toString())}</div>
        ),
      },
      {
        accessorKey: 'operators',
        header: 'Operators',
        enableSorting: true,
        cell: ({ row }: Cell<NominatorWithRewards>) => (
          <div>{row.original.operators.join(', ')}</div>
        ),
      },
    ]
    return cols
  }, [])

  const orderBy = useMemo(
    () => sort(sorting, NominatorOrderByInput.IdAsc) as NominatorOrderByInput,
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
      blockNumber_gte: STAKE_WARS_PHASES.phase3.start,
      blockNumber_lte: STAKE_WARS_PHASES.phase3.end,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy],
  )

  const { data, loading, setIsVisible } = useSquidQuery<
    GetAllNominatorsQuery,
    GetAllNominatorsQueryVariables
  >(GET_ALL_NOMINATORS, {
    variables,
    skip: !inFocus,
    pollInterval: 6000,
    context: { clientName: 'rewards' },
  })

  const fullDataDownloader = useCallback(
    () => downloadFullData(apolloClient, GET_ALL_NOMINATORS, 'operatorsConnection', { orderBy }),
    [apolloClient, orderBy],
  )

  const nominators = useMemo(() => data && data.nominatorsConnection, [data])
  const nominatorsConnection = useMemo(
    () => nominators && nominators.edges.map((operator) => operator.node),
    [nominators],
  )

  const operators = useMemo(() => data && data.operatorsConnection, [data])
  const operatorsConnection = useMemo(
    () => operators && operators.edges.map((operator) => operator.node),
    [operators],
  )

  const nominatorsWithRewards = useMemo(
    () =>
      getNominatorRewards(nominatorsConnection, operatorsConnection).sort((a, b) => {
        // Compare nominatorRewards first
        if (a.nominatorReward > b.nominatorReward) {
          return -1
        } else if (a.nominatorReward < b.nominatorReward) {
          return 1
        } else {
          // If nominatorRewards are equal, compare operatorRewards
          if (a.operatorReward > b.operatorReward) {
            return -1
          } else if (a.operatorReward < b.operatorReward) {
            return 1
          } else {
            return 0
          }
        }
      }),
    [nominatorsConnection, operatorsConnection],
  )

  const totalCount = useMemo(
    () => (nominatorsWithRewards ? nominatorsWithRewards.length : 0),
    [nominatorsWithRewards],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  if (currentBlock < STAKE_WARS_PHASES.phase3.start) return <NotStarted />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex flex-col gap-2'>
        <div className='mt-5 flex w-full justify-between'>
          <div className='text-base font-medium text-grayDark dark:text-white'>{`Nominators (${totalLabel})`}</div>
        </div>
      </div>

      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <div className='my-6 rounded' ref={ref}>
          {nominatorsWithRewards ? (
            <SortedTable
              data={nominatorsWithRewards}
              columns={columns}
              showNavigation={true}
              sorting={sorting}
              onSortingChange={setSorting}
              pagination={pagination}
              pageCount={pageCount}
              onPaginationChange={setPagination}
              filename='stake-wars-nominator-list'
              fullDataDownloader={fullDataDownloader}
            />
          ) : (
            noData
          )}
        </div>
      </div>
    </div>
  )
}
