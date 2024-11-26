'use client'

import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import type { EventByIdQuery, EventByIdQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import type { EventIdParam } from 'types/app'
import { EventDetailsCard } from './EventDetailsCard'
import { QUERY_EVENT_BY_ID } from './query'

export const Event: FC = () => {
  const { ref, inView } = useInView()
  const { eventId } = useParams<EventIdParam>()
  const inFocus = useWindowFocus()
  const { data, loading } = useIndexersQuery<EventByIdQuery, EventByIdQueryVariables>(
    QUERY_EVENT_BY_ID,
    {
      variables: { eventId: eventId ?? '' },
    },
    inView,
    inFocus,
  )

  const event = useMemo(() => data && data.consensus_events[0], [data])

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  return (
    <div className='w-full'>
      <div ref={ref}>{!loading && event ? <EventDetailsCard event={event} /> : noData}</div>
    </div>
  )
}
