import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { ResponsiveLine } from '@nivo/line'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

// account
import { QUERY_LAST_WEEK_REWARDS } from 'Account/query'

// layout
import { NotFound } from 'layout/components'

// common
import { useTheme } from 'common/providers/ThemeProvider'
import { bigNumberToNumber, numberWithCommas } from 'common/helpers'
import SimpleSpinner from 'common/components/SimpleSpinner'

dayjs.extend(relativeTime)
dayjs.extend(utc)

type Props = {
  accountId: string
  total: string
}

const AccountRewardGraph: FC<Props> = ({ accountId, total }) => {
  const { isDark } = useTheme()

  const lastWeek = dayjs().subtract(3, 'month').utc().format()

  const { data, error, loading } = useQuery(QUERY_LAST_WEEK_REWARDS, {
    variables: { accountId: accountId, gte: lastWeek },
  })

  if (error) {
    return <div>Ha ocurrido un error</div>
  }

  if (!accountId) {
    return <NotFound />
  }

  if (loading) {
    return <SimpleSpinner />
  }

  if (!data.rewardEvents) {
    return <NotFound />
  }

  const parsedData = data.rewardEvents
    .map((item) => {
      return {
        x: dayjs(item.timestamp).format('YYYY-MM-DD'),
        y: bigNumberToNumber(item.amount),
      }
    })
    .reduce((acc, item) => {
      const found = acc.find((i) => i.x === item.x)
      if (found) {
        found.y += item.y
      } else {
        acc.push(item)
      }
      return acc
    }, [])

  const today = dayjs().format('YYYY-MM-DD')

  if (parsedData.length === 1 && parsedData[parsedData.length - 1].x !== today) {
    parsedData.push({
      x: today,
      y: 0,
    })
  }

  const fillColor = isDark ? '#E970F8' : '#9179EC'

  return (
    <div className='w-full flex flex-col p-5 lg:p-0'>
      <div className='flex lg:hidden gap-4 items-baseline justify-self-start'>
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
          <div className='flex justify-center items-center h-full'>
            <div className='text-[26px] font-medium text-gray-900 dark:text-white'>
              No rewards yet
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountRewardGraph
