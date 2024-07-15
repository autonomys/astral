'use client'

import { useConsensusData } from '@/hooks/useConsensusData'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import type { OperatorByIdQuery, OperatorByIdQueryVariables } from 'gql/oldSquidTypes'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams, useRouter } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useConsensusStates } from 'states/consensus'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useViewStates } from 'states/view'
import { DataSource } from '../common/DataSource'
import { DataSourceBanner } from '../common/DataSourceBanner'
import { OperatorDetailsCard } from './OperatorDetailsCard'
import { OperatorNominatorTable } from './OperatorNominatorTable'
import { QUERY_OPERATOR_BY_ID } from './query'

export const Operator: FC = () => {
  const { ref, inView } = useInView()
  const { operatorId } = useParams<{ operatorId?: string }>()
  const { push } = useRouter()
  const inFocus = useWindowFocus()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { useRpcData } = useViewStates()
  const { operators: rpcOperators } = useConsensusStates()
  const { loadData: loadConsensusData } = useConsensusData()

  const variables = useMemo(() => ({ operatorId: operatorId ?? '' }), [operatorId])
  const { setIsVisible } = useSquidQuery<OperatorByIdQuery, OperatorByIdQueryVariables>(
    QUERY_OPERATOR_BY_ID,
    {
      variables,
      skip: !inFocus,
    },
    Routes.staking,
    'operator',
  )

  const {
    staking: { operator },
  } = useQueryStates()

  const operatorDetails = useMemo(() => {
    if (useRpcData) {
      const operator = rpcOperators.find((operator) => operator.id === operatorId)
      if (!operator) return null
      return {
        ...operator,
        nominators: [],
        totalShares: operator.currentTotalShares,
      }
    }
    return hasValue(operator) && operator.value.operatorById
  }, [operator, operatorId, rpcOperators, useRpcData])

  const noData = useMemo(() => {
    if (isLoading(operator)) return <Spinner isSmall />
    if (!hasValue(operator)) return <NotFound />
    return null
  }, [operator])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  useEffect(() => {
    loadConsensusData()
  }, [loadConsensusData])

  return (
    <div className='flex w-full flex-col space-y-4' ref={ref}>
      <div className='mr-5 flex items-center'>
        <DataSource />
      </div>
      <DataSourceBanner />
      {operatorDetails ? (
        <>
          <OperatorDetailsCard operator={operatorDetails} isDesktop={isDesktop} />
          <div className='mt-5 flex w-full flex-col align-middle'>
            <div className='mb-5 flex justify-between'>
              <button
                className='rounded-full bg-grayDarker p-4 px-4 py-2 text-white dark:bg-purpleAccent'
                onClick={() => push((parseInt(operatorDetails.id) - 1).toString())}
                disabled={parseInt(operatorDetails.id) === 0}
              >
                Prev Operator
              </button>
              <button
                className='rounded-full bg-grayDarker p-4 px-4 py-2  text-white dark:bg-purpleAccent'
                onClick={() => push((parseInt(operatorDetails.id) + 1).toString())}
              >
                Next Operator
              </button>
            </div>
            <div className='mt-5 flex w-full flex-col rounded-[20px] bg-white p-5 dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset sm:mt-0'>
              <OperatorNominatorTable operator={operatorDetails} />
            </div>
          </div>
        </>
      ) : (
        noData
      )}
    </div>
  )
}
