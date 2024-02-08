import { useApolloClient, useQuery } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { Nominator, NominatorsConnection } from 'gql/graphql'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { Link } from 'react-router-dom'

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
import useMediaQuery from 'common/hooks/useMediaQuery'
import useWallet from 'common/hooks/useWallet'
import { INTERNAL_ROUTES } from 'common/routes'

// operator
import { QUERY_NOMINATOR_CONNECTION_LIST } from 'Operator/query'
import { NotFound } from 'layout/components'
import { ActionsDropdown } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import NominatorListCard from './NominatorListCard'

const NominationManagement: FC = () => {
  const [searchNominator, setSearch] = useState<string>('')
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
    const cols = [
      {
        accessorKey: 'nominator',
        header: 'Nominator',
        enableSorting: true,
        cell: ({ row }) => (
          <Link
            data-testid={`nominator-link-${row.original.id}-${row.original.signingKey}-${row.index}}`}
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
        cell: ({ row }) => (
          <div>{row.original.operator.currentDomainId === 0 ? 'Subspace' : 'Nova'}</div>
        ),
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
      {
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => (
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
        ),
      },
    ]
    return cols
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

  const handleSearch = useCallback(
    (value) => {
      setSearch(value)
      setPagination({ ...pagination, pageIndex: 0 })
    },
    [pagination],
  )

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

  const totalInStake = useMemo(
    () =>
      nominatorsConnection
        .reduce(
          (acc, nominator) =>
            acc +
            (BigInt(nominator.operator.currentTotalStake) /
              BigInt(nominator.operator.totalShares)) *
              BigInt(nominator.shares),
          BigInt(0),
        )
        .toString(),
    [nominatorsConnection],
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
            Operator Nomination
          </div>
        </div>
        <div
          className={`text-[#241235] ${
            isDesktop ? 'text-2xl' : 'text-lg'
          } mt-4 font-bold leading-tight tracking-tight dark:text-white`}
        >
          Information across nominations
          {subspaceAccount && (
            <span
              className={`text-base ${
                isDesktop ? 'text-base' : 'text-xs'
              } font-normal ml-2 dark:text-[#1E254E]`}
            >
              from Account {subspaceAccount}
            </span>
          )}
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
                  Number of Nomination
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
            </div>
          </div>
        </div>
      </div>
      <ActionsModal isOpen={isOpen} action={action} onClose={handleActionClose} />
    </div>
  )
}

export default NominationManagement

type MobileComponentProps = {
  nominators: Nominator[]
  action: OperatorAction
  handleAction: (value: OperatorAction) => void
}

const MobileComponent: FC<MobileComponentProps> = ({ nominators, action, handleAction }) => (
  <div className='w-full'>
    {nominators.map((nominator, index) => (
      <NominatorListCard
        index={index}
        nominator={nominator}
        action={action}
        handleAction={handleAction}
        key={`nominator-list-card-${nominator.id}`}
      />
    ))}
  </div>
)
