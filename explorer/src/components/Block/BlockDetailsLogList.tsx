import { Column, Table } from 'components/common/Table'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Log } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC } from 'react'

dayjs.extend(relativeTime)

type Props = {
  logs: Log[]
}

export const BlockDetailsLogList: FC<Props> = ({ logs }) => {
  const { selectedChain, selectedDomain } = useDomains()
  // methods
  const generateColumns = (logs: Log[]): Column[] => [
    {
      title: 'Log Index',
      cells: logs.map(({ id }) => (
        <Link
          key={`${id}-block-log-id`}
          className='hover:text-purpleAccent'
          href={INTERNAL_ROUTES.logs.id.page(selectedChain.urls.page, selectedDomain, id)}
        >
          {id}
        </Link>
      )),
    },
    {
      title: 'Block',
      cells: logs.map(({ block, id }) => <div key={`${id}-block-log-block`}>{block.height}</div>),
    },
    {
      title: 'Type',
      cells: logs.map(({ kind, id }) => <div key={`${id}-block-log-type`}>{kind}</div>),
    },
  ]

  // constants
  const columns = generateColumns(logs)

  return (
    <Table
      columns={columns}
      emptyMessage='There are no logs to show'
      id='block-details-logs-list'
    />
  )
}
