'use client'

import { useApolloClient } from '@apollo/client'
import { sendGAEvent } from '@next/third-parties/google'
import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Chains, PAGE_SIZE } from 'constants/'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  OperatorOrderByInput,
  OperatorsConnectionQuery,
  OperatorsConnectionQueryVariables,
} from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import { useDomainsData } from 'hooks/useDomainsData'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useConsensusStates } from 'states/consensus'
import { useDomainsStates } from 'states/domains'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useViewStates } from 'states/view'
import { Operators } from 'types/consensus'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { operatorReadyToUnlock, operatorStatus } from 'utils/operator'
import { sort } from 'utils/sort'
import { capitalizeFirstLetter, shortString } from 'utils/string'
import { countTablePages } from 'utils/table'
import { Switch } from '../common/Switch'
import { ActionsDropdown, ActionsDropdownRow } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import { QUERY_OPERATOR_CONNECTION_LIST } from './query'

export const OperatorManagement: FC = () => {
  const { ref, inView } = useInView()
  const [searchOperator, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const inFocus = useWindowFocus()
  const { useRpcData, setUseRpcData } = useViewStates()

  const { subspaceAccount } = useWallet()
  const { operators: rpcOperators } = useConsensusStates()
  const { domains } = useDomainsStates()
  const { loadData: loadDomainsData } = useDomainsData()
  const { selectedChain, selectedDomain } = useDomains()
  const apolloClient = useApolloClient()

  const [action, setAction] = useState<OperatorAction>({
    type: OperatorActionType.None,
    operatorId: null,
    maxShares: null,
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!domains || domains.length === 0) loadDomainsData()
  }, [domains, loadDomainsData])

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
      where: searchOperator ? { operatorOwner_eq: searchOperator } : {},
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
    'manageOperators',
  )

  const {
    staking: { manageOperators },
  } = useQueryStates()

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, QUERY_OPERATOR_CONNECTION_LIST, 'operatorsConnection', {
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

  const lastBlock = useMemo(
    () =>
      hasValue(manageOperators) && manageOperators.value.lastBlock
        ? (manageOperators.value.lastBlock[0].height as number)
        : 0,
    [manageOperators],
  )
  const operators = useMemo(
    () => hasValue(manageOperators) && manageOperators.value.operatorsConnection,
    [manageOperators],
  )
  const operatorsConnection = useMemo(() => {
    if (useRpcData)
      return rpcOperators
        .map((operator) => ({
          ...operator,
          nominators: [],
          totalShares: operator.currentTotalShares,
        }))
        .filter((operator) => operator.operatorOwner === subspaceAccount)
    if (hasValue(manageOperators) && manageOperators.value.operatorsConnection.edges)
      return manageOperators.value.operatorsConnection.edges.map((operator) => operator.node)
    return []
  }, [manageOperators, rpcOperators, subspaceAccount, useRpcData])
  const totalCount = useMemo(() => (operators ? operators.totalCount : 0), [operators])
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const totalNominators = useMemo(
    () =>
      operators && operators.edges
        ? operators.edges.reduce((acc, operator) => acc + operator.node.nominators.length, 0)
        : 0,
    [operators],
  )
  const totalOperatorStake = useMemo(
    () =>
      operators && operators.edges
        ? operators.edges
            .reduce((acc, operator) => acc + BigInt(operator.node.currentTotalStake), BigInt(0))
            .toString()
        : '0',
    [operators],
  )
  const totalNominatorsStake = useMemo(
    () =>
      operators && operators.edges
        ? operators.edges
            .reduce((acc, operator) => {
              const nominators = operator.node.nominators
              const totalShares = operator.node.totalShares
              const currentTotalStake = operator.node.currentTotalStake
              const subTotalNominatorsShares = nominators.reduce((acc, nominator) => {
                if (nominator.id === `${operator.node.id}-${operator.node.operatorOwner}`)
                  return acc
                return acc + BigInt(nominator.shares)
              }, BigInt(0))
              const subTotalNominatorsStake =
                totalShares === '0'
                  ? BigInt(0)
                  : (BigInt(currentTotalStake) * BigInt(subTotalNominatorsShares)) /
                    BigInt(totalShares)
              return acc + subTotalNominatorsStake
            }, BigInt(0))
            .toString()
        : '0',
    [operators],
  )
  const totalInStake = useMemo(
    () => (BigInt(totalOperatorStake) + BigInt(totalNominatorsStake)).toString(),
    [totalOperatorStake, totalNominatorsStake],
  )

  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const columns = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: 'Id',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<
          OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node'] | Operators
        >) => (
          <Link
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.operators.id.page(
              selectedChain.urls.page,
              selectedDomain,
              typeof row.original.id,
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
        }: Cell<
          OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node'] | Operators
        >) => {
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
        cell: ({ row }) => (
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
        }: Cell<
          OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node'] | Operators
        >) => (
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
        }: Cell<
          OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node'] | Operators
        >) => (
          <div>{`${bigNumberToNumber(row.original.currentTotalStake)} ${selectedChain.token.symbol}`}</div>
        ),
      },
      {
        accessorKey: 'nominators',
        header: 'Nominators',
        enableSorting: false,
        cell: ({
          row,
        }: Cell<
          OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node'] | Operators
        >) => (
          <div>
            {!useRpcData &&
            (row.original as OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node'])
              .nominators
              ? (
                  row.original as OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']
                ).nominators.length
              : 0}
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<
          OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node'] | Operators
        >) => (
          <div>
            {selectedChain.urls.page === Chains.gemini3g
              ? row.original.status
              : capitalizeFirstLetter(operatorStatus(row.original.status, lastBlock))}
          </div>
        ),
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({
          row,
        }: Cell<
          OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node'] | Operators
        >) => (
          <ActionsDropdown
            action={action}
            handleAction={handleAction}
            row={row as ActionsDropdownRow}
            excludeActions={
              operatorReadyToUnlock(row.original.status, lastBlock)
                ? [OperatorActionType.Deregister, OperatorActionType.UnlockNominator]
                : [OperatorActionType.UnlockFunds, OperatorActionType.UnlockFunds]
            }
          />
        ),
      },
    ]
  }, [
    selectedChain.urls.page,
    selectedChain.token.symbol,
    selectedDomain,
    domains,
    useRpcData,
    lastBlock,
    action,
    handleAction,
  ])

  const noData = useMemo(() => {
    if (isLoading(manageOperators)) return <Spinner isSmall />
    if (!hasValue(manageOperators)) return <NotFound />
    return null
  }, [manageOperators])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSwitchDataSource = useCallback(() => setUseRpcData(!useRpcData), [useRpcData])

  useEffect(() => {
    if (subspaceAccount) handleSearch(subspaceAccount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subspaceAccount])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex flex-col gap-2'>
        <div className='mt-5 flex w-full justify-between'>
          <div
            className={`text-grayDarker ${
              isDesktop ? 'text-4xl' : 'text-xl'
            } font-bold leading-tight tracking-tight dark:text-white`}
          >
            Pool operator
          </div>
        </div>
        <div className='flex items-center'>
          <div className='mr-4 flex items-center'>
            <div className='w-40'>
              <Switch
                title='Toggle Data Source'
                checked={useRpcData}
                onChange={handleSwitchDataSource}
              />
              <span className='ml-2 text-sm text-grayDark dark:text-white'>
                {useRpcData ? 'RPC Data' : 'Indexed Data'}
              </span>
            </div>
          </div>
          <div
            className={`text-grayDarker ${
              isDesktop ? 'text-2xl' : 'text-lg'
            } mt-4 font-bold leading-tight tracking-tight dark:text-white`}
          >
            Information across operators
            {subspaceAccount && (
              <span
                className={`text-base ${
                  isDesktop ? 'text-base' : 'text-xs'
                } ml-2 font-normal dark:text-blueAccent`}
              >
                on Account {subspaceAccount}
              </span>
            )}
          </div>
        </div>
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
              fullDataDownloader={fullDataDownloader}
              pageSizeOptions={[10]}
              filename='operators-operator-management-list'
            />
          ) : (
            noData
          )}
        </div>
      </div>

      <div className='mt-8 rounded-[20px] bg-grayLight p-5 dark:bg-blueDarkAccent'>
        <div className='ml-4 w-full'>
          <div className='relative'>
            <div className={`grid ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'} gap-4`}>
              <div className='p-4'>
                <span
                  className={`text-grayDarker ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  Number of Operators
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
                  Number of Nominators
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-grayDarker ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  {totalNominators}
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
                  {bigNumberToNumber(totalInStake)} {selectedChain.token.symbol}
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-grayDarker ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  Available for Withdrawal
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-grayDarker ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  {bigNumberToNumber(totalOperatorStake)} {selectedChain.token.symbol}*
                </span>
              </div>

              <div className='p-4'>
                <span
                  className={`text-grayDarker ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  Operator funds
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-grayDarker ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  {bigNumberToNumber(totalOperatorStake)} {selectedChain.token.symbol}
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-grayDarker ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  Nominator funds
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-grayDarker ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  {bigNumberToNumber(totalNominatorsStake)} {selectedChain.token.symbol}
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
