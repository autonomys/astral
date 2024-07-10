'use client'

import { useQuery } from '@apollo/client'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import type { LogByIdQuery, Log as SquidLog } from 'gql/graphql'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useMemo } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { LogIdParam } from 'types/app'
import { LogDetailsCard } from './LogDetailsCard'
import { LogDetailsTab } from './LogDetailsTab'
import { QUERY_LOG_BY_ID } from './query'

export const Log: FC = () => {
  const { logId } = useParams<LogIdParam>()
  const inFocus = useWindowFocus()
  const { data, error, loading } = useQuery<LogByIdQuery>(QUERY_LOG_BY_ID, {
    variables: { logId },
    skip: !inFocus,
  })

  useErrorHandler(error)

  const log = useMemo(() => data && (data.logById as SquidLog), [data])

  if (loading) return <Spinner />
  if (!data || !log) return <NotFound />

  return (
    <div className='w-full'>
      <LogDetailsCard log={log} />
      <LogDetailsTab events={log.block.events} />
    </div>
  )
}
