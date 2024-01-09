import { useApolloClient, useQuery } from '@apollo/client'
import Identicon from '@polkadot/react-identicon'
import { SortingState } from '@tanstack/react-table'
import { AccountRewards } from 'gql/graphql'
import { FC, useCallback, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { Link } from 'react-router-dom'

// common
import { Spinner } from 'common/components'
import NewTable from 'common/components/NewTable'
import NotAllowed from 'common/components/NotAllowed'
import { PAGE_SIZE } from 'common/constants'
import useDomains from 'common/hooks/useDomains'
import useMediaQuery from 'common/hooks/useMediaQuery'

// reward
import { QUERY_REWARDS_LIST } from 'Leaderboard/querys'

import { bigNumberToNumber, downloadFullData, numberWithCommas, shortString } from 'common/helpers'
import { INTERNAL_ROUTES } from 'common/routes'
import VoteBlockRewardListCard from './VoteBlockRewardListCard'

const VoteBlockRewardList = () => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'operator', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const { selectedChain } = useDomains()
  const apolloClient = useApolloClient()

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  const cols = useMemo(
    () => createColumns(selectedChain, pagination, isLargeLaptop),
    [selectedChain, pagination, isLargeLaptop],
  )

  const { data, error, loading } = useQuery(QUERY_REWARDS_LIST, {
    variables: getQueryVariables(sorting, pagination),
    pollInterval: 6000,
  })

  useErrorHandler(error)

  const fullDataDownloader = useCallback(
    () => downloadFullData(apolloClient, QUERY_REWARDS_LIST),
    [apolloClient],
  )

  if (loading) {
    return <Spinner />
  }

  if (selectedChain.title !== 'Gemini 3g' || selectedChain.isDomain) {
    return <NotAllowed />
  }

  const accountRewardsConnection = data.accountRewardsConnection.edges.map(
    (accountRewards) => accountRewards.node,
  )
  const totalCount = data.accountRewardsConnection.totalCount

  const pageCount = Math.floor(totalCount / pagination.pageSize)

  return (
    <div className='w-full flex flex-col align-middle'>
      <div className='w-full flex flex-col sm:mt-0'>
        <div className='rounded my-6'>
          <NewTable
            data={accountRewardsConnection}
            columns={cols}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={setSorting}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={setPagination}
            fullDataDownloader={fullDataDownloader}
            mobileComponent={<MobileComponent accounts={accountRewardsConnection} />}
          />
        </div>
      </div>
    </div>
  )
}

export default VoteBlockRewardList

const createColumns = (selectedChain, pagination, isLargeLaptop) => {
  const newCount = PAGE_SIZE * Number(pagination.pageIndex + 1) - 10

  return [
    {
      header: 'Rank',
      enableSorting: false,
      cell: ({ row }) => {
        return <div>{pagination.pageIndex + 1 > 1 ? newCount + row.index + 1 : row.index + 1}</div>
      },
    },
    {
      accessorKey: 'id',
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
      accessorKey: 'block',
      header: 'Block rewards',
      enableSorting: true,
      cell: ({ row }) => (
        <div>
          {row.original.block
            ? `${numberWithCommas(bigNumberToNumber(row.original.block))} tSSC`
            : 0}
        </div>
      ),
    },
    {
      accessorKey: 'vote',
      header: 'Vote rewards',
      enableSorting: true,
      cell: ({ row }) => (
        <div>
          {row.original.vote ? `${numberWithCommas(bigNumberToNumber(row.original.vote))} tSSC` : 0}
        </div>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Total rewards',
      enableSorting: true,
      cell: ({ row }) => (
        <div>
          {row.original.amount
            ? `${numberWithCommas(bigNumberToNumber(row.original.amount))} tSSC`
            : 0}
        </div>
      ),
    },
  ]
}

const getQueryVariables = (sorting, pagination) => {
  return {
    first: pagination.pageSize,
    after:
      pagination.pageIndex > 0
        ? (pagination.pageIndex * pagination.pageSize).toString()
        : undefined,
    orderBy: sorting.map((s) => `${s.id}_${s.desc ? 'DESC' : 'ASC'}`).join(',') || 'amount_DESC',
  }
}

type MobileComponentProps = {
  accounts: AccountRewards[]
}

const MobileComponent: FC<MobileComponentProps> = ({ accounts }) => (
  <div className='w-full'>
    {accounts.map((account, index) => (
      <VoteBlockRewardListCard
        index={index}
        account={account}
        key={`reward-list-card-${account.id}`}
      />
    ))}
  </div>
)
