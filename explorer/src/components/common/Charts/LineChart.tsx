import useChartTheme from '@/hooks/useChartTheme'
import type { LineSvgProps } from '@nivo/line'
import dynamic from 'next/dynamic'

const DynamicResponsiveLine = dynamic(
  () => import('@nivo/line').then((mod) => mod.ResponsiveLine),
  { ssr: false },
)

export function LineChart({
  data,
  margin,
  xScale,
  yScale,
  axisLeft,
  axisBottom,
  sliceTooltip,
  ...props
}: LineSvgProps) {
  const theme = useChartTheme()

  return (
    <DynamicResponsiveLine
      data={data}
      margin={margin ?? { top: 10, right: 20, bottom: 50, left: 60 }}
      xScale={xScale ?? { type: 'time', useUTC: false }}
      yScale={yScale ?? { type: 'linear', min: 'auto', max: 'auto' }}
      axisLeft={axisLeft}
      axisBottom={axisBottom}
      theme={theme}
      pointSize={4}
      pointColor='#ffffff'
      pointBorderWidth={2}
      pointBorderColor='#1949D2'
      curve='monotoneX'
      colors={['#1949D2']}
      useMesh={true}
      enableSlices='x'
      sliceTooltip={sliceTooltip}
      {...props}
    />
  )
}
