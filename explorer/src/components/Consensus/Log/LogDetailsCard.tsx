import { Arguments } from 'components/common/Arguments'
import { List, StyledListItem } from 'components/common/List'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { LogByIdQuery } from 'gql/graphql'
import { FC, useMemo } from 'react'
import { parseArgs, parseLogValue } from 'utils/indexerParsing'
import { shortString } from 'utils/string'

dayjs.extend(relativeTime)

type Props = {
  log: NonNullable<LogByIdQuery['consensus_logs_by_pk']>
}

export const LogDetailsCard: FC<Props> = ({ log }) => {
  const value = useMemo(() => parseLogValue(log.value), [log.value])

  return (
    <div className='w-full'>
      <div className='flex'>
        <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white p-4 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientFrom dark:via-gradientVia dark:to-gradientTo sm:p-6'>
          <div className='mb-10 flex items-center justify-between'>
            <h3 className='text-sm font-medium text-grayDarker dark:text-white md:text-2xl'>
              Log #{log.id}
            </h3>
            <div className='block rounded-full bg-grayDarker px-5 py-3 text-xs font-semibold leading-normal text-white'>
              #{log.block_height}
            </div>
          </div>
          <div className='flex w-full flex-col gap-5 md:flex-row'>
            <div className='w-full md:flex-1'>
              <List>
                <StyledListItem title='Type'>{log.kind}</StyledListItem>
                <StyledListItem title='Engine'>{value.engine}</StyledListItem>
                <StyledListItem title='Data'>{shortString(value.data, 10, 550)}</StyledListItem>
              </List>
            </div>
            <div className='mb-4 w-full break-all rounded-lg border border-purpleLight bg-purpleLight p-4 shadow dark:border-none dark:bg-white/10 sm:max-w-xs sm:p-6 lg:max-w-md'>
              <Arguments args={parseArgs(log.block?.events[0].args)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
