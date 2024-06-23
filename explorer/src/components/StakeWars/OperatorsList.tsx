/* eslint-disable camelcase */

import { GET_ALL_OPERATORS } from '@/components/StakeWars/rewardsQuery'
import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { useApolloClient, useQuery } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { NewTable } from 'components/common/NewTable'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { STAKE_WARS_PAGE_SIZE, STAKE_WARS_PHASES } from 'constants/general'
import { INTERNAL_ROUTES } from 'constants/routes'
import { GetAllOperatorsQuery } from 'gql/rewardTypes'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useCallback, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { sort } from 'utils/sort'
import { capitalizeFirstLetter } from 'utils/string'
import { NotStarted } from '../layout/NotStarted'

type Props = {
  currentBlock: number
}

export const OperatorsList: FC<Props> = ({ currentBlock }) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'orderingId', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: STAKE_WARS_PAGE_SIZE,
    pageIndex: 0,
  })
  const apolloClient = useApolloClient()

  const { selectedChain, selectedDomain } = useDomains()

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
            href={INTERNAL_ROUTES.operators.id.page(
              selectedChain.urls.page,
              selectedDomain,
              row.original.id,
            )}
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
          <div>{`${bigNumberToNumber(row.original.minimumNominatorStake)} tSSC`}</div>
        ),
      },
      {
        accessorKey: 'currentTotalStake',
        header: 'Total Stake',
        enableSorting: true,
        cell: ({ row }: Cell<GetAllOperatorsQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{`${bigNumberToNumber(row.original.currentTotalStake)} tSSC`}</div>
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
          <div>{`${row.original.rewards ? bigNumberToNumber(row.original.rewards.toString()) : 0} tSSC`}</div>
        ),
      },
    ]
    return cols
  }, [selectedChain.urls.page, selectedDomain])

  const orderBy = useMemo(() => sort(sorting, 'id_ASC'), [sorting])

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

  const { data, error, loading } = useQuery<GetAllOperatorsQuery>(GET_ALL_OPERATORS, {
    variables: variables,
    pollInterval: 6000,
    context: { clientName: 'rewards' },
  })

  useErrorHandler(error)

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
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  if (loading) return <Spinner />
  if (currentBlock < STAKE_WARS_PHASES.phase2.start) return <NotStarted />
  if (!operatorsConnection) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex flex-col gap-2'>
        <div className='mt-5 flex w-full justify-between'>
          <div className='text-grayDark text-base font-medium dark:text-white'>{`Operators (${totalLabel})`}</div>
        </div>
      </div>

      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <div className='my-6 rounded'>
          <NewTable
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
        </div>
      </div>
    </div>
  )
}
