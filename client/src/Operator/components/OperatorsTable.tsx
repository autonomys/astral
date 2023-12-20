import { FC, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Operator } from 'gql/graphql'
import toast from 'react-hot-toast'

// common
import { Table, Column } from 'common/components'
import { bigNumberToNumber, numberWithCommas, shortString } from 'common/helpers'
import useMediaQuery from 'common/hooks/useMediaQuery'

// operator
import OperatorsListCard from 'Operator/components/OperatorsListCard'
import { Link } from 'react-router-dom'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'
import OperatorNominateModal from './OperatorNominateModal'
import { ethers } from 'ethers'

dayjs.extend(relativeTime)

interface Props {
  operators: Operator[]
}

const OperatorsTable: FC<Props> = ({ operators }) => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [isOpen, setIsOpen] = useState(false)
  const [operator, setSelectedOperator] = useState<Operator>()
  const [amount, setAmount] = useState(0)
  const { selectedChain, selectedDomain, api, selectedAccount, injectedExtension } = useDomains()

  const chain = selectedChain.urls.page

  const handleNominate = async (operator) => {
    if (!api || !selectedAccount || !injectedExtension) {
      toast.error('No wallet connected or no address available', {
        position: 'bottom-center',
      })
      return
    }

    setSelectedOperator(operator)
    setAmount(bigNumberToNumber(operator.minimumNominatorStake))
    setIsOpen(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!api || !selectedAccount || !injectedExtension || !operator) {
      return toast.error('No wallet connected or no address available', {
        position: 'bottom-center',
      })
    }

    const result = await (await api.query.system.account(selectedAccount.address)).toJSON()
    console.log('🚀 ~ file: OperatorsTable.tsx:57 ~ handleSubmit ~ result:', result)

    const nominatorMinStake = bigNumberToNumber(operator.minimumNominatorStake)
    // const accountBalance = bigNumberToNumber(result?.data?.free)

    const isNominator = operator?.nominators?.find(
      (nominator) => nominator.id === selectedAccount?.address,
    )

    if (!isNominator && amount < nominatorMinStake) {
      return toast.error('Amount is less than minimum stake', {
        position: 'bottom-center',
      })
    }

    const amountInWei = ethers.parseUnits(amount.toString(), 'wei')

    try {
      const hash = await api.tx.domains
        .nominateOperator(operator.id, amountInWei)
        .signAndSend(selectedAccount.address, {
          signer: injectedExtension.signer,
        })

      toast.success(`Tx sent ${hash}`, {
        position: 'bottom-center',
      })

      setIsOpen(false)
    } catch (err) {
      toast.error(`Something went wrong ${err}`, {
        position: 'bottom-center',
      })
    }
  }

  // methods
  const generateColumns = (operators: Operator[]): Column[] => [
    {
      title: 'id',
      cells: operators.map(({ id, signingKey }, index) => (
        <Link
          key={`${id}-operator-id-${signingKey}-${index}`}
          data-testid={`operator-link-${id}-${signingKey}-${index}}`}
          className='hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.operators.id.page(chain, selectedDomain, id)}
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
      title: 'Min. Stake',
      cells: operators.map(({ minimumNominatorStake, id }) => (
        <div key={`${id}-operator-minimum-stake`}>
          {`${bigNumberToNumber(minimumNominatorStake)} tSSC`}
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
      title: 'Total Stake',
      cells: operators.map(({ currentTotalStake, id }) => (
        <div key={`${id}-operator-stake`}>{`${bigNumberToNumber(currentTotalStake)} tSSC`}</div>
      )),
    },
    {
      title: 'Total Shares',
      cells: operators.map(({ totalShares, id }) => (
        <div key={`${id}-operator-shares`}>{numberWithCommas(totalShares)}</div>
      )),
    },
    {
      title: 'Nominators',
      cells: operators.map(({ nominators, id }) => (
        <div key={`${id}-operator-nominator`}>{`${nominators ? nominators.length : 0}/256`}</div>
      )),
    },
    {
      title: 'Status',
      cells: operators.map(({ status, id }) => <div key={`${id}-operator-status`}>{status}</div>),
    },
    {
      title: 'Nominate',
      cells: operators.map((operator) => (
        <div key={`${operator.id}-operator-created`}>
          <button
            onClick={() => handleNominate(operator)}
            className='flex items-center justify-center w-full h-full px-4 py-2 text-sm font-medium text-white bg-[#DE67E4] rounded-md hover:bg-[#D64FC5]'
          >
            Nominate
          </button>
        </div>
      )),
    },
  ]

  // constants
  const columns = generateColumns(operators)

  return isDesktop ? (
    <div className='w-full'>
      <div className='rounded my-6'>
        <Table
          columns={columns}
          emptyMessage='There are no operators to show'
          tableProps='bg-white rounded-[20px] dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
          tableHeaderProps='border-b border-gray-200'
          id='operators-list'
        />
      </div>
      <OperatorNominateModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className='text-center w-80'>
          <div className='w-full p-10 mx-auto my-4'>
            <h3 className='font-medium text-[#241235] text-base break-all dark:text-white'>
              Nominate Operator
            </h3>

            <div className='w-full mt-4 flex flex-col gap-6'>
              <div className='flex justify-between'>
                <div className='flex flex-col justify-between gap-2 text-start'>
                  <div className='text-[#241235] text-sm  dark:text-white'>Operator </div>
                  <div className='text-[#857EC2] text-sm  dark:text-white/75'>{operator?.id}</div>
                </div>
                <div className='flex flex-col justify-between gap-2 text-start'>
                  <div className='text-[#241235] text-sm  dark:text-white'>Domain </div>
                  <div className='text-[#857EC2] text-sm  dark:text-white/75'>
                    {operator?.currentDomainId === 0 ? 'Subspace' : 'Nova'}
                  </div>
                </div>
              </div>

              <div className='flex justify-between text-start'>
                <div className='text-[#857EC2] text-xs  dark:text-white/75'>Min Amount</div>
                <div className='text-[#857EC2] text-xs  dark:text-white/75'>{`${bigNumberToNumber(
                  operator ? operator.minimumNominatorStake : 0,
                )} tSSC`}</div>
              </div>

              <form onSubmit={(event) => handleSubmit(event)}>
                <div className='flex flex-col gap-4'>
                  <input
                    value={amount}
                    type='number'
                    className='form-control'
                    placeholder='Amount'
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
                <button type='submit' className='btn btn-primary mt-2'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </OperatorNominateModal>
    </div>
  ) : (
    <div className='w-full'>
      {operators.map((operator, index) => (
        <OperatorsListCard
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
