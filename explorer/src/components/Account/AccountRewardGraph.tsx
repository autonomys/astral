import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { useQuery } from '@apollo/client'
import { ResponsiveLine } from '@nivo/line'
import { SimpleSpinner } from 'components/common/SimpleSpinner'
import { NotFound } from 'components/layout/NotFound'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import { useTheme } from 'providers/ThemeProvider'
import { FC, useMemo } from 'react'
import { LatestRewardsWeekQuery } from '../gql/graphql'
import { QUERY_LAST_WEEK_REWARDS } from './query'

dayjs.extend(relativeTime)
dayjs.extend(utc)

type Props = {
  accountId: string
  total: string
}

export const AccountRewardGraph: FC<Props> = ({ accountId, total }) => {
  const { isDark } = useTheme()

  const lastWeek = dayjs().subtract(3, 'month').utc().format()

  const { data, error, loading } = useQuery<LatestRewardsWeekQuery>(QUERY_LAST_WEEK_REWARDS, {
    variables: { accountId: accountId, gte: lastWeek },
  })

  const parsedData = useMemo(
    () =>
      data &&
      data.rewardEvents
        .map((item) => {
          return {
            x: dayjs(item.timestamp).format('YYYY-MM-DD'),
            y: bigNumberToNumber(item.amount),
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce((acc: any, item) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const found = acc.find((i: any) => i.x === item.x)
          if (found) {
            found.y += item.y
          } else {
            acc.push(item)
          }
          return acc
        }, []),
    [data],
  )

  const today = dayjs().format('YYYY-MM-DD')

  if (parsedData.length === 1 && parsedData[parsedData.length - 1].x !== today) {
    parsedData.push({
      x: today,
      y: 0,
    })
  }

  const fillColor = isDark ? '#E970F8' : '#9179EC'

  if (error) return <div>An error has occur</div>
  if (!accountId) return <NotFound />
  if (loading) return <SimpleSpinner />
  if (!data || !data.rewardEvents) return <NotFound />

  return (
    <div className='flex w-full flex-col p-5 lg:p-0'>
      <div className='flex items-baseline gap-4 justify-self-start lg:hidden'>
        <div className='text-[26px] font-medium text-gray-900 dark:text-white'>
          {total ? numberWithCommas(bigNumberToNumber(total)) : 0}
        </div>
        <div className='text-[13px] font-semibold text-gray-900 dark:text-white'>tSSC</div>
      </div>
      <div className='h-80 w-3/4 md:h-96 md:w-full'>
        {parsedData.length > 0 ? (
          <ResponsiveLine
            curve='natural'
            margin={{ top: 50, right: 30, bottom: 50, left: 30 }}
            data={[
              {
                id: 'fake corp. A',
                color: fillColor,
                data: parsedData,
              },
            ]}
            enableGridX={false}
            enableGridY={false}
            enablePoints={false}
            xScale={{
              type: 'time',
              format: '%Y-%m-%d',
              precision: 'day',
              useUTC: false,
            }}
            colors={{ datum: 'color' }}
            axisLeft={null}
            theme={{
              axis: {
                ticks: {
                  line: {
                    stroke: isDark ? '#fff' : '#000',
                  },
                  text: {
                    fill: isDark ? '#fff' : '#000',
                  },
                },
              },
            }}
            xFormat='time:%Y-%m-%d'
            axisBottom={{
              tickValues: 1.5,
              tickSize: 0,
              format: '%m.%d.%Y',
            }}
          />
        ) : (
          <div className='flex h-full items-center justify-center'>
            <div className='text-[26px] font-medium text-gray-900 dark:text-white'>
              No rewards yet
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
