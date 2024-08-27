/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react'

type Props = {
  title?: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal: FC<Props> = ({ title = '', isOpen, onClose, children }) => {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center transition-colors ${
        isOpen ? 'visible z-20 bg-black/20' : 'invisible'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-xl bg-white p-6 shadow transition-all dark:bg-gradient-to-r dark:from-gradientFrom dark:via-gradientVia dark:to-gradientTo ${
          isOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        <div className='absolute left-6 top-2  text-center text-xl font-medium leading-relaxed dark:text-white'>
          {title}
        </div>
        <button
          onClick={onClose}
          className='absolute right-2 top-2 p-1 text-gray-400 hover:bg-primaryAccent/75 hover:text-gray-600 dark:text-white dark:hover:bg-primaryAccent/75 dark:hover:text-gray-800'
        >
          X
        </button>

        <div className='mt-8'>{children}</div>
      </div>
    </div>
  )
}
