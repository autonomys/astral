import { limitNumberDecimals, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { SortedTable } from 'components/common/SortedTable'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { Nominator, Operator } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import type { Cell } from 'types/table'
import { AccountIcon } from '../common/AccountIcon'

interface Props {
  operator: Operator
}

export const OperatorNominatorTable: FC<Props> = ({ operator }) => {
  const { selectedChain } = useDomains()
  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  const columns = useMemo(
    () => [
      {
        accessorKey: 'account',
        header: 'Account Id',
        cell: ({ row }: Cell<Nominator>) => (
          <div className='row flex items-center gap-3'>
            <AccountIcon address={row.original.account.id} size={26} />
            <Link
              data-testid={`nominator-link-${row.original.id}-${row.original.account.id}-${row.index}}`}
              className='hover:text-purpleAccent'
              href={INTERNAL_ROUTES.accounts.id.page(
                selectedChain.urls.page,
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
        cell: ({ row }: Cell<Nominator>) => (
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
            {selectedChain.token.symbol}
          </div>
        ),
      },
      {
        accessorKey: 'shares',
        header: 'Shares',
        cell: ({ row }: Cell<Nominator>) => (
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
        cell: ({ row }: Cell<Nominator>) =>
          operator.operatorOwner === row.original.account.id ? 'Yes' : 'No',
      },
    ],
    [
      isLargeLaptop,
      operator.currentTotalStake,
      operator.operatorOwner,
      operator.totalShares,
      selectedChain.token.symbol,
      selectedChain.urls.page,
    ],
  )

  return (
    <SortedTable
      data={operator.nominators}
      columns={columns}
      showNavigation={false}
      pagination={{
        pageSize: operator.nominators.length,
        pageIndex: 0,
      }}
      pageCount={1}
      filename='operator-nominators-list'
      pageSizeOptions={[10]}
    />
  )
}
