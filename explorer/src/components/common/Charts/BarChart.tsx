'use client'

import useChartTheme from '@/hooks/useChartTheme'
import type { BarDatum, BarSvgProps } from '@nivo/bar'
import dynamic from 'next/dynamic'

const DynamicResponsiveBar = dynamic(() => import('@nivo/bar').then((mod) => mod.ResponsiveBar), {
  ssr: false,
})

export function BarChart({
  data,
  keys,
  indexBy,
  margin,
  padding,
  valueScale,
  indexScale,
  axisLeft,
  axisBottom,
  tooltip,
  ...props
}: Omit<BarSvgProps<BarDatum>, 'height' | 'width'>) {
  const theme = useChartTheme()

  return (
    <DynamicResponsiveBar
      data={data}
      keys={keys}
      indexBy={indexBy ?? 'date'}
      margin={margin ?? { top: 10, right: 20, bottom: 50, left: 60 }}
      padding={padding ?? 0.3}
      valueScale={valueScale ?? { type: 'linear' }}
      indexScale={indexScale ?? { type: 'band', round: true }}
      colors={['#1949D2']}
      borderRadius={4}
      axisLeft={axisLeft}
      axisBottom={axisBottom}
      theme={theme}
      enableLabel={false}
      tooltip={tooltip}
      {...props}
    />
  )
}
