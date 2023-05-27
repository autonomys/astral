import { FC, useState } from 'react'

// layout
import { DOMAINS } from 'layout/constants'
import BarsLeftIcon from 'common/icons/BarsLeftIcon'

// TODO: add DomainHeader to the App.tsx once we have support for domains
const DomainHeader: FC = () => {
  const [isActive, setIsActive] = useState(true)

  return (
    <div
      className='w-full h-[60px] bg-white dark:bg-[#1E254E] z-10'
      id='accordion-open'
      data-accordion='open'
    >
      <div className='w-full flex justify-between container py-3 items-center px-5 md:px-[25px] 2xl:px-0 mx-auto'>
        <div className='flex gap-9'>
          {DOMAINS.map((item, index) => {
            const isActive = index === 0
            return (
              <div className='text-[13px] font-semibold items-center flex' key={`${item}-${index}`}>
                <span
                  className={
                    isActive
                      ? 'bg-[#241235] rounded-full py-2 px-4 dark:bg-[#DE67E4] text-white'
                      : 'bg-white text-[#282929] dark:text-white dark:bg-[#1E254E]'
                  }
                >
                  {item}
                </span>
              </div>
            )
          })}
        </div>
        <div className='flex gap-4'>
          <span className='text-[#857EC2] dark:text-white font-medium text-[13px] leading-4'>
            All Domains
          </span>
          <button
            onClick={() => setIsActive(!isActive)}
            className=' w-4 h-4 text-[#241235] dark:text-white'
          >
            <BarsLeftIcon />
          </button>
        </div>
      </div>
      <div
        className={isActive ? 'block bg-white min-h-screen z-9999' : 'hidden'}
        id='accordion-open-body-1'
        aria-labelledby='accordion-open-heading-1'
      >
        content
      </div>
    </div>
  )
}

export default DomainHeader
