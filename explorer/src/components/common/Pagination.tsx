import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { FC } from 'react'
import ReactPaginate from 'react-paginate'

type Props = {
  nextPage: () => void
  previousPage: () => void
  currentPage: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalCount: number
  onChange: (page: number) => void
}

export const Pagination: FC<Props> = ({
  previousPage,
  nextPage,
  currentPage,
  pageSize,
  totalCount,
  hasNextPage,
  hasPreviousPage,
  onChange,
}) => {
  const pageCount = Math.floor(totalCount / pageSize)

  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <button
          onClick={previousPage}
          disabled={!hasPreviousPage}
          className='relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-none dark:bg-blueAccent dark:text-white'
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={!hasNextPage}
          className='relative ml-3 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-none dark:bg-blueAccent dark:text-white'
        >
          Next
        </button>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-end'>
        <ReactPaginate
          initialPage={currentPage}
          pageCount={pageCount}
          disabledClassName='disabled'
          breakLabel={
            <span className='relative mx-1 inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:bg-blueAccent dark:text-white'>
              ...
            </span>
          }
          nextClassName='relative inline-flex items-center rounded-lg bg-white px-2 py-2 text-sm font-medium text-primaryAccent hover:bg-gray-50 focus:z-20 mr-[14px] dark:text-white dark:bg-blueAccent dark:border-none'
          nextLabel={
            <span>
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='size-5' aria-hidden='true' />
            </span>
          }
          pageRangeDisplayed={3}
          previousClassName='relative inline-flex items-center rounded-lg bg-white px-2 py-2 text-sm font-medium text-primaryAccent hover:bg-gray-50 focus:z-20 mr-[14px] dark:text-white dark:bg-blueAccent dark:border-none'
          previousLabel={
            <span>
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='size-5' aria-hidden='true' />
            </span>
          }
          onPageChange={(page) => onChange(page.selected)}
          pageClassName='relative inline-flex items-center bg-white px-4 py-2 text-sm font-medium text-grayDark hover:bg-gray-50 focus:z-20 rounded-lg mx-1 dark:text-white dark:bg-blueAccent dark:border-none '
          renderOnZeroPageCount={null}
          activeClassName='relative z-10 inline-flex items-center bg-black px-4 py-2 text-sm font-medium text-white focus:z-20 rounded-lg mx-1 dark:text-white dark:bg-primaryAccent dark:border-none'
          containerClassName='flex items-center justify-between'
        />
      </div>
    </div>
  )
}
