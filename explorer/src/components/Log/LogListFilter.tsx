/* eslint-disable camelcase */
import { FilterIcon } from '@/components/icons/FilterIcon'
import { Accordion } from 'components/common/Accordion'
import { BasicDatepicker } from 'components/common/BasicDatepicker'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import { LogWhereInput } from 'gql/graphql'
import React, { FC, useEffect, useState } from 'react'

dayjs.extend(relativeTime)
dayjs.extend(utc)

type Props = {
  title: React.ReactNode
  filters: LogWhereInput
  setFilters: React.Dispatch<React.SetStateAction<LogWhereInput>>
  logTypes: string[]
}

export const LogListFilter: FC<Props> = ({ filters, setFilters, title, logTypes }) => {
  const [where, setWhere] = useState<LogWhereInput>(filters)
  const [timeDimension, setTimeDimension] = useState<'date' | 'block'>('block')

  useEffect(() => {
    if (filters?.block?.height_gte && filters?.block?.height_lte) setTimeDimension('block')
    else if (filters?.block?.timestamp_gte && filters?.block?.timestamp_lte)
      setTimeDimension('date')
  }, [filters])

  const handleEngineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const engine = {
      engine: e.target.value,
    }
    setWhere((prev) => ({ ...prev, value_jsonContains: JSON.stringify(engine) }))
  }

  const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWhere((prev) => ({ ...prev, kind_containsInsensitive: e.target.value }))
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
      block: {
        ...where?.block,
        timestamp_gte: utcDate,
      },
    }))
  }

  const handleDateTo = (date: Date) => {
    const utcDate = dayjs(date).utc().format()
    setWhere((prev) => ({
      ...prev,
      block: {
        ...where?.block,
        timestamp_lte: utcDate,
      },
    }))
  }

  const handleFilter = () => {
    setFilters(where)
  }

  const modulesFormatted = logTypes.map((module) => ({ value: module, label: module }))
  const LOG_TYPES = [{ label: 'All', value: undefined }, ...modulesFormatted]

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
        <div className='w-full rounded-[20px] bg-[#DDEFF1] p-5 shadow dark:border-none dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2]'>
          <div>
            <div className='mt-4 grid grid-cols-2 items-end gap-4 md:grid-cols-6'>
              <div className='flex flex-col gap-3'>
                <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>Type</div>
                <select
                  value={where?.kind_containsInsensitive || ''}
                  onChange={handleModuleChange}
                  className='w-full rounded-[42px] border-transparent bg-white px-4 py-3 text-sm focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-[#1E254E] dark:text-white'
                >
                  {LOG_TYPES.map((module) => (
                    <option key={module.value ? module.value : 'all'} value={module.value}>
                      {module.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col gap-3'>
                <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>
                  Time Dimension
                </div>

                <select
                  onChange={handleTimeDimensionChange}
                  value={timeDimension}
                  className='w-full rounded-[42px] border-transparent bg-white px-4 py-3 text-sm focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-[#1E254E] dark:text-white'
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
                        className='w-full rounded-[42px] border-transparent bg-white px-4 py-3 text-sm focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-[#1E254E] dark:text-white'
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
                        className='w-full rounded-[42px] border-transparent bg-white px-4 py-3 text-sm focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-[#1E254E] dark:text-white'
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
                        value={where?.block?.timestamp_gte || ''}
                        onChange={handleDateFrom}
                      />
                    </div>

                    <div className='flex flex-col gap-3'>
                      <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>
                        To Date
                      </div>

                      <BasicDatepicker
                        value={where?.block?.timestamp_lte || ''}
                        onChange={handleDateTo}
                      />
                    </div>
                  </>
                )}
              </>

              <div className='flex flex-col gap-3'>
                <div className='text-[13px] font-semibold text-[#282929] dark:text-white'>
                  Engine
                </div>
                <input
                  type='text'
                  placeholder='Optional'
                  onChange={handleEngineChange}
                  value={
                    where?.value_jsonContains ? JSON.parse(where?.value_jsonContains)?.engine : ''
                  }
                  className='w-full rounded-[42px] border-transparent bg-white px-4 py-3 text-sm focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-[#1E254E] dark:text-white'
                />
              </div>

              <button
                onClick={handleFilter}
                className='rounded-[20px] bg-white px-[33px] py-[13px] text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-[#1E254E] dark:text-white md:justify-self-end'
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
