'use client'
// file: explorer/src/components/Swap/index.tsx

import { useConsensusData } from '@/hooks/useConsensusData'
import { useSendToken } from '@/hooks/useSendToken'
import { useConsensusStates } from '@/states/consensus'
import { Card } from 'components/common/Card'
import { NetworkSource } from 'constants/chains'
import { Field, FieldArray, Form, Formik } from 'formik'
import { FC, useState } from 'react'
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
  setFromValue: (value: number) => void
}

const DirectionBlock: FC<DirectionBlockProps> = ({
  direction,
  label,
  secondLabel,
  amount,
  tokenSymbol,
  setNetwork,
  setDomainId,
  setFromValue,
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
        onChange={setFromValue}
      />
    </div>
  )
}

export const Swap: FC = () => {
  const [fromValue, setFromValue] = useState(5199.0)
  const [toValue, setToValue] = useState(5198.99)
  const [formError, setFormError] = useState<string | null>(null)
  const [hash, setHash] = useState<Hash | undefined>(undefined)
  const [fromNetwork, setFromNetwork] = useState('Autonomys Testnet')
  const [toNetwork, setToNetwork] = useState('Autonomys Testnet')
  const { initialSendTokenValues, maxAmount, sendTokenFormValidationSchema, handleSendToken } =
    useSendToken()
  const { tokenSymbol } = useConsensusStates()

  return (
    <Card width='w-1/3'>
      <div className='flex flex-col space-y-1'>
        <Formik
          initialValues={initialSendTokenValues}
          validationSchema={sendTokenFormValidationSchema}
          onSubmit={(values, { resetForm }) =>
            handleSendToken(values, resetForm, setHash, setFormError)
          }
        >
          {({ values, errors, touched, handleSubmit, setFieldValue }) => (
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
                      amount={fromValue}
                      tokenSymbol={tokenSymbol}
                      setNetwork={(e) => setFieldValue('sourceNetwork', e)}
                      setDomainId={(e) => setFieldValue('sourceDomainId', e)}
                      setFromValue={setFromValue}
                    />
                    <DirectionBlock
                      direction={Direction.TO}
                      label='To'
                      secondLabel='Receive (estimated):'
                      amount={toValue}
                      tokenSymbol={tokenSymbol}
                      setNetwork={(e) => setFieldValue('destinationNetwork', e)}
                      setDomainId={(e) => setFieldValue('destinationDomainId', e)}
                      setFromValue={setFromValue}
                    />
                  </div>
                )}
              />
            </Form>
          )}
        </Formik>

        <div className='text-sm text-red-500'>
          <p>Place for warnings / errors / etc</p>
        </div>

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
