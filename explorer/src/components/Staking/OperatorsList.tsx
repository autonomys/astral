'use client'

import { useApolloClient } from '@apollo/client'
import { sendGAEvent } from '@next/third-parties/google'
import { PaginationState, SortingState } from '@tanstack/react-table'
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
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useConsensusStates } from 'states/consensus'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableStates } from 'states/tables'
import { useViewStates } from 'states/view'
import type { Cell, OperatorsFilters, TableSettingsTabs } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import {
  bigNumberToFormattedString,
  bigNumberToNumber,
  formatUnitsToNumber,
  numberFormattedString,
  numberWithCommas,
} from 'utils/number'
import { operatorStatus } from 'utils/operator'
import { allCapsToNormal, shortString } from 'utils/string'
import { countTablePages } from 'utils/table'
import { AccountIcon } from '../common/AccountIcon'
import { MyPositionSwitch } from '../common/MyPositionSwitch'
import { TableSettings } from '../common/TableSettings'
import { Tooltip } from '../common/Tooltip'
import { DomainBlockTime } from '../Domain/DomainBlockTime'
import { DomainProgress } from '../Domain/DomainProgress'
import { NotFound } from '../layout/NotFound'
import { ActionsDropdown, ActionsDropdownRow } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import { QUERY_OPERATOR_LIST } from './staking.query'

type Row = OperatorsListQuery['operator'][0] & { nominatorsCount: number }
const TABLE = 'operators'

interface OperatorsListProps {
  domainId?: string
}

