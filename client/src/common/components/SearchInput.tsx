import { useFormikContext } from 'formik'
import React, { FC } from 'react'
import { FormValues } from './SearchBar'
import useDomains from 'common/hooks/useDomains'
import useMediaQuery from 'common/hooks/useMediaQuery'

const SearchInput: FC = () => {
  const { values, errors, touched, handleChange } = useFormikContext<FormValues>()
  const { selectedChain } = useDomains()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  let placeholder: string
  if (values['searchType'].name === 'Block') {
    placeholder = `Search for blocks in ${selectedChain.urls.page} ...`
  } else if (values['searchType'].name === 'Extrinsic') {
    placeholder = `Search for extrinsics in ${selectedChain.urls.page} ...`
  } else if (values['searchType'].name === 'Account') {
    placeholder = `Search for accounts in ${selectedChain.urls.page} ...`
  } else if (values['searchType'].name === 'Event') {
    placeholder = `Search for events in ${selectedChain.urls.page} ...`
  } else {
    placeholder = `Search for all in ${selectedChain.urls.page} ...`
  }

  return (
    <input
      data-testid='search-term-input'
      id='searchTerm'
      className={`
                    dark:bg-[#1E254E] dark:text-white block px-4 py-[10px] w-full text-sm text-gray-900 rounded-md bg-white shadow-lg
                    ${
                      errors.searchTerm &&
                      touched.searchTerm &&
                      'block px-4 py-[10px] w-full text-sm text-gray-900 rounded-md bg-white shadow-lg'
                    } 
                  `}
      placeholder={isDesktop ? `${placeholder}` : 'Search...'}
      name='searchTerm'
      value={values.searchTerm}
      onChange={handleChange}
    />
  )
}

export default SearchInput
