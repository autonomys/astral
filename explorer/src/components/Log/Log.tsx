'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import type { LogByIdQuery, LogByIdQueryVariables, Log as SquidLog } from 'gql/graphql'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { LogIdParam } from 'types/app'
import { LogDetailsCard } from './LogDetailsCard'
import { LogDetailsTab } from './LogDetailsTab'
import { QUERY_LOG_BY_ID } from './query'

export const Log: FC = () => {
  const { ref, inView } = useInView()
  const { isEvm } = useChains()
  const { logId } = useParams<LogIdParam>()
  const inFocus = useWindowFocus()
  const { setIsVisible } = useSquidQuery<LogByIdQuery, LogByIdQueryVariables>(
    QUERY_LOG_BY_ID,
    {
      variables: { logId: logId ?? '' },
      skip: !inFocus,
      context: { clientName: isEvm ? 'nova' : 'consensus' },
    },
    isEvm ? Routes.nova : Routes.consensus,
    'log',
  )

  const {
    consensus: { log: consensusEntry },
    nova: { log: evmEntry },
  } = useQueryStates()

  const loading = useMemo(() => {
    if (isEvm) return isLoading(evmEntry)
    return isLoading(consensusEntry)
  }, [evmEntry, consensusEntry, isEvm])

  const data = useMemo(() => {
    if (isEvm && hasValue(evmEntry)) return evmEntry.value
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry, evmEntry, isEvm])

  const log = useMemo(() => data && (data.logById as SquidLog), [data])

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='w-full'>
      <div ref={ref}>
        {log ? (
          <>
            <LogDetailsCard log={log} />
            <LogDetailsTab events={log.block.events} />
          </>
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
