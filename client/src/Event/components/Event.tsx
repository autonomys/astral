import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useErrorHandler } from 'react-error-boundary'

// common
import { Spinner } from 'common/components'

// layout
import { NotFound } from 'layout/components'

// event
import { EventDetailsCard } from 'Event/components'
import { QUERY_EVENT_BY_ID } from 'Event/query'

const Event: FC = () => {
  const { eventId } = useParams()
  const { data, error, loading } = useQuery(QUERY_EVENT_BY_ID, {
    variables: {
      eventId: eventId,
    },
  })

  useErrorHandler(error)

  if (loading) {
    return <Spinner />
  }

  if (!data.eventById) {
    return <NotFound />
  }

  const event = data.eventById

  return (
    <div className='w-full'>
      <EventDetailsCard event={event} />
    </div>
  )
}

export default Event
