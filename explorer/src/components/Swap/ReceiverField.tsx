import { Field, Form, Formik } from 'formik'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useCallback, useMemo } from 'react'
import * as Yup from 'yup'

interface FormValues {
  address: string
}

export const ReceiverField: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const receiver = searchParams.get('receiver')

  const initialValues: FormValues = useMemo(
    () => ({
      address: receiver || '',
    }),
    [receiver],
  )

  const formValidationSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
  })

  const handleSetReceiver = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('receiver', e.target.value)
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams],
  )

  return (
    <div className='bg-grayLighter dark:border-purpleDeepAccent dark:bg-purpleUndertone flex flex-col space-y-1 rounded-xl border-grayDarker'>
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
                  name='address'
                  placeholder=''
                  type='text'
                  onChange={handleSetReceiver}
                  className={`mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white
                    ${
                      errors.address &&
                      touched.address &&
                      'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueDarkAccent'
                    }
                  `}
                />
              </div>
              {errors.address && touched.address ? (
                <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                  {errors.address}
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
