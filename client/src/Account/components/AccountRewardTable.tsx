import { ColumnDef, SortingState } from '@tanstack/react-table'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

// gql
import { RewardEvent } from 'gql/graphql'

// account
import { AccountRewardListCard } from 'Account/components'

// commons
import NewTable from 'common/components/NewTable'
import { Pagination } from 'common/constants'
import { bigNumberToNumber, shortString } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import useMediaQuery from 'common/hooks/useMediaQuery'
import { INTERNAL_ROUTES } from 'common/routes'

dayjs.extend(relativeTime)

interface Props {
  rewards: RewardEvent[]
  sorting: SortingState
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>
  pagination: Pagination
  pageCount: number
}

const AccountRewardTable: FC<Props> = ({
  rewards,
  sorting,
  setSorting,
  pagination,
  setPagination,
  pageCount,
}) => {
  const { selectedChain, selectedDomain } = useDomains()

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  const cols = useMemo<ColumnDef<RewardEvent>[]>(
    () => [
      {
        accessorKey: 'block_height',
        header: 'Block Number',
        enableSorting: true,
        cell: ({ row }) => {
          return (
            <Link
              key={`${row.original.id}-account-index`}
              className='hover:text-[#DE67E4]'
              to={INTERNAL_ROUTES.blocks.id.page(
                selectedChain.urls.page,
                selectedDomain,
                row.original.block?.height,
              )}
            >
              <div>{row.original.block?.height}</div>
            </Link>
          )
        },
      },
      {
        accessorKey: 'block_hash',
        header: 'Block Hash',
        enableSorting: true,
        cell: ({ row }) => {
          return (
            <div key={`${row.original.id}-account-id`} className='flex row items-center gap-3'>
              <div>
                {isLargeLaptop
                  ? row.original.block?.hash
                  : shortString(row.original.block?.hash || '')}
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        enableSorting: true,
        cell: ({ row }) => {
          const blockDate = dayjs(row.original.timestamp).fromNow(true)

          return <div key={`${row.original.id}-block-time`}>{blockDate}</div>
        },
      },
      {
        accessorKey: 'name',
        header: 'Type',
        enableSorting: true,
        cell: ({ row }) => {
          const type = row.original.name
            .split('.')[1]
            .split(/(?=[A-Z])/)
            .join(' ')
          return <div key={`${row.original.id}-account-locked`}>{type}</div>
        },
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        enableSorting: true,
        cell: ({ row }) => (
          <div key={`${row.original.id}-account-balance`}>
            {row.original.amount ? bigNumberToNumber(row.original.amount) : 0} tSSC
          </div>
        ),
      },
    ],
    [selectedChain, selectedDomain, isLargeLaptop],
  )

  return (
    <div className='w-full'>
      <div className='rounded my-6'>
        <NewTable
          data={rewards}
          columns={cols}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          mobileComponent={
            <div className='w-full'>
              {rewards.map((reward, index) => (
                <AccountRewardListCard
                  index={index}
                  reward={reward}
                  key={`account-list-card-${reward.id}`}
                />
              ))}
            </div>
          }
        />
      </div>
    </div>
  )
}

export default AccountRewardTable
