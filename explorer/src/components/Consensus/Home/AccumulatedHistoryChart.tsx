'use client'

import { formatSpaceToDecimalAsObject } from '@autonomys/auto-consensus'
import { LineChart, TimeFrame, TimeFrameSelector } from 'components/common/Charts'
import { OnChainActivityChartsQuery } from 'gql/graphql'
import { FC, useMemo, useState } from 'react'
import { formatDate, getLineChartTickValues } from 'utils/dateFormat'

interface AccumulatedHistoryChartProps {
  data: OnChainActivityChartsQuery | undefined
  loading: boolean
}

// Add these type definitions at the top of the file
type UnitType = 'B' | 'KB' | 'MB' | 'GB' | 'TB'
type UnitFactors = Record<UnitType, number>
type UnitOrder = Record<UnitType, number>

export const AccumulatedHistoryChart: FC<AccumulatedHistoryChartProps> = ({ data, loading }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1D')

  const singleTimeFrameData = useMemo(() => {
    if (!data) return []

    const statsTable = {
      // '1H': data.stats_hourly,
      '1D': data.stats_daily,
      '1W': data.stats_weekly,
      '1M': data.stats_monthly,
    }[timeFrame]

    // Find the largest unit among all data points
    const allUnits = statsTable.map(
      (d) => formatSpaceToDecimalAsObject(d.cumulated_history_size).unit as UnitType,
    )
    const largestUnit = allUnits.reduce((max, current) => {
      const unitOrder: UnitOrder = { B: 1, KB: 2, MB: 3, GB: 4, TB: 5 }
      return unitOrder[current] > unitOrder[max] ? current : max
    }, 'B' as UnitType)

    // Convert all values to the largest unit
    const convertToUnit = (value: number, fromUnit: UnitType, toUnit: UnitType): number => {
      const unitFactors: UnitFactors = {
        B: 1,
        KB: 1024,
        MB: 1024 * 1024,
        GB: 1024 * 1024 * 1024,
        TB: 1024 * 1024 * 1024 * 1024,
      }
      return (value * unitFactors[fromUnit]) / unitFactors[toUnit]
    }

    return [
      {
        id: 'accumulated',
        data: statsTable.map((d) => {
          const space = formatSpaceToDecimalAsObject(d.cumulated_history_size)
          return {
            date: formatDate(new Date(d.start_date), timeFrame),
            size: convertToUnit(space.value, space.unit as UnitType, largestUnit),
            unit: largestUnit,
            x: new Date(d.start_date), // Ensure x is properly typed for the chart
            y: convertToUnit(space.value, space.unit as UnitType, largestUnit), // Ensure y is properly typed for the chart
          }
        }),
      },
    ]
  }, [data, timeFrame])

  if (loading || !data) return <div>Loading...</div>

  return (
    <div className='rounded-lg bg-white p-4 shadow-sm dark:bg-boxDark'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-medium dark:text-white'>Accumulated On-Chain Activity</h2>
        <TimeFrameSelector selected={timeFrame} onChange={setTimeFrame} />
      </div>
      <div className='h-[300px]'>
        <LineChart
          data={singleTimeFrameData}
          margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
          xScale={{ type: 'time', useUTC: false }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            legend: `Size (${singleTimeFrameData[0]?.data[0]?.unit ?? 'GB'})`,
            legendOffset: -50,
            legendPosition: 'middle',
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 10,
            legend: 'Time',
            legendOffset: 40,
            legendPosition: 'middle',
            format: (value) => formatDate(new Date(value), timeFrame),
            tickValues: getLineChartTickValues(
              timeFrame,
              singleTimeFrameData[0].data.map((d) => ({ date: d.x.toISOString() })), // Convert `x` to `date`
            ),
          }}
          sliceTooltip={({ slice }) => (
            <div className='rounded bg-gray-800 px-2 py-1 text-xs text-white'>
              {formatDate(new Date(slice.points[0].data.x), timeFrame)}:{' '}
              {Number(slice.points[0].data.y).toFixed(2)}{' '}
              {singleTimeFrameData[0]?.data[0]?.unit ?? 'GB'}
            </div>
          )}
        />
      </div>
    </div>
  )
}
