import { TimeFrame } from '@/components/common/Charts'

export function generateTimeSeriesData(timeFrame: TimeFrame) {
  const now = new Date()
  let points: number
  let interval: number

  switch (timeFrame) {
    case '1H':
      points = 24 // Generate 1-day of hourly data
      interval = 60 * 60 * 1000 // 1 hour per candle
      break
    case '1D':
      points = 30 // Generate 30 days of daily data
      interval = 24 * 60 * 60 * 1000 // 1 day per candle
      break
    case '1W':
      points = 12 // Generate 12 weeks of data
      interval = 7 * 24 * 60 * 60 * 1000 // 1 week per candle
      break
    case '1M':
      points = 12 // Generate 12 months of data
      break
  }

  return Array.from({ length: points }).map((_, i) => {
    let date: Date

    if (timeFrame === '1M') {
      date = new Date(now) // Start from today
      date.setMonth(now.getMonth() - (points - i)) // Move exactly N months back
    } else {
      date = new Date(now.getTime() - (points - i) * interval) // Normal backtracking
    }

    const baseValue = 20 + i * 0.1 // Simulated trend
    return {
      date: date.toISOString(),
      value: baseValue + Math.random() * 2, // Adding some randomness for variation
    }
  })
}

export function generateDeltaData(timeFrame: TimeFrame) {
  return generateTimeSeriesData(timeFrame).map((item) => ({
    ...item,
    value: Math.random() * 0.5, // Smaller values for delta
  }))
}
