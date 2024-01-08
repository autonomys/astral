import Identicon from '@polkadot/react-identicon'
import { AccountRewards } from 'gql/graphql'
import { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

// common
import { PAGE_SIZE, Pagination } from 'common/constants'
import { bigNumberToString, shortString } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import useMediaQuery from 'common/hooks/useMediaQuery'
import { INTERNAL_ROUTES } from 'common/routes'

// leaderboard
import { ColumnDef, SortingState } from '@tanstack/react-table'
import NewTable from 'common/components/NewTable'
import NominatorRewardsListCard from './NominatorRewardsListCard'

interface Props {
  accounts: AccountRewards[]
  sorting: SortingState
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>
  pagination: Pagination
  pageCount: number
}

const NominatorRewardsListTable: FC<Props> = ({
  accounts,
  pagination,
  sorting,
  setSorting,
  setPagination,
  pageCount,
}) => {
  const { selectedChain } = useDomains()

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  const newCount = PAGE_SIZE * Number(pagination.pageIndex + 1) - 10

  const cols = useMemo<ColumnDef<AccountRewards>[]>(
    () => [
      {
        header: 'Rank',
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <div>{pagination.pageIndex + 1 > 1 ? newCount + row.index + 1 : row.index + 1}</div>
          )
        },
      },
      {
        accessorKey: 'account_id',
        header: 'Account',
        enableSorting: true,
        cell: ({ row }) => {
          return (
            <div className='flex row items-center gap-3'>
              <Identicon value={row.original.id} size={26} theme='beachball' />
              <Link
                data-testid={`account-link-${row.index}`}
                to={INTERNAL_ROUTES.accounts.id.page(
                  selectedChain.urls.page,
                  'consensus',
                  row.original.id,
                )}
                className='hover:text-[#DE67E4]'
              >
                <div>{isLargeLaptop ? row.original.id : shortString(row.original.id)}</div>
              </Link>
            </div>
          )
        },
      },
      {
        accessorKey: 'operator',
        header: 'Nominator rewards',
        enableSorting: true,
        cell: ({ row }) => (
          <div>
            {row.original.operator ? `${bigNumberToString(row.original.operator, 10)} tSSC` : 0}
          </div>
        ),
      },
    ],
    [selectedChain, newCount, pagination.pageIndex, isLargeLaptop],
  )

  return (
    <div className='w-full'>
      <div className='rounded my-6'>
        <NewTable
          data={accounts}
          columns={cols}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          mobileComponent={
            <div className='w-full'>
              {accounts.map((account, index) => (
                <NominatorRewardsListCard
                  index={index}
                  account={account}
                  key={`reward-list-card-${account.id}`}
                />
              ))}
            </div>
          }
        />
      </div>
    </div>
  )
}

export default NominatorRewardsListTable
