'use client'

import { FC, useState } from 'react'

export const FAQ: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className='mt-8 w-full max-w-xl'>
      <h2 className='text-center text-xl font-bold text-gray-900 dark:text-white '>FAQ</h2>
      <div className='mt-4'>
        {[
          'How will the rewards be converted to ATC?',
          'When can I withdraw the ATC?',
          'How else can I use ATC?',
        ].map((question, index) => (
          <div key={index} className='m-4'>
            <button
              className='w-full rounded-lg bg-white p-8 text-left text-gray-900 shadow-md  dark:border-none dark:bg-gray-800 dark:bg-gradient-to-r dark:from-gradientFrom dark:via-gradientVia dark:to-gradientTo dark:text-white'
              onClick={() => toggleFAQ(index)}
            >
              <span className='font-semibold'>
                {index + 1}. {question}
              </span>
              <span className='float-right'>{openIndex === index ? '▲' : '▼'}</span>
            </button>
            {openIndex === index && (
              <div className='mt-2 rounded-lg bg-gray-100 p-4 dark:bg-gray-700'>
                <p className='text-gray-700 dark:text-white'>
                  {/* Add the answer content here */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                  Praesent libero. Sed cursus ante dapibus diam.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
