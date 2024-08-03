import { Hash } from '@autonomys/auto-utils'
import { sendGAEvent } from '@next/third-parties/google'
import { ExtrinsicsSupportedModule } from 'constants/wallet'
import { FormikState } from 'formik'
import { useTxHelper } from 'hooks/useTxHelper'
import useWallet from 'hooks/useWallet'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import type {
  CustomExtrinsicFormValues,
  ExtrinsicModule,
  ExtrinsicsList,
  OptionalTxFormValues,
} from 'types/transaction'
import * as Yup from 'yup'

export const useCustomExtrinsic = () => {
  const { api, injector } = useWallet()
  const { sendAndSaveTx, handleTxError } = useTxHelper()
  const [extrinsicsList, setExtrinsicsList] = useState<ExtrinsicsList>({})
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const initialCustomExtrinsicValues: CustomExtrinsicFormValues & OptionalTxFormValues = useMemo(
    () =>
      selectedCategory &&
      selectedMethod &&
      extrinsicsList[selectedCategory][selectedMethod] &&
      extrinsicsList[selectedCategory][selectedMethod].args
        ? Object.keys(extrinsicsList[selectedCategory][selectedMethod].args).reduce(
            (acc, key) => ({ ...acc, [key]: '' }),
            { nonce: -1 },
          )
        : {},
    [selectedCategory, selectedMethod, extrinsicsList],
  )

  const customExtrinsicFormValidationSchema = useMemo(
    () =>
      selectedCategory &&
      selectedMethod &&
      extrinsicsList[selectedCategory][selectedMethod] &&
      extrinsicsList[selectedCategory][selectedMethod].args &&
      Yup.object().shape({
        ...Object.keys(extrinsicsList[selectedCategory][selectedMethod].args).reduce(
          (acc, key) => ({ ...acc, [key]: Yup.string().required('This field is required') }),
          {},
        ),
        nonce: Yup.number().min(-1, 'Nonce must be greater or -1'),
      }),
    [selectedCategory, selectedMethod, extrinsicsList],
  )

  const loadData = useCallback(async () => {
    if (!api) return
    const data = await Promise.all(
      Object.values(ExtrinsicsSupportedModule).map((module) => api.tx[module]),
    )
    const modules = (data as ExtrinsicModule[]).reduce(
      (acc, module, idx) => ({
        ...acc,
        [Object.values(ExtrinsicsSupportedModule)[idx]]: module,
      }),
      {} as ExtrinsicsList,
    )
    setExtrinsicsList(modules)
  }, [api])

  const resetCategory = useCallback((extra?: () => void) => {
    setSelectedCategory(null)
    setSelectedMethod(null)
    extra && extra()
  }, [])

  const resetMethod = useCallback((extra?: () => void) => {
    setSelectedMethod(null)
    extra && extra()
  }, [])

  const handleCustomExtrinsic = useCallback(
    async (
      values: CustomExtrinsicFormValues,
      resetForm: (nextState?: Partial<FormikState<CustomExtrinsicFormValues>> | undefined) => void,
      setHash: (hash: Hash | undefined) => void,
      setFormError: (message: string) => void,
    ) => {
      if (!injector || !api) return setFormError('We are not able to connect to the blockchain')
      if (!selectedCategory) return setFormError('You need to select a category')
      if (!selectedMethod) return setFormError('You need to select a method')
      try {
        const tx = await api.tx[selectedCategory][selectedMethod](
          ...Object.keys(values).map((key) => values[key]),
        )
        const hash = await sendAndSaveTx({
          call: `${selectedCategory}.${selectedMethod}`,
          tx,
          signer: injector.signer,
          nonce: typeof values.nonce === 'string' ? parseInt(values.nonce) : values.nonce,
          error: setFormError,
        })
        if (hash) {
          setHash(hash)
          toast.success('The extrinsic was sent', { position: 'bottom-center' })
          sendGAEvent({
            event: 'walletSideKick_action_customExtrinsic',
            value: `category:${selectedCategory}:method:${selectedMethod}:extrinsic:${hash.toString()}`,
          })
          resetCategory()
          resetForm()
        }
      } catch (error) {
        handleTxError(
          'There was an error while sending the extrinsic',
          `${selectedCategory}.${selectedMethod}`,
          setFormError,
        )
      }
    },
    [injector, api, selectedCategory, selectedMethod, sendAndSaveTx, resetCategory, handleTxError],
  )

  return {
    extrinsicsList,
    selectedCategory,
    selectedMethod,
    initialCustomExtrinsicValues,
    customExtrinsicFormValidationSchema,
    loadData,
    handleCustomExtrinsic,
    setSelectedCategory,
    setSelectedMethod,
    resetMethod,
    resetCategory,
  }
}
