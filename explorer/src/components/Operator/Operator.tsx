'use client'

import { useQuery } from '@apollo/client'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import useMediaQuery from 'hooks/useMediaQuery'
import { useParams } from 'next/navigation'
import { FC } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { OperatorDetailsCard } from './OperatorDetailsCard'
import { OperatorNominatorList } from './OperatorNominatorList'
import { QUERY_OPERATOR_BY_ID } from './query'

export const Operator: FC = () => {
  const { operatorId } = useParams<{ operatorId?: string }>()

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

  return (
    <div className='flex w-full flex-col space-y-4'>
      <OperatorDetailsCard operator={operator} isDesktop={isDesktop} />
      <OperatorNominatorList operator={operator} isDesktop={isDesktop} />
    </div>
  )
}
