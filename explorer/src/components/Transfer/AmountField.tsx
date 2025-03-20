import { Field, Form, Formik } from 'formik'
import { useIndexers } from 'hooks/useIndexers'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useCallback, useMemo } from 'react'
import { limitNumberDecimals, numberFormattedString } from 'utils/number'
import * as Yup from 'yup'

interface AmountFieldProps {
  maxAmount?: number
  disabled?: boolean
}

interface FormValues {
  amount: number
}

export const AmountField: FC<AmountFieldProps> = ({ maxAmount, disabled }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { tokenSymbol } = useIndexers()

  const initialValues: FormValues = useMemo(() => {
    try {
      const _amount = searchParams.get('amount')
      return _amount
        ? {
            amount: parseFloat(_amount),
          }
        : {
            amount: 0,
          }
    } catch {
      return {
        amount: 0,
      }
    }
  }, [searchParams])

  const formValidationSchema = Yup.object().shape({
    amount: Yup.number().min(0, 'Amount need to be greater than 0').required('Amount is required'),
  })

  const setAmount = useCallback(
    (amount: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('amount', amount)
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams],
  )

  const handleSetAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value),
    [setAmount],
  )

  return (
    <div className='bg-grayLighter dark:border-purpleDeepAccent dark:bg-purpleUndertone flex flex-col space-y-1 rounded-xl border-grayDarker'>
      <div className='text-grayText flex items-center justify-between text-sm dark:text-white'>
        <span className='w-2/3' />
        {maxAmount && (
          <div
            role='button'
            tabIndex={0}
            onClick={() => setAmount(maxAmount.toString())}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setAmount(maxAmount.toString())
              }
            }}
          >
            <span className='cursor-pointer font-bold hover:underline'>
              Max: {numberFormattedString(limitNumberDecimals(maxAmount))} {tokenSymbol}
            </span>{' '}
          </div>
        )}
      </div>

      <div className='text-grayText flex items-center justify-between text-sm dark:text-white'>
        <Formik
          initialValues={initialValues}
          validationSchema={formValidationSchema}
          enableReinitialize
          onSubmit={() => {}}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form className='w-full' onSubmit={handleSubmit} data-testid='testOperatorStakeForm'>
              <div className='flex items-center'>
                <Field
                  name='amount'
                  placeholder='0'
                  type='number'
                  disabled={disabled}
                  onChange={handleSetAmount}
                  className={`mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white
                    ${
                      errors.amount &&
                      touched.amount &&
                      'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueDarkAccent'
                    }
                  `}
                />
                <span className='ml-4 mt-4 text-lg font-bold'>{tokenSymbol}</span>
              </div>
              {errors.amount && touched.amount ? (
                <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                  {errors.amount}
                </div>
              ) : (
                <div className='text-md mt-2 h-8' data-testid='placeHolder' />
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
