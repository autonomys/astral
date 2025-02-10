import React from 'react'
import { AccumulatedHistoryChart } from './AccumulatedHistoryChart'
import { HistoryIncreaseChart } from './HistoryIncreaseChart'

export default function HomeCharts() {
  return (
    <div>
      <div className='mb-12 mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2'>
        <AccumulatedHistoryChart />
        <HistoryIncreaseChart />
      </div>
    </div>
  )
}
