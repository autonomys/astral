import { SubmittableModuleExtrinsics } from '@autonomys/auto-utils'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Field, FieldArray, FormikErrors, FormikTouched } from 'formik'
import { FC, Fragment, useCallback, useMemo, useState } from 'react'
import { camelToNormal } from 'utils/string'

export type ExtrinsicModule = SubmittableModuleExtrinsics<'promise'>
export type ExtrinsicsList = { [key: string]: ExtrinsicModule }
type ExtrinsicsMethodFields = { name: string; type: string; typeName: string }
type ExtrinsicsMethodArgs = ExtrinsicsMethodFields & { docs: string[] }

type ExtrinsicsMethod = {
  name: string
  docs: string[]
  fields: ExtrinsicsMethodFields[]
  args: ExtrinsicsMethodArgs[]
}
export interface CustomExtrinsicFormValues {
  [key: string]: string
}

type ExtrinsicsCategorySelectorProps = {
  extrinsicsList: ExtrinsicsList | undefined
  setSelectedCategory: (category: string) => void
  resetCategory: () => void
}

type ExtrinsicsMethodSelectorProps = {
  extrinsicsList: ExtrinsicsList | undefined
  selectedCategory: string
  setSelectedMethod: (method: string) => void
  resetMethod: () => void
}

type ExtrinsicsInputsProps = {
  extrinsicsList: ExtrinsicsList | undefined
  selectedCategory: string
  selectedMethod: string
  errors?: FormikErrors<CustomExtrinsicFormValues>
  touched: FormikTouched<CustomExtrinsicFormValues>
  setSelectedValues: (field: string, value: string, shouldValidate?: boolean | undefined) => void
}

