import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import { Table, Column } from 'common/components'
import { shortString } from 'common/helpers'
import useMediaQuery from 'common/hooks/useMediaQuery'

// operator
import { Operator } from 'operator/helpers/types'
import OperatorListCard from './OperatorListCard'

dayjs.extend(relativeTime)

interface Props {
  operators: Operator[]
}

const OperatorTable: FC<Props> = ({ operators }) => {
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  // methods
  const generateColumns = (operators: Operator[]): Column[] => [
    {
      title: 'id',
      cells: operators.map((id, index) => <div key={`${id}-account-index`}>{index + 1}</div>),
    },
    {
      title: 'Signing Key',
      cells: operators.map(({ id, signingKey }) => (
        <div key={`${id}-operator-id`} className='flex row items-center gap-3'>
          <div>{isLargeLaptop ? signingKey : shortString(signingKey)}</div>
        </div>
      )),
    },
    {
      title: 'Minimun Stake',
      cells: operators.map(({ minimumNominatorStake, id }) => (
        <div key={`${id}-operator-minimum-stake`}>{minimumNominatorStake}</div>
      )),
    },
    {
      title: 'Nominator Tax',
      cells: operators.map(({ nominationTax, id }) => (
        <div key={`${id}-operator-tax`}>{nominationTax}</div>
      )),
    },
    {
      title: 'Current Total Stake',
      cells: operators.map(({ currentTotalStake, id }) => (
        <div key={`${id}-operator-stake`}>{currentTotalStake}</div>
      )),
    },
    {
      title: 'Total Shares',
      cells: operators.map(({ totalShares, id }) => (
        <div key={`${id}-operator-shares`}>{totalShares}</div>
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
          key={`operator-list-card-${operator.id}`}
        />
      ))}
    </div>
  )
}

export default OperatorTable
