/* eslint-disable camelcase */
'use client'

import { GET_ALL_NOMINATORS } from '@/components/StakeWars/rewardsQuery'
import { bigNumberToNumber } from '@/utils/number'
import { capitalizeFirstLetter, shortString } from '@/utils/string'
import { useQuery } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { STAKE_WARS_PAGE_SIZE, STAKE_WARS_PHASES } from 'constants/'
import { GetAllNominatorsQuery } from 'gql/rewardTypes'
import Image from 'next/image'
import { FC, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { NotStarted } from '../layout/NotStarted'
import { getNominatorRewards } from './helpers/calculateNominatorReward'

type Props = {
  currentBlock: number
}

export const EndGame: FC<Props> = ({ currentBlock }) => {
  const [sorting] = useState<SortingState>([{ id: 'shares', desc: true }])
  const [pagination] = useState({
    pageSize: STAKE_WARS_PAGE_SIZE,
    pageIndex: 0,
  })

  const variables = useMemo(
    () => ({
      first: pagination.pageSize,
      after: undefined,
      orderBy: sorting.map((s) => `${s.id}_${s.desc ? 'DESC' : 'ASC'}`).join(',') || 'id_ASC',
      where: {},
      blockNumber_gte: STAKE_WARS_PHASES.phase2.start,
      blockNumber_lte: STAKE_WARS_PHASES.phase2.end,
    }),
    [sorting, pagination],
  )

  const { data, error, loading } = useQuery<GetAllNominatorsQuery>(GET_ALL_NOMINATORS, {
    variables: variables,
    pollInterval: 6000,
    context: { clientName: 'rewards' },
  })

  useErrorHandler(error)

  const nominators = useMemo(() => data && data.nominatorsConnection, [data])
  const nominatorsConnection = useMemo(
    () => nominators && nominators.edges.map((operator) => operator.node),
    [nominators],
  )

  const operators = useMemo(() => data && data.operatorsConnection, [data])
  const operatorsConnection = useMemo(
    () =>
      operators &&
      operators.edges.map((operator) => ({
        ...operator.node,
        rewards: operator.node.operatorRewards.reduce((acc: bigint, reward) => {
          return acc + BigInt(reward.amount)
        }, BigInt(0)),
        status: operator.node.status
          ? capitalizeFirstLetter(JSON.parse(operator.node.status).__kind)
          : 'Unknown',
      })),
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

  const nominatorHighest = useMemo(() => {
    const nominators = getNominatorRewards(nominatorsConnection, operatorsConnection)
    return nominators[0]
  }, [nominatorsConnection, operatorsConnection])

  if (loading)
    return (
      <div className='flex w-full items-center justify-center'>
        <Spinner />
      </div>
    )
  if (!nominatorHighest || !highestOperatorWithRewards) return <NotFound />

  if (currentBlock < STAKE_WARS_PHASES.endgame.start) return <NotStarted />

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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
