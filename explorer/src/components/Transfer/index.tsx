'use client'

import { transfer } from '@autonomys/auto-consensus'
import { capitalizeFirstLetter, DomainRuntime, isAddress, type Hash } from '@autonomys/auto-utils'
import {
  transferToConsensus,
  transferToDomainAccount20Type,
  transferToDomainAccount32Type,
} from '@autonomys/auto-xdm'
import { sendGAEvent } from '@next/third-parties/google'
import { SwapDirection } from 'constants/transaction'
import { AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT_FOR_XDM, WalletType } from 'constants/wallet'
import { isAddress as isEvmAddress } from 'ethers'
import { FieldArray, Form, Formik } from 'formik'
import useIndexers from 'hooks/useIndexers'
import { useTxHelper } from 'hooks/useTxHelper'
import useWallet from 'hooks/useWallet'
import { useSearchParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { floatToStringWithDecimals, formatUnitsToNumber } from 'utils/number'
import { WalletButton } from '../WalletButton'
import { AmountField } from './AmountField'
import { NetworkSelector } from './NetworkSelector'
import { ReceiverField } from './ReceiverField'

type DirectionBlockProps = {
  direction: SwapDirection
  maxAmount?: number
}

interface FormValues {
  from: string
  to: string
  amount: number
  receiver: string
}

const DirectionBlock: FC<DirectionBlockProps> = ({ direction, maxAmount }) => {
  return (
    <div className='flex flex-col space-y-1'>
      <div className='flex items-center justify-between space-x-4'>
        <span className='pb-4 pr-2 text-2xl font-medium text-grayDarker dark:text-white'>
          {capitalizeFirstLetter(direction)}
        </span>
        <NetworkSelector direction={direction} />
        <div className='w-1/2' />
      </div>
      {direction === SwapDirection.TO && <ReceiverField />}
      <AmountField maxAmount={maxAmount} disabled={direction === SwapDirection.TO} />
    </div>
  )
}

export const Transfer: FC = () => {
  const [hash, setHash] = useState<Hash | undefined>(undefined)
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const { actingAccount, injector, api, domainsApis, subspaceAccount } = useWallet()
  const searchParams = useSearchParams()
  const { tokenDecimals, tokenSymbol } = useIndexers()
  const { sendAndSaveTx, handleTxError } = useTxHelper()

  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const amount = searchParams.get('amount')
  const receiver = searchParams.get('receiver')

  const handleCopy = useCallback((value: string) => {
    navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard', { position: 'bottom-center' })
  }, [])

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      if (!injector || !api)
        return toast.error('We are not able to connect to the blockchain', {
          position: 'bottom-center',
        })

      const to = values.receiver || subspaceAccount
      if (!to) return toast.error('Receiver is required', { position: 'bottom-center' })

      const amount = floatToStringWithDecimals(values.amount, tokenDecimals)

      switch (true) {
        case values.from === '':
          toast.error('From chain is required', { position: 'bottom-center' })
          break
        case values.to === '':
          toast.error('To chain is required', { position: 'bottom-center' })
          break
        case values.amount === 0:
          toast.error('Amount is required', { position: 'bottom-center' })
          break
        case values.from === values.to:
          toast.error('From and to chain cannot be the same', { position: 'bottom-center' })
          break

        case values.from === 'consensus' && values.to === 'consensus':
          if (values.receiver === '') {
            toast.error('Receiver is required', { position: 'bottom-center' })
            break
          }
          if (!isAddress(values.receiver)) {
            toast.error('Receiver must be a valid Consensus address', { position: 'bottom-center' })
            break
          }
          try {
            const tx = await transfer(api, to, amount)
            const hash = await sendAndSaveTx({
              call: 'balances.transferKeepAlive',
              tx,
              signer: injector.signer,
              to,
              amount,
            })
            if (hash) {
              setHash(hash)
              toast.success('The transaction was sent successfully', { position: 'bottom-center' })
              sendGAEvent({
                event: 'walletSideKick_action_sendToken',
                value: `extrinsic:${hash.toString()}`,
              })
            }
          } catch (error) {
            handleTxError(
              'There was an error while sending the transaction',
              'balances.transferKeepAlive',
            )
          }
          break
        case values.from === 'consensus' && values.to.startsWith('domain'): {
          const destinationChain = values.to.replace('domainId', '')
          const domainApi = domainsApis[destinationChain]
          if (!domainApi) return null
          if (domainApi.runtime === DomainRuntime.AUTO_EVM && !isEvmAddress(values.receiver)) {
            toast.error('Receiver must be a valid EVM address', { position: 'bottom-center' })
            break
          }
          if (values.receiver.startsWith('0x')) {
            try {
              const tx = await transferToDomainAccount20Type(api, destinationChain, to, amount)
              const hash = await sendAndSaveTx({
                call: 'transporter.transfer',
                tx,
                signer: injector.signer,
                to,
                amount,
              })
              if (hash) {
                setHash(hash)
                toast.success('The transaction was sent successfully', {
                  position: 'bottom-center',
                })
                sendGAEvent({
                  event: 'walletSideKick_action_sendToken',
                  value: `extrinsic:${hash.toString()}`,
                })
              }
            } catch (error) {
              handleTxError(
                'There was an error while sending the transaction',
                'transporter.transfer',
              )
            }
          } else {
            if (!isAddress(values.receiver)) {
              toast.error('Receiver must be a valid Consensus address', {
                position: 'bottom-center',
              })
              break
            }
            try {
              const tx = await transferToDomainAccount32Type(api, destinationChain, to, amount)
              const hash = await sendAndSaveTx({
                call: 'transporter.transfer',
                tx,
                signer: injector.signer,
                to,
                amount,
              })
              if (hash) {
                setHash(hash)
                toast.success('The transaction was sent successfully', {
                  position: 'bottom-center',
                })
                sendGAEvent({
                  event: 'walletSideKick_action_sendToken',
                  value: `extrinsic:${hash.toString()}`,
                })
              }
            } catch (error) {
              handleTxError(
                'There was an error while sending the transaction',
                'transporter.transfer',
              )
            }
          }
          break
        }
        case values.from.startsWith('domain') && values.to === 'consensus': {
          if (
            !actingAccount ||
            !actingAccount.address.startsWith('0x') ||
            !isEvmAddress(actingAccount.address)
          ) {
            toast.error('Sender must be a valid EVM address', { position: 'bottom-center' })
            break
          }
          if (!values.receiver || values.receiver.startsWith('0x') || !isAddress(values.receiver)) {
            toast.error('Receiver must be a valid Consensus address', { position: 'bottom-center' })
            break
          }
          const sourceDomainId = values.from.replace('domainId', '')
          const domainApi = domainsApis[sourceDomainId]
          if (!domainApi) {
            toast.error('Domain API not found', { position: 'bottom-center' })
            break
          }
          try {
            const tx = await transferToConsensus(domainApi.api, values.receiver, amount)
            const hash = await sendAndSaveTx({
              call: 'transporter.transfer',
              tx,
              signer: injector.signer,
              to: values.receiver,
              amount,
              api: domainApi.api,
            })
            if (hash) {
              setHash(hash)
              toast.success('The transaction was sent successfully', { position: 'bottom-center' })
              sendGAEvent({
                event: 'walletSideKick_action_sendToken',
                value: `extrinsic:${hash.toString()}`,
              })
            }
          } catch (error) {
            handleTxError(
              'There was an error while sending the transaction',
              'transporter.transfer',
            )
          }
          break
        }
        default:
          toast.error('Invalid transfer', { position: 'bottom-center' })
          break
      }
    },
    [
      actingAccount,
      api,
      domainsApis,
      handleTxError,
      injector,
      sendAndSaveTx,
      subspaceAccount,
      tokenDecimals,
    ],
  )

  const loadWalletBalance = useCallback(async () => {
    if (!api || !actingAccount) return

    switch (true) {
      case from === 'consensus': {
        if (actingAccount.type === WalletType.subspace) {
          const balance = await api.query.system.account(actingAccount.address)
          setWalletBalance(
            formatUnitsToNumber((balance.toJSON() as { data: { free: string } }).data.free),
          )
        }
        break
      }
      case from && from.startsWith('domain'): {
        const domainApi = domainsApis[from.replace('domainId', '')]
        if (!domainApi) return
        const balance = await domainApi.api.query.system.account(actingAccount.address)
        setWalletBalance(
          formatUnitsToNumber((balance.toJSON() as { data: { free: string } }).data.free),
        )
        break
      }
      default:
        break
    }
  }, [api, actingAccount, domainsApis, from])

  const maxAmount = useMemo(
    () =>
      walletBalance > AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT_FOR_XDM
        ? parseFloat((walletBalance - AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT_FOR_XDM).toFixed(5))
        : 0,
    [walletBalance],
  )

  const initialValues: FormValues = useMemo(
    () => ({
      from: from || '',
      to: to || '',
      amount: amount ? parseFloat(amount) : 0,
      receiver: receiver || '',
    }),
    [from, to, amount, receiver],
  )

  const isWalletBalanceEnough = useMemo(() => {
    return walletBalance > AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT_FOR_XDM + parseFloat(amount || '0')
  }, [walletBalance, amount])

  useEffect(() => {
    loadWalletBalance()
  }, [loadWalletBalance])

  return (
    <div className='w-full max-w-xl'>
      <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-boxDark sm:p-6'>
        <div className='mb-6 flex flex-col items-center justify-center'>
          {hash ? (
            <>
              {hash && (
                <span className='text-base font-medium text-grayDarker dark:text-white'>
                  Extrinsic Hash
                </span>
              )}
              <textarea
                name='hash'
                value={hash.toString()}
                className='mt-4 block h-[80px] w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white'
              />
              <div className='mt-4 flex gap-4'>
                <button
                  onClick={() => handleCopy(hash.toString())}
                  className='dark:bg-purpleAccent flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white md:space-x-4 md:text-base'
                  type='submit'
                >
                  Copy
                </button>
                <button
                  onClick={() => setHash(undefined)}
                  className='dark:bg-purpleAccent flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white md:space-x-4 md:text-base'
                  type='submit'
                >
                  Reset
                </button>
              </div>
            </>
          ) : (
            <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
              {({ handleSubmit }) => (
                <Form className='w-full' onSubmit={handleSubmit} data-testid='testSendTokenForm'>
                  <>
                    <FieldArray
                      name='dischargeNorms'
                      render={() => (
                        <div className='relative'>
                          <DirectionBlock direction={SwapDirection.FROM} maxAmount={maxAmount} />
                          <DirectionBlock direction={SwapDirection.TO} />
                        </div>
                      )}
                    />
                    <div className='flex justify-between text-grayDark dark:text-white'>
                      <span className='text-sm'>Fees (approx.)</span>
                      <span className='font-medium'>
                        {AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT_FOR_XDM} {tokenSymbol}
                      </span>
                    </div>
                    <div className='flex flex-col items-center pb-4 text-grayDark dark:text-white'>
                      <span className='text-sm'>Estimated wait time</span>
                      <span className='font-medium'>14400 domain blocks (approx. 24 hours)</span>
                    </div>
                    <div className='flex justify-center'>
                      {!actingAccount ? (
                        <WalletButton />
                      ) : (
                        <>
                          {!isWalletBalanceEnough ? (
                            <span className='text-red-500'>Insufficient wallet balance</span>
                          ) : (
                            <button
                              className='block rounded-full bg-grayDarker px-5 py-3 text-[13px] font-semibold leading-4 text-white dark:bg-primaryAccent'
                              type='submit'
                            >
                              Send token
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  )
}
