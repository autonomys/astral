import { useTheme } from '@/providers/ThemeProvider'
import { useMemo } from 'react'

const useChartTheme = () => {
  const { isDark } = useTheme()

  return useMemo(
    () => ({
      axis: {
        ticks: {
          text: {
            fill: isDark ? '#ffffff' : '#000000',
          },
        },
        legend: {
          text: {
            fill: isDark ? '#ffffff' : '#000000',
          },
        },
      },
      legends: {
        text: {
          fill: isDark ? '#ffffff' : '#000000',
        },
      },
    }),
    [isDark],
  )
}

export default useChartTheme
