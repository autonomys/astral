import { useApolloClient, useQuery } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { Nominator, NominatorsConnection } from 'gql/graphql'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { Link, useParams } from 'react-router-dom'

// common
import { Spinner } from 'common/components'
import NewTable from 'common/components/NewTable'
import { PAGE_SIZE } from 'common/constants'
import {
  bigNumberToNumber,
  downloadFullData,
  limitNumberDecimals,
  numberWithCommas,
  shortString,
} from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import useWallet from 'common/hooks/useWallet'
import { INTERNAL_ROUTES } from 'common/routes'

// operator
import { QUERY_NOMINATOR_CONNECTION_LIST } from 'Operator/query'
import { ActionsDropdown } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import NominatorListCard from './NominatorListCard'

const NominatorsList: FC = () => {
  const [searchNominator, setSearch] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const { subspaceAccount } = useWallet()
  const { operatorId } = useParams<{ operatorId?: string }>()

  const [action, setAction] = useState<OperatorAction>({
    type: OperatorActionType.None,
    operatorId: operatorId ? parseInt(operatorId) : null,
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
        accessorKey: 'nominator',
        header: 'Nominator',
        enableSorting: true,
        cell: ({ row }) => (
          <Link
            data-testid={`operator-link-${row.original.id}-${row.original.signingKey}-${row.index}}`}
            className='hover:text-[#DE67E4]'
            to={INTERNAL_ROUTES.accounts.id.page(
              selectedChain.urls.page,
              'consensus',
              row.original.account.id,
            )}
          >
            <div>{shortString(row.original.account.id)}</div>
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
        accessorKey: 'operatorId',
        header: 'OperatorId',
        enableSorting: true,
        cell: ({ row }) => (
          <div className='flex row items-center gap-3'>
            <Link
              data-testid={`nominator-link-${row.original.id}-${row.original.signingKey}-${row.index}}`}
              className='hover:text-[#DE67E4]'
              to={INTERNAL_ROUTES.operators.id.page(
                selectedChain.urls.page,
                selectedDomain,
                row.original.operator.id,
              )}
            >
              <div>{row.original.operator.id}</div>
            </Link>
          </div>
        ),
      },
      {
        accessorKey: 'stakes',
        header: 'Stakes',
        enableSorting: true,
        cell: ({ row }) => (
          <div>
            {numberWithCommas(
              limitNumberDecimals(
                Number(
                  Number(
                    (BigInt(row.original.operator.currentTotalStake) /
                      BigInt(row.original.operator.totalShares)) *
                      BigInt(row.original.shares),
                  ) /
                    10 ** 18,
                ),
              ),
            )}{' '}
            tSSC
          </div>
        ),
      },
      {
        accessorKey: 'shares',
        header: 'Shares',
        enableSorting: true,
        cell: ({ row }) => (
          <div>
            {numberWithCommas(
              limitNumberDecimals(
                Number(
                  Number(
                    (BigInt(row.original.shares) * BigInt(1000000000)) /
                      BigInt(row.original.operator.totalShares),
                  ) / 1000000000,
                ),
              ),
            )}{' '}
            %
          </div>
        ),
      },
      {
        accessorKey: 'minimumNominatorStake',
        header: 'Min. Stake',
        enableSorting: true,
        cell: ({ row }) => (
          <div>{`${bigNumberToNumber(row.original.operator.minimumNominatorStake)} tSSC`}</div>
        ),
      },
      {
        accessorKey: 'nominationTax',
        header: 'Nominator Tax',
        enableSorting: true,
        cell: ({ row }) => <div>{`${row.original.operator.nominationTax}%`}</div>,
      },
      {
        accessorKey: 'currentTotalStake',
        header: 'Total Stake',
        enableSorting: true,
        cell: ({ row }) => (
          <div>{`${bigNumberToNumber(row.original.operator.currentTotalStake)} tSSC`}</div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: true,
        cell: ({ row }) => <div>{row.original.operator.status}</div>,
      },
    ]
    if (subspaceAccount)
      cols.push({
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => {
          if (row.original.account.id !== subspaceAccount) return <> </>
          return (
            <ActionsDropdown
              action={action}
              handleAction={handleAction}
              row={row}
              excludeActions={[OperatorActionType.Deregister]}
              nominatorMaxStake={(
                (BigInt(row.original.operator.currentTotalStake) * BigInt(row.original.shares)) /
                BigInt(row.original.operator.totalShares)
              ).toString()}
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
      where: searchNominator ? { account: { id_eq: searchNominator } } : {},
    }),
    [sorting, pagination, searchNominator],
  )

  const { data, error, loading } = useQuery(QUERY_NOMINATOR_CONNECTION_LIST, {
    variables: variables,
    pollInterval: 6000,
  })

  useErrorHandler(error)

  const fullDataDownloader = useCallback(
    () => downloadFullData(apolloClient, QUERY_NOMINATOR_CONNECTION_LIST),
    [apolloClient],
  )

  const handleSearch = useCallback((value: string | number) => {
    setSearch(value.toString())
    setPagination({ ...pagination, pageIndex: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const nominators: NominatorsConnection = useMemo(
    () => (data && data.nominatorsConnection ? data.nominatorsConnection : []),
    [data],
  )
  const nominatorsConnection: Nominator[] = useMemo(
    () =>
      nominators && nominators.edges ? nominators.edges.map((nominator) => nominator.node) : [],
    [nominators],
  )
  const totalCount = useMemo(() => (nominators ? nominators.totalCount : 0), [nominators])
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  useEffect(() => {
    if (operatorId) handleSearch(operatorId)
  }, [operatorId, handleSearch])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='w-full flex flex-col align-middle'>
      <div className='flex flex-col gap-2'>
        <div className='w-full flex justify-between mt-5'>
          <div className='text-[#282929] text-base font-medium dark:text-white'>{`Nominators (${totalLabel})`}</div>
        </div>
      </div>

      <div className='w-full flex flex-col mt-5 sm:mt-0'>
        <div className='rounded my-6'>
          <NewTable
            data={nominatorsConnection}
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
                nominators={nominatorsConnection}
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

export default NominatorsList

type MobileComponentProps = {
  nominators: Nominator[]
  action: OperatorAction
  handleAction: (value: OperatorAction) => void
  subspaceAccount?: string
}

const MobileComponent: FC<MobileComponentProps> = ({ nominators, action, handleAction }) => (
  <div className='w-full'>
    {nominators.map((nominator, index) => (
      <NominatorListCard
        key={`operator-list-card-${nominator.id}`}
        nominator={nominator}
        action={action}
        handleAction={handleAction}
        index={index}
        excludeActions={[OperatorActionType.Deregister]}
        nominatorMaxStake={
          nominator &&
          (
            (BigInt(nominator.operator.currentTotalStake) * BigInt(nominator.shares)) /
            BigInt(nominator.operator.totalShares)
          ).toString()
        }
      />
    ))}
  </div>
)
