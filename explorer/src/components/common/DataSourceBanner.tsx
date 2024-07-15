import React, { FC, useMemo } from 'react'
import { useViewStates } from 'states/view'

export const DataSourceBanner: FC = () => {
  const { useRpcData } = useViewStates()

  const title = useMemo(() => (useRpcData ? 'Live Data' : 'Archived Data'), [useRpcData])
  const description = useMemo(
    () =>
      useRpcData
        ? 'Live data is limited to the current state of the network. It does not allow digging into specific past actions but shows their impact on the current state. Fully slashed and deregistered operators, for example, will be invisible in live data.'
        : 'Archived data captures all actions that occurred in the past and present, the data is indexed and stored in a more complete and traversable way. However, the indexing for staking functionality is currently under maintenance, and some of the data may be incorrect. Switch to Live Data for accurate current information',
    [useRpcData],
  )

  return (
    <div className='mt-5 w-full'>
      <div className='w-full rounded-[20px] bg-[#DDEFF1] p-5 shadow dark:border-none dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2]'>
        <div className='flex flex-col gap-4'>
          <div className='text-[20px] font-bold text-[#282929] dark:text-white'>{title}</div>
          <div className='text-[15px] text-[#282929] dark:text-white'>{description}</div>
        </div>
      </div>
    </div>
  )
}
