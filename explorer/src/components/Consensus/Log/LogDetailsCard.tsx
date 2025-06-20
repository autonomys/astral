import { Arguments } from 'components/common/Arguments'
import { List, StyledListItem } from 'components/common/List'
import { LogByIdQuery } from 'gql/graphql'
import { FC, useMemo } from 'react'

type Props = {
  log: NonNullable<LogByIdQuery['consensus_logs'][number]>
}

export const LogDetailsCard: FC<Props> = ({ log }) => {
  const engine = useMemo(
    () => (log.value && log.value.engine ? log.value.engine : '-'),
    [log.value],
  )

  return (
    <div className='w-full'>
      <div className='flex'>
        <div className='mb-4 w-full rounded-lg border border-slate-100 bg-white p-4 shadow dark:border-none dark:bg-boxDark sm:p-6'>
          <div className='mb-10 flex items-center justify-between'>
            <h3 className='text-sm font-medium text-grayDarker dark:text-white md:text-2xl'>
              Log #{log.id}
            </h3>
            <div className='block rounded-lg bg-buttonLightFrom px-5 py-2 text-xs font-semibold leading-normal text-white'>
              #{log.block_height}
            </div>
          </div>
          <div className='flex w-full flex-col gap-5 md:flex-row'>
            <div className='w-full md:flex-1'>
              <List>
                <StyledListItem title='Type'>{log.kind}</StyledListItem>
                <StyledListItem title='Engine'>{engine}</StyledListItem>
              </List>
            </div>
            <div className='mb-4 w-full break-all rounded-lg border border-blueLight bg-blueLight p-4 shadow dark:border-none dark:bg-white/10 sm:max-w-xs sm:p-6 lg:max-w-md'>
              <Arguments args={log.value} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
