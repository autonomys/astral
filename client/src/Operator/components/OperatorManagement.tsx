import { useApolloClient, useQuery } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { Operator, OperatorsConnection } from 'gql/graphql'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { Link } from 'react-router-dom'

// common
import { Spinner } from 'common/components'
import NewTable from 'common/components/NewTable'
import { PAGE_SIZE } from 'common/constants'
import { bigNumberToNumber, downloadFullData, numberWithCommas, shortString } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import useMediaQuery from 'common/hooks/useMediaQuery'
import useWallet from 'common/hooks/useWallet'
import { INTERNAL_ROUTES } from 'common/routes'

// operator
import { QUERY_OPERATOR_CONNECTION_LIST } from 'Operator/query'
import { NotFound } from 'layout/components'
import { ActionsDropdown } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import OperatorsListCard from './OperatorsListCard'

const OperatorManagement: FC = () => {
  const [searchOperator, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const { subspaceAccount } = useWallet()
  const { selectedChain, selectedDomain } = useDomains()
  const apolloClient = useApolloClient()

  const [action, setAction] = useState<OperatorAction>({
    type: OperatorActionType.None,
    operatorId: null,
    maxAmount: null,
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleAction = useCallback((value: OperatorAction) => {
    setAction(value)
    if (value.type !== OperatorActionType.None) setIsOpen(true)
  }, [])
  const handleActionClose = useCallback(() => {
    setIsOpen(false)
    setAction({ type: OperatorActionType.None, operatorId: null, maxAmount: null })
  }, [])

  const columns = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: 'Id',
        enableSorting: true,
        cell: ({ row }) => (
          <Link
            data-testid={`operator-link-${row.original.id}-${row.original.signingKey}-${row.index}}`}
            className='hover:text-[#DE67E4]'
            to={INTERNAL_ROUTES.operators.id.page(
              selectedChain.urls.page,
              selectedDomain,
              row.original.id,
            )}
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
          <ActionsDropdown action={action} handleAction={handleAction} row={row} />
        ),
      },
    ]
  }, [selectedChain.urls.page, selectedDomain, action, handleAction])

  const variables = useMemo(
    () => ({
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
      orderBy: sorting.map((s) => `${s.id}_${s.desc ? 'DESC' : 'ASC'}`).join(',') || 'id_ASC',
      // eslint-disable-next-line camelcase
      where: searchOperator ? { operatorOwner_eq: searchOperator } : {},
    }),
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

  const operators: OperatorsConnection = useMemo(
    () => (data && data.operatorsConnection ? data.operatorsConnection : []),
    [data],
  )
  const operatorsConnection: Operator[] = useMemo(
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

  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  useEffect(() => {
    if (subspaceAccount) handleSearch(subspaceAccount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subspaceAccount])

  if (loading) return <Spinner />
  if (!subspaceAccount) return <NotFound />

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
          {subspaceAccount && (
            <span 
              className={`text-base ${
                isDesktop ? 'text-base' : 'text-xs'
              } font-normal ml-2 dark:text-[#1E254E]`}>
              on Account {subspaceAccount}
            </span>
          )}
        </div>
      </div>

      <div className='w-full flex flex-col mt-5 sm:mt-0'>
        <div className='rounded my-6'>
          <NewTable
            data={operatorsConnection}
            columns={columns}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={setSorting}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={setPagination}
            fullDataDownloader={fullDataDownloader}
            mobileComponent={
              <MobileComponent
                operators={operatorsConnection}
                action={action}
                handleAction={handleAction}
              />
            }
          />
        </div>
      </div>

      <div className='p-5 mt-8 bg-[#DDEFF1] dark:bg-[#2A345E] rounded-[20px]'>
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
      <ActionsModal isOpen={isOpen} action={action} onClose={handleActionClose} />
    </div>
  )
}

export default OperatorManagement

type MobileComponentProps = {
  operators: Operator[]
  action: OperatorAction
  handleAction: (value: OperatorAction) => void
}

const MobileComponent: FC<MobileComponentProps> = ({ operators, action, handleAction }) => (
  <div className='w-full'>
    {operators.map((operator, index) => (
      <OperatorsListCard
        index={index}
        operator={operator}
        action={action}
        handleAction={handleAction}
        key={`operator-list-card-${operator.id}`}
      />
    ))}
  </div>
)
