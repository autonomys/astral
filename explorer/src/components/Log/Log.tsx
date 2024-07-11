'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import type { LogByIdQuery, LogByIdQueryVariables, Log as SquidLog } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
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
  const { logId } = useParams<LogIdParam>()
  const inFocus = useWindowFocus()
  const { selectedChain } = useDomains()
  const { setIsVisible } = useSquidQuery<LogByIdQuery, LogByIdQueryVariables>(
    QUERY_LOG_BY_ID,
    {
      variables: { logId: logId ?? '' },
      skip: !inFocus,
    },
    selectedChain?.isDomain ? Routes.nova : Routes.consensus,
    'log',
  )

  const {
    consensus: { log: consensusEntry },
    nova: { log: evmEntry },
  } = useQueryStates()

  const loading = useMemo(() => {
    if (selectedChain?.isDomain) return isLoading(evmEntry)
    return isLoading(consensusEntry)
  }, [evmEntry, consensusEntry, selectedChain])

  const data = useMemo(() => {
    if (selectedChain?.isDomain && hasValue(evmEntry)) return evmEntry.value
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry, evmEntry, selectedChain])

  const log = useMemo(() => data && (data.logById as SquidLog), [data])

  const noData = useMemo(() => {
    if (loading) return <Spinner />
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
