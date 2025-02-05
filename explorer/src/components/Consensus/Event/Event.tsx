'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import { EventByIdDocument, EventByIdQuery, EventByIdQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { EventIdParam } from 'types/app'
import { EventDetailsCard } from './EventDetailsCard'

export const Event: FC = () => {
  const { ref, inView } = useInView()
  const { eventId } = useParams<EventIdParam>()
  const inFocus = useWindowFocus()
  const { loading, setIsVisible } = useIndexersQuery<EventByIdQuery, EventByIdQueryVariables>(
    EventByIdDocument,
    {
      variables: { eventId: eventId ?? '' },
      skip: !inFocus,
    },
    Routes.consensus,
    'event',
  )

  const consensusEntry = useQueryStates((state) => state.consensus.event)

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const event = useMemo(() => data && data.consensus_events[0], [data])

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
      <div ref={ref}>{!loading && event ? <EventDetailsCard event={event} /> : noData}</div>
    </div>
  )
}
