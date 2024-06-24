import { numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import Identicon from '@polkadot/react-identicon'
import { NewTable } from 'components/common/NewTable'
import { INTERNAL_ROUTES } from 'constants/routes'
import { Nominator, Operator } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import type { Cell } from 'types/table'

interface Props {
  operator: Operator
}

export const OperatorNominatorTable: FC<Props> = ({ operator }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  const columns = useMemo(
    () => [
      {
        accessorKey: 'account',
        header: 'Account Id',
        cell: ({ row }: Cell<Nominator>) => (
          <div className='row flex items-center gap-3'>
            <Identicon value={row.original.account.id} size={26} theme='beachball' />
            <Link
              data-testid={`nominator-link-${row.original.id}-${row.original.account.id}-${row.index}}`}
              className='hover:text-purpleAccent'
              href={INTERNAL_ROUTES.accounts.id.page(
                selectedChain.urls.page,
                selectedDomain,
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
        accessorKey: 'shares',
        header: 'Shares',
        cell: ({ row }: Cell<Nominator>) => {
          const percent = (row.original.shares / operator.totalShares) * 100
          const isOwner = operator.operatorOwner === row.original.account.id
          return (
            <>
              {isLargeLaptop && (
                <div>{row.original.shares ? numberWithCommas(row.original.shares) : 0}</div>
              )}
              {percent.toFixed(2)}%{isOwner ? 'Yes' : 'No'}
            </>
          )
        },
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
      operator.operatorOwner,
      operator.totalShares,
      selectedChain.urls.page,
      selectedDomain,
    ],
  )

  return (
    <NewTable
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
