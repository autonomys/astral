import Identicon from '@polkadot/react-identicon'
import { Column, Table } from 'common/components'
import { numberWithCommas, shortString } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import useMediaQuery from 'common/hooks/useMediaQuery'
import { INTERNAL_ROUTES } from 'common/routes'
import { Nominator } from 'gql/graphql'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import NominatorListCard from './NominatorListCard'

interface Props {
  nominators: Nominator[]
  isDesktop?: boolean
}

const OperatorNominatorTable: FC<Props> = ({ nominators, isDesktop }) => {
  const { selectedChain } = useDomains()
  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  // methods
  const generateColumns = (nominators: Nominator[]): Column[] => [
    {
      title: 'Account Id',
      cells: nominators.map(({ account, id }) => (
        <div key={`${id}-account-id`} className='flex row items-center gap-3'>
          <Identicon value={account.id} size={26} theme='beachball' />
          <Link
            data-testid={`nominator-account-link-${id}`}
            to={INTERNAL_ROUTES.accounts.id.page(selectedChain.urls.page, account.id)}
            className='hover:text-[#DE67E4]'
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
  ]

  // constants
  const columns = generateColumns(nominators)

  return isDesktop ? (
    <div className='w-full'>
      <div className='rounded my-6'>
        <Table
          columns={columns}
          emptyMessage='There are no nominators to show'
          id='operator-latest-nominators'
          tableProps='bg-white rounded-[20px] dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
          tableHeaderProps='border-b border-gray-200'
        />
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {nominators.map((nominator, index) => (
        <NominatorListCard
          nominator={nominator}
          key={`operator-list-card-${nominator.id}-${index}`}
        />
      ))}
    </div>
  )
}

export default OperatorNominatorTable
