import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'

// gql
import { Extrinsic } from 'gql/graphql'

// common
import { shortString } from '@/utils/string'
import { CopyButton } from 'components/common/CopyButton'
import { StatusIcon } from 'components/common/StatusIcon'
import { Column, Table } from 'components/common/Table'
import { INTERNAL_ROUTES } from 'constants/routes'

// extrinsic
import useDomains from 'hooks/useDomains'
import { ExtrinsicListCard } from './ExtrinsicListCard'

dayjs.extend(relativeTime)

interface Props {
  extrinsics: Extrinsic[]
  isDesktop?: boolean
}

export const ExtrinsicTable: FC<Props> = ({ extrinsics, isDesktop = false }) => {
  const { selectedChain, selectedDomain } = useDomains()
  // methods
  const generateColumns = useCallback(
    (extrinsics: Extrinsic[]): Column[] => [
      {
        title: 'Extrinsic Id',
        cells: extrinsics.map(({ block, indexInBlock, id }) => (
          <Link
            key={`${id}-extrinsic-block-${indexInBlock}`}
            className='hover:text-[#DE67E4]'
            href={INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, selectedDomain, id)}
          >
            <div>{`${block.height}-${indexInBlock}`}</div>
          </Link>
        )),
      },
      {
        title: 'Time',
        cells: extrinsics.map(({ block, id }, index) => {
          const blockDate = dayjs(block.timestamp).fromNow(true)

          return <div key={`${id}-extrinsic-time-${index}`}>{blockDate}</div>
        }),
      },
      {
        title: 'Status',
        cells: extrinsics.map(({ success, id }, index) => (
          <div
            className='md:flex md:items-center md:justify-start md:pl-5'
            key={`${id}-home-extrinsic-status-${index}`}
          >
            <StatusIcon status={success} />
          </div>
        )),
      },
      {
        title: 'Action',
        cells: extrinsics.map(({ name, id }, index) => (
          <div key={`${id}-extrinsic-action-${index}`}>{name.split('.')[1].toUpperCase()}</div>
        )),
      },
      {
        title: 'Block hash',
        cells: extrinsics.map(({ hash, id }, index) => (
          <div key={`${id}-extrinsic-hash-${index}`}>
            <CopyButton value={hash} message='Hash copied'>
              {shortString(hash)}
            </CopyButton>
          </div>
        )),
      },
    ],
    [selectedChain.urls.page, selectedDomain],
  )

  // constants
  const columns = useMemo(() => generateColumns(extrinsics), [extrinsics, generateColumns])

  return isDesktop ? (
    <div className='w-full'>
      <div className='my-6 rounded'>
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
      {extrinsics.map((extrinsic, index) => (
        <ExtrinsicListCard
          extrinsic={extrinsic}
          key={`extrinsic-list-card-${extrinsic.id}-${index}`}
        />
      ))}
    </div>
  )
}
