import { MobileCard } from 'components/common/MobileCard'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Event } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC } from 'react'

dayjs.extend(relativeTime)

type Props = {
  event: Event
}

export const EventListCard: FC<Props> = ({ event }) => {
  const { selectedChain, selectedDomain } = useDomains()
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
          href={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, selectedDomain, event.id)}
        >
          <h3 className='text-sm font-medium text-[#241235] dark:text-white'>{`${event.block?.height}-${event.indexInBlock}`}</h3>
        </Link>
      }
      body={body}
    />
  )
}
