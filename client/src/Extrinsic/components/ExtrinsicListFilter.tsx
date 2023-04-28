/* eslint-disable camelcase */
import { FC, useState } from 'react'
import { ExtrinsicWhereInput } from 'gql/graphql'

type Props = {
  filters: ExtrinsicWhereInput
  setFilters: React.Dispatch<React.SetStateAction<ExtrinsicWhereInput>>
}

const ExtrinsicListFilter: FC<Props> = ({ setFilters, filters }) => {
  const [where, setWhere] = useState<ExtrinsicWhereInput>(filters)
  const [timeDimension, setTimeDimension] = useState<'date' | 'block'>('block')

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhere((prev) => ({ ...prev, signer: { id_eq: e.target.value } }))
  }

  const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWhere((prev) => ({ ...prev, name_containsInsensitive: e.target.value }))
  }

  const handleTimeDimensionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeDimension(e.target.value as 'date' | 'block')
  }

  const handleBlockFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhere((prev) => ({ ...prev, block: { ...where?.block, height_gte: e.target.value } }))
  }

  const handleBlockTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhere((prev) => ({ ...prev, block: { ...where?.block, height_lte: e.target.value } }))
  }

  const handleFilter = () => {
    setFilters(where)
  }

  return (
    <div className='w-full shadow p-5 rounded-[20px] bg-[#DDEFF1] dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'>
      <div>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 items-end'>
          <div className='flex flex-col gap-3'>
            <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>Module</div>
            <select
              value={where?.name_containsInsensitive || ''}
              onChange={handleModuleChange}
              className='px-4 py-3 w-full rounded-[42px] bg-white dark:bg-[#1E254E] dark:text-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm'
            >
              <option value=''>All</option>
              <option value='Timestamp.set'>Set</option>
              <option value='Subspace.store_segment_headers'>Store Segment Headers</option>
              <option value='Domains.submit_bundle'>Submit Bundle</option>
              <option value='Subspace.vote'>Vote</option>
            </select>
          </div>

          <div className='flex flex-col gap-3'>
            <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>Call</div>
            <select className='px-4 py-3 w-full rounded-[42px] bg-white dark:bg-[#1E254E] dark:text-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm'>
              <option value=''>All</option>
            </select>
          </div>

          <div className='md:col-span-3 flex flex-col gap-3'>
            <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>Account</div>
            <input
              type='text'
              placeholder='Optional'
              onChange={handleAccountChange}
              value={where?.signer?.id_eq || ''}
              className='px-4 py-3 w-full rounded-[42px] bg-white dark:bg-[#1E254E] dark:text-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>
              Time Dimension
            </div>

            <select
              onChange={handleTimeDimensionChange}
              value={timeDimension}
              className='px-4 py-3 w-full rounded-[42px] bg-white dark:bg-[#1E254E] dark:text-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm'
            >
              <option value='block'>Block</option>
              <option value='date'>Date</option>
            </select>
          </div>

          <>
            {timeDimension === 'block' ? (
              <>
                <div className='flex flex-col gap-3'>
                  <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>
                    From
                  </div>
                  <input
                    value={where?.block?.height_gte || ''}
                    onChange={handleBlockFrom}
                    type='text'
                    placeholder='from'
                    className='px-4 py-3 w-full rounded-[42px] bg-white dark:bg-[#1E254E] dark:text-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm'
                  />
                </div>

                <div className='flex flex-col gap-3'>
                  <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>To</div>
                  <input
                    value={where?.block?.height_lte || ''}
                    onChange={handleBlockTo}
                    type='text'
                    placeholder='to'
                    className='px-4 py-3 w-full rounded-[42px] bg-white dark:bg-[#1E254E] dark:text-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm'
                  />
                </div>
              </>
            ) : (
              <>
                <div className='flex flex-col gap-3'>
                  <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>
                    Start Date
                  </div>

                  <div className='relative max-w-sm'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <svg
                        aria-hidden='true'
                        className='w-5 h-5 text-gray-500 dark:text-gray-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                    </div>
                    <input
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Start date'
                    />
                  </div>
                </div>

                <div className='flex flex-col gap-3'>
                  <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>
                    To Date
                  </div>

                  <div className='relative max-w-sm'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <svg
                        aria-hidden='true'
                        className='w-5 h-5 text-gray-500 dark:text-gray-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                    </div>
                    <input
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='End date'
                    />
                  </div>
                </div>
              </>
            )}
          </>

          <button
            onClick={handleFilter}
            className='md:col-span-2 md:justify-self-end px-[33px] py-[13px] bg-white dark:bg-[#1E254E] hover:bg-gray-200 text-gray-800 dark:text-white text-sm font-medium rounded-[20px]'
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExtrinsicListFilter
