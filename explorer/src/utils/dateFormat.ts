import { TimeFrame } from '@/components/common/Charts'

export function formatDate(date: Date, timeFrame: TimeFrame): string {
  switch (timeFrame) {
    case '1D':
      return date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    case '1M':
      return date.toLocaleDateString([], { weekday: 'short', day: 'numeric' }) // Show "Mon 1"
    case '1Y':
      return date.toLocaleDateString([], { month: 'short', year: 'numeric' }) // Show "Jan 2024"
  }
}

export function getLineChartTickValues(timeFrame: TimeFrame, data: { date: string }[]) {
  if (data.length === 0) return []

  const timestamps = data.map((d) => new Date(d.date).getTime())
  const minTime = Math.min(...timestamps)
  const maxTime = Math.max(...timestamps)

  const totalDuration = maxTime - minTime
  const tickCount = getTickCount(timeFrame, data.length) // Get optimal tick count

  let tickValues: Date[] = []

  // Ensure `1Y` shows only monthly labels
  if (timeFrame === '1Y') {
    tickValues = data.filter((_, i) => i % 2 === 0).map((d) => new Date(d.date))
  } else {
    const tickInterval = Math.floor(totalDuration / tickCount)
    for (let t = minTime; t <= maxTime; t += tickInterval) {
      tickValues.push(new Date(t))
    }
  }

  return tickValues
}

/**
 * Determines the optimal number of ticks based on the dataset size.
 */
function getTickCount(timeFrame: TimeFrame, dataLength: number) {
  switch (timeFrame) {
    case '1D':
      return Math.min(6, dataLength) // Show ~6 ticks max
    case '1M':
      return Math.min(8, dataLength) // Show ~8 ticks max (e.g., every 3 days)
    case '1Y':
      return Math.min(6, dataLength) // Show ~6 ticks max (e.g., every 2 months)
    default:
      return 5
  }
}

export function getBarChartTickValues(timeFrame: TimeFrame, data: { date: string }[]) {
  if (data.length === 0) return []

  let filterInterval = 1

  switch (timeFrame) {
    case '1D':
      filterInterval = Math.ceil(data.length / 6) // Keep ~6 ticks max
      break
    case '1M':
      filterInterval = Math.ceil(data.length / 8) // Keep ~8 ticks max
      break
    case '1Y':
      filterInterval = Math.ceil(data.length / 6)
  }

  return data.filter((_, i) => i % filterInterval === 0).map((d) => d.date)
}
