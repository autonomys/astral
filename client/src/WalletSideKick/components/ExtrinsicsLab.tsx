import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { SubmittableModuleExtrinsics } from '@polkadot/api/types'
import { Field, FieldArray } from 'formik'
import { FC, Fragment, useCallback, useMemo, useState } from 'react'

// common
import { camelToNormal } from 'common/helpers'

export type ExtrinsicModule = SubmittableModuleExtrinsics<'promise'>
export type ExtrinsicsList = { [key: string]: ExtrinsicModule }
export type ExtrinsicsMethodFields = { name: string; type: string; typeName: string }
export type ExtrinsicsMethodArgs = ExtrinsicsMethodFields & { docs: string[] }

export type ExtrinsicsMethod = {
  name: string
  docs: string[]
  fields: ExtrinsicsMethodFields[]
  args: ExtrinsicsMethodArgs[]
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
  setSelectedValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
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
                `relative cursor-default select-none py-2 text-gray-900 md:pl-2 pr-4 dark:text-white ${
                  active && 'bg-gray-100 dark:bg-[#2A345E]'
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
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#37D058]'>
                        <CheckIcon className='h-5 w-5 hidden md:block' aria-hidden='true' />
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
          className='font-["Montserrat"] relative w-full h-8 cursor-default pr-10 rounded-full dark:bg-gradient-to-r from-[#EA71F9] to-[#4D397A] bg-white py-2 pl-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:text-white'
          onClick={resetCategory}
        >
          <div className='flex items-center justify-center'>
            <span className='hidden sm:block ml-2 truncate w-5 text-sm md:w-full capitalize'>
              {camelToNormal(selectedCategory)}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronDownIcon
                className='h-5 w-5 text-gray-400 ui-open:rotate-180 ui-open:transform dark:text-[#DE67E4]'
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
          <Listbox.Options className='absolute mt-1 max-h-80 w-auto md:w-full overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-[#1E254E] dark:text-white right-0'>
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
                `relative cursor-default select-none py-2 text-gray-900 md:pl-2 pr-4 dark:text-white ${
                  active && 'bg-gray-100 dark:bg-[#2A345E]'
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
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#37D058]'>
                        <CheckIcon className='h-5 w-5 hidden md:block' aria-hidden='true' />
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
          className='font-["Montserrat"] relative w-full h-8 cursor-default pr-10 mt-4 rounded-full dark:bg-gradient-to-r from-[#EA71F9] to-[#4D397A] bg-white py-2 pl-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:text-white'
          onClick={resetMethod}
        >
          <div className='flex items-center justify-center'>
            <span className='hidden sm:block ml-2 truncate w-5 text-sm md:w-full capitalize'>
              {camelToNormal(selectedMethod)}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronDownIcon
                className='h-5 w-5 text-gray-400 ui-open:rotate-180 ui-open:transform dark:text-[#DE67E4]'
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
          <Listbox.Options className='absolute mt-1 max-h-80 w-auto md:w-full overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-[#1E254E] dark:text-white right-0'>
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
      setSelectedValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    },
    [setSelectedValues],
  )

  const fields = useMemo(
    () =>
      method &&
      method.fields &&
      method.fields.map((field, fieldIdx) => (
        <div key={fieldIdx} className='mt-2'>
          <span className='text-[#241235] text-base font-medium dark:text-white capitalize'>
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
                  className='dark:bg-[#1E254E] dark:text-white block px-4 py-[10px] mt-4 w-[400px] text-sm text-gray-900 rounded-xl bg-white shadow-lg capitalize'
                />
              </div>
            )}
          />
        </div>
      )),
    [method, handleSetValues, selectedValues],
  )

  return <div className='relative'>{fields}</div>
}
