'use client'

import { TransactionStatus } from '@/constants'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import { StatusIcon } from 'components/common/StatusIcon'
import { Tooltip } from 'components/common/Tooltip'
import type { Chain } from 'constants/chains'
import {
  INTERNAL_ROUTES,
  ROUTE_EXTRA_FLAG_TYPE,
  ROUTE_FLAG_VALUE_OPEN_CLOSE,
  Routes,
} from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ExtrinsicsSummaryQuery, ExtrinsicsSummaryQueryVariables } from 'gql/oldSquidTypes'
import { useSquidQuery } from 'hooks/useSquidQuery'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isError, isLoading, useQueryStates } from 'states/query'
import { useTransactionsStates } from 'states/transactions'
import { QUERY_EXTRINSIC_SUMMARY } from './query'

interface LastExtrinsicsProps {
  subspaceAccount: string
  selectedChain: Chain
}

dayjs.extend(relativeTime)

export const LastExtrinsics: FC<LastExtrinsicsProps> = ({ subspaceAccount, selectedChain }) => {
  const { ref, inView } = useInView()
  const inFocus = useWindowFocus()
  const { get } = useSearchParams()
  const isSideKickOpen = get(ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK)

  const { actingAccount } = useWallet()
  const { pendingTransactions, markAsFinalized, moveToFinalizedTransactions } =
    useTransactionsStates()
  const transactions = useMemo(
    () =>
      actingAccount
        ? pendingTransactions.filter(
            (tx) =>
              actingAccount.address === tx.from && selectedChain.urls.page == tx.chain.urls.page,
          )
        : [],
    [actingAccount, pendingTransactions, selectedChain.urls.page],
  )
  const variables = useMemo(
    () => ({
      first: 10,
      subspaceAccount,
    }),
    [subspaceAccount],
  )
  const { setIsVisible } = useSquidQuery<ExtrinsicsSummaryQuery, ExtrinsicsSummaryQueryVariables>(
    QUERY_EXTRINSIC_SUMMARY,
    {
      variables,
      skip: !inFocus || isSideKickOpen !== ROUTE_FLAG_VALUE_OPEN_CLOSE.OPEN,
      pollInterval: 6000,
    },
    ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK,
    'lastExtrinsics',
  )

  const {
    walletSidekick: { lastExtrinsics },
  } = useQueryStates()

  const extrinsics = useMemo(
    () =>
      hasValue(lastExtrinsics) &&
      (lastExtrinsics.value.extrinsics.edges as ExtrinsicsSummaryQuery['extrinsics']['edges']),
    [lastExtrinsics],
  )

  const moveIfPending = useCallback(
    (edges: ExtrinsicsSummaryQuery['extrinsics']['edges']) => {
      if (!transactions || !transactions[0] || !transactions[0].call) return edges
      try {
        const timeNowPlus2min = new Date(new Date().getTime() + 2 * 60000).getTime() // 2 minutes from now
        const pending = transactions.find(
          (tx) => edges[0].node && edges[0].node.hash && tx.txHash === edges[0].node.hash,
        )
        const toMove =
          pending &&
          pending.finalizedAtLocalTimestamp &&
          pending.finalizedAtLocalTimestamp.getTime() > timeNowPlus2min
        if (pending) {
          markAsFinalized(
            pending,
            edges[0].node.success ? TransactionStatus.Success : TransactionStatus.Failed,
          )
          if (toMove) moveToFinalizedTransactions(toMove && pending)
        }
      } catch (error) {
        console.error('Error in moveIfPending', error)
      }
      return edges
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactions],
  )

  useEffect(() => {
    if (extrinsics && extrinsics.length > 0) moveIfPending(extrinsics)
  }, [extrinsics, moveIfPending])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='m-2 mt-0 rounded-[20px] bg-grayLight p-5 dark:bg-blueAccent dark:text-white'>
      <Accordion
        title={
          <div className='m-2 mb-0 flex items-center pt-4'>
            <span className='text-base font-medium text-grayDarker dark:text-white'>
              Last extrinsics
            </span>
          </div>
        }
      >
        <div ref={ref}>
          {isLoading(lastExtrinsics) && (
            <ExclamationTriangleIcon className='size-5' stroke='orange' />
          )}
          {isError(lastExtrinsics) && (
            <div className='m-2 flex items-center pt-4'>
              <span className='text-base font-medium text-grayDarker dark:text-white'>
                We are unable to load your wallet data
              </span>
            </div>
          )}
          {extrinsics && extrinsics.length > 0 ? (
            <List>
              {extrinsics.map((extrinsic, index) => (
                <StyledListItem
                  key={index}
                  title={
                    <Link
                      data-testid='extrinsic-link'
                      className='hover:text-purpleAccent'
                      href={INTERNAL_ROUTES.extrinsics.id.page(
                        selectedChain.urls.page,
                        Routes.consensus,
                        extrinsic.node.id,
                      )}
                    >
                      <Tooltip text={dayjs(extrinsic.node.block.timestamp).toString()}>
                        {dayjs(extrinsic.node.block.timestamp).fromNow(true)}
                      </Tooltip>
                    </Link>
                  }
                >
                  <Link
                    key='link-extrinsic'
                    data-testid='extrinsic-link'
                    className='hover:text-purpleAccent'
                    href={INTERNAL_ROUTES.extrinsics.id.page(
                      selectedChain.urls.page,
                      Routes.consensus,
                      extrinsic.node.id,
                    )}
                  >
                    <Tooltip text={extrinsic.node.name.split('.')[1].toUpperCase()}>
                      <span className='text-sm font-medium text-grayDarker dark:text-gray-400'>
                        {extrinsic.node.name.split('.')[1].toUpperCase()}
                      </span>
                    </Tooltip>
                  </Link>
                  <Link
                    key='link-blocks'
                    data-testid='extrinsic-link'
                    className='px-2 hover:text-purpleAccent'
                    href={INTERNAL_ROUTES.blocks.id.page(
                      selectedChain.urls.page,
                      Routes.consensus,
                      extrinsic.node.block.height,
                    )}
                  >
                    <Tooltip text={extrinsic.node.block.id}>
                      <span className='text-sm font-medium text-grayDarker dark:text-gray-400'>
                        #{extrinsic.node.block.height}
                      </span>
                    </Tooltip>
                  </Link>
                  <StatusIcon status={extrinsic.node.success} />
                </StyledListItem>
              ))}
            </List>
          ) : (
            <div className='m-2 flex items-center pt-4'>
              <span className='text-sm font-medium text-grayDarker dark:text-white'></span>
            </div>
          )}
        </div>
      </Accordion>
    </div>
  )
}
