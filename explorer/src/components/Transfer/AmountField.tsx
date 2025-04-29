import { cn } from '@/utils/cn'
import { Field, Form, Formik } from 'formik'
import { useIndexers } from 'hooks/useIndexers'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useCallback, useMemo } from 'react'
import * as Yup from 'yup'

interface AmountFieldProps {
  disabled?: boolean
  maxAmount?: number
}

interface FormValues {
  amount: number
}

export const AmountField: FC<AmountFieldProps> = ({ disabled, maxAmount }) => {
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
    <div className='flex flex-col space-y-1'>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        enableReinitialize
        onSubmit={() => {}}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form className='w-full' onSubmit={handleSubmit} data-testid='testOperatorStakeForm'>
            <div className='relative'>
              <Field
                name='amount'
                placeholder='0'
                type='number'
                disabled={disabled}
                onChange={handleSetAmount}
                className={cn(
                  'mt-4 block w-full rounded-md border border-blueShade bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] pr-16 text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white',
                  errors.amount && touched.amount && 'border-red-500',
                )}
              />
              <div className='absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-900 dark:text-white'>
                {tokenSymbol}
              </div>
            </div>

            {maxAmount ? (
              <span
                className='flex justify-end px-1 py-2 text-xs font-medium text-primaryAccent hover:cursor-pointer dark:text-white'
                onClick={() => {
                  if (searchParams.get('amount')) {
                    const params = new URLSearchParams(searchParams.toString())
                    params.delete('amount')
                    router.push(`${pathname}?${params.toString()}`)
                  } else {
                    setAmount(maxAmount.toString())
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (searchParams.get('amount')) {
                      const params = new URLSearchParams(searchParams.toString())
                      params.delete('amount')
                      router.push(`${pathname}?${params.toString()}`)
                    } else {
                      setAmount(maxAmount.toString())
                    }
                  }
                }}
                role='button'
                tabIndex={0}
              >
                {searchParams.get('amount') ? 'Clear' : 'Max'}
              </span>
            ) : null}
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
  )
}
