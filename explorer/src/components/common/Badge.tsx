import React, { FC } from 'react'

type Props = {
  style?: string
  children: React.ReactNode
}

const Badge: FC<Props> = ({
  children,
  style = 'border-blue-400 bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400',
}) => {
  return (
    <span
      className={`inline-flex items-center rounded border ${style} px-2.5 py-0.5 text-xs font-medium`}
    >
      <svg
        className='me-1.5 h-2.5 w-2.5'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 20 20'
      >
        <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z' />
      </svg>
      {children}
    </span>
  )
}

export default Badge
