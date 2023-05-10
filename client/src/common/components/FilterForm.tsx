/* eslint-disable camelcase */
import React, { FC, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import FilterIcon from 'common/icons/FilterIcon'
import { Accordion } from 'common/components'
import BasicDatepicker from 'common/components/BasicDatepicker'
import { MODULES } from 'common/constants'
import { EventWhereInput, ExtrinsicWhereInput } from 'gql/graphql'

dayjs.extend(relativeTime)
dayjs.extend(utc)

type Props = {
  title: React.ReactNode
  filters: ExtrinsicWhereInput | EventWhereInput
  account: string
  where: ExtrinsicWhereInput | EventWhereInput
  setWhere: React.Dispatch<React.SetStateAction<ExtrinsicWhereInput | EventWhereInput>>
  setFilters: React.Dispatch<React.SetStateAction<ExtrinsicWhereInput | EventWhereInput>>
  handleAccountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FilterForm: FC<Props> = ({
  title,
  filters,
  account,
  where,
  setWhere,
  setFilters,
  handleAccountChange,
}) => {
  const [timeDimension, setTimeDimension] = useState<'date' | 'block'>('block')

  useEffect(() => {
    if (filters?.block?.height_gte && filters?.block?.height_lte) {
      setTimeDimension('block')
    } else if (filters?.timestamp_gte && filters?.timestamp_lte) {
      setTimeDimension('date')
    }
  }, [filters])

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

  const handleDateFrom = (date: Date) => {
    const utcDate = dayjs(date).utc().format()
    setWhere((prev) => ({
      ...prev,
      timestamp_gte: utcDate,
    }))
  }

  const handleDateTo = (date: Date) => {
    const utcDate = dayjs(date).utc().format()
    setWhere((prev) => ({
      ...prev,
      timestamp_lte: utcDate,
    }))
  }

  const handleFilter = () => {
    setFilters(where)
  }

  return (
    <div className='w-full'>
      <Accordion
        title={title}
        icon={
          <div className='text-[#DE67E4] dark:text-[#1E254E]'>
            <FilterIcon />
          </div>
        }
      >
        <div className='w-full shadow p-5 rounded-[20px] bg-[#DDEFF1] dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'>
          <div>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 items-end'>
              <div className='flex flex-col gap-3'>
                <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>
                  Module
                </div>
                <select
                  value={where?.name_containsInsensitive || ''}
                  onChange={handleModuleChange}
                  className='px-4 py-3 w-full rounded-[42px] bg-white dark:bg-[#1E254E] dark:text-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm'
                >
                  {MODULES.map((module) => (
                    <option key={module.value ? module.value : 'all'} value={module.value}>
                      {module.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex flex-col gap-3'>
                <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>Call</div>
                <select className='px-4 py-3 w-full rounded-[42px] bg-white dark:bg-[#1E254E] dark:text-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm'>
                  <option value=''>All</option>
                </select>
              </div>

              <div className='md:col-span-3 flex flex-col gap-3'>
                <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>
                  Account
                </div>
                <input
                  type='text'
                  placeholder='Optional'
                  onChange={handleAccountChange}
                  value={account}
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
                      <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>
                        To
                      </div>
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

                      <BasicDatepicker
                        value={where?.timestamp_gte || ''}
                        onChange={handleDateFrom}
                      />
                    </div>

                    <div className='flex flex-col gap-3'>
                      <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>
                        To Date
                      </div>

                      <BasicDatepicker
                        minDate={where?.timestamp_gte}
                        value={where?.timestamp_lte || ''}
                        onChange={handleDateTo}
                      />
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
      </Accordion>
    </div>
  )
}

export default FilterForm
