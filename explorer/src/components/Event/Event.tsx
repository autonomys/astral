'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import type { EventByIdQuery, EventByIdQueryVariables } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { EventIdParam } from 'types/app'
import { EventDetailsCard } from './EventDetailsCard'
import { QUERY_EVENT_BY_ID } from './query'

export const Event: FC = () => {
  const { ref, inView } = useInView()
  const { eventId } = useParams<EventIdParam>()
  const { selectedChain } = useDomains()
  const inFocus = useWindowFocus()
  const { setIsVisible } = useSquidQuery<EventByIdQuery, EventByIdQueryVariables>(
    QUERY_EVENT_BY_ID,
    {
      variables: { eventId: eventId ?? '' },
      skip: !inFocus,
    },
    selectedChain?.isDomain ? Routes.nova : Routes.consensus,
    'event',
  )

  const {
    consensus: { event: consensusEntry },
    nova: { event: evmEntry },
  } = useQueryStates()

  const loading = useMemo(() => {
    if (selectedChain?.isDomain) return isLoading(evmEntry)
    return isLoading(consensusEntry)
  }, [evmEntry, consensusEntry, selectedChain])

  const data = useMemo(() => {
    if (selectedChain?.isDomain && hasValue(evmEntry)) return evmEntry.value
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry, evmEntry, selectedChain])

  const event = useMemo(() => data && data.eventById, [data])

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
      <div ref={ref}>{event ? <EventDetailsCard event={event} /> : noData}</div>
    </div>
  )
}
