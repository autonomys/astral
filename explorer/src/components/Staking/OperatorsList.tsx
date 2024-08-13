'use client'

import { useApolloClient } from '@apollo/client'
import { sendGAEvent } from '@next/third-parties/google'
import { SortingState } from '@tanstack/react-table'
import { DebouncedInput } from 'components/common/DebouncedInput'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { BIGINT_ZERO, PAGE_SIZE, SHARES_CALCULATION_MULTIPLIER, TOKEN } from 'constants/'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  OperatorsListQuery,
  OperatorsListQueryVariables,
  Order_By as OrderBy,
} from 'gql/types/staking'
import useChains from 'hooks/useChains'
import { useConsensusData } from 'hooks/useConsensusData'
import { useDomainsData } from 'hooks/useDomainsData'
import { useSquidQuery } from 'hooks/useSquidQuery'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useConsensusStates } from 'states/consensus'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useViewStates } from 'states/view'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { operatorStatus } from 'utils/operator'
import { capitalizeFirstLetter, shortString } from 'utils/string'
import { countTablePages } from 'utils/table'
import { AccountIcon } from '../common/AccountIcon'
import { MyPositionSwitch } from '../common/MyPositionSwitch'
import { Tooltip } from '../common/Tooltip'
import { NotFound } from '../layout/NotFound'
import { ActionsDropdown, ActionsDropdownRow } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import { MyPendingWithdrawals, MyUnlockedWithdrawals } from './MyWithdrawals'
import { QUERY_OPERATOR_LIST } from './staking.query'

type Row = OperatorsListQuery['operator'][0] & { nominatorsCount: number }

