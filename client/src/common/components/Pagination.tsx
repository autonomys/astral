import { FC } from 'react'

type Props = {
  nextPage?: () => void
  previousPage?: () => void
  page: number
}

const Pagination: FC<Props> = ({ nextPage, previousPage, page }) => {
  return (
    <nav className="relative z-0 inline-flex shadow-sm">
      <button
        aria-label="Previous"
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
        disabled={!page}
        onClick={previousPage}
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <button
        aria-label="Next"
        className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
        onClick={nextPage}
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </nav>
  )
}

export default Pagination
