import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { FC } from 'react'

// common
import { Column, Table } from 'components/common/Table'
import { INTERNAL_ROUTES } from 'constants/routes'
import useDomains from 'hooks/useDomains'
import { ExtrinsicAndEventResultCard } from './ExtrinsicAndEventResultCard'

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

export const ExtrinsicAndEventResultTable: FC<Props> = ({ results, isDesktop = false }) => {
  const { selectedChain, selectedDomain } = useDomains()
  // methods
  const generateColumns = (results: Result[]): Column[] => [
    {
      title: 'Id',
      cells: results.map(({ id, indexInBlock, type }) => {
        const link =
          type === 'Extrinsic'
            ? INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, selectedDomain, id)
            : INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, selectedDomain, id)
        return (
          <Link
            key={`${id}-result-id-${indexInBlock}`}
            className='hover:text-purpleAccent'
            href={link}
          >
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
          className='hover:text-purpleAccent'
          href={INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, selectedDomain, id)}
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
      <div className='my-6 rounded'>
        <Table
          columns={columns}
          emptyMessage='There are no extrinsics to show'
          id='latest-extrinsics'
          tableProps='bg-white rounded-[20px] dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset dark:border-none'
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
