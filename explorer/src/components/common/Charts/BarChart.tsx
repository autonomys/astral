'use client'

import { ResponsiveBar } from '@nivo/bar'

type ChartData = {
  [key: string]: string | number
}

type BarChartProps = {
  data: ChartData[] // Data array where each object represents a bar
  keys: string[] // Keys to visualize as bar values
  indexBy: string // Key for x-axis categories (string property)
  colors?: string[] // Optional array of colors for the bars
  axisLeftLegend?: string // Optional label for the left (y-axis)
  axisBottomLegend?: string // Optional label for the bottom (x-axis)
  tickValues?: string[] | number[] | undefined // Optional tick values for x-axis
  tooltipFormatter?: (value: number, indexValue: string | number) => React.ReactNode // Optional custom tooltip formatter
  height?: string | number // Optional height of the chart
}

export function BarChart({
  data,
  keys,
  indexBy,
  colors = ['#1949D2'], // Default color
  axisLeftLegend,
  axisBottomLegend,
  tickValues,
  tooltipFormatter,
  height = 300,
}: BarChartProps) {
  return (
    <div style={{ height }}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={colors}
        borderRadius={4}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: axisLeftLegend || undefined,
          legendOffset: -50,
          legendPosition: 'middle',
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 10,
          legend: axisBottomLegend || undefined,
          legendOffset: 36,
          legendPosition: 'middle',
          tickRotation: 0,
          tickValues: tickValues,
        }}
        enableLabel={false}
        tooltip={({ value, indexValue }) =>
          tooltipFormatter ? (
            tooltipFormatter(Number(value), indexValue)
          ) : (
            <div className='rounded bg-gray-800 px-2 py-1 text-xs text-white'>
              {indexValue}: {value}
            </div>
          )
        }
      />
    </div>
  )
}
