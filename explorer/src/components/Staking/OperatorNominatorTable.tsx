import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { BIGINT_ZERO, PAGE_SIZE, SHARES_CALCULATION_MULTIPLIER, TOKEN } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  OperatorByIdQuery,
  OperatorNominatorsByIdQuery,
  OperatorNominatorsByIdQueryVariables,
  Order_By as OrderBy,
} from 'gql/types/staking'
import useChains from 'hooks/useChains'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useConsensusStates } from 'states/consensus'
import { hasValue, useQueryStates } from 'states/query'
import { useViewStates } from 'states/view'
import type { Cell } from 'types/table'
import { bigNumberToNumber, limitNumberDecimals, numberWithCommas } from 'utils/number'
import { shortString } from 'utils/string'
import { countTablePages } from 'utils/table'
import { AccountIcon } from '../common/AccountIcon'
import { QUERY_OPERATOR_NOMINATORS_BY_ID } from './staking.query'

type Props = {
  operator: OperatorByIdQuery['operator_by_pk']
}

type Row = OperatorNominatorsByIdQuery['nominator'][0]

export const OperatorNominatorTable: FC<Props> = ({ operator }) => {
  const { ref, inView } = useInView()
  const { subspaceAccount } = useWallet()
  const { operatorId } = useParams<{ operatorId?: string }>()
  const inFocus = useWindowFocus()
  const { network } = useChains()
  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')
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
        accessorKey: 'account',
        header: 'Account Id',
        cell: ({ row }: Cell<Row>) => (
          <div className='row flex items-center gap-3'>
            <AccountIcon address={row.original.account_id} size={26} />
            <Link
              data-testid={`nominator-link-${row.original.id}-${row.original.account_id}-${row.index}}`}
              className='hover:text-purpleAccent'
              href={INTERNAL_ROUTES.accounts.id.page(
                network,
                Routes.consensus,
                row.original.account_id,
              )}
            >
              <div>
                {isLargeLaptop ? row.original.account_id : shortString(row.original.account_id)}
              </div>
            </Link>
          </div>
        ),
      },
      {
        accessorKey: 'stakes',
        header: 'Stakes',
        cell: ({ row }: Cell<Row>) => {
          return (
            <div>
              {numberWithCommas(
                limitNumberDecimals(
                  Number(
                    Number(
                      (BigInt(operator.current_total_stake) /
                        BigInt(operator.current_total_shares)) *
                        BigInt(row.original.shares),
                    ) /
                      10 ** 18,
                  ),
                ),
              )}{' '}
              {TOKEN.symbol}
            </div>
          )
        },
      },
      {
        accessorKey: 'shares',
        header: 'Shares',
        cell: ({ row }: Cell<Row>) => (
          <div>
            {numberWithCommas(
              limitNumberDecimals(
                Number(
                  Number(
                    (BigInt(row.original.shares) * BigInt(1000000000)) /
                      BigInt(operator.current_total_shares),
                  ) / 1000000000,
                ) * 100,
              ),
            )}{' '}
            %
          </div>
        ),
      },
      {
        accessorKey: 'owner',
        header: 'is Owner',
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
                  {`Staked: ${bigNumberToNumber((deposit.shares * sharesValue) / SHARES_CALCULATION_MULTIPLIER)} ${TOKEN.symbol}`}
                  <br />
                </>
              )}
              {deposit &&
                deposit.pending !== null &&
                deposit.pending.amount > BIGINT_ZERO &&
                `Pending: ${bigNumberToNumber(deposit.pending.amount + deposit.pending.storageFeeDeposit)} ${TOKEN.symbol}`}
            </div>
          )
        },
      })
    return cols
  }, [deposits, isLargeLaptop, op, operator, operatorId, network, subspaceAccount, useRpcData])

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

  const { setIsVisible } = useSquidQuery<
    OperatorNominatorsByIdQuery,
    OperatorNominatorsByIdQueryVariables
  >(
    QUERY_OPERATOR_NOMINATORS_BY_ID,
    {
      variables,
      skip: !inFocus,
      context: { clientName: 'staking' },
    },
    Routes.staking,
    'operatorNominators',
  )

  const {
    staking: { operatorNominators },
  } = useQueryStates()

  const nominators = useMemo(
    () => (hasValue(operatorNominators) ? operatorNominators.value.nominator : []),
    [operatorNominators],
  )

  const totalCount = useMemo(
    () =>
      (hasValue(operatorNominators) &&
        operatorNominators.value.nominator_aggregate.aggregate?.count) ||
      0,
    [operatorNominators],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
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
    </div>
  )
}
