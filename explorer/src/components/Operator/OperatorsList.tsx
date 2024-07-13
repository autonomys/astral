'use client'

import { useApolloClient } from '@apollo/client'
import { sendGAEvent } from '@next/third-parties/google'
import { SortingState } from '@tanstack/react-table'
import { DebouncedInput } from 'components/common/DebouncedInput'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { Chains, PAGE_SIZE } from 'constants/'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  OperatorOrderByInput,
  OperatorsConnectionQuery,
  OperatorsConnectionQueryVariables,
} from 'gql/oldSquidTypes'
import useDomains from 'hooks/useDomains'
import { useDomainsData } from 'hooks/useDomainsData'
import { useSquidQuery } from 'hooks/useSquidQuery'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDomainsStates } from 'states/domains'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { operatorStatus } from 'utils/operator'
import { sort } from 'utils/sort'
import { capitalizeFirstLetter, shortString } from 'utils/string'
import { countTablePages } from 'utils/table'
import { AccountIcon } from '../common/AccountIcon'
import { Tooltip } from '../common/Tooltip'
import { NotFound } from '../layout/NotFound'
import { ActionsDropdown, ActionsDropdownRow } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import { QUERY_OPERATOR_CONNECTION_LIST } from './query'

export const OperatorsList: FC = () => {
  const { ref, inView } = useInView()
  const [searchOperator, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const { subspaceAccount } = useWallet()
  const { operatorId } = useParams<{ operatorId?: string }>()
  const { domains } = useDomainsStates()
  const { loadData: loadDomainsData } = useDomainsData()
  const inFocus = useWindowFocus()

  useEffect(() => {
    if (!domains || domains.length === 0) loadDomainsData()
  }, [domains, loadDomainsData])

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
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => {
          const domain = domains.find(
            (d) =>
              (row.original.currentDomainId || row.original.currentDomainId === 0) &&
              d.domainId === row.original.currentDomainId.toString(),
          )
          return (
            <div>
              {domain
                ? domain.domainName.charAt(0).toUpperCase() + domain.domainName.slice(1)
                : '#' + row.original.currentDomainId}
            </div>
          )
        },
      },
      {
        accessorKey: 'signingKey',
        header: 'Signing Key',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div className='row flex items-center gap-3'>
            {row.original.operatorOwner === subspaceAccount && (
              <Tooltip text='You are the operator'>
                <AccountIcon address={row.original.operatorOwner} size={26} />
              </Tooltip>
            )}
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
        accessorKey: 'nominators',
        header: 'Nominators',
        enableSorting: false,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{row.original.nominators ? row.original.nominators.length : 0}</div>
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
          const isOperator = row.original.operatorOwner === subspaceAccount
          const nominator = row.original.nominators.find(
            (nominator) => nominator.id === `${row.original.id}-${subspaceAccount}`,
          )
          const excludeActions = []
          if (!isOperator)
            excludeActions.push(OperatorActionType.Deregister, OperatorActionType.UnlockFunds)
          if (!nominator)
            excludeActions.push(OperatorActionType.Withdraw, OperatorActionType.UnlockNominator)
          if (
            !nominator &&
            row.original.status &&
            (JSON.parse(row.original.status) as unknown as { deregistered: object }).deregistered
          )
            return <></>
          return (
            <ActionsDropdown
              action={action}
              handleAction={handleAction}
              row={row as ActionsDropdownRow}
              excludeActions={excludeActions}
              nominatorMaxShares={nominator && BigInt(nominator.shares)}
            />
          )
        },
      })
    return cols
  }, [
    subspaceAccount,
    domains,
    selectedChain.urls.page,
    selectedChain.token.symbol,
    selectedDomain,
    action,
    handleAction,
  ])

  const orderBy = useMemo(
    () => sort(sorting, OperatorOrderByInput.IdAsc) as OperatorOrderByInput,
    [sorting],
  )

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

  const { setIsVisible } = useSquidQuery<
    OperatorsConnectionQuery,
    OperatorsConnectionQueryVariables
  >(
    QUERY_OPERATOR_CONNECTION_LIST,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.staking,
    'operators',
  )

  const {
    staking: { operators },
  } = useQueryStates()

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

  const operatorsConnection = useMemo(
    () =>
      hasValue(operators) &&
      operators.value.operatorsConnection.edges.map((operator) => operator.node),
    [operators],
  )
  const totalCount = useMemo(
    () => (hasValue(operators) ? operators.value.operatorsConnection.totalCount : 0),
    [operators],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const noData = useMemo(() => {
    if (isLoading(operators)) return <Spinner isSmall />
    if (!hasValue(operators)) return <NotFound />
    return null
  }, [operators])

  useEffect(() => {
    if (operatorId) handleSearch(operatorId)
  }, [operatorId, handleSearch])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

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
        <div className='my-6 rounded' ref={ref}>
          {operatorsConnection ? (
            <SortedTable
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
            />
          ) : (
            noData
          )}
        </div>
      </div>
      <ActionsModal isOpen={isOpen} action={action} onClose={handleActionClose} />
    </div>
  )
}
