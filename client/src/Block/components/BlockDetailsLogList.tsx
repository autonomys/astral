import { FC } from 'react'
import { Log } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import Table, { Column } from 'common/components/Table'

dayjs.extend(relativeTime)

type Props = {
  logs: Log[]
}

const BlockDetailsLogList: FC<Props> = ({ logs }) => {
  // methods
  const generateColumns = (logs: Log[]): Column[] => [
    {
      title: 'Log Index',
      cells: logs.map(({ id }) => <div key={`${id}-block-log-id`}>{id}</div>),
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

export default BlockDetailsLogList
