import { useApolloClient, useQuery } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { Operator, OperatorsConnection } from 'gql/graphql'
import { FC, useCallback, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { Link } from 'react-router-dom'

// common
import { Spinner } from 'common/components'
import DebouncedInput from 'common/components/DebouncedInput'
import NewTable from 'common/components/NewTable'
import { PAGE_SIZE } from 'common/constants'
import { bigNumberToNumber, downloadFullData, numberWithCommas, shortString } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import useWallet from 'common/hooks/useWallet'
import { INTERNAL_ROUTES } from 'common/routes'

// operator
import { QUERY_OPERATOR_CONNECTION_LIST } from 'Operator/query'
import { ActionsDropdown } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import OperatorsListCard from './OperatorsListCard'

const OperatorsList: FC = () => {
  const [searchOperator, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const { subspaceAccount } = useWallet()

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

  const { selectedChain, selectedDomain } = useDomains()
  const apolloClient = useApolloClient()

  const columns = useMemo(() => {
    const cols = [
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
        accessorKey: 'totalShares',
        header: 'Total Shares',
        enableSorting: true,
        cell: ({ row }) => <div>{numberWithCommas(row.original.totalShares)}</div>,
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
    ]
    if (subspaceAccount)
      cols.push({
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => {
          const nominator = row.original.nominators.find(
            (nominator) => nominator.id === `${row.original.id}-${subspaceAccount}`,
          )
          return (
            <ActionsDropdown
              action={action}
              handleAction={handleAction}
              row={row}
              excludeActions={
                nominator
                  ? [OperatorActionType.Deregister]
                  : [OperatorActionType.Deregister, OperatorActionType.Withdraw]
              }
              nominatorMaxStake={
                nominator &&
                (
                  (BigInt(row.original.currentTotalStake) * BigInt(nominator.shares)) /
                  BigInt(row.original.totalShares)
                ).toString()
              }
            />
          )
        },
      })
    return cols
  }, [subspaceAccount, selectedChain.urls.page, selectedDomain, action, handleAction])

  const variables = useMemo(
    () => ({
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
      orderBy: sorting.map((s) => `${s.id}_${s.desc ? 'DESC' : 'ASC'}`).join(',') || 'id_ASC',
      // eslint-disable-next-line camelcase
      where: searchOperator ? { id_eq: searchOperator } : {},
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

  const handleSearch = useCallback((value) => {
    setSearch(value)
    setPagination({ ...pagination, pageIndex: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='w-full flex flex-col align-middle'>
      <div className='flex flex-col gap-2'>
        <div className='w-full flex justify-between mt-5'>
          <div className='text-[#282929] text-base font-medium dark:text-white'>{`Operators (${totalLabel})`}</div>
        </div>
        <DebouncedInput
          type='text'
          className='max-w-xl dark:bg-[#1E254E] dark:text-white block px-4 py-[10px] w-full text-sm text-gray-900 rounded-3xl bg-white shadow-lg'
          placeholder='Search by operator id'
          onChange={handleSearch}
          value={searchOperator}
        />
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
                subspaceAccount={subspaceAccount}
              />
            }
          />
        </div>
      </div>
      <ActionsModal isOpen={isOpen} action={action} onClose={handleActionClose} />
    </div>
  )
}

export default OperatorsList

type MobileComponentProps = {
  operators: Operator[]
  action: OperatorAction
  handleAction: (value: OperatorAction) => void
  subspaceAccount?: string
}

const MobileComponent: FC<MobileComponentProps> = ({
  operators,
  action,
  handleAction,
  subspaceAccount,
}) => (
  <div className='w-full'>
    {operators.map((operator, index) => {
      const nominator =
        subspaceAccount &&
        operator.nominators.find(
          (nominator) => nominator.id === `${operator.id}-${subspaceAccount}`,
        )
      return (
        <OperatorsListCard
          key={`operator-list-card-${operator.id}`}
          operator={operator}
          action={action}
          handleAction={handleAction}
          index={index}
          excludeActions={
            nominator
              ? [OperatorActionType.Deregister]
              : [OperatorActionType.Deregister, OperatorActionType.Withdraw]
          }
          nominatorMaxStake={
            nominator &&
            (
              (BigInt(operator.currentTotalStake) * BigInt(nominator.shares)) /
              BigInt(operator.totalShares)
            ).toString()
          }
        />
      )
    })}
  </div>
)
