import { FC } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import { Column, Table } from 'common/components'
import useDomains from 'common/hooks/useDomains'
import { INTERNAL_ROUTES } from 'common/routes'
import ExtrinsicAndEventResultCard from './ExtrinsicAndEventResultCard'

dayjs.extend(relativeTime)

export type Result = {
  id: string
  timestamp: string
  action: string
  blockHeight: number
  indexInBlock: number
  type: string
}

interface Props {
  results: Result[]
  isDesktop?: boolean
}

const ExtrinsicAndEventResultTable: FC<Props> = ({ results, isDesktop = false }) => {
  const { selectedChain } = useDomains()
  // methods
  const generateColumns = (results: Result[]): Column[] => [
    {
      title: 'Id',
      cells: results.map(({ id, indexInBlock, type }) => {
        const link =
          type === 'Extrinsic'
            ? INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, id)
            : INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, id)
        return (
          <Link key={`${id}-result-id-${indexInBlock}`} className='hover:text-[#DE67E4]' to={link}>
            <div>{id}</div>
          </Link>
        )
      }),
    },
    {
      title: 'Block',
      cells: results.map(({ blockHeight, indexInBlock, id }) => (
        <Link
          key={`${id}-result-block-${indexInBlock}`}
          className='hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, id)}
        >
          <div>{blockHeight}</div>
        </Link>
      )),
    },
    {
      title: 'Time',
      cells: results.map(({ timestamp, id }, index) => {
        const blockDate = dayjs(timestamp).fromNow(true)

        return <div key={`${id}-result-time-${index}`}>{blockDate}</div>
      }),
    },
    {
      title: 'Action',
      cells: results.map(({ action, id }, index) => (
        <div key={`${id}-result-action-${index}`}>{action.split('.')[1].toUpperCase()}</div>
      )),
    },
    {
      title: 'Type',
      cells: results.map(({ type, id }, index) => (
        <div key={`${id}-result-type-${index}`}>{type}</div>
      )),
    },
  ]

  // constants
  const columns = generateColumns(results)

  return isDesktop ? (
    <div className='w-full'>
      <div className='rounded my-6'>
        <Table
          columns={columns}
          emptyMessage='There are no extrinsics to show'
          id='latest-extrinsics'
          tableProps='bg-white rounded-[20px] dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
          tableHeaderProps='border-b border-gray-200'
        />
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {results.map((result, index) => (
        <ExtrinsicAndEventResultCard
          result={result}
          key={`extrinsic-list-card-${result.id}-${index}`}
        />
      ))}
    </div>
  )
}

export default ExtrinsicAndEventResultTable
