import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { BIGINT_ZERO, PAGE_SIZE, SHARES_CALCULATION_MULTIPLIER, TOKEN } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  NominatorOrderByInput,
  OperatorByIdQuery,
  OperatorNominatorsByIdQuery,
  OperatorNominatorsByIdQueryVariables,
} from 'gql/oldSquidTypes'
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
import { sort } from 'utils/sort'
import { shortString } from 'utils/string'
import { countTablePages } from 'utils/table'
import { AccountIcon } from '../common/AccountIcon'
import { QUERY_OPERATOR_NOMINATORS_BY_ID } from './query'

type Props = {
  operator: OperatorByIdQuery['operatorById']
}

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
    if (!operator || operator.totalShares == 0) return []
    const cols = [
      {
        accessorKey: 'account',
        header: 'Account Id',
        cell: ({
          row,
        }: Cell<OperatorNominatorsByIdQuery['nominatorsConnection']['edges'][0]['node']>) => (
          <div className='row flex items-center gap-3'>
            <AccountIcon address={row.original.account.id} size={26} />
            <Link
              data-testid={`nominator-link-${row.original.id}-${row.original.account.id}-${row.index}}`}
              className='hover:text-purpleAccent'
              href={INTERNAL_ROUTES.accounts.id.page(
                network,
                Routes.consensus,
                row.original.account.id,
              )}
            >
              <div>
                {isLargeLaptop ? row.original.account.id : shortString(row.original.account.id)}
              </div>
            </Link>
          </div>
        ),
      },
      {
        accessorKey: 'stakes',
        header: 'Stakes',
        cell: ({
          row,
        }: Cell<OperatorNominatorsByIdQuery['nominatorsConnection']['edges'][0]['node']>) => {
          return (
            <div>
              {numberWithCommas(
                limitNumberDecimals(
                  Number(
                    Number(
                      (BigInt(operator.currentTotalStake) / BigInt(operator.totalShares)) *
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
        cell: ({
          row,
        }: Cell<OperatorNominatorsByIdQuery['nominatorsConnection']['edges'][0]['node']>) => (
          <div>
            {numberWithCommas(
              limitNumberDecimals(
                Number(
                  Number(
                    (BigInt(row.original.shares) * BigInt(1000000000)) /
                      BigInt(operator.totalShares),
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
        cell: ({
          row,
        }: Cell<OperatorNominatorsByIdQuery['nominatorsConnection']['edges'][0]['node']>) =>
          operator.operatorOwner === row.original.account.id ? 'Yes' : 'No',
      },
    ]
    if (
      useRpcData &&
      deposits.find((d) => d.account === subspaceAccount && d.operatorId.toString() === operatorId)
    )
      cols.push({
        accessorKey: 'myStake',
        header: 'My Stake',
        cell: ({
          row,
        }: Cell<OperatorNominatorsByIdQuery['nominatorsConnection']['edges'][0]['node']>) => {
          const deposit = deposits.find(
            (d) => d.account === row.original.account.id && d.operatorId.toString() === operatorId,
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
    () => sort(sorting, NominatorOrderByInput.IdAsc) as NominatorOrderByInput,
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
      where: { operator: { id_eq: operatorId } },
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
    },
    Routes.staking,
    'operatorNominators',
  )

  const {
    staking: { operatorNominators },
  } = useQueryStates()

  const nominators = useMemo(() => {
    if (useRpcData)
      return deposits
        .filter((deposit) => deposit.operatorId === Number(operatorId))
        .map((deposit) => ({
          id: deposit.account,
          account: { id: deposit.account },
          shares: deposit.shares,
        }))
    return hasValue(operatorNominators)
      ? operatorNominators.value.nominatorsConnection.edges.map((edge) => edge.node)
      : []
  }, [deposits, operatorId, operatorNominators, useRpcData])

  const totalCount = useMemo(
    () =>
      hasValue(operatorNominators) ? operatorNominators.value.nominatorsConnection.totalCount : 0,
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
