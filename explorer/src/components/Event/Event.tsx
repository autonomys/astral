'use client'

import { useQuery } from '@apollo/client'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import type { EventByIdQuery } from 'gql/graphql'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useMemo } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { EventIdParam } from 'types/app'
import { EventDetailsCard } from './EventDetailsCard'
import { QUERY_EVENT_BY_ID } from './query'

export const Event: FC = () => {
  const { eventId } = useParams<EventIdParam>()
  const inFocus = useWindowFocus()
  const { data, error, loading } = useQuery<EventByIdQuery>(QUERY_EVENT_BY_ID, {
    variables: { eventId },
    skip: !inFocus,
  })

  useErrorHandler(error)

  const event = useMemo(() => data && data.eventById, [data])

  if (loading) return <Spinner />
  if (!data || !event) return <NotFound />

  return (
    <div className='w-full'>
      <EventDetailsCard event={event} />
    </div>
  )
}
