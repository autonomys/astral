import React, { FC, useCallback, useMemo } from 'react'
import { useViewStates } from 'states/view'

export const RegisteredSwitch: FC = () => {
  const { registeredOnly, setRegisteredOnly } = useViewStates()

  const label = useMemo(
    () => (registeredOnly ? 'Registered operator' : 'All operators'),
    [registeredOnly],
  )
  const onChange = useCallback(
    () => setRegisteredOnly(!registeredOnly),
    [registeredOnly, setRegisteredOnly],
  )

  return (
    <div className='w-full'>
      <button
        onClick={onChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onChange()
        }}
        className={`${
          registeredOnly ? 'bg-primaryAccent' : 'bg-transparent'
        } border-color-grayDarker dark:border-color-white relative inline-flex h-6 w-11 cursor-pointer items-center rounded-lg border-2`}
        role='switch'
        aria-checked={registeredOnly}
      >
        <span
          className={`${
            registeredOnly ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-lg bg-white transition-transform dark:bg-blueLight`}
        />
        <span className='sr-only'>{label}</span>
      </button>
      <span className='ml-2 text-base dark:text-white'>{label}</span>
    </div>
  )
}
