import { useFormikContext } from 'formik'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import React, { FC } from 'react'
import { FormValues } from './SearchBar'

export const SearchInput: FC = () => {
  const { values, errors, touched, handleChange } = useFormikContext<FormValues>()
  const { selectedChain } = useDomains()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  let placeholder: string
  switch (values['searchType'].name) {
    case 'Block':
      placeholder = `Search for blocks in ${selectedChain.urls.page} ...`
      break
    case 'Extrinsic':
      placeholder = `Search for extrinsics in ${selectedChain.urls.page} ...`
      break
    case 'Account':
      placeholder = `Search for accounts in ${selectedChain.urls.page} ...`
      break
    case 'Event':
      placeholder = `Search for events in ${selectedChain.urls.page} ...`
      break
    default:
      placeholder = `Search for all in ${selectedChain.urls.page} ...`
  }

  return (
    <input
      data-testid='search-term-input'
      id='searchTerm'
      className={`
                    block w-full rounded-md bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white
                    ${
                      errors.searchTerm &&
                      touched.searchTerm &&
                      'block w-full rounded-md bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                    } 
                  `}
      placeholder={isDesktop ? `${placeholder}` : 'Search...'}
      name='searchTerm'
      value={values.searchTerm}
      onChange={handleChange}
    />
  )
}
