import { FC } from 'react'
import { Extrinsic } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

// common
import { Table, Column, StatusIcon } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import { shortString } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

type Props = {
  extrinsics: Extrinsic[]
}

const BlockDetailsExtrinsicList: FC<Props> = ({ extrinsics }) => {
  const { selectedChain } = useDomains()
  // methods
  const generateColumns = (extrinsics: Extrinsic[]): Column[] => [
    {
      title: 'Extrinsic Id',
      cells: extrinsics.map(({ block, pos, id }) => (
        <Link
          key={`${id}-block-extrinsic-id`}
          className='hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, id)}
        >
          {`${block.height}-${pos}`}
        </Link>
      )),
    },
    {
      title: 'Block hash',
      cells: extrinsics.map(({ hash, id }) => (
        <div key={`${id}-block-extrinsic-hash`}>{shortString(hash)}</div>
      )),
    },
    {
      title: 'Action',
      cells: extrinsics.map(({ name, id }) => (
        <div key={`${id}-block-extrinsic-action`}>{name.split('.')[1].toUpperCase()}</div>
      )),
    },
    {
      title: 'Time',
      cells: extrinsics.map(({ block, id }) => {
        const blockDate = dayjs(block.timestamp).fromNow(true)

        return <div key={`${id}-block-extrinsic-time`}>{blockDate}</div>
      }),
    },
    {
      title: 'Status',
      cells: extrinsics.map(({ id, success }) => (
        <div
          className='md:flex md:items-center md:justify-start md:pl-5'
          key={`${id}-home-extrinsic-status`}
        >
          <StatusIcon status={success} />
        </div>
      )),
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
