'use client'

import { LineChart, TimeFrame, TimeFrameSelector } from '@/components/common/Charts'
import { generateTimeSeriesData } from '@/mocks/charts-mock-data'
import { formatDate, getLineChartTickValues } from '@/utils/dateFormat'
import { useState } from 'react'

export function AccumulatedHistoryChart() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1M')

  // Generate the time series data
  const data = [
    {
      id: 'accumulated',
      data: generateTimeSeriesData(timeFrame).map((d) => ({
        x: new Date(d.date),
        y: Number(d.value.toFixed(2)),
      })),
    },
  ]

  return (
    <div className='rounded-[20px] bg-white p-4 shadow-sm dark:bg-boxDark'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-medium dark:text-white'>Accumulated On-Chain Activity</h2>
        <TimeFrameSelector selected={timeFrame} onChange={setTimeFrame} />
      </div>
      <div className='h-[300px]'>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
          xScale={{ type: 'time', useUTC: false }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            legend: 'Size (GB)',
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
              data[0].data.map((d) => ({ date: d.x.toISOString() })), // Convert `x` to `date`
            ),
          }}
          sliceTooltip={({ slice }) => (
            <div className='rounded bg-gray-800 px-2 py-1 text-xs text-white'>
              {formatDate(new Date(slice.points[0].data.x), timeFrame)}:{' '}
              {Number(slice.points[0].data.y).toFixed(2)} GB
            </div>
          )}
        />
      </div>
    </div>
  )
}
