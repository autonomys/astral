import { ResponsiveLine, type LineSvgProps } from '@nivo/line'

export function LineChart({ data, ...props }: LineSvgProps) {
  return <ResponsiveLine data={data} {...props} />
}
