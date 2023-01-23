import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

// gql
import { Log } from 'gql/graphql'

// common
import { Table, Column, CopyButton } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'

// log
import { LogListCard } from 'Log/components'

dayjs.extend(relativeTime)

interface Props {
  logs: Log[]
  isDesktop?: boolean
}

const LogTable: FC<Props> = ({ logs, isDesktop = false }) => {
  // methods
  const generateColumns = (logs: Log[]): Column[] => [
    {
      title: 'Log Index',
      cells: logs.map(({ id }) => (
        <div className='w-full flex' key={`${id}-log-index`}>
          <Link className='w-full' to={INTERNAL_ROUTES.logs.id.page(id)}>
            <div>{id}</div>
          </Link>
          <CopyButton value={id} message='Id copied' />
        </div>
      )),
    },
    {
      title: 'Block',
      cells: logs.map(({ block, id }) => <div key={`${id}-block-height`}>{block.height}</div>),
    },
    {
      title: 'Type',
      cells: logs.map(({ kind, id }) => <div key={`${id}-type`}>{kind}</div>),
    },
    {
      title: 'Engine',
      cells: logs.map(() => <></>),
    },
    {
      title: 'Data',
      cells: logs.map(() => <></>),
    },
  ]

  // constants
  const columns = generateColumns(logs)

  return isDesktop ? (
    <div className='w-full'>
      <div className='rounded my-6'>
        <Table
          columns={columns}
          emptyMessage='There are no blocks to show'
          tableProps='bg-white rounded-md dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
          tableHeaderProps='border-b border-gray-200'
          id='latest-blocks'
        />
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {logs.map((log) => (
        <LogListCard log={log} key={`log-list-card-${log.id}`} />
      ))}
    </div>
  )
}

export default LogTable
