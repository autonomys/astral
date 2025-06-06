import { capitalizeFirstLetter } from '@autonomys/auto-utils'
import {
  Bars3Icon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TableName, useTableSettings } from 'states/tables'
import { FilterOption } from 'types/table'
import { numberWithCommas } from 'utils/number'

interface TableSettingsProps {
  table: TableName
  tableName?: string
  totalCount?: number | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: Record<string, any>
  addExtraIcons?: React.ReactNode
  overrideFiltersOptions?: FilterOption[]
  onSearchSubmit?: (columnName: string, value: string) => boolean // Returns true if handled
}

export const TableSettings: React.FC<TableSettingsProps> = ({
  table,
  tableName,
  totalCount,
  filters,
  addExtraIcons,
  overrideFiltersOptions,
  onSearchSubmit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Local state for search inputs when using custom search
  const [searchValues, setSearchValues] = useState<Record<string, string>>({})

  if (!tableName) {
    tableName = capitalizeFirstLetter(table)
  }
  const {
    availableColumns,
    selectedColumns,
    filtersOptions: _filtersOptions,
    showTableSettings,
    showReset,
    handleFilterChange,
    handleColumnChange,
    showSettings,
    hideSettings,
    handleReset,
  } = useTableSettings(table)

  const filtersOptions = useMemo(
    () => overrideFiltersOptions || _filtersOptions,
    [overrideFiltersOptions, _filtersOptions],
  )

  const isAvailableSearch = useMemo(() => {
    return availableColumns?.some((column) => column.searchable)
  }, [availableColumns])

  const isAvailableFilters = useMemo(() => {
    return filtersOptions?.some((filter) => filter.type !== 'range' && filter.type !== 'checkbox')
  }, [filtersOptions])

  // Initialize search values from filters when using custom search
  useEffect(() => {
    if (onSearchSubmit) {
      const initialValues: Record<string, string> = {}
      availableColumns?.forEach((column) => {
        if (column.searchable) {
          const filterValue = filters[`search-${column.name}`]
          if (filterValue) {
            initialValues[column.name] = filterValue
          }
        }
      })
      setSearchValues(initialValues)
    }
  }, [availableColumns, filters, onSearchSubmit])

  // Handle search submit
  const handleSearchSubmit = useCallback(
    (e: React.FormEvent, columnName: string) => {
      e.preventDefault()
      const value = searchValues[columnName] || ''

      // If custom handler is provided and it handles the search, don't update filters
      if (onSearchSubmit && onSearchSubmit(columnName, value)) {
        return
      }

      // Otherwise, update filters normally
      handleFilterChange(`search-${columnName}`, value)
    },
    [searchValues, onSearchSubmit, handleFilterChange],
  )

  // Handle search input change
  const handleSearchInputChange = useCallback((columnName: string, value: string) => {
    setSearchValues((prev) => ({ ...prev, [columnName]: value }))
  }, [])

  return (
    <div className='mb-4 w-full' id='accordion-open' data-accordion='open'>
      <h2 id='accordion-open-heading-1'>
        <div className='flex w-full items-center justify-between truncate pb-5 text-left font-light text-gray-900 dark:text-white/75'>
          <span className='flex items-center text-xl font-medium'>
            {tableName}{' '}
            {(totalCount &&
              typeof totalCount === 'number' &&
              `(${numberWithCommas(totalCount)})`) ||
              totalCount}
          </span>
          <div className='flex items-center'>
            <div className='flex'>
              {addExtraIcons && addExtraIcons}

              {isAvailableSearch && (
                <MagnifyingGlassIcon
                  className='m-4 size-10 cursor-pointer rounded-full border-2 border-grayDark p-1 dark:border-white'
                  stroke='currentColor'
                  key='search'
                  onClick={() =>
                    showTableSettings !== 'search' ? showSettings('search') : hideSettings()
                  }
                />
              )}

              <PencilIcon
                className='m-4 size-10 cursor-pointer rounded-full border-2 border-grayDark p-1 dark:border-white'
                stroke='currentColor'
                key='pencil'
                onClick={() =>
                  showTableSettings !== 'columns' ? showSettings('columns') : hideSettings()
                }
              />
              {isAvailableFilters && (
                <FunnelIcon
                  className='m-4 size-10 cursor-pointer rounded-full border-2 border-grayDark p-1 dark:border-white'
                  stroke='currentColor'
                  key='funnel'
                  onClick={() =>
                    showTableSettings !== 'filters' ? showSettings('filters') : hideSettings()
                  }
                />
              )}
              {showReset && (
                <XMarkIcon
                  className='m-4 size-10 cursor-pointer rounded-full border-2 border-grayDark p-1 dark:border-white'
                  stroke='currentColor'
                  key='reset'
                  onClick={handleReset}
                />
              )}
            </div>
            <div className='sm:hidden'>
              <Bars3Icon
                className='m-4 size-10 cursor-pointer rounded-full border-2 border-grayDark p-1 dark:border-white'
                stroke='currentColor'
                onClick={() => {
                  showTableSettings !== null && hideSettings()
                  setMobileMenuOpen(!mobileMenuOpen)
                }}
              />
            </div>
          </div>
        </div>
      </h2>
      <div
        className={showTableSettings !== null ? 'block' : 'hidden'}
        id='accordion-open-body-1'
        aria-labelledby='accordion-open-heading-1'
      >
        <div className='w-full rounded-[20px] bg-grayLight p-5 shadow dark:border-none dark:bg-boxDark'>
          <div>
            <div className='mt-4'>
              <div className='flex flex-col gap-3'>
                {showTableSettings === 'search' && (
                  <>
                    <h4 className='font-semibold text-grayDark dark:text-white'>Search</h4>
                    <div className='text-[13px] font-semibold text-grayDark dark:text-white'>
                      <div className='flex flex-col gap-4'>
                        {availableColumns &&
                          availableColumns
                            .filter((column) => column.searchable)
                            .map((column) =>
                              onSearchSubmit ? (
                                <form
                                  key={column.name}
                                  onSubmit={(e) => handleSearchSubmit(e, column.name)}
                                >
                                  <label
                                    htmlFor={`search-${column.name}`}
                                    className='mb-1 block font-medium'
                                  >
                                    {column.label}
                                  </label>
                                  <input
                                    id={`search-${column.name}`}
                                    type='text'
                                    placeholder={`Search by ${column.label}`}
                                    className='w-full rounded border p-2 dark:bg-blueAccent dark:text-white'
                                    value={searchValues[column.name] || ''}
                                    onChange={(e) =>
                                      handleSearchInputChange(column.name, e.target.value)
                                    }
                                  />
                                </form>
                              ) : (
                                <div key={column.name}>
                                  <label
                                    htmlFor={`search-${column.name}`}
                                    className='mb-1 block font-medium'
                                  >
                                    {column.label}
                                  </label>
                                  <input
                                    id={`search-${column.name}`}
                                    type='text'
                                    placeholder={`Search by ${column.label}`}
                                    className='w-full rounded border p-2 dark:bg-blueAccent dark:text-white'
                                    value={filters[`search-${column.name}`] || ''}
                                    onChange={(e) =>
                                      handleFilterChange(`search-${column.name}`, e.target.value)
                                    }
                                  />
                                </div>
                              ),
                            )}
                      </div>
                    </div>
                  </>
                )}
                {showTableSettings === 'columns' && (
                  <>
                    <h4 className='font-semibold text-grayDark dark:text-white'>
                      Edit table columns
                    </h4>
                    <div className='text-[13px] font-semibold text-grayDark dark:text-white'>
                      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                        {availableColumns.map((column) => (
                          <li key={column.name} className='flex items-center'>
                            <input
                              type='checkbox'
                              className='mr-2 h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
                              checked={selectedColumns.includes(column.name)}
                              onChange={(e) => handleColumnChange(column.name, e.target.checked)}
                            />
                            <label className='font-medium text-gray-700 dark:text-gray-300'>
                              {column.label}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
                {showTableSettings === 'filters' && (
                  <>
                    <h4 className='font-semibold text-grayDark dark:text-white'>Filters</h4>
                    <div className='text-[13px] font-semibold text-grayDark dark:text-white'>
                      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
                        {filtersOptions &&
                          filtersOptions.map((filter) => (
                            <li key={filter.key}>
                              {filter.type === 'range' && (
                                <>
                                  <label
                                    htmlFor={`${filter.key}Min`}
                                    className='mb-1 block font-medium'
                                  >
                                    {filter.label}
                                  </label>
                                  <div className='flex items-center'>
                                    <input
                                      id={`${filter.key}Min`}
                                      type='number'
                                      placeholder='Min'
                                      className='w-1/2 rounded border p-2 dark:bg-blueAccent dark:text-white'
                                      value={filters[`${filter.key}Min`]}
                                      onChange={(e) =>
                                        handleFilterChange(`${filter.key}Min`, e.target.value)
                                      }
                                    />
                                    <span className='mx-2'>-</span>
                                    <input
                                      id={`${filter.key}Max`}
                                      type='number'
                                      placeholder='Max'
                                      className='w-1/2 rounded border p-2 dark:bg-blueAccent dark:text-white'
                                      value={filters[`${filter.key}Max`]}
                                      onChange={(e) =>
                                        handleFilterChange(`${filter.key}Max`, e.target.value)
                                      }
                                    />
                                  </div>
                                </>
                              )}
                              {filter.type === 'checkbox' && (
                                <>
                                  <p className='mb-1 block font-medium'>{filter.label}</p>
                                  <div className='mt-4 flex flex-wrap gap-2'>
                                    {filter.options?.map((option) => {
                                      if (typeof option === 'string')
                                        return (
                                          <div key={option} className='flex items-center'>
                                            <input
                                              type='checkbox'
                                              id={`${filter.key}-${option}`}
                                              value={option}
                                              checked={
                                                filters[
                                                  `${filter.key}${option.replace(/\s+/g, '')}`
                                                ] === 'true'
                                              }
                                              onChange={(e) =>
                                                handleFilterChange(
                                                  `${filter.key}${option.replace(/\s+/g, '')}`,
                                                  e.target.checked.toString(),
                                                )
                                              }
                                              className='mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                            />
                                            <label
                                              htmlFor={`${filter.key}-${option}`}
                                              className='text-sm text-gray-700 dark:text-gray-300'
                                            >
                                              {option}
                                            </label>
                                          </div>
                                        )
                                      return (
                                        <div key={option.value} className='flex items-center'>
                                          <input
                                            type='checkbox'
                                            id={`${filter.key}-${option.value}`}
                                            value={option.value}
                                            checked={
                                              filters[
                                                `${filter.key}${option.value.replace(/\s+/g, '')}`
                                              ] === 'true'
                                            }
                                            onChange={(e) =>
                                              handleFilterChange(
                                                `${filter.key}${option.value.replace(/\s+/g, '')}`,
                                                e.target.checked.toString(),
                                              )
                                            }
                                            className='mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                          />
                                          <label
                                            htmlFor={`${filter.key}-${option.value}`}
                                            className='text-sm text-gray-700 dark:text-gray-300'
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </>
                              )}
                              {filter.type === 'number' && (
                                <>
                                  <label htmlFor={filter.key} className='mb-1 block font-medium'>
                                    {filter.label}
                                  </label>
                                  <input
                                    id={filter.key}
                                    type='number'
                                    placeholder='Minimum'
                                    className='w-full rounded border p-2 dark:bg-blueAccent dark:text-white'
                                    value={filters[filter.key]}
                                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                  />
                                </>
                              )}
                              {filter.type === 'text' && (
                                <>
                                  <label htmlFor={filter.key} className='mb-1 block font-medium'>
                                    {filter.label}
                                  </label>
                                  <input
                                    id={filter.key}
                                    type='text'
                                    placeholder='Search...'
                                    className='w-full rounded border p-2 dark:bg-blueAccent dark:text-white'
                                    value={filters[filter.key]}
                                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                  />
                                </>
                              )}
                              {filter.type === 'dropdown' && (
                                <>
                                  <label htmlFor={filter.key} className='mb-1 block font-medium'>
                                    {filter.label}
                                  </label>
                                  <select
                                    id={filter.key}
                                    className='w-full rounded border p-2 dark:bg-blueAccent dark:text-white'
                                    value={filters[filter.key] || ''}
                                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                  >
                                    <option value=''>Select {filter.label}</option>
                                    {filter.options?.map((option) => {
                                      if (typeof option === 'string')
                                        return (
                                          <option key={option} value={option}>
                                            {capitalizeFirstLetter(option)}
                                          </option>
                                        )
                                      return (
                                        <option key={option.value} value={option.value}>
                                          {option.label}
                                        </option>
                                      )
                                    })}
                                  </select>
                                </>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className='mt-4 w-full sm:hidden'>
          <div className='flex flex-col space-y-2 rounded-[20px] bg-grayLight p-4 shadow dark:border-none dark:bg-boxDark dark:to-gradientTo'>
            {addExtraIcons && (
              <div className='mb-1 w-full'>
                {React.Children.map(addExtraIcons, (child) =>
                  React.cloneElement(child as React.ReactElement, {
                    className: `${(child as React.ReactElement).props.className || ''} w-full`,
                  }),
                )}
              </div>
            )}
            <button
              className='w-full rounded-full bg-white/10 p-3 text-[13px] font-semibold text-gray-900 dark:text-white/75'
              onClick={() => {
                showSettings('search')
                setMobileMenuOpen(false)
              }}
            >
              <div className='flex items-center justify-center'>
                <MagnifyingGlassIcon className='mr-2 h-5 w-5' />
                Search
              </div>
            </button>
            <button
              className='w-full rounded-full bg-white/10 p-3 text-[13px] font-semibold text-gray-900 dark:text-white/75'
              onClick={() => {
                showSettings('columns')
                setMobileMenuOpen(false)
              }}
            >
              <div className='flex items-center justify-center'>
                <PencilIcon className='mr-2 h-5 w-5' />
                Edit Columns
              </div>
            </button>
            <button
              className='w-full rounded-full bg-white/10 p-3 text-[13px] font-semibold text-gray-900 dark:text-white/75'
              onClick={() => {
                showSettings('filters')
                setMobileMenuOpen(false)
              }}
            >
              <div className='flex items-center justify-center'>
                <FunnelIcon className='mr-2 h-5 w-5' />
                Filters
              </div>
            </button>
            {showReset && (
              <button
                className='w-full rounded-full bg-white/10 p-3 text-[13px] font-semibold text-gray-900 dark:text-white/75'
                onClick={() => {
                  handleReset()
                  setMobileMenuOpen(false)
                }}
              >
                <div className='flex items-center justify-center'>
                  <XMarkIcon className='mr-2 h-5 w-5' />
                  Reset
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
