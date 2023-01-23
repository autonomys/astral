import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

// gql
import { Extrinsic } from 'gql/graphql'

// common
import { shortString } from 'common/helpers'
import { Table, Column, CopyButton } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'

// extrinsic
import { ExtrinsicListCard } from 'Extrinsic/components'

dayjs.extend(relativeTime)

interface Props {
  extrinsics: Extrinsic[]
  isDesktop?: boolean
}

const ExtrinsicTable: FC<Props> = ({ extrinsics, isDesktop = false }) => {
  // methods
  const generateColumns = (extrinsics: Extrinsic[]): Column[] => [
    {
      title: 'Extrinsic Id',
      cells: extrinsics.map(({ block, pos, id }) => (
        <Link key={`${id}-extrinsic-block`} to={INTERNAL_ROUTES.extrinsics.id.page(id)}>
          <div>{`${block.height}-${pos}`}</div>
        </Link>
      )),
    },
    {
      title: 'Time',
      cells: extrinsics.map(({ block, id }) => {
        const blockDate = dayjs(block.timestamp).fromNow(true)

        return <div key={`${id}-extrinsic-time`}>{blockDate}</div>
      }),
    },
    {
      title: 'Status',
      cells: extrinsics.map(() => <></>),
    },
    {
      title: 'Action',
      cells: extrinsics.map(({ name, id }) => (
        <div key={`${id}-extrinsic-action`}>{name.split('.')[1].toUpperCase()}</div>
      )),
    },
    {
      title: 'Success',
      cells: extrinsics.map(() => <></>),
    },
    {
      title: 'Block hash',
      cells: extrinsics.map(({ hash, id }) => (
        <div key={`${id}-extrinsic-hash`}>
          <CopyButton value={hash} message='Hash copied'>
            {shortString(hash)}
          </CopyButton>
        </div>
      )),
    },
  ]

  // constants
  const columns = generateColumns(extrinsics)

  return isDesktop ? (
    <div className='w-full'>
      <div className='rounded my-6'>
        <Table
          columns={columns}
          emptyMessage='There are no extrinsics to show'
          id='latest-extrinsics'
          tableProps='bg-white rounded-md dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
          tableHeaderProps='border-b border-gray-200'
        />
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {extrinsics.map((extrinsic) => (
        <ExtrinsicListCard extrinsic={extrinsic} key={`extrinsic-list-card-${extrinsic.id}`} />
      ))}
    </div>
  )
}

export default ExtrinsicTable
