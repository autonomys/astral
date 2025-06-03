import { blockchainSize } from '@autonomys/auto-consensus'
import { activate } from '@autonomys/auto-utils'
import { useCallback, useEffect, useState } from 'react'

interface UseHistorySizeReturn {
  historySizeVal: number
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useHistorySize = (chain: string): UseHistorySizeReturn => {
  const [historySizeVal, setHistorySizeVal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const getHistorySize = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const api = await activate({ networkId: chain })
      const result = await blockchainSize(api)
      setHistorySizeVal(Number(result))
    } catch (error) {
      console.error('Failed to get blockchain size:', error)
      setError(error instanceof Error ? error.message : 'Failed to get blockchain size')
    } finally {
      setLoading(false)
    }
  }, [chain])

  useEffect(() => {
    if (chain) {
      getHistorySize()
    }
  }, [getHistorySize, chain])

  return {
    historySizeVal,
    loading,
    error,
    refetch: getHistorySize,
  }
}
