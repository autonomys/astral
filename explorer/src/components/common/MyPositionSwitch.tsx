import React, { FC, useCallback, useMemo } from 'react'
import { useViewStates } from 'states/view'

type MyPositionSwitchProps = {
  labels?: [string, string]
}

export const MyPositionSwitch: FC<MyPositionSwitchProps> = ({
  labels = ['Staked only', 'All operators'],
}) => {
  const { myPositionOnly, setMyPositionOnly } = useViewStates()

  const label = useMemo(() => (myPositionOnly ? labels[0] : labels[1]), [labels, myPositionOnly])
  const onChange = useCallback(
    () => setMyPositionOnly(!myPositionOnly),
    [myPositionOnly, setMyPositionOnly],
  )

  return (
    <div className='w-full'>
      <button
        onClick={onChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onChange()
        }}
        className={`${
          myPositionOnly ? 'bg-purpleAccent' : 'bg-transparent'
        } border-color-grayDarker dark:border-color-white relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full border-2`}
        role='switch'
        aria-checked={myPositionOnly}
      >
        <span
          className={`${
            myPositionOnly ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform dark:bg-purpleSoft`}
        />
        <span className='sr-only'>{label}</span>
      </button>
      <span className='ml-2 text-base dark:text-white'>{label}</span>
    </div>
  )
}
