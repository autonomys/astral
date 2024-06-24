'use client'

import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { useApolloClient, useQuery } from '@apollo/client'
import { sendGAEvent } from '@next/third-parties/google'
import { SortingState } from '@tanstack/react-table'
import { DebouncedInput } from 'components/common/DebouncedInput'
import { NewTable } from 'components/common/NewTable'
import { Spinner } from 'components/common/Spinner'
import { Chains, PAGE_SIZE } from 'constants/'
import { INTERNAL_ROUTES } from 'constants/routes'
import type { OperatorsConnectionQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { operatorStatus } from 'utils/operator'
import { sort } from 'utils/sort'
import { capitalizeFirstLetter } from 'utils/string'
import { NotFound } from '../layout/NotFound'
import { ActionsDropdown, ActionsDropdownRow } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import { OperatorsListCard } from './OperatorsListCard'
import { QUERY_OPERATOR_CONNECTION_LIST } from './query'

export const OperatorsList: FC = () => {
  const [searchOperator, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const { subspaceAccount } = useWallet()
  const { operatorId } = useParams<{ operatorId?: string }>()

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
        accessorKey: 'id',
        header: 'Id',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <Link
            data-testid={`operator-link-${row.original.id}-${row.original.signingKey}-${row.index}}`}
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.operators.id.page(
              selectedChain.urls.page,
              selectedDomain,
              row.original.id,
            )}
          >
            <div>{row.original.id}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'currentDomainId',
        header: 'Domain',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{row.original.currentDomainId === 0 ? 'Subspace' : 'Nova'}</div>
        ),
      },
      {
        accessorKey: 'signingKey',
        header: 'Signing Key',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div className='row flex items-center gap-3'>
            <div>{shortString(row.original.signingKey)}</div>
          </div>
        ),
      },
      {
        accessorKey: 'minimumNominatorStake',
        header: 'Min. Stake',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{`${bigNumberToNumber(row.original.minimumNominatorStake)} ${selectedChain.token.symbol}`}</div>
        ),
      },
      {
        accessorKey: 'nominationTax',
        header: 'Nominator Tax',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{`${row.original.nominationTax}%`}</div>
        ),
      },
      {
        accessorKey: 'currentTotalStake',
        header: 'Total Stake',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{`${bigNumberToNumber(row.original.currentTotalStake)} ${selectedChain.token.symbol}`}</div>
        ),
      },
      {
        accessorKey: 'totalShares',
        header: 'Total Shares',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{numberWithCommas(row.original.totalShares)}</div>
        ),
      },
      {
        accessorKey: 'nominators',
        header: 'Nominators',
        enableSorting: false,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{`${row.original.nominators ? row.original.nominators.length : 0}`}</div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>
            {selectedChain.urls.page === Chains.gemini3g
              ? row.original.status
              : capitalizeFirstLetter(operatorStatus(row.original.status))}
          </div>
        ),
      },
    ]
    if (subspaceAccount)
      cols.push({
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => {
          const nominator = row.original.nominators.find(
            (nominator) => nominator.id === `${row.original.id}-${subspaceAccount}`,
          )
          return (
            <ActionsDropdown
              action={action}
              handleAction={handleAction}
              row={row as ActionsDropdownRow}
              excludeActions={
                nominator
                  ? [OperatorActionType.Deregister]
                  : [
                      OperatorActionType.Deregister,
                      OperatorActionType.Withdraw,
                      OperatorActionType.UnlockFunds,
                    ]
              }
              nominatorMaxShares={nominator && BigInt(nominator.shares)}
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
      where: searchOperator ? { id_eq: searchOperator } : {},
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, searchOperator],
  )

  const { data, error, loading } = useQuery<OperatorsConnectionQuery>(
    QUERY_OPERATOR_CONNECTION_LIST,
    {
      variables: variables,
      pollInterval: 6000,
    },
  )

  useErrorHandler(error)

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, QUERY_OPERATOR_CONNECTION_LIST, 'operatorsConnection', {
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

  const operators = useMemo(() => data && data.operatorsConnection, [data])
  const operatorsConnection = useMemo(
    () => operators && operators.edges.map((operator) => operator.node),
    [operators],
  )
  const totalCount = useMemo(() => (operators ? operators.totalCount : 0), [operators])
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  useEffect(() => {
    if (operatorId) handleSearch(operatorId)
  }, [operatorId, handleSearch])

  if (loading) return <Spinner />
  if (!operatorsConnection) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex flex-col gap-2'>
        <div className='mt-5 flex w-full justify-between'>
          <div className='text-base font-medium text-grayDark dark:text-white'>{`Operators (${totalLabel})`}</div>
        </div>
        <DebouncedInput
          type='text'
          className='block w-full max-w-xl rounded-3xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white'
          placeholder='Search by operator id'
          onChange={handleSearch}
          value={searchOperator}
        />
      </div>

      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <div className='my-6 rounded'>
          <NewTable
            data={operatorsConnection}
            columns={columns}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={setSorting}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={setPagination}
            filename='operators-operators-list'
            pageSizeOptions={[10]}
            fullDataDownloader={fullDataDownloader}
            mobileComponent={
              <MobileComponent
                operators={operatorsConnection}
                action={action}
                handleAction={handleAction}
                subspaceAccount={subspaceAccount}
              />
            }
          />
        </div>
      </div>
      <ActionsModal isOpen={isOpen} action={action} onClose={handleActionClose} />
    </div>
  )
}

type MobileComponentProps = {
  operators: OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node'][]
  action: OperatorAction
  handleAction: (value: OperatorAction) => void
  subspaceAccount?: string
}

const MobileComponent: FC<MobileComponentProps> = ({
  operators,
  action,
  handleAction,
  subspaceAccount,
}) => (
  <div className='w-full'>
    {operators.map((operator, index) => {
      const nominator =
        subspaceAccount &&
        operator.nominators.find(
          (nominator) => nominator.id === `${operator.id}-${subspaceAccount}`,
        )
      return (
        <OperatorsListCard
          key={`operator-list-card-${operator.id}`}
          operator={operator}
          action={action}
          handleAction={handleAction}
          index={index}
          excludeActions={
            nominator
              ? [OperatorActionType.Deregister, OperatorActionType.UnlockOperator]
              : [
                  OperatorActionType.Deregister,
                  OperatorActionType.Withdraw,
                  OperatorActionType.UnlockFunds,
                  OperatorActionType.UnlockOperator,
                ]
          }
          nominatorMaxShares={nominator ? BigInt(nominator.shares) : undefined}
        />
      )
    })}
  </div>
)