export const OperatorsList: FC<OperatorsListProps> = ({ domainId }) => {
  const { ref, inView } = useInView()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'sort_id', desc: false }])
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const { subspaceAccount } = useWallet()
  const { operators: rpcOperators, domainRegistry, deposits } = useConsensusStates()
  useConsensusData()
  useDomainsData()
  const inFocus = useWindowFocus()
  const { myPositionOnly } = useViewStates()
  const {
    operators: {
      columns: availableColumns,
      selectedColumns,
      filtersOptions,
      filters: operatorFilters,
      showTableSettings,
    },
    setColumns,
    setFilters,
    showSettings,
    hideSettings,
    resetSettings,
    showReset,
  } = useTableStates()
  const filters = useMemo(() => operatorFilters as OperatorsFilters, [operatorFilters])

  const [action, setAction] = useState<OperatorAction>({
    type: OperatorActionType.None,
    operatorId: null,
    maxShares: null,
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleFilterChange = useCallback(
    (filterName: string, value: string | boolean) => {
      setFilters(TABLE, {
        ...filters,
        [filterName]: value,
      })
    },
    [filters, setFilters],
  )

  const handleReset = useCallback(() => resetSettings(TABLE), [resetSettings])

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

  const { network } = useChains()
  const apolloClient = useApolloClient()

  const columns = useMemo(() => {
    const cols = []
    if (selectedColumns.includes('id'))
      cols.push({
        accessorKey: 'sort_id',
        header: 'Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.operators.id.page(network, Routes.staking, row.original.id)}
          >
            <div>{row.original.id}</div>
          </Link>
        ),
      })
    if (selectedColumns.includes('account_id') || selectedColumns.includes('account'))
      cols.push({
        accessorKey: 'account_id',
        header: 'Owner',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            className='flex items-center gap-2 hover:text-primaryAccent'
            href={INTERNAL_ROUTES.accounts.id.page(
              network,
              Routes.consensus,
              row.original.account_id,
            )}
          >
            <AccountIcon address={row.original.account_id} size={26} />
            <div>{shortString(row.original.account_id)}</div>
          </Link>
        ),
      })
    if (!domainId && (selectedColumns.includes('domain_id') || selectedColumns.includes('domain')))
      cols.push({
        accessorKey: 'domain_id',
        header: 'Domain',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => {
          const domain = domainRegistry.find((d) => d.domainId === row.original.domain_id)
          return (
            <Link
              className='hover:text-primaryAccent'
              href={INTERNAL_ROUTES.domains.id.page(
                network,
                Routes.domains,
                row.original.domain_id,
              )}
            >
              <div>
                {domain
                  ? domain.domainConfig.domainName.charAt(0).toUpperCase() +
                    domain.domainConfig.domainName.slice(1)
                  : '#' + row.original.domain_id}
              </div>
            </Link>
          )
        },
      })
    if (selectedColumns.includes('signing_key'))
      cols.push({
        accessorKey: 'signing_key',
        header: 'Signing Key',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div className='row flex items-center gap-3'>
            {row.original.account_id === subspaceAccount && (
              <Tooltip text='You are the operator' direction='bottom'>
                <AccountIcon address={row.original.account_id} size={26} />
              </Tooltip>
            )}
            <div>{shortString(row.original.signing_key)}</div>
          </div>
        ),
      })
    if (selectedColumns.includes('current_total_stake'))
      cols.push({
        accessorKey: 'current_total_stake',
        header: 'Total Stake',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.current_total_stake)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('current_total_shares'))
      cols.push({
        accessorKey: 'current_total_shares',
        header: 'Total Shares',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{bigNumberToFormattedString(row.original.current_total_shares)}</div>
        ),
      })
    if (selectedColumns.includes('current_share_price'))
      cols.push({
        accessorKey: 'current_share_price',
        header: 'Current Share Price',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${formatUnitsToNumber((row.original.current_share_price * 1000000).toString())} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_deposits'))
      cols.push({
        accessorKey: 'total_deposits',
        header: 'Total Deposits',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_deposits)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_estimated_withdrawals'))
      cols.push({
        accessorKey: 'total_estimated_withdrawals',
        header: 'Total Estimated Withdrawals',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_estimated_withdrawals)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_withdrawals'))
      cols.push({
        accessorKey: 'total_withdrawals',
        header: 'Total Withdrawals',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_withdrawals)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_tax_collected'))
      cols.push({
        accessorKey: 'total_tax_collected',
        header: 'Total Tax Collected',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_tax_collected)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_rewards_collected'))
      cols.push({
        accessorKey: 'total_rewards_collected',
        header: 'Total Rewards Collected',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_rewards_collected)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_transfers_in'))
      cols.push({
        accessorKey: 'total_transfers_in',
        header: 'Total Transfer In',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_transfers_in)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('transfers_in_count'))
      cols.push({
        accessorKey: 'transfers_in_count',
        header: 'Total Transfer In (Count)',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.transfers_in_count)}</div>
        ),
      })
    if (selectedColumns.includes('total_transfers_out'))
      cols.push({
        accessorKey: 'total_transfers_out',
        header: 'Total Transfer Out',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_transfers_out)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('transfers_out_count'))
      cols.push({
        accessorKey: 'transfers_out_count',
        header: 'Total Transfer Out (Count)',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.transfers_out_count)}</div>
        ),
      })
    if (selectedColumns.includes('total_rejected_transfers_claimed'))
      cols.push({
        accessorKey: 'total_rejected_transfers_claimed',
        header: 'Total Transfer Rejected Claimed',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_rejected_transfers_claimed)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('rejected_transfers_claimed_count'))
      cols.push({
        accessorKey: 'rejected_transfers_claimed_count',
        header: 'Total Transfer Rejected Claimed (Count)',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.rejected_transfers_claimed_count)}</div>
        ),
      })
    if (selectedColumns.includes('total_transfers_rejected'))
      cols.push({
        accessorKey: 'total_transfers_rejected',
        header: 'Total Transfer Rejected',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_transfers_rejected)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('transfers_rejected_count'))
      cols.push({
        accessorKey: 'transfers_rejected_count',
        header: 'Total Transfer Rejected (Count)',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.transfers_rejected_count)}</div>
        ),
      })
    if (selectedColumns.includes('total_volume'))
      cols.push({
        accessorKey: 'total_volume',
        header: 'Total volume',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_volume)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_consensus_storage_fee'))
      cols.push({
        accessorKey: 'total_consensus_storage_fee',
        header: 'Total Consensus Storage Fee',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_consensus_storage_fee)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_domain_execution_fee'))
      cols.push({
        accessorKey: 'total_domain_execution_fee',
        header: 'Total Domain Execution Fee',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_domain_execution_fee)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('total_burned_balance'))
      cols.push({
        accessorKey: 'total_burned_balance',
        header: 'Total Burned Balance',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.total_burned_balance)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('accumulated_epoch_shares'))
      cols.push({
        accessorKey: 'accumulated_epoch_shares',
        header: 'Accumulated Epoch Shares',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{bigNumberToFormattedString(row.original.accumulated_epoch_shares)}</div>
        ),
      })
    if (selectedColumns.includes('accumulated_epoch_storage_fee_deposit'))
      cols.push({
        accessorKey: 'accumulated_epoch_storage_fee_deposit',
        header: 'Accumulated Epoch Storage Fee Deposit',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>
            {bigNumberToFormattedString(row.original.accumulated_epoch_storage_fee_deposit)}
          </div>
        ),
      })
    if (selectedColumns.includes('active_epoch_count'))
      cols.push({
        accessorKey: 'active_epoch_count',
        header: 'Active Epoch (Count)',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{numberFormattedString(row.original.active_epoch_count)}</div>
        ),
      })
    if (selectedColumns.includes('bundle_count'))
      cols.push({
        accessorKey: 'bundle_count',
        header: 'Bundle (Count)',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => <div>{numberFormattedString(row.original.bundle_count)}</div>,
      })
    if (selectedColumns.includes('status'))
      cols.push({
        accessorKey: 'status',
        header: 'Status',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => <div>{allCapsToNormal(row.original.status)}</div>,
      })
    if (selectedColumns.includes('raw_status'))
      cols.push({
        accessorKey: 'raw_status',
        header: 'Raw Status',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => {
          const status = operatorStatus(JSON.parse(row.original.raw_status ?? '{}'))
          return <div>{allCapsToNormal(status)}</div>
        },
      })
    if (selectedColumns.includes('pending_action'))
      cols.push({
        accessorKey: 'pending_action',
        header: 'Pending Action',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => <div>{allCapsToNormal(row.original.pending_action)}</div>,
      })
    if (selectedColumns.includes('last_bundle_at'))
      cols.push({
        accessorKey: 'last_bundle_at',
        header: 'Last Bundle',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`created_at-${row.original.id}`}
            data-testid={`created-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              parseInt(row.original.last_bundle_at?.toString() ?? '0'),
            )}
            className='hover:text-primaryAccent'
          >
            <div>{row.original.last_bundle_at}</div>
          </Link>
        ),
      })
    if (selectedColumns.includes('created_at'))
      cols.push({
        accessorKey: 'created_at',
        header: 'Created',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`created_at-${row.original.id}`}
            data-testid={`created-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              parseInt(row.original.created_at?.toString() ?? '0'),
            )}
            className='hover:text-primaryAccent'
          >
            <div>{row.original.created_at}</div>
          </Link>
        ),
      })
    if (selectedColumns.includes('updated_at'))
      cols.push({
        accessorKey: 'updated_at',
        header: 'Updated',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`created_at-${row.original.id}`}
            data-testid={`created-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              parseInt(row.original.created_at?.toString() ?? '0'),
            )}
            className='hover:text-primaryAccent'
          >
            <div>{row.original.updated_at}</div>
          </Link>
        ),
      })
    if (selectedColumns.includes('minimum_nominator_stake'))
      cols.push({
        accessorKey: 'minimum_nominator_stake',
        header: 'Min. Stake',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div>{`${bigNumberToFormattedString(row.original.minimum_nominator_stake)} ${TOKEN.symbol}`}</div>
        ),
      })
    if (selectedColumns.includes('nomination_tax'))
      cols.push({
        accessorKey: 'nomination_tax',
        header: 'Nominator Tax',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => <div>{`${row.original.nomination_tax}%`}</div>,
      })
    if (selectedColumns.includes('nominators_aggregate'))
      cols.push({
        accessorKey: 'nominators_aggregate',
        header: 'Nominators',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => <div>{row.original.nominatorsCount}</div>,
      })
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
              <Tooltip text={tooltip} direction='bottom'>
                {bigNumberToFormattedString(total)} {TOKEN.symbol}
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
            (nominator) => nominator.account_id === subspaceAccount,
          )
          const excludeActions = []
          if (!isOperator)
            excludeActions.push(OperatorActionType.Deregister, OperatorActionType.UnlockNominator)

          const status = operatorStatus(JSON.parse(row.original.raw_status ?? '{}'))

          if (status === 'REGISTERED')
            excludeActions.push(OperatorActionType.Deregister, OperatorActionType.Nominating)
          else if (status === 'DEREGISTERED') excludeActions.push(OperatorActionType.Nominating)
          else if (status === 'READY_TO_UNLOCK')
            excludeActions.push(OperatorActionType.Nominating, OperatorActionType.Deregister)
          else excludeActions.push(OperatorActionType.UnlockNominator)

          if (!nominator)
            excludeActions.push(OperatorActionType.Withdraw, OperatorActionType.UnlockFunds)
          if (!nominator || nominator.unlock_at_confirmed_domain_block_number.length === 0)
            excludeActions.push(OperatorActionType.UnlockFunds)
          if (status === 'SLASHED') return <></>
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
    selectedColumns,
    domainId,
    deposits,
    subspaceAccount,
    network,
    domainRegistry,
    rpcOperators,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions: Record<string, any> = {}

    if (domainId) {
      conditions['domain_id'] = {}
      conditions.domain_id._eq = domainId
    }

    if (subspaceAccount && myPositionOnly) {
      conditions._or = [
        // eslint-disable-next-line camelcase
        { account_id: { _eq: subspaceAccount } },
        // eslint-disable-next-line camelcase
        { nominators: { account_id: { _eq: subspaceAccount } } },
      ]
    }

    // Dynamic search conditions
    availableColumns
      .filter((column) => column.searchable)
      .forEach((column) => {
        const searchKey = `search-${column.name}` as keyof OperatorsFilters
        const searchValue = filters[searchKey]
        if (searchValue) {
          conditions[column.name] = { _ilike: `%${searchValue}%` }
        }
      })

    // Total Stake
    if (filters.totalStakeMin || filters.totalStakeMax) {
      conditions['current_total_stake'] = {}
      if (filters.totalStakeMin) {
        conditions.current_total_stake._gte = BigInt(
          Math.floor(parseFloat(filters.totalStakeMin) * 10 ** TOKEN.decimals),
        ).toString()
      }
      if (filters.totalStakeMax) {
        conditions.current_total_stake._lte = BigInt(
          Math.floor(parseFloat(filters.totalStakeMax) * 10 ** TOKEN.decimals),
        ).toString()
      }
    }

    // Nomination Tax
    if (filters.nominationTaxMin || filters.nominationTaxMax) {
      conditions['nomination_tax'] = {}
      if (filters.nominationTaxMin) {
        conditions.nomination_tax._gte = filters.nominationTaxMin
      }
      if (filters.nominationTaxMax) {
        conditions.nomination_tax._lte = filters.nominationTaxMax
      }
    }

    // Minimum Nominator Stake
    if (filters.minimumNominatorStakeMin || filters.minimumNominatorStakeMax) {
      conditions['minimum_nominator_stake'] = {}
      if (filters.minimumNominatorStakeMin) {
        conditions.minimum_nominator_stake._gte = BigInt(
          Math.floor(parseFloat(filters.minimumNominatorStakeMin) * 10 ** TOKEN.decimals),
        ).toString()
      }
      if (filters.minimumNominatorStakeMax) {
        conditions.minimum_nominator_stake._lte = BigInt(
          Math.floor(parseFloat(filters.minimumNominatorStakeMax) * 10 ** TOKEN.decimals),
        ).toString()
      }
    }

    // Total Rewards Collected
    if (filters.totalRewardsCollectedMin || filters.totalRewardsCollectedMax) {
      conditions['total_rewards_collected'] = {}
      if (filters.totalRewardsCollectedMin) {
        conditions.total_rewards_collected._gte = BigInt(
          Math.floor(parseFloat(filters.totalRewardsCollectedMin) * 10 ** TOKEN.decimals),
        ).toString()
      }
      if (filters.totalRewardsCollectedMax) {
        conditions.total_rewards_collected._lte = BigInt(
          Math.floor(parseFloat(filters.totalRewardsCollectedMax) * 10 ** TOKEN.decimals),
        ).toString()
      }
    }

    // Nominators Count
    if (filters.nominatorsCountMin || filters.nominatorsCountMax) {
      conditions['nominators_aggregate'] = { count: { predicate: {} } }
      if (filters.nominatorsCountMin)
        conditions.nominators_aggregate.count.predicate._gte = filters.nominatorsCountMin
      if (filters.nominatorsCountMax)
        conditions.nominators_aggregate.count.predicate._lte = filters.nominatorsCountMax
    }

    // Deposit Count
    if (filters.depositsCountMin || filters.depositsCountMax) {
      conditions['deposits_aggregate'] = { count: { predicate: {} } }
      if (filters.depositsCountMin)
        conditions.deposits_aggregate.count.predicate._gte = filters.depositsCountMin
      if (filters.depositsCountMax)
        conditions.deposits_aggregate.count.predicate._lte = filters.depositsCountMax
    }

    // Status filters
    const statusConditions = []
    if (filters.statusRegistered === 'true')
      statusConditions.push({ status: { _eq: 'REGISTERED' } })
    if (filters.statusDeregistered === 'true')
      statusConditions.push({ status: { _eq: 'DEREGISTERED' } })
    if (filters.statusSlashed === 'true') statusConditions.push({ status: { _eq: 'SLASHED' } })
    if (filters.statusReadyToUnlock === 'true')
      statusConditions.push({ status: { _eq: 'READY_TO_UNLOCK' } })
    if (statusConditions.length > 0) {
      conditions._or = [...(conditions._or || []), ...statusConditions]
    }

    // Active Epoch Count
    if (filters.activeEpochCountMin || filters.activeEpochCountMax) {
      conditions['active_epoch_count'] = {}
      if (filters.activeEpochCountMin) {
        conditions.active_epoch_count._gte = parseInt(filters.activeEpochCountMin)
      }
      if (filters.activeEpochCountMax) {
        conditions.active_epoch_count._lte = parseInt(filters.activeEpochCountMax)
      }
    }

    // Bundle Count
    if (filters.bundleCountMin || filters.bundleCountMax) {
      conditions['bundle_count'] = {}
      if (filters.bundleCountMin) {
        conditions.bundle_count._gte = parseInt(filters.bundleCountMin)
      }
      if (filters.bundleCountMax) {
        conditions.bundle_count._lte = parseInt(filters.bundleCountMax)
      }
    }

    return conditions
  }, [domainId, subspaceAccount, myPositionOnly, availableColumns, filters])

  const variables: OperatorsListQueryVariables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where,
    }),
    [pagination, orderBy, where],
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
    TABLE,
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

  const handleClickOnColumnToEditTable = useCallback(
    (column: string, checked: boolean) =>
      checked
        ? setColumns(TABLE, [...selectedColumns, column])
        : setColumns(
            TABLE,
            selectedColumns.filter((c) => c !== column),
          ),
    [selectedColumns, setColumns],
  )

  const _showSettings = useCallback(
    (setting: TableSettingsTabs) => showSettings(TABLE, setting),
    [showSettings],
  )
  const _hideSettings = useCallback(() => hideSettings(TABLE), [hideSettings])

  const _showReset = useCallback(
    () => showReset(TABLE),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showReset, selectedColumns, operatorFilters],
  )

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex flex-col sm:flex-row sm:justify-between'>
        <div className='mb-4 sm:mb-0'>
          <DomainBlockTime />
        </div>
        <div>
          <DomainProgress />
        </div>
      </div>
      <div className='my-4' ref={ref}>
        <TableSettings
          tableName='Operators'
          totalLabel={totalLabel}
          availableColumns={availableColumns}
          selectedColumns={selectedColumns}
          filters={filters}
          addExtraIcons={
            subspaceAccount && (
              <div className='mr-4 flex w-44 items-center'>
                <MyPositionSwitch />
              </div>
            )
          }
          showTableSettings={showTableSettings}
          showSettings={_showSettings}
          hideSettings={_hideSettings}
          handleColumnChange={handleClickOnColumnToEditTable}
          handleFilterChange={handleFilterChange}
          filterOptions={filtersOptions}
          handleReset={handleReset}
          showReset={_showReset()}
        />
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
      <ActionsModal isOpen={isOpen} action={action} onClose={handleActionClose} />
    </div>
  )
}
