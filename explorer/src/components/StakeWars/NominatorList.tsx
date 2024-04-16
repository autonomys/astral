/* eslint-disable camelcase */

import { GET_ALL_NOMINATORS } from '@/components/StakeWars/rewardsQuery'
import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { useApolloClient, useQuery } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { NewTable } from 'components/common/NewTable'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { STAKE_WARS_PAGE_SIZE, STAKE_WARS_PHASES } from 'constants/'
import { GetAllNominatorsQuery } from 'gql/rewardTypes'
import { FC, useCallback, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { NotStarted } from '../layout/NotStarted'
import { NominatorListCard } from './NominatorListCard'
import { getNominatorRewards } from './helpers/calculateNominatorReward'

type Props = {
  currentBlock: number
}

export const NominatorList: FC<Props> = ({ currentBlock }) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'shares', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: STAKE_WARS_PAGE_SIZE,
    pageIndex: 0,
  })
  const apolloClient = useApolloClient()

  const columns = useMemo(() => {
    const cols = [
      {
        accessorKey: 'id',
        header: 'Id',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<GetAllNominatorsQuery['nominatorsConnection']['edges'][0]['node']>) => (
          <div>{row.original.account.id}</div>
        ),
      },
      {
        accessorKey: 'account',
        header: 'Account',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<GetAllNominatorsQuery['nominatorsConnection']['edges'][0]['node']>) => (
          <div className='row flex items-center gap-3'>
            <div>{shortString(row.original.account.id)}</div>
          </div>
        ),
      },
      {
        accessorKey: 'shares',
        header: 'Shares',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<GetAllNominatorsQuery['nominatorsConnection']['edges'][0]['node']>) => (
          <div>{numberWithCommas(row.original.shares)}</div>
        ),
      },
      {
        accessorKey: 'nominatorReward',
        header: 'Rewards',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<
          GetAllNominatorsQuery['nominatorsConnection']['edges'][0]['node'] & {
            nominatorReward: bigint
          }
        >) => <div>{bigNumberToNumber(row.original.nominatorReward.toString())}</div>,
      },
    ]
    return cols
  }, [])

  const variables = useMemo(
    () => ({
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
      orderBy: sorting.map((s) => `${s.id}_${s.desc ? 'DESC' : 'ASC'}`).join(',') || 'id_ASC',
      blockNumber_gte: STAKE_WARS_PHASES.phase3.start,
      blockNumber_lte: STAKE_WARS_PHASES.phase3.end,
    }),
    [sorting, pagination],
  )

  const { data, error, loading } = useQuery<GetAllNominatorsQuery>(GET_ALL_NOMINATORS, {
    variables: variables,
    pollInterval: 6000,
    context: { clientName: 'rewards' },
  })

  useErrorHandler(error)

  const fullDataDownloader = useCallback(
    () => downloadFullData(apolloClient, GET_ALL_NOMINATORS),
    [apolloClient],
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

  const totalCount = useMemo(() => (nominators ? nominators.totalCount : 0), [nominators])
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  const nominatorsWithRewards = useMemo(
    () => getNominatorRewards(nominatorsConnection, operatorsConnection),
    [nominatorsConnection, operatorsConnection],
  )

  if (loading)
    return (
      <div className='flex w-full items-center justify-center'>
        <Spinner />
      </div>
    )
  if (currentBlock < STAKE_WARS_PHASES.phase2.start) return <NotStarted />
  if (!nominatorsWithRewards) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex flex-col gap-2'>
        <div className='mt-5 flex w-full justify-between'>
          <div className='text-base font-medium text-[#282929] dark:text-white'>{`Nominators (${totalLabel})`}</div>
        </div>
      </div>

      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <div className='my-6 rounded'>
          {nominatorsWithRewards && (
            <NewTable
              data={nominatorsWithRewards}
              columns={columns}
              showNavigation={false}
              sorting={sorting}
              onSortingChange={setSorting}
              pagination={pagination}
              pageCount={pageCount}
              onPaginationChange={setPagination}
              fullDataDownloader={fullDataDownloader}
              mobileComponent={<MobileComponent nominators={nominatorsConnection} />}
            />
          )}
        </div>
      </div>
    </div>
  )
}

type MobileComponentProps = {
  nominators: GetAllNominatorsQuery['nominatorsConnection']['edges'][0]['node'][] | undefined
}

const MobileComponent: FC<MobileComponentProps> = ({ nominators }) => (
  <div className='w-full'>
    {nominators?.map((nominator, index) => {
      return (
        <NominatorListCard
          key={`nominator-list-card-${nominator.id}`}
          nominator={nominator}
          index={index}
        />
      )
    })}
  </div>
)
