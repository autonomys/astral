import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

// gql
import { Extrinsic, ExtrinsicWhereInput } from 'gql/graphql'

// extrinsic
import { ExtrinsicListCard } from 'Extrinsic/components'

// account
import { AccountExtrinsicFilterDropdown } from 'Account/components'

// common
import { shortString } from 'common/helpers'
import { Table, Column, CopyButton, StatusIcon } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

interface Props {
  extrinsics: Extrinsic[]
  filters: ExtrinsicWhereInput
  setFilters: React.Dispatch<React.SetStateAction<ExtrinsicWhereInput>>
  isDesktop?: boolean
}

const AccountExtrinsicTable: FC<Props> = ({
  extrinsics,
  isDesktop = false,
  filters,
  setFilters,
}) => {
  const { selectedChain, selectedDomain } = useDomains()
  // methods
  const generateColumns = (extrinsics: Extrinsic[]): Column[] => [
    {
      title: 'Extrinsic Id',
      cells: extrinsics.map(({ block, indexInBlock, id }) => (
        <Link
          key={`${id}-extrinsic-block-${indexInBlock}`}
          className='hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, selectedDomain, id)}
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
      title: (
        <div className='flex gap-4'>
          <span>Action</span>
          <AccountExtrinsicFilterDropdown filters={filters} setFilters={setFilters} />
        </div>
      ),
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

export default AccountExtrinsicTable
