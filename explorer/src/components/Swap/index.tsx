'use client'
// file: explorer/src/components/Swap/index.tsx

import type { Hash } from '@autonomys/auto-utils'
import { Card } from 'components/common/Card'
import { NetworkSource } from 'constants/transaction'
import { FieldArray, Form, Formik } from 'formik'
import { useSendToken } from 'hooks/useSendToken'
import { FC, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useConsensusStates } from 'states/consensus'
import { WalletButton } from '../WalletButton'
import { AmountField } from './AmountField'
import { NetworkSelector2 } from './NetworkSelector'

enum Direction {
  FROM = 'From',
  TO = 'To',
}

type DirectionBlockProps = {
  direction: Direction
  label: string
  secondLabel: string
  amount: number
  tokenSymbol: string
  setNetwork: (value: NetworkSource) => void
  setDomainId: (value: string) => void
  setAmount: (value: number) => void
}

const DirectionBlock: FC<DirectionBlockProps> = ({
  direction,
  label,
  secondLabel,
  amount,
  tokenSymbol,
  setNetwork,
  setDomainId,
  setAmount,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { walletBalance } = useSendToken()

  return (
    <div className='flex flex-col space-y-1'>
      <div className='flex items-center justify-between space-x-4'>
        <label className='font-medium text-grayDark dark:text-white'>{label}</label>
        <NetworkSelector2
          isOpen={isOpen}
          setOpen={setIsOpen}
          setNetwork={setNetwork}
          setDomainId={setDomainId}
        />
        {/* spacer */}
        <div className='w-2/3' />
      </div>
      <AmountField
        label={secondLabel}
        value={amount}
        maxAmount={direction === Direction.FROM ? walletBalance : undefined}
        tokenSymbol={tokenSymbol}
        onChange={setAmount}
      />
    </div>
  )
}

export const Swap: FC = () => {
  const [amountSent, setAmountSent] = useState(5199.0)
  const [amountReceive, setAmountReceive] = useState(5199.0)
  const [formError, setFormError] = useState<string | null>(null)
  const [hash, setHash] = useState<Hash | undefined>(undefined)
  const { initialSendTokenValues, sendTokenFormValidationSchema, handleSendToken } = useSendToken()
  const { tokenSymbol } = useConsensusStates()

  const handleCopy = useCallback((value: string) => {
    navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard', { position: 'bottom-center' })
  }, [])

  const ErrorPlaceholder = useMemo(
    () =>
      formError ? (
        <div className='text-md h-8 text-red-500' data-testid='errorMessage'>
          <p>{formError}</p>
        </div>
      ) : (
        <div className='text-md h-4' data-testid='placeHolder' />
      ),
    [formError],
  )

  return (
    <Card width='w-1/3'>
      <div className='flex flex-col space-y-1'>
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
            <button
              onClick={() => handleCopy(hash.toString())}
              className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
              type='submit'
            >
              Copy
            </button>
          </>
        ) : (
          <Formik
            initialValues={initialSendTokenValues}
            validationSchema={sendTokenFormValidationSchema}
            onSubmit={(values, { resetForm }) =>
              handleSendToken(values, resetForm, setHash, setFormError)
            }
          >
            {({ handleSubmit, setFieldValue }) => (
              <Form className='w-full' onSubmit={handleSubmit} data-testid='testSendTokenForm'>
                <span className='text-base font-medium text-grayDarker dark:text-white'>
                  Send from
                </span>
                <FieldArray
                  name='dischargeNorms'
                  render={() => (
                    <div className='relative'>
                      <DirectionBlock
                        direction={Direction.FROM}
                        label='From'
                        secondLabel='Send'
                        amount={amountSent}
                        tokenSymbol={tokenSymbol}
                        setNetwork={(e) => setFieldValue('sourceNetwork', e)}
                        setDomainId={(e) => setFieldValue('sourceDomainId', e)}
                        setAmount={setAmountSent}
                      />
                      <DirectionBlock
                        direction={Direction.TO}
                        label='To'
                        secondLabel='Receive (estimated):'
                        amount={amountReceive}
                        tokenSymbol={tokenSymbol}
                        setNetwork={(e) => setFieldValue('destinationNetwork', e)}
                        setDomainId={(e) => setFieldValue('destinationDomainId', e)}
                        setAmount={setAmountReceive}
                      />
                    </div>
                  )}
                />
              </Form>
            )}
          </Formik>
        )}

        {ErrorPlaceholder}

        <div className='flex justify-between text-grayDark dark:text-white'>
          <span className='text-sm'>Fees</span>
          <span className='font-medium'>0.001 {tokenSymbol}</span>
        </div>

        <div className='flex justify-between text-grayDark dark:text-white'>
          <span className='text-sm'>Estimated Received</span>
          <span className='font-medium'>0 {tokenSymbol} in 18400 blocks</span>
        </div>

        <WalletButton className='text-md w-full rounded-2xl bg-blueDarkAccent p-3 text-white' />
      </div>
    </Card>
  )
}
