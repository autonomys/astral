'use client'

import { useQuery } from '@apollo/client'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import useMediaQuery from 'hooks/useMediaQuery'
import { useParams, useRouter } from 'next/navigation'
import { FC } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { OperatorDetailsCard } from './OperatorDetailsCard'
import { OperatorNominatorTable } from './OperatorNominatorTable'
import { QUERY_OPERATOR_BY_ID } from './query'

export const Operator: FC = () => {
  const { operatorId } = useParams<{ operatorId?: string }>()
  const { push } = useRouter()

  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { data, error, loading } = useQuery(QUERY_OPERATOR_BY_ID, {
    variables: { operatorId: operatorId },
  })

  useErrorHandler(error)

  if (loading) {
    return <Spinner />
  }

  if (!data.operatorById) {
    return <NotFound />
  }

  const operator = data.operatorById
  console.log('operator', operator)

  return (
    <div className='flex w-full flex-col space-y-4'>
      <OperatorDetailsCard operator={operator} isDesktop={isDesktop} />
      <div className='mt-5 flex w-full flex-col align-middle'>
        <div className='mb-5 flex justify-between'>
          <button
            className='rounded-full bg-grayDarker p-4 px-4 py-2 text-grayDark dark:bg-purpleAccent dark:text-white'
            onClick={() => push((parseInt(operator.id) - 1).toString())}
            disabled={parseInt(operator.id) === 0}
          >
            Prev Operator
          </button>
          <button
            className='rounded-full bg-grayDarker p-4 px-4 py-2 text-grayDark dark:bg-purpleAccent dark:text-white'
            onClick={() => push((parseInt(operator.id) + 1).toString())}
          >
            Next Operator
          </button>
        </div>
        <div className='mt-5 flex w-full flex-col rounded-[20px] bg-white p-5 dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset sm:mt-0'>
          <OperatorNominatorTable operator={operator} />
        </div>
      </div>
    </div>
  )
}
