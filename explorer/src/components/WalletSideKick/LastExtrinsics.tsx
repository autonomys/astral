'use client'

import { TransactionStatus } from '@/constants'
import { useQuery } from '@apollo/client'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import { StatusIcon } from 'components/common/StatusIcon'
import { Tooltip } from 'components/common/Tooltip'
import type { Chain } from 'constants/chains'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ExtrinsicsSummaryQuery } from 'gql/oldSquidTypes'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useTransactionsStates } from 'states/transactions'
import { QUERY_EXTRINSIC_SUMMARY } from './query'

interface LastExtrinsicsProps {
  subspaceAccount: string
  selectedChain: Chain
}

dayjs.extend(relativeTime)

export const LastExtrinsics: FC<LastExtrinsicsProps> = ({ subspaceAccount, selectedChain }) => {
  const { actingAccount } = useWallet()
  const [extrinsics, setExtrinsics] = useState<ExtrinsicsSummaryQuery['extrinsics']['edges']>([])
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
  const summaryVariables = useMemo(
    () => ({
      first: 10,
      subspaceAccount,
    }),
    [subspaceAccount],
  )
  const { data, error, loading } = useQuery<ExtrinsicsSummaryQuery>(QUERY_EXTRINSIC_SUMMARY, {
    variables: summaryVariables,
    pollInterval: 6000,
  })

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
    if (data && data.extrinsics.edges[0].node.hash !== extrinsics[0]?.node.hash) {
      setExtrinsics(data.extrinsics.edges)
      moveIfPending(data.extrinsics.edges)
    }
  }, [data, extrinsics, moveIfPending])

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
        {loading && <ExclamationTriangleIcon className='size-5' stroke='orange' />}
        {error && (
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
            <span className='text-sm font-medium text-grayDarker dark:text-white'>
              {!loading && !error && 'You have no extrinsics yet'}
            </span>
          </div>
        )}
      </Accordion>
    </div>
  )
}
