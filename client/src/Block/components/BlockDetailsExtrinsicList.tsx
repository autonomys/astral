import { FC } from 'react'
import { Extrinsic } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

// common
import Table, { Column } from 'common/components/Table'
import { shortString } from 'common/helpers'
import { INTERNAL_ROUTES } from 'common/routes'

dayjs.extend(relativeTime)

type Props = {
  extrinsics: Extrinsic[]
}

const BlockDetailsExtrinsicList: FC<Props> = ({ extrinsics }) => {
  // methods
  const generateColumns = (extrinsics: Extrinsic[]): Column[] => [
    {
      title: 'Extrinsic Id',
      cells: extrinsics.map(({ block, pos, id }) => (
        <Link key={id} to={INTERNAL_ROUTES.extrinsics.id.page(id)}>
          <div>{`${block.height}-${pos}`}</div>
        </Link>
      )),
    },
    {
      title: 'Block hash',
      cells: extrinsics.map(({ hash }) => <div key={hash}>{shortString(hash)}</div>),
    },
    {
      title: 'Action',
      cells: extrinsics.map(({ call }) => (
        <div key={call.id}>{call.name.split('.')[1].toUpperCase()}</div>
      )),
    },
    {
      title: 'Time',
      cells: extrinsics.map(({ block }) => {
        const blockDate = dayjs(block.timestamp).fromNow(true)

        return <div key={block.timestamp}>{blockDate}</div>
      }),
    },
    {
      title: 'Status',
      cells: extrinsics.map(() => <></>),
    },
  ]

  // constants
  const columns = generateColumns(extrinsics)

  return (
    <Table
      columns={columns}
      emptyMessage='There are no extrinsics to show'
      id='block-details-extrinsics-list'
    />
  )
}

export default BlockDetailsExtrinsicList
