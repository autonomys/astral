import { CopyButton } from 'components/common/CopyButton'
import { Column, Table } from 'components/common/Table'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Event } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'
import { EventListCard } from './EventListCard'

dayjs.extend(relativeTime)

interface Props {
  events: Event[]
  isDesktop?: boolean
}

export const EventTable: FC<Props> = ({ events, isDesktop = false }) => {
  const { selectedChain, selectedDomain } = useDomains()
  // methods
  const generateColumns = useCallback(
    (events: Event[]): Column[] => [
      {
        title: 'Event Id',
        cells: events.map(({ id, indexInBlock }) => (
          <div className='flex w-full gap-1' key={`${id}-${indexInBlock}-event-id`}>
            <Link
              className='w-full hover:text-purpleAccent'
              href={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, selectedDomain, id)}
              data-testid={`event-link-${indexInBlock}`}
            >
              {id}
            </Link>
            <CopyButton
              data-testid={`testCopyButton-${indexInBlock}`}
              value={id}
              message='Id copied'
            />
          </div>
        )),
      },
      {
        title: 'Block',
        cells: events.map(({ block, id, indexInBlock }) => (
          <Link
            key={`${id}-${indexInBlock}-event-block`}
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, selectedDomain, id)}
          >
            {block?.height}
          </Link>
        )),
      },
      {
        title: 'Action',
        cells: events.map(({ name, id, indexInBlock }) => (
          <div key={`${id}-${indexInBlock}-event-action`}>
            {name
              .split('.')[1]
              .split(/(?=[A-Z])/)
              .join(' ')}
          </div>
        )),
      },
      {
        title: 'Type',
        cells: events.map(({ phase, id, indexInBlock }) => (
          <div key={`${id}-${indexInBlock}-event-phase`}>{phase.split(/(?=[A-Z])/).join(' ')}</div>
        )),
      },
      {
        title: 'Time',
        cells: events.map(({ block, id, indexInBlock }) => {
          const blockDate = dayjs(block?.timestamp).fromNow(true)
          return <div key={`${id}-${indexInBlock}-event-time`}>{blockDate}</div>
        }),
      },
    ],
    [selectedChain, selectedDomain],
  )

  // constants
  const columns = useMemo(() => generateColumns(events), [events, generateColumns])

  return isDesktop ? (
    <div className='w-full'>
      <div className='my-6 rounded'>
        <Table
          columns={columns}
          emptyMessage='There are no blocks to show'
          tableProps='bg-white rounded-[20px] dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset dark:border-none'
          tableHeaderProps='border-b border-gray-200'
          id='latest-events'
        />
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {events.map((event) => (
        <EventListCard event={event} key={`event-list-card-${event.id}-${event.indexInBlock}`} />
      ))}
    </div>
  )
}
