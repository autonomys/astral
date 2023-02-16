import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

// common
import { Spinner, ErrorFallback } from 'common/components'
import useMediaQuery from 'common/hooks/useMediaQuery'

// layout
import { NotFound } from 'layout/components'

// event
import { EventDetailsCard, EventDetailsTab } from 'Event/components'
import { QUERY_EVENT_BY_ID } from 'Event/query'

const Event: FC = () => {
  const { eventId } = useParams()
  const { data, error, loading } = useQuery(QUERY_EVENT_BY_ID, {
    variables: {
      eventId: eventId,
    },
  })

  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (loading) {
    return <Spinner />
  }

  if (error || !data) {
    // TODO: consider adding error monitoring
    console.error(error)
    return <ErrorFallback />
  }

  if (!data.eventById) {
    return <NotFound />
  }

  const event = data.eventById

  return (
    <div className='w-full'>
      <EventDetailsCard event={event} />
      <EventDetailsTab event={event} isDesktop={isDesktop} />
    </div>
  )
}

export default Event
