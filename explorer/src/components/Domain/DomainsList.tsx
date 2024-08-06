'use client'

import { capitalizeFirstLetter } from '@/utils/string'
import { useApolloClient } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE, TOKEN } from 'constants/'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { DomainsListQuery, DomainsListQueryVariables, Order_By as OrderBy } from 'gql/types/staking'
import useChains from 'hooks/useChains'
import { useConsensusData } from 'hooks/useConsensusData'
import { useDomainsData } from 'hooks/useDomainsData'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { countTablePages } from 'utils/table'
import { Tooltip } from '../common/Tooltip'
import { NotFound } from '../layout/NotFound'
import { QUERY_DOMAIN_LIST } from './staking.query'

type Row = DomainsListQuery['domain'][0]

export const DomainsList: FC = () => {
  const { ref, inView } = useInView()
  const [searchDomain, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'sort_id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const { operatorId } = useParams<{ operatorId?: string }>()
  const { loadData: loadDomainsData } = useDomainsData()
  const { loadData: loadConsensusData } = useConsensusData()
  const inFocus = useWindowFocus()

  useEffect(() => {
    loadDomainsData()
    loadConsensusData()
  }, [loadConsensusData, loadDomainsData])

  const { network, section } = useChains()
  const apolloClient = useApolloClient()

  const columns = useMemo(
    () => [
      {
        accessorKey: 'sort_id',
        header: 'Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.operators.id.page(network, section, row.original.id)}
          >
            <div>{row.original.id}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Domain Name',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div className='row flex items-center gap-3'>
            <Tooltip
              text={
                <span>
                  Runtime: {row.original.runtime} <br />
                  Details: {row.original.runtime_info}
                </span>
              }
            >
              <div>{capitalizeFirstLetter(row.original.name)}</div>
            </Tooltip>
          </div>
        ),
      },
      {
        accessorKey: 'completed_epoch',
        header: 'Completed epoch',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>
            <Tooltip
              text={
                <span>
                  Completed epoch: {row.original.completed_epoch} <br />
                  Last block #: {row.original.last_domain_block_number}
                </span>
              }
            >
              {row.original.completed_epoch}
            </Tooltip>
          </div>
        ),
      },
      {
        accessorKey: 'current_total_stake',
        header: 'Current total stake',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToNumber(row.original.current_total_stake)} ${TOKEN.symbol}`}</div>
        ),
      },
      {
        accessorKey: 'total_deposits',
        header: 'Total deposits',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToNumber(row.original.total_deposits)} ${TOKEN.symbol}`}</div>
        ),
      },
      {
        accessorKey: 'total_rewards_collected',
        header: 'Rewards collected',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToNumber(row.original.total_rewards_collected)} ${TOKEN.symbol}`}</div>
        ),
      },
      {
        accessorKey: 'total_consensus_storage_fee',
        header: 'Consensus storage fee',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToNumber(row.original.total_consensus_storage_fee)} ${TOKEN.symbol}`}</div>
        ),
      },
      {
        accessorKey: 'total_domain_execution_fee',
        header: 'Domain execution fee',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToNumber(row.original.total_domain_execution_fee)} ${TOKEN.symbol}`}</div>
        ),
      },
      {
        accessorKey: 'operators_aggregate',
        header: 'Operators count',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{row.original.operators_aggregate.aggregate?.count ?? 0}</div>
        ),
      },
    ],
    [network, section],
  )

  const orderBy = useMemo(
    () =>
      sorting && sorting.length > 0
        ? sorting[0].id.endsWith('aggregate')
          ? { [sorting[0].id]: sorting[0].desc ? { count: OrderBy.Desc } : { count: OrderBy.Asc } }
          : { [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }
        : { id: OrderBy.Asc },
    [sorting],
  )

  const where = useMemo(() => {
    // eslint-disable-next-line camelcase
    return searchDomain ? { id: { _eq: searchDomain } } : {}
  }, [searchDomain])

  const variables: DomainsListQueryVariables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, where],
  )

  const { setIsVisible } = useSquidQuery<DomainsListQuery, DomainsListQueryVariables>(
    QUERY_DOMAIN_LIST,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
      context: { clientName: 'staking' },
    },
    Routes.domains,
    'domains',
  )

  const {
    domains: { domains },
  } = useQueryStates()

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(
        apolloClient,
        QUERY_DOMAIN_LIST,
        'domain',
        {
          orderBy,
        },
        ['limit', 'offset'],
        { clientName: 'staking' },
      ),
    [apolloClient, orderBy],
  )

  const handleSearch = useCallback((value: string | number) => {
    setSearch(value.toString())
    setPagination({ ...pagination, pageIndex: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const operatorsList = useMemo(() => {
    if (hasValue(domains)) return domains.value.domain
    return []
  }, [domains])

  const totalCount = useMemo(
    () => (hasValue(domains) && domains.value.domain_aggregate.aggregate?.count) || 0,
    [domains],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const noData = useMemo(() => {
    if (isLoading(domains)) return <Spinner isSmall />
    if (!hasValue(domains)) return <NotFound />
    return null
  }, [domains])

  useEffect(() => {
    if (operatorId) handleSearch(operatorId)
  }, [operatorId, handleSearch])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div>
      <div className='text-base font-medium text-grayDark dark:text-white'>{`Domains (${totalLabel})`}</div>
      <div className='my-6 rounded' ref={ref}>
        {operatorsList ? (
          <SortedTable
            data={operatorsList}
            columns={columns}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={setSorting}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={setPagination}
            filename='staking-operators-list'
            fullDataDownloader={fullDataDownloader}
          />
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