export const ExtrinsicsCategorySelector: FC<ExtrinsicsCategorySelectorProps> = ({
  extrinsicsList,
  setSelectedCategory,
  resetCategory,
}) => {
  const [selectedCategory, _setSelectedCategory] = useState<string>('')
  const handleSetCategory = useCallback(
    (category: string) => {
      setSelectedCategory(category)
      _setSelectedCategory(category)
    },
    [setSelectedCategory],
  )

  const categoryList = useMemo(
    () =>
      extrinsicsList && Object.keys(extrinsicsList)
        ? Object.keys(extrinsicsList).map((category, categoryIdx) => (
            <Listbox.Option
              key={categoryIdx}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pr-4 text-gray-900 dark:text-white md:pl-2 ${
                  active && 'bg-gray-100 dark:bg-blueDarkAccent'
                }`
              }
              value={category}
            >
              {({ selected }) => {
                return (
                  <div className={`px-2 ${selected && 'pl-6'}`}>
                    <span
                      className={`block truncate capitalize ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {camelToNormal(category)}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-greenBright'>
                        <CheckIcon className='hidden size-5 md:block' aria-hidden='true' />
                      </span>
                    ) : null}
                  </div>
                )
              }}
            </Listbox.Option>
          ))
        : null,
    [extrinsicsList],
  )

  return (
    <Listbox value={selectedCategory} onChange={handleSetCategory}>
      <div className='relative'>
        <Listbox.Button
          className='relative h-8 w-full cursor-default rounded-full bg-white from-primaryAccent to-blueUndertone py-2 pl-3 pr-10 text-left font-sans shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-boxDark dark:text-white sm:text-sm'
          onClick={resetCategory}
        >
          <div className='flex items-center justify-center'>
            <span className='ml-2 hidden w-5 truncate text-sm capitalize sm:block md:w-full'>
              {camelToNormal(selectedCategory)}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronDownIcon
                className='size-5 text-gray-400 ui-open:rotate-180 dark:text-primaryAccent'
                aria-hidden='true'
              />
            </span>
          </div>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute right-0 z-50 mt-1 max-h-80 w-auto overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-blueAccent dark:text-white sm:text-sm md:w-full'>
            {categoryList}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export const ExtrinsicsMethodSelector: FC<ExtrinsicsMethodSelectorProps> = ({
  extrinsicsList,
  selectedCategory,
  setSelectedMethod,
  resetMethod,
}) => {
  const [selectedMethod, _setSelectedMethod] = useState<string>('')
  const handleSetMethod = useCallback(
    (method: string) => {
      setSelectedMethod(method)
      _setSelectedMethod(method)
    },
    [setSelectedMethod],
  )

  const methodList = useMemo(
    () =>
      extrinsicsList &&
      extrinsicsList[selectedCategory] &&
      Object.keys(extrinsicsList[selectedCategory])
        ? Object.keys(extrinsicsList[selectedCategory]).map((method, methodIdx) => (
            <Listbox.Option
              key={methodIdx}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pr-4 text-gray-900 dark:text-white md:pl-2 ${
                  active && 'bg-gray-100 dark:bg-blueDarkAccent'
                }`
              }
              value={method}
            >
              {({ selected }) => {
                return (
                  <div className={`px-2 ${selected && 'pl-6'}`}>
                    <span
                      className={`block truncate capitalize ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {camelToNormal(method)}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-greenBright'>
                        <CheckIcon className='hidden size-5 md:block' aria-hidden='true' />
                      </span>
                    ) : null}
                  </div>
                )
              }}
            </Listbox.Option>
          ))
        : null,
    [extrinsicsList, selectedCategory],
  )

  return (
    <Listbox value={selectedMethod} onChange={handleSetMethod}>
      <div className='relative'>
        <Listbox.Button
          className='relative mt-4 h-8 w-full cursor-default rounded-full bg-white from-primaryAccent to-blueUndertone py-2 pl-3 pr-10 text-left font-sans shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-boxDark dark:text-white sm:text-sm'
          onClick={resetMethod}
        >
          <div className='flex items-center justify-center'>
            <span className='ml-2 hidden w-5 truncate text-sm capitalize sm:block md:w-full'>
              {camelToNormal(selectedMethod)}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronDownIcon
                className='size-5 text-gray-400 ui-open:rotate-180 dark:text-primaryAccent'
                aria-hidden='true'
              />
            </span>
          </div>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute right-0 z-50 mt-1 max-h-80 w-auto overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-blueAccent dark:text-white sm:text-sm md:w-full'>
            {methodList}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export const ExtrinsicsInputs: FC<ExtrinsicsInputsProps> = ({
  extrinsicsList,
  selectedCategory,
  selectedMethod,
  errors,
  touched,
  setSelectedValues,
}) => {
  const [selectedValues, _setSelectedValues] = useState<{ [key: string]: string }>({})

  const method = useMemo(
    () =>
      selectedCategory &&
      selectedMethod &&
      extrinsicsList &&
      (extrinsicsList[selectedCategory][selectedMethod].meta.toJSON() as ExtrinsicsMethod),
    [selectedCategory, selectedMethod, extrinsicsList],
  )

  const handleSetValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      _setSelectedValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      setSelectedValues(e.target.name, e.target.value, true)
    },
    [setSelectedValues],
  )

  const fields = useMemo(
    () =>
      method &&
      method.fields &&
      method.fields.map((field, fieldIdx) => (
        <div key={fieldIdx} className='mt-2'>
          <span className='text-base font-medium capitalize text-grayDarker dark:text-white'>
            {camelToNormal(field.name)}
          </span>
          <FieldArray
            name='field'
            render={() => (
              <div className='relative'>
                <Field
                  name={field.name}
                  type='text'
                  placeholder={`${camelToNormal(field.name)} (${camelToNormal(
                    method.args[fieldIdx].typeName,
                  )})`}
                  value={selectedValues && selectedValues[field.name]}
                  onChange={handleSetValues}
                  className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm capitalize text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                    errors &&
                    errors[field.name] &&
                    touched &&
                    touched[field.name] &&
                    'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueDarkAccent'
                  }`}
                />
              </div>
            )}
          />
        </div>
      )),
    [method, handleSetValues, selectedValues, errors, touched],
  )

  return <div className='relative'>{fields}</div>
}
