import { spacePledged } from '@autonomys/auto-consensus'
import { activate } from '@autonomys/auto-utils'
import { useCallback, useEffect, useState } from 'react'

interface UseSpacePledgedReturn {
  spacePledgedVal: number
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useSpacePledged = (chain: string): UseSpacePledgedReturn => {
  const [spacePledgedVal, setSpacePledgedVal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const getSpacePledged = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const api = await activate({ networkId: chain })
      const result = await spacePledged(api)
      setSpacePledgedVal(Number(result))
    } catch (error) {
      console.error('Failed to get space pledged:', error)
      setError(error instanceof Error ? error.message : 'Failed to get space pledged')
    } finally {
      setLoading(false)
    }
  }, [chain])

  useEffect(() => {
    if (chain) {
      getSpacePledged()
    }
  }, [getSpacePledged, chain])

  return {
    spacePledgedVal,
    loading,
    error,
    refetch: getSpacePledged,
  }
}
