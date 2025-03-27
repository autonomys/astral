'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import { LogByIdDocument, LogByIdQuery, LogByIdQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { LogIdParam } from 'types/app'
import { LogDetailsCard } from './LogDetailsCard'

export const Log: FC = () => {
  const { ref, inView } = useInView()
  const { logId } = useParams<LogIdParam>()
  const inFocus = useWindowFocus()
  const { loading, setIsVisible } = useIndexersQuery<LogByIdQuery, LogByIdQueryVariables>(
    LogByIdDocument,
    {
      variables: { logId: logId ?? '' },
      skip: !inFocus,
    },
    Routes.consensus,
    'log',
  )

  const consensusEntry = useQueryStates((state) => state.consensus.log)

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const log = useMemo(() => data && data.consensus_logs[0], [data])
  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, consensusEntry, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='w-full'>
      <div ref={ref}>{!loading && log ? <LogDetailsCard log={log} /> : noData}</div>
    </div>
  )
}
