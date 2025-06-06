import { activate } from '@autonomys/auto-utils'
import { useCallback, useEffect, useState } from 'react'

interface UseBlockchainDataReturn<T> {
  value: T
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

type BlockchainDataFetcher<T> = (api: Awaited<ReturnType<typeof activate>>) => Promise<T>

export const useBlockchainData = <T>(
  chain: string,
  fetcher: BlockchainDataFetcher<T>,
  errorMessage: string,
  initialValue: T,
): UseBlockchainDataReturn<T> => {
  const [value, setValue] = useState<T>(initialValue)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    let api
    try {
      api = await activate({ networkId: chain })
      const result = await fetcher(api)
      setValue(result)
    } catch (error) {
      console.error(`Failed to get ${errorMessage}:`, error)
      setError(error instanceof Error ? error.message : `Failed to get ${errorMessage}`)
    } finally {
      if (api) {
        await api.disconnect()
      }
      setLoading(false)
    }
  }, [chain, fetcher, errorMessage])

  useEffect(() => {
    if (chain) {
      fetchData()
    }
  }, [fetchData, chain])

  return {
    value,
    loading,
    error,
    refetch: fetchData,
  }
}
