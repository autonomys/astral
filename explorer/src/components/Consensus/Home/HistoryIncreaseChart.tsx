'use client'

import { BarChart, TimeFrame, TimeFrameSelector } from '@/components/common/Charts'
import { generateDeltaData } from '@/mocks/charts-mock-data'
import { formatDate, getBarChartTickValues } from '@/utils/dateFormat'
import { useState } from 'react'

export function HistoryIncreaseChart() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1M')

  // Generate delta data
  const data = generateDeltaData(timeFrame).map((d) => ({
    date: formatDate(new Date(d.date), timeFrame),
    increase: Number(d.value.toFixed(3)),
  }))

  return (
    <div className='rounded-[20px] bg-white p-4 shadow-sm dark:bg-boxDark'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-medium dark:text-white'>On-Chain Activity Increase</h2>
        <TimeFrameSelector selected={timeFrame} onChange={setTimeFrame} />
      </div>
      <div className='h-[300px]'>
        <BarChart
          data={data}
          keys={['increase']}
          indexBy='date' //
          margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            legend: 'Increase (GB)',
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
              data.map((d) => ({ date: d.date })),
            ),
          }}
          tooltip={({ value, indexValue }) => (
            <div className='rounded bg-gray-800 px-2 py-1 text-xs text-white'>
              {indexValue}: {value.toFixed(3)} GB
            </div>
          )}
        />
      </div>
    </div>
  )
}
