import { TransactionStatus } from '@/constants'
import { sendGAEvent } from '@next/third-parties/google'
import type { Signer, SubmittableExtrinsic } from '@polkadot/api/types'
import type { ISubmittableResult } from '@polkadot/types/types'
import useDomains from 'hooks/useDomains'
import useWallet from 'hooks/useWallet'
import { useCallback } from 'react'
import { useTransactionsStates } from 'states/transactions'

export interface SendAndSaveTx {
  call: string
  tx: SubmittableExtrinsic<'promise', ISubmittableResult>
  signer: Signer
  to?: string
  amount?: string
  fee?: string
  nonce?: number
  error?: (error: string) => void
}

export const useTxHelper = () => {
  const { selectedChain } = useDomains()
  const { api, actingAccount, subspaceAccount, injector } = useWallet()
  const { addPendingTransactions } = useTransactionsStates()

  const sendAndSaveTx = useCallback(
    async (input: SendAndSaveTx) => {
      const { call, tx, signer, to, amount, fee, nonce, error } = input

      if (!api || !actingAccount || !injector)
        return error
          ? error('We are not able to connect to the blockchain')
          : console.error('We are not able to connect to the blockchain')
      if (!subspaceAccount)
        return error
          ? error('Not a subspace account connected')
          : console.error('Not a subspace account connected')

      const block = await api.rpc.chain.getBlock()
      const from = actingAccount.address
      const hash = await tx.signAndSend(from, { signer })

      addPendingTransactions({
        ownerAccount: actingAccount,
        chain: selectedChain,
        status: TransactionStatus.Pending,
        submittedAtBlockHash: block.block.header.hash.toHex(),
        submittedAtBlockNumber: block.block.header.number.toNumber(),
        call,
        txHash: hash.toString(),
        blockHash: '',
        from,
        to: to || from,
        amount: amount || '0',
        fee: fee || '0',
        nonce: nonce || 0,
      })
      sendGAEvent('event', 'tx_call', { value: call })

      return hash
    },
    [api, actingAccount, injector, subspaceAccount, addPendingTransactions, selectedChain],
  )

  return { sendAndSaveTx }
}
