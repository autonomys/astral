import { useApolloClient, useQuery } from '@apollo/client'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { SortingState } from '@tanstack/react-table'
import { Operator } from 'gql/graphql'
import { FC, Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { Link } from 'react-router-dom'

// common
import { Spinner } from 'common/components'
import NewTable from 'common/components/NewTable'
import { PAGE_SIZE } from 'common/constants'
import { bigNumberToNumber, downloadFullData, numberWithCommas, shortString } from 'common/helpers'
import { formatAddress } from 'common/helpers/formatAddress'
import useDomains from 'common/hooks/useDomains'
import useMediaQuery from 'common/hooks/useMediaQuery'
import useWallet from 'common/hooks/useWallet'
import { INTERNAL_ROUTES } from 'common/routes'

// operator
import { QUERY_OPERATOR_CONNECTION_LIST } from 'Operator/query'
import { NotFound } from 'layout/components'
import OperatorsListCard from './OperatorsListCard'

enum OperatorActionType {
  None = 'none',
  AddFunds = 'Add Funds',
  Withdraw = 'Withdraw',
  Deregister = 'Deregister',
}

type OperatorAction = {
  type: OperatorActionType
  operatorId: number | null
}

const OperatorManagement: FC = () => {
  const [searchOperator, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const { actingAccount } = useWallet()
  const { selectedChain, selectedDomain } = useDomains()
  const apolloClient = useApolloClient()

  const [action, setAction] = useState<OperatorAction>({
    type: OperatorActionType.None,
    operatorId: null,
  })

  const cols = useMemo(
    () => createColumns(selectedDomain, selectedChain.urls.page, action, setAction),
    [selectedDomain, selectedChain.urls.page, action],
  )

  const variables = useMemo(
    () => getQueryVariables(sorting, pagination, searchOperator),
    [sorting, pagination, searchOperator],
  )

  const { data, error, loading } = useQuery(QUERY_OPERATOR_CONNECTION_LIST, {
    variables: variables,
    pollInterval: 6000,
  })

  useErrorHandler(error)

  const fullDataDownloader = useCallback(
    () => downloadFullData(apolloClient, QUERY_OPERATOR_CONNECTION_LIST),
    [apolloClient],
  )

  const handleSearch = useCallback(
    (value) => {
      setSearch(value)
      setPagination({ ...pagination, pageIndex: 0 })
    },
    [pagination],
  )

  const operators = useMemo(
    () => (data && data.operatorsConnection ? data.operatorsConnection : []),
    [data],
  )
  const operatorsConnection = useMemo(
    () => (operators && operators.edges ? operators.edges.map((operator) => operator.node) : []),
    [operators],
  )
  const totalCount = useMemo(() => (operators ? operators.totalCount : 0), [operators])
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const totalNominators = useMemo(
    () =>
      operators.edges
        ? operators.edges.reduce((acc, operator) => acc + operator.node.nominators.length, 0)
        : 0,
    [operators],
  )
  const totalOperatorStake = useMemo(
    () =>
      operators.edges
        ? operators.edges
            .reduce((acc, operator) => acc + BigInt(operator.node.currentTotalStake), BigInt(0))
            .toString()
        : '0',
    [operators],
  )
  const totalNominatorsStake = useMemo(
    () =>
      operators.edges
        ? operators.edges
            .reduce((acc, operator) => {
              const nominators = operator.node.nominators
              const totalShares = operator.node.totalShares
              const currentTotalStake = operator.node.currentTotalStake
              const subTotalNominatorsShares = nominators.reduce((acc, nominator) => {
                if (nominator.id === `${operator.node.id}-${operator.node.operatorOwner}`)
                  return acc
                return acc + BigInt(nominator.shares)
              }, BigInt(0))
              const subTotalNominatorsStake =
                (BigInt(currentTotalStake) * BigInt(subTotalNominatorsShares)) / BigInt(totalShares)
              return acc + subTotalNominatorsStake
            }, BigInt(0))
            .toString()
        : '0',
    [operators],
  )
  const totalInStake = useMemo(
    () => (BigInt(totalOperatorStake) + BigInt(totalNominatorsStake)).toString(),
    [totalOperatorStake, totalNominatorsStake],
  )

  useEffect(() => {
    if (actingAccount) handleSearch(formatAddress(actingAccount.address))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actingAccount])

  if (loading) return <Spinner />
  if (!actingAccount) return <NotFound />

  const pageCount = Math.floor(totalCount / pagination.pageSize)

  return (
    <div className='w-full flex flex-col align-middle'>
      <div className='flex flex-col gap-2'>
        <div className='w-full flex justify-between mt-5'>
          <div
            className={`text-[#241235] ${
              isDesktop ? 'text-4xl' : 'text-xl'
            } font-bold leading-tight tracking-tight dark:text-white`}
          >
            Pool operator
          </div>
        </div>
        <div
          className={`text-[#241235] ${
            isDesktop ? 'text-2xl' : 'text-lg'
          } mt-4 font-bold leading-tight tracking-tight dark:text-white`}
        >
          Information across operators
          {actingAccount && (
            <span className={`text-base ${isDesktop ? 'text-base' : 'text-xs'} font-normal ml-2`}>
              on Account {formatAddress(actingAccount.address)}
            </span>
          )}
        </div>
      </div>

      <div className='w-full flex flex-col mt-5 sm:mt-0'>
        <div className='rounded my-6'>
          <NewTable
            data={operatorsConnection}
            columns={cols}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={setSorting}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={setPagination}
            fullDataDownloader={fullDataDownloader}
            mobileComponent={<MobileComponent operators={operatorsConnection} />}
          />
        </div>
      </div>

      <div className='p-5 mt-8 bg-[#DDEFF1] rounded-[20px]'>
        <div className='ml-4 w-full'>
          <div className='relative'>
            <div className={`grid ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'} gap-4`}>
              <div className='p-4'>
                <span
                  className={`text-[#241235] ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  Number of Operators
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-[#241235] ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  {totalLabel}
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-[#241235] ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  Number of Nominators
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-[#241235] ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  {totalNominators}
                </span>
              </div>

              <div className='p-4'>
                <span
                  className={`text-[#241235] ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  Funds in Stake
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-[#241235] ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  {bigNumberToNumber(totalInStake)} tSSC
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-[#241235] ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  Available for Withdrawal
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-[#241235] ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  {bigNumberToNumber(totalOperatorStake)} tSSC*
                </span>
              </div>

              <div className='p-4'>
                <span
                  className={`text-[#241235] ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  Operator funds
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-[#241235] ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  {bigNumberToNumber(totalOperatorStake)} tSSC
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-[#241235] ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  Nominator funds
                </span>
              </div>
              <div className='p-4'>
                <span
                  className={`text-[#241235] ${
                    isDesktop ? 'text-base' : 'text-sm'
                  } font-medium dark:text-white`}
                >
                  {bigNumberToNumber(totalNominatorsStake)} tSSC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OperatorManagement

const createColumns = (selectedDomain, chain, action, setAction) => {
  return [
    {
      accessorKey: 'id',
      header: 'Id',
      enableSorting: true,
      cell: ({ row }) => (
        <Link
          data-testid={`operator-link-${row.original.id}-${row.original.signingKey}-${row.index}}`}
          className='hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.operators.id.page(chain, selectedDomain, row.original.id)}
        >
          <div>{row.original.id}</div>
        </Link>
      ),
    },
    {
      accessorKey: 'currentDomainId',
      header: 'Domain',
      enableSorting: true,
      cell: ({ row }) => <div>{row.original.currentDomainId === 0 ? 'Subspace' : 'Nova'}</div>,
    },
    {
      accessorKey: 'signingKey',
      header: 'Signing Key',
      enableSorting: true,
      cell: ({ row }) => (
        <div className='flex row items-center gap-3'>
          <div>{shortString(row.original.signingKey)}</div>
        </div>
      ),
    },
    {
      accessorKey: 'minimumNominatorStake',
      header: 'Min. Stake',
      enableSorting: true,
      cell: ({ row }) => (
        <div>{`${bigNumberToNumber(row.original.minimumNominatorStake)} tSSC`}</div>
      ),
    },
    {
      accessorKey: 'nominationTax',
      header: 'Nominator Tax',
      enableSorting: true,
      cell: ({ row }) => <div>{`${row.original.nominationTax}%`}</div>,
    },
    {
      accessorKey: 'currentTotalStake',
      header: 'Total Stake',
      enableSorting: true,
      cell: ({ row }) => <div>{`${bigNumberToNumber(row.original.currentTotalStake)} tSSC`}</div>,
    },
    {
      accessorKey: 'nominators',
      header: 'Nominators',
      enableSorting: false,
      cell: ({ row }) => (
        <div>{`${row.original.nominators ? row.original.nominators.length : 0}/256`}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      enableSorting: true,
      cell: ({ row }) => <div>{row.original.status}</div>,
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => (
        <Listbox
          value={action.type}
          onChange={(val) =>
            setAction({
              type: val,
              operatorId: row.original.id,
            })
          }
        >
          <div className='relative'>
            <Listbox.Button className='font-["Montserrat"] relative w-full cursor-default mt-4 rounded-full bg-[#DE67E4] text-white py-[10px] pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:bg-gradient-to-r from-[#EA71F9] to-[#4D397A] dark:text-white'>
              <div className='flex items-center justify-center'>
                <span className='hidden sm:block ml-2 truncate w-5 text-sm md:w-full '>
                  Actions
                </span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ChevronDownIcon
                    className='h-5 w-5 text-gray-400 ui-open:rotate-180 ui-open:transform dark:text-[#DE67E4]'
                    aria-hidden='true'
                  />
                </span>
              </div>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute mt-1 max-h-60 w-auto md:w-full overflow-auto rounded-xl bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-[#1E254E] dark:text-white'>
                {Object.keys(OperatorActionType)
                  .slice(1)
                  .map((actionType, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 text-gray-900 md:pl-4 pr-4 dark:text-white ${
                          active && 'bg-gray-100 dark:bg-[#2A345E]'
                        }`
                      }
                      value={actionType}
                    >
                      {({ selected }) => {
                        return (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              } ${
                                OperatorActionType[actionType] === OperatorActionType.Deregister &&
                                'text-red-500'
                              }`}
                            >
                              {OperatorActionType[actionType]}
                            </span>
                            {selected ? (
                              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#37D058]'>
                                <CheckIcon className='h-5 w-5 hidden md:block' aria-hidden='true' />
                              </span>
                            ) : null}
                          </>
                        )
                      }}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ),
    },
  ]
}

const getQueryVariables = (sorting, pagination, searchOperator) => {
  return {
    first: pagination.pageSize,
    after:
      pagination.pageIndex > 0
        ? (pagination.pageIndex * pagination.pageSize).toString()
        : undefined,
    orderBy: sorting.map((s) => `${s.id}_${s.desc ? 'DESC' : 'ASC'}`).join(',') || 'id_ASC',
    // eslint-disable-next-line camelcase
    where: searchOperator ? { operatorOwner_eq: searchOperator } : {},
  }
}

type MobileComponentProps = {
  operators: Operator[]
}

const MobileComponent: FC<MobileComponentProps> = ({ operators }) => (
  <div className='w-full'>
    {operators.map((operator, index) => (
      <OperatorsListCard
        index={index}
        operator={operator}
        key={`operator-list-card-${operator.id}`}
      />
    ))}
  </div>
)
