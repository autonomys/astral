import { numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import Identicon from '@polkadot/react-identicon'
import { Column, Table } from 'components/common/Table'
import { INTERNAL_ROUTES } from 'constants/routes'
import { Nominator, Operator } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { FC } from 'react'
import { NominatorListCard } from './NominatorListCard'

interface Props {
  operator: Operator
  isDesktop?: boolean
}

export const OperatorNominatorTable: FC<Props> = ({ operator, isDesktop }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  // methods
  const generateColumns = (nominators: Nominator[]): Column[] => [
    {
      title: 'Account Id',
      cells: nominators.map(({ account, id }) => (
        <div key={`${id}-account-id`} className='row flex items-center gap-3'>
          <Identicon value={account.id} size={26} theme='beachball' />
          <Link
            data-testid={`nominator-account-link-${id}`}
            href={INTERNAL_ROUTES.accounts.id.page(
              selectedChain.urls.page,
              selectedDomain,
              account.id,
            )}
            className='hover:text-purpleAccent'
          >
            <div>{isLargeLaptop ? account.id : shortString(account.id)}</div>
          </Link>
        </div>
      )),
    },
    {
      title: 'Shares',
      cells: nominators.map(({ shares, id }, index) => {
        return (
          <div key={`${id}-nominator-shares-${index}`}>{shares ? numberWithCommas(shares) : 0}</div>
        )
      }),
    },
    {
      title: 'Owner',
      cells: nominators.map(({ id, account }, index) => {
        const isOwner = operator.operatorOwner === account.id

        return <div key={`${id}-nominator-owner-${index}`}>{isOwner ? 'Yes' : 'No'}</div>
      }),
    },
  ]

  // constants
  const columns = generateColumns(operator.nominators)

  return isDesktop ? (
    <div className='w-full'>
      <div className='my-6 rounded'>
        <Table
          columns={columns}
          emptyMessage='There are no nominators to show'
          id='operator-latest-nominators'
          tableProps='bg-white rounded-[20px] dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset dark:border-none'
          tableHeaderProps='border-b border-gray-200'
        />
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {operator.nominators.map((nominator, index) => (
        <NominatorListCard
          nominator={nominator}
          key={`operator-list-card-${nominator.id}-${index}`}
        />
      ))}
    </div>
  )
}
