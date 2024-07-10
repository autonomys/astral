/* eslint-disable camelcase */

import { GET_ALL_NOMINATORS, GET_ALL_OPERATORS } from '@/components/StakeWars/rewardsQuery'
import { bigNumberToNumber } from '@/utils/number'
import { capitalizeFirstLetter, shortString } from '@/utils/string'
import { useQuery } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { STAKE_WARS_PAGE_SIZE, STAKE_WARS_PHASES } from 'constants/'
import { GetAllNominatorsQuery } from 'gql/rewardTypes'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Image from 'next/image'
import { FC, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { NotStarted } from '../layout/NotStarted'
import { getNominatorRewards, getOperatorRewards } from './helpers/calculateNominatorReward'

type Props = {
  currentBlock: number
}

export const EndGame: FC<Props> = ({ currentBlock }) => {
  const [sorting] = useState<SortingState>([{ id: 'shares', desc: true }])
  const [operatorSorting] = useState<SortingState>([{ id: 'orderingId', desc: true }])
  const [pagination] = useState({
    pageSize: STAKE_WARS_PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()

  const nominatorVariables = useMemo(
    () => ({
      first: pagination.pageSize,
      after: undefined,
      orderBy: sorting.map((s) => `${s.id}_${s.desc ? 'DESC' : 'ASC'}`).join(',') || 'id_ASC',
      where: {},
      blockNumber_gte: STAKE_WARS_PHASES.phase3.start,
      blockNumber_lte: STAKE_WARS_PHASES.phase3.end,
    }),
    [sorting, pagination],
  )

  const operatorVariables = useMemo(
    () => ({
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
      orderBy:
        operatorSorting.map((s) => `${s.id}_${s.desc ? 'DESC' : 'ASC'}`).join(',') || 'id_ASC',
      blockNumber_gte: STAKE_WARS_PHASES.phase2.start,
      blockNumber_lte: STAKE_WARS_PHASES.phase2.end,
    }),
    [operatorSorting, pagination],
  )

  const {
    data: nominatorData,
    error: nominatorError,
    loading: nominatorLoading,
  } = useQuery<GetAllNominatorsQuery>(GET_ALL_NOMINATORS, {
    variables: nominatorVariables,
    skip: !inFocus,
    pollInterval: 6000,
    context: { clientName: 'rewards' },
  })

  const { data, error, loading } = useQuery<GetAllNominatorsQuery>(GET_ALL_OPERATORS, {
    variables: operatorVariables,
    skip: !inFocus,
    pollInterval: 6000,
    context: { clientName: 'rewards' },
  })

  useErrorHandler(error || nominatorError)

  const nominators = useMemo(
    () => nominatorData && nominatorData.nominatorsConnection,
    [nominatorData],
  )
  const nominatorsConnection = useMemo(
    () => nominators && nominators.edges.map((nominator) => nominator.node),
    [nominators],
  )

  const operators = useMemo(() => data && data.operatorsConnection, [data])
  const operatorsConnection = useMemo(
    () =>
      operators &&
      operators.edges.map((operator) => {
        const operatorRewards = getOperatorRewards(operator.node)

        return {
          ...operator.node,
          rewards: operatorRewards,
          status: operator.node.status
            ? capitalizeFirstLetter(JSON.parse(operator.node.status).__kind)
            : 'Unknown',
        }
      }),
    [operators],
  )

  const highestOperatorWithRewards = useMemo(() => {
    return (
      operatorsConnection &&
      operatorsConnection.sort((a, b) => {
        if (b.rewards > a.rewards) {
          return 1
        } else if (b.rewards < a.rewards) {
          return -1
        } else {
          return 0
        }
      })[0]
    )
  }, [operatorsConnection])

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

  const nominatorHighest = useMemo(() => nominatorsWithRewards[0], [nominatorsWithRewards])
  if (loading || nominatorLoading)
    return (
      <div className='flex w-full items-center justify-center'>
        <Spinner />
      </div>
    )

  if (currentBlock < STAKE_WARS_PHASES.endgame.start) return <NotStarted />

  if (!nominatorHighest || !highestOperatorWithRewards) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <div className='my-6 flex flex-col rounded'>
          <div className='flex w-full items-center justify-center gap-4'>
            {/* Operator */}
            <div>
              <div className='flex flex-col items-center rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:max-w-xl md:flex-row'>
                <Image
                  width={300}
                  height={300}
                  src='/images/winnerOperator.svg'
                  alt='Picture of operator'
                />
                <div className='flex flex-col justify-between p-4 leading-normal'>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    Operator with highest rewards
                  </h5>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                    Id: {highestOperatorWithRewards.id}
                  </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                    Signing Key: {shortString(highestOperatorWithRewards.signingKey)}
                  </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                    Domain: {highestOperatorWithRewards.currentDomainId === 0 ? 'Subspace' : 'Nova'}
                  </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                    Status: {highestOperatorWithRewards.status}
                  </p>
                  <p className='mb-3 font-bold text-gray-700 dark:text-gray-400'>
                    Total rewards:{' '}
                    {bigNumberToNumber(highestOperatorWithRewards.rewards.toString())}{' '}
                    <span className='text-gray-700 dark:text-gray-400'>TSSC</span>
                  </p>
                </div>
              </div>
            </div>
            {/* Nominator */}
            <div>
              <div className='flex flex-col items-center rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:max-w-xl md:flex-row'>
                <Image
                  width={300}
                  height={300}
                  src='/images/winnerNominator.svg'
                  alt='Picture of nominator'
                />
                <div className='flex flex-col justify-between p-4 leading-normal'>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    Nominator with highest rewards
                  </h5>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                    Id: {shortString(nominatorHighest.account.id)}
                  </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                    OperatorId: {nominatorHighest.operator.id}
                  </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                    Status: {nominatorHighest.status}
                  </p>
                  <p className='mb-3 font-bold text-gray-700 dark:text-gray-400'>
                    Total rewards: {bigNumberToNumber(nominatorHighest.nominatorReward.toString())}{' '}
                    <span className='text-gray-700  dark:text-gray-400'>TSSC</span>
                  </p>
                  <p className='mb-3 font-bold text-gray-700 dark:text-gray-400'>
                    Operator rewards:{' '}
                    {bigNumberToNumber(nominatorHighest.operatorReward.toString())}{' '}
                    <span className='text-gray-700  dark:text-gray-400'>TSSC</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
