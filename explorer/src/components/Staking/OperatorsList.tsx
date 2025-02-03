'use client'

import { useApolloClient } from '@apollo/client'
import { shortString } from '@autonomys/auto-utils'
import { sendGAEvent } from '@next/third-parties/google'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { BIGINT_ZERO, SHARES_CALCULATION_MULTIPLIER } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { OperatorPendingAction, OperatorStatus } from 'constants/staking'
import { OperatorsListQuery, OperatorsListQueryVariables } from 'gql/graphql'
import { useConsensusData } from 'hooks/useConsensusData'
import { useDomainsData } from 'hooks/useDomainsData'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useConsensusStates } from 'states/consensus'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableSettings } from 'states/tables'
import { useViewStates } from 'states/view'
import type { Cell, OperatorsFilters } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import {
  bigNumberToFormattedString,
  bigNumberToNumber,
  formatUnitsToNumber,
  numberFormattedString,
} from 'utils/number'
import { operatorStatus } from 'utils/operator'
import { allCapsToNormal } from 'utils/string'
import { countTablePages, getTableColumns } from 'utils/table'
import { AccountIcon, AccountIconWithLink } from '../common/AccountIcon'
import { MyPositionSwitch } from '../common/MyPositionSwitch'
import { TableSettings } from '../common/TableSettings'
import { Tooltip } from '../common/Tooltip'
import { DomainBlockTime } from '../Domain/DomainBlockTime'
import { DomainProgress } from '../Domain/DomainProgress'
import { NotFound } from '../layout/NotFound'
import { ActionsDropdown, ActionsDropdownRow } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import { QUERY_OPERATOR_LIST } from './query'

type Row = OperatorsListQuery['staking_operators'][0] & { nominatorsCount: number }
const TABLE = 'operators'

interface OperatorsListProps {
  domainId?: string
}

