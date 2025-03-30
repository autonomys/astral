import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { BIGINT_ZERO, PAGE_SIZE, SHARES_CALCULATION_MULTIPLIER } from 'constants/general'
import { Routes } from 'constants/routes'
import {
  OperatorByIdQuery,
  OperatorNominatorsByIdDocument,
  OperatorNominatorsByIdQuery,
  OperatorNominatorsByIdQueryVariables,
  Order_By as OrderBy,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useConsensusStates } from 'states/consensus'
import { hasValue, useQueryStates } from 'states/query'
import { useViewStates } from 'states/view'
import type { Cell } from 'types/table'
import { bigNumberToFormattedString, bigNumberToNumber, numberWithCommas } from 'utils/number'
import { countTablePages } from 'utils/table'
import { AccountIconWithLink } from '../common/AccountIcon'
import { Spinner } from '../common/Spinner'

type Props = {
  operator: OperatorByIdQuery['staking_operators_by_pk']
  nominatorCount: number
}

type Row = OperatorNominatorsByIdQuery['staking_nominators'][0]

export const OperatorNominatorTable: FC<Props> = ({ operator, nominatorCount }) => {
  const { ref, inView } = useInView()
  const { subspaceAccount } = useWallet()
  const { operatorId } = useParams<{ operatorId?: string }>()
  const inFocus = useWindowFocus()
  const { network, tokenSymbol } = useIndexers()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const { useRpcData } = useViewStates()
  const { operators: rpcOperators, deposits } = useConsensusStates()

  const op = useMemo(
    () => rpcOperators.find((o) => o.id.toString() === operatorId),
    [operatorId, rpcOperators],
  )

  const columns = useMemo(() => {
    if (!operator || operator.current_total_stake == 0) return []
    const cols = [
      {
        accessorKey: 'account_id',
        header: 'Account Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <AccountIconWithLink
            address={row.original.account_id}
            network={network}
            section={Routes.consensus}
          />
        ),
      },
      {
        accessorKey: 'current_total_stake',
        header: 'Current Stake',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => {
          return (
            <div>
              {bigNumberToFormattedString(row.original.current_total_stake) + ' ' + tokenSymbol}
            </div>
          )
        },
      },
      {
        accessorKey: 'current_storage_fee_deposit',
        header: 'Current Storage Fee Deposit',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => {
          return (
            <div>
              {bigNumberToFormattedString(row.original.current_storage_fee_deposit) +
                ' ' +
                tokenSymbol}
            </div>
          )
        },
      },
      {
        accessorKey: 'total_deposits',
        header: 'Total Deposits',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => {
          return (
            <div>{bigNumberToFormattedString(row.original.total_deposits) + ' ' + tokenSymbol}</div>
          )
        },
      },
      {
        accessorKey: 'owner',
        header: 'is Owner',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) =>
          operator.account_id === row.original.account_id ? 'Yes' : 'No',
      },
    ]
    if (
      useRpcData &&
      deposits.find((d) => d.account === subspaceAccount && d.operatorId.toString() === operatorId)
    )
      cols.push({
        accessorKey: 'myStake',
        header: 'My Stake',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => {
          const deposit = deposits.find(
            (d) => d.account === row.original.account_id && d.operatorId.toString() === operatorId,
          )
          const sharesValue =
            op && BigInt(op.currentTotalShares) > BIGINT_ZERO
              ? (BigInt(op.currentTotalStake) * SHARES_CALCULATION_MULTIPLIER) /
                BigInt(op.currentTotalShares)
              : BIGINT_ZERO
          return (
            <div>
              {deposit && deposit.shares > BIGINT_ZERO && (
                <>
                  {`Staked: ${bigNumberToNumber((deposit.shares * sharesValue) / SHARES_CALCULATION_MULTIPLIER)} ${tokenSymbol}`}
                  <br />
                </>
              )}
              {deposit &&
                deposit.pending !== null &&
                deposit.pending.amount > BIGINT_ZERO &&
                `Pending: ${bigNumberToNumber(deposit.pending.amount + deposit.pending.storageFeeDeposit)} ${tokenSymbol}`}
            </div>
          )
        },
      })
    return cols
  }, [deposits, op, operator, operatorId, network, subspaceAccount, useRpcData, tokenSymbol])

  const orderBy = useMemo(
    () =>
      sorting && sorting.length > 0
        ? sorting[0].id.endsWith('aggregate')
          ? { [sorting[0].id]: sorting[0].desc ? { count: OrderBy.Desc } : { count: OrderBy.Asc } }
          : { [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }
        : { id: OrderBy.Asc },
    [sorting],
  )

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      // eslint-disable-next-line camelcase
      where: { operator: { id: { _eq: operatorId } } },
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, operatorId],
  )

  const { loading, setIsVisible } = useIndexersQuery<
    OperatorNominatorsByIdQuery,
    OperatorNominatorsByIdQueryVariables
  >(
    OperatorNominatorsByIdDocument,
    {
      variables,
      skip: !inFocus,
      context: { clientName: 'staking' },
    },
    Routes.staking,
    'operatorNominators',
  )

  const operatorNominators = useQueryStates((state) => state.staking.operatorNominators)

  const nominators = useMemo(
    () => (hasValue(operatorNominators) ? operatorNominators.value.staking_nominators : []),
    [operatorNominators],
  )

  const totalLabel = useMemo(() => numberWithCommas(nominatorCount), [nominatorCount])
  const pageCount = useMemo(
    () => countTablePages(nominatorCount, pagination.pageSize),
    [nominatorCount, pagination],
  )

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  if (!operator) return null

  return (
    <div ref={ref}>
      <div className='mt-5 flex w-full justify-between'>
        <div className='text-base font-medium text-grayDark dark:text-white'>{`Nominators (${totalLabel})`}</div>
      </div>
      {!loading ? (
        <SortedTable
          data={nominators}
          columns={columns}
          showNavigation={!useRpcData}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          filename='operator-nominators-list'
        />
      ) : (
        <Spinner isSmall />
      )}
    </div>
  )
}
