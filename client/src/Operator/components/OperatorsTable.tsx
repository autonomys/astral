import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Operator } from 'gql/graphql'

// common
import { Table, Column } from 'common/components'
import { bigNumberToNumber, shortString } from 'common/helpers'
import useMediaQuery from 'common/hooks/useMediaQuery'

// operator
import OperatorListCard from 'Operator/components/OperatorListCard'
import { Link } from 'react-router-dom'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

interface Props {
  operators: Operator[]
}

const OperatorsTable: FC<Props> = ({ operators }) => {
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const { selectedChain } = useDomains()

  const chain = selectedChain.urls.page

  // methods
  const generateColumns = (operators: Operator[]): Column[] => [
    {
      title: 'id',
      cells: operators.map(({ id, signingKey }, index) => (
        <Link
          key={`${id}-operator-id-${signingKey}-${index}`}
          data-testid={`operator-link-${id}-${signingKey}-${index}}`}
          className='hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.operators.id.page(chain, id)}
        >
          <div>{id}</div>
        </Link>
      )),
    },
    {
      title: 'Domain',
      cells: operators.map(({ currentDomainId, id }) => (
        <div key={`${id}-operator-domain`}>{currentDomainId === 0 ? 'Subspace' : 'Nova'}</div>
      )),
    },
    {
      title: 'Signing Key',
      cells: operators.map(({ id, signingKey }) => (
        <div key={`${id}-operator-id`} className='flex row items-center gap-3'>
          <div>{shortString(signingKey)}</div>
        </div>
      )),
    },
    {
      title: 'Minimun Stake',
      cells: operators.map(({ minimumNominatorStake, id }) => (
        <div key={`${id}-operator-minimum-stake`}>
          {`${bigNumberToNumber(minimumNominatorStake, 18)} tSSC`}
        </div>
      )),
    },
    {
      title: 'Nominator Tax',
      cells: operators.map(({ nominationTax, id }) => (
        <div key={`${id}-operator-tax`}>{`${nominationTax}%`}</div>
      )),
    },
    {
      title: 'Current Total Stake',
      cells: operators.map(({ currentTotalStake, id }) => (
        <div key={`${id}-operator-stake`}>{`${bigNumberToNumber(currentTotalStake, 18)} tSSC`}</div>
      )),
    },
    {
      title: 'Total Shares',
      cells: operators.map(({ totalShares, id }) => (
        <div key={`${id}-operator-shares`}>{bigNumberToNumber(totalShares, 18)}</div>
      )),
    },
    {
      title: 'Status',
      cells: operators.map(({ status, id }) => <div key={`${id}-account-balance`}>{status}</div>),
    },
  ]

  // constants
  const columns = generateColumns(operators)

  return isDesktop ? (
    <div className='w-full'>
      <div className='rounded my-6'>
        <Table
          columns={columns}
          emptyMessage='There are no accounts to show'
          tableProps='bg-white rounded-[20px] dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
          tableHeaderProps='border-b border-gray-200'
          id='operators-list'
        />
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {operators.map((operator, index) => (
        <OperatorListCard
          index={index}
          operator={operator}
          isDesktop={isDesktop}
          key={`operator-list-card-${operator.id}`}
        />
      ))}
    </div>
  )
}

export default OperatorsTable
