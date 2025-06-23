'use client'

import { formatSpaceToDecimalAsObject } from '@autonomys/auto-consensus'
import { BarChart, TimeFrame, TimeFrameSelector } from 'components/common/Charts'
import { OnChainActivityChartsQuery } from 'gql/graphql'
import { FC, useMemo, useState } from 'react'
import { formatDate, getBarChartTickValues } from 'utils/dateFormat'

interface HistoryIncreaseChartProps {
  data: OnChainActivityChartsQuery | undefined
  loading: boolean
}

export const HistoryIncreaseChart: FC<HistoryIncreaseChartProps> = ({ data, loading }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1D')

  const singleTimeFrameData = useMemo(() => {
    if (!data) return { data: [], unit: '' }

    const statsTable = {
      // '1H': data.stats_hourly,
      '1D': data.stats_daily,
      '1W': data.stats_weekly,
      '1M': data.stats_monthly,
    }[timeFrame]

    // First map to get all units and values
    const mappedData = statsTable.map((d) => {
      const space = formatSpaceToDecimalAsObject(d.delta_history_size)
      return {
        date: formatDate(new Date(d.start_date), timeFrame),
        increase: space.value || 0,
        unit: space.unit || 'KB',
      }
    })

    // Find the biggest unit
    const units = mappedData.map((d) => d.unit)
    const uniqueUnits = [...new Set(units)]

    // If all units are the same, return as is
    if (uniqueUnits.length === 1) {
      return {
        data: mappedData.reverse(),
        unit: uniqueUnits[0],
      }
    }

    // If different units, convert to the biggest one
    // Assuming units can be 'KB', 'MB', 'GB', 'TB'
    const unitConversion = {
      KB: 1,
      MB: 1024,
      GB: 1024 * 1024,
      TB: 1024 * 1024 * 1024,
    }

    const biggestUnit = uniqueUnits.reduce((a, b) =>
      unitConversion[a as keyof typeof unitConversion] >
      unitConversion[b as keyof typeof unitConversion]
        ? a
        : b,
    )

    return {
      data: mappedData
        .map((d) => ({
          ...d,
          increase:
            d.unit === biggestUnit
              ? d.increase
              : d.increase /
                (unitConversion[biggestUnit as keyof typeof unitConversion] /
                  unitConversion[d.unit as keyof typeof unitConversion]),
        }))
        .reverse(),
      unit: biggestUnit,
    }
  }, [data, timeFrame])

  if (loading || !data) return <div>Loading...</div>

  return (
    <div className='rounded-lg bg-white p-4 shadow-sm dark:bg-boxDark'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-medium dark:text-white'>On-Chain Activity</h2>
        <TimeFrameSelector selected={timeFrame} onChange={setTimeFrame} />
      </div>
      <div className='h-[300px]'>
        <BarChart
          data={singleTimeFrameData.data}
          keys={['increase']}
          indexBy='date'
          margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            legend: `Size (${singleTimeFrameData.unit})`,
            legendOffset: -50,
            legendPosition: 'middle',
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 10,
            legend: 'Time',
            legendOffset: 40,
            legendPosition: 'middle',
            tickRotation: 0,
            format: (value) => value,
            tickValues: getBarChartTickValues(
              timeFrame,
              singleTimeFrameData.data.map((d) => ({ date: d.date })),
            ),
          }}
          tooltip={({ value, indexValue }) => (
            <div className='rounded bg-gray-800 px-2 py-1 text-xs text-white'>
              {indexValue}: {value.toFixed(3)} {singleTimeFrameData.unit}
            </div>
          )}
        />
      </div>
    </div>
  )
}
