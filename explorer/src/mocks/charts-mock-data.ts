export type TimeFrame = '1H' | '1D' | '1M'

// Generate time series data based on timeframe
export function generateTimeSeriesData(timeFrame: TimeFrame) {
  const now = new Date()
  let points: number
  let interval: number

  switch (timeFrame) {
    case '1H':
      points = 60 // One point per minute
      interval = 60 * 1000 // 1 minute
      break
    case '1D':
      points = 24 // One point per hour
      interval = 60 * 60 * 1000 // 1 hour
      break
    case '1M':
      points = 30 // One point per day
      interval = 24 * 60 * 60 * 1000 // 1 day
      break
  }

  return Array.from({ length: points }).map((_, i) => {
    const date = new Date(now.getTime() - (points - i) * interval)
    const baseValue = 20 + i * 0.1 // Simulate growing trend
    return {
      date: date.toISOString(),
      value: baseValue + Math.random() * 2,
    }
  })
}

// Generate delta data based on timeframe
export function generateDeltaData(timeFrame: TimeFrame) {
  return generateTimeSeriesData(timeFrame).map((item) => ({
    ...item,
    value: Math.random() * 0.5, // Smaller values for delta
  }))
}
