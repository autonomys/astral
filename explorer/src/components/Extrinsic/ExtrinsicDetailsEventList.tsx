import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Event } from 'gql/graphql'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'

// common
import { Column, Table } from 'components/common/Table'
import { INTERNAL_ROUTES } from 'constants/routes'
import useDomains from 'hooks/useDomains'

dayjs.extend(relativeTime)

type Props = {
  events: Event[]
}

export const ExtrinsicDetailsEventList: FC<Props> = ({ events }) => {
  const { selectedChain, selectedDomain } = useDomains()
  // methods
  const generateColumns = useCallback(
    (events: Event[]): Column[] => [
      {
        title: 'Event Id',
        cells: events.map(({ block, indexInBlock, id }) => (
          <Link
            key={`${id}-extrinsic-event-id`}
            className='w-full hover:text-[#DE67E4]'
            href={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, selectedDomain, id)}
          >
            <div>{`${block?.height}-${indexInBlock}`}</div>
          </Link>
        )),
      },
      {
        title: 'Extrinsic Id',
        cells: events.map(({ block, id, extrinsic }) => (
          <div
            key={`${id}-extrinsic-event-extrinsic`}
          >{`${block?.height}-${extrinsic?.indexInBlock}`}</div>
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
      id='extrinsic-details-event-list'
    />
  )
}
