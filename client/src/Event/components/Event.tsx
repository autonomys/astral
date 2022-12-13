import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

// common
import Spinner from 'common/components/Spinner'
import ErrorFallback from 'common/components/ErrorFallback'
import useMediaQuery from 'common/hooks/useMediaQuery'

// event
import EventDetailsCard from './EventDetailsCard'
import { QUERY_EVENT_BY_ID } from 'Event/query'
import EventDetailsTab from './EventDetailsTab'

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
    return <ErrorFallback error={error} />
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