export const OperatorsList: FC<OperatorsListProps> = ({ domainId }) => {
  const { ref, inView } = useInView()
  const { network, tokenSymbol, tokenDecimals } = useIndexers()
  const { subspaceAccount } = useWallet()
  const { operators: rpcOperators, domainRegistry, deposits } = useConsensusStates()
  useConsensusData()
  useDomainsData()
  const inFocus = useWindowFocus()
  const { myPositionOnly } = useViewStates()
  const {
    pagination,
    sorting,
    availableColumns,
    selectedColumns,
    filters,
    orderBy,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<OperatorsFilters>(TABLE)

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

  const apolloClient = useApolloClient()

  const columns = useMemo(
    () =>
      getTableColumns<Row>(
        TABLE,
        selectedColumns,
        {
          id: ({ row }: Cell<Row>) => (
            <Link
              className='hover:text-primaryAccent'
              href={INTERNAL_ROUTES.operators.id.page(network, Routes.staking, row.original.id)}
            >
              <div>{row.original.id}</div>
            </Link>
          ),
          accountId: ({ row }: Cell<Row>) => (
            <AccountIconWithLink
              address={row.original.id}
              network={network}
              section={Routes.consensus}
            />
          ),
          domainId: ({ row }: Cell<Row>) => {
            const domain = domainRegistry.find((d) => d.domainId === row.original.domainId)
            return (
              <Link
                className='hover:text-primaryAccent'
                href={INTERNAL_ROUTES.domains.id.page(
                  network,
                  Routes.domains,
                  row.original.domainId,
                )}
              >
                <div>
                  {domain
                    ? domain.domainConfig.domainName.charAt(0).toUpperCase() +
                      domain.domainConfig.domainName.slice(1)
                    : '#' + row.original.domainId}
                </div>
              </Link>
            )
          },
          domain: ({ row }: Cell<Row>) => {
            const domain = domainRegistry.find((d) => d.domainId === row.original.domainId)
            return (
              <Link
                className='hover:text-primaryAccent'
                href={INTERNAL_ROUTES.domains.id.page(
                  network,
                  Routes.domains,
                  row.original.domainId,
                )}
              >
                <div>
                  {domain
                    ? domain.domainConfig.domainName.charAt(0).toUpperCase() +
                      domain.domainConfig.domainName.slice(1)
                    : '#' + row.original.domainId}
                </div>
              </Link>
            )
          },
          signingKey: ({ row }: Cell<Row>) => (
            <div className='row flex items-center gap-3'>
              {row.original.accountId === subspaceAccount && (
                <Tooltip text='You are the operator' direction='bottom'>
                  <AccountIcon address={row.original.accountId} size={26} />
                </Tooltip>
              )}
              <div>{shortString(row.original.signingKey)}</div>
            </div>
          ),
          currentTotalStake: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.currentTotalStake)} ${tokenSymbol}`,
          currentTotalShares: ({ row }: Cell<Row>) =>
            bigNumberToFormattedString(row.original.currentTotalShares),
          currentSharePrice: ({ row }: Cell<Row>) =>
            `${formatUnitsToNumber((row.original.currentSharePrice * 1000000).toString())} ${tokenSymbol}`,
          totalDeposits: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.totalDeposits)} ${tokenSymbol}`,
          totalEstimatedWithdrawals: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.totalEstimatedWithdrawals)} ${tokenSymbol}`,
          totalWithdrawals: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.totalWithdrawals)} ${tokenSymbol}`,
          totalTaxCollected: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.totalTaxCollected)} ${tokenSymbol}`,
          totalRewardsCollected: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.totalRewardsCollected)} ${tokenSymbol}`,
          totalTransfersIn: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.totalTransfersIn)} ${tokenSymbol}`,
          transfersInCount: ({ row }: Cell<Row>) =>
            numberFormattedString(row.original.transfersInCount),
          totalTransfersOut: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.totalTransfersOut)} ${tokenSymbol}`,
          transfersOutCount: ({ row }: Cell<Row>) =>
            numberFormattedString(row.original.transfersOutCount),
          totalTransfersRejected: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.totalTransfersRejected)} ${tokenSymbol}`,
          totalRejectedTransfersClaimed: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.totalRejectedTransfersClaimed)} ${tokenSymbol}`,
          rejectedTransfersClaimedCount: ({ row }: Cell<Row>) =>
            numberFormattedString(row.original.rejectedTransfersClaimedCount),
          transfersRejectedCount: ({ row }: Cell<Row>) =>
            numberFormattedString(row.original.transfersRejectedCount),
          totalVolume: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.totalVolume)} ${tokenSymbol}`,
          totalConsensusStorageFee: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.totalConsensusStorageFee)} ${tokenSymbol}`,
          totalDomainExecutionFee: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.totalDomainExecutionFee)} ${tokenSymbol}`,
          totalBurnedBalance: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.totalBurnedBalance)} ${tokenSymbol}`,
          accumulatedEpochShares: ({ row }: Cell<Row>) =>
            bigNumberToFormattedString(row.original.accumulatedEpochShares),
          accumulatedEpochStorageFeeDeposit: ({ row }: Cell<Row>) =>
            bigNumberToFormattedString(row.original.accumulatedEpochStorageFeeDeposit),
          activeEpochCount: ({ row }: Cell<Row>) =>
            numberFormattedString(row.original.activeEpochCount),
          bundleCount: ({ row }: Cell<Row>) => numberFormattedString(row.original.bundleCount),
          status: ({ row }: Cell<Row>) => allCapsToNormal(row.original.status),
          rawStatus: ({ row }: Cell<Row>) =>
            allCapsToNormal(operatorStatus(JSON.parse(row.original.rawStatus ?? '{}'))),
          pendingAction: ({ row }: Cell<Row>) => allCapsToNormal(row.original.pendingAction),
          lastBundleAt: ({ row }: Cell<Row>) => (
            <Link
              key={`created_at-${row.original.id}`}
              data-testid={`created-at-${row.index}`}
              href={INTERNAL_ROUTES.blocks.id.page(
                network,
                Routes.consensus,
                parseInt(row.original.lastBundleAt?.toString() ?? '0'),
              )}
              className='hover:text-primaryAccent'
            >
              <div>{row.original.lastBundleAt}</div>
            </Link>
          ),
          createdAt: ({ row }: Cell<Row>) => (
            <Link
              key={`created_at-${row.original.id}`}
              data-testid={`created-at-${row.index}`}
              href={INTERNAL_ROUTES.blocks.id.page(
                network,
                Routes.consensus,
                parseInt(row.original.createdAt?.toString() ?? '0'),
              )}
              className='hover:text-primaryAccent'
            >
              <div>{row.original.createdAt}</div>
            </Link>
          ),
          updatedAt: ({ row }: Cell<Row>) => (
            <Link
              key={`created_at-${row.original.id}`}
              data-testid={`created-at-${row.index}`}
              href={INTERNAL_ROUTES.blocks.id.page(
                network,
                Routes.consensus,
                parseInt(row.original.updatedAt?.toString() ?? '0'),
              )}
              className='hover:text-primaryAccent'
            >
              <div>{row.original.updatedAt}</div>
            </Link>
          ),
          minimumNominatorStake: ({ row }: Cell<Row>) =>
            `${bigNumberToFormattedString(row.original.minimumNominatorStake)} ${tokenSymbol}`,
          nominationTax: ({ row }: Cell<Row>) => `${row.original.nominationTax}%`,
          nominatorsAggregate: ({ row }: Cell<Row>) =>
            numberFormattedString(row.original.nominatorsCount),
          myStake: ({ row }: Cell<Row>) => {
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
              tooltip += `Pending; ${bigNumberToNumber(pendingAmount)} ${tokenSymbol}`
            if (depositShares > BIGINT_ZERO && pendingAmount > BIGINT_ZERO) tooltip += ' - '
            if (depositShares > BIGINT_ZERO)
              tooltip += `Staked: ${bigNumberToNumber(
                (depositShares * sharesValue) / SHARES_CALCULATION_MULTIPLIER,
              )} ${tokenSymbol}`
            return (
              <div>
                <Tooltip text={tooltip} direction='bottom'>
                  {bigNumberToFormattedString(total)} {tokenSymbol}
                </Tooltip>
              </div>
            )
          },
          actions: ({ row }: Cell<Row>) => {
            const isOperator = row.original.accountId === subspaceAccount
            const nominator = row.original.nominators.find(
              (nominator) => nominator.account_id === subspaceAccount,
            )
            const excludeActions = []
            if (!isOperator)
              excludeActions.push(OperatorActionType.Deregister, OperatorActionType.UnlockNominator)

            if (row.original.status === OperatorStatus.DEREGISTERED)
              excludeActions.push(OperatorActionType.Nominating, OperatorActionType.Deregister)
            if (row.original.pendingAction !== OperatorPendingAction.READY_FOR_UNLOCK_NOMINATOR)
              excludeActions.push(OperatorActionType.UnlockNominator)

            if (!nominator)
              excludeActions.push(OperatorActionType.Withdraw, OperatorActionType.UnlockFunds)
            if (!nominator || nominator.unlock_at_confirmed_domain_block_number.length === 0)
              excludeActions.push(OperatorActionType.UnlockFunds)
            if (row.original.status === OperatorStatus.SLASHED) return <></>
            return (
              <ActionsDropdown
                action={action}
                handleAction={handleAction}
                row={
                  {
                    original: {
                      ...row.original,
                      // eslint-disable-next-line camelcase
                      current_total_shares: row.original.currentTotalShares,
                    },
                  } as ActionsDropdownRow
                }
                excludeActions={excludeActions}
                nominatorMaxShares={nominator ? BigInt(nominator.known_shares) : BIGINT_ZERO}
              />
            )
          },
        },
        {},
        { myStake: false, actions: false },
      ),
    [
      selectedColumns,
      deposits,
      subspaceAccount,
      network,
      domainRegistry,
      rpcOperators,
      action,
      handleAction,
      tokenSymbol,
    ],
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
          Math.floor(parseFloat(filters.totalStakeMin) * 10 ** tokenDecimals),
        ).toString()
      }
      if (filters.totalStakeMax) {
        conditions.current_total_stake._lte = BigInt(
          Math.floor(parseFloat(filters.totalStakeMax) * 10 ** tokenDecimals),
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
          Math.floor(parseFloat(filters.minimumNominatorStakeMin) * 10 ** tokenDecimals),
        ).toString()
      }
      if (filters.minimumNominatorStakeMax) {
        conditions.minimum_nominator_stake._lte = BigInt(
          Math.floor(parseFloat(filters.minimumNominatorStakeMax) * 10 ** tokenDecimals),
        ).toString()
      }
    }

    // Total Rewards Collected
    if (filters.totalRewardsCollectedMin || filters.totalRewardsCollectedMax) {
      conditions['total_rewards_collected'] = {}
      if (filters.totalRewardsCollectedMin) {
        conditions.total_rewards_collected._gte = BigInt(
          Math.floor(parseFloat(filters.totalRewardsCollectedMin) * 10 ** tokenDecimals),
        ).toString()
      }
      if (filters.totalRewardsCollectedMax) {
        conditions.total_rewards_collected._lte = BigInt(
          Math.floor(parseFloat(filters.totalRewardsCollectedMax) * 10 ** tokenDecimals),
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
  }, [domainId, subspaceAccount, myPositionOnly, availableColumns, filters, tokenDecimals])

  const variables: OperatorsListQueryVariables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where,
    }),
    [pagination, orderBy, where],
  )

  const { loading, setIsVisible } = useIndexersQuery<
    OperatorsListQuery,
    OperatorsListQueryVariables
  >(
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

  const operators = useQueryStates((state) => state.staking.operators)

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, QUERY_OPERATOR_LIST, 'operator', {
        orderBy,
      }),
    [apolloClient, orderBy],
  )

  const operatorsList = useMemo(() => {
    if (hasValue(operators))
      return operators.value.staking_operators.map((o) => {
        return {
          ...o,
          nominatorsCount: o.nominatorsAggregate.aggregate?.count || 0,
        }
      })
    return []
  }, [operators])

  const totalCount = useMemo(
    () =>
      (hasValue(operators) && operators.value.staking_operators_aggregate.aggregate?.count) || 0,
    [operators],
  )
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
          table={TABLE}
          totalCount={totalCount}
          filters={filters}
          addExtraIcons={
            subspaceAccount && (
              <div className='mr-4 flex w-44 items-center'>
                <MyPositionSwitch />
              </div>
            )
          }
        />
        {!loading && operatorsList ? (
          <SortedTable
            data={operatorsList}
            columns={columns}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={onSortingChange}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={onPaginationChange}
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
