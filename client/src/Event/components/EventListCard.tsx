import { FC } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Event } from 'gql/graphql'

// common
import { MobileCard } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

type Props = {
  event: Event
}

const EventListCard: FC<Props> = ({ event }) => {
  const { selectedChain } = useDomains()
  const body = [
    { name: 'Block', value: event.block?.height },
    { name: 'Action', value: event.name.split('.')[1] },
    { name: 'Extrinsic Id', value: '-' },
    { name: 'Type', value: event.phase },
  ]
  return (
    <MobileCard
      id='event-list-mobile'
      header={
        <Link
          className='flex gap-2'
          to={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, event.id)}
        >
          <h3 className='font-medium text-[#241235] text-sm dark:text-white'>{`${event.block?.height}-${event.indexInBlock}`}</h3>
        </Link>
      }
      body={body}
    />
  )
}

export default EventListCard
