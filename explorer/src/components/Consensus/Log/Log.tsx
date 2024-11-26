'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import type { LogByIdQuery, LogByIdQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import type { LogIdParam } from 'types/app'
import { LogDetailsCard } from './LogDetailsCard'
import { LogDetailsTab } from './LogDetailsTab'
import { QUERY_LOG_BY_ID } from './query'

export const Log: FC = () => {
  const { ref, inView } = useInView()
  const { logId } = useParams<LogIdParam>()
  const inFocus = useWindowFocus()
  const { data, loading } = useIndexersQuery<LogByIdQuery, LogByIdQueryVariables>(
    QUERY_LOG_BY_ID,
    {
      variables: { logId: logId ?? '' },
    },
    inView,
    inFocus,
  )

  const log = useMemo(() => data && data.consensus_logs[0], [data])

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  return (
    <div className='w-full'>
      <div ref={ref}>
        {!loading && log ? (
          <>
            <LogDetailsCard log={log} />
            <LogDetailsTab events={log.block?.events ?? []} />
          </>
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
