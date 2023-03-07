import { FC } from 'react'
import { Log } from 'gql/graphql'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import { Table, Column } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import { useDomains } from 'common/providers/ChainProvider'

dayjs.extend(relativeTime)

type Props = {
  logs: Log[]
}

const BlockDetailsLogList: FC<Props> = ({ logs }) => {
  const { selectedChain } = useDomains()
  // methods
  const generateColumns = (logs: Log[]): Column[] => [
    {
      title: 'Log Index',
      cells: logs.map(({ id }) => (
        <Link
          key={`${id}-block-log-id`}
          className='hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.logs.id.page(selectedChain.urls.page, id)}
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

export default BlockDetailsLogList
