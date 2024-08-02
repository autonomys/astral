/* eslint-disable camelcase */

import { countTablePages } from '@/utils/table'
import { useApolloClient } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { GET_ALL_OPERATORS } from 'components/StakeWars/rewardsQuery'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { STAKE_WARS_PAGE_SIZE, STAKE_WARS_PHASES, TOKEN } from 'constants/general'
import { INTERNAL_ROUTES } from 'constants/routes'
import { OperatorOrderByInput } from 'gql/graphql'
import { GetAllOperatorsQuery, GetAllOperatorsQueryVariables } from 'gql/rewardTypes'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { sort } from 'utils/sort'
import { capitalizeFirstLetter, shortString } from 'utils/string'
import { NotStarted } from '../layout/NotStarted'

type Props = {
  currentBlock: number
}

export const OperatorsList: FC<Props> = ({ currentBlock }) => {
  const { ref, inView } = useInView()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'orderingId', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: STAKE_WARS_PAGE_SIZE,
    pageIndex: 0,
  })
  const apolloClient = useApolloClient()

  const { network, section } = useChains()
  const inFocus = useWindowFocus()

  const columns = useMemo(() => {
    const cols = [
      {
        accessorKey: 'id',
        header: 'Id',
        enableSorting: true,
        cell: ({ row }: Cell<GetAllOperatorsQuery['operatorsConnection']['edges'][0]['node']>) => (
          <Link
            data-testid={`operator-link-${row.original.id}-${row.original.signingKey}-${row.index}}`}
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.operators.id.page(network, section, row.original.id)}
          >
            <div>{row.original.id}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'currentDomainId',
        header: 'Domain',
        enableSorting: true,
        cell: ({ row }: Cell<GetAllOperatorsQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{row.original.currentDomainId === 0 ? 'Subspace' : 'Nova'}</div>
        ),
      },
      {
        accessorKey: 'signingKey',
        header: 'Signing Key',
        enableSorting: true,
        cell: ({ row }: Cell<GetAllOperatorsQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div className='row flex items-center gap-3'>
            <div>{shortString(row.original.signingKey)}</div>
          </div>
        ),
      },
      {
        accessorKey: 'minimumNominatorStake',
        header: 'Min. Stake',
        enableSorting: true,
        cell: ({ row }: Cell<GetAllOperatorsQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{`${bigNumberToNumber(row.original.minimumNominatorStake)} ${TOKEN.symbol}`}</div>
        ),
      },
      {
        accessorKey: 'currentTotalStake',
        header: 'Total Stake',
        enableSorting: true,
        cell: ({ row }: Cell<GetAllOperatorsQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{`${bigNumberToNumber(row.original.currentTotalStake)} ${TOKEN.symbol}`}</div>
        ),
      },
      {
        accessorKey: 'rewards',
        header: 'Total Rewards',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<
          GetAllOperatorsQuery['operatorsConnection']['edges'][0]['node'] & { rewards: bigint }
        >) => (
          <div>{`${row.original.rewards ? bigNumberToNumber(row.original.rewards.toString()) : 0} ${TOKEN.symbol}`}</div>
        ),
      },
    ]
    return cols
  }, [network, section])

  const orderBy = useMemo(
    () => sort(sorting, OperatorOrderByInput.IdAsc) as OperatorOrderByInput,
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
      blockNumber_gte: STAKE_WARS_PHASES.phase2.start,
      blockNumber_lte: STAKE_WARS_PHASES.phase2.end,
    }),
    [orderBy, pagination.pageIndex, pagination.pageSize],
  )

  const { data, loading, setIsVisible } = useSquidQuery<
    GetAllOperatorsQuery,
    GetAllOperatorsQueryVariables
  >(GET_ALL_OPERATORS, {
    variables,
    skip: !inFocus,
    pollInterval: 6000,
    context: { clientName: 'rewards' },
  })

  const fullDataDownloader = useCallback(
    () => downloadFullData(apolloClient, GET_ALL_OPERATORS, 'operatorsConnection', { orderBy }),
    [apolloClient, orderBy],
  )

  const operators = useMemo(() => data && data.operatorsConnection, [data])
  const operatorsConnection = useMemo(
    () =>
      operators &&
      operators.edges
        .map((operator) => ({
          ...operator.node,
          rewards: operator.node.operatorRewards.reduce((acc: bigint, reward) => {
            return acc + BigInt(reward.amount)
          }, BigInt(0)),
          status: operator.node.status
            ? capitalizeFirstLetter(JSON.parse(operator.node.status).__kind)
            : 'Unknown',
        }))
        .sort((a, b) => {
          if (b.rewards > a.rewards) {
            return 1
          } else if (b.rewards < a.rewards) {
            return -1
          } else {
            return 0
          }
        }),
    [operators],
  )

  const totalCount = useMemo(() => (operators ? operators.totalCount : 0), [operators])
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

  if (currentBlock < STAKE_WARS_PHASES.phase2.start) return <NotStarted />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex flex-col gap-2'>
        <div className='mt-5 flex w-full justify-between'>
          <div className='text-base font-medium text-grayDark dark:text-white'>{`Operators (${totalLabel})`}</div>
        </div>
      </div>

      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <div className='my-6 rounded' ref={ref}>
          {operatorsConnection ? (
            <SortedTable
              data={operatorsConnection}
              columns={columns}
              showNavigation={true}
              sorting={sorting}
              onSortingChange={setSorting}
              pagination={pagination}
              pageCount={pageCount}
              onPaginationChange={setPagination}
              filename='stake-wars-operators-list'
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
