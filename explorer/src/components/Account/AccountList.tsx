'use client'

import { PAGE_SIZE, searchTypes } from '@/constants'
import { useQuery } from '@apollo/client'
import { ExportButton } from 'components/common/ExportButton'
import { Pagination } from 'components/common/Pagination'
import { SearchBar } from 'components/common/SearchBar'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import type { Account, AccountsConnectionQuery } from 'gql/graphql'
import { FC, useCallback, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { numberWithCommas } from 'utils/number'
import { AccountTable } from './AccountTable'
import { QUERY_ACCOUNT_CONNECTION_LIST } from './query'

export const AccountList: FC = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)

  const { data, error, loading } = useQuery<AccountsConnectionQuery>(
    QUERY_ACCOUNT_CONNECTION_LIST,
    {
      variables: { first: PAGE_SIZE, after: lastCursor },
      pollInterval: 6000,
    },
  )

  useErrorHandler(error)

  const accountsConnection = useMemo(() => data && data.accountsConnection, [data])
  const accounts = useMemo(
    () => accountsConnection && accountsConnection.edges.map((account) => account.node as Account),
    [accountsConnection],
  )
  const totalCount = useMemo(
    () => accountsConnection && accountsConnection.totalCount,
    [accountsConnection],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const pageInfo = useMemo(() => data && data.accountsConnection.pageInfo, [data])

  const handleNextPage = useCallback(() => {
    if (!pageInfo) return
    setCurrentPage((prev) => prev + 1)
    setLastCursor(pageInfo.endCursor)
  }, [pageInfo])

  const handlePreviousPage = useCallback(() => {
    if (!pageInfo) return
    setCurrentPage((prev) => prev - 1)
    setLastCursor(pageInfo.endCursor)
  }, [pageInfo])

  const onChange = useCallback((page: number) => {
    setCurrentPage(Number(page))

    const newCount = page > 0 ? PAGE_SIZE * Number(page + 1) : PAGE_SIZE
    const endCursor = newCount - PAGE_SIZE

    if (endCursor === 0 || endCursor < 0) {
      return setLastCursor(undefined)
    }
    setLastCursor(endCursor.toString())
  }, [])

  if (loading) return <Spinner />
  if (!data || !accounts) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='grid w-full lg:grid-cols-2'>
        <SearchBar fixSearchType={searchTypes[3]} />
      </div>
      <div className='mt-5 flex w-full justify-between'>
        <div className='text-base font-medium text-[#282929] dark:text-white'>{`Holders (${totalLabel})`}</div>
      </div>
      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <AccountTable accounts={accounts} page={currentPage} />
        <div className='flex w-full justify-between gap-2'>
          <ExportButton data={accounts} filename='account-list' />
          {totalCount && pageInfo && (
            <Pagination
              nextPage={handleNextPage}
              previousPage={handlePreviousPage}
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              totalCount={totalCount}
              hasNextPage={pageInfo.hasNextPage}
              hasPreviousPage={pageInfo.hasPreviousPage}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}
