import { CircleStackIcon, SignalIcon } from '@heroicons/react/24/outline'
import React, { FC, useCallback } from 'react'
import { useViewStates } from 'states/view'
import { Tooltip } from './Tooltip'

export const DataSource: FC = () => {
  const { useRpcData, setUseRpcData } = useViewStates()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSwitchDataSource = useCallback(
    (_useRpcData: boolean = false) => setUseRpcData(_useRpcData),
    [setUseRpcData],
  )

  return (
    <>
      <button
        onClick={() => handleSwitchDataSource()}
        className={`inline-flex items-center rounded-l-full bg-white p-2 text-base ${!useRpcData && 'text-pinkAccent dark:text-white'} shadow-md  hover:bg-gray-200 focus:outline-none dark:bg-pinkAccent`}
      >
        <Tooltip text='Indexed data'>
          <CircleStackIcon width='24' height='24' />
        </Tooltip>
      </button>
      <button
        onClick={() => handleSwitchDataSource(true)}
        className={`inline-flex items-center rounded-r-full bg-white from-pinkAccent to-purpleDeepAccent p-2 text-base ${useRpcData && 'text-pinkAccent dark:text-white'} shadow-md hover:bg-gray-200 focus:outline-none dark:bg-gradient-to-r`}
      >
        <Tooltip text='Live data'>
          <SignalIcon width='24' height='24' />
        </Tooltip>
      </button>
    </>
  )
}
