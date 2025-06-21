'use client'

import { shortString } from '@autonomys/auto-utils'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import { StatusIcon } from 'components/common/StatusIcon'
import { Tooltip } from 'components/common/Tooltip'
import { ROUTE_EXTRA_FLAG_TYPE, ROUTE_FLAG_VALUE_OPEN_CLOSE } from 'constants/routes'
import { TransactionStatus } from 'constants/transaction'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  PendingTransactionDocument,
  PendingTransactionQuery,
  PendingTransactionQueryVariables,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useSearchParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useTransactionsStates } from 'states/transactions'
import { Transaction } from 'types/transaction'

interface PendingTransactionsProps {
  subspaceAccount: string
  defaultOpen?: boolean
}

dayjs.extend(relativeTime)

export const PendingTransactions: FC<PendingTransactionsProps> = ({
  subspaceAccount,
  defaultOpen = false,
}) => {
  const { ref, inView } = useInView()
  const { network } = useIndexers()
  const inFocus = useWindowFocus()
  const searchParams = useSearchParams()
  const isSideKickOpen = searchParams.get(ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK)

  const { actingAccount } = useWallet()
  const {
    pendingTransactions,
    removePendingTransactions,
    markAsFinalized,
    moveToFinalizedTransactions,
  } = useTransactionsStates()

  const variables = useMemo(
    () => ({
      subspaceAccount,
      extrinsics: pendingTransactions.map((tx) => tx.txHash),
    }),
    [pendingTransactions, subspaceAccount],
  )
  const { data, setIsVisible } = useIndexersQuery<
    PendingTransactionQuery,
    PendingTransactionQueryVariables
  >(PendingTransactionDocument, {
    variables,
    skip: !inFocus || isSideKickOpen !== ROUTE_FLAG_VALUE_OPEN_CLOSE.OPEN,
    pollInterval: 6000,
  })

  const handleRemove = useCallback(
    (tx: Transaction) => removePendingTransactions(tx),
    [removePendingTransactions],
  )

  const transactions = useMemo(
    () =>
      actingAccount
        ? pendingTransactions
            .filter((tx) => tx.chain && actingAccount.address === tx.from && network == tx.chain)
            .sort((a, b) => b.submittedAtBlockNumber - a.submittedAtBlockNumber)
        : [],
    [actingAccount, pendingTransactions, network],
  )

  const timeNowPlus2min = new Date(new Date().getTime() + 2 * 60000).getTime() // 2 minutes from now
  const moveIfPending = useCallback(
    (extrinsics: PendingTransactionQuery['consensus_accounts'][0]['extrinsics']) => {
      const extrinsicsHash = extrinsics.map((e) => e.hash.toLowerCase())
      if (!transactions || transactions.length === 0) return
      try {
        transactions
          .filter((tx) => extrinsicsHash.includes(tx.txHash.toLowerCase()))
          .map((tx) => {
            const extrinsic = extrinsics.find((e) => e.hash === tx.txHash)
            if (!extrinsic) return
            markAsFinalized(
              tx,
              extrinsic.success ? TransactionStatus.Success : TransactionStatus.Failed,
            )
            if (new Date(tx.submittedAtLocalTimestamp).getTime() < timeNowPlus2min)
              moveToFinalizedTransactions(tx)
          })
      } catch (error) {
        console.error('Error in moveIfPending', error)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactions],
  )

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  useEffect(() => {
    if (data && data.consensus_accounts[0] && data.consensus_accounts[0].extrinsics)
      moveIfPending(data.consensus_accounts[0].extrinsics)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div
      ref={ref}
      className='m-2 mt-0 rounded-lg bg-grayLight p-5 dark:bg-blueAccent dark:text-white'
    >
      <Accordion
        defaultOpen={defaultOpen}
        title={
          <div className='m-2 mb-0 flex items-center pt-4'>
            <span className='text-base font-medium text-grayDarker dark:text-white'>
              Pending transactions{' '}
              {transactions.length > 0 ? `( ${transactions.length} )` : ''}{' '}
            </span>
          </div>
        }
      >
        {transactions && transactions.length > 0 ? (
          <List>
            {transactions.map((tx, index) => {
              const txs = tx.call.split('.')
              const txName = txs.length > 1 ? txs[1].toUpperCase() : tx.call.toUpperCase()
              return (
                <StyledListItem
                  key={index}
                  title={
                    <div className='flex flex-col'>
                      {txName}
                      <Tooltip text={dayjs(tx.submittedAtLocalTimestamp).toString()}>
                        <span className='mr-2 text-sm font-medium text-grayDarker dark:text-gray-400'>
                          {dayjs(tx.submittedAtLocalTimestamp).fromNow(true)}
                        </span>
                      </Tooltip>
                    </div>
                  }
                >
                  <div className='flex flex-col'>
                    <span className='mr-2 text-sm font-medium text-grayDarker dark:text-gray-400'>
                      {shortString(tx.txHash)}
                    </span>
                    <span className='mr-2 text-sm font-medium text-grayDarker dark:text-gray-400'>
                      #{tx.submittedAtBlockNumber}
                    </span>
                  </div>
                  <div className='m-2 p-2'>
                    <StatusIcon
                      status={tx.status === TransactionStatus.Success}
                      isPending={tx.status === TransactionStatus.Pending}
                    />
                  </div>
                  <div className='m-2 p-2'>
                    <TrashIcon className='size-5' stroke='red' onClick={() => handleRemove(tx)} />
                  </div>
                </StyledListItem>
              )
            })}
          </List>
        ) : (
          <div className='m-2 flex items-center pt-4'>
            <span className='text-sm font-medium text-grayDarker dark:text-white'>
              You have no pending transactions
            </span>
          </div>
        )}
      </Accordion>
    </div>
  )
}
