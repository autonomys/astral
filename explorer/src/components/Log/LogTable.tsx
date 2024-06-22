import { CopyButton } from 'components/common/CopyButton'
import { Column, Table } from 'components/common/Table'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Log } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'
import { LogListCard } from './LogListCard'

dayjs.extend(relativeTime)

interface Props {
  logs: Log[]
  isDesktop?: boolean
}

export const LogTable: FC<Props> = ({ logs, isDesktop = false }) => {
  const { selectedChain, selectedDomain } = useDomains()
  // methods
  const generateColumns = useCallback(
    (logs: Log[]): Column[] => [
      {
        title: 'Log Index',
        cells: logs.map(({ id }, index) => (
          <div className='flex w-full' key={`${id}-log-index`}>
            <Link
              className='w-full hover:text-purpleAccent'
              data-testid={`log-link-${index}`}
              href={INTERNAL_ROUTES.logs.id.page(selectedChain.urls.page, selectedDomain, id)}
            >
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
        cells: logs.map(({ value, id }) => {
          return <div key={`${id}-engine`}>{value?.engine}</div>
        }),
      },
      {
        title: 'Data',
        cells: logs.map(({ value, id }) => (
          <div key={`${id}-data`}>{`${value?.data.slice(0, 20)}...`}</div>
        )),
      },
    ],
    [selectedChain.urls.page, selectedDomain],
  )

  // constants
  const columns = useMemo(() => generateColumns(logs), [logs, generateColumns])

  return isDesktop ? (
    <div className='w-full'>
      <div className='my-6 rounded'>
        <Table
          columns={columns}
          emptyMessage='There are no blocks to show'
          tableProps='bg-white rounded-md dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset dark:border-none'
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
