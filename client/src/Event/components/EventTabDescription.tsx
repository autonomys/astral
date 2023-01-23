import { FC, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

// gql
import { Event } from 'gql/graphql'

// common
import { shortString } from 'common/helpers'

type Props = {
  event: Event
}

const EventTabDescription: FC<Props> = ({ event }) => {
  const [isActive, setIsActive] = useState(true)
  return (
    <div className='text-xs bg-white rounded-lg sm:bg-inherit p-4'>
      <div className='grid sm:grid-cols-4 mb-2 text-[#857EC2] dark:text-white/75'>
        <div>Event Id</div>
        <div>Hash</div>
        <div>Action</div>
        <button
          type='button'
          className='flex items-center justify-between w-full'
          data-accordion-target='#accordion-open-body-1'
          aria-expanded='true'
          aria-controls='accordion-open-body-1'
          onClick={() => setIsActive(!isActive)}
        >
          <div className='flex items-center'>
            <ChevronDownIcon
              className={isActive ? 'w-4 h-4 shrink-0 ml-2 rotate-180' : 'w-4 h-4 shrink-0 ml-2'}
              stroke='#DE67E4'
            />
          </div>
        </button>
      </div>
      <hr className='mb-2' color='#FFFFFF' />
      <div className='grid grid-cols-4 mb-5 dark:text-white'>
        <div>{event.id}</div>
        <div>{shortString(event.block?.hash || '')}</div>
        <div>{event.phase}</div>
      </div>
      <div
        className={isActive ? 'block bg-[#F3FBFF] rounded-lg px-5 py-8 dark:bg-white/10' : 'hidden'}
        id='accordion-open-body-1'
        aria-labelledby='accordion-open-heading-1'
      >
        <div className='w-full divide-y divide-gray-200 text-[#282929] text-xs dark:text-white dark:divide-white/20 dark:divide-white/20'>
          <div className='flex justify-between  py-2'>
            <div>Signer</div>
            <div>{event.extrinsic?.signer?.id || '-'}</div>
          </div>
          <div className='flex justify-between py-2'>
            <div>Fee</div>
            <div>{event.extrinsic?.fee}</div>
          </div>
          <div className='flex justify-between py-2'>
            <div>Tip</div>
            <div>{event.extrinsic?.tip}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventTabDescription
