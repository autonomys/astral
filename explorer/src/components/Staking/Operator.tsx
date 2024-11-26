'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import type { OperatorByIdQuery, OperatorByIdQueryVariables } from 'gql/graphql'
import { useConsensusData } from 'hooks/useConsensusData'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useMediaQuery from 'hooks/useMediaQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams, useRouter } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { OperatorDetailsCard } from './OperatorDetailsCard'
import { OperatorNominatorTable } from './OperatorNominatorTable'
import { QUERY_OPERATOR_BY_ID } from './query'

export const Operator: FC = () => {
  const { ref, inView } = useInView()
  const { operatorId } = useParams<{ operatorId?: string }>()
  const { push } = useRouter()
  const inFocus = useWindowFocus()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { loadDataByOperatorId } = useConsensusData()

  const variables = useMemo(() => ({ operatorId: operatorId ?? '' }), [operatorId])
  const { data, loading } = useIndexersQuery<OperatorByIdQuery, OperatorByIdQueryVariables>(
    QUERY_OPERATOR_BY_ID,
    {
      variables,
    },
    inView,
    inFocus,
  )

  const operatorDetails = useMemo(() => data && data.staking_operators_by_pk, [data])

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  useEffect(() => {
    if (operatorId) loadDataByOperatorId(operatorId)
  }, [operatorId, loadDataByOperatorId])

  return (
    <div className='flex w-full flex-col space-y-4' ref={ref}>
      {!loading && operatorDetails ? (
        <>
          <OperatorDetailsCard operator={operatorDetails} isDesktop={isDesktop} />
          <div className='mt-5 flex w-full flex-col align-middle'>
            <div className='mb-5 flex justify-between'>
              <button
                className='rounded-full bg-grayDarker p-4 px-4 py-2 text-white dark:bg-primaryAccent'
                onClick={() => push((parseInt(operatorDetails.id) - 1).toString())}
                disabled={parseInt(operatorDetails.id) === 0}
              >
                Prev Operator
              </button>
              <button
                className='rounded-full bg-grayDarker p-4 px-4 py-2  text-white dark:bg-primaryAccent'
                onClick={() => push((parseInt(operatorDetails.id) + 1).toString())}
              >
                Next Operator
              </button>
            </div>
            <div className='mt-5 flex w-full flex-col rounded-[20px] bg-white p-5 dark:bg-gradient-to-r dark:from-gradientFrom dark:via-gradientVia dark:to-gradientTo sm:mt-0'>
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
