'use client'

import { bigNumberToNumber, limitNumberDecimals, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { useApolloClient, useQuery } from '@apollo/client'
import { sendGAEvent } from '@next/third-parties/google'
import { SortingState } from '@tanstack/react-table'
import { NewTable } from 'components/common/NewTable'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Chains, PAGE_SIZE } from 'constants/'
import { INTERNAL_ROUTES } from 'constants/routes'
import type { NominatorsConnectionQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { OperatorIdParam } from 'types/app'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { operatorStatus } from 'utils/operator'
import { sort } from 'utils/sort'
import { capitalizeFirstLetter } from 'utils/string'
import { ActionsDropdown, ActionsDropdownRow } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import { QUERY_NOMINATOR_CONNECTION_LIST } from './query'

export const NominatorsList: FC = () => {
  const [searchNominator, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const { subspaceAccount } = useWallet()
  const { operatorId } = useParams<OperatorIdParam>()

  const [action, setAction] = useState<OperatorAction>({
    type: OperatorActionType.None,
    operatorId: operatorId ? parseInt(operatorId) : null,
    maxShares: null,
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleAction = useCallback((value: OperatorAction) => {
    setAction(value)
    if (value.type !== OperatorActionType.None) setIsOpen(true)
    sendGAEvent({
      event: 'initialize_staking_action',
      value: `action:${value.toString()}`,
    })
  }, [])
  const handleActionClose = useCallback(() => {
    setIsOpen(false)
    setAction({ type: OperatorActionType.None, operatorId: null, maxShares: null })
  }, [])

  const { selectedChain, selectedDomain } = useDomains()
  const apolloClient = useApolloClient()

  const columns = useMemo(() => {
    const cols = [
      {
        accessorKey: 'nominator',
        header: 'Nominator',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<NominatorsConnectionQuery['nominatorsConnection']['edges'][0]['node']>) => (
          <Link
            data-testid={`operator-link-${row.original.id}`}
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.accounts.id.page(
              selectedChain.urls.page,
              'consensus',
              row.original.account.id,
            )}
          >
            <div>{shortString(row.original.account.id)}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'currentDomainId',
        header: 'Domain',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<NominatorsConnectionQuery['nominatorsConnection']['edges'][0]['node']>) => (
          <div>{row.original.operator.currentDomainId === 0 ? 'Subspace' : 'Nova'}</div>
        ),
      },
      {
        accessorKey: 'operatorId',
        header: 'OperatorId',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<NominatorsConnectionQuery['nominatorsConnection']['edges'][0]['node']>) => (
          <div className='row flex items-center gap-3'>
            <Link
              data-testid={`nominator-link-${row.original.id}`}
              className='hover:text-purpleAccent'
              href={INTERNAL_ROUTES.operators.id.page(
                selectedChain.urls.page,
                selectedDomain,
                row.original.operator.id,
              )}
            >
              <div>{row.original.operator.id}</div>
            </Link>
          </div>
        ),
      },
      {
        accessorKey: 'stakes',
        header: 'Stakes',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<NominatorsConnectionQuery['nominatorsConnection']['edges'][0]['node']>) => (
          <div>
            {numberWithCommas(
              limitNumberDecimals(
                Number(
                  Number(
                    (BigInt(row.original.operator.currentTotalStake) /
                      BigInt(row.original.operator.totalShares)) *
                      BigInt(row.original.shares),
                  ) /
                    10 ** 18,
                ),
              ),
            )}{' '}
            {selectedChain.token.symbol}
          </div>
        ),
      },
      {
        accessorKey: 'shares',
        header: 'Shares',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<NominatorsConnectionQuery['nominatorsConnection']['edges'][0]['node']>) => (
          <div>
            {numberWithCommas(
              limitNumberDecimals(
                Number(
                  Number(
                    (BigInt(row.original.shares) * BigInt(1000000000)) /
                      BigInt(row.original.operator.totalShares),
                  ) / 1000000000,
                ),
              ),
            )}{' '}
            %
          </div>
        ),
      },
      {
        accessorKey: 'minimumNominatorStake',
        header: 'Min. Stake',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<NominatorsConnectionQuery['nominatorsConnection']['edges'][0]['node']>) => (
          <div>{`${bigNumberToNumber(row.original.operator.minimumNominatorStake)} ${selectedChain.token.symbol}`}</div>
        ),
      },
      {
        accessorKey: 'nominationTax',
        header: 'Nominator Tax',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<NominatorsConnectionQuery['nominatorsConnection']['edges'][0]['node']>) => (
          <div>{`${row.original.operator.nominationTax}%`}</div>
        ),
      },
      {
        accessorKey: 'currentTotalStake',
        header: 'Total Stake',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<NominatorsConnectionQuery['nominatorsConnection']['edges'][0]['node']>) => (
          <div>{`${bigNumberToNumber(row.original.operator.currentTotalStake)} ${selectedChain.token.symbol}`}</div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<NominatorsConnectionQuery['nominatorsConnection']['edges'][0]['node']>) => (
          <div>
            {selectedChain.urls.page === Chains.gemini3g
              ? row.original.operator.status
              : capitalizeFirstLetter(operatorStatus(row.original.operator.status))}
          </div>
        ),
      },
    ]
    if (subspaceAccount)
      cols.push({
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => {
          if (row.original.account.id !== subspaceAccount) return <> </>
          return (
            <ActionsDropdown
              action={action}
              handleAction={handleAction}
              row={
                {
                  ...row,
                  original: {
                    ...row.original,
                    totalShares: row.original.shares,
                  },
                } as ActionsDropdownRow
              }
              excludeActions={[OperatorActionType.Deregister, OperatorActionType.UnlockFunds]}
              nominatorMaxShares={BigInt(row.original.shares)}
            />
          )
        },
      })
    return cols
  }, [
    subspaceAccount,
    selectedChain.urls.page,
    selectedChain.token.symbol,
    selectedDomain,
    action,
    handleAction,
  ])

  const orderBy = useMemo(() => sort(sorting, 'id_ASC'), [sorting])

  const variables = useMemo(
    () => ({
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
      orderBy,
      // eslint-disable-next-line camelcase
      where: searchNominator ? { account: { id_eq: searchNominator } } : {},
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, searchNominator],
  )

  const { data, error, loading } = useQuery<NominatorsConnectionQuery>(
    QUERY_NOMINATOR_CONNECTION_LIST,
    {
      variables: variables,
      pollInterval: 6000,
    },
  )

  useErrorHandler(error)

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, QUERY_NOMINATOR_CONNECTION_LIST, 'nominatorsConnection', {
        first: 10,
        orderBy,
      }),
    [apolloClient, orderBy],
  )

  const handleSearch = useCallback((value: string | number) => {
    setSearch(value.toString())
    setPagination({ ...pagination, pageIndex: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const nominators = useMemo(() => data && data.nominatorsConnection, [data])
  const nominatorsConnection = useMemo(
    () => nominators && nominators.edges.map((nominator) => nominator.node),
    [nominators],
  )
  const totalCount = useMemo(() => (nominators ? nominators.totalCount : 0), [nominators])
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  useEffect(() => {
    if (operatorId) handleSearch(operatorId)
  }, [operatorId, handleSearch])

  if (loading) return <Spinner />
  if (!data || !nominatorsConnection) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex flex-col gap-2'>
        <div className='mt-5 flex w-full justify-between'>
          <div className='text-base font-medium text-grayDark dark:text-white'>{`Nominators (${totalLabel})`}</div>
        </div>
      </div>

      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <div className='my-6 rounded'>
          <NewTable
            data={nominatorsConnection}
            columns={columns}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={setSorting}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={setPagination}
            pageSizeOptions={[10]}
            filename='operators-nominators-list'
            fullDataDownloader={fullDataDownloader}
          />
        </div>
      </div>
      <ActionsModal isOpen={isOpen} action={action} onClose={handleActionClose} />
    </div>
  )
}
