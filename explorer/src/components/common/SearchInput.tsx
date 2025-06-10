import { useFormikContext } from 'formik'
import useIndexers from 'hooks/useIndexers'
import useMediaQuery from 'hooks/useMediaQuery'
import React, { FC } from 'react'
import { FormValues } from './SearchBar'

export const SearchInput: FC = () => {
  const { values, errors, touched, setFieldValue } = useFormikContext<FormValues>()
  const { network } = useIndexers()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim()
    setFieldValue('searchTerm', trimmedValue)
  }

  let placeholder: string
  switch (values['searchType'].name) {
    case 'Block':
      placeholder = `Search for blocks in ${network} ...`
      break
    case 'Extrinsic':
      placeholder = `Search for extrinsics in ${network} ...`
      break
    case 'Account':
      placeholder = `Search for accounts in ${network} ...`
      break
    case 'Event':
      placeholder = `Search for events in ${network} ...`
      break
    default:
      placeholder = `Search for all in ${network} ...`
  }

  return (
    <input
      data-testid='search-term-input'
      id='searchTerm'
      className={`block w-full rounded-md bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
        errors.searchTerm &&
        touched.searchTerm &&
        'block w-full rounded-md bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
      } `}
      placeholder={isDesktop ? `${placeholder}` : 'Search...'}
      name='searchTerm'
      value={values.searchTerm}
      onChange={handleInputChange}
      autoCorrect='off'
      spellCheck='false'
      autoComplete='off'
    />
  )
}
