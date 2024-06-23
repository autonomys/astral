import { Pagination } from '@/constants/general'
import { bigNumberToNumber } from '@/utils/number'
import { shortString } from '@/utils/string'
import { ColumnDef, SortingState } from '@tanstack/react-table'
import { NewTable } from 'components/common/NewTable'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { RewardEvent } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { FC, useMemo } from 'react'

dayjs.extend(relativeTime)

interface Props {
  rewards: RewardEvent[]
  sorting: SortingState
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>
  pagination: Pagination
  pageCount: number
}

export const AccountRewardTable: FC<Props> = ({
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
              className='hover:text-purpleAccent'
              href={INTERNAL_ROUTES.blocks.id.page(
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
            <div key={`${row.original.id}-account-id`} className='row flex items-center gap-3'>
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
      <div className='my-6 rounded'>
        <NewTable
          data={rewards}
          columns={cols}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
        />
      </div>
    </div>
  )
}
