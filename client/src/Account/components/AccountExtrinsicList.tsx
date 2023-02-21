import { FC } from 'react'
import { Extrinsic } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

// common
import { Table, Column } from 'common/components'
import { shortString } from 'common/helpers'
import { INTERNAL_ROUTES } from 'common/routes'

dayjs.extend(relativeTime)

interface Props {
  extrinsics: Extrinsic[]
}

const AccountExtrinsicList: FC<Props> = ({ extrinsics }) => {
  // methods
  const generateColumns = (extrinsics: Extrinsic[]): Column[] => [
    {
      title: 'Extrinsic Id',
      cells: extrinsics.map(({ block, pos, id }) => (
        <Link
          key={`${id}-account-extrinsic-id`}
          className='hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.extrinsics.id.page(id)}
        >
          <div>{`${block.height}-${pos}`}</div>
        </Link>
      )),
    },
    {
      title: 'Block hash',
      cells: extrinsics.map(({ hash, id }) => (
        <div key={`${id}-account-extrinsic-block`}>{shortString(hash)}</div>
      )),
    },
    {
      title: 'Action',
      cells: extrinsics.map(({ name, id }) => (
        <div key={`${id}-account-extrinsic-action`}>{name.split('.')[1].toUpperCase()}</div>
      )),
    },
    {
      title: 'Time',
      cells: extrinsics.map(({ block, id }) => {
        const blockDate = dayjs(block.timestamp).fromNow(true)
        return <div key={`${id}-account-extrinsic-time`}>{blockDate}</div>
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
      id='account-details-extrinsics-list'
    />
  )
}

export default AccountExtrinsicList