export const OperatorsList: FC = () => {
  const { ref, inView } = useInView()
  const [searchOperator, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'sort_id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const { subspaceAccount } = useWallet()
  const { operatorId } = useParams<{ operatorId?: string }>()
  const { operators: rpcOperators, domainRegistry, deposits, withdrawals } = useConsensusStates()
  const { loadData: loadDomainsData } = useDomainsData()
  const { loadData: loadConsensusData } = useConsensusData()
  const inFocus = useWindowFocus()
  const { myPositionOnly } = useViewStates()

  useEffect(() => {
    loadDomainsData()
    loadConsensusData()
  }, [loadConsensusData, loadDomainsData])

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

  const { network, section } = useChains()
  const apolloClient = useApolloClient()

  const columns = useMemo(() => {
    const cols = [
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
        accessorKey: 'domain_id',
        header: 'Domain',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => {
          const domain = domainRegistry.find((d) => d.domainId === row.original.domain_id)
          return (
            <div>
              {domain
                ? domain.domainConfig.domainName.charAt(0).toUpperCase() +
                  domain.domainConfig.domainName.slice(1)
                : '#' + row.original.domain_id}
            </div>
          )
        },
      },
      {
        accessorKey: 'signing_key',
        header: 'Signing Key',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div className='row flex items-center gap-3'>
            {row.original.account_id === subspaceAccount && (
              <Tooltip text='You are the operator'>
                <AccountIcon address={row.original.account_id} size={26} />
              </Tooltip>
            )}
            <div>{shortString(row.original.signing_key)}</div>
          </div>
        ),
      },
      {
        accessorKey: 'minimum_nominator_stake',
        header: 'Min. Stake',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToNumber(row.original.minimum_nominator_stake)} ${TOKEN.symbol}`}</div>
        ),
      },
      {
        accessorKey: 'nomination_tax',
        header: 'Nominator Tax',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => <div>{`${row.original.nomination_tax}%`}</div>,
      },
      {
        accessorKey: 'current_total_stake',
        header: 'Total Stake',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToNumber(row.original.current_total_stake)} ${TOKEN.symbol}`}</div>
        ),
      },
      {
        accessorKey: 'deposits',
        header: 'Deposits',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => {
          const opDeposits = deposits.filter((d) => d.operatorId.toString() === row.original.id)
          const depositShares = opDeposits.reduce(
            (acc, deposit) => acc + deposit.shares,
            BIGINT_ZERO,
          )
          const pendingAmount = opDeposits.reduce(
            (acc, deposit) => (deposit.pending !== null ? acc + deposit.pending.amount : acc),
            BIGINT_ZERO,
          )
          const pendingStorageFee = opDeposits.reduce(
            (acc, deposit) =>
              deposit.pending !== null ? acc + deposit.pending.storageFeeDeposit : acc,
            BIGINT_ZERO,
          )
          const op = rpcOperators.find((o) => o.id === row.original.id)
          const sharesValue =
            op && BigInt(op.currentTotalShares) > BIGINT_ZERO
              ? (BigInt(op.currentTotalStake) * SHARES_CALCULATION_MULTIPLIER) /
                BigInt(op.currentTotalShares)
              : BIGINT_ZERO
          const total =
            (depositShares * sharesValue) / SHARES_CALCULATION_MULTIPLIER +
            pendingAmount +
            pendingStorageFee
          let tooltip = ''
          if (pendingAmount > BIGINT_ZERO)
            tooltip += `Pending; ${bigNumberToNumber(pendingAmount + pendingStorageFee)} ${TOKEN.symbol}`
          if (depositShares > BIGINT_ZERO && pendingAmount > BIGINT_ZERO) tooltip += ' - '
          if (depositShares > BIGINT_ZERO)
            tooltip += `Staked: ${bigNumberToNumber(
              (depositShares * sharesValue) / SHARES_CALCULATION_MULTIPLIER,
            )} ${TOKEN.symbol}`
          return total > BIGINT_ZERO ? (
            <div>
              <Tooltip text={tooltip}>
                {bigNumberToNumber(total)} {TOKEN.symbol}
              </Tooltip>
            </div>
          ) : (
            <div>0 {TOKEN.symbol}</div>
          )
        },
      },
      {
        accessorKey: 'withdrawals',
        header: 'Withdrawals',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => {
          const opWithdrawals = withdrawals.filter(
            (d) => d.operatorId.toString() === row.original.id,
          )
          const totalPending = opWithdrawals.reduce(
            (acc, withdrawal) =>
              acc +
              withdrawal.withdrawalInShares.shares +
              withdrawal.withdrawalInShares.storageFeeRefund,
            BIGINT_ZERO,
          )
          const totalUnlocked = opWithdrawals.reduce(
            (acc, withdrawal) =>
              withdrawal.withdrawals
                ? acc +
                  withdrawal.withdrawals.reduce(
                    (acc, w) => acc + w.amountToUnlock + w.storageFeeRefund,
                    BIGINT_ZERO,
                  )
                : BIGINT_ZERO,
            BIGINT_ZERO,
          )
          const op = rpcOperators.find((o) => o.id === row.original.id)
          const sharesValue =
            op && BigInt(op.currentTotalShares) > BIGINT_ZERO
              ? (BigInt(op.currentTotalStake) * SHARES_CALCULATION_MULTIPLIER) /
                BigInt(op.currentTotalShares)
              : BIGINT_ZERO
          const total = (totalPending * sharesValue) / SHARES_CALCULATION_MULTIPLIER + totalUnlocked
          let tooltip = ''
          if (totalPending > BIGINT_ZERO)
            tooltip += `Pending; ${bigNumberToNumber(totalPending)} ${TOKEN.symbol}`
          if (totalUnlocked > BIGINT_ZERO && totalPending > BIGINT_ZERO) tooltip += ' - '
          if (totalUnlocked > BIGINT_ZERO)
            tooltip += `Unlocked: ${bigNumberToNumber(totalUnlocked)} ${TOKEN.symbol}`
          return total > BIGINT_ZERO ? (
            <div>
              <Tooltip text={tooltip}>
                {bigNumberToNumber(total)} {TOKEN.symbol}
              </Tooltip>
            </div>
          ) : (
            <div>0 {TOKEN.symbol}</div>
          )
        },
      },
      {
        accessorKey: 'nominators_aggregate',
        header: 'Nominators',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => <div>{row.original.nominatorsCount}</div>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{capitalizeFirstLetter(operatorStatus(row.original.raw_status))}</div>
        ),
      },
    ]
    if (deposits.find((d) => d.account === subspaceAccount))
      cols.push({
        accessorKey: 'myStake',
        header: 'My Stake',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => {
          const deposit = deposits.find(
            (d) => d.account === subspaceAccount && d.operatorId.toString() === row.original.id,
          )
          const op = rpcOperators.find((o) => o.id === row.original.id)
          const sharesValue =
            op && BigInt(op.currentTotalShares) > BIGINT_ZERO
              ? (BigInt(op.currentTotalStake) * SHARES_CALCULATION_MULTIPLIER) /
                BigInt(op.currentTotalShares)
              : BIGINT_ZERO
          const pendingAmount =
            deposit && deposit.pending
              ? deposit.pending.amount + deposit.pending.storageFeeDeposit
              : BIGINT_ZERO
          const depositShares = deposit ? deposit.shares : BIGINT_ZERO
          const total = deposit
            ? (deposit.shares * sharesValue) / SHARES_CALCULATION_MULTIPLIER + pendingAmount
            : BIGINT_ZERO
          let tooltip = ''
          if (pendingAmount > BIGINT_ZERO)
            tooltip += `Pending; ${bigNumberToNumber(pendingAmount)} ${TOKEN.symbol}`
          if (depositShares > BIGINT_ZERO && pendingAmount > BIGINT_ZERO) tooltip += ' - '
          if (depositShares > BIGINT_ZERO)
            tooltip += `Staked: ${bigNumberToNumber(
              (depositShares * sharesValue) / SHARES_CALCULATION_MULTIPLIER,
            )} ${TOKEN.symbol}`
          return (
            <div>
              <Tooltip text={tooltip}>
                {bigNumberToNumber(total)} {TOKEN.symbol}
              </Tooltip>
            </div>
          )
        },
      })
    if (subspaceAccount)
      cols.push({
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => {
          const isOperator = row.original.account_id === subspaceAccount
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
            row.original.raw_status &&
            JSON.parse(row.original.raw_status ?? '{}')?.deregistered
          )
            excludeActions.push(OperatorActionType.Nominating)
          if (
            row.original.raw_status &&
            JSON.parse(row.original.raw_status ?? '{}')?.slashed === null
          )
            return <></>
          return (
            <ActionsDropdown
              action={action}
              handleAction={handleAction}
              row={row as ActionsDropdownRow}
              excludeActions={excludeActions}
              nominatorMaxShares={nominator ? BigInt(nominator.known_shares) : BIGINT_ZERO}
            />
          )
        },
      })
    return cols
  }, [
    deposits,
    subspaceAccount,
    network,
    section,
    domainRegistry,
    rpcOperators,
    withdrawals,
    action,
    handleAction,
  ])

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
    if (subspaceAccount && myPositionOnly && !searchOperator)
      return {
        _or: [
          // eslint-disable-next-line camelcase
          { account_id: { _eq: subspaceAccount } },
          // eslint-disable-next-line camelcase
          { nominators: { account_id: { _eq: subspaceAccount } } },
        ],
      }
    // eslint-disable-next-line camelcase
    return searchOperator ? { id: { _eq: searchOperator } } : {}
  }, [myPositionOnly, searchOperator, subspaceAccount])

  const variables: OperatorsListQueryVariables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, where],
  )

  const { loading, setIsVisible } = useSquidQuery<OperatorsListQuery, OperatorsListQueryVariables>(
    QUERY_OPERATOR_LIST,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
      context: { clientName: 'staking' },
    },
    Routes.staking,
    'operators',
  )

  const {
    staking: { operators },
  } = useQueryStates()

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(
        apolloClient,
        QUERY_OPERATOR_LIST,
        'operator',
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
    if (hasValue(operators))
      return operators.value.operator.map((o) => {
        return {
          ...o,
          nominatorsCount: o.nominators_aggregate.aggregate?.count || 0,
        }
      })
    return []
  }, [operators])

  const totalCount = useMemo(
    () => (hasValue(operators) && operators.value.operator_aggregate.aggregate?.count) || 0,
    [operators],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading || isLoading(operators)) return <Spinner isSmall />
    if (!hasValue(operators)) return <NotFound />
    return null
  }, [loading, operators])

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
          <div className='text-base font-medium text-grayDark dark:text-white'>Staking</div>
        </div>
        <div className='flex items-center'>
          {subspaceAccount && (
            <div className='mr-4 flex w-40 items-center'>
              <MyPositionSwitch />
            </div>
          )}
          <DebouncedInput
            type='text'
            className='block w-full max-w-xl rounded-3xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white'
            placeholder='Search by operator id'
            onChange={handleSearch}
            value={searchOperator}
          />
        </div>
      </div>
      <MyUnlockedWithdrawals action={action} handleAction={handleAction} />
      <MyPendingWithdrawals />
      <div className='mt-2 flex w-full justify-between'>
        <div className='text-base font-medium text-grayDark dark:text-white'>{`Operators (${totalLabel})`}</div>
      </div>
      <div className='mt-2 flex w-full flex-col sm:mt-0'>
        <div className='my-6 rounded' ref={ref}>
          {!loading && operatorsList ? (
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
      <ActionsModal isOpen={isOpen} action={action} onClose={handleActionClose} />
    </div>
  )
}
