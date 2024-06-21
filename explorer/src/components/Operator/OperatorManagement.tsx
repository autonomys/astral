'use client'

import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { useApolloClient, useQuery } from '@apollo/client'
import { sendGAEvent } from '@next/third-parties/google'
import { SortingState } from '@tanstack/react-table'
import { NewTable } from 'components/common/NewTable'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { Chains, PAGE_SIZE } from 'constants/'
import { INTERNAL_ROUTES } from 'constants/routes'
import { OperatorsConnectionQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { operatorReadyToUnlock, operatorStatus } from 'utils/operator'
import { sort } from 'utils/sort'
import { capitalizeFirstLetter } from 'utils/string'
import { ActionsDropdown, ActionsDropdownRow } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import { OperatorsListCard } from './OperatorsListCard'
import { QUERY_OPERATOR_CONNECTION_LIST } from './query'

export const OperatorManagement: FC = () => {
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
    maxShares: null,
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleAction = useCallback((value: OperatorAction) => {
    setAction(value)
    if (value.type !== OperatorActionType.None) setIsOpen(true)
    sendGAEvent({
      event: 'initialize_staking_action',
      value: `action:${value.toString()}`,
    })
  }, [])
  const handleActionClose = useCallback(() => {
    setIsOpen(false)
    setAction({ type: OperatorActionType.None, operatorId: null, maxShares: null })
  }, [])

  const orderBy = useMemo(() => sort(sorting, 'id_ASC'), [sorting])

  const variables = useMemo(
    () => ({
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
      orderBy,
      // eslint-disable-next-line camelcase
      where: searchOperator ? { operatorOwner_eq: searchOperator } : {},
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, searchOperator],
  )

  const { data, error, loading } = useQuery<OperatorsConnectionQuery>(
    QUERY_OPERATOR_CONNECTION_LIST,
    {
      variables: variables,
      pollInterval: 6000,
    },
  )

  useErrorHandler(error)

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, QUERY_OPERATOR_CONNECTION_LIST, 'operatorsConnection', {
        orderBy,
      }),
    [apolloClient, orderBy],
  )

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value)
      setPagination({ ...pagination, pageIndex: 0 })
    },
    [pagination],
  )

  const lastBlock = useMemo(
    () => data && data.lastBlock && (data.lastBlock[0].height as number),
    [data],
  )
  const operators = useMemo(() => data && data.operatorsConnection, [data])
  const operatorsConnection = useMemo(
    () => (operators && operators.edges ? operators.edges.map((operator) => operator.node) : []),
    [operators],
  )
  const totalCount = useMemo(() => (operators ? operators.totalCount : 0), [operators])
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const totalNominators = useMemo(
    () =>
      operators && operators.edges
        ? operators.edges.reduce((acc, operator) => acc + operator.node.nominators.length, 0)
        : 0,
    [operators],
  )
  const totalOperatorStake = useMemo(
    () =>
      operators && operators.edges
        ? operators.edges
            .reduce((acc, operator) => acc + BigInt(operator.node.currentTotalStake), BigInt(0))
            .toString()
        : '0',
    [operators],
  )
  const totalNominatorsStake = useMemo(
    () =>
      operators && operators.edges
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
                totalShares === '0'
                  ? BigInt(0)
                  : (BigInt(currentTotalStake) * BigInt(subTotalNominatorsShares)) /
                    BigInt(totalShares)
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

  const columns = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: 'Id',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <Link
            data-testid={`operator-link-${row.original.id}-${row.original.signingKey}-${row.index}}`}
            className='hover:text-[#DE67E4]'
            href={INTERNAL_ROUTES.operators.id.page(
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
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{row.original.currentDomainId === 0 ? 'Subspace' : 'Nova'}</div>
        ),
      },
      {
        accessorKey: 'signingKey',
        header: 'Signing Key',
        enableSorting: true,
        cell: ({ row }) => (
          <div className='row flex items-center gap-3'>
            <div>{shortString(row.original.signingKey)}</div>
          </div>
        ),
      },
      {
        accessorKey: 'minimumNominatorStake',
        header: 'Min. Stake',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{`${bigNumberToNumber(row.original.minimumNominatorStake)} tSSC`}</div>
        ),
      },
      {
        accessorKey: 'nominationTax',
        header: 'Nominator Tax',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{`${row.original.nominationTax}%`}</div>
        ),
      },
      {
        accessorKey: 'currentTotalStake',
        header: 'Total Stake',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{`${bigNumberToNumber(row.original.currentTotalStake)} tSSC`}</div>
        ),
      },
      {
        accessorKey: 'nominators',
        header: 'Nominators',
        enableSorting: false,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>{`${row.original.nominators ? row.original.nominators.length : 0}/256`}</div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: true,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <div>
            {selectedChain.urls.page === Chains.gemini3g
              ? row.original.status
              : capitalizeFirstLetter(operatorStatus(row.original.status, lastBlock))}
          </div>
        ),
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({
          row,
        }: Cell<OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node']>) => (
          <ActionsDropdown
            action={action}
            handleAction={handleAction}
            row={row as ActionsDropdownRow}
            excludeActions={
              operatorReadyToUnlock(row.original.status, lastBlock)
                ? [OperatorActionType.Deregister, OperatorActionType.UnlockFunds]
                : [OperatorActionType.UnlockFunds, OperatorActionType.UnlockOperator]
            }
          />
        ),
      },
    ]
  }, [selectedChain.urls.page, selectedDomain, action, handleAction, lastBlock])

  useEffect(() => {
    if (subspaceAccount) handleSearch(subspaceAccount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subspaceAccount])

  if (loading) return <Spinner />
  if (!subspaceAccount) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex flex-col gap-2'>
        <div className='mt-5 flex w-full justify-between'>
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
              } ml-2 font-normal dark:text-[#1E254E]`}
            >
              on Account {subspaceAccount}
            </span>
          )}
        </div>
      </div>

      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <div className='my-6 rounded'>
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
            filename='operators-operator-management-list'
            mobileComponent={
              <MobileComponent
                operators={operatorsConnection}
                action={action}
                handleAction={handleAction}
                lastBlock={lastBlock}
              />
            }
          />
        </div>
      </div>

      <div className='mt-8 rounded-[20px] bg-[#DDEFF1] p-5 dark:bg-[#2A345E]'>
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

type MobileComponentProps = {
  operators: OperatorsConnectionQuery['operatorsConnection']['edges'][0]['node'][]
  action: OperatorAction
  handleAction: (value: OperatorAction) => void
  lastBlock?: number
}

const MobileComponent: FC<MobileComponentProps> = ({
  operators,
  action,
  handleAction,
  lastBlock,
}) => (
  <div className='w-full'>
    {operators.map((operator, index) => (
      <OperatorsListCard
        index={index}
        operator={operator}
        action={action}
        excludeActions={
          operatorReadyToUnlock(operator.status, lastBlock)
            ? [OperatorActionType.Deregister, OperatorActionType.UnlockFunds]
            : [OperatorActionType.UnlockFunds, OperatorActionType.UnlockOperator]
        }
        handleAction={handleAction}
        lastBlock={lastBlock}
        key={`operator-list-card-${operator.id}`}
      />
    ))}
  </div>
)
