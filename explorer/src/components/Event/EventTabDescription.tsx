import { shortString } from '@/utils/string'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Event } from 'gql/graphql'
import { FC, useState } from 'react'

type Props = {
  event: Event
}

export const EventTabDescription: FC<Props> = ({ event }) => {
  const [isActive, setIsActive] = useState(true)
  return (
    <div className='rounded-[20px] bg-white p-4 text-xs sm:bg-inherit'>
      <div className='mb-2 grid text-[#857EC2] dark:text-white/75 sm:grid-cols-4'>
        <div>Event Id</div>
        <div>Hash</div>
        <div>Action</div>
        <button
          type='button'
          className='flex w-full items-center justify-between'
          data-accordion-target='#accordion-open-body-1'
          aria-expanded='true'
          aria-controls='accordion-open-body-1'
          onClick={() => setIsActive(!isActive)}
        >
          <div className='flex items-center'>
            <ChevronDownIcon
              className={isActive ? 'ml-2 size-4 shrink-0 rotate-180' : 'ml-2 size-4 shrink-0'}
              stroke='#DE67E4'
            />
          </div>
        </button>
      </div>
      <hr className='mb-2' color='#FFFFFF' />
      <div className='mb-5 grid grid-cols-4 dark:text-white'>
        <div>{event.id}</div>
        <div>{shortString(event.block?.hash || '')}</div>
        <div>{event.phase}</div>
      </div>
      <div
        className={isActive ? 'block rounded-lg bg-[#F3FBFF] px-5 py-8 dark:bg-white/10' : 'hidden'}
        id='accordion-open-body-1'
        aria-labelledby='accordion-open-heading-1'
      >
        <div className='w-full divide-y divide-gray-200 text-xs text-[#282929] dark:divide-white/20 dark:text-white'>
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
