import { useOnChainActivityChartsQuery } from 'gql/graphql'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { AccumulatedHistoryChart } from './AccumulatedHistoryChart'
import { HistoryIncreaseChart } from './HistoryIncreaseChart'

export const HomeCharts = () => {
  const { ref, inView } = useInView()
  const { loading, data } = useOnChainActivityChartsQuery({
    variables: {},
    skip: !inView,
  })

  return (
    <div ref={ref}>
      <div className='mb-12 mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2'>
        <AccumulatedHistoryChart data={data} loading={loading} />
        <HistoryIncreaseChart data={data} loading={loading} />
      </div>
    </div>
  )
}
