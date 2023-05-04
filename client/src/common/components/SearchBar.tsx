import { Fragment, FC } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

// common
import useSearch from 'common/hooks/useSearch'
import useMediaQuery from 'common/hooks/useMediaQuery'
import { SearchType, searchTypes } from 'common/constants'
import useDomains from 'common/hooks/useDomains'

interface FormValues {
  searchTerm: string
  searchType: SearchType
}

const SearchBar: FC = () => {
  const { selectedChain } = useDomains()
  const initialValues: FormValues = { searchTerm: '', searchType: searchTypes[0] }

  const { handleSearch, isSearching } = useSearch()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const searchValidationSchema = Yup.object().shape({
    searchTerm: Yup.string().trim().required('Search term is required'),
  })

  const handleSubmit = async (values: FormValues) => {
    await handleSearch(values.searchTerm, values.searchType.id)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={searchValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, handleSubmit, handleChange, setFieldValue }) => (
        <Form className='w-full my-8' onSubmit={handleSubmit} data-testid='testSearchForm'>
          <div className='flex w-full items-center'>
            <Listbox
              value={values.searchType}
              onChange={(val) => setFieldValue('searchType', val)}
              name='searchType'
              data-testid='search-type-list'
            >
              <div className='relative w-36'>
                <Listbox.Button className='relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:bg-[#1E254E] dark:text-white'>
                  <div className='flex'>
                    <span className='ml-2 block truncate'>{values['searchType'].name}</span>
                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                      <ChevronDownIcon
                        className='h-5 w-5 text-gray-400 ui-open:rotate-180 ui-open:transform'
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
                  <Listbox.Options className='absolute mt-1 max-h-60 w-auto md:w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20 dark:bg-[#1E254E]'>
                    {searchTypes.map((term, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-4 md:pl-10 pr-4 dark:bg-[#1E254E] dark:text-white ${
                            active ? 'bg-gray-100 text-amber-900' : 'text-gray-900'
                          }`
                        }
                        value={term}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {term.name}
                            </span>
                            {selected ? (
                              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#37D058]'>
                                <CheckIcon className='h-5 w-5 hidden md:block' aria-hidden='true' />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <div className='ml-4 w-full'>
              <div className='relative'>
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
                  placeholder={
                    isDesktop
                      ? `Search for Block / Account in ${selectedChain.urls.page} ...`
                      : 'Search...'
                  }
                  name='searchTerm'
                  value={values.searchTerm}
                  onChange={handleChange}
                />
                <button
                  disabled={isSearching}
                  type='submit'
                  data-testid='testSearchSubmit'
                  className='absolute right-1 md:right-2.5 bottom-0 focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-4 py-2 '
                >
                  {isSearching ? (
                    <div className='flex justify-center align-middle mt-4'>
                      <SearchSpinner />
                    </div>
                  ) : (
                    <ArrowLongRightIcon stroke='#DE67E4' className='w-6 h-6' />
                  )}
                </button>
              </div>
            </div>
          </div>
          {errors.searchTerm && touched.searchTerm ? (
            <div className='text-red-500 text-md mt-2' data-testid='errorMessage'>
              {errors.searchTerm}
            </div>
          ) : null}
        </Form>
      )}
    </Formik>
  )
}

export default SearchBar

const SearchSpinner: FC = () => {
  return (
    <div role='status'>
      <svg
        aria-hidden='true'
        className='inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#DE67E4]'
        viewBox='0 0 100 101'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
          fill='currentColor'
        />
        <path
          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
          fill='currentFill'
        />
      </svg>
    </div>
  )
}
