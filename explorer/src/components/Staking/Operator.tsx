'use client'

import { PageTabs } from 'components/common/PageTabs'
import { Spinner } from 'components/common/Spinner'
import { Tab } from 'components/common/Tabs'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import { OperatorByIdDocument, OperatorByIdQuery, OperatorByIdQueryVariables } from 'gql/graphql'
import { useConsensusData } from 'hooks/useConsensusData'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useMediaQuery from 'hooks/useMediaQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useParams, useRouter } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { OperatorBundleTable } from './OperatorBundleTable'
import { OperatorDepositTable } from './OperatorDepositTable'
import { OperatorDetailsCard } from './OperatorDetailsCard'
import { OperatorFundsUnlockTable } from './OperatorFundsUnlockTable'
import { OperatorNominatorTable } from './OperatorNominatorTable'
import { OperatorRewardTable } from './OperatorRewardTable'
import { OperatorTaxTable } from './OperatorTaxTable'
import { OperatorWithdrawalTable } from './OperatorWithdrawalTable'

export const Operator: FC = () => {
  const { ref, inView } = useInView()
  const { operatorId } = useParams<{ operatorId?: string }>()
  const { push } = useRouter()
  const inFocus = useWindowFocus()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { loadDataByOperatorId } = useConsensusData()

  const variables = useMemo(() => ({ operatorId: operatorId ?? '' }), [operatorId])
  const { loading, setIsVisible } = useIndexersQuery<OperatorByIdQuery, OperatorByIdQueryVariables>(
    OperatorByIdDocument,
    {
      variables,
      skip: !inFocus,
      context: { clientName: 'staking' },
    },
    Routes.staking,
    'operator',
  )

  const operator = useQueryStates((state) => state.staking.operator)

  const operatorDetails = useMemo(
    () => hasValue(operator) && operator.value.staking_operators_by_pk,
    [operator],
  )

  const noData = useMemo(() => {
    if (isLoading(operator) || loading) return <Spinner isSmall />
    if (!hasValue(operator)) return <NotFound />
    return null
  }, [loading, operator])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  useEffect(() => {
    if (operatorId) loadDataByOperatorId(operatorId)
  }, [operatorId, loadDataByOperatorId])

  return (
    <div className='flex w-full flex-col space-y-4' ref={ref}>
      {!loading && operatorDetails ? (
        <>
          <OperatorDetailsCard operator={operatorDetails} isDesktop={isDesktop} />
          <div className='mt-5 flex w-full flex-col align-middle'>
            <div className='mb-5 flex justify-between'>
              <button
                className='rounded-lg bg-grayDarker p-4 px-4 py-2 text-white dark:bg-primaryAccent'
                onClick={() => push((parseInt(operatorDetails.id) - 1).toString())}
                disabled={parseInt(operatorDetails.id) === 0}
              >
                Prev Operator
              </button>
              <button
                className='rounded-lg bg-grayDarker p-4 px-4 py-2 text-white dark:bg-primaryAccent'
                onClick={() => push((parseInt(operatorDetails.id) + 1).toString())}
              >
                Next Operator
              </button>
            </div>
            <PageTabs pillStyle='py-2' activePillStyle='py-2' isDesktop={isDesktop}>
              <Tab title='Nominators'>
                <OperatorNominatorTable
                  operator={operatorDetails}
                  nominatorCount={operatorDetails.nominators_aggregate.aggregate?.count ?? 0}
                />
              </Tab>
              <Tab title='Deposits'>
                <OperatorDepositTable
                  operator={operatorDetails}
                  depositCount={operatorDetails.total_deposits_count ?? 0}
                />
              </Tab>
              <Tab title='Withdrawals'>
                <OperatorWithdrawalTable
                  operator={operatorDetails}
                  withdrawalsCount={operatorDetails.total_withdrawals_count ?? 0}
                />
              </Tab>
              <Tab title='Funds Unlock'>
                <OperatorFundsUnlockTable operator={operatorDetails} />
              </Tab>
              <Tab title='Bundles'>
                <OperatorBundleTable
                  operator={operatorDetails}
                  bundlesCount={operatorDetails.bundle_count ?? 0}
                />
              </Tab>
              <Tab title='Rewards'>
                <OperatorRewardTable operator={operatorDetails} />
              </Tab>
              <Tab title='Tax Collected'>
                <OperatorTaxTable operator={operatorDetails} />
              </Tab>
            </PageTabs>
          </div>
        </>
      ) : (
        noData
      )}
    </div>
  )
}
