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
import useMediaQuery from 'hooks/useMediaQuery'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { operatorStatus } from 'utils/operator'
import { sort } from 'utils/sort'
import { capitalizeFirstLetter } from 'utils/string'
import { ActionsDropdown, ActionsDropdownRow } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import { QUERY_NOMINATOR_CONNECTION_LIST } from './query'

export const NominationManagement: FC = () => {
  const [searchNominator, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const { subspaceAccount } = useWallet()
  const { selectedChain, selectedDomain } = useDomains()
  const apolloClient = useApolloClient()

  const [action, setAction] = useState<OperatorAction>({
    type: OperatorActionType.None,
    operatorId: null,
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
            data-testid={`nominator-link-${row.original.id}`}
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
            tSSC
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
          <div>{`${bigNumberToNumber(row.original.operator.minimumNominatorStake)} tSSC`}</div>
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
          <div>{`${bigNumberToNumber(row.original.operator.currentTotalStake)} tSSC`}</div>
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
      {
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({
          row,
        }: Cell<NominatorsConnectionQuery['nominatorsConnection']['edges'][0]['node']>) => (
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
            excludeActions={[OperatorActionType.Deregister, OperatorActionType.UnlockOperator]}
            nominatorMaxShares={BigInt(row.original.shares)}
          />
        ),
      },
    ]
    return cols
  }, [selectedChain.urls.page, selectedDomain, action, handleAction])

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

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value)
      setPagination({ ...pagination, pageIndex: 0 })
    },
    [pagination],
  )

  const nominators = useMemo(
    () => data && data.nominatorsConnection && data.nominatorsConnection,
    [data],
  )
  const nominatorsConnection = useMemo(
    () => nominators && nominators.edges.map((nominator) => nominator.node),
    [nominators],
  )
  const totalCount = useMemo(() => (nominators ? nominators.totalCount : 0), [nominators])
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const totalInStake = useMemo(
    () =>
      nominatorsConnection
        ? nominatorsConnection
            .reduce(
              (acc, nominator) =>
                acc +
                (BigInt(nominator.operator.currentTotalStake) /
                  BigInt(nominator.operator.totalShares)) *
                  BigInt(nominator.shares),
              BigInt(0),
            )
            .toString()
        : '0',
    [nominatorsConnection],
  )

  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  useEffect(() => {
    if (subspaceAccount) handleSearch(subspaceAccount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subspaceAccount])

  if (loading) return <Spinner />
  if (!subspaceAccount || !nominatorsConnection) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex flex-col gap-2'>
        <div className='mt-5 flex w-full justify-between'>
          <div
            className={`text-grayDarker ${
              isDesktop ? 'text-4xl' : 'text-xl'
            } font-bold leading-tight tracking-tight dark:text-white`}
          >
            Operator Nomination
          </div>
        </div>
        <div
          className={`text-grayDarker ${
            isDesktop ? 'text-2xl' : 'text-lg'
          } mt-4 font-bold leading-tight tracking-tight dark:text-white`}
        >
          Information across nominations
          {subspaceAccount && (
            <div className="dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset mt-4 flex items-center rounded-lg bg-white p-4 font-['Montserrat'] text-sm dark:border-none dark:bg-gradient-to-r">
              <svg
                className='me-3 inline h-4 w-4 flex-shrink-0'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
              </svg>
              <span className='sr-only'>Info</span>
              <div>
                <span className='font-medium'>For account {subspaceAccount}</span>
              </div>
            </div>
          )}
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
            filename='operators-nomination-management-list'
            fullDataDownloader={fullDataDownloader}
          />
        </div>
      </div>

      <div className='bg-grayLight dark:bg-blueDarkAccent mt-8 rounded-[20px] p-5'>
        <div className='ml-4 w-full'>
          <div className='relative'>
            <div className={`grid ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'} gap-4`}>
              <div className='p-4'>
                <span
                  className={`text-grayDarker ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  Number of Nomination
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-grayDarker ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  {totalLabel}
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-grayDarker ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  Funds in Stake
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-grayDarker ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  {bigNumberToNumber(totalInStake)} tSSC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ActionsModal isOpen={isOpen} action={action} onClose={handleActionClose} />
    </div>
  )
}

export default NominationManagement
