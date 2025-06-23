import React, { FC, useCallback, useMemo } from 'react'
import { useViewStates } from 'states/view'

type MyPositionSwitchProps = {
  labels?: [string, string]
}

export const MyPositionSwitch: FC<MyPositionSwitchProps> = ({
  labels = ['My nominations', 'All operators'],
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
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onChange()
          }
        }}
        className={`${
          myPositionOnly ? 'bg-primaryAccent' : 'bg-transparent'
        } relative inline-flex h-8 w-16 cursor-pointer items-center rounded-full border-2 border-grayDarker dark:border-white`}
        role='switch'
        aria-checked={myPositionOnly}
        tabIndex={0}
      >
        <span
          className={`${
            myPositionOnly ? 'translate-x-10' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-grayDark transition-transform dark:bg-blueLight`}
        />
        <span className='sr-only'>{label}</span>
      </button>
      <span className='ml-2 text-base dark:text-white'>{label}</span>
    </div>
  )
}
