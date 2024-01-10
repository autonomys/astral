/* eslint-disable camelcase */
import { useQuery } from '@apollo/client'
import { FC, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useParams } from 'react-router-dom'

// account
import { AccountDetailsCard, AccountRewardTable } from 'Account/components'
import { QUERY_REWARDS_LIST } from 'Account/query'

// common
import { Spinner } from 'common/components'

import { SortingState } from '@tanstack/react-table'
import { PAGE_SIZE } from 'common/constants'
import { numberWithCommas } from 'common/helpers'
import { formatAddress } from 'common/helpers/formatAddress'

const AccountRewardList: FC = () => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const { accountId } = useParams<{ accountId?: string }>()

  const { data, error, loading } = useQuery(QUERY_REWARDS_LIST, {
    variables: {
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
      accountId: accountId,
      sortBy: sorting.length
        ? sorting.map((s) => `${s.id}_${s.desc ? 'DESC' : 'ASC'}`).join(',')
        : 'id_DESC',
    },
  })

  useErrorHandler(error)

  if (loading) {
    return <Spinner />
  }

  const rewards = data.rewardEventsConnection.edges.map((reward) => reward.node)
  const totalCount = data.rewardEventsConnection.totalCount
  const totalLabel = numberWithCommas(Number(totalCount))

  const account = rewards[0].account
  const convertedAddress = formatAddress(account.id) || ''
  const pageCount = Math.floor(totalCount / pagination.pageSize)

  return (
    <div className='w-full flex flex-col align-middle'>
      <AccountDetailsCard account={account} accountAddress={convertedAddress} />

      <div className='w-full flex justify-between mt-5'>
        <div className='text-[#282929] text-base font-medium dark:text-white'>{`Rewards (${totalLabel})`}</div>
      </div>
      <div className='w-full flex flex-col mt-5 sm:mt-0'></div>
      <div className='w-full flex flex-col mt-5 sm:mt-0'>
        <AccountRewardTable
          rewards={rewards}
          sorting={sorting}
          pageCount={pageCount}
          setSorting={setSorting}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  )
}

export default AccountRewardList
