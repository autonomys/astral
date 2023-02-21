import { FC } from 'react'
import { Log } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import { Arguments, List, StyledListItem } from 'common/components'

dayjs.extend(relativeTime)

type Props = {
  log: Log
}

const LogDetailsCard: FC<Props> = ({ log }) => {
  return (
    <div className='w-full'>
      <div className='flex'>
        <div className='border border-slate-100 bg-white shadow rounded-[20px] mb-4 p-4 sm:p-6 w-full dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'>
          <div className='flex items-center justify-between mb-10'>
            <h3 className='font-medium text-sm text-[#241235] md:text-2xl dark:text-white'>Log #{log.id}</h3>
            <div className='bg-[#241235] text-xs font-semibold px-5 py-3 rounded-full block leading-normal text-white'>
              #{log.block.height}
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-5 w-full'>
            <div className='w-full md:flex-1'>
              <List>
                <StyledListItem title='Type'>{log.kind}</StyledListItem>
                <StyledListItem title='Engine'>-</StyledListItem>
                <StyledListItem title='Data'>-</StyledListItem>
              </List>
            </div>
            <div className='w-full sm:max-w-xs lg:max-w-md border border-[#F3FBFF] bg-[#F3FBFF] shadow rounded-lg mb-4 p-4 sm:p-6 break-all'>
              <Arguments args={log.block.events[0].args} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogDetailsCard
