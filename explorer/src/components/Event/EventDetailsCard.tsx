import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { EventByIdQuery } from 'gql/graphql'
import Link from 'next/link'
import { FC } from 'react'

// common
import { Arguments } from 'components/common/Arguments'
import { List, StyledListItem } from 'components/common/List'
import { NotFound } from 'components/layout/NotFound'
import { INTERNAL_ROUTES } from 'constants/routes'
import useChains from 'hooks/useChains'

dayjs.extend(relativeTime)

type Props = {
  event: EventByIdQuery['eventById']
}

export const EventDetailsCard: FC<Props> = ({ event }) => {
  const { network, section } = useChains()

  if (!event) return <NotFound />
  return (
    <div className='w-full'>
      <div className='flex'>
        <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white p-4 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset sm:p-6'>
          <div className='mb-10 flex items-center justify-between'>
            <h3 className='text-sm font-medium text-grayDarker dark:text-white md:text-2xl'>
              Event #{event.id}
            </h3>
            <div className='block rounded-full bg-grayDarker px-5 py-3 text-xs font-semibold leading-normal text-white'>
              <Link
                className='flex gap-1'
                href={INTERNAL_ROUTES.blocks.id.page(network, section, event.block?.height)}
              >
                #{event.block?.height}
              </Link>
            </div>
          </div>
          <div className='flex w-full flex-col gap-5 md:flex-row'>
            <div className='w-full md:flex-1'>
              <List>
                <StyledListItem title='Timestamp'>
                  {dayjs(event.timestamp).format('DD MMM YYYY | HH:mm:ss(Z)')}
                </StyledListItem>
                <StyledListItem title='Block Time'>
                  {dayjs(event.timestamp).fromNow(true)}
                </StyledListItem>
                <StyledListItem title='Extrinsic'>
                  {event.extrinsic ? (
                    <Link
                      href={INTERNAL_ROUTES.extrinsics.id.page(
                        network,
                        section,
                        event.extrinsic?.id,
                      )}
                    >
                      {event.extrinsic?.id}
                    </Link>
                  ) : (
                    '-'
                  )}
                </StyledListItem>
                <StyledListItem title='Module'>{event.name.split('.')[0]}</StyledListItem>
                <StyledListItem title='Call'>
                  {event.call?.name.split('.')[1].toUpperCase()}
                </StyledListItem>
              </List>
            </div>
            <div className='mb-4 w-full break-all rounded-lg border border-blueLight bg-blueLight p-4 shadow dark:border-none dark:bg-white/10 sm:max-w-xs sm:p-6 lg:max-w-md'>
              <Arguments args={event.args} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
