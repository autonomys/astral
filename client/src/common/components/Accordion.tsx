import { FC, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

type Props = {
  title: React.ReactNode
  children: React.ReactNode
  value?: string
}

const Accordion: FC<Props> = ({ title, children, value = '' }) => {
  const [isActive, setIsActive] = useState(true)
  return (
    <div id='accordion-open' data-accordion='open'>
      <h2 id='accordion-open-heading-1'>
        <button
          type='button'
          className='flex items-center justify-between w-full pb-5 text-md font-light text-gray-900 truncate text-left dark:text-white/75'
          data-accordion-target='#accordion-open-body-1'
          aria-expanded='true'
          aria-controls='accordion-open-body-1'
          onClick={() => setIsActive(!isActive)}
        >
          <span className='flex items-center'>{title}</span>
          <div className='flex items-center'>
            {value}
            <ChevronDownIcon
              className={isActive ? 'w-6 h-6 shrink-0 ml-2 rotate-180' : 'w-6 h-6 shrink-0 ml-2'}
              stroke='#DE67E4'
            />
          </div>
        </button>
      </h2>
      <div
        className={isActive ? 'block' : 'hidden'}
        id='accordion-open-body-1'
        aria-labelledby='accordion-open-heading-1'
      >
        {children}
      </div>
    </div>
  )
}

export default Accordion
