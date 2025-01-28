import { TimeFrame } from '@/mocks/charts-mock-data'

export function formatDate(date: Date, timeFrame: '1H' | '1D' | '1M'): string {
  switch (timeFrame) {
    case '1H':
      return date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    case '1D':
      return date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    case '1M':
      return date.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
      })
  }
}

export function getLineChartTickValues(timeFrame: TimeFrame, data: { date: string }[]) {
  if (data.length === 0) return []

  const timestamps = data.map((d) => new Date(d.date).getTime()) // Convert all dates to timestamps
  const minTime = Math.min(...timestamps) // Earliest timestamp in dataset
  const maxTime = Math.max(...timestamps) // Latest timestamp in dataset

  // Adjust interval based on actual data
  const totalDuration = maxTime - minTime
  const tickCount = getTickCount(timeFrame, data.length) // Get optimal tick count

  const tickInterval = Math.floor(totalDuration / tickCount) // Compute interval dynamically
  const tickValues: Date[] = []

  for (let t = minTime; t <= maxTime; t += tickInterval) {
    tickValues.push(new Date(t))
  }

  return tickValues
}

/**
 * Determines the optimal number of ticks based on the dataset size.
 */
function getTickCount(timeFrame: TimeFrame, dataLength: number) {
  switch (timeFrame) {
    case '1H':
      return Math.min(4, dataLength) // 4 ticks max (e.g., every 15 min in an hour)
    case '1D':
      return Math.min(6, dataLength) // 6 ticks max (e.g., every 4 hours in a day)
    case '1M':
      return Math.min(8, dataLength) // 8 ticks max (e.g., every 3-4 days in a month)
    default:
      return 5
  }
}

export function getBarChartTickValues(timeFrame: TimeFrame, data: { date: string }[]) {
  if (data.length === 0) return []

  let filterInterval = 1 // Default: Show all ticks

  switch (timeFrame) {
    case '1H':
      filterInterval = Math.ceil(data.length / 6) // ✅ Show ~6 ticks max for 1H
      break
    case '1D':
      filterInterval = Math.ceil(data.length / 8) // ✅ Show ~8 ticks max for 1D
      break
    case '1M':
      filterInterval = Math.ceil(data.length / 10) // ✅ Show ~10 ticks max for 1M
      break
  }
  return data.filter((_, i) => i % filterInterval === 0).map((d) => d.date)
}
