import { FC } from 'react'
import { Extrinsic } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import { generateExtrinsicColumns } from 'common/helpers/generateColumns'
import { Table } from 'common/components'

dayjs.extend(relativeTime)

type Props = {
  extrinsics: Extrinsic[]
}

const BlockDetailsExtrinsicList: FC<Props> = ({ extrinsics }) => {
  const columns = generateExtrinsicColumns(extrinsics)

  return (
    <Table
      columns={columns}
      emptyMessage='There are no extrinsics to show'
      id='block-details-extrinsics-list'
    />
  )
}

export default BlockDetailsExtrinsicList
