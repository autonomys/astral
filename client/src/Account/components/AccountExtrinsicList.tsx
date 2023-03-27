import { FC } from 'react'
import { Extrinsic } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import { Table } from 'common/components'
import { generateExtrinsicColumns } from 'common/helpers/generateColumns'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

interface Props {
  extrinsics: Extrinsic[]
}

const AccountExtrinsicList: FC<Props> = ({ extrinsics }) => {
  const { selectedChain } = useDomains()
  const columns = generateExtrinsicColumns(selectedChain.urls.page, extrinsics)

  return (
    <Table
      columns={columns}
      emptyMessage='There are no extrinsics to show'
      id='account-details-extrinsics-list'
    />
  )
}

export default AccountExtrinsicList
