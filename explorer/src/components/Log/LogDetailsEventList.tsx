import { shortString } from '@/utils/string'
import { Column, Table } from 'components/common/Table'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Event } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'

dayjs.extend(relativeTime)

type Props = {
  events: Event[]
}

export const LogDetailsEventList: FC<Props> = ({ events }) => {
  const { selectedChain, selectedDomain } = useDomains()

  // methods
  const generateColumns = useCallback(
    (events: Event[]): Column[] => [
      {
        title: 'Event Id',
        cells: events.map(({ block, indexInBlock, id }) => (
          <div className='flex w-full gap-1' key={`${id}-log-event-id`}>
            <Link
              className='w-full hover:text-purpleAccent'
              href={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, selectedDomain, id)}
            >
              {`${block?.height}-${indexInBlock}`}
            </Link>
          </div>
        )),
      },
      {
        title: 'Hash',
        cells: events.map(({ block, id }) => (
          <div key={`${id}-log-event-hash`}>{`${block && shortString(block.hash)}`}</div>
        )),
      },
      {
        title: 'Action',
        cells: events.map(({ name, id }) => (
          <div key={`${id}-extrinsic-event-action`}>{name.split('.')[1]}</div>
        )),
      },
      {
        title: 'Type',
        cells: events.map(({ phase, id }) => {
          return <div key={`${id}-extrinsic-event-phase`}>{phase}</div>
        }),
      },
    ],
    [selectedChain.urls.page, selectedDomain],
  )

  // constants
  const columns = useMemo(() => generateColumns(events), [events, generateColumns])

  return (
    <Table
      columns={columns}
      emptyMessage='There are no events to show'
      id='log-details-event-list'
    />
  )
}
