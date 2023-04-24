import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

// common
import { Column } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import { shortString } from 'common/helpers'

import { Extrinsic } from 'gql/graphql'

export const generateExtrinsicColumns = (chain: string, extrinsics: Extrinsic[]): Column[] => [
  {
    title: 'Extrinsics',
    cells: extrinsics.map(({ block, pos, id }) => (
      <Link
        key={`${id}-account-extrinsic-id`}
        to={INTERNAL_ROUTES.extrinsics.id.page(chain, id)}
        className='hover:text-[#DE67E4]'
      >
        <div>{`${block.height}-${pos}`}</div>
      </Link>
    )),
  },
  {
    title: 'Hash',
    cells: extrinsics.map(({ hash, id }) => (
      <div key={`${id}-account-extrinsic-block`}>{shortString(hash)}</div>
    )),
  },
  {
    title: 'Call',
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
    title: 'Amount',
    cells: extrinsics.map(() => <></>),
  },
  {
    title: 'Status',
    cells: extrinsics.map(() => <></>),
  },
]
